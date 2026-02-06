"use client";

import { motion } from "framer-motion";

export const RunningText = () => {
    const words = [
        "Share your story ✨",
        "Safe space for girls 💖",
        "Write freely 📝",
        "Read without judgment 🌸",
        "Express yourself 🦋",
        "Your words matter 💫",
        "Creative freedom 🎨",
        "Supportive community 🤝",
    ];

    return (
        <div className="w-full bg-white/40 backdrop-blur-md border-y border-ink-pink/10 overflow-hidden py-3 absolute top-0 z-20">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-12 px-6"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...words, ...words, ...words, ...words].map((word, i) => (
                        <span
                            key={i}
                            className="text-ink-blush/80 font-medium tracking-wide text-sm md:text-base uppercase flex items-center gap-2"
                        >
                            {word}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
