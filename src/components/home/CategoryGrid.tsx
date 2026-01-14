import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        name: "Ceremonial Grade",
        slug: "ceremonial",
        description: "Highest quality for traditional tea ceremony",
        image: "/images/categories/ceremonial.jpg",
        color: "from-emerald-500/80 to-emerald-700/80",
    },
    {
        name: "Premium Grade",
        slug: "premium",
        description: "Premium quality for daily enjoyment",
        image: "/images/categories/premium.jpg",
        color: "from-green-500/80 to-green-700/80",
    },
    {
        name: "Culinary Grade",
        slug: "culinary",
        description: "Perfect for baking and cooking",
        image: "/images/categories/culinary.jpg",
        color: "from-lime-500/80 to-lime-700/80",
    },
    {
        name: "Matcha Latte",
        slug: "latte",
        description: "Specially blended for lattes",
        image: "/images/categories/latte.jpg",
        color: "from-teal-500/80 to-teal-700/80",
    },
];

export default function CategoryGrid() {
    return (
        <section className="py-20 bg-cream">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-matcha text-sm font-medium uppercase tracking-wider">
                        Our Collection
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-medium text-forest mt-2">
                        Shop by Grade
                    </h2>
                    <p className="text-forest/60 mt-4 max-w-2xl mx-auto">
                        Explore our curated selection of premium matcha, each grade
                        carefully selected for its unique characteristics and purpose.
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/products?grade=${category.slug}`}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden hover-lift"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-serif font-medium text-cream mb-2 group-hover:translate-x-1 transition-transform duration-300">
                                    {category.name}
                                </h3>
                                <p className="text-cream/70 text-sm mb-4 line-clamp-2">
                                    {category.description}
                                </p>
                                <div className="inline-flex items-center gap-2 text-sm text-matcha-light font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    Explore
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Decorative Border */}
                            <div className="absolute inset-0 rounded-2xl border border-cream/10 group-hover:border-matcha/30 transition-colors duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
