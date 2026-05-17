import { NextResponse } from "next/server";
import { parsePDF, parseExcel, chunkText, cleanText, isMostlyGarbage } from "@/lib/file-parser";
import { upsertDocumentBatch } from "@/lib/vector-store";
import { storage } from "@/lib/storage";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

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
            // CSV, TXT, etc. — clean out any stray binary before chunking
            text = cleanText(buffer.toString("utf-8"));
        }

        if (!text.trim()) {
            throw new Error("Document is empty.");
        }

        // Chunk text
        console.log(`[Worker] Chunking...`);
        const chunks = chunkText(text, 800, 100);

        const { getEmbeddings } = await import("@/lib/vector-store");
        const recordsToUpsert = [];

        console.log(`[Worker] Generating embeddings for ${chunks.length} chunks via Ollama...`);
        let skipped = 0;
        for (const chunkText of chunks) {
            // Skip chunks that are mostly binary noise — don't pollute the vector DB
            if (isMostlyGarbage(chunkText)) {
                skipped++;
                continue;
            }

            const chunkId = nanoid();
            const vector = await getEmbeddings(chunkText);

            recordsToUpsert.push({
                id: chunkId,
                vector: vector || [],
                metadata: {
                    text: chunkText,
                    fileName: originalName,
                    domain,
                    assistantName,
                    accessKey,
                    chunkIndex: recordsToUpsert.length,
                    timestamp: new Date().toISOString(),
                    parentDocumentId: documentId,
                    vector: vector || []
                }
            });
        }
        if (skipped > 0) console.log(`[Worker] Skipped ${skipped} garbage chunks.`);

        // Batch upsert to vector store
        console.log(`[Worker] Saving to Vector Store...`);
        await upsertDocumentBatch(recordsToUpsert);
        const totalChunks = recordsToUpsert.length;

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
            } catch { }
        }
        return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
}
