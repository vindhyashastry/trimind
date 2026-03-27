import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-utils';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const token = (await cookies()).get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ assistants: [] });
        }

        const payload = verifyToken(token);
        if (!payload || !payload.userId) {
            return NextResponse.json({ assistants: [] });
        }

        const assistantsRaw = await prisma.assistant.findMany({
            where: { userId: payload.userId },
            orderBy: { createdAt: 'desc' }
        });

        // Map for frontend compatibility
        const assistants = assistantsRaw.map(a => ({
            ...a,
            domain: a.category || 'general'
        }));

        return NextResponse.json({ assistants });
    } catch (error) {
        console.error('Fetch assistants error:', error);
        return NextResponse.json({ assistants: [] });
    }
}
