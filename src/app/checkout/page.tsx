"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { Trash2, ArrowLeft, Loader2 } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { items, getTotalPrice, removeItem, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Ensure we are client-side to access cart store correctly
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin?callbackUrl=/checkout");
        }
    }, [status, router]);

    if (!mounted || status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream-dark/20">
                <Loader2 className="w-8 h-8 animate-spin text-matcha" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-cream-dark/20 pt-32 pb-12">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-3xl font-serif font-bold text-forest mb-4">Keranjang Kosong</h1>
                    <p className="text-forest/60 mb-8">Anda belum memiliki item untuk dicheckout.</p>
                    <button
                        onClick={() => router.push("/products")}
                        className="px-6 py-3 bg-matcha text-white rounded-full font-medium hover:bg-matcha-dark transition-colors"
                    >
                        Kembali Belanja
                    </button>
                </div>
            </div>
        );
    }

    const subtotal = getTotalPrice();
    const shippingCost = 15000; // Flat rate for example
    const tax = subtotal * 0.11; // 11% PPN
    const total = subtotal + shippingCost + tax;

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: items.map(item => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                        price: Number(item.product.price)
                    })),
                    total,
                    subtotal,
                    shippingCost,
                    tax
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create order");
            }

            const order = await res.json();
            clearCart();
            router.push(`/profile/orders`);
            // Ideally redirect to success page: router.push(`/checkout/success?orderId=${order.id}`);
        } catch (error) {
            console.error(error);
            alert("Gagal membuat pesanan via API. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream-dark/20 pt-32 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-forest/60 hover:text-matcha mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items & Shipping (Left Column) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-3xl font-serif font-bold text-forest">Checkout</h1>

                        {/* Shipping Address Placeholder */}
                        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                            <h2 className="text-lg font-bold text-forest mb-4">Alamat Pengiriman</h2>
                            <div className="p-4 bg-gray-50 rounded-xl border border-border text-sm text-forest/70">
                                <p className="font-medium text-forest mb-1">{session?.user?.name || "User"}</p>
                                <p>Jl. Matcha Premium No. 1, Uji, Kyoto (Placeholder)</p>
                                <p>Indonesia, 12345</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                            <h2 className="text-lg font-bold text-forest mb-4">Ringkasan Pesanan</h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                                        <div className="w-20 h-20 bg-cream rounded-lg overflow-hidden flex-shrink-0">
                                            {item.product.images && item.product.images[0] && (
                                                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-forest">{item.product.name}</h3>
                                                    <p className="text-sm text-forest/60">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-forest">
                                                        Rp {(Number(item.product.price) * item.quantity).toLocaleString("id-ID")}
                                                    </p>
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="text-xs text-red-500 hover:underline mt-1 flex items-center justify-end gap-1"
                                                    >
                                                        <Trash2 className="w-3 h-3" /> Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary (Right Column) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 border border-border shadow-sm sticky top-32">
                            <h2 className="text-lg font-bold text-forest mb-4">Total Pembayaran</h2>

                            <div className="space-y-3 mb-6 text-sm text-forest/80">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Pengiriman</span>
                                    <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Pajak (11%)</span>
                                    <span>Rp {tax.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="h-[1px] bg-border my-2" />
                                <div className="flex justify-between font-bold text-lg text-forest">
                                    <span>Total</span>
                                    <span>Rp {total.toLocaleString("id-ID")}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-matcha text-white rounded-xl font-bold hover:bg-matcha-dark transition-colors shadow-matcha disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    "Bayar Sekarang"
                                )}
                            </button>

                            <p className="text-xs text-center text-forest/40 mt-4">
                                Dengan membayar, Anda menyetujui Syarat & Ketentuan kami.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
