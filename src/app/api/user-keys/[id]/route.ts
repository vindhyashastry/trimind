import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-utils';
import prisma from '@/lib/prisma';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = (await cookies()).get('auth-token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Auth required' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload || !payload.userId) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        // Verify ownership before delete
        const assistant = await prisma.assistant.findUnique({
            where: { id }
        });

        if (!assistant || assistant.userId !== payload.userId) {
            return NextResponse.json({ error: 'Assistant not found or unauthorized' }, { status: 404 });
        }

        await prisma.assistant.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete assistant error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
