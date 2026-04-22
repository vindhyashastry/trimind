import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const accessKey = searchParams.get("accessKey");

        if (!accessKey?.startsWith("DPA-")) {
            return NextResponse.json({ error: "Invalid access key" }, { status: 401 });
        }

        // Fetch the assistant this key belongs to get its documents
        const assistant = await prisma.assistant.findUnique({
             where: { accessKey },
             include: {
                 documents: {
                     orderBy: { createdAt: 'desc' }
                 }
             }
        });

        if (!assistant) {
             return NextResponse.json({ documents: [] });
        }

        // Map them to the shape the frontend currently expects, adding status
        const documents = assistant.documents.map((doc: any) => ({
             id: doc.id,
             fileName: doc.fileName,
             domain: assistant.category || 'general',
             assistantName: assistant.name,
             status: doc.status,
             errorMessage: doc.errorMessage,
             timestamp: doc.createdAt.toISOString()
        }));

        return NextResponse.json({ 
            documents,
            assistantId: assistant.id,
            assistantName: assistant.name,
            mode: assistant.mode || "strict"
        });
    } catch (error) {
        console.error("Documents API error:", error);
        return NextResponse.json({ documents: [] });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const documentId = searchParams.get("id");
        const accessKey = searchParams.get("accessKey");

        if (!documentId || !accessKey) {
            return NextResponse.json({ error: "Missing ID or access key" }, { status: 400 });
        }

        // 1. Verify document belongs to this access key
        const doc = await prisma.document.findFirst({
            where: {
                id: documentId,
                assistant: { accessKey }
            }
        });

        if (!doc) {
            return NextResponse.json({ error: "Document not found or unauthorized" }, { status: 404 });
        }

        // 2. Delete from Vector Store (Background)
        const { deleteDocument } = await import("@/lib/vector-store");
        await deleteDocument(documentId);

        // 3. Delete from Database
        await prisma.document.delete({
            where: { id: documentId }
        });

        return NextResponse.json({ success: true, message: "Document deleted" });
    } catch (error: any) {
        console.error("Delete document error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
