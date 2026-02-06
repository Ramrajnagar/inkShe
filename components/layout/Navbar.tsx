"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter, Heart, Menu, PenTool } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Stories", href: "/stories" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b-2 border-ink-pink/20 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-gradient-to-br from-ink-blush to-ink-purple p-2.5 rounded-xl text-white shadow-lg shadow-ink-pink/20 group-hover:scale-105 transition-transform">
                                <PenTool className="h-6 w-6 fill-current" />
                            </div>
                            <span className="text-3xl font-heading font-black tracking-tight text-ink-text group-hover:text-ink-blush transition-colors">
                                InkShe
                            </span>
                        </Link>
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
                    </div>

                    <div className="hidden md:flex items-center gap-4">
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
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-ink-pink/10">
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
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
