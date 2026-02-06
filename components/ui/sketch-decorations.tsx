"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SketchProps {
    className?: string;
    color?: string;
    delay?: number;
}

export const SketchUnderline = ({ className, color = "currentColor", delay = 0 }: SketchProps) => {
    return (
        <motion.svg
            className={cn("w-full h-auto overflow-visible", className)}
            viewBox="0 0 200 20"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
        >
            <path
                d="M5 12C30 15 70 18 190 10C120 20 60 15 20 18"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
            />
        </motion.svg>
    );
};

export const SketchSparkle = ({ className, color = "currentColor", delay = 0 }: SketchProps) => {
    return (
        <motion.svg
            className={cn("w-8 h-8", className)}
            viewBox="0 0 24 24"
            fill="none"
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay, type: "spring" }}
        >
            <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill={color}
                opacity="0.8"
            />
        </motion.svg>
    );
};

export const SketchCircle = ({ className, color = "currentColor", delay = 0 }: SketchProps) => {
    return (
        <motion.svg
            className={cn("absolute inset-0 w-full h-full -z-10", className)}
            viewBox="0 0 100 100"
            fill="none"
            preserveAspectRatio="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay, ease: "easeInOut" }}
        >
            <path
                d="M10 50C10 20 30 10 50 10C80 10 90 30 90 50C90 80 70 95 50 90C30 85 15 70 10 50Z"
                stroke={color}
                strokeWidth="2"
                strokeDasharray="5 5"
            />
        </motion.svg>
    );
};

export const SketchArrow = ({ className, color = "currentColor", delay = 0 }: SketchProps) => {
    return (
        <motion.svg
            className={cn("w-12 h-12", className)}
            viewBox="0 0 50 50"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
        >
            <path
                d="M10 40C20 30 30 20 40 10M40 10L25 10M40 10L40 25"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </motion.svg>
    );
};
