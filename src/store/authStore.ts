import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // For demo, accept any email/password
                const user: User = {
                    id: `user_${Date.now()}`,
                    name: email.split("@")[0],
                    email: email,
                    image: undefined,
                };

                set({ user, isAuthenticated: true });
                return true;
            },

            signup: async (name: string, email: string, password: string) => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                const user: User = {
                    id: `user_${Date.now()}`,
                    name: name,
                    email: email,
                    image: undefined,
                };

                set({ user, isAuthenticated: true });
                return true;
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (data: Partial<User>) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({ user: { ...currentUser, ...data } });
                }
            },
        }),
        {
            name: "matchabih-auth",
        }
    )
);
