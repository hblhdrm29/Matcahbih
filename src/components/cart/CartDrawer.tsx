"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShoppingBag, ArrowRight, Trash2, LogIn } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function CartDrawer() {
    const { items, isOpen, closeCart, clearCart, getTotalItems, getTotalPrice } = useCartStore();
    const { data: session } = useSession();
    const router = useRouter();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const totalItems = isClient ? getTotalItems() : 0;
    const totalPrice = isClient ? getTotalPrice() : 0;
    const currentItems = isClient ? items : [];

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setShowLoginPrompt(false); // Reset prompt when closed
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

    const handleCheckout = () => {
        if (session) {
            closeCart();
            router.push("/checkout");
        } else {
            setShowLoginPrompt(true);
        }
    };

    const handleLoginRedirect = () => {
        closeCart();
        router.push("/auth/signin?callbackUrl=/checkout");
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

            {/* Drawer (Side Panel) */}
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
                <div className="flex-1 overflow-y-auto px-6 relative">
                    {currentItems.length === 0 ? (
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
                            {currentItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {currentItems.length > 0 && (
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
                        <button
                            onClick={handleCheckout}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-matcha"
                        >
                            Lanjut ke Checkout
                            <ArrowRight className="w-4 h-4" />
                        </button>

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

            {/* Guest Login Prompt Overlay (Global Center) */}
            {showLoginPrompt && (
                <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="bg-card border border-border rounded-2xl shadow-xl p-8 max-w-sm w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <LogIn className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-medium text-foreground">Login Diperlukan</h3>
                            <p className="text-muted-foreground mt-2">
                                Silakan login terlebih dahulu untuk melanjutkan proses checkout.
                            </p>
                        </div>
                        <div className="grid gap-3">
                            <button
                                onClick={handleLoginRedirect}
                                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                            >
                                Login Sekarang
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setShowLoginPrompt(false)}
                                className="w-full py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
