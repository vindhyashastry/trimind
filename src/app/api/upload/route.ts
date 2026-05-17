import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth-utils";
import { findUserById } from "@/lib/user-db";

export async function POST(req: NextRequest) {
    try {
        const token = (await cookies()).get('auth-token')?.value;
        const payload = token ? verifyToken(token) : null;
        const formData = await req.formData();

        const files = formData.getAll("files") as File[];
        const domain = formData.get("domain") as string;
        const assistantName = formData.get("assistantName") as string;
        const mode = (formData.get("mode") as string) || "strict";

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        // 1. First, check if we are uploading to an EXISTING assistant (Guest mode)
        const accessKeyInput = formData.get("accessKey") as string;
        let assistant = accessKeyInput ? await prisma.assistant.findUnique({ where: { accessKey: accessKeyInput } }) : null;

        // 2. If no assistant found by key, this must be a NEW assistant (Build mode)
        if (!assistant) {
            // Require login for NEW assistant creation
            if (!payload || !payload.userId) {
                return NextResponse.json({ error: "Assistant not found. Login required to create new assistants." }, { status: 401 });
            }

            // Verify the user exists in the same store that signup/login uses (user-db.json)
            // NOT Prisma — auth is file-based, not DB-based
            const userExists = findUserById(payload.userId);
            if (!userExists) {
                return NextResponse.json({ error: "Session stale. Please log out and log back in." }, { status: 403 });
            }

            // Generate a key if not provided (should only happen in Build mode)
            const finalKey = accessKeyInput || `DPA-${nanoid(6).toUpperCase()}`;

            assistant = await prisma.assistant.create({
                data: {
                    id: nanoid(),
                    userId: payload.userId,
                    accessKey: finalKey,
                    name: assistantName || "New Assistant",
                    category: domain || "general",
                    mode: mode,
                }
            });
        }
        else {
            // Update mode for existing assistant if it changed
            if (mode && mode !== assistant.mode) {
                await prisma.assistant.update({
                    where: { id: assistant.id },
                    data: { mode }
                });
            }
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
            // Using a local fallback for the baseUrl to ensure the server can call itself even through ngrok tunnels
            const baseUrl = req.nextUrl.origin.includes('ngrok') ? 'http://localhost:3000' : req.nextUrl.origin;

            fetch(`${baseUrl}/api/worker/process-document`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documentId: dbDoc.id,
                    assistantName: assistant.name,
                    domain: assistant.category,
                    accessKey: assistant.accessKey,
                    fileUri,
                    originalName: file.name
                })
            }).catch(e => console.error("Failed to enqueue background job", e));
        }

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
