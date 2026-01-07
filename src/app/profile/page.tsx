"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    LogOut,
    ShoppingBag,
    Heart,
    Settings,
    Loader2,
    ArrowRight
} from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </main>
        );
    }

    if (!session?.user) {
        return null;
    }

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const user = session.user;

    return (
        <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 py-12 max-w-2xl">

                {/* Profile Card */}
                <div className="bg-card rounded-3xl p-8 border border-border shadow-lg text-center mb-8">
                    {/* Avatar */}
                    <div className="relative inline-block mb-4">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={100}
                                height={100}
                                className="rounded-full object-cover ring-4 ring-primary/20"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 text-white rounded-full flex items-center justify-center text-4xl font-bold ring-4 ring-primary/20">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-card" />
                    </div>

                    {/* Name & Email */}
                    <h1 className="text-2xl font-serif font-bold text-foreground mb-1">
                        {user.name || "Matcha Lover"}
                    </h1>
                    <p className="text-muted-foreground text-sm mb-6">
                        {user.email}
                    </p>

                    {/* Quick Actions */}
                    <div className="flex justify-center gap-3">
                        <Link
                            href="/products"
                            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                            Belanja
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                        >
                            Keluar
                        </button>
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <Link
                        href="/profile/orders"
                        className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-3">
                            <ShoppingBag className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">Pesanan</h3>
                        <p className="text-xs text-muted-foreground">Lihat riwayat pesanan</p>
                    </Link>

                    <Link
                        href="/profile/wishlist"
                        className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                        <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-3">
                            <Heart className="w-6 h-6 text-pink-600" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">Wishlist</h3>
                        <p className="text-xs text-muted-foreground">Produk favorit Anda</p>
                    </Link>

                    <Link
                        href="/profile/settings"
                        className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition-all group col-span-2"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-xl flex items-center justify-center">
                                <Settings className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">Pengaturan</h3>
                                <p className="text-xs text-muted-foreground">Kelola akun & preferensi</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </Link>
                </div>

                {/* Promo Banner */}
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white text-center">
                    <p className="text-sm opacity-90 mb-1">🍃 Member Exclusive</p>
                    <p className="font-semibold">Dapatkan diskon 10% untuk pembelian pertama!</p>
                </div>

            </div>
        </main>
    );
}
