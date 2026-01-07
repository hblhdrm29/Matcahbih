import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif-custom",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Matchabih | Premium Japanese Matcha",
    template: "%s | Matchabih",
  },
  description:
    "Discover authentic ceremonial-grade matcha sourced directly from the legendary tea gardens of Uji, Japan. Experience the art of matcha with Matchabih.",
  keywords: [
    "matcha",
    "japanese matcha",
    "ceremonial matcha",
    "green tea",
    "premium matcha",
    "uji matcha",
    "organic matcha",
  ],
  authors: [{ name: "Matchabih" }],
  creator: "Matchabih",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://matchabih.com",
    siteName: "Matchabih",
    title: "Matchabih | Premium Japanese Matcha",
    description:
      "Discover authentic ceremonial-grade matcha sourced directly from the legendary tea gardens of Uji, Japan.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Matchabih - Premium Japanese Matcha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matchabih | Premium Japanese Matcha",
    description:
      "Discover authentic ceremonial-grade matcha sourced directly from the legendary tea gardens of Uji, Japan.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}

