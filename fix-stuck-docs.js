const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetStuckDocs() {
  console.log('Finding documents stuck in PROCESSING state...');
  
  const stuckCount = await prisma.document.updateMany({
    where: {
      status: 'PROCESSING',
      updatedAt: {
        lt: new Date(Date.now() - 5 * 60 * 1000) // Older than 5 minutes
      }
    },
    data: {
      status: 'ERROR',
      errorMessage: 'Processing timed out. Please delete and re-upload.'
    }
  });

  console.log(`Updated ${stuckCount.count} stuck documents.`);
  process.exit(0);
}

resetStuckDocs();
