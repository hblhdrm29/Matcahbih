"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Package, MapPin, CreditCard, Clock } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    // States for data
    const [orders, setOrders] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingPayment: 0,
        totalSpent: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    // Fetch Orders Data
    useEffect(() => {
        if (status === "authenticated") {
            async function fetchData() {
                try {
                    const res = await fetch("/api/orders");
                    if (res.ok) {
                        const data = await res.json();
                        setOrders(data);

                        // Calculate Stats
                        const pending = data.filter((o: any) => o.status === "PENDING").length;
                        const spent = data
                            .filter((o: any) => o.status !== "CANCELLED" && o.status !== "PENDING") // Assuming only processed/paid counts
                            .reduce((acc: number, curr: any) => acc + Number(curr.total), 0);

                        setStats({
                            totalOrders: data.length,
                            pendingPayment: pending,
                            totalSpent: spent
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch dashboard data", error);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }
    }, [status]);

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-4 border-matcha border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session?.user) {
        return null;
    }

    const user = session.user;
    const recentOrders = orders.slice(0, 3); // Top 3 recent orders

    return (
        <div className="space-y-6">
            {/* Header / Welcome */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-forest">
                        Selamat Datang, {user.name?.split(" ")[0]}!
                    </h1>
                    <p className="text-forest/60 text-sm mt-1">
                        Member sejak Januari 2026 • <span className="text-matcha font-medium">Matcha Enthusiast</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/products"
                        className="px-5 py-2.5 bg-matcha text-white rounded-xl text-sm font-medium hover:bg-matcha-dark transition-colors shadow-matcha-sm"
                    >
                        Belanja Sekarang
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-forest/60 text-sm">Total Pesanan</p>
                    <p className="text-2xl font-bold text-forest mt-1">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-forest/60 text-sm">Menunggu Pembayaran</p>
                    <p className="text-2xl font-bold text-forest mt-1">{stats.pendingPayment}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-forest/60 text-sm">Total Pengeluaran</p>
                    <p className="text-2xl font-bold text-forest mt-1">
                        Rp {stats.totalSpent.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="font-serif font-bold text-lg text-forest">Pesanan Terbaru</h2>
                    <Link href="/profile/orders" className="text-sm text-matcha font-medium hover:underline">
                        Lihat Semua
                    </Link>
                </div>

                {recentOrders.length > 0 ? (
                    <div className="divide-y divide-border">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center text-forest/40 border border-border">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-forest">{order.orderNumber}</p>
                                        <p className="text-xs text-forest/60">
                                            {new Date(order.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mb-1 
                                        ${order.status === 'PENDING' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                            order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                'bg-green-100 text-green-700 border-green-200'}`}>
                                        {order.status}
                                    </span>
                                    <p className="font-bold text-sm text-forest">
                                        Rp {Number(order.total).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-forest/30" />
                        </div>
                        <h3 className="text-forest font-medium">Belum ada pesanan</h3>
                        <p className="text-forest/60 text-sm mt-1 max-w-xs mx-auto">
                            Anda belum melakukan pemesanan. Mulai belanja produk matcha favorit Anda sekarang!
                        </p>
                    </div>
                )}
            </div>

            {/* Primary Address Preview (Static for now) */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="font-serif font-bold text-lg text-forest">Alamat Utama</h2>
                    <Link href="/profile/addresses" className="text-sm text-matcha font-medium hover:underline">
                        Kelola Alamat
                    </Link>
                </div>
                <div className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-forest/70" />
                    </div>
                    <div>
                        <p className="font-medium text-forest">Belum ada alamat tersimpan</p>
                        <p className="text-forest/60 text-sm mt-1">
                            Silakan tambahkan alamat pengiriman untuk mempercepat proses checkout.
                        </p>
                        <Link href="/profile/addresses" className="inline-block mt-3 text-sm font-medium text-matcha border border-matcha/30 px-4 py-2 rounded-lg hover:bg-matcha/5 transition-colors">
                            + Tambah Alamat Baru
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

