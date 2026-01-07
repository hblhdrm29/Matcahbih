"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    CreditCard,
    Truck,
    Shield,
    CheckCircle,
    Loader2,
    MapPin,
    Phone,
    User,
    Mail
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

// Format price to IDR
const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [isClient, setIsClient] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        notes: "",
        paymentMethod: "transfer",
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const subtotal = isClient ? getTotalPrice() : 0;
    const shipping = subtotal > 500000 ? 0 : 25000;
    const total = subtotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate order number
        const orderNum = `MB${Date.now().toString().slice(-8)}`;
        setOrderNumber(orderNum);
        setOrderComplete(true);
        clearCart();
        setIsSubmitting(false);
    };

    if (!isClient) {
        return (
            <main className="min-h-screen bg-background py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-48 mb-8" />
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="h-64 bg-muted rounded-2xl" />
                            </div>
                            <div className="h-96 bg-muted rounded-2xl" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Order Complete State
    if (orderComplete) {
        return (
            <main className="min-h-screen bg-background py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-lg mx-auto text-center py-16">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-serif font-medium text-foreground mb-4">
                            Pesanan Berhasil! 🎉
                        </h1>
                        <p className="text-muted-foreground mb-2">
                            Terima kasih atas pesanan Anda.
                        </p>
                        <p className="text-lg font-medium text-foreground mb-6">
                            Nomor Pesanan: <span className="text-primary">{orderNumber}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mb-8">
                            Kami akan mengirimkan konfirmasi ke email Anda. Silakan lakukan pembayaran
                            sesuai metode yang dipilih untuk memproses pesanan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/products"
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                            >
                                Lanjut Belanja
                            </Link>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-card border border-border text-foreground rounded-full font-medium hover:bg-muted transition-colors"
                            >
                                Kembali ke Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Empty Cart State
    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-background py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-lg mx-auto text-center py-16">
                        <div className="text-6xl mb-6">🛒</div>
                        <h1 className="text-2xl font-serif font-medium text-foreground mb-4">
                            Keranjang Kosong
                        </h1>
                        <p className="text-muted-foreground mb-8">
                            Tambahkan produk ke keranjang untuk melanjutkan checkout.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                        >
                            Jelajahi Produk
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background py-8 md:py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl md:text-3xl font-serif font-medium text-foreground">
                        Checkout
                    </h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Contact Info */}
                            <div className="bg-card rounded-2xl p-6 border border-border">
                                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    Informasi Kontak
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Nama Depan *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Nama depan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Nama Belakang *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Nama belakang"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            No. Telepon *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-card rounded-2xl p-6 border border-border">
                                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Alamat Pengiriman
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Alamat Lengkap *
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                            placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Kota *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Kota"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Provinsi *
                                            </label>
                                            <input
                                                type="text"
                                                name="province"
                                                value={formData.province}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Provinsi"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Kode Pos *
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="12345"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Catatan (Opsional)
                                        </label>
                                        <input
                                            type="text"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Catatan untuk kurir (opsional)"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-card rounded-2xl p-6 border border-border">
                                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    Metode Pembayaran
                                </h2>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="transfer"
                                            checked={formData.paymentMethod === "transfer"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <div className="font-medium text-foreground">Transfer Bank</div>
                                            <div className="text-sm text-muted-foreground">BCA, Mandiri, BNI, BRI</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="ewallet"
                                            checked={formData.paymentMethod === "ewallet"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <div className="font-medium text-foreground">E-Wallet</div>
                                            <div className="text-sm text-muted-foreground">GoPay, OVO, DANA, ShopeePay</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === "cod"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div>
                                            <div className="font-medium text-foreground">COD (Bayar di Tempat)</div>
                                            <div className="text-sm text-muted-foreground">Khusus area Jabodetabek</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button - Mobile */}
                            <div className="lg:hidden">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            Buat Pesanan - {formatPrice(total)}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                            <h2 className="text-lg font-semibold text-foreground mb-4">
                                Ringkasan Pesanan
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0 relative">
                                            {item.product.images?.[0] && (
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-foreground truncate">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {item.quantity}x {formatPrice(item.product.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="space-y-3 border-t border-border pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Ongkir</span>
                                    <span className="text-foreground">
                                        {shipping === 0 ? (
                                            <span className="text-green-600">GRATIS</span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Gratis ongkir untuk pembelian di atas Rp500.000
                                    </p>
                                )}
                                <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
                                    <span>Total</span>
                                    <span className="text-primary">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Submit Button - Desktop */}
                            <button
                                type="submit"
                                form="checkout-form"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="hidden lg:flex w-full items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors mt-6 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    "Buat Pesanan"
                                )}
                            </button>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-4 border-t border-border">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Shield className="w-4 h-4 text-green-600" />
                                    Pembayaran aman & terenkripsi
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Truck className="w-4 h-4 text-green-600" />
                                    Pengiriman 2-5 hari kerja
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
