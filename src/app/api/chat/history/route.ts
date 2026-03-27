import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const accessKey = searchParams.get("accessKey");

        if (!accessKey) {
            return NextResponse.json({ error: "Access key required" }, { status: 400 });
        }

        const assistant = await prisma.assistant.findUnique({
            where: { accessKey },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        if (!assistant) {
            return NextResponse.json({ error: "Assistant not found" }, { status: 404 });
        }

        const messages = assistant.messages.map((msg: any) => {
            let content = msg.content;
            let metadata = null;
            
            if (content.startsWith("META:JSON:")) {
                const metaEnd = content.indexOf(":ENDMETA:");
                if (metaEnd > -1) {
                    try {
                        const jsonStr = content.slice(10, metaEnd);
                        metadata = JSON.parse(jsonStr);
                        content = content.slice(metaEnd + 9);
                    } catch { /* ignore */ }
                }
            }

            return {
                role: msg.role,
                content,
                timestamp: msg.timestamp,
                metadata
            };
        });

        return NextResponse.json({ messages });
    } catch (error) {
        console.error("Fetch history error:", error);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}
