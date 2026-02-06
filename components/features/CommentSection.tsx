"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToxicity } from "@/hooks/use-toxicity";
import { Sparkles, AlertCircle, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Comment = {
    id: string;
    author: string;
    avatar: string;
    content: string;
    likes: number;
    date: string;
};

const MOCK_COMMENTS: Comment[] = [
    {
        id: "1",
        author: "Riya K.",
        avatar: "/placeholder-user-1.jpg",
        content: "This moved me to tears. I felt the exact same way when I started coding.",
        likes: 24,
        date: "2 hours ago"
    },
    {
        id: "2",
        author: "Meera",
        avatar: "/placeholder-user-2.jpg",
        content: "Please keep writing! You have a beautiful gift.",
        likes: 12,
        date: "5 hours ago"
    }
];

export function CommentSection() {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { checkText, isChecking } = useToxicity();

    const handleSubmit = async () => {
        if (!newComment.trim()) return;
        setError(null);

        const { isToxic, reason } = await checkText(newComment);

        if (isToxic) {
            setError(reason || "Comment blocked via safety filter.");
            return;
        }

        const comment: Comment = {
            id: Date.now().toString(),
            author: "You",
            avatar: "/placeholder-avatar.jpg",
            content: newComment,
            likes: 0,
            date: "Just now"
        };

        setComments([comment, ...comments]);
        setNewComment("");
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ink-blush" />
                Community Thoughts ({comments.length})
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
                        Comments are moderated for safety. 🛡️
                    </p>
                    <Button
                        onClick={handleSubmit}
                        disabled={isChecking || !newComment.trim()}
                        variant="premium"
                        size="sm"
                    >
                        {isChecking ? "Checking..." : "Post Comment"}
                    </Button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment, i) => (
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
                            <p className="text-ink-text/80 text-sm leading-relaxed">
                                {comment.content}
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                                <button className="flex items-center gap-1 text-xs text-ink-text/50 hover:text-ink-pink transition-colors">
                                    <Heart className="w-3 h-3" /> {comment.likes} Likes
                                </button>
                                <button className="text-xs text-ink-text/50 hover:text-ink-pink transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
