/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ThumbsUp, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TOPICS = ["General", "Writing Tips", "Mental Health", "Tech & Coding", "Book Club", "Daily Life"];

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Helper to convert @mentions to links visually
function formatContentWithMentions(content: string) {
    const parts = content.split(/(@\w+)/g);
    return parts.map((part, index) => {
        if (part.startsWith('@') && part.length > 1) {
            const username = part.slice(1);
            return (
                <Link key={index} href={`/u/${username}`} className="text-ink-blush font-bold hover:underline">
                    {part}
                </Link>
            );
        }
        return <span key={index}>{part}</span>;
    });
}

export function LiveCommunity() {
    const { data: { posts = [] } = {}, mutate, isValidating } = useSWR('/api/community', fetcher, {
        refreshInterval: 3000,
        fallbackData: { posts: [] }
    });

    const [newPostContent, setNewPostContent] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("General");
    const [isPosting, setIsPosting] = useState(false);
    const router = useRouter();

    const handlePost = async () => {
        if (!newPostContent.trim()) return;

        setIsPosting(true);
        try {
            const res = await fetch("/api/community", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newPostContent, tag: selectedTopic }),
            });

            if (res.ok) {
                setNewPostContent("");
                mutate(); // Re-fetch immediately
            } else {
                const data = await res.json();
                if (res.status === 401) {
                    alert("Please sign in to post.");
                } else {
                    alert(data.error || "Failed to post");
                }
            }
        } catch (error) {
            console.error(error);
            alert("Error creating post");
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="space-y-12">
            {/* Create Post Section */}
            <Card className="border-ink-pink/30 bg-white/80 backdrop-blur-sm shadow-sm relative overflow-visible z-10">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-2 text-ink-text/60 mb-2">
                        <Sparkles className="w-5 h-5 text-ink-blush" />
                        <h3 className="font-bold text-lg">Start a Live Discussion</h3>
                    </div>

                    <Textarea
                        placeholder="What's on your mind? Mention someone safely with @username"
                        className="min-h-[120px] resize-none border-ink-pink/20 focus:border-ink-blush"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-2 w-full max-w-[70%]">
                            {TOPICS.map((topic) => (
                                <button
                                    key={topic}
                                    onClick={() => setSelectedTopic(topic)}
                                    className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border ${selectedTopic === topic ? 'bg-ink-pink/20 border-ink-pink/50 text-ink-blush font-bold' : 'border-ink-pink/20 hover:bg-ink-pink/10 text-ink-text/70'}`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                        <Button
                            variant="premium"
                            onClick={handlePost}
                            disabled={isPosting || !newPostContent.trim()}
                            className="w-full sm:w-auto mt-2 sm:mt-0"
                        >
                            {isPosting ? "Posting..." : "Post to Community"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Discussions Grid */}
            <div className="space-y-6 relative z-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-heading font-bold text-ink-text">Recent Discussions</h2>
                    {isValidating && <span className="text-xs text-ink-text/50 animate-pulse">Syncing live...</span>}
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12 text-ink-text/50">
                        No community posts yet. Be the first to start a conversation!
                    </div>
                ) : (
                    posts.map((discussion: any) => (
                        <Card
                            key={discussion.id}
                            className="hover:shadow-md transition-shadow cursor-pointer border-ink-pink/20 bg-white/60"
                            onClick={() => router.push(`/stories/${discussion.slug}`)} // Or router.push to a dedicated discussion page
                        >
                            <CardContent className="p-6 flex flex-col md:flex-row gap-4 justify-between">
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-bold text-ink-blush bg-ink-pink/10 px-2 py-1 rounded-md">
                                            {discussion.tag}
                                        </span>
                                        <span className="text-xs text-ink-text/50">
                                            Posted by <Link href={`/u/${discussion.author}`} onClick={(e) => e.stopPropagation()} className="hover:text-ink-blush hover:underline">{discussion.author}</Link>
                                        </span>
                                    </div>
                                    <p className="text-lg font-body text-ink-text/90 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                                        {formatContentWithMentions(discussion.content)}
                                    </p>
                                </div>

                                <div className="flex md:flex-col items-center gap-6 md:gap-3 text-ink-text/60 justify-end">
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="font-medium text-sm">{discussion.replies} Replies</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-5 h-5" />
                                        <span className="font-medium text-sm">{discussion.likes} Likes</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
