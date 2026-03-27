import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-utils';
import { findUserById } from '@/lib/user-db';

export async function GET() {
    try {
        const token = (await cookies()).get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ user: null });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ user: null });
        }

        const user = findUserById(payload.userId);
        if (!user) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch (error) {
        return NextResponse.json({ user: null });
    }
}
