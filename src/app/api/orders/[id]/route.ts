import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const order = await prisma.order.findUnique({
            where: {
                id: params.id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order) {
            return new NextResponse("Order not found", { status: 404 });
        }

        // Verify ownership
        if (order.userId !== session.user.id) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("[ORDER_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
