"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    Search,
    ShoppingBag,
    User,
    Leaf,
} from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Mock cart count - will be replaced with Zustand store
    const cartCount = 3;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "glass-cream shadow-matcha py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group"
                    >
                        <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-matcha group-hover:bg-matcha-dark transition-colors duration-300">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-serif font-medium text-forest group-hover:text-matcha-dark transition-colors duration-300">
                            Matchabih
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors duration-300 
                  ${pathname === link.href
                                        ? "text-matcha"
                                        : "text-forest hover:text-matcha"
                                    }
                  after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                  after:bg-matcha after:transition-all after:duration-300
                  hover:after:w-full
                  ${pathname === link.href ? "after:w-full" : ""}
                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Button */}
                        <button
                            className="p-2 rounded-full hover:bg-cream-dark transition-colors duration-300 group"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-forest group-hover:text-matcha transition-colors" />
                        </button>

                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className="relative p-2 rounded-full hover:bg-cream-dark transition-colors duration-300 group"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingBag className="w-5 h-5 text-forest group-hover:text-matcha transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-matcha rounded-full px-1">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Button */}
                        <Link
                            href="/login"
                            className="hidden sm:flex p-2 rounded-full hover:bg-cream-dark transition-colors duration-300 group"
                            aria-label="Account"
                        >
                            <User className="w-5 h-5 text-forest group-hover:text-matcha transition-colors" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 rounded-full hover:bg-cream-dark transition-colors duration-300"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? (
                                <X className="w-5 h-5 text-forest" />
                            ) : (
                                <Menu className="w-5 h-5 text-forest" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-80 mt-4" : "max-h-0"
                        }`}
                >
                    <div className="flex flex-col gap-2 py-4 border-t border-border">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${pathname === link.href
                                        ? "bg-matcha text-white"
                                        : "text-forest hover:bg-cream-dark hover:text-matcha"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="sm:hidden px-4 py-3 rounded-lg text-sm font-medium text-forest hover:bg-cream-dark hover:text-matcha transition-all duration-300 flex items-center gap-2"
                        >
                            <User className="w-4 h-4" />
                            Account
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
