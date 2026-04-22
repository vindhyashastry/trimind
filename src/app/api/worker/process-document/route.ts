import { NextResponse } from "next/server";
import { parsePDF, parseExcel, chunkText } from "@/lib/file-parser";
import { upsertDocumentBatch } from "@/lib/vector-store";
import { storage } from "@/lib/storage";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

// TF-IDF style embedding - captures word frequencies so similar texts get similar vectors
function textEmbedding(text: string, dimensions: number = 384): number[] {
    const words = text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 2);

    // Build word frequency map
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

    const embedding = new Array(dimensions).fill(0);

    // Map each word to a dimension slot using stable hash
    Object.entries(freq).forEach(([word, count]) => {
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            hash = ((hash << 5) - hash) + word.charCodeAt(i);
            hash = hash & hash;
        }
        const idx = Math.abs(hash) % dimensions;
        embedding[idx] += count / words.length; // TF score
    });

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0)) || 1;
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

        console.time(`ProcessDoc-${documentId}`);
        console.log(`[Worker] Starting: ${originalName} (${documentId})`);

        // Mark as processing
        await prisma.document.update({
            where: { id: documentId },
            data: { status: "PROCESSING" }
        });

        // Download file
        console.log(`[Worker] Downloading...`);
        const buffer = await storage.downloadFile(fileUri);

        // Extract text
        console.log(`[Worker] Parsing content...`);
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

        // Chunk text
        console.log(`[Worker] Chunking...`);
        const chunks = chunkText(text, 800, 100);

        let totalChunks = 0;
        const recordsToUpsert = [];

        console.log(`[Worker] Generating hashes for ${chunks.length} chunks...`);
        for (const chunkText of chunks) {
            const chunkId = nanoid();
            const embedding = textEmbedding(chunkText);
            
            recordsToUpsert.push({
                id: chunkId,
                vector: embedding,
                metadata: {
                    text: chunkText,
                    fileName: originalName,
                    domain,
                    assistantName,
                    accessKey,
                    chunkIndex: recordsToUpsert.length,
                    timestamp: new Date().toISOString(),
                    parentDocumentId: documentId
                }
            });
        }

        // Batch upsert to vector store
        console.log(`[Worker] Saving to Vector Store...`);
        await upsertDocumentBatch(recordsToUpsert);
        totalChunks = recordsToUpsert.length;

        // Mark complete
        await prisma.document.update({
            where: { id: documentId },
            data: { status: "SUCCESS" }
        });

        console.timeEnd(`ProcessDoc-${documentId}`);
        console.log(`[Worker] Finished: ${originalName}`);

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
