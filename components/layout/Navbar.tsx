"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter, Heart, Menu, PenTool, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const navItems = [
    { name: "Stories", href: "/stories" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { data: sessionData } = useSWR('/api/auth/session', fetcher);
    const session = sessionData?.session;
    const user = sessionData?.user;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b-2 border-ink-pink/20 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3 group relative">
                            {/* Holi Splash Effect behind logo */}
                            <motion.div
                                className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />

                            <div className="relative bg-gradient-to-br from-ink-blush via-ink-purple to-pink-600 p-2.5 rounded-2xl text-white shadow-[0_8px_30px_rgb(236,72,153,0.3)] group-hover:shadow-[0_8px_30px_rgb(236,72,153,0.5)] group-hover:-rotate-6 transition-all duration-500">
                                <PenTool className="h-6 w-6 fill-current" />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-3xl font-heading font-black tracking-tight text-ink-text group-hover:text-ink-blush transition-colors drop-shadow-sm">
                                    InkShe
                                </span>
                                <motion.span
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 uppercase tracking-[0.2em] -mt-1"
                                >
                                    Creative Safe Space
                                </motion.span>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full border border-green-200">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">
                                    {Math.floor(Math.random() * 50) + 120} Live
                                </span>
                            </div>

                            {/* Holi Celebration Badge */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [-1, 1, -1]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 rounded-full border border-pink-200 cursor-default"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                                <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 uppercase tracking-tighter">
                                    Happy Holi ✨
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-base font-bold transition-all hover:text-ink-blush px-4 py-2 rounded-full hover:bg-ink-pink/10",
                                    pathname === item.href ? "text-ink-blush bg-ink-pink/5" : "text-ink-text/70"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {session && (
                            <Link
                                href="/dashboard"
                                className={cn(
                                    "text-base font-bold transition-all hover:text-ink-blush px-4 py-2 rounded-full hover:bg-ink-pink/10",
                                    pathname === "/dashboard" ? "text-ink-blush bg-ink-pink/5" : "text-ink-text/70"
                                )}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {session ? (
                            <>
                                <Link href={`/u/${user?.penName || 'writer'}`}>
                                    <Button variant="ghost" className="font-semibold text-ink-text flex items-center gap-2 px-3">
                                        <div className="w-8 h-8 rounded-full bg-ink-pink/20 flex items-center justify-center text-ink-blush text-xs font-bold">
                                            {user?.penName?.[0] || 'W'}
                                        </div>
                                        <span>My Profile</span>
                                    </Button>
                                </Link>
                                <Link href="/write">
                                    <Button variant="premium" className="shadow-md font-bold px-6">
                                        Write Story
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="lg" className="font-semibold text-ink-text hover:text-ink-blush hover:bg-ink-pink/10">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="premium" size="lg" className="shadow-md shadow-ink-pink/20 font-bold px-6">
                                        Start Writing
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-ink-text hover:bg-ink-pink/10 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-ink-pink/20 bg-white shadow-xl"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-lg font-bold text-ink-text/80 hover:text-ink-blush p-2 hover:bg-ink-pink/5 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {session && (
                                <Link
                                    href="/dashboard"
                                    className="text-lg font-bold text-ink-text/80 hover:text-ink-blush p-2 hover:bg-ink-pink/5 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-ink-pink/10">
                                {session ? (
                                    <>
                                        <Link href={`/u/${user?.penName || 'writer'}`} onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="ghost" className="justify-start w-full text-lg font-semibold px-2">
                                                My Profile
                                            </Button>
                                        </Link>
                                        <Link href="/write" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="premium" className="justify-start w-full text-lg font-bold shadow-md">
                                                Write Story
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="ghost" className="justify-start w-full text-lg font-semibold">
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="premium" className="justify-start w-full text-lg font-bold shadow-md">
                                                Start Writing
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
