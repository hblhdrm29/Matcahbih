"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageCircle,
    Instagram,
    Loader2,
    CheckCircle
} from "lucide-react";

const contactInfo = [
    {
        icon: Phone,
        title: "Telepon / WhatsApp",
        value: "+62 888 8888 888",
        href: "https://wa.me/628888888888",
        action: "Chat via WhatsApp",
    },
    {
        icon: Mail,
        title: "Email",
        value: "hello@matchabih.com",
        href: "mailto:hello@matchabih.com",
        action: "Kirim Email",
    },
    {
        icon: MapPin,
        title: "Alamat",
        value: "Jakarta, Indonesia",
        href: "https://maps.google.com",
        action: "Lihat di Maps",
    },
    {
        icon: Clock,
        title: "Jam Operasional",
        value: "Senin - Sabtu, 09:00 - 18:00",
        href: null,
        action: null,
    },
];

const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/matchabih", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/628888888888", label: "WhatsApp" },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/30 to-background dark:from-forest dark:via-forest-light/20 dark:to-background" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">
                            Hubungi Kami
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Ada pertanyaan atau ingin tahu lebih lanjut? Kami senang mendengar dari Anda!
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                            <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
                                Kirim Pesan
                            </h2>

                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        Pesan Terkirim!
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Terima kasih! Kami akan segera menghubungi Anda.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                                placeholder="Nama Anda"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                            Subjek
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                        >
                                            <option value="">Pilih subjek...</option>
                                            <option value="order">Pertanyaan Pesanan</option>
                                            <option value="product">Informasi Produk</option>
                                            <option value="wholesale">Pembelian Grosir</option>
                                            <option value="collaboration">Kerjasama</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                            Pesan
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                                            placeholder="Tulis pesan Anda di sini..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-matcha disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Kirim Pesan
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
                                    Informasi Kontak
                                </h2>
                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
                                        >
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                                <info.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-muted-foreground mb-1">
                                                    {info.title}
                                                </div>
                                                <div className="font-medium text-foreground">
                                                    {info.value}
                                                </div>
                                                {info.href && (
                                                    <a
                                                        href={info.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-primary hover:underline mt-1 inline-block"
                                                    >
                                                        {info.action} →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    Ikuti Kami
                                </h3>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Response */}
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">💬</div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            Butuh Respons Cepat?
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Hubungi kami langsung via WhatsApp untuk respons lebih cepat!
                                        </p>
                                        <a
                                            href="https://wa.me/628888888888"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Chat WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Teaser */}
            <section className="py-12 md:py-16 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-4">
                        Pertanyaan Umum
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Mungkin pertanyaan Anda sudah terjawab di halaman FAQ kami.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <h4 className="font-medium text-foreground mb-1">Berapa lama pengiriman?</h4>
                            <p className="text-sm text-muted-foreground">2-5 hari kerja untuk area Jabodetabek</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <h4 className="font-medium text-foreground mb-1">Apakah matcha autentik?</h4>
                            <p className="text-sm text-muted-foreground">100% impor langsung dari Uji, Jepang</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <h4 className="font-medium text-foreground mb-1">Cara penyimpanan?</h4>
                            <p className="text-sm text-muted-foreground">Simpan di kulkas setelah dibuka</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
