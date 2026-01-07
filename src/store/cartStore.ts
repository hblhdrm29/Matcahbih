import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

export interface CartItemType {
    id: string;
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItemType[];
    isOpen: boolean;

    // Actions
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    // Computed
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product: Product, quantity: number = 1) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.product.id === product.id
                    );

                    if (existingItem) {
                        // Update quantity if item exists
                        return {
                            items: state.items.map((item) =>
                                item.product.id === product.id
                                    ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                                    : item
                            ),
                        };
                    }

                    // Add new item
                    return {
                        items: [
                            ...state.items,
                            {
                                id: crypto.randomUUID(),
                                product,
                                quantity: Math.min(quantity, product.stock),
                            },
                        ],
                    };
                });
            },

            removeItem: (productId: string) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }));
            },

            updateQuantity: (productId: string, quantity: number) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId
                            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
                            : item
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set((state) => ({ isOpen: !state.isOpen }));
            },

            openCart: () => {
                set({ isOpen: true });
            },

            closeCart: () => {
                set({ isOpen: false });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: "matchabih-cart",
            partialize: (state) => ({ items: state.items }),
        }
    )
);
