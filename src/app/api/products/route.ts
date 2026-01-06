import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ProductQueryParams, PaginatedResponse, Product } from "@/types";

// GET /api/products - Get all products with filtering and pagination
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Parse query parameters
        const params: ProductQueryParams = {
            category: searchParams.get("category") || undefined,
            grade: searchParams.get("grade") as ProductQueryParams["grade"] || undefined,
            minPrice: searchParams.get("minPrice")
                ? parseFloat(searchParams.get("minPrice")!)
                : undefined,
            maxPrice: searchParams.get("maxPrice")
                ? parseFloat(searchParams.get("maxPrice")!)
                : undefined,
            featured: searchParams.get("featured") === "true" ? true : undefined,
            sort: searchParams.get("sort") as ProductQueryParams["sort"] || "newest",
            page: parseInt(searchParams.get("page") || "1"),
            limit: parseInt(searchParams.get("limit") || "12"),
            search: searchParams.get("search") || undefined,
        };

        // Build where clause
        const where: any = {
            isActive: true,
        };

        if (params.category) {
            where.category = { slug: params.category };
        }

        if (params.grade) {
            where.grade = params.grade;
        }

        if (params.minPrice !== undefined || params.maxPrice !== undefined) {
            where.price = {};
            if (params.minPrice !== undefined) {
                where.price.gte = params.minPrice;
            }
            if (params.maxPrice !== undefined) {
                where.price.lte = params.maxPrice;
            }
        }

        if (params.featured !== undefined) {
            where.featured = params.featured;
        }

        if (params.search) {
            where.OR = [
                { name: { contains: params.search, mode: "insensitive" } },
                { description: { contains: params.search, mode: "insensitive" } },
            ];
        }

        // Build orderBy clause
        let orderBy: any = { createdAt: "desc" };
        switch (params.sort) {
            case "price-asc":
                orderBy = { price: "asc" };
                break;
            case "price-desc":
                orderBy = { price: "desc" };
                break;
            case "newest":
                orderBy = { createdAt: "desc" };
                break;
            case "popular":
                orderBy = { reviews: { _count: "desc" } };
                break;
        }

        // Calculate pagination
        const page = params.page || 1;
        const limit = Math.min(params.limit || 12, 50);
        const skip = (page - 1) * limit;

        // Execute queries
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    category: true,
                    reviews: {
                        select: {
                            rating: true,
                        },
                    },
                },
            }),
            prisma.product.count({ where }),
        ]);

        // Transform products to add average rating
        const transformedProducts = products.map((product: typeof products[number]) => {
            const avgRating =
                product.reviews.length > 0
                    ? product.reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
                    product.reviews.length
                    : 0;

            return {
                ...product,
                price: parseFloat(product.price.toString()),
                comparePrice: product.comparePrice
                    ? parseFloat(product.comparePrice.toString())
                    : null,
                averageRating: Math.round(avgRating * 10) / 10,
                reviewCount: product.reviews.length,
                reviews: undefined, // Remove reviews array from response
            };
        });

        const response: PaginatedResponse<typeof transformedProducts[0]> = {
            data: transformedProducts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // TODO: Add authentication check for admin role

        const product = await prisma.product.create({
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
                price: body.price,
                comparePrice: body.comparePrice,
                grade: body.grade,
                flavor: body.flavor,
                origin: body.origin,
                weight: body.weight,
                stock: body.stock,
                images: body.images || [],
                featured: body.featured || false,
                categoryId: body.categoryId,
            },
            include: {
                category: true,
            },
        });

        return NextResponse.json(
            { success: true, data: product },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create product" },
            { status: 500 }
        );
    }
}
