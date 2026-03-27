import { NextRequest, NextResponse } from "next/server";
import { getChunkById, getChunksByDocumentId } from "@/lib/vector-store";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth-utils";

// GET /api/documents/chunk?chunkId=xxx&accessKey=DPA-xxx
// GET /api/documents/chunk?documentId=xxx&accessKey=DPA-xxx
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chunkId = searchParams.get("chunkId");
    const documentId = searchParams.get("documentId");
    const accessKey = searchParams.get("accessKey");

    if (!accessKey) {
      return NextResponse.json({ error: "Access key required" }, { status: 400 });
    }

    // Verify access key is valid
    if (!accessKey.startsWith("DPA-")) {
      return NextResponse.json({ error: "Invalid access key" }, { status: 400 });
    }

    // Verify the assistant exists with this access key
    const assistant = await prisma.assistant.findUnique({
      where: { accessKey }
    });

    if (!assistant) {
      return NextResponse.json({ error: "Assistant not found" }, { status: 404 });
    }

    // Get single chunk by ID
    if (chunkId) {
      const chunk = await getChunkById(chunkId);
      
      if (!chunk) {
        return NextResponse.json({ error: "Chunk not found" }, { status: 404 });
      }

      // Verify the chunk belongs to this access key
      if (chunk.metadata.accessKey !== accessKey) {
        return NextResponse.json({ error: "Unauthorized access to this chunk" }, { status: 403 });
      }

      return NextResponse.json({
        id: chunk.id,
        fileName: chunk.metadata.fileName,
        pageNumber: chunk.metadata.pageNumber,
        text: chunk.metadata.text,
        precedingText: chunk.metadata.precedingText || "",
        followingText: chunk.metadata.followingText || "",
        chunkIndex: chunk.metadata.chunkIndex,
        totalChunks: chunk.metadata.totalChunks,
        sectionTitle: chunk.metadata.sectionTitle,
        documentId: chunk.metadata.parentDocumentId
      });
    }

    // Get all chunks for a document
    if (documentId) {
      const chunks = await getChunksByDocumentId(documentId, accessKey);
      
      return NextResponse.json({
        documentId,
        chunks: chunks.map(c => ({
          id: c.id,
          fileName: c.metadata.fileName,
          pageNumber: c.metadata.pageNumber,
          text: c.metadata.text,
          chunkIndex: c.metadata.chunkIndex,
          totalChunks: c.metadata.totalChunks
        }))
      });
    }

    return NextResponse.json({ error: "Provide either chunkId or documentId" }, { status: 400 });

  } catch (error) {
    console.error("Chunk fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chunk" },
      { status: 500 }
    );
  }
}
