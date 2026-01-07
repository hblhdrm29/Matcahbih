"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid, Loader2 } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { Product, MatchaGrade, PaginatedResponse, Category } from "@/types";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Popular" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
];

// Mock categories - replace with API call
const mockCategories: Category[] = [
    { id: "1", name: "Pure Matcha", slug: "pure-matcha", description: null, image: null, createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "Matcha Latte", slug: "matcha-latte", description: null, image: null, createdAt: new Date(), updatedAt: new Date() },
    { id: "3", name: "Accessories", slug: "accessories", description: null, image: null, createdAt: new Date(), updatedAt: new Date() },
    { id: "4", name: "Gift Sets", slug: "gift-sets", description: null, image: null, createdAt: new Date(), updatedAt: new Date() },
];

function ProductsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [gridCols, setGridCols] = useState<3 | 4>(4);

    // Get params from URL
    const category = searchParams.get("category");
    const grade = searchParams.get("grade") as MatchaGrade | null;
    const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : null;
    const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : null;
    const sort = (searchParams.get("sort") as SortOption) || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";

    // Update URL params
    const updateParams = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value === null) {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            });
            // Reset to page 1 when filters change
            if (!updates.hasOwnProperty("page")) {
                params.set("page", "1");
            }
            router.push(`/products?${params.toString()}`);
        },
        [router, searchParams]
    );

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (category) params.set("category", category);
                if (grade) params.set("grade", grade);
                if (minPrice) params.set("minPrice", minPrice.toString());
                if (maxPrice) params.set("maxPrice", maxPrice.toString());
                if (sort) params.set("sort", sort);
                if (page) params.set("page", page.toString());
                if (search) params.set("search", search);
                params.set("limit", "12");

                const res = await fetch(`/api/products?${params.toString()}`);
                const data: PaginatedResponse<Product> = await res.json();

                setProducts(data.data || []);
                setTotalPages(data.pagination?.totalPages || 1);
                setTotalProducts(data.pagination?.total || 0);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, grade, minPrice, maxPrice, sort, page, search]);

    // Search handler with debounce
    const [searchInput, setSearchInput] = useState(search);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== search) {
                updateParams({ search: searchInput || null });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput, search, updateParams]);

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <section className="bg-gradient-to-b from-cream to-background dark:from-forest dark:to-background py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground text-center">
                        Our Collection
                    </h1>
                    <p className="text-muted-foreground text-center mt-3 max-w-2xl mx-auto">
                        Discover our premium selection of authentic Japanese matcha, carefully sourced from Uji, Kyoto.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mt-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <ProductFilters
                        categories={mockCategories}
                        selectedCategory={category}
                        selectedGrade={grade}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onCategoryChange={(cat) => updateParams({ category: cat })}
                        onGradeChange={(g) => updateParams({ grade: g })}
                        onPriceChange={(min, max) =>
                            updateParams({
                                minPrice: min?.toString() ?? null,
                                maxPrice: max?.toString() ?? null,
                            })
                        }
                        onClearFilters={() =>
                            updateParams({
                                category: null,
                                grade: null,
                                minPrice: null,
                                maxPrice: null,
                            })
                        }
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Sort Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <p className="text-sm text-muted-foreground">
                                Showing{" "}
                                <span className="font-medium text-foreground">{products.length}</span> of{" "}
                                <span className="font-medium text-foreground">{totalProducts}</span> products
                            </p>

                            <div className="flex items-center gap-4">
                                {/* Grid Toggle */}
                                <div className="hidden md:flex items-center gap-1 p-1 bg-muted rounded-lg">
                                    <button
                                        onClick={() => setGridCols(3)}
                                        className={cn(
                                            "p-1.5 rounded-md transition-colors",
                                            gridCols === 3 ? "bg-card shadow-sm" : "hover:bg-card/50"
                                        )}
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setGridCols(4)}
                                        className={cn(
                                            "p-1.5 rounded-md transition-colors",
                                            gridCols === 4 ? "bg-card shadow-sm" : "hover:bg-card/50"
                                        )}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                                    <select
                                        value={sort}
                                        onChange={(e) => updateParams({ sort: e.target.value })}
                                        className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        )}

                        {/* Products Grid */}
                        {!loading && products.length > 0 && (
                            <div
                                className={cn(
                                    "grid gap-6",
                                    gridCols === 3
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                )}
                            >
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && products.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🍵</div>
                                <h3 className="text-xl font-medium text-foreground mb-2">No products found</h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your filters or search term.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-10">
                                <button
                                    onClick={() => updateParams({ page: (page - 1).toString() })}
                                    disabled={page <= 1}
                                    className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        const pageNum = i + 1;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => updateParams({ page: pageNum.toString() })}
                                                className={cn(
                                                    "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                                                    page === pageNum
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-card border border-border text-foreground hover:bg-muted"
                                                )}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => updateParams({ page: (page + 1).toString() })}
                                    disabled={page >= totalPages}
                                    className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
