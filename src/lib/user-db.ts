import prisma from '@/lib/prisma';

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    name?: string;
    createdAt: string;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
    });
    if (!user) return undefined;
    return {
        id: user.id,
        email: user.email,
        passwordHash: user.password,
        name: user.name || undefined,
        createdAt: user.createdAt.toISOString()
    };
}

export async function findUserById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
        where: { id }
    });
    if (!user) return undefined;
    return {
        id: user.id,
        email: user.email,
        passwordHash: user.password,
        name: user.name || undefined,
        createdAt: user.createdAt.toISOString()
    };
}

export async function addUser(user: User) {
    await prisma.user.upsert({
        where: { email: user.email.toLowerCase() },
        update: {
            password: user.passwordHash,
            name: user.name || null
        },
        create: {
            id: user.id,
            email: user.email.toLowerCase(),
            password: user.passwordHash,
            name: user.name || null
        }
    });
}
