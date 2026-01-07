"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { Product, MatchaGrade } from "@/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    product: Product & { averageRating?: number; reviewCount?: number };
}

const gradeStyles: Record<MatchaGrade, { bg: string; text: string; label: string }> = {
    CEREMONIAL: {
        bg: "bg-gradient-to-r from-amber-500 to-yellow-400",
        text: "text-white",
        label: "Ceremonial",
    },
    PREMIUM: {
        bg: "bg-gradient-to-r from-matcha to-matcha-light",
        text: "text-white",
        label: "Premium",
    },
    CULINARY: {
        bg: "bg-gradient-to-r from-forest-light to-forest",
        text: "text-cream",
        label: "Culinary",
    },
    LATTE: {
        bg: "bg-gradient-to-r from-cream-dark to-cream",
        text: "text-forest",
        label: "Latte",
    },
};

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem, openCart } = useCartStore();
    const gradeStyle = gradeStyles[product.grade];
    const hasDiscount = product.comparePrice && product.comparePrice > product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
        : 0;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = () => {
        if (product.stock > 0) {
            addItem(product, 1);
            openCart();
        }
    };

    return (
        <article className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-matcha-lg transition-all duration-500 hover:-translate-y-1">
            {/* Image Container */}
            <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        -{discountPercent}%
                    </div>
                )}

                {/* Grade Badge */}
                <div
                    className={cn(
                        "absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                        gradeStyle.bg,
                        gradeStyle.text
                    )}
                >
                    <Sparkles className="w-3 h-3" />
                    {gradeStyle.label}
                </div>

                {/* Product Image */}
                <div className="relative w-full h-full bg-cream-dark">
                    {product.images[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-matcha/20 to-matcha-light/20">
                            <div className="text-6xl opacity-30">🍵</div>
                        </div>
                    )}
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-300" />
            </Link>

            {/* Content */}
            <div className="p-4">
                {/* Category */}
                {product.category && (
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {product.category.name}
                    </p>
                )}

                {/* Name */}
                <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                {product.reviewCount !== undefined && product.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-3.5 h-3.5",
                                        i < Math.floor(product.averageRating || 0)
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-gray-300"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                            ({product.reviewCount})
                        </span>
                    </div>
                )}

                {/* Price & Add to Cart */}
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-lg font-semibold text-primary">
                            {formatPrice(product.price)}
                        </p>
                        {hasDiscount && (
                            <p className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.comparePrice!)}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {product.weight}g
                        </p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110 active:scale-95 shadow-matcha disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Add ${product.name} to cart`}
                        disabled={product.stock === 0}
                    >
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Out of Stock Overlay */}
            {product.stock === 0 && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full font-medium">
                        Out of Stock
                    </span>
                </div>
            )}
        </article>
    );
}
