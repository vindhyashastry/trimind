import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { queryNamespace, getEmbeddings } from "@/lib/vector-store";
import prisma from "@/lib/prisma";

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

const CHART_INSTRUCTIONS = `
The user has explicitly requested a chart/graph/visualization. Respond ONLY with a JSON code block.
DO NOT include any citations (like [Source 1]), explanations, or text outside the code block.
The JSON must follow this exact schema:
\`\`\`json
{
  "type": "pie" | "bar" | "line",
  "title": "Chart Title",
  "data": [
    { "name": "Label", "value": 123 }
  ],
  "config": {
    "xKey": "name",
    "yKey": "value"
  }
}
\`\`\`
`;

// Keywords that indicate the user explicitly wants a chart
const CHART_KEYWORDS = [
    "chart", "graph", "plot", "visualize", "visualization",
    "pie chart", "bar chart", "line chart", "bar graph", "pie graph"
];

function userWantsChart(message: string): boolean {
    const lower = message.toLowerCase();
    return CHART_KEYWORDS.some(kw => lower.includes(kw));
}

function parseActualCitations(content: string): string[] {
    const citations: string[] = [];
    // Match standard citation patterns: [Source: filename.pdf, p.X, Lines Y-Z] or [Source: filename.docx, Lines Y-Z]
    const regex = /\[Source:\s*([^\]]+)\]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        if (match[1]) {
            citations.push(match[1].trim());
        }
    }
    return Array.from(new Set(citations));
}

/**
 * Strip all [Source: ...] inline citation tags from the response text.
 * Citations are already captured by parseActualCitations for the trace panel.
 */
function stripCitations(content: string): string {
    return content
        .replace(/\s*\[Source:[^\]]*\]/g, "")
        .replace(/[ \t]+$/gm, "") // trim trailing spaces left by removal
        .trim();
}

function isSummaryRequest(message: string): boolean {
    const lower = message.toLowerCase();
    return (
        lower.includes("summarize") ||
        lower.includes("summarise") ||
        lower.includes("summary") ||
        lower.includes("tldr") ||
        lower.includes("tl;dr") ||
        lower.includes("overview") ||
        lower.includes("synopsis") ||
        lower.includes("recap") ||
        lower.includes("briefing") ||
        (lower.includes("brief") && (lower.includes("document") || lower.includes("file") || lower.includes("content")))
    );
}


const SYSTEM_PROMPTS: Record<string, string> = {
    finance: `You are a Finance Assistant. Answer questions about financial documents, balance sheets, and budgets. Be concise and factual. Do NOT generate charts or JSON visualizations unless the user explicitly asks for one.`,
    legal: `You are a Legal Assistant. Answer questions about contracts, compliance, and legal documents. Be concise and factual. Do NOT generate charts or JSON visualizations unless the user explicitly asks for one.`,
    general: `You are a helpful assistant. Be concise and factual. Do NOT generate charts or JSON visualizations unless the user explicitly asks for one.`
};

