import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Award, Users, MapPin, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Tentang Kami",
    description: "Kenali lebih dekat Matchabih - Perjalanan kami menghadirkan matcha premium Jepang ke Indonesia.",
};

const values = [
    {
        icon: Leaf,
        title: "Kualitas Terbaik",
        description: "Kami hanya memilih matcha grade tertinggi langsung dari perkebunan tradisional di Uji, Kyoto.",
    },
    {
        icon: Heart,
        title: "Penuh Dedikasi",
        description: "Setiap gram matcha kami dipilih dengan cinta dan perhatian terhadap detail.",
    },
    {
        icon: Award,
        title: "Sertifikasi Premium",
        description: "Produk kami tersertifikasi dan memenuhi standar kualitas internasional.",
    },
    {
        icon: Users,
        title: "Komunitas Matcha",
        description: "Bergabung dengan ribuan pecinta matcha di seluruh Indonesia.",
    },
];

const milestones = [
    { icon: "🌱", title: "Bermula dari Passion", description: "Berawal dari kecintaan pada budaya teh Jepang dan perjalanan ke Uji, Kyoto." },
    { icon: "🤝", title: "Kemitraan Langsung", description: "Bekerja sama dengan petani matcha generasi ke-4 di Jepang." },
    { icon: "🇮🇩", title: "Hadir di Indonesia", description: "Menghadirkan matcha premium autentik untuk pecinta teh di seluruh nusantara." },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/30 to-background dark:from-forest dark:via-forest-light/20 dark:to-background" />
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 text-[200px] rotate-12">🍵</div>
                    <div className="absolute bottom-10 right-20 text-[150px] -rotate-12">🌿</div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Cerita Kami
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6">
                            Menghadirkan{" "}
                            <span className="text-primary">Keajaiban Matcha</span>{" "}
                            ke Indonesia
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Matchabih lahir dari kecintaan mendalam terhadap budaya teh Jepang.
                            Kami berkomitmen menghadirkan matcha premium autentik langsung dari
                            pegunungan Uji, Kyoto ke tangan Anda.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                                <Image
                                    src="/images/aboutme/11054-kebun-teh-uji.jpg"
                                    alt="Perkebunan Matcha Uji, Kyoto"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            {/* Decorative Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-matcha-lg">
                                <div className="text-3xl font-bold">5+</div>
                                <div className="text-sm opacity-90">Tahun Pengalaman</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                                Dari Pegunungan Kyoto ke Rumah Anda
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Perjalanan kami dimulai dari rasa penasaran akan matcha autentik.
                                    Setelah berkali-kali mengunjungi Jepang dan belajar langsung dari
                                    para master teh di Uji, kami memutuskan untuk membawa pengalaman
                                    itu ke Indonesia.
                                </p>
                                <p>
                                    Uji adalah tempat lahirnya budaya matcha lebih dari 800 tahun lalu.
                                    Di sini, kondisi iklim yang unik dengan kabut pagi, tanah vulkanik
                                    yang subur, dan sungai yang jernih menciptakan matcha dengan kualitas
                                    tak tertandingi.
                                </p>
                                <p>
                                    Kami bekerja sama langsung dengan petani-petani generasi ke-4 dan ke-5
                                    yang telah mengabdikan hidupnya untuk memproduksi matcha terbaik.
                                    Setiap batch matcha kami dipanen dengan tangan, dikeringkan secara
                                    tradisional, dan digiling menggunakan batu granit yang berputar perlahan.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="w-5 h-5" />
                                <span className="font-medium">Uji, Kyoto Prefecture, Japan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
                            Nilai-Nilai Kami
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Setiap keputusan yang kami ambil didasarkan pada nilai-nilai yang
                            kami pegang teguh.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-matcha transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <value.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
                            Perjalanan Kami
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
                            >
                                <div className="text-4xl mb-4">{milestone.icon}</div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {milestone.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {milestone.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="text-6xl mb-6">🎯</div>
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-6">
                            Misi Kami
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            Menjadikan matcha premium dapat diakses oleh semua orang di Indonesia,
                            sambil menjaga keaslian tradisi pembuatan matcha Jepang yang telah
                            berusia ratusan tahun. Kami percaya bahwa secangkir matcha yang baik
                            dapat membawa ketenangan, kesehatan, dan kebahagiaan dalam hidup Anda.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-matcha"
                            >
                                Jelajahi Produk
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-card border border-border text-foreground rounded-full font-medium hover:bg-muted transition-colors"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Quote */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-card rounded-3xl p-8 md:p-12 border border-border text-center relative overflow-hidden">
                        <div className="absolute top-4 left-4 text-6xl text-primary/10">"</div>
                        <div className="relative z-10">
                            <p className="text-xl md:text-2xl text-foreground font-serif italic mb-6">
                                Matcha bukan sekadar minuman, tapi filosofi hidup. Dalam setiap
                                tegukan, ada ketenangan, fokus, dan apresiasi terhadap momen ini.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold">
                                    M
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-foreground">Tim Matchabih</div>
                                    <div className="text-sm text-muted-foreground">Founder & Tea Enthusiast</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
