// TypeScript types for Matchabih

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    comparePrice: number | null;
    grade: MatchaGrade;
    flavor: string | null;
    origin: string | null;
    weight: number;
    stock: number;
    images: string[];
    featured: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    category?: Category;
    reviews?: Review[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    products?: Product[];
}

export interface Review {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    productId: string;
    user?: User;
    product?: Product;
}

export interface User {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItem {
    id: string;
    quantity: number;
    productId: string;
    userId: string;
    product?: Product;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
    paymentMethod: string | null;
    paymentId: string | null;
    shippingAddress: ShippingAddress | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    items?: OrderItem[];
}

export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    productId: string;
    orderId: string;
    product?: Product;
}

export interface ShippingAddress {
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
}

// Enums
export type MatchaGrade = "CEREMONIAL" | "PREMIUM" | "CULINARY" | "LATTE";
export type Role = "CUSTOMER" | "ADMIN";
export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Query params for products
export interface ProductQueryParams {
    category?: string;
    grade?: MatchaGrade;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    sort?: "price-asc" | "price-desc" | "newest" | "popular";
    page?: number;
    limit?: number;
    search?: string;
}