export async function POST(req: NextRequest) {
    const startTime = Date.now();

    try {
        const { message, accessKey, history, responseMode = "hybrid" } = await req.json();

        if (!accessKey?.startsWith("DPA-")) {
            return NextResponse.json({ error: "Invalid access key" }, { status: 401 });
        }

        // Detect domain from key
        let domain = "general";
        if (accessKey.includes("-F-")) domain = "finance";
        else if (accessKey.includes("-L-")) domain = "legal";

        // 1. Find connected assistants to expand knowledge pool
        const assistant = await prisma.assistant.findUnique({
            where: { accessKey },
            include: { outgoingRelations: { include: { target: true } } }
        });

        const authorizedKeys = [accessKey];
        if (assistant) {
            assistant.outgoingRelations.forEach(rel => {
                if (rel.target.accessKey) authorizedKeys.push(rel.target.accessKey);
            });
        }

        // Fetch all indexed documents — split by own vs connected domain
        const allDocs = await prisma.document.findMany({
            where: {
                assistant: { accessKey: { in: authorizedKeys } },
                status: "SUCCESS"
            },
            select: { fileName: true, assistant: { select: { accessKey: true } } }
        });
        const ownFileNames = Array.from(new Set(
            allDocs.filter(d => d.assistant?.accessKey === accessKey).map(d => d.fileName)
        ));
        const connectedFileNames = Array.from(new Set(
            allDocs.filter(d => d.assistant?.accessKey !== accessKey).map(d => d.fileName)
        ));
        const fileNames = Array.from(new Set(allDocs.map(d => d.fileName)));
        const fileListStr = fileNames.length > 0 ? fileNames.join(", ") : "No documents uploaded yet.";

        // 2. Get high-quality Ollama embedding
        const queryEmbedding = await getEmbeddings(message);

        // 3. Search documents across all authorized namespaces
        let matches: any[] = [];
        let context = "";
        let sources = "";
        let crossDomainUsed = false;

        if (queryEmbedding.length > 0) {
            matches = await queryNamespace(queryEmbedding, { accessKey: authorizedKeys }, 10, message) || [];
        }

        // 4. If vector search returned nothing but we know there are connected files,
        //    fall back to pure keyword search so cross-domain chunks are never silently lost
        if (matches.length === 0 && authorizedKeys.length > 1) {
            matches = await queryNamespace([], { accessKey: authorizedKeys }, 10, message) || [];
        }

        // 5. If the user's query explicitly references a specific known file by name,
        //    filter matches to only include chunks from that file.
        //    This prevents semantically-similar-but-irrelevant chunks from other files
        //    from polluting the context and source citations.
        const messageLower = message.toLowerCase();
        const mentionedFile = fileNames.find(name => {
            // Strip ALL extensions (handles .md.docx, .tar.gz, etc.)
            const stripped = name.replace(/(\.[^/.]+)+$/, "").toLowerCase();

            // Direct full name match
            if (messageLower.includes(stripped) || messageLower.includes(name.toLowerCase())) return true;

            // Word-by-word match: split "Project_Alpha_Budget" → ["project", "alpha", "budget"]
            // and check if at least 60% of the meaningful words appear in the user's message
            const words = stripped.split(/[_\-\s]+/).filter(w => w.length > 2);
            if (words.length === 0) return false;
            const matchedWords = words.filter(w => messageLower.includes(w));
            return matchedWords.length >= Math.ceil(words.length * 0.6);
        });
        if (mentionedFile) {
            const filtered = matches.filter((m: any) => m.metadata?.fileName === mentionedFile);
            // Only apply the filter if it gives us results — don't leave user with nothing
            if (filtered.length > 0) {
                matches = filtered;
            }
        }

        if (matches.length > 0) {
            context = matches.map((m: any) => {
                if (m.metadata?.accessKey !== accessKey) crossDomainUsed = true;
                const pageStr = m.metadata?.pageNumber ? ` p.${m.metadata.pageNumber}` : "";
                const lineStr = m.metadata?.startLine && m.metadata?.endLine
                    ? ` (Lines ${m.metadata.startLine}-${m.metadata.endLine})`
                    : "";
                return `[${m.metadata?.fileName || "doc"}${pageStr}${lineStr}]: ${m.metadata?.text?.slice(0, 500)}`;
            }).join("\n\n");

            sources = Array.from(new Set(matches.map((m: any) => {
                const pageStr = m.metadata?.pageNumber ? ` p.${m.metadata.pageNumber}` : "";
                const lineStr = m.metadata?.startLine && m.metadata?.endLine
                    ? `, Lines ${m.metadata.startLine}-${m.metadata.endLine}`
                    : "";
                const inner = [pageStr, lineStr].filter(Boolean).join("").replace(/^,\s*/, "");
                return `${m.metadata?.fileName || "doc"}${inner ? ` (${inner})` : ""}`;
            }))).join(", ");
        }

        // Build prompt with document awareness
        const basePrompt = SYSTEM_PROMPTS[domain] || SYSTEM_PROMPTS.general;

        // Only append chart instructions if the user explicitly requested a chart
        const chartSection = userWantsChart(message) ? `\n${CHART_INSTRUCTIONS}` : "";

        const connectedSection = connectedFileNames.length > 0
            ? `\nYou also have READ ACCESS to documents from a connected domain: ${connectedFileNames.join(", ")}. These are fully available to answer questions about.`
            : "";

        const isSummary = isSummaryRequest(message);

        const awarenessPrompt = `
You have access to the following documents from this assistant: ${ownFileNames.length > 0 ? ownFileNames.join(", ") : "none"}${connectedSection}

IMPORTANT INSTRUCTIONS:
1. All documents listed above — both own and connected — are FULLY accessible to you. Never say you lack access to them.
2. NEVER include inline citations, bracketed source tags, or [Source: ...] annotations anywhere in your response. Your response must be clean, fluent, and professional prose or structured formatting — no citation brackets of any kind.
3. If the user asks to "summarize the document" and there are MULTIPLE documents, ask WHICH one: "Which document would you like summarized: ${fileListStr}?"
4. If the user refers to "the document" and only ONE is available, assume they mean that one.
5. If context is empty for a specific file, say "I can see ${fileListStr} are available but couldn't retrieve matching content — try rephrasing your question."
`;

        const systemPrompt = matches.length > 0 && responseMode === "strict"
            ? `${basePrompt}${chartSection}\n${awarenessPrompt}\n\nUse only this context to answer. Be specific and accurate.\n\n${context}`
            : matches.length > 0
                ? `${basePrompt}${chartSection}\n${awarenessPrompt}\n\nUse this context if relevant:\n${context}`
                : `${basePrompt}${chartSection}\n${awarenessPrompt}`;

        // Call LLM
        if (!groq) {
            // Local fallback
            try {
                const ollamaUrl = `${process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434"}/api/chat`;
                const model = process.env.OLLAMA_CHAT_MODEL || "qwen2.5:3b";

                const response = await fetch(ollamaUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            { role: "system", content: systemPrompt },
                            ...(history || []).slice(-3).map((m: any) => ({
                                role: m.role === "user" ? "user" : "assistant",
                                content: m.content || ""
                            })),
                            { role: "user", content: message }
                        ],
                        stream: false
                    }),
                    signal: AbortSignal.timeout(60000) // Increased to 60s for 3B model
                });

                if (!response.ok) {
                    const errText = await response.text();
                    throw new Error(`Ollama Error (${response.status}): ${errText}`);
                }

                const data = await response.json();
                const rawContent = data.message?.content || "";
                const parsedCitations = parseActualCitations(rawContent);
                const cleanedContent = stripCitations(rawContent);
                const matchDocs = Array.from(new Set(matches.map((m: any) => m.metadata?.fileName).filter(Boolean)));
                const reasoningTraceLines = [
                    `🎯 Target Domains: ${authorizedKeys.join(", ")}`
                ];
                if (isSummary) {
                    reasoningTraceLines.push(`🚀 Information summarized from:`);
                    const summaryDocs = matchDocs.length > 0 ? matchDocs : (ownFileNames.length > 0 ? ownFileNames : ["Uploaded documents"]);
                    summaryDocs.forEach((docName) => {
                        reasoningTraceLines.push(`   • ${docName}`);
                    });
                } else {
                    reasoningTraceLines.push(`🚀 Information cited directly from:`);
                    if (parsedCitations.length > 0) {
                        parsedCitations.forEach((cit: string) => {
                            reasoningTraceLines.push(`   • ${cit}`);
                        });
                    } else {
                        reasoningTraceLines.push(`   ⚠️ No matching local document sources were cited in this response.`);
                    }
                }
                const finalReasoning = reasoningTraceLines.join("\n");

                return NextResponse.json({
                    role: "assistant",
                    content: cleanedContent || "No response.",
                    confidence: matches.length > 0 ? 85 : 60,
                    source: sources,
                    crossDomainUsed,
                    reasoning: finalReasoning,
                    time: Date.now() - startTime
                });
            } catch (err: any) {
                console.error("Ollama fallback error:", err);
                return NextResponse.json({
                    role: "assistant",
                    content: `Local LLM unavailable: ${err.message || "Connection refused"}. Is Ollama running?`,
                    confidence: 0,
                    source: ""
                });
            }
        }

        // Groq cloud
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                ...(history || []).slice(-5).map((m: any) => ({
                    role: m.role === "user" ? "user" : "assistant",
                    content: m.content || ""
                })),
                { role: "user", content: message }
            ],
            temperature: responseMode === "strict" ? 0.1 : 0.3,
            max_tokens: 4096
        });

        const rawContent = completion.choices[0]?.message?.content || "No response generated.";
        const parsedCitations = parseActualCitations(rawContent);
        const content = stripCitations(rawContent);
        const matchDocs = Array.from(new Set(matches.map((m: any) => m.metadata?.fileName).filter(Boolean)));
        const reasoningTraceLines = [
            `🎯 Target Domains: ${authorizedKeys.join(", ")}`
        ];
        if (isSummary) {
            reasoningTraceLines.push(`🚀 Information summarized from:`);
            const summaryDocs = matchDocs.length > 0 ? matchDocs : (ownFileNames.length > 0 ? ownFileNames : ["Uploaded documents"]);
            summaryDocs.forEach((docName) => {
                reasoningTraceLines.push(`   • ${docName}`);
            });
        } else {
            reasoningTraceLines.push(`🚀 Information cited directly from:`);
            if (parsedCitations.length > 0) {
                parsedCitations.forEach((cit: string) => {
                    reasoningTraceLines.push(`   • ${cit}`);
                });
            } else {
                reasoningTraceLines.push(`   ⚠️ No matching local document sources were cited in this response.`);
            }
        }
        const finalReasoning = reasoningTraceLines.join("\n");

        return NextResponse.json({
            role: "assistant",
            content,
            confidence: matches.length > 0 ? 95 : 70,
            source: sources,
            crossDomainUsed,
            reasoning: finalReasoning,
            time: Date.now() - startTime
        });

    } catch (error: any) {
        console.error("Chat error:", error);
        return NextResponse.json({
            error: error.message || "An unexpected error occurred."
        }, { status: 500 });
    }
}
