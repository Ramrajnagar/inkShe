"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeedbackButton() {
    const handleFeedback = () => {
        window.location.href = "mailto:ramrajnagar2005@gmail.com?subject=InkShe Feedback & Suggestions";
    };

    return (
        <Button
            onClick={handleFeedback}
            variant="premium"
            size="sm"
            className="fixed bottom-6 right-6 z-[60] shadow-2xl shadow-ink-pink/40 rounded-full h-12 w-auto px-6 gap-2 border-2 border-white/50 backdrop-blur-md hover:scale-105 transition-all"
        >
            <MessageSquarePlus className="w-5 h-5" />
            <span className="hidden md:inline">Give Feedback</span>
        </Button>
    );
}
