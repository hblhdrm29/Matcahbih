"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // useParams to get orderId
import { QrCode, CreditCard, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function PaymentPage() {
    const router = useRouter();
    const params = useParams();
    const orderId = params?.orderId as string;

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            if (!res.ok) throw new Error("Payment failed");

            // Simulate delay for "processing" feel
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setIsSuccess(true);
            // Redirect after showing success
            setTimeout(() => {
                router.push("/profile/orders");
            }, 2000);

        } catch (error) {
            console.error(error);
            alert("Pembayaran Gagal. Silakan coba lagi.");
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream/30">
                <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-matcha/20 animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-forest mb-2">Pembayaran Berhasil!</h1>
                    <p className="text-forest/60">Terima kasih telah berbelanja di Matchabih.</p>
                    <p className="text-sm text-forest/40 mt-4">Mengalihkan ke pesanan saya...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-dark/20 pt-32 pb-12">
            <div className="container mx-auto px-4 max-w-lg">
                <div className="bg-white rounded-3xl overflow-hidden shadow-matcha">
                    {/* Header */}
                    <div className="bg-forest p-6 text-center text-white">
                        <p className="text-white/60 text-sm mb-1">Total Pembayaran</p>
                        <h1 className="text-3xl font-bold font-mono">Rp 0</h1>
                        {/* Note: Ideally we pass the amount or fetch order details here, but for mock flow keeping it simple or fetching order detail is better. 
                            Let's keep it static "Confirm Payment" style for now or fetch order detail if needed. 
                            Since user just wants flow, mock price or generic text is acceptable if fast.
                        */}
                        <p className="text-xs text-white/40 mt-2">Order ID: {orderId}</p>
                    </div>

                    <div className="p-8">
                        <h2 className="font-serif font-bold text-forest mb-6">Pilih Metode Pembayaran</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4 p-4 border border-matcha bg-matcha/5 rounded-xl cursor-pointer">
                                <QrCode className="w-6 h-6 text-matcha" />
                                <div className="flex-1">
                                    <p className="font-bold text-forest">QRIS</p>
                                    <p className="text-xs text-forest/60">Scan QR Code instan</p>
                                </div>
                                <div className="w-4 h-4 rounded-full border border-matcha bg-matcha flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 border border-border rounded-xl opacity-50 cursor-not-allowed">
                                <CreditCard className="w-6 h-6 text-forest/40" />
                                <div className="flex-1">
                                    <p className="font-bold text-forest/40">Transfer Bank</p>
                                    <p className="text-xs text-forest/40">Segera Hadir</p>
                                </div>
                            </div>
                        </div>

                        {/* QR Placeholder */}
                        <div className="mb-8 p-6 bg-white border-2 border-dashed border-gray-200 rounded-xl text-center">
                            <div className="w-48 h-48 bg-gray-100 mx-auto rounded-lg flex items-center justify-center mb-4">
                                <QrCode className="w-24 h-24 text-gray-300" />
                            </div>
                            <p className="text-sm text-forest/60">Scan QR Code ini untuk membayar</p>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full py-4 bg-matcha text-white rounded-xl font-bold hover:bg-matcha-dark transition-colors shadow-matcha disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Konfirmasi Pembayaran
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
