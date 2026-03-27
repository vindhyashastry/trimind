import { PrismaClient } from '../src/lib/generated/client';

async function check() {
    const prisma = new PrismaClient();
    try {
        const messageCount = await prisma.message.count();
        const assistants = await prisma.assistant.findMany({
            include: { _count: { select: { messages: true } } }
        });
        
        console.log(`Total messages in DB: ${messageCount}`);
        assistants.forEach(a => {
            console.log(`Assistant ${a.accessKey}: ${a._count.messages} messages`);
        });

        if (messageCount > 0) {
            const lastMessages = await prisma.message.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' }
            });
            console.log("\nLast 5 messages:");
            lastMessages.forEach(m => console.log(`[${m.role}] ${m.content.substring(0, 50)}...`));
        }
    } catch (err) {
        console.error("Verification failed:", err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
