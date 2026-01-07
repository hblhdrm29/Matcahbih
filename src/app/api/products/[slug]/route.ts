import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/[slug] - Get a single product by slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                    take: 10,
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        // Calculate average rating
        const avgRating =
            product.reviews.length > 0
                ? product.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
                product.reviews.length
                : 0;

        // Get related products (same category, excluding current)
        const relatedProducts = await prisma.product.findMany({
            where: {
                categoryId: product.categoryId,
                id: { not: product.id },
                isActive: true,
            },
            take: 4,
            include: {
                category: true,
                reviews: {
                    select: { rating: true },
                },
            },
        });

        // Transform related products
        const transformedRelated = relatedProducts.map((p: typeof relatedProducts[number]) => {
            const pAvgRating =
                p.reviews.length > 0
                    ? p.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / p.reviews.length
                    : 0;
            return {
                ...p,
                price: parseFloat(p.price.toString()),
                comparePrice: p.comparePrice ? parseFloat(p.comparePrice.toString()) : null,
                averageRating: Math.round(pAvgRating * 10) / 10,
                reviewCount: p.reviews.length,
                reviews: undefined,
            };
        });

        const response = {
            success: true,
            data: {
                ...product,
                price: parseFloat(product.price.toString()),
                comparePrice: product.comparePrice
                    ? parseFloat(product.comparePrice.toString())
                    : null,
                averageRating: Math.round(avgRating * 10) / 10,
                reviewCount: product.reviews.length,
            },
            relatedProducts: transformedRelated,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}
