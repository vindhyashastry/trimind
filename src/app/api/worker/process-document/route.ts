import { NextResponse } from "next/server";
import { parsePDF, parseExcel, chunkTextWithMetadata, ChunkMetadata } from "@/lib/file-parser";
import { getEmbeddings, upsertDocument } from "@/lib/vector-store";
import { storage } from "@/lib/storage";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

export const maxDuration = 300; // Allows up to 5 minutes on Vercel Pro, though we want to keep it async

export async function POST(req: Request) {
    let documentId: string | null = null;
    let originalName: string = "document";

    try {
        const body = await req.json();
        documentId = body.documentId;
        originalName = body.originalName || "document";
        const { assistantName, domain, accessKey, fileUri } = body;

        if (!documentId || !fileUri) {
             return NextResponse.json({ error: "Missing required payload" }, { status: 400 });
        }

        // 1. Mark as processing in DB
        await prisma.document.update({
            where: { id: documentId },
            data: { status: "PROCESSING" }
        });

        // 2. Download from "Cloud Storage"
        console.log(`[Worker] Downloading ${originalName} from ${fileUri}`);
        const buffer = await storage.downloadFile(fileUri);

        // 3. Extract text and pages
        console.log(`[Worker] Parsing content...`);
        let text = "";
        let pages: { text: string, pageNumber: number }[] = [];

        if (originalName.endsWith(".pdf")) {
            const result = await parsePDF(buffer);
            text = result.text;
            pages = result.pages;
        } else if (originalName.endsWith(".xlsx") || originalName.endsWith(".xls")) {
            text = await parseExcel(buffer);
            pages = [{ text, pageNumber: 1 }];
        } else {
            text = buffer.toString("utf-8");
            pages = [{ text, pageNumber: 1 }];
        }

        if (!text.trim()) {
            throw new Error("Document is empty or could not be parsed.");
        }

        // 4. Chunk & Embed with Parallel Processing and Rich Metadata
        console.log(`[Worker] Chunking and embedding ${originalName}...`);
        
        // Define a function to process a single chunk with rich metadata
        const processChunk = async (chunkMeta: ChunkMetadata, documentId: string) => {
            const embedding = await getEmbeddings(chunkMeta.text);
            const chunkId = nanoid();
            await upsertDocument(chunkId, embedding, {
                text: chunkMeta.text,
                precedingText: chunkMeta.precedingText,
                followingText: chunkMeta.followingText,
                fileName: originalName,
                domain,
                assistantName,
                accessKey,
                pageNumber: chunkMeta.pageNumber,
                chunkIndex: chunkMeta.chunkIndex,
                totalChunks: chunkMeta.totalChunks,
                startOffset: chunkMeta.startOffset,
                endOffset: chunkMeta.endOffset,
                timestamp: new Date().toISOString(),
                parentDocumentId: documentId,
                chunkId: chunkId
            });
            return chunkId;
        };

        // If we have pages, we chunk each page separately to preserve page attribution
        let totalChunks = 0;
        let allChunkIds: string[] = [];
        
        if (pages.length > 0) {
            for (const page of pages) {
                const pageChunks = chunkTextWithMetadata(page.text, 1000, 200, page.pageNumber);
                const BATCH_SIZE = 5;
                for (let i = 0; i < pageChunks.length; i += BATCH_SIZE) {
                    const batch = pageChunks.slice(i, i + BATCH_SIZE);
                    const chunkIds = await Promise.all(batch.map(chunk => 
                        processChunk(chunk, documentId!)
                    ));
                    allChunkIds.push(...chunkIds);
                }
                totalChunks += pageChunks.length;
            }
        } else {
            // Fallback if pages extraction failed for some reason
            const chunks = chunkTextWithMetadata(text, 1000, 200, 1);
            const BATCH_SIZE = 5;
            for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
                const batch = chunks.slice(i, i + BATCH_SIZE);
                const chunkIds = await Promise.all(batch.map(chunk => 
                    processChunk(chunk, documentId!)
                ));
                allChunkIds.push(...chunkIds);
            }
            totalChunks = chunks.length;
        }

        // 5. Mark as complete
        console.log(`[Worker] Finished processing ${originalName}. Total chunks: ${totalChunks}`);
        await prisma.document.update({
            where: { id: documentId },
            data: { status: "SUCCESS" }
        });

        return NextResponse.json({ success: true, chunks: totalChunks, chunkIds: allChunkIds });

    } catch (error: any) {
        console.error("[Worker] Fatal processing error:", error);
        
        if (documentId) {
            try {
                await prisma.document.update({
                    where: { id: documentId },
                    data: { status: "ERROR", errorMessage: error.message || "Failed to parse document." }
                });
            } catch (updateError) {
                console.error("[Worker] Failed to update error status in DB:", updateError);
            }
        }

        return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
}
