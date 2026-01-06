"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart } from "lucide-react";

// Product data with actual images
const featuredProducts = [
    {
        id: "1",
        name: "Uji Ceremonial Matcha",
        slug: "uji-ceremonial-matcha",
        price: 350000,
        comparePrice: 420000,
        grade: "CEREMONIAL",
        rating: 4.9,
        reviewCount: 156,
        image: "/images/products/ceremonial-1.png",
        badge: "Best Seller",
        description: "Premium ceremonial grade from Uji, Japan. Smooth, sweet, and umami-rich.",
    },
    {
        id: "2",
        name: "Premium Daily Matcha",
        slug: "premium-daily-matcha",
        price: 185000,
        comparePrice: null,
        grade: "PREMIUM",
        rating: 4.7,
        reviewCount: 89,
        image: "/images/products/premium-1.png",
        badge: null,
        description: "Perfect for everyday enjoyment. Balanced flavor with subtle sweetness.",
    },
    {
        id: "3",
        name: "Organic Culinary Blend",
        slug: "organic-culinary-blend",
        price: 125000,
        comparePrice: 150000,
        grade: "CULINARY",
        rating: 4.8,
        reviewCount: 234,
        image: "/images/products/culinary-1.png",
        badge: "Sale",
        description: "Ideal for baking, smoothies, and lattes. Robust matcha flavor.",
    },
    {
        id: "4",
        name: "Matcha Latte Mix",
        slug: "matcha-latte-mix",
        price: 95000,
        comparePrice: null,
        grade: "LATTE",
        rating: 4.6,
        reviewCount: 67,
        image: "/images/products/latte-1.png",
        badge: "New",
        description: "Pre-sweetened blend for the perfect creamy matcha latte.",
    },
];

function formatPrice(price: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
}

function ProductCard({ product }: { product: (typeof featuredProducts)[0] }) {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover-lift">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-cream-dark">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Badge */}
                {product.badge && (
                    <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium z-10 ${product.badge === "Sale"
                                ? "bg-red-500 text-white"
                                : product.badge === "New"
                                    ? "bg-matcha text-white"
                                    : "bg-forest text-cream"
                            }`}
                    >
                        {product.badge}
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
                    aria-label="Add to wishlist"
                >
                    <Heart className="w-4 h-4 text-forest" />
                </button>

                {/* Quick Add Button */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <button className="w-full py-2.5 bg-forest hover:bg-forest-light text-cream text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Grade */}
                <span className="text-xs text-matcha font-medium uppercase tracking-wider">
                    {product.grade}
                </span>

                {/* Name */}
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-medium text-forest mt-1 group-hover:text-matcha transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-xs text-forest/60 mt-1 line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-forest/60">
                        {product.rating} ({product.reviewCount})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-semibold text-forest">
                        {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                        <span className="text-sm text-forest/40 line-through">
                            {formatPrice(product.comparePrice)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function FeaturedProducts() {
    return (
        <section className="py-20 bg-cream-dark">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="text-matcha text-sm font-medium uppercase tracking-wider">
                            Curated for You
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-forest mt-2">
                            Featured Products
                        </h2>
                        <p className="text-forest/60 mt-2 max-w-md">
                            Handpicked selection of our finest matcha, sourced directly from Uji, Japan.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="text-matcha hover:text-matcha-dark font-medium text-sm flex items-center gap-1 transition-colors"
                    >
                        View All Products
                        <span className="text-lg">→</span>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
