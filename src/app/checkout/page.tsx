import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
    title: "Checkout | Matchabih",
    description: "Secure checkout for your Matcha order.",
};

export default async function CheckoutPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin?callbackUrl=/checkout");
    }

    return <CheckoutForm />;
}
