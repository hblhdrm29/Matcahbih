"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ProductResult {
    id: string;
    name: string;
    description: string;
    slug: string;
    images: string[];
    price: number;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<ProductResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Handle body scroll locking
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Focus input on open
            const input = document.getElementById("search-input");
            if (input) input.focus();
        } else {
            document.body.style.overflow = "";
            setQuery("");
            setResults([]);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // Debounce query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Fetch results
    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery.trim()) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const res = await fetch(`/api/products?search=${encodeURIComponent(debouncedQuery)}&limit=5`);
                if (res.ok) {
                    const data = await res.json();
                    setResults(data.data || []);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`);
            onClose();
        }
    };

    const quickSearches: string[] = [];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 sm:pt-32">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-forest/20 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-[#FCFBF7] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                {/* Search Header */}
                <form onSubmit={handleSearchSubmit} className="relative flex items-center p-6 gap-4">
                    <Search className="w-6 h-6 text-matcha flex-shrink-0" />
                    <input
                        id="search-input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari produk matcha..."
                        className="w-full bg-transparent border-none text-xl md:text-2xl font-serif text-forest placeholder:text-forest/30 focus:outline-none focus:ring-0 p-0"
                        autoComplete="off"
                    />
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {isLoading && <Loader2 className="w-5 h-5 text-matcha animate-spin" />}
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 hover:bg-forest/5 rounded-full transition-colors text-forest/50 hover:text-forest"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="h-px bg-forest/5 mx-6" />

                {/* Results Area */}
                <div className="max-h-[60vh] overflow-y-auto p-4">
                    {query.trim() === "" ? (
                        quickSearches.length > 0 ? (
                            <div className="p-4 sm:p-8">
                                <p className="text-xs font-bold text-forest/40 uppercase tracking-widest mb-4">
                                    Pencarian Populer
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {quickSearches.map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => setQuery(term)}
                                            className="px-4 py-2 bg-white rounded-full text-forest/80 text-sm font-medium hover:bg-matcha hover:text-white hover:scale-105 transition-all duration-300 shadow-sm border border-forest/5"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : null
                    ) : isLoading && results.length === 0 ? (
                        <div className="py-12 text-center text-forest/60">
                            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-matcha/50" />
                            <p className="font-serif text-lg">Mencari matcha terbaik...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-2 p-2">
                            <p className="px-3 text-xs font-bold text-forest/40 uppercase tracking-widest mb-2">
                                Produk Ditemukan
                            </p>
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    onClick={onClose}
                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-forest/5 hover:scale-[1.01] transition-all duration-300 group border border-transparent hover:border-forest/5 cursor-pointer"
                                >
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                                        {product.images?.[0] ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-forest/5 text-forest/20">
                                                <Search className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-serif font-medium text-forest text-lg group-hover:text-matcha transition-colors line-clamp-1">
                                            {product.name}
                                        </h4>
                                        <p className="text-sm text-forest/60 line-clamp-1 mt-0.5 font-light">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="text-right pl-4">
                                        <div className="text-sm font-semibold text-forest">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                maximumFractionDigits: 0,
                                            }).format(product.price)}
                                        </div>
                                        <span className="text-xs text-matcha opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 mt-1 font-medium transform translate-x-2 group-hover:translate-x-0 duration-300">
                                            Lihat <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                            <button
                                onClick={() => handleSearchSubmit()}
                                className="w-full mt-4 p-4 text-center text-sm text-forest font-medium hover:text-matcha hover:bg-forest/5 rounded-xl transition-all flex items-center justify-center gap-2 group"
                            >
                                Lihat semua hasil untuk "<span className="font-bold">{query}</span>"
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="py-16 text-center text-forest/60">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="font-serif text-lg text-forest">Tidak ada hasil ditemukan</p>
                            <p className="text-sm mt-1">Coba kata kunci lain seperti "Ceremonial" atau "Set"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
