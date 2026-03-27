import { PrismaClient } from "../src/lib/generated/client";

const prisma = new PrismaClient();

async function list() {
    const assistants = await prisma.assistant.findMany();
    console.log(`Total assistants: ${assistants.length}`);
    assistants.forEach(a => console.log(`- ${a.name}: ${a.accessKey} (ID: ${a.id})`));
}

list().catch(console.error).finally(() => prisma.$disconnect());
