"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check } from "lucide-react";

const bgImages = [
    "/images/hd-signin-bg.png",
    "/images/hd-matcha-powder.png",
    "/images/hd-tea-room.png",
];

export default function SignUpPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentBg, setCurrentBg] = useState(0);

    // Auto-slide background
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        setError("");
    };

    const passwordStrength = () => {
        const { password } = formData;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Password tidak cocok");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password minimal 8 karakter");
            return;
        }

        if (!formData.agreeTerms) {
            setError("Anda harus menyetujui syarat dan ketentuan");
            return;
        }

        setIsLoading(true);

        // Simulate registration
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For demo, redirect to signin
        setIsLoading(false);
        router.push("/auth/signin?registered=true");
    };

    const strength = passwordStrength();

    return (
        <main className="min-h-screen relative flex items-center justify-center py-12 px-4 overflow-hidden">
            {/* Background Image Slider */}
            {bgImages.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBg ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={img}
                        alt="Background"
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-primary/30" />

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {bgImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentBg(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentBg
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                            }`}
                    />
                ))}
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <span className="text-3xl font-serif font-bold text-white drop-shadow-lg">
                            Matchabih
                        </span>
                    </Link>
                    <h1 className="text-2xl font-serif font-medium text-white mt-6 drop-shadow-lg">
                        Buat Akun Baru
                    </h1>
                    <p className="text-white/80 mt-2">
                        Daftar untuk mulai berbelanja produk matcha premium
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Nama Anda"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Minimal 8 karakter"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {/* Password Strength */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors ${level <= strength
                                                    ? strength <= 1
                                                        ? "bg-red-500"
                                                        : strength <= 2
                                                            ? "bg-yellow-500"
                                                            : strength <= 3
                                                                ? "bg-green-400"
                                                                : "bg-green-600"
                                                    : "bg-muted"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {strength <= 1 && "Lemah"}
                                        {strength === 2 && "Sedang"}
                                        {strength === 3 && "Kuat"}
                                        {strength === 4 && "Sangat Kuat"}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Ulangi password"
                                />
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                                )}
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-muted-foreground">
                                Saya setuju dengan{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Syarat & Ketentuan
                                </Link>{" "}
                                dan{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Kebijakan Privasi
                                </Link>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Membuat akun...
                                </>
                            ) : (
                                "Daftar"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-card text-muted-foreground">
                                atau
                            </span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-3 bg-background border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Daftar dengan Google
                    </button>
                </div>

                {/* Sign In Link */}
                <p className="text-center mt-6 text-white/90">
                    Sudah punya akun?{" "}
                    <Link
                        href="/auth/signin"
                        className="text-white font-medium hover:underline"
                    >
                        Masuk
                    </Link>
                </p>
            </div>
        </main>
    );
}
