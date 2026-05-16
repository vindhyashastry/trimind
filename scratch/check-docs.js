const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDocs() {
  const docs = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  console.log(JSON.stringify(docs, null, 2));
  process.exit(0);
}

checkDocs();
