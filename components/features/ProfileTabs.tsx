"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Sparkles, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function ProfileTabs({ user }: { user: any }) {
    const [activeTab, setActiveTab] = useState("Written");

    const tabs = ["Written", "Liked", "About"];

    const renderWritten = () => (
        <div className="grid gap-6">
            {user.posts.length > 0 ? user.posts.map((post: any, i: number) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Link href={`/stories/${post.slug}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/60 border-ink-text/5 overflow-hidden active:scale-[0.98]">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="text-xs text-ink-text/50 font-medium flex items-center gap-2">
                                            {post.date} &bull; {post.readTime}
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-ink-text group-hover:text-ink-blush transition-colors">{post.title}</h3>
                                        <div className="text-ink-text/70 line-clamp-2 prose prose-sm prose-pink" dangerouslySetInnerHTML={{ __html: post.excerpt }} />

                                        <div className="pt-4 flex items-center gap-4 text-ink-text/60 text-sm">
                                            <div className="flex items-center gap-1 group/like">
                                                <Heart className="w-4 h-4 text-ink-pink fill-ink-pink/10 group-hover/like:fill-ink-pink transition-all" /> {post.likes}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" /> {post.comments}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>
            )) : (
                <div className="text-center py-20 bg-white/20 rounded-3xl border border-dashed border-ink-pink/30">
                    <Sparkles className="w-12 h-12 text-ink-pink/30 mx-auto mb-4" />
                    <p className="text-ink-text/50 font-medium">This writer hasn't published any stories yet.</p>
                </div>
            )}
        </div>
    );

    const renderLiked = () => (
        <div className="grid gap-6">
            {user.likedPosts && user.likedPosts.length > 0 ? user.likedPosts.map((post: any, i: number) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Link href={`/stories/${post.slug}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/60 border-ink-text/5">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4 text-left">
                                    <div className="space-y-2">
                                        <div className="text-xs text-ink-text/50 font-medium flex items-center gap-2">
                                            by {post.authorName} &bull; {post.date}
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-ink-text">{post.title}</h3>
                                        <p className="text-ink-text/70 line-clamp-2 text-sm">{post.excerpt}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>
            )) : (
                <div className="text-center py-20 bg-white/20 rounded-3xl border border-dashed border-ink-pink/30">
                    <Heart className="w-12 h-12 text-ink-pink/30 mx-auto mb-4" />
                    <p className="text-ink-text/50 font-medium">No liked stories yet. Go explore the community! ✨</p>
                </div>
            )}
        </div>
    );

    const renderAbout = () => (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-heading font-bold text-ink-text">Bio</h3>
                    <p className="text-ink-text/80 leading-relaxed text-lg italic">
                        "{user.bio}"
                    </p>
                    <div className="flex flex-col gap-3 pt-4">
                        <div className="flex items-center gap-3 text-ink-text/60">
                            <MapPin className="w-5 h-5 text-ink-blush" />
                            <span>{user.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-ink-text/60 text-left">
                            <Calendar className="w-5 h-5 text-ink-blush" />
                            <span className="text-left">Inspired member since {user.joined}</span>
                        </div>
                        <div className="flex items-center gap-3 text-ink-text/60">
                            <LinkIcon className="w-5 h-5 text-ink-blush" />
                            <a href={`https://${user.website}`} target="_blank" className="hover:text-ink-blush underline">{user.website}</a>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl border border-white shadow-xl h-fit">
                    <h3 className="text-xl font-heading font-bold text-ink-text mb-6">Stats Snapshot</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-ink-text/60 font-bold uppercase text-xs tracking-widest">Stories Written</span>
                            <span className="text-3xl font-black text-ink-blush">{user.stats.posts}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-ink-text/60 font-bold uppercase text-xs tracking-widest">Hearts Received</span>
                            <span className="text-3xl font-black text-ink-blush">{user.posts.reduce((acc: number, p: any) => acc + p.likes, 0)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-ink-text/60 font-bold uppercase text-xs tracking-widest">Connections</span>
                            <span className="text-3xl font-black text-ink-blush">{user.stats.followers + user.stats.following}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="py-12">
            <div className="flex items-center gap-8 border-b border-ink-pink/20 mb-12">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`transition-all pb-6 px-4 font-bold text-lg relative ${activeTab === tab ? "text-ink-blush" : "text-ink-text/40 hover:text-ink-text/70"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="profile-tab-active"
                                className="absolute bottom-0 left-0 w-full h-1 bg-ink-blush rounded-t-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-[400px]"
                >
                    {activeTab === "Written" && renderWritten()}
                    {activeTab === "Liked" && renderLiked()}
                    {activeTab === "About" && renderAbout()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
