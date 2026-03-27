import { PrismaClient } from "../src/lib/generated/client";

const prisma = new PrismaClient();

async function check() {
    const accessKey = "DPA-F-EW7N2ERZ";
    const assistant = await prisma.assistant.findUnique({
        where: { accessKey },
        include: { documents: true }
    });

    if (!assistant) {
        console.log(`Assistant with key ${accessKey} NOT found in DB.`);
    } else {
        console.log(`Assistant found: ${assistant.name}`);
        console.log(`Documents in DB: ${assistant.documents.length}`);
        assistant.documents.forEach(d => console.log(`- ${d.fileName} (status: ${d.status})`));
    }
}

check().catch(console.error).finally(() => prisma.$disconnect());
