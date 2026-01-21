"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle, XCircle, Truck, AlertCircle, ShoppingBag } from "lucide-react";

type OrderItem = {
    id: string;
    quantity: number;
    price: string; // Decimal comes as string in JSON
    product: {
        name: string;
        image: string;
    };
};

type Order = {
    id: string;
    orderNumber: string;
    status: string;
    total: string;
    createdAt: string;
    items: OrderItem[];
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/orders");
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat riwayat pesanan.");
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-orange-100 text-orange-700 border-orange-200";
            case "PROCESSING": return "bg-blue-100 text-blue-700 border-blue-200";
            case "SHIPPED": return "bg-purple-100 text-purple-700 border-purple-200";
            case "DELIVERED": return "bg-green-100 text-green-700 border-green-200";
            case "CANCELLED": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDING": return <Clock className="w-4 h-4" />;
            case "PROCESSING": return <Package className="w-4 h-4" />;
            case "SHIPPED": return <Truck className="w-4 h-4" />;
            case "DELIVERED": return <CheckCircle className="w-4 h-4" />;
            case "CANCELLED": return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-border shadow-sm animate-pulse">
                        <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-100 rounded" />
                            <div className="h-4 w-2/3 bg-gray-100 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center text-red-600">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-border shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-forest/30" />
                </div>
                <h2 className="text-xl font-serif font-bold text-forest mb-2">Belum Ada Pesanan</h2>
                <p className="text-forest/60 mb-6 max-w-sm mx-auto">
                    Anda belum pernah melakukan pemesanan. Jelajahi koleksi matcha premium kami sekarang.
                </p>
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-matcha text-white font-medium rounded-full hover:bg-matcha-dark transition-colors shadow-matcha hover:shadow-matcha-lg"
                >
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-serif font-bold text-forest">Riwayat Pesanan</h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all group">
                        {/* Order Header */}
                        <div className="p-4 sm:p-6 border-b border-border bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-mono text-sm font-medium text-forest">
                                        #{order.orderNumber}
                                    </span>
                                    <span className="text-xs text-forest/50">•</span>
                                    <span className="text-sm text-forest/70">
                                        {new Date(order.createdAt).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </div>
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-xs text-forest/60">Total Pesanan</p>
                                <p className="font-bold text-lg text-matcha">
                                    Rp {parseFloat(order.total).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 sm:p-6">
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-cream rounded-lg overflow-hidden flex-shrink-0 border border-border">
                                            {/* Note: In a real app we'd use Next Image, but fallback is tricky with placeholders */}
                                            {item.product.image ? (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-matcha/10 text-matcha">
                                                    <Package className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-forest truncate">{item.product.name}</h4>
                                            <p className="text-sm text-forest/60">
                                                {item.quantity} x Rp {parseFloat(item.price).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 pt-4 border-t border-border flex justify-end gap-3">
                                <Link
                                    href={`/profile/orders/${order.id}`} // We haven't built this detail page yet, but link it for future
                                    className="px-4 py-2 border border-border rounded-xl text-sm font-medium text-forest hover:bg-gray-50 transition-colors"
                                >
                                    Lihat Detail
                                </Link>
                                {order.status === "PENDING" && (
                                    <Link
                                        href={`/payment/${order.id}`}
                                        className="px-4 py-2 bg-matcha text-white rounded-xl text-sm font-medium hover:bg-matcha-dark transition-colors shadow-matcha-sm"
                                    >
                                        Bayar Sekarang
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
