import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistItem = {
    id: string; // Product id
};

type WishlistStore = {
    items: string[]; // List of product IDs
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    syncWishlist: () => Promise<void>; // Fetch from server
    toggleWishlist: (id: string) => Promise<void>; // Server action
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
    items: [],

    addItem: (id) => set((state) => ({
        items: [...state.items, id]
    })),

    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item !== id)
    })),

    isInWishlist: (id) => get().items.includes(id),

    syncWishlist: async () => {
        try {
            const res = await fetch("/api/wishlist");
            if (res.ok) {
                const data = await res.json();
                // Extract product IDs
                const ids = data.map((item: any) => item.product.id || item.productId);
                set({ items: ids });
            }
        } catch (error) {
            console.error("Failed to sync wishlist", error);
        }
    },

    toggleWishlist: async (id) => {
        const { items, addItem, removeItem } = get();
        const isAdded = items.includes(id);

        // Optimistic Update
        if (isAdded) {
            removeItem(id);
        } else {
            addItem(id);
        }

        try {
            const res = await fetch("/api/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id }),
            });

            if (!res.ok) {
                // Revert on failure
                if (isAdded) addItem(id);
                else removeItem(id);
            }
        } catch (error) {
            console.error("Failed to toggle wishlist", error);
            // Revert on failure
            if (isAdded) addItem(id);
            else removeItem(id);
        }
    }
}));
