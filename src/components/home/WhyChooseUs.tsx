import { Leaf, Truck, Shield, Award, Clock, Heart } from "lucide-react";

const features = [
    {
        icon: Leaf,
        title: "100% Organic",
        description:
            "All our matcha is certified organic, grown without pesticides or chemicals.",
    },
    {
        icon: Award,
        title: "Premium Quality",
        description:
            "Sourced from the finest tea gardens in Uji, Japan with centuries of tradition.",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        description:
            "Free shipping across Indonesia. Same-day delivery in Jakarta area.",
    },
    {
        icon: Shield,
        title: "Authenticity Guaranteed",
        description:
            "Every batch is tested and certified for purity and freshness.",
    },
    {
        icon: Clock,
        title: "Fresh Harvest",
        description:
            "We import directly from Japan to ensure you get the freshest matcha.",
    },
    {
        icon: Heart,
        title: "Customer Care",
        description:
            "Dedicated support team ready to help with any questions or concerns.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-cream">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-matcha text-sm font-medium uppercase tracking-wider">
                        Why Matchabih
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-medium text-forest mt-2">
                        The Matchabih Difference
                    </h2>
                    <p className="text-forest/60 mt-4 max-w-2xl mx-auto">
                        We&apos;re committed to bringing you the finest matcha experience,
                        from farm to cup.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group p-6 bg-white rounded-2xl border border-border hover:border-matcha/30 hover:shadow-matcha transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-matcha/10 flex items-center justify-center mb-5 group-hover:bg-matcha/20 transition-colors">
                                <feature.icon className="w-7 h-7 text-matcha" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-medium text-forest mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-forest/60 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Banner */}
                <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest via-forest-light to-forest p-8 sm:p-12">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-matcha/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-matcha/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-cream mb-2">
                                Ready to Experience Premium Matcha?
                            </h3>
                            <p className="text-cream/70">
                                Join thousands of matcha lovers and discover your new favorite.
                            </p>
                        </div>
                        <a
                            href="/products"
                            className="flex-shrink-0 px-8 py-4 bg-matcha hover:bg-matcha-light text-white font-medium rounded-full transition-all duration-300 hover-lift shadow-matcha"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
