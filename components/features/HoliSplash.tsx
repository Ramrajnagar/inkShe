"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLORS = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#10B981"];

export function HoliSplash() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const splashCount = isMobile ? 4 : 8;
    const dripCount = isMobile ? 3 : 5;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.15]">
            {[...Array(splashCount)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full will-change-transform transform-gpu"
                    style={{
                        width: Math.random() * (isMobile ? 150 : 250) + 100,
                        height: Math.random() * (isMobile ? 150 : 250) + 100,
                        background: COLORS[i % COLORS.length],
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        filter: `blur(${isMobile ? '40px' : '80px'})`,
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

            {/* Paint Drips - Optimized */}
            <div className="absolute top-0 left-0 w-full flex justify-around opacity-40">
                {[...Array(dripCount)].map((_, i) => (
                    <motion.div
                        key={`drip-${i}`}
                        className="w-3 rounded-b-full will-change-transform transform-gpu"
                        style={{
                            height: Math.random() * 60 + 40,
                            background: `linear-gradient(to bottom, ${COLORS[i % COLORS.length]}, transparent)`,
                        }}
                        animate={{
                            scaleY: [1, 2, 1],
                            y: [0, 20, 0],
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
