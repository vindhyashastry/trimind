import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { queryNamespace } from "@/lib/vector-store";
import prisma from "@/lib/prisma";

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

// TF-IDF style embedding - must match exactly what worker stores
function textEmbedding(text: string, dimensions: number = 384): number[] {
    const words = text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 2);

    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

    const embedding = new Array(dimensions).fill(0);
    Object.entries(freq).forEach(([word, count]) => {
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            hash = ((hash << 5) - hash) + word.charCodeAt(i);
            hash = hash & hash;
        }
        const idx = Math.abs(hash) % dimensions;
        embedding[idx] += count / words.length;
    });

    const magnitude = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0)) || 1;
    return embedding.map(v => v / magnitude);
}

// Simple in-memory cache for embeddings
const embeddingCache = new Map<string, number[]>();

async function getCachedEmbeddings(text: string): Promise<number[]> {
    const cacheKey = text.slice(0, 100);
    if (embeddingCache.has(cacheKey)) {
        return embeddingCache.get(cacheKey)!;
    }
    
    // Use the same TF-IDF logic as the worker to ensure matching
    const embedding = textEmbedding(text);
    embeddingCache.set(cacheKey, embedding);
    return embedding;
}

const CHART_INSTRUCTIONS = `
When asked to create a chart/graph/visualization, respond ONLY with a JSON code block. 
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

const SYSTEM_PROMPTS: Record<string, string> = {
    finance: `You are a Finance Assistant. Answer questions about financial documents, balance sheets, and budgets. Be concise. ${CHART_INSTRUCTIONS}`,
    legal: `You are a Legal Assistant. Answer questions about contracts, compliance, and legal documents. Be concise. ${CHART_INSTRUCTIONS}`,
    general: `You are a helpful assistant. Be concise. ${CHART_INSTRUCTIONS}`
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

        // Fetch all indexed documents to provide awareness to the AI
        const allDocs = await prisma.document.findMany({
            where: { 
                assistant: { accessKey: { in: authorizedKeys } }, 
                status: "SUCCESS" 
            },
            select: { fileName: true }
        });
        const fileNames = Array.from(new Set(allDocs.map(d => d.fileName)));
        const fileListStr = fileNames.length > 0 ? fileNames.join(", ") : "No documents uploaded yet.";

        // 2. Get embedding (with cache)
        const queryEmbedding = await getCachedEmbeddings(message);
        
        // 3. Search documents across all authorized namespaces
        let matches: any[] = [];
        let context = "";
        let sources = "";
        let crossDomainUsed = false;
        
        if (queryEmbedding.length > 0) {
            matches = await queryNamespace(queryEmbedding, { accessKey: authorizedKeys }, 10, message) || [];
            
            if (matches.length > 0) {
                context = matches.map((m: any, i: number) => {
                    if (m.metadata?.accessKey !== accessKey) crossDomainUsed = true;
                    return `[${m.metadata?.fileName || "doc"}${m.metadata?.pageNumber ? ` p.${m.metadata.pageNumber}` : ""}]: ${m.metadata?.text?.slice(0, 500)}`;
                }).join("\n\n");
                
                sources = Array.from(new Set(matches.map((m: any) => 
                    `${m.metadata?.fileName}${m.metadata?.pageNumber ? ` (p.${m.metadata.pageNumber})` : ""}`
                ))).join(", ");
            }
        }

        // Build prompt with document awareness
        const basePrompt = SYSTEM_PROMPTS[domain] || SYSTEM_PROMPTS.general;
        const awarenessPrompt = `
You have access to the following uploaded documents: ${fileListStr}

IMPORTANT INSTRUCTIONS:
1. If the user asks to "summarize the document" and there are MULTIPLE documents available, ask the user WHICH document they would like summarized (e.g., "I see you have ${fileNames.length} documents. Which one would you like me to summarize: ${fileListStr}?").
2. If the user refers to "the document" and only ONE document is available, assume they mean that one.
3. If the user asks about documents but your context is empty, explain that you see the files ${fileListStr} but they might not contain matching keywords for their specific query.
`;

        const systemPrompt = matches.length > 0 && responseMode === "strict"
            ? `${basePrompt}\n${awarenessPrompt}\n\nUse only this context to answer. Be specific and cite sources.\n\n${context}`
            : matches.length > 0
            ? `${basePrompt}\n${awarenessPrompt}\n\nUse this context if relevant:\n${context}`
            : `${basePrompt}\n${awarenessPrompt}`;

        // Call LLM
        if (!groq) {
            // Local fallback
            try {
                const response = await fetch(`${process.env.OLLAMA_BASE_URL || "http://localhost:11434"}/api/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: process.env.OLLAMA_CHAT_MODEL || "qwen2.5:0.5b",
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
                    signal: AbortSignal.timeout(30000)
                });
                
                const data = await response.json();
                return NextResponse.json({
                    role: "assistant",
                    content: data.message?.content || "No response.",
                    confidence: matches.length > 0 ? 85 : 60,
                    source: sources,
                    crossDomainUsed,
                    reasoning: `Queried Domains: ${authorizedKeys.join(", ")}`,
                    time: Date.now() - startTime
                });
            } catch {
                return NextResponse.json({
                    role: "assistant",
                    content: "Local LLM unavailable.",
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

        const content = completion.choices[0]?.message?.content || "No response generated.";
        
        return NextResponse.json({
            role: "assistant",
            content,
            confidence: matches.length > 0 ? 95 : 70,
            source: sources,
            crossDomainUsed,
            reasoning: `Queried Domains: ${authorizedKeys.join(", ")}`,
            time: Date.now() - startTime
        });

    } catch (error: any) {
        console.error("Chat error:", error);
        return NextResponse.json({
            role: "assistant",
            content: `Error: ${error.message}`,
            confidence: 0,
            source: ""
        }, { status: 500 });
    }
}
