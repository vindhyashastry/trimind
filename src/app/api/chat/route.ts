import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { queryNamespace } from "@/lib/vector-store";

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

// Simple in-memory cache for embeddings
const embeddingCache = new Map<string, number[]>();

async function getCachedEmbeddings(text: string): Promise<number[]> {
    const cacheKey = text.slice(0, 100);
    if (embeddingCache.has(cacheKey)) {
        return embeddingCache.get(cacheKey)!;
    }
    
    try {
        const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
        const response = await fetch(`${ollamaUrl}/api/embeddings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text",
                prompt: text
            }),
            signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) return [];
        const data = await response.json();
        const embedding = data.embedding || [];
        
        // Cache for 5 minutes
        embeddingCache.set(cacheKey, embedding);
        setTimeout(() => embeddingCache.delete(cacheKey), 5 * 60 * 1000);
        
        return embedding;
    } catch {
        return [];
    }
}

const CHART_INSTRUCTIONS = `
When asked to create a chart/graph/visualization, respond ONLY with a JSON code block in this exact format:
\`\`\`json
{
  "type": "pie" | "bar" | "line",
  "title": "Chart Title",
  "data": [
    { "name": "Category A", "value": 100 },
    { "name": "Category B", "value": 200 }
  ],
  "config": {
    "xKey": "name",
    "yKey": "value"
  }
}
\`\`\`
Use "pie" for percentages/proportions, "bar" for comparisons, "line" for trends.
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

        // Get embedding (with cache)
        const queryEmbedding = await getCachedEmbeddings(message);
        
        // Search documents (skip if no embedding)
        let matches: any[] = [];
        let context = "";
        let sources = "";
        
        if (queryEmbedding.length > 0) {
            matches = await queryNamespace(queryEmbedding, { accessKey }, 5, message) || [];
            
            if (matches.length > 0) {
                context = matches.map((m: any, i: number) => 
                    `[${m.metadata?.fileName || "doc"}${m.metadata?.pageNumber ? ` p.${m.metadata.pageNumber}` : ""}]: ${m.metadata?.text?.slice(0, 500)}`
                ).join("\n\n");
                
                sources = Array.from(new Set(matches.map((m: any) => 
                    `${m.metadata?.fileName}${m.metadata?.pageNumber ? ` (p.${m.metadata.pageNumber})` : ""}`
                ))).join(", ");
            }
        }

        // Build prompt
        const basePrompt = SYSTEM_PROMPTS[domain] || SYSTEM_PROMPTS.general;
        const systemPrompt = matches.length > 0 && responseMode === "strict"
            ? `${basePrompt}\n\nUse only this context to answer. Be specific and cite sources.\n\n${context}`
            : matches.length > 0
            ? `${basePrompt}\n\nUse this context if relevant:\n${context}`
            : `${basePrompt}`;

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
            max_tokens: 1024
        });

        const content = completion.choices[0]?.message?.content || "No response generated.";
        
        return NextResponse.json({
            role: "assistant",
            content,
            confidence: matches.length > 0 ? 95 : 70,
            source: sources,
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
