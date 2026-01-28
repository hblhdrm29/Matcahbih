import { prisma } from "@/lib/prisma";

export const userService = {
    async getAllUsers() {
        return await prisma.user.findMany();
    },

    async getUserById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
        });
    },
};
