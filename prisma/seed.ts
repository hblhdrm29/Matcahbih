import { PrismaClient, MatchaGrade } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting seed...");

    // 1. Clean up existing data
    try {
        await prisma.review.deleteMany();
        await prisma.cartItem.deleteMany();
        await prisma.orderItem.deleteMany();
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        console.log("🧹 Cleared existing data");
    } catch (error) {
        console.error("Error clearing data:", error);
        process.exit(1);
    }

    // 2. Create Categories
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                name: "Ceremonial Grade",
                slug: "ceremonial-grade",
                description: "The highest quality matcha, perfect for traditional tea ceremonies.",
                image: "/images/categories/ceremonial.jpg",
            },
        }),
        prisma.category.create({
            data: {
                name: "Premium Grade",
                slug: "premium-grade",
                description: "High-quality matcha suitable for daily consumption and lattes.",
                image: "/images/categories/premium.jpg",
            },
        }),
        prisma.category.create({
            data: {
                name: "Culinary Grade",
                slug: "culinary-grade",
                description: "Robust flavor, ideal for baking, cooking, and smoothies.",
                image: "/images/categories/culinary.jpg",
            },
        }),
        prisma.category.create({
            data: {
                name: "Matcha Latte",
                slug: "matcha-latte",
                description: "Specially blended for delicious, creamy matcha lattes.",
                image: "/images/categories/latte.jpg",
            },
        }),
    ]);

    const [catCeremonial, catPremium, catCulinary, catLatte] = categories;
    console.log("✅ Categories created");

    // 3. Create Products

    // Ceremonial Products
    await prisma.product.create({
        data: {
            name: "Uji Ceremonial - First Harvest",
            slug: "uji-ceremonial-first-harvest",
            description: "Hand-picked, stone-ground first harvest matcha from Uji. Vibrant green color and umami-rich flavor.",
            price: 450000,
            grade: MatchaGrade.CEREMONIAL,
            flavor: "Umami, Sweet, Creamy",
            origin: "Uji, Kyoto, Japan",
            weight: 30,
            stock: 50,
            images: ["/images/products/ceremonial-1.png", "/images/products/ceremonial-2.jpg"],
            featured: true,
            categoryId: catCeremonial.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Ceremonial Okumidori",
            slug: "ceremonial-okumidori",
            description: "Single-cultivar Okumidori matcha. Distinctive rich aroma and smooth texture.",
            price: 520000,
            grade: MatchaGrade.CEREMONIAL,
            flavor: "Rich, Smooth, Nutty",
            origin: "Nishio, Japan",
            weight: 30,
            stock: 30,
            images: ["/images/products/ceremonial-2.jpg"],
            featured: false,
            categoryId: catCeremonial.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Reserve Ceremonial Matcha",
            slug: "reserve-ceremonial-matcha",
            description: "Limited edition ceremonial matcha from a single estate in Uji.",
            price: 650000,
            comparePrice: 750000,
            grade: MatchaGrade.CEREMONIAL,
            flavor: "Rich, Full-bodied, Vegetal",
            origin: "Uji, Kyoto, Japan",
            weight: 20,
            stock: 15,
            images: ["/images/products/ceremonialpremium_matcha.jpg"],
            featured: false,
            categoryId: catCeremonial.id,
        },
    });


    // Premium Products
    await prisma.product.create({
        data: {
            name: "Daily Premium Matcha",
            slug: "daily-premium-matcha",
            description: "Perfect for your daily matcha ritual. Balanced flavor profile.",
            price: 280000,
            grade: MatchaGrade.PREMIUM,
            flavor: "Balanced, Light Astringency",
            origin: "Shizuoka, Japan",
            weight: 50,
            stock: 100,
            images: ["/images/products/premium-1.png"],
            featured: false,
            categoryId: catPremium.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Premium Matcha - Organic",
            slug: "premium-matcha-organic",
            description: "JAS certified organic premium matcha.",
            price: 320000,
            grade: MatchaGrade.PREMIUM,
            flavor: "Clean, Vegetal, Mild",
            origin: "Kagoshima, Japan",
            weight: 50,
            stock: 75,
            images: ["/images/products/premium-2.jpg"],
            featured: true,
            categoryId: catPremium.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Premium Blend Matcha",
            slug: "premium-blend-matcha",
            description: "A carefully crafted blend of premium cultivars.",
            price: 240000,
            comparePrice: 280000,
            grade: MatchaGrade.PREMIUM,
            flavor: "Well-rounded, Grassy, Sweet",
            origin: "Shizuoka, Japan",
            weight: 50,
            stock: 120,
            images: ["/images/products/premium-3.jpg"],
            featured: false,
            categoryId: catPremium.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Master Select Premium",
            slug: "master-select-premium",
            description: "Exclusive selection by our tea masters.",
            price: 290000,
            comparePrice: 350000,
            grade: MatchaGrade.PREMIUM,
            flavor: "Deep, Aromatic, smooth",
            origin: "Nishio, Japan",
            weight: 40,
            stock: 60,
            images: ["/images/products/premium-4.jpg"],
            featured: true,
            categoryId: catPremium.id,
        },
    });


    // Culinary Products
    await prisma.product.create({
        data: {
            name: "Culinary - Baker's Choice",
            slug: "culinary-bakers-choice",
            description: "Strong matcha flavor that stands out in baked goods.",
            price: 120000,
            grade: MatchaGrade.CULINARY,
            flavor: "Strong, Bold",
            origin: "Japan",
            weight: 100,
            stock: 200,
            images: ["/images/products/culinary-1.png"],
            featured: false,
            categoryId: catCulinary.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Culinary Matcha - Cooking Grade",
            slug: "culinary-cooking-grade",
            description: "Versatile culinary matcha ideal for savory applications.",
            price: 150000,
            comparePrice: 180000,
            grade: MatchaGrade.CULINARY,
            flavor: "Robust, Vegetal, Versatile",
            origin: "Japan",
            weight: 100,
            stock: 180,
            images: ["/images/products/culinary2.jpg"],
            featured: false,
            categoryId: catCulinary.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Culinary Value Pack",
            slug: "culinary-value-pack",
            description: "Great value for bulk cooking needs.",
            price: 250000,
            grade: MatchaGrade.CULINARY,
            flavor: "Standard, Bitter",
            origin: "Japan",
            weight: 500,
            stock: 50,
            images: ["/images/products/culinary-1.png"],
            featured: false,
            categoryId: catCulinary.id,
        },
    });


    // Latte Products
    await prisma.product.create({
        data: {
            name: "Latte Grade Matcha",
            slug: "latte-grade-matcha",
            description: "Designed to mix perfectly with milk for a smooth latte.",
            price: 180000,
            grade: MatchaGrade.LATTE,
            flavor: "Smooth, Sweet finish",
            origin: "Japan",
            weight: 100,
            stock: 150,
            images: ["/images/products/latte-1.png"],
            featured: true,
            categoryId: catLatte.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Cafe Latte Matcha Blend",
            slug: "cafe-latte-matcha-blend",
            description: "A cafe-style matcha blend designed for milk-based drinks.",
            price: 195000,
            comparePrice: 230000,
            grade: MatchaGrade.LATTE,
            flavor: "Mild, Balanced, Milk-friendly",
            origin: "Japan",
            weight: 80,
            stock: 130,
            images: ["/images/products/latte-2.jpg"],
            featured: true,
            categoryId: catLatte.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Iced Matcha Blend",
            slug: "iced-matcha-blend",
            description: "Optimized for cold drinks, this matcha dissolves easily.",
            price: 210000,
            grade: MatchaGrade.LATTE,
            flavor: "Refreshing, Light, Smooth",
            origin: "Japan",
            weight: 80,
            stock: 90,
            images: ["/images/products/latte-3.jpg"],
            featured: false,
            categoryId: catLatte.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Sweet Matcha Mix",
            slug: "sweet-matcha-mix",
            description: "Pre-sweetened matcha mix for instant preparation.",
            price: 180000,
            grade: MatchaGrade.LATTE,
            flavor: "Sweet, Easy, Delicious",
            origin: "Japan",
            weight: 200,
            stock: 100,
            images: ["/images/products/latte-4.jpg"],
            featured: true,
            categoryId: catLatte.id,
        },
    });


    console.log("✅ Products created");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
