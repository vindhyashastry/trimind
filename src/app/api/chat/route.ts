import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getEmbeddings, queryNamespace } from "@/lib/vector-store";
import prisma from "@/lib/prisma";

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

export async function POST(req: NextRequest) {
    try {
        const { message, domain, accessKey, history, responseMode = "hybrid" } = await req.json();

        if (!accessKey?.startsWith("DPA-")) {
            return NextResponse.json({ error: "Unauthorized access key" }, { status: 401 });
        }

        // 1. Generate embedding for the user message
        const queryEmbedding = await getEmbeddings(message);

        // 2. Search vector store for relevant document chunks
        const matches = await queryNamespace(queryEmbedding, { domain, accessKey }, 10, message);

        // 2b. Bridge Logic - Query connected assistants for additional context
        const assistant = await prisma.assistant.findUnique({
            where: { accessKey },
            include: {
                outgoingRelations: {
                    where: { permission: "read" },
                    include: {
                        target: {
                            select: { id: true, name: true, accessKey: true, category: true }
                        }
                    }
                }
            }
        });

        let crossDomainMatches: any[] = [];
        let crossDomainSources: string[] = [];

        if (assistant && assistant.outgoingRelations.length > 0) {
            console.log(`Bridge: Checking ${assistant.outgoingRelations.length} connected assistants...`);
            
            for (const relation of assistant.outgoingRelations) {
                try {
                    const targetMatches = await queryNamespace(
                        queryEmbedding, 
                        { accessKey: relation.target.accessKey }, 
                        5, 
                        message
                    );
                    
                    if (targetMatches && targetMatches.length > 0) {
                        crossDomainMatches = crossDomainMatches.concat(
                            targetMatches.map(m => ({
                                ...m,
                                _bridgeInfo: {
                                    assistantName: relation.target.name,
                                    assistantDomain: relation.target.category
                                }
                            }))
                        );
                        const targetSources = targetMatches.map(m => {
                            const p = m.metadata?.pageNumber;
                            return `${m.metadata?.fileName}${p ? ` (pg ${p})` : ''}`;
                        });
                        crossDomainSources.push(
                            `${relation.target.name}: ${Array.from(new Set(targetSources)).join(", ")}`
                        );
                    }
                } catch (err) {
                    console.error(`Bridge error querying ${relation.target.name}:`, err);
                }
            }
        }

        // 3. Extract context from matches with detailed source attribution
        const hasContext = matches && matches.length > 0;
        const hasCrossContext = crossDomainMatches.length > 0;
        
        // Group matches by file and page for better context organization
        const context = hasContext
            ? matches.map((m, i) => `[Source ${i+1}: ${m.metadata?.fileName}${m.metadata?.pageNumber ? `, Page ${m.metadata.pageNumber}` : ''}]\n${m.metadata?.text}`).join("\n\n---\n\n")
            : "";

        // Build cross-domain context
        const crossDomainContext = hasCrossContext
            ? crossDomainMatches.map((m, i) => 
                `[Cross-Source ${i+1}: ${m.metadata?.fileName}${m.metadata?.pageNumber ? `, Page ${m.metadata.pageNumber}` : ''} from ${m._bridgeInfo.assistantName}]\n${m.metadata?.text}`
              ).join("\n\n---\n\n")
            : "";

        // Combine contexts
        const fullContext = crossDomainContext
            ? context + "\n\n=== CONNECTED KNOWLEDGE BASE ===\n\n" + crossDomainContext
            : context;

        const sources = hasContext
            ? Array.from(new Set(matches.map(m => {
                const p = m.metadata?.pageNumber;
                return `${m.metadata?.fileName}${p ? ` (pg ${p})` : ''}`;
            }))).join(", ")
            : "";

        const allSources = hasCrossContext
            ? [sources, ...crossDomainSources].filter(Boolean).join(" | ")
            : sources;

        console.log(`Chat request: ${domain} | Mode: ${responseMode} | Local Context: ${hasContext} (${matches?.length || 0} chunks) | Cross-Domain: ${hasCrossContext} (${crossDomainMatches.length} chunks)`);

        // 4. Strict mode: refuse to answer if no context found in documents (including cross-domain)
        if (responseMode === "strict" && !hasContext && !hasCrossContext) {
            return NextResponse.json({
                role: "assistant",
                content: "⚠️ No relevant information was found in your uploaded documents (or connected assistants' documents) for this question.\n\nIn **Strict Mode**, I only answer from indexed knowledge bases. Please rephrase your question, or switch to **Hybrid Mode** to also use general knowledge.",
                confidence: 0,
                source: "",
                reasoning: [
                    { step: "Document Search", status: "complete", desc: "Searched indexed knowledge base and connected assistants." },
                    { step: "Strict Mode Check", status: "in-progress", desc: "No document context found. Blocked by strict mode policy." },
                ]
            });
        }

        // 5. Build system prompt based on mode
        const basePrompts: Record<string, string> = {
            finance: "You are a specialized Finance Assistant. Focus on accuracy, risk analysis, and financial forecasting.",
            legal: "You are a specialized Legal Assistant. Focus on contract law, compliance, and clause extraction. Be precise and avoid legal advice.",
            general: "You are a helpful general-purpose assistant.",
        };
        const basePrompt = basePrompts[domain as keyof typeof basePrompts] || basePrompts.general;

const CHART_INSTRUCTIONS = `
DATA VISUALIZATION:
If the user asks for a chart, graph, or visual representation of data (like counts, percentages, or trends), you MUST provide a JSON block with the language label "json" in the following format:
\`\`\`json
{
  "type": "pie" | "bar" | "line",
  "title": "Clear Chart Title",
  "data": [
    { "name": "Category A", "value": 10 },
    { "name": "Category B", "value": 20 }
  ],
  "config": {
    "xKey": "name",
    "yKey": "value"
  }
}
\`\`\`
- Use "pie" for distributions/percentages.
- Use "bar" for comparisons.
- Use "line" for trends over time.
- Always include a brief textual explanation BEFORE the chart.
`;

        let systemPrompt: string;
        if (responseMode === "strict") {
            systemPrompt = `${basePrompt}\n\nSTRICT MODE ENABLED: You MUST ONLY answer using the provided document context below. 
            - CITATIONS: You MUST cite where your information comes from using the source label, e.g., [Source 1] or [Source 2].
            - For cross-domain sources, cite them as [Cross-Source X] and mention which assistant they came from.
            - If the user asks for a summary, provide a high-level overview based on the provided chunks, citing specific pages if available.
            - If a specific fact is not found in the context, say: "I'm sorry, but I couldn't find information about that in your uploaded documents."
            - Do NOT use any outside knowledge.
             
            ${CHART_INSTRUCTIONS}
 
            ---
            DOCUMENT CONTEXT:
            ${fullContext}`;
        } else {
            // Hybrid: use docs as priority but can supplement with general knowledge
            systemPrompt = (hasContext || hasCrossContext)
                ? `${basePrompt}\n\nYou are a specialized assistant. Prioritize the following document context.
                - CITATIONS: When using the provided documents, cite them as [Source X] for local docs or [Cross-Source X] for connected assistants' docs.
                - You may supplement with general knowledge only when the documents do not fully address the question. 
                
                ${CHART_INSTRUCTIONS}
                
                ---
                DOCUMENT CONTEXT:
                ${fullContext}`
                : `${basePrompt}\n\nNo documents were found in the knowledge base. Answer using your general knowledge and clearly state this.\n\n${CHART_INSTRUCTIONS}`;
        }

        const reasoningSteps = [
            { step: "Vector Search", status: "complete", desc: `Found ${matches?.length || 0} relevant chunks from local documents.` },
            { step: "Bridge Check", status: "complete", desc: hasCrossContext ? `Found ${crossDomainMatches.length} chunks from ${crossDomainSources.length} connected assistant(s).` : "No connected assistants with relevant context." },
            { step: "Mode Check", status: "complete", desc: `${responseMode === "strict" ? "Strict: answers from documents only." : "Hybrid: documents + general knowledge."}` },
            { step: "Grounded Synthesis", status: "complete", desc: (hasContext || hasCrossContext) ? `Answering from: ${allSources}` : "No document context found, using general knowledge." },
        ];

        // 6. Local Ollama path (Fallback if No Groq Key)
        if (!groq) {
            return await handleLocalChat(message, domain, systemPrompt, history, hasContext || hasCrossContext, matches, allSources, reasoningSteps);
        }

        // 8. Define AI Tools (Agentic Workflows) - only enabled when user explicitly requests email/report
        const tools: any[] = [
            {
                type: "function",
                function: {
                    name: "generate_report_email",
                    description: "ONLY use this tool when the user EXPLICITLY asks to send an email or draft a formal email report. Do NOT use for regular questions.",
                    parameters: {
                        type: "object",
                        properties: {
                            recipient: { type: "string", description: "The name of the recipient (e.g., Manager, Client)." },
                            summary: { type: "string", description: "The concise summary of findings from the documents." },
                            urgency: { type: "string", enum: ["low", "medium", "high"], description: "The urgency of the email." }
                        },
                        required: ["recipient", "summary"]
                    }
                }
            }
        ];

        // Check if user is explicitly asking for email/report
        const isEmailRequest = /\b(email|send|draft|report|summary)\b.*\b(to|for|to the|to my)\b/i.test(message) || 
                               /\b(send|email|draft)\b.*\b(report|summary|email)\b/i.test(message);

        // 7. Cloud Groq path
        try {
            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt + (isEmailRequest ? "\n\nThe user is requesting an email/report. Use the 'generate_report_email' tool to draft it." : "\n\nDo NOT use any tools unless the user explicitly asks to send an email.") },
                    ...(history || []).slice(-5).map((m: any) => ({
                        role: m.role === "user" ? "user" : "assistant",
                        content: m.content || ""
                    })),
                    { role: "user", content: message }
                ],
                tools: tools,
                tool_choice: isEmailRequest ? "auto" : "none",
                temperature: responseMode === "strict" ? 0.0 : 0.3,
            });

            const responseMessage = completion.choices[0]?.message;
            let toolOutputs: any[] = [];

            if (responseMessage?.tool_calls) {
                for (const toolCall of responseMessage.tool_calls) {
                    if (toolCall.function.name === "generate_report_email") {
                        const args = JSON.parse(toolCall.function.arguments);
                        // In a real app, you'd call an email service here.
                        // For a project demo, we simulate the success.
                        toolOutputs.push({
                            tool_call_id: toolCall.id,
                            output: `Email summary successfully generated for ${args.recipient}. Content: ${args.summary.slice(0, 50)}...`
                        });
                    }
                }
            }

            return NextResponse.json({
                role: "assistant",
                content: responseMessage?.content || (responseMessage?.tool_calls ? "I've drafted the report email as requested." : "No response content from Groq."),
                confidence: (hasContext || hasCrossContext) ? 98 : 80,
                source: allSources,
                reasoning: reasoningSteps,
                actions: toolOutputs.length > 0 ? toolOutputs : undefined,
                crossDomainUsed: hasCrossContext,
            });
        } catch (groqError: any) {
            console.error("Groq API error, falling back to local:", groqError);
            return await handleLocalChat(message, domain, systemPrompt, history, hasContext || hasCrossContext, matches, allSources, reasoningSteps);
        }

    } catch (error) {
        console.error("Chat error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

// Export queryNamespace for use in other modules if needed
export { queryNamespace };

async function handleLocalChat(message: string, domain: string, systemPrompt: string, history: any[], hasContext: boolean, matches: any[] | null, sources: string, reasoningSteps: any[]) {
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    const model = process.env.OLLAMA_CHAT_MODEL || "qwen2.5:0.5b";

    console.log(`Local LLM fallback: ${model} at ${ollamaBaseUrl}`);

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout for slow PCs

        const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model,
                messages: [
                    { role: "system", content: systemPrompt },
                    ...(history || []).slice(-3).map((m: any) => ({ // Reduced history for efficiency
                        role: m.role === "user" ? "user" : "assistant",
                        content: m.content || ""
                    })),
                    { role: "user", content: message }
                ],
                stream: false,
                options: { temperature: 0.3 }
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Ollama error: ${response.statusText}`);
        const data = await response.json();

        return NextResponse.json({
            role: "assistant",
            content: data.message?.content || "No response from local model.",
            confidence: hasContext ? 92 : 60,
            source: sources,
            reasoning: reasoningSteps,
        });
    } catch (error: any) {
        console.error("Local LLM error:", error);
        const isTimeout = error.name === 'AbortError';

        return NextResponse.json({
            role: "assistant",
            content: isTimeout
                ? "⌛ The local reasoning pipeline is taking too long to respond. Your laptop might be under heavy load. Please try a shorter question or check Ollama performance."
                : hasContext
                    ? `(Local Mode Error) I found documents but the local LLM failed. Excerpt: "${matches![0]?.metadata?.text?.slice(0, 300)}..."`
                    : "⚠️ The local reasoning pipeline is currently unavailable. Please ensure Ollama is running.",
            confidence: 40,
            source: sources,
            error: isTimeout ? "Ollama timeout" : "Ollama connection failed"
        });
    }
}


