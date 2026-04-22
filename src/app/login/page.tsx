"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, ArrowRight, Loader2, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthContent() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callback = searchParams.get("callback") || "/dashboard";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            router.push(callback);
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen page-bg flex">
            {/* Left panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
                {/* Decorative circles */}
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5" />
                <div className="absolute top-1/2 right-0 w-40 h-40 rounded-full bg-white/5" />

                <Link href="/" className="flex items-center gap-2.5 relative z-10">
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white fill-current" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Tri mind</span>
                </Link>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                        Domain-aware AI,<br />built around your documents.
                    </h2>
                    <p className="text-primary-foreground/70 text-base leading-relaxed mb-8">
                        Build specialized assistants trained on your financial data or legal documents — with strict isolation and verifiable answers.
                    </p>
                    <div className="space-y-3">
                        {[
                            "Answers grounded in your documents",
                            "Strict data isolation per assistant",
                            "Complete reasoning transparency",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <ArrowRight className="w-3 h-3 text-white" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-primary-foreground/40 text-sm relative z-10">
                    © 2026 Tri mind Intelligent Systems
                </p>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white fill-current" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Tri mind</span>
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight mb-1.5">
                            {isLogin ? "Welcome back" : "Create your account"}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {isLogin
                                ? "Enter your credentials to access your assistants"
                                : "Get started with your domain assistant today"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="John Smith"
                                        className="pl-9"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@company.com"
                                    className="pl-9"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-9 pr-10"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-sm text-destructive bg-destructive/8 px-3 py-2.5 rounded-lg border border-destructive/20"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-10 font-medium"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <Separator className="my-4" />
                        <p className="text-center text-sm text-muted-foreground">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                    setFormData({ email: "", password: "", name: "" });
                                }}
                                className="text-primary font-medium hover:underline underline-offset-4"
                            >
                                {isLogin ? "Sign up for free" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
        }>
            <AuthContent />
        </Suspense>
    );
}
