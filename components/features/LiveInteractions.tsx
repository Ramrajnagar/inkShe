/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function LiveInteractions({ postId }: { postId: string }) {
    const { data: interactions, mutate } = useSWR(`/api/stories/${postId}/interactions`, fetcher, {
        refreshInterval: 3000,
        fallbackData: {
            likesCount: 0,
            commentsCount: 0,
            userHasLiked: false,
            comments: []
        }
    });

    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLike = async () => {
        // Optimistic update
        mutate(
            { ...interactions, likesCount: interactions.userHasLiked ? interactions.likesCount - 1 : interactions.likesCount + 1, userHasLiked: !interactions.userHasLiked },
            false
        );

        const res = await fetch(`/api/stories/${postId}/like`, { method: "POST" });
        if (res.ok) {
            mutate();
        }
    };

    const handleComment = async () => {
        if (!newComment.trim()) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch(`/api/stories/${postId}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment })
            });

            if (res.ok) {
                setNewComment("");
                mutate();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to post comment");
            }
        } catch (e) {
            setError("Network error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Interaction Bar */}
            <div className="mt-12 flex items-center justify-between bg-white/50 backdrop-blur-sm border border-ink-pink/20 rounded-full px-6 py-3 shadow-sm sticky bottom-8 z-50">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        onClick={handleLike}
                        className={`flex items-center gap-2 hover:bg-transparent p-0 ${interactions.userHasLiked ? 'text-ink-pink' : 'text-ink-text/60 hover:text-ink-blush'}`}
                    >
                        <Heart className="w-6 h-6" fill={interactions.userHasLiked ? "currentColor" : "none"} />
                        <span className="font-medium text-ink-text">{interactions.likesCount}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 hover:bg-transparent hover:text-ink-blush p-0 text-ink-text/60"
                        onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-medium text-ink-text">{interactions.commentsCount}</span>
                    </Button>
                </div>
                <Button variant="ghost" size="icon" className="text-ink-text/60">
                    <Share2 className="w-5 h-5" />
                </Button>
            </div>

            {/* Comments Section */}
            <section id="comments" className="mt-16 border-t border-ink-pink/20 pt-8">
                <div className="max-w-2xl mx-auto py-12">
                    <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-ink-blush" />
                        Community Thoughts ({interactions.comments?.length || 0})
                    </h3>

                    {/* Input Area */}
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-ink-pink/20 shadow-sm mb-10">
                        <textarea
                            className="w-full bg-transparent border-none resize-none focus:ring-0 placeholder:text-ink-text/40 text-ink-text min-h-[100px]"
                            placeholder="Write a kind comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-sm py-2 px-3 bg-red-50 rounded-lg mb-2"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center mt-4 border-t border-ink-pink/10 pt-4">
                            <p className="text-xs text-ink-text/40">
                                Be kind and respectful down here. 🛡️
                            </p>
                            <Button
                                onClick={handleComment}
                                disabled={isSubmitting || !newComment.trim()}
                                variant="premium"
                                size="sm"
                            >
                                {isSubmitting ? "Posting..." : "Post Comment"}
                            </Button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {interactions.comments?.map((comment: any) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4 group"
                            >
                                <Avatar className="w-10 h-10 border border-ink-pink/20">
                                    <AvatarImage src={comment.avatar} />
                                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2 bg-white/30 p-4 rounded-2xl rounded-tl-none hover:bg-white/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-sm text-ink-text">{comment.author}</h4>
                                            <p className="text-xs text-ink-text/50">{comment.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-ink-text/80 text-sm leading-relaxed whitespace-pre-line">
                                        {comment.content}
                                    </p>
                                    <div className="flex items-center gap-4 pt-2">
                                        <button className="flex items-center gap-1 text-xs text-ink-text/50 hover:text-ink-pink transition-colors">
                                            <Heart className="w-3 h-3" /> {comment.likes} Likes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
