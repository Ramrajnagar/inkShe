"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function FeedbackButton() {
    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <a href="mailto:ramrajnagar2005@gmail.com?subject=InkShe%20Feature%20Request/Feedback&body=Hi%20there,%0A%0AI%20would%20love%20to%20suggest%20a%20new%20feature/provide%20feedback%20for%20InkShe:%0A%0A">
                <Button variant="premium" className="rounded-full shadow-xl shadow-ink-pink/30 px-6 py-6 border-2 border-white/50 backdrop-blur-md hidden sm:flex items-center gap-2">
                    <MessageSquarePlus className="w-5 h-5" />
                    <span>Send Feedback</span>
                </Button>

                {/* Mobile version */}
                <Button variant="premium" size="icon" className="rounded-full shadow-xl shadow-ink-pink/30 w-14 h-14 border-2 border-white/50 backdrop-blur-md sm:hidden flex items-center justify-center">
                    <MessageSquarePlus className="w-6 h-6" />
                </Button>
            </a>
        </motion.div>
    );
}
