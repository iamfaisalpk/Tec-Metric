'use client';

import { useState, useEffect, useRef } from "react";
import { Loader2, X, Facebook, Youtube } from "lucide-react";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
    identifier: string;
    password: string;
}

export default function LoginForm() {
    const [activeTab, setActiveTab] = useState<"admin" | "self">("admin");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const logoRef = useRef<HTMLDivElement>(null);
    const illustrationRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    // Animation on mount
    useEffect(() => {
        const animate = (el: HTMLElement | null, delay: number) => {
            if (!el) return;
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            setTimeout(() => {
                el.style.transition = "all 0.7s ease-out";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, delay);
        };

        animate(logoRef.current, 100);
        animate(illustrationRef.current, 500);
        animate(formRef.current, 700);
    }, []);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setLoading(true);

        setTimeout(() => {
            // console.log("Login Attempt →", { ...data, type: activeTab });

            if (activeTab === "admin") {
                //Hardcoded test login for admin
                if (data.identifier === "admin" && data.password === "123456") {
                    router.push("/dashboard");
                } else {
                    alert("Invalid admin credentials");
                }
            } else {
                // Hardcoded test login for self-service
                if (data.identifier === "emp001" && data.password === "123456") {
                    router.push("/employee/dashboard");
                } else {
                    alert("Invalid employee credentials");
                }
            }

            setLoading(false);
        }, 1000);
    };

    const labelText = activeTab === "admin" ? "Username" : "Employee ID";

    return (
        <>
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 font-sans">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* LEFT PANEL - ILLUSTRATION */}
                    <div className="bg-linear-to-br from-primary to-accent p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-48 translate-x-48" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-10 rounded-full translate-y-40 -translate-x-40" />

                        {/* Logo */}
                        <div ref={logoRef} className="relative z-10">
                            <Link href="/" className="block">
                                <div className="w-48 h-auto">
                                    <Image
                                        src="/Tecon.png"
                                        alt="TecMetrics"
                                        width={300}
                                        height={80}
                                        className="w-full h-auto object-contain"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Illustration */}
                        <div ref={illustrationRef} className="flex justify-center items-center flex-1 py-8">
                            <div className="w-full max-w-md">
                                <Image
                                    src="/BioTime.png"
                                    alt="TecMetrics Illustration"
                                    width={500}
                                    height={400}
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL - FORM */}
                    <div className="p-6 lg:p-12 flex flex-col justify-center bg-white">
                        <div ref={formRef} className="max-w-md mx-auto w-full">

                            {/* Header */}
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-primary">HELLO!</h1>
                                <p className="text-gray-600 text-sm">SIGN IN TO YOUR ACCOUNT</p>
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center justify-center gap-6 mb-6 border-b border-gray-200 pb-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("admin")}
                                    className={`text-lg font-semibold transition-all relative pb-2 cursor-pointer ${activeTab === "admin" ? "text-primary" : "text-gray-400"
                                        }`}
                                >
                                    Admin Login
                                    {activeTab === "admin" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                    )}
                                </button>
                                <span className="text-gray-300">|</span>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("self")}
                                    className={`text-lg font-semibold transition-all relative pb-2 cursor-pointer ${activeTab === "self" ? "text-primary" : "text-gray-400"
                                        }`}
                                >
                                    Self-Service
                                    {activeTab === "self" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                    )}
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                {/* Identifier */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder={labelText}
                                        autoComplete="off"
                                        {...register("identifier", {
                                            required: `${labelText}`,
                                        })}
                                        className={`w-full px-4 py-3 border ${errors.identifier ? "border-red-500" : "border-gray-300"
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                    />
                                    {errors.identifier && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.identifier.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        {...register("password", {
                                            required: "Password",
                                            minLength: {
                                                value: 6,
                                                message: "Minimum 6 characters required",
                                            },
                                        })}
                                        className={`w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot */}
                                <div className="flex items-center justify-between text-sm">
                                    <Link
                                        href="/forgot-password"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-accent cursor-pointer text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin w-5 h-5" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </form>

                            {/* Social Icons */}
                            <div className="flex justify-center gap-4 mt-6">
                                {[X, Facebook, Youtube, Linkedin].map((Icon, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
                                    >
                                        <Icon className="w-5 h-5 text-gray-600" />
                                    </button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="text-center mt-8 text-xs text-gray-500">
                                <p className="font-bold text-primary">TecMetrics</p>
                                <p>Copyright ©2025 TecMetrics. All rights reserved.</p>
                                <div className="flex flex-wrap justify-center gap-3 mt-2 text-primary">
                                    <Link href="/legal/dpa" className="hover:underline">
                                        Data Processing Agreement
                                    </Link>
                                    <span>•</span>
                                    <Link href="/legal/pip" className="hover:underline">
                                        Personal Information Protection
                                    </Link>
                                    <span>•</span>
                                    <Link href="/legal/privacy" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden pt-20" />
        </>
    );
}