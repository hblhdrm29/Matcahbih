"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    MapPin,
    Settings,
    LogOut,
    User
} from "lucide-react";

const navigation = [
    { name: "Overview", href: "/profile", icon: LayoutDashboard },
    { name: "Pesanan Saya", href: "/profile/orders", icon: ShoppingBag },
    { name: "Wishlist", href: "/profile/wishlist", icon: Heart },
    { name: "Alamat", href: "/profile/addresses", icon: MapPin },
    { name: "Pengaturan", href: "/profile/settings", icon: Settings },
];

export default function ProfileSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* User Mini Profile */}
            <div className="p-6 bg-cream border-b border-border">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-matcha overflow-hidden flex items-center justify-center text-white font-bold text-xl ring-2 ring-white shadow-md">
                        {user?.image ? (
                            <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                        ) : (
                            <span>{user?.name?.charAt(0).toUpperCase() || "M"}</span>
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="font-serif font-medium text-forest truncate">
                            {user?.name || "Matcha Lover"}
                        </h3>
                        <p className="text-xs text-forest/60 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-matcha text-white shadow-matcha-sm"
                                : "text-forest/70 hover:bg-cream hover:text-matcha"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-forest/50 group-hover:text-matcha"}`} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-border mt-2">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Keluar</span>
                </button>
            </div>
        </div>
    );
}
