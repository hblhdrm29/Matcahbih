"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Sparkles, Heart } from "lucide-react";
import { Product, MatchaGrade } from "@/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useEffect, useState } from "react";

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
    const { isInWishlist, toggleWishlist, syncWishlist } = useWishlistStore();

    // Ensure wishlist is synced on mount (one-time)
    useEffect(() => {
        // Simple check to avoid repeated calls if already populated, 
        // but ideally this should be in a global layout or context
        syncWishlist();
    }, []);

    const isWishlisted = isInWishlist(product.id);
    const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

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

    const handleToggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        setIsWishlistAnimating(true);
        await toggleWishlist(product.id);
        setTimeout(() => setIsWishlistAnimating(false), 300);
    };

    return (
        <article className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-matcha-lg transition-all duration-500 hover:-translate-y-1">
            {/* Image Container */}
            <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
                {/* Weight Badge (Top-Left) */}
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-forest px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {product.weight}g
                </div>

                {/* Discount Badge (Below Weight) */}
                {hasDiscount && (
                    <div className="absolute top-11 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                        -{discountPercent}%
                    </div>
                )}

                {/* Price Badge (Bottom-Left) */}
                <div className="absolute bottom-3 left-3 z-10 flex flex-col items-start gap-0.5">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm">
                        <p className="text-sm font-bold text-forest">
                            {formatPrice(product.price)}
                        </p>
                    </div>
                    {hasDiscount && (
                        <p className="px-1 text-[10px] text-white font-medium bg-black/40 backdrop-blur-sm rounded-md line-through">
                            {formatPrice(product.comparePrice!)}
                        </p>
                    )}
                </div>

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

                {/* Wishlist Button (Below Grade) */}
                <button
                    onClick={handleToggleWishlist}
                    className={cn(
                        "absolute top-11 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white shadow-sm",
                        isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500",
                        isWishlistAnimating && "scale-125"
                    )}
                >
                    <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
                </button>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-300" />

                {/* Add to Cart Button (Bottom-Right) */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart();
                    }}
                    className="absolute bottom-3 right-3 z-20 p-2.5 rounded-full bg-forest text-white shadow-matcha hover:bg-forest-light transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Add ${product.name} to cart`}
                    disabled={product.stock === 0}
                >
                    <ShoppingBag className="w-4 h-4" />
                </button>
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

                {/* Product Info (Minimalist) */}
                <div className="flex items-start justify-between">
                    <div>
                        {/* Rating */}
                        {product.reviewCount !== undefined && product.reviewCount > 0 && (
                            <div className="flex items-center gap-1 mb-1">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span className="text-xs font-medium text-amber-600">
                                    {product.averageRating?.toFixed(1)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    ({product.reviewCount})
                                </span>
                            </div>
                        )}

                        {/* Name */}
                        <Link href={`/products/${product.slug}`}>
                            <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                        </Link>

                        {/* Category */}
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {product.category?.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Out of Stock Overlay */}
            {product.stock === 0 && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center pointer-events-none z-30">
                    <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full font-medium">
                        Out of Stock
                    </span>
                </div>
            )}
        </article>
    );
}
