import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth-utils";

export async function POST(req: NextRequest) {
    try {
        const token = (await cookies()).get('auth-token')?.value;
        const payload = token ? verifyToken(token) : null;

        if (!payload || !payload.userId) {
            console.log("Upload blocked: No valid token payload.");
            return NextResponse.json({ error: "Authentication required to build assistants" }, { status: 401 });
        }

        console.log(`Upload request from user: ${payload.userId}`);

        const formData = await req.formData();
        const files = formData.getAll("files") as File[];
        const domain = formData.get("domain") as string;
        const assistantName = formData.get("assistantName") as string;
        const accessKey = formData.get("accessKey") as string || `DPA-${nanoid(6).toUpperCase()}`;

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        // Register Assistant (Find or Create)
        let assistant = await prisma.assistant.findUnique({
             where: { accessKey }
        });

        if (!assistant) {
             assistant = await prisma.assistant.create({
                 data: {
                    id: nanoid(),
                    userId: payload.userId,
                    accessKey,
                    name: assistantName,
                    category: domain,
                 }
             });
        }

        console.log(`Receiving ${files.length} files for ${assistantName} (${domain})...`);

        const documentsResponse = [];

        // 1. Process standard uploads (No embedding yet)
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            
            // Upload to our generic Cloud Storage Service
            const fileUri = await storage.uploadFile(file.name, buffer);

            // Register Pending Document in Database
            const dbDoc = await prisma.document.create({
                 data: {
                     fileName: file.name,
                     storageUrl: fileUri,
                     status: "PENDING",
                     assistantId: assistant.id
                 }
            });

            documentsResponse.push({
                 id: dbDoc.id,
                 fileName: file.name,
                 status: dbDoc.status
            });

            // Fire and forget the background processing task
            // In a Vercel environment, standard fetch without await might get cancelled.
            // Using a full background queue (like Inngest) is ideal, but here we invoke it asynchronously.
            const baseUrl = req.nextUrl.origin;
            fetch(`${baseUrl}/api/worker/process-document`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({
                      documentId: dbDoc.id,
                      assistantName,
                      domain,
                      accessKey,
                      fileUri,
                      originalName: file.name
                 })
            }).catch(e => console.error("Failed to enqueue background job", e));
        }

        // 2. Immediately return success so the browser unblocks
        return NextResponse.json({
            message: "Documents uploaded and processing started.",
            documents: documentsResponse,
            domain
        });
    } catch (error: any) {
        console.error("Upload route error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process documents" },
            { status: 500 }
        );
    }
}
