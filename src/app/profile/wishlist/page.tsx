"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const res = await fetch("/api/wishlist");
                if (res.ok) {
                    const data = await res.json();
                    setWishlistItems(data);
                }
            } catch (error) {
                console.error("Failed to fetch wishlist", error);
            } finally {
                setLoading(false);
            }
        }
        fetchWishlist();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="w-10 h-10 border-4 border-matcha border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-3xl border border-border shadow-sm">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-pink-400" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-forest mb-2">Wishlist Kosong</h2>
                <p className="text-forest/60 max-w-sm mx-auto mb-8">
                    Simpan produk favorit Anda di sini agar pembelian di masa mendatang lebih mudah.
                </p>
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-matcha text-white rounded-xl font-medium hover:bg-matcha-dark transition-colors shadow-matcha"
                >
                    Jelajahi Produk
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif font-bold text-forest">Wishlist Saya</h1>
                <span className="text-sm text-forest/60">
                    {wishlistItems.length} Produk tersimpan
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                    <ProductCard
                        key={item.id}
                        product={{
                            ...item.product,
                            // Ensure required props for ProductCard are present
                            stock: item.product.stock ?? 100, // Default fallback if not fetched
                            grade: item.product.grade || "CULINARY", // Default
                            images: item.product.images || [],
                            reviewCount: 0,
                            averageRating: 5
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
