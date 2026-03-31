import { NextResponse } from "next/server";
import { parsePDF, parseExcel, chunkText } from "@/lib/file-parser";
import { upsertDocument } from "@/lib/vector-store";
import { storage } from "@/lib/storage";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

// Simple hash-based embedding (deterministic, fast, no external call)
function hashEmbedding(text: string, dimensions: number = 384): number[] {
    const embedding: number[] = [];
    let hash = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    for (let i = 0; i < dimensions; i++) {
        const seed = hash + i;
        const value = Math.sin(seed) * 10000;
        embedding.push(value - Math.floor(value));
    }
    
    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0));
    return embedding.map(v => v / magnitude);
}

export async function POST(req: Request) {
    let documentId: string | null = null;
    let originalName = "document";

    try {
        const body = await req.json();
        documentId = body.documentId;
        originalName = body.originalName || "document";
        const { assistantName, domain, accessKey, fileUri } = body;

        if (!documentId || !fileUri) {
            return NextResponse.json({ error: "Missing required payload" }, { status: 400 });
        }

        // Mark as processing
        await prisma.document.update({
            where: { id: documentId },
            data: { status: "PROCESSING" }
        });

        // Download file
        const buffer = await storage.downloadFile(fileUri);

        // Extract text
        let text = "";
        if (originalName.endsWith(".pdf")) {
            const result = await parsePDF(buffer);
            text = result.text;
        } else if (originalName.endsWith(".xlsx") || originalName.endsWith(".xls")) {
            text = await parseExcel(buffer);
        } else {
            text = buffer.toString("utf-8");
        }

        if (!text.trim()) {
            throw new Error("Document is empty.");
        }

        // Chunk text (simpler, faster)
        const chunks = chunkText(text, 800, 100);

        // Process chunks with fast hash embeddings
        let totalChunks = 0;
        const BATCH_SIZE = 10;
        
        for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
            const batch = chunks.slice(i, i + BATCH_SIZE);
            
            await Promise.all(batch.map(async (chunkText, idx) => {
                const chunkId = nanoid();
                const embedding = hashEmbedding(chunkText);
                
                await upsertDocument(chunkId, embedding, {
                    text: chunkText,
                    fileName: originalName,
                    domain,
                    assistantName,
                    accessKey,
                    chunkIndex: i + idx,
                    timestamp: new Date().toISOString(),
                    parentDocumentId: documentId
                });
            }));
            
            totalChunks += batch.length;
        }

        // Mark complete
        await prisma.document.update({
            where: { id: documentId },
            data: { status: "SUCCESS" }
        });

        return NextResponse.json({ success: true, chunks: totalChunks });

    } catch (error: any) {
        if (documentId) {
            try {
                await prisma.document.update({
                    where: { id: documentId },
                    data: { status: "ERROR", errorMessage: error.message }
                });
            } catch {}
        }
        return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
}
