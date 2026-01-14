"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Star,
    Minus,
    Plus,
    ShoppingBag,
    Heart,
    Share2,
    Truck,
    Shield,
    RefreshCw,
    Sparkles,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product, MatchaGrade, Review } from "@/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductWithReviews extends Product {
    averageRating: number;
    reviewCount: number;
    reviews: (Review & { user: { id: string; name: string | null; image: string | null } })[];
}

interface ProductResponse {
    success: boolean;
    data: ProductWithReviews;
    relatedProducts: Product[];
}

const gradeInfo: Record<MatchaGrade, { color: string; description: string }> = {
    CEREMONIAL: {
        color: "from-amber-500 to-yellow-400 text-white",
        description: "Our highest quality matcha, traditionally stone-ground for the perfect ceremonial experience.",
    },
    PREMIUM: {
        color: "from-matcha to-matcha-light text-white",
        description: "High-quality matcha perfect for daily drinking and special occasions.",
    },
    CULINARY: {
        color: "from-forest-light to-forest text-cream",
        description: "Ideal for cooking, baking, and creating delicious matcha recipes.",
    },
    LATTE: {
        color: "from-cream-dark to-cream text-forest",
        description: "Specially blended for smooth, creamy matcha lattes and drinks.",
    },
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const [product, setProduct] = useState<ProductWithReviews | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const { addItem, openCart } = useCartStore();

    const handleAddToCart = () => {
        if (!product) return;
        setIsAdding(true);
        addItem(product, quantity);
        setTimeout(() => {
            setIsAdding(false);
            openCart();
        }, 300);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${resolvedParams.slug}`);
                const data: ProductResponse = await res.json();

                if (!data.success || !data.data) {
                    setError("Product not found");
                    return;
                }

                setProduct(data.data);
                setRelatedProducts(data.relatedProducts || []);
            } catch {
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [resolvedParams.slug]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
                <div className="text-6xl">🍵</div>
                <h1 className="text-2xl font-medium text-foreground">{error || "Product not found"}</h1>
                <Link
                    href="/products"
                    className="flex items-center gap-2 text-primary hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>
            </div>
        );
    }

    const hasDiscount = product.comparePrice && product.comparePrice > product.price;
    const gradeStyle = gradeInfo[product.grade];

    return (
        <main className="min-h-screen bg-background pt-24">

            {/* Product Section */}
            <section className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-cream-dark rounded-3xl overflow-hidden">
                            {product.images[selectedImage] ? (
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-matcha/20 to-matcha-light/20">
                                    <div className="text-9xl opacity-30">🍵</div>
                                </div>
                            )}

                            {/* Navigation Arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setSelectedImage((prev) =>
                                                prev === 0 ? product.images.length - 1 : prev - 1
                                            )
                                        }
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedImage((prev) =>
                                                prev === product.images.length - 1 ? 0 : prev + 1
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            {/* Grade Badge */}
                            <div
                                className={cn(
                                    "absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 bg-gradient-to-r",
                                    gradeStyle.color
                                )}
                            >
                                <Sparkles className="w-4 h-4" />
                                {product.grade}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={cn(
                                            "relative w-20 h-20 shrink-0 rounded-xl overflow-hidden transition-all",
                                            selectedImage === index
                                                ? "ring-2 ring-primary ring-offset-2"
                                                : "opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category */}
                        {product.category && (
                            <Link
                                href={`/products?category=${product.category.slug}`}
                                className="inline-block text-sm text-primary hover:underline uppercase tracking-wider"
                            >
                                {product.category.name}
                            </Link>
                        )}

                        {/* Name */}
                        <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.reviewCount > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "w-5 h-5",
                                                i < Math.floor(product.averageRating)
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-gray-300"
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="text-foreground font-medium">
                                    {product.averageRating.toFixed(1)}
                                </span>
                                <span className="text-muted-foreground">
                                    ({product.reviewCount} reviews)
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-semibold text-primary">
                                {formatPrice(product.price)}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-xl text-muted-foreground line-through">
                                        {formatPrice(product.comparePrice!)}
                                    </span>
                                    <span className="px-2 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                                        Save{" "}
                                        {Math.round(
                                            ((product.comparePrice! - product.price) / product.comparePrice!) * 100
                                        )}
                                        %
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Weight & Origin */}
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="px-3 py-1.5 bg-muted rounded-full">
                                <span className="text-muted-foreground">Weight:</span>{" "}
                                <span className="font-medium text-foreground">{product.weight}g</span>
                            </div>
                            {product.origin && (
                                <div className="px-3 py-1.5 bg-muted rounded-full">
                                    <span className="text-muted-foreground">Origin:</span>{" "}
                                    <span className="font-medium text-foreground">{product.origin}</span>
                                </div>
                            )}
                            {product.flavor && (
                                <div className="px-3 py-1.5 bg-muted rounded-full">
                                    <span className="text-muted-foreground">Flavor:</span>{" "}
                                    <span className="font-medium text-foreground">{product.flavor}</span>
                                </div>
                            )}
                        </div>

                        {/* Grade Description */}
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                            <p className="text-sm text-muted-foreground">{gradeStyle.description}</p>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="prose prose-sm max-w-none text-muted-foreground">
                                <p>{product.description}</p>
                            </div>
                        )}

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-border rounded-full">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="p-3 hover:bg-muted rounded-l-full transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                    className="p-3 hover:bg-muted rounded-r-full transition-colors"
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-matcha disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={product.stock === 0 || isAdding}
                            >
                                {isAdding ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <ShoppingBag className="w-5 h-5" />
                                )}
                                {product.stock === 0 ? "Out of Stock" : isAdding ? "Adding..." : "Add to Cart"}
                            </button>

                            {/* Wishlist */}
                            <button className="p-3 border border-border rounded-full hover:bg-muted transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>

                            {/* Share */}
                            <button className="p-3 border border-border rounded-full hover:bg-muted transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Stock Info */}
                        {product.stock > 0 && product.stock <= 10 && (
                            <p className="text-sm text-amber-600">
                                Only {product.stock} left in stock!
                            </p>
                        )}

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                            <div className="text-center">
                                <Truck className="w-6 h-6 mx-auto text-primary mb-2" />
                                <p className="text-xs text-muted-foreground">Free Shipping</p>
                            </div>
                            <div className="text-center">
                                <Shield className="w-6 h-6 mx-auto text-primary mb-2" />
                                <p className="text-xs text-muted-foreground">Secure Payment</p>
                            </div>
                            <div className="text-center">
                                <RefreshCw className="w-6 h-6 mx-auto text-primary mb-2" />
                                <p className="text-xs text-muted-foreground">Easy Returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
                <section className="container mx-auto px-4 py-12 border-t border-border">
                    <h2 className="text-2xl font-serif font-medium text-foreground mb-8">
                        Customer Reviews
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {product.reviews.map((review) => (
                            <div
                                key={review.id}
                                className="p-6 bg-card rounded-2xl border border-border"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                        {review.user.image ? (
                                            <Image
                                                src={review.user.image}
                                                alt={review.user.name || "User"}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <span className="text-lg font-medium text-muted-foreground">
                                                {(review.user.name || "U")[0].toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">
                                            {review.user.name || "Anonymous"}
                                        </p>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "w-3.5 h-3.5",
                                                        i < review.rating
                                                            ? "text-amber-400 fill-amber-400"
                                                            : "text-gray-300"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {review.comment && (
                                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="container mx-auto px-4 py-12 border-t border-border">
                    <h2 className="text-2xl font-serif font-medium text-foreground mb-8">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
