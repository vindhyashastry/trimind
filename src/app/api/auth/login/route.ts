import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/user-db';
import { verifyPassword, generateToken } from '@/lib/auth-utils';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const user = findUserByEmail(email);
        if (!user || !verifyPassword(password, user.passwordHash)) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = generateToken({ userId: user.id, email: user.email });

        // Sync into Prisma so FK constraints on Assistant.userId work
        // (covers users who registered before this fix was applied)
        await prisma.user.upsert({
            where: { id: user.id },
            create: {
                id: user.id,
                email: user.email,
                password: user.passwordHash,
                name: user.name,
            },
            update: {} // already exists, no-op
        });

        // Set cookie
        (await cookies()).set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
