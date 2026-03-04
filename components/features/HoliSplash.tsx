"use client";

import { motion } from "framer-motion";

export function HoliSplash() {
    const colors = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#10B981"];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: Math.random() * 300 + 100,
                        height: Math.random() * 300 + 100,
                        background: colors[i % colors.length],
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Paint Drips */}
            <div className="absolute top-0 left-0 w-full flex justify-around">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`drip-${i}`}
                        className="w-4 rounded-b-full"
                        style={{
                            height: Math.random() * 100 + 50,
                            background: `linear-gradient(to bottom, ${colors[i % colors.length]}, transparent)`,
                        }}
                        animate={{
                            height: [50, 150, 50],
                        }}
                        transition={{
                            duration: Math.random() * 4 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
