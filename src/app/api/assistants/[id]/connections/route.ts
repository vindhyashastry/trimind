import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth-utils";

// GET /api/assistants/[id]/connections - Get all connections for an assistant
export async function GET(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    
    // Verify authentication
    const token = (await cookies()).get('auth-token')?.value;
    const payload = token ? verifyToken(token) : null;
    
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Verify assistant belongs to user
    const assistant = await prisma.assistant.findFirst({
      where: { id, userId: payload.userId }
    });

    if (!assistant) {
      return NextResponse.json({ error: "Assistant not found" }, { status: 404 });
    }

    // Get all outgoing connections (assistants this one can query)
    const outgoingRelations = await prisma.assistantRelation.findMany({
      where: { sourceId: id },
      include: { 
        target: { 
          select: { 
            id: true, 
            name: true, 
            accessKey: true, 
            category: true 
          } 
        } 
      }
    });

    // Get all incoming connections (assistants that can query this one)
    const incomingRelations = await prisma.assistantRelation.findMany({
      where: { targetId: id },
      include: { 
        source: { 
          select: { 
            id: true, 
            name: true, 
            accessKey: true, 
            category: true 
          } 
        } 
      }
    });

    // Get other assistants owned by the same user (available to connect)
    const otherAssistants = await prisma.assistant.findMany({
      where: { 
        userId: payload.userId,
        id: { not: id }
      },
      select: { 
        id: true, 
        name: true, 
        accessKey: true, 
        category: true 
      }
    });

    return NextResponse.json({
      assistant: {
        id: assistant.id,
        name: assistant.name,
        accessKey: assistant.accessKey,
        category: assistant.category
      },
      outgoing: outgoingRelations.map(r => ({
        id: r.id,
        targetId: r.targetId,
        permission: r.permission,
        target: r.target
      })),
      incoming: incomingRelations.map(r => ({
        id: r.id,
        sourceId: r.sourceId,
        permission: r.permission,
        source: r.source
      })),
      available: otherAssistants.filter(a => 
        !outgoingRelations.some(r => r.targetId === a.id)
      )
    });
  } catch (error) {
    console.error("Get connections error:", error);
    return NextResponse.json(
      { error: "Failed to fetch connections" },
      { status: 500 }
    );
  }
}

// PUT /api/assistants/[id]/connections - Update connections for an assistant
export async function PUT(
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    
    // Verify authentication
    const token = (await cookies()).get('auth-token')?.value;
    const payload = token ? verifyToken(token) : null;
    
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Verify assistant belongs to user
    const assistant = await prisma.assistant.findFirst({
      where: { id, userId: payload.userId }
    });

    if (!assistant) {
      return NextResponse.json({ error: "Assistant not found" }, { status: 404 });
    }

    const { connections } = await req.json();
    
    // Validate input
    if (!Array.isArray(connections)) {
      return NextResponse.json({ error: "Invalid connections format" }, { status: 400 });
    }

    // Process each connection
    for (const conn of connections) {
      const { targetId, permission } = conn;
      
      // Verify target assistant exists and belongs to same user
      const targetAssistant = await prisma.assistant.findFirst({
        where: { 
          id: targetId,
          userId: payload.userId
        }
      });

      if (!targetAssistant) {
        continue; // Skip invalid targets
      }

      // Don't allow self-connections
      if (targetId === id) {
        continue;
      }

      if (permission === "none" || permission === null) {
        // Remove connection
        await prisma.assistantRelation.deleteMany({
          where: { 
            sourceId: id, 
            targetId: targetId 
          }
        });
      } else {
        // Upsert connection
        await prisma.assistantRelation.upsert({
          where: {
            sourceId_targetId: {
              sourceId: id,
              targetId: targetId
            }
          },
          update: {
            permission: permission
          },
          create: {
            sourceId: id,
            targetId: targetId,
            permission: permission
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update connections error:", error);
    return NextResponse.json(
      { error: "Failed to update connections" },
      { status: 500 }
    );
  }
}
