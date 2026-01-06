import Link from "next/link";
import { Leaf, Instagram, Twitter, Facebook, Mail } from "lucide-react";

const footerLinks = {
    shop: [
        { label: "All Products", href: "/products" },
        { label: "Ceremonial Grade", href: "/products?grade=ceremonial" },
        { label: "Premium Grade", href: "/products?grade=premium" },
        { label: "Culinary Grade", href: "/products?grade=culinary" },
        { label: "Matcha Latte", href: "/products?grade=latte" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Our Story", href: "/about#story" },
        { label: "Sustainability", href: "/about#sustainability" },
        { label: "Contact", href: "/contact" },
    ],
    support: [
        { label: "FAQ", href: "/faq" },
        { label: "Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
        { label: "Track Order", href: "/track-order" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export default function Footer() {
    return (
        <footer className="bg-forest text-cream">
            {/* Main Footer */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-matcha">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-serif font-medium text-cream">
                                Matchabih
                            </span>
                        </Link>
                        <p className="text-cream/70 text-sm leading-relaxed mb-6 max-w-sm">
                            Premium matcha sourced directly from the finest tea gardens in
                            Uji, Japan. Experience the authentic taste of tradition with
                            every sip.
                        </p>
                        {/* Newsletter */}
                        <div className="space-y-3">
                            <p className="text-sm font-medium">Subscribe to our newsletter</p>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-2.5 bg-forest-light border border-cream/20 rounded-lg text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:border-matcha transition-colors"
                                    />
                                </div>
                                <button className="px-5 py-2.5 bg-matcha hover:bg-matcha-light text-white text-sm font-medium rounded-lg transition-colors duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-cream/70 hover:text-matcha-light transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-cream/70 hover:text-matcha-light transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-cream/70 hover:text-matcha-light transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-cream/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-cream/60">
                            © {new Date().getFullYear()} Matchabih. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="p-2 rounded-full hover:bg-forest-light transition-colors duration-300 group"
                                >
                                    <social.icon className="w-5 h-5 text-cream/70 group-hover:text-matcha-light transition-colors" />
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6 text-sm text-cream/60">
                            <Link
                                href="/privacy"
                                className="hover:text-cream transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="hover:text-cream transition-colors"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
