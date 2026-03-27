import { NextResponse } from "next/server";

export async function GET() {
    const mode = process.env.GROQ_API_KEY ? "cloud" : "local";
    const models = {
        chat: process.env.OLLAMA_CHAT_MODEL || "llama3",
        embed: process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text"
    };

    return NextResponse.json({
        mode,
        isLocal: !process.env.GROQ_API_KEY,
        ollama: mode === "local" ? models : null
    });
}
