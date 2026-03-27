import { NextResponse } from 'next/server';
import { findUserByEmail, addUser, User } from '@/lib/user-db';
import { hashPassword, generateToken } from '@/lib/auth-utils';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const newUser: User = {
            id: nanoid(),
            email,
            passwordHash: hashPassword(password),
            name,
            createdAt: new Date().toISOString(),
        };

        addUser(newUser);

        const token = generateToken({ userId: newUser.id, email: newUser.email });

        // Set cookie
        (await cookies()).set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });
    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
