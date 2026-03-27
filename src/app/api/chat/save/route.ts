import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { accessKey, role, content, timestamp, metadata } = body;

        if (!accessKey || !role || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const assistant = await prisma.assistant.findUnique({
            where: { accessKey }
        });

        if (!assistant) {
            return NextResponse.json({ error: "Assistant not found" }, { status: 404 });
        }

        let finalContent = content;
        if (metadata) {
            finalContent = `META:JSON:${JSON.stringify(metadata)}:ENDMETA:${content}`;
        }

        const message = await prisma.message.create({
            data: {
                role,
                content: finalContent,
                timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                assistantId: assistant.id
            }
        });

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error("Save message error:", error);
        return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }
}
