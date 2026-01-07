"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
    const { items, isOpen, closeCart, clearCart, getTotalItems, getTotalPrice } = useCartStore();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                closeCart();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeCart]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-2xl transition-transform duration-300 ease-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-semibold text-foreground">
                            Your Cart
                        </h2>
                        {totalItems > 0 && (
                            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                Your cart is empty
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                Add some delicious matcha to get started!
                            </p>
                            <Link
                                href="/products"
                                onClick={closeCart}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                            >
                                Browse Products
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="py-4">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-border px-6 py-4 space-y-4 bg-card">
                        {/* Clear Cart */}
                        <button
                            onClick={clearCart}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear Cart
                        </button>

                        {/* Subtotal */}
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-lg font-semibold text-foreground">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Shipping and taxes calculated at checkout.
                        </p>

                        {/* Checkout Button */}
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-matcha"
                        >
                            Lanjut ke Checkout
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        {/* Continue Shopping */}
                        <button
                            onClick={closeCart}
                            className="w-full py-2.5 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Lanjut Belanja
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
