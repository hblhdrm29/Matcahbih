import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch User's Wishlist
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const wishlist = await prisma.wishlist.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        images: true,
                        slug: true,
                        category: {
                            select: { name: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(wishlist);
    } catch (error) {
        console.error("[WISHLIST_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// POST: Toggle Wishlist (Add/Remove)
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { productId } = await req.json();
        if (!productId) {
            return new NextResponse("Product ID required", { status: 400 });
        }

        // Check if exists
        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId
                }
            }
        });

        if (existing) {
            // Remove
            await prisma.wishlist.delete({
                where: { id: existing.id }
            });
            return NextResponse.json({ action: 'removed' });
        } else {
            // Add
            await prisma.wishlist.create({
                data: {
                    userId: session.user.id,
                    productId
                }
            });
            return NextResponse.json({ action: 'added' });
        }

    } catch (error) {
        console.error("[WISHLIST_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
