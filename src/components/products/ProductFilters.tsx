"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { MatchaGrade } from "@/types";
import { cn } from "@/lib/utils";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface ProductFiltersProps {
    categories: Category[];
    selectedCategory: string | null;
    selectedGrade: MatchaGrade | null;
    minPrice: number | null;
    maxPrice: number | null;
    onCategoryChange: (category: string | null) => void;
    onGradeChange: (grade: MatchaGrade | null) => void;
    onPriceChange: (min: number | null, max: number | null) => void;
    onClearFilters: () => void;
}

const grades: { value: MatchaGrade; label: string; description: string }[] = [
    { value: "CEREMONIAL", label: "Ceremonial", description: "Highest quality, for traditional tea" },
    { value: "PREMIUM", label: "Premium", description: "High quality, versatile use" },
    { value: "CULINARY", label: "Culinary", description: "Perfect for cooking & baking" },
    { value: "LATTE", label: "Latte", description: "Smooth blend for lattes" },
];

const priceRanges = [
    { min: null, max: null, label: "All Prices" },
    { min: 0, max: 100000, label: "Under Rp 100K" },
    { min: 100000, max: 250000, label: "Rp 100K - 250K" },
    { min: 250000, max: 500000, label: "Rp 250K - 500K" },
    { min: 500000, max: null, label: "Above Rp 500K" },
];

export default function ProductFilters({
    categories,
    selectedCategory,
    selectedGrade,
    minPrice,
    maxPrice,
    onCategoryChange,
    onGradeChange,
    onPriceChange,
    onClearFilters,
}: ProductFiltersProps) {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        grade: true,
        price: true,
    });

    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const hasActiveFilters = selectedCategory || selectedGrade || minPrice !== null || maxPrice !== null;

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Clear Filters */}
            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors dark:bg-red-950/30 dark:hover:bg-red-950/50"
                >
                    <X className="w-4 h-4" />
                    Clear All Filters
                </button>
            )}

            {/* Categories */}
            <div className="border-b border-border pb-6">
                <button
                    onClick={() => toggleSection("category")}
                    className="w-full flex items-center justify-between text-sm font-semibold text-foreground mb-3"
                >
                    <span>Categories</span>
                    {expandedSections.category ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
                {expandedSections.category && (
                    <div className="space-y-2">
                        <button
                            onClick={() => onCategoryChange(null)}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                selectedCategory === null
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground hover:bg-muted"
                            )}
                        >
                            All Categories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onCategoryChange(category.slug)}
                                className={cn(
                                    "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                    selectedCategory === category.slug
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-muted"
                                )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grade */}
            <div className="border-b border-border pb-6">
                <button
                    onClick={() => toggleSection("grade")}
                    className="w-full flex items-center justify-between text-sm font-semibold text-foreground mb-3"
                >
                    <span>Matcha Grade</span>
                    {expandedSections.grade ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
                {expandedSections.grade && (
                    <div className="space-y-2">
                        <button
                            onClick={() => onGradeChange(null)}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                selectedGrade === null
                                    ? "bg-primary text-primary-foreground"
                                    : "text-foreground hover:bg-muted"
                            )}
                        >
                            All Grades
                        </button>
                        {grades.map((grade) => (
                            <button
                                key={grade.value}
                                onClick={() => onGradeChange(grade.value)}
                                className={cn(
                                    "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                    selectedGrade === grade.value
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-muted"
                                )}
                            >
                                <span className="block font-medium">{grade.label}</span>
                                <span className="block text-xs opacity-70">{grade.description}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div>
                <button
                    onClick={() => toggleSection("price")}
                    className="w-full flex items-center justify-between text-sm font-semibold text-foreground mb-3"
                >
                    <span>Price Range</span>
                    {expandedSections.price ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
                {expandedSections.price && (
                    <div className="space-y-2">
                        {priceRanges.map((range, index) => {
                            const isSelected = minPrice === range.min && maxPrice === range.max;
                            return (
                                <button
                                    key={index}
                                    onClick={() => onPriceChange(range.min, range.max)}
                                    className={cn(
                                        "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                        isSelected
                                            ? "bg-primary text-primary-foreground"
                                            : "text-foreground hover:bg-muted"
                                    )}
                                >
                                    {range.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                    </h2>
                    <FilterContent />
                </div>
            </aside>

            {/* Mobile Filter Button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-matcha-lg hover:scale-105 transition-transform"
            >
                <Filter className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                )}
            </button>

            {/* Mobile Filter Drawer */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background p-6 overflow-y-auto animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Filters
                            </h2>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    );
}
