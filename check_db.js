
const { PrismaClient } = require('@prisma/client');

console.log("Checking DB...");
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://matchabih:matchabih123@localhost:5432/matchabih?schema=public"
        }
    }
});

async function main() {
    try {
        const products = await prisma.product.findMany({
            select: { name: true, images: true, slug: true }
        });
        console.log("Current Products in DB:");
        console.log(JSON.stringify(products, null, 2));
    } catch (e) {
        console.error("Error querying DB:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
