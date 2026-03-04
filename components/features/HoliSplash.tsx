"use client";

import { motion } from "framer-motion";

export function HoliSplash() {
    const colors = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#10B981"];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.15]">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-[80px] will-change-transform"
                    style={{
                        width: Math.random() * 250 + 150,
                        height: Math.random() * 250 + 150,
                        background: colors[i % colors.length],
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 60 - 30, 0],
                        y: [0, Math.random() * 60 - 30, 0],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Paint Drips - Simplified and fewer */}
            <div className="absolute top-0 left-0 w-full flex justify-around opacity-40">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`drip-${i}`}
                        className="w-3 rounded-b-full will-change-[height]"
                        style={{
                            height: Math.random() * 60 + 40,
                            background: `linear-gradient(to bottom, ${colors[i % colors.length]}, transparent)`,
                        }}
                        animate={{
                            height: [40, 100, 40],
                        }}
                        transition={{
                            duration: Math.random() * 6 + 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
