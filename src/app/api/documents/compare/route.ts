import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Groq from "groq-sdk";
import { queryNamespace } from "@/lib/vector-store";

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

export async function POST(req: NextRequest) {
    try {
        const { docId1, docId2, accessKey } = await req.json();

        if (!accessKey) {
            return NextResponse.json({ error: "Access key required" }, { status: 400 });
        }

        // 1. Fetch documents from DB to verify ownership and get details
        const doc1 = await prisma.document.findUnique({ where: { id: docId1 } });
        const doc2 = await prisma.document.findUnique({ where: { id: docId2 } });

        if (!doc1 || !doc2) {
            return NextResponse.json({ error: "One or both documents not found" }, { status: 404 });
        }

        // 2. Fetch content/chunks for both documents from the vector store
        // We query the vector store for ALL chunks of these specific documents
        const chunks1 = await queryNamespace([], { parentDocumentId: docId1, accessKey }, 100);
        const chunks2 = await queryNamespace([], { parentDocumentId: docId2, accessKey }, 100);

        const content1 = chunks1.map(m => m.metadata?.text).join("\n\n");
        const content2 = chunks2.map(m => m.metadata?.text).join("\n\n");

        if (!content1 || !content2) {
            return NextResponse.json({ error: "Could not retrieve content for comparison" }, { status: 400 });
        }

        const prompt = `
        You are an expert Document Analyst. Compare the following two documents and provide a structured analysis.
        
        DOCUMENT 1: ${doc1.fileName}
        DOCUMENT 2: ${doc2.fileName}
        
        GOAL: Identify key differences, similarities, and unique points in both.
        
        FORMAT:
        1. Executive Summary: High-level overview of how they differ.
        2. Comparison Table: Compare them on 3-5 key themes/attributes.
        3. Unique to Document 1: Points only found in ${doc1.fileName}.
        4. Unique to Document 2: Points only found in ${doc2.fileName}.
        
        ---
        CONTENT 1:
        ${content1.slice(0, 10000)} // LLM context limit safety
        
        ---
        CONTENT 2:
        ${content2.slice(0, 10000)}
        `;

        if (!groq) {
            return NextResponse.json({ error: "Cloud LLM (Groq) not configured for comparison" }, { status: 501 });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a professional document analysis agent." },
                { role: "user", content: prompt }
            ],
            temperature: 0.2,
        });

        return NextResponse.json({
            comparison: completion.choices[0]?.message?.content || "No comparison generated.",
            doc1Name: doc1.fileName,
            doc2Name: doc2.fileName
        });

    } catch (error) {
        console.error("Comparison error:", error);
        return NextResponse.json({ error: "Failed to compare documents" }, { status: 500 });
    }
}
