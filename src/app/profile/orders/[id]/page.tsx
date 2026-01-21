"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle,
    AlertCircle, MapPin, CreditCard, ChevronRight, Download
} from "lucide-react";

type OrderItem = {
    id: string;
    quantity: number;
    price: string;
    product: {
        id: string;
        name: string;
        image: string;
    };
};

type Order = {
    id: string;
    orderNumber: string;
    status: string;
    total: string;
    subtotal: string;
    shippingCost: string;
    tax: string;
    createdAt: string;
    items: OrderItem[];
};

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchOrder() {
            try {
                const res = await fetch(`/api/orders/${id}`);
                if (!res.ok) {
                    if (res.status === 404) throw new Error("Pesanan tidak ditemukan");
                    throw new Error("Gagal mengambil data pesanan");
                }
                const data = await res.json();
                setOrder(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchOrder();
    }, [id]);

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
            case "PENDING": return <Clock className="w-5 h-5" />;
            case "PROCESSING": return <Package className="w-5 h-5" />;
            case "SHIPPED": return <Truck className="w-5 h-5" />;
            case "DELIVERED": return <CheckCircle className="w-5 h-5" />;
            case "CANCELLED": return <XCircle className="w-5 h-5" />;
            default: return <AlertCircle className="w-5 h-5" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-matcha border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-forest/60">Memuat detail pesanan...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-forest mb-2">Terjadi Kesalahan</h2>
                <p className="text-forest/60 mb-6">{error || "Pesanan tidak ditemukan"}</p>
                <Link
                    href="/profile/orders"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-matcha text-white rounded-full font-medium hover:bg-matcha-dark transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar Pesanan
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-forest/60 mb-4">
                <Link href="/profile/orders" className="hover:text-matcha transition-colors">
                    Pesanan Saya
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-forest truncate">{order.orderNumber}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content (Left) */}
                <div className="flex-1 space-y-6">

                    {/* Status Card */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-forest/60 mb-1">Status Pesanan</p>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status}
                            </div>
                        </div>
                        {order.status === "PENDING" && (
                            <Link
                                href={`/payment/${order.id}`}
                                className="px-6 py-2.5 bg-matcha text-white rounded-xl font-bold hover:bg-matcha-dark transition-colors shadow-matcha"
                            >
                                Bayar Sekarang
                            </Link>
                        )}
                    </div>

                    {/* Items List */}
                    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border">
                            <h2 className="font-serif font-bold text-lg text-forest">Rincian Produk</h2>
                        </div>
                        <div className="divide-y divide-border">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-6 flex gap-4">
                                    <div className="w-20 h-20 bg-cream rounded-lg overflow-hidden flex-shrink-0 border border-border">
                                        {item.product.image ? (
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-matcha/10">
                                                <Package className="w-8 h-8 text-matcha/40" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-forest mb-1">{item.product.name}</h3>
                                                <p className="text-sm text-forest/60">
                                                    {item.quantity} barang x Rp {parseFloat(item.price).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-forest">
                                                    Rp {(Number(item.price) * item.quantity).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Info Mock */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <h2 className="font-serif font-bold text-lg text-forest mb-4">Info Pengiriman</h2>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-bold text-forest text-sm">Alamat Rumah</p>
                                <p className="text-forest/70 text-sm mt-1">
                                    Jl. Matcha Premium No. 1, Uji, Kyoto<br />
                                    Indonesia, 12345
                                </p>
                                <div className="mt-3 inline-flex items-center gap-2 text-xs text-forest/50 bg-gray-50 px-2 py-1 rounded">
                                    <Truck className="w-3 h-3" />
                                    JNE Reguler (Resi: JP1234567890)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="w-full lg:w-80 space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm sticky top-24">
                        <h2 className="font-serif font-bold text-lg text-forest mb-4">Rincian Pembayaran</h2>
                        <div className="space-y-3 text-sm text-forest/70 mb-6">
                            <div className="flex justify-between">
                                <span>No. Pesanan</span>
                                <span className="font-mono text-forest">{order.orderNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tanggal</span>
                                <span>
                                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                                        day: "numeric", month: "long", year: "numeric",
                                        hour: "2-digit", minute: "2-digit"
                                    })}
                                </span>
                            </div>
                            <div className="h-[1px] bg-border my-2" />
                            <div className="flex justify-between">
                                <span>Total Harga ({order.items.length} barang)</span>
                                <span>Rp {parseFloat(order.subtotal).toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Ongkos Kirim</span>
                                <span>Rp {parseFloat(order.shippingCost).toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Biaya Layanan & Pajak</span>
                                <span>Rp {parseFloat(order.tax).toLocaleString("id-ID")}</span>
                            </div>
                            <div className="h-[1px] bg-border my-2" />
                            <div className="flex justify-between font-bold text-lg text-forest">
                                <span>Total Belanja</span>
                                <span>Rp {parseFloat(order.total).toLocaleString("id-ID")}</span>
                            </div>
                        </div>

                        {order.status !== "PENDING" && (
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-forest/70 font-medium hover:bg-gray-50 transition-colors text-sm">
                                <Download className="w-4 h-4" />
                                Download Invoice
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
