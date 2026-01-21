import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { orderId } = body;

        if (!orderId) {
            return new NextResponse("Missing orderId", { status: 400 });
        }

        // Verify order belongs to user
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

        if (!order || order.userId !== session.user.id) {
            return new NextResponse("Order not found or unauthorized", { status: 404 });
        }

        // Update status to PROCESSING (Simulating "Paid")
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: "PROCESSING",
                // You could also add paymentId, paymentMethod here if you expanded the schema
            },
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("[PAYMENT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
