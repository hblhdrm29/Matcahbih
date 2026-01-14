"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Award, Leaf } from "lucide-react";

const features = [
    {
        icon: Award,
        label: "Premium Grade",
    },
    {
        icon: Leaf,
        label: "100% Organic",
    },
    {
        icon: Sparkles,
        label: "Uji, Japan",
    },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-cream-dark z-0" />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-matcha/10 rounded-full blur-3xl animate-float" />
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-matcha/5 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "2s" }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="order-2 lg:order-1 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-matcha/10 rounded-full text-matcha text-sm font-medium mb-6 animate-fade-in">
                            <Sparkles className="w-4 h-4" />
                            New Arrival: Spring Harvest 2024
                        </div>

                        {/* Headline */}
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-forest leading-tight mb-6 animate-slide-up"
                            style={{ animationDelay: "0.1s" }}
                        >
                            Discover the
                            <span className="block text-gradient-matcha mt-2">
                                Art of Matcha
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            className="text-lg text-forest/70 max-w-xl mx-auto lg:mx-0 mb-8 animate-slide-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            Experience authentic Japanese matcha, carefully sourced from the
                            legendary tea gardens of Uji. Elevate your daily ritual with our
                            ceremonial-grade collection.
                        </p>

                        {/* CTA Buttons */}
                        <div
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12 animate-slide-up"
                            style={{ animationDelay: "0.3s" }}
                        >
                            <Link
                                href="/products"
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-matcha hover:bg-matcha-dark text-white font-medium rounded-full transition-all duration-300 hover-lift shadow-matcha"
                            >
                                Shop Collection
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest/20 hover:border-matcha text-forest hover:text-matcha font-medium rounded-full transition-all duration-300"
                            >
                                Our Story
                            </Link>
                        </div>

                        {/* Feature Badges */}
                        <div
                            className="flex flex-wrap items-center gap-6 justify-center lg:justify-start animate-slide-up"
                            style={{ animationDelay: "0.4s" }}
                        >
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="flex items-center gap-2 text-forest/60"
                                >
                                    <feature.icon className="w-5 h-5 text-matcha" />
                                    <span className="text-sm font-medium">{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div
                            className="relative w-full max-w-lg mx-auto animate-slide-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-matcha/20 rounded-3xl blur-3xl transform scale-95" />

                            {/* Image Container */}
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-matcha-lg hover-lift">
                                <Image
                                    src="/images/hero-matcha.png"
                                    alt="Premium Japanese Matcha"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-forest/20 via-transparent to-transparent" />
                            </div>

                            {/* Floating Card - Removed */}

                            {/* Rating Badge - Removed */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Removed */}
        </section>
    );
}
