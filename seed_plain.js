
const { PrismaClient } = require('@prisma/client');

console.log("Init client...");
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://matchabih:matchabih123@localhost:5432/matchabih?schema=public"
        }
    }
});

async function main() {
    console.log("Connecting...");
    await prisma.$connect();
    console.log("Connected!");
    await prisma.$disconnect();
}

main().catch(console.error);
