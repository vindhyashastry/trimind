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

        return NextResponse.json({ documents });
    } catch (error) {
        console.error("Documents API error:", error);
        return NextResponse.json({ documents: [] });
    }
}
