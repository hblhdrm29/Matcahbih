
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("Starting JS test...");
    try {
        const users = await prisma.user.findMany({ take: 1 });
        console.log("Found users:", users);
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
