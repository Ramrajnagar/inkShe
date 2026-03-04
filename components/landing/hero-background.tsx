"use client";

import { motion } from "framer-motion";
import { Bell, Mail, MessageCircle, Heart, Flame, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const HeroBackground = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const fullIcons = [
        { Icon: MessageCircle, color: "text-blue-500", fill: "fill-blue-500", x: "10%", y: "20%", size: 48, delay: 0 },
        { Icon: Heart, color: "text-pink-400", fill: "fill-pink-400", x: "85%", y: "15%", size: 56, delay: 1 },
        { Icon: Bell, color: "text-yellow-400", fill: "fill-yellow-400", x: "20%", y: "60%", size: 64, delay: 2 },
        { Icon: Mail, color: "text-blue-600", fill: "fill-blue-600", x: "75%", y: "70%", size: 52, delay: 0.5 },
        { Icon: Flame, color: "text-orange-400", fill: "fill-orange-400", x: "50%", y: "85%", size: 48, delay: 1.5 },
        { Icon: Smile, color: "text-pink-500", fill: "fill-pink-300", x: "90%", y: "50%", size: 60, delay: 2.5 },
        { Icon: Heart, color: "text-ink-pink", fill: "fill-ink-pink", x: "5%", y: "80%", size: 32, delay: 3 },
        { Icon: MessageCircle, color: "text-purple-400", fill: "fill-purple-400", x: "60%", y: "10%", size: 40, delay: 0.8 },
        { Icon: Mail, color: "text-blue-300", fill: "fill-blue-300", x: "30%", y: "30%", size: 36, delay: 1.2 },
        { Icon: Flame, color: "text-orange-200", fill: "fill-orange-200", x: "15%", y: "40%", size: 40, delay: 2.2 },
    ];

    const icons = isMobile ? fullIcons.slice(0, 5) : fullIcons;
    const holiColors = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#10B981"];

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-[#FFF0F5] rounded-3xl group shadow-inner">
            {/* Holi Paint Splashes in Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                    <motion.div
                        key={`splash-${i}`}
                        className="absolute rounded-full blur-3xl transform-gpu"
                        style={{
                            width: Math.random() * 150 + 100,
                            height: Math.random() * 150 + 100,
                            background: holiColors[i % holiColors.length],
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Floating Icons */}
            {icons.map((item, i) => (
                <motion.div
                    key={i}
                    className={cn("absolute opacity-90 transform-gpu will-change-transform", item.color)}
                    style={{ left: item.x, top: item.y }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                    }}
                    whileHover={{
                        scale: 1.1,
                        x: (i % 2 === 0 ? 10 : -10),
                    }}
                >
                    <div className={cn("transition-transform duration-500 ease-out group-hover:scale-110 group-hover:translate-x-2")}>
                        <item.Icon size={isMobile ? item.size * 0.8 : item.size} className={cn(item.fill)} strokeWidth={1.5} />
                    </div>
                </motion.div>
            ))}

            {/* Central Text */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.span
                        className="font-heading font-bold text-7xl md:text-9xl text-ink-text relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        ink
                        {/* Subtle Paint Splatter on "ink" */}
                        <motion.div
                            className="absolute -right-4 -top-4 w-12 h-12 bg-orange-400/30 rounded-full blur-md"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </motion.span>

                    <motion.span
                        className="font-heading font-bold text-7xl md:text-9xl text-ink-blush"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        She
                    </motion.span>
                </motion.div>
            </div>

            {/* Interaction Layer */}
            <div className="absolute inset-0 z-20 cursor-default" />
        </div>
    );
};
