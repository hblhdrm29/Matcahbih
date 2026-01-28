import { useSession } from "next-auth/react";

export const useAuth = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const user = session?.user;

    return {
        user,
        loading,
        isAuthenticated: !!user,
        role: (user as any)?.role,
    };
};
