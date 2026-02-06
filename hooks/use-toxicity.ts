"use client";

import { useState } from "react";

// Mock toxicity list for demo purposes
const TOXIC_WORDS = ["hate", "stupid", "ugly", "idiot", "kill", "die"];

export function useToxicity() {
    const [isChecking, setIsChecking] = useState(false);

    const checkText = async (text: string): Promise<{ isToxic: boolean; reason?: string }> => {
        setIsChecking(true);

        // Simulate AI delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        setIsChecking(false);

        const lowerText = text.toLowerCase();
        const foundToxicWord = TOXIC_WORDS.find(word => lowerText.includes(word));

        if (foundToxicWord) {
            return {
                isToxic: true,
                reason: "This comment contains unkind words. Please keep InkShe safe and supportive. 🌸"
            };
        }

        return { isToxic: false };
    };

    return { checkText, isChecking };
}
