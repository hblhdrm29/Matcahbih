import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🍵 Starting seed...");

    // Create Categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: "ceremonial-grade" },
            update: {},
            create: {
                name: "Ceremonial Grade",
                slug: "ceremonial-grade",
                description: "Highest quality for traditional tea ceremony",
                image: "/images/categories/ceremonial.jpg",
            },
        }),
        prisma.category.upsert({
            where: { slug: "premium-grade" },
            update: {},
            create: {
                name: "Premium Grade",
                slug: "premium-grade",
                description: "Premium quality for daily enjoyment",
                image: "/images/categories/premium.jpg",
            },
        }),
        prisma.category.upsert({
            where: { slug: "culinary-grade" },
            update: {},
            create: {
                name: "Culinary Grade",
                slug: "culinary-grade",
                description: "Perfect for baking and cooking",
                image: "/images/categories/culinary.jpg",
            },
        }),
        prisma.category.upsert({
            where: { slug: "matcha-latte" },
            update: {},
            create: {
                name: "Matcha Latte",
                slug: "matcha-latte",
                description: "Specially blended for lattes",
                image: "/images/categories/latte.jpg",
            },
        }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create Products
    const products = [
        // Ceremonial Grade Products
        {
            name: "Uji Ceremonial Matcha - First Harvest",
            slug: "uji-ceremonial-first-harvest",
            description: "Our finest ceremonial matcha, harvested in the first spring flush from the legendary tea gardens of Uji, Kyoto. Stone-ground to a silky smooth powder with a vibrant jade green color and naturally sweet umami flavor.",
            price: 450000,
            comparePrice: 550000,
            grade: "CEREMONIAL" as const,
            flavor: "Sweet, Umami, Creamy",
            origin: "Uji, Kyoto, Japan",
            weight: 30,
            stock: 50,
            images: ["/images/products/ceremonial-1.jpg"],
            featured: true,
            categoryId: categories[0].id,
        },
        {
            name: "Premium Ceremonial Matcha - Okumidori",
            slug: "ceremonial-okumidori",
            description: "Single-cultivar ceremonial matcha made from the prized Okumidori variety. Known for its exceptionally smooth texture and complex flavor profile with hints of chestnut and cream.",
            price: 380000,
            comparePrice: null,
            grade: "CEREMONIAL" as const,
            flavor: "Nutty, Creamy, Complex",
            origin: "Uji, Kyoto, Japan",
            weight: 30,
            stock: 35,
            images: ["/images/products/ceremonial-2.jpg"],
            featured: true,
            categoryId: categories[0].id,
        },
        {
            name: "Reserve Ceremonial Matcha",
            slug: "reserve-ceremonial-matcha",
            description: "Limited edition ceremonial matcha from a single estate in Uji. Perfect for koicha (thick tea) preparation with an intensely rich and full-bodied taste.",
            price: 650000,
            comparePrice: 750000,
            grade: "CEREMONIAL" as const,
            flavor: "Rich, Full-bodied, Vegetal",
            origin: "Uji, Kyoto, Japan",
            weight: 20,
            stock: 15,
            images: ["/images/products/ceremonial-3.jpg"],
            featured: false,
            categoryId: categories[0].id,
        },

        // Premium Grade Products
        {
            name: "Daily Premium Matcha",
            slug: "daily-premium-matcha",
            description: "High-quality everyday matcha perfect for your daily usucha. Vibrant color, smooth taste, and excellent value for quality-conscious matcha lovers.",
            price: 275000,
            comparePrice: 320000,
            grade: "PREMIUM" as const,
            flavor: "Balanced, Smooth, Fresh",
            origin: "Nishio, Aichi, Japan",
            weight: 50,
            stock: 100,
            images: ["/images/products/premium-1.jpg"],
            featured: true,
            categoryId: categories[1].id,
        },
        {
            name: "Premium Matcha - Organic",
            slug: "premium-matcha-organic",
            description: "JAS certified organic premium matcha. Grown without pesticides or chemical fertilizers, offering a pure and authentic matcha experience.",
            price: 320000,
            comparePrice: null,
            grade: "PREMIUM" as const,
            flavor: "Clean, Vegetal, Mild",
            origin: "Kagoshima, Japan",
            weight: 50,
            stock: 75,
            images: ["/images/products/premium-2.jpg"],
            featured: true,
            categoryId: categories[1].id,
        },
        {
            name: "Premium Blend Matcha",
            slug: "premium-blend-matcha",
            description: "A carefully crafted blend of premium cultivars, offering consistent quality and a well-rounded flavor profile perfect for both drinking and light cooking.",
            price: 240000,
            comparePrice: 280000,
            grade: "PREMIUM" as const,
            flavor: "Well-rounded, Grassy, Sweet",
            origin: "Shizuoka, Japan",
            weight: 50,
            stock: 120,
            images: ["/images/products/premium-3.jpg"],
            featured: false,
            categoryId: categories[1].id,
        },

        // Culinary Grade Products
        {
            name: "Culinary Matcha - Baker's Choice",
            slug: "culinary-bakers-choice",
            description: "Professional-grade culinary matcha with robust flavor that stands up to baking. Perfect for matcha cookies, cakes, brownies, and other baked goods.",
            price: 180000,
            comparePrice: null,
            grade: "CULINARY" as const,
            flavor: "Strong, Bold, Earthy",
            origin: "Japan",
            weight: 100,
            stock: 200,
            images: ["/images/products/culinary-1.jpg"],
            featured: true,
            categoryId: categories[2].id,
        },
        {
            name: "Culinary Matcha - Cooking Grade",
            slug: "culinary-cooking-grade",
            description: "Versatile culinary matcha ideal for savory applications. Use in pasta, sauces, dressings, and marinades for a unique matcha twist.",
            price: 150000,
            comparePrice: 180000,
            grade: "CULINARY" as const,
            flavor: "Robust, Vegetal, Versatile",
            origin: "Japan",
            weight: 100,
            stock: 180,
            images: ["/images/products/culinary-2.jpg"],
            featured: false,
            categoryId: categories[2].id,
        },
        {
            name: "Culinary Matcha - Value Pack",
            slug: "culinary-value-pack",
            description: "Economy-sized culinary matcha for high-volume use. Perfect for cafes, bakeries, and enthusiastic home bakers who go through matcha quickly.",
            price: 350000,
            comparePrice: 420000,
            grade: "CULINARY" as const,
            flavor: "Consistent, Bold, Earthy",
            origin: "Japan",
            weight: 250,
            stock: 80,
            images: ["/images/products/culinary-3.jpg"],
            featured: false,
            categoryId: categories[2].id,
        },

        // Matcha Latte Products
        {
            name: "Latte Grade Matcha",
            slug: "latte-grade-matcha",
            description: "Specially formulated for the perfect matcha latte. Smooth, slightly sweet, and blends beautifully with milk or plant-based alternatives.",
            price: 220000,
            comparePrice: null,
            grade: "LATTE" as const,
            flavor: "Smooth, Sweet, Creamy",
            origin: "Japan",
            weight: 80,
            stock: 150,
            images: ["/images/products/latte-1.jpg"],
            featured: true,
            categoryId: categories[3].id,
        },
        {
            name: "Cafe Latte Matcha Blend",
            slug: "cafe-latte-matcha-blend",
            description: "A cafe-style matcha blend designed for milk-based drinks. Creates a beautiful green color and balanced matcha flavor in lattes, frappes, and smoothies.",
            price: 195000,
            comparePrice: 230000,
            grade: "LATTE" as const,
            flavor: "Mild, Balanced, Milk-friendly",
            origin: "Japan",
            weight: 80,
            stock: 130,
            images: ["/images/products/latte-2.jpg"],
            featured: true,
            categoryId: categories[3].id,
        },
        {
            name: "Iced Matcha Blend",
            slug: "iced-matcha-blend",
            description: "Optimized for cold drinks, this matcha dissolves easily in cold liquids. Perfect for iced lattes, cold brews, and refreshing summer beverages.",
            price: 210000,
            comparePrice: null,
            grade: "LATTE" as const,
            flavor: "Refreshing, Light, Smooth",
            origin: "Japan",
            weight: 80,
            stock: 90,
            images: ["/images/products/latte-3.jpg"],
            featured: false,
            categoryId: categories[3].id,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });
    }

    console.log(`✅ Created ${products.length} products`);

    console.log("🍵 Seed completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
