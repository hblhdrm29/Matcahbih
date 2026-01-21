import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // We might need to check if auth is exported from lib/auth or if we use getSession/getServerSession
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("[ORDERS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { items, total, subtotal, shippingCost, tax } = body;

        if (!items || items.length === 0) {
            return new NextResponse("No items", { status: 400 });
        }

        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                orderNumber: `ORD-${Date.now()}`, // Simple ID generation
                status: "PENDING",
                total: total,
                subtotal: subtotal || total,
                shippingCost: shippingCost || 0,
                tax: tax || 0,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId || item.id, // Handle potential id mismatch
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("[ORDERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
