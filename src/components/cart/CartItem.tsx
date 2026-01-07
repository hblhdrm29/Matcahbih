"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemType, useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();
    const { product, quantity } = item;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const subtotal = product.price * quantity;

    return (
        <div className="flex gap-4 py-4 border-b border-border last:border-0">
            {/* Product Image */}
            <Link
                href={`/products/${product.slug}`}
                className="relative w-20 h-20 shrink-0 bg-cream-dark rounded-xl overflow-hidden"
            >
                {product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-matcha/20 to-matcha-light/20">
                        <span className="text-2xl">🍵</span>
                    </div>
                )}
            </Link>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <Link
                    href={`/products/${product.slug}`}
                    className="block font-medium text-foreground hover:text-primary transition-colors truncate"
                >
                    {product.name}
                </Link>

                <p className="text-sm text-muted-foreground mt-0.5">
                    {product.weight}g • {product.grade}
                </p>

                <p className="text-sm font-medium text-primary mt-1">
                    {formatPrice(product.price)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border rounded-full">
                        <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="p-1.5 hover:bg-muted rounded-l-full transition-colors disabled:opacity-50"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={quantity >= product.stock}
                            className="p-1.5 hover:bg-muted rounded-r-full transition-colors disabled:opacity-50"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-foreground">
                            {formatPrice(subtotal)}
                        </span>
                        <button
                            onClick={() => removeItem(product.id)}
                            className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                            aria-label={`Remove ${product.name} from cart`}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
