"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MessageButton({ receiverId, receiverName }: { receiverId: string, receiverName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        setIsSending(true);
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ receiverId, content: message })
            });

            if (res.ok) {
                setSent(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setSent(false);
                    setMessage("");
                }, 2000);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="relative">
            <Button variant="outline" className="gap-2" onClick={() => setIsOpen(true)}>
                <MessageSquare className="w-4 h-4" /> Message
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-8 right-8 w-80 bg-white shadow-2xl rounded-2xl border border-ink-pink/20 z-[110] flex flex-col overflow-hidden"
                    >
                        <div className="bg-ink-pink/10 p-4 border-b border-ink-pink/10 flex items-center justify-between">
                            <h3 className="font-bold text-ink-text leading-tight">Message {receiverName}</h3>
                            <button onClick={() => setIsOpen(false)} className="text-ink-text/40 hover:text-ink-text/60">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 flex-1">
                            {sent ? (
                                <div className="text-center py-10">
                                    <div className="text-4xl mb-2">✨</div>
                                    <p className="text-ink-blush font-bold">Message Sent!</p>
                                </div>
                            ) : (
                                <>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full h-32 p-3 bg-ink-neutral/50 rounded-xl border-none focus:ring-2 focus:ring-ink-pink/20 resize-none text-sm text-ink-text placeholder:text-ink-text/30"
                                    />
                                    <Button
                                        variant="premium"
                                        className="w-full mt-4"
                                        disabled={isSending || !message.trim()}
                                        onClick={handleSendMessage}
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        {isSending ? "Sending..." : "Send Message"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
