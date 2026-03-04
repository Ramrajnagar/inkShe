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

const COLORS = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"];

export function HoliColorThrower() {
    const [splashes, setSplashes] = useState<Splash[]>([]);
    const [showHint, setShowHint] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) return;

            if (showHint) setShowHint(false);

            const newSplash: Splash = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                scale: Math.random() * 0.4 + 0.4,
                rotation: Math.random() * 360,
            };

            // Keep fewer splashes on mobile for performance
            const limit = isMobile ? 8 : 15;
            setSplashes(prev => [...prev.slice(-(limit - 1)), newSplash]);

            setTimeout(() => {
                setSplashes(prev => prev.filter(s => s.id !== newSplash.id));
            }, 2500); // Slightly shorter duration
        };

        window.addEventListener('mousedown', handleClick);
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousedown', handleClick);
        };
    }, [showHint, isMobile]);

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
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-24 right-4 md:right-8 bg-white/90 backdrop-blur-md border border-pink-200 px-4 md:px-6 py-2.5 md:py-3 rounded-2xl pointer-events-auto cursor-default shadow-xl z-[200] max-w-[90vw]"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl md:text-2xl animate-bounce">🎨</span>
                            <div className="flex flex-col">
                                <span className="text-xs md:text-sm font-black text-pink-600 uppercase tracking-tight">Holi Mode</span>
                                <span className="text-[10px] md:text-xs text-ink-text/70 font-bold">Tap background to throw colors!</span>
                            </div>
                            <button
                                onClick={() => setShowHint(false)}
                                className="ml-1 md:ml-2 text-ink-text/30 hover:text-ink-text/60"
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
                        animate={{ scale: splash.scale, opacity: 0.6 }}
                        exit={{ opacity: 0, scale: splash.scale * 1.5 }}
                        className="absolute pointer-events-none transform-gpu will-change-transform"
                        style={{
                            left: splash.x - 50,
                            top: splash.y - 50,
                            width: 100,
                            height: 100,
                            backgroundColor: splash.color,
                            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                            rotate: splash.rotation,
                            filter: 'blur(4px)',
                            WebkitFilter: 'blur(4px)',
                        }}
                    >
                        {/* Satellites - Reduced count for mobile */}
                        {[...Array(isMobile ? 2 : 4)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 100,
                                    y: (Math.random() - 0.5) * 100,
                                    scale: Math.random() * 0.4
                                }}
                                className="absolute rounded-full"
                                style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: splash.color,
                                    left: 42,
                                    top: 42,
                                }}
                            />
                        ))}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
