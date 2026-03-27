import { PrismaClient } from '../src/lib/generated/client';

async function main() {
    const prisma = new PrismaClient();
    try {
        const assistants = await prisma.assistant.findMany();
        console.log(JSON.stringify(assistants, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
