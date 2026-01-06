"use client";

import Image from "next/image";
import { Sparkles, Clock, RefreshCw } from "lucide-react";

export default function DailyMatcha() {
    return (
        <section className="py-20 bg-forest text-cream overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-matcha/20 rounded-full text-matcha-light text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Daily Recommendation
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight mb-6">
                            Today&apos;s
                            <span className="block text-matcha-light mt-2">
                                Matcha Pick
                            </span>
                        </h2>

                        <p className="text-cream/70 text-lg mb-8 max-w-lg">
                            Each day, we curate a special matcha selection just for you.
                            Discover new favorites and expand your matcha journey with our
                            daily recommendations.
                        </p>

                        {/* Daily Pick Card */}
                        <div className="bg-forest-light rounded-2xl p-6 border border-cream/10">
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 rounded-xl bg-matcha/20 flex-shrink-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-matcha/40" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs text-matcha-light uppercase tracking-wider">
                                        Ceremonial Grade
                                    </span>
                                    <h3 className="text-lg font-medium mt-1">
                                        Kyoto Reserve Matcha
                                    </h3>
                                    <p className="text-cream/60 text-sm mt-1">
                                        Smooth, umami-rich with notes of spring grass
                                    </p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-xl font-semibold text-matcha-light">
                                            Rp 425.000
                                        </span>
                                        <button className="px-4 py-2 bg-matcha hover:bg-matcha-light text-white text-sm font-medium rounded-lg transition-colors">
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timer Info */}
                        <div className="flex items-center gap-6 mt-6 text-sm text-cream/60">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Refreshes in 12:45:30</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" />
                                <span>New pick every 24h</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-matcha/30 rounded-full blur-[100px]" />

                            {/* Decorative Circles */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-cream/10 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cream/5 rounded-full animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />

                            {/* Center Content */}
                            <div className="relative aspect-square flex items-center justify-center">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-matcha via-matcha-light to-matcha-dark flex items-center justify-center shadow-2xl animate-float">
                                    <div className="w-32 h-32 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center">
                                        <span className="text-6xl font-serif text-cream/90">抹</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-matcha-light/20 backdrop-blur-sm animate-float" style={{ animationDelay: "1s" }} />
                            <div className="absolute bottom-10 left-10 w-12 h-12 rounded-full bg-matcha/20 backdrop-blur-sm animate-float" style={{ animationDelay: "2s" }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
