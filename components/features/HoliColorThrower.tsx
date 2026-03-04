"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Splash {
    id: number;
    x: number;
    y: number;
    color: string;
    scale: number;
    rotation: number;
}

export function HoliColorThrower() {
    const [splashes, setSplashes] = useState<Splash[]>([]);
    const [showHint, setShowHint] = useState(true);
    const colors = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"];

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Don't splash if clicking on buttons or links
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) return;

            if (showHint) setShowHint(false); // Hide hint after first click

            const newSplash: Splash = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                color: colors[Math.floor(Math.random() * colors.length)],
                scale: Math.random() * 0.5 + 0.5,
                rotation: Math.random() * 360,
            };

            setSplashes(prev => [...prev.slice(-15), newSplash]); // Keep last 15 splashes for performance

            // Auto-remove splashes after 3 seconds
            setTimeout(() => {
                setSplashes(prev => prev.filter(s => s.id !== newSplash.id));
            }, 3000);
        };

        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, [showHint]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {/* Hint UI */}
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            boxShadow: ["0 0 0px #F472B6", "0 0 20px #F472B6", "0 0 0px #F472B6"]
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            delay: 2,
                            duration: 0.8,
                            boxShadow: { duration: 2, repeat: Infinity }
                        }}
                        className="fixed bottom-24 right-8 bg-white/80 backdrop-blur-md border-2 border-pink-400 px-6 py-3 rounded-2xl pointer-events-auto cursor-default shadow-xl z-[200]"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl animate-bounce">🎨</span>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-pink-600 uppercase tracking-tight">Holi Celebration Mode</span>
                                <span className="text-xs text-ink-text/70 font-bold">Try clicking the background to throw colors!</span>
                            </div>
                            <button
                                onClick={() => setShowHint(false)}
                                className="ml-2 text-ink-text/30 hover:text-ink-text/60 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Splashes */}
            <AnimatePresence>
                {splashes.map((splash) => (
                    <motion.div
                        key={splash.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: splash.scale, opacity: 0.7 }}
                        exit={{ opacity: 0, scale: splash.scale * 1.5 }}
                        className="absolute pointer-events-none"
                        style={{
                            left: splash.x - 50,
                            top: splash.y - 50,
                            width: 100,
                            height: 100,
                            backgroundColor: splash.color,
                            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', // Splotchy shape
                            rotate: splash.rotation,
                            filter: 'blur(5px)',
                            WebkitFilter: 'blur(5px)',
                        }}
                    >
                        {/* Smaller satellites for "splatter" effect */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 120,
                                    y: (Math.random() - 0.5) * 120,
                                    scale: Math.random() * 0.5
                                }}
                                className="absolute rounded-full"
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: splash.color,
                                    left: 40,
                                    top: 40,
                                }}
                            />
                        ))}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
