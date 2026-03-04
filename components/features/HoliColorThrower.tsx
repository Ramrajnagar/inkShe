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
    const colors = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#10B981", "#3B82F6"];

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Don't splash if clicking on buttons or links
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('input')) return;

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
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
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
