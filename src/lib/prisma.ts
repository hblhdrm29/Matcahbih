// Prisma Client - will be initialized after running `npx prisma generate`
// Make sure to set DATABASE_URL in .env first

let prisma: any;

try {
    const { PrismaClient } = require("@prisma/client");

    const globalForPrisma = globalThis as unknown as {
        prisma: typeof PrismaClient | undefined;
    };

    prisma =
        globalForPrisma.prisma ??
        new PrismaClient({
            log:
                process.env.NODE_ENV === "development"
                    ? ["query", "error", "warn"]
                    : ["error"],
        });

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
} catch (error) {
    // Prisma client not generated yet - create mock
    console.warn("⚠️ Prisma client not generated. Run: npx prisma generate");
    prisma = {
        product: {
            findMany: async () => [],
            count: async () => 0,
            create: async () => ({}),
        },
        category: {
            findMany: async () => [],
        },
        user: {
            findUnique: async () => null,
        },
        // Add other models as needed
    };
}

export { prisma };
export default prisma;
