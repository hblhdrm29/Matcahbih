import { prisma } from "../src/lib/prisma";

async function main() {
    try {
        console.log("Connecting to database using lib/prisma...");
        await prisma.$connect();
        console.log("Connected successfully!");
        const userCount = await prisma.user.count();
        console.log("User count:", userCount);
    } catch (error) {
        console.error("Database connection failed:", error);
        if (error instanceof Error) {
            console.error("Error name:", error.name);
            console.error("Error stack:", error.stack);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
