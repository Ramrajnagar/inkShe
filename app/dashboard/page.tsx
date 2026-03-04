/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Heart, Eye, PenTool, Sparkles, Plus, MessageCircle, Lock, Globe, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SketchUnderline, SketchSparkle } from "@/components/ui/sketch-decorations";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DashboardPage() {
    const { data, error, isLoading } = useSWR('/api/user/dashboard', fetcher, {
        refreshInterval: 5000, // Poll every 5s for live dashboard
        fallbackData: {
            user: { penName: "Writer" },
            stats: { stories: 0, views: 0, viewsGrowth: 0, likes: 0, likesGrowth: 0, comments: 0 },
            recentStories: []
        }
    });

    useEffect(() => {
        if (error && error.status === 401) {
            window.location.href = "/login";
        }
    }, [error]);

    if (error && error.status === 401) {
        return null;
    }

    const { user, stats, recentStories } = data;

    return (
        <div className="space-y-8 min-h-screen pb-20 pt-12 md:pt-4">
            {/* Welcome Section */}
            <div className="relative">
                <div className="absolute -top-10 -left-10 opacity-30 pointer-events-none">
                    <SketchSparkle className="w-24 h-24 text-ink-pink" />
                </div>
                <h1 className="text-4xl font-heading font-bold text-ink-text relative inline-block">
                    Hello, {user?.penName}!
                    <span className="text-2xl ml-2">✨</span>
                    <SketchUnderline className="absolute -bottom-2 left-0 w-full text-ink-blush/40 h-4" />
                </h1>
                <p className="text-ink-text/60 mt-2 text-lg">Your live creative space.</p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
                <Link href="/write">
                    <Button variant="premium" size="lg" className="shadow-lg shadow-ink-pink/20 transition-transform hover:-translate-y-1">
                        <Plus className="mr-2 h-5 w-5" />
                        Write New Story
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="ghost" size="lg" className="bg-white/50 border-ink-pink/30 hover:bg-white text-ink-text/80">
                        <Globe className="mr-2 h-5 w-5 text-ink-blush" />
                        Visit Home
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button variant="outline" size="lg" className="bg-white/50 border-ink-pink/30 hover:bg-white text-ink-text/80">
                        Profile Settings
                    </Button>
                </Link>
            </div>

            {/* Live Stats Grid */}
            <div className="grid gap-6 md:grid-cols-5">
                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                        <div className="p-2 bg-ink-pink/10 rounded-full group-hover:bg-ink-pink/20 transition-colors">
                            <Eye className="h-4 w-4 text-ink-blush" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">
                            {isLoading ? "..." : stats.views.toLocaleString()}
                        </div>
                        <p className="text-xs text-ink-blush font-medium mt-1">+{stats.viewsGrowth} recent views</p>
                    </CardContent>
                </Card>

                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Followers</CardTitle>
                        <div className="p-2 bg-ink-purple/10 rounded-full group-hover:bg-ink-purple/20 transition-colors">
                            <Users className="h-4 w-4 text-ink-purple" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">
                            {isLoading ? "..." : (stats.followers || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-ink-purple font-medium mt-1">Growing community</p>
                    </CardContent>
                </Card>

                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Likes</CardTitle>
                        <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                            <Heart className="h-4 w-4 text-red-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">
                            {isLoading ? "..." : stats.likes.toLocaleString()}
                        </div>
                        <p className="text-xs text-red-500 font-medium mt-1">+{stats.likesGrowth} this month</p>
                    </CardContent>
                </Card>

                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Comments</CardTitle>
                        <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                            <MessageCircle className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">
                            {isLoading ? "..." : stats.comments.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Active safe space</p>
                    </CardContent>
                </Card>

                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">All Stories</CardTitle>
                        <div className="p-2 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                            <FileText className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">
                            {isLoading ? "..." : stats.stories}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Published & Private</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Stories Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7 border-ink-pink/20 bg-white/80 backdrop-blur-md shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PenTool className="h-5 w-5 text-ink-blush" />
                            Your Recent Stories
                            {isLoading && <span className="text-xs text-ink-text/50 animate-pulse ml-2 font-normal">Tracking live...</span>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentStories?.length > 0 ? (
                            <div className="space-y-4">
                                {recentStories.map((story: any) => (
                                    <div key={story.id} className="flex flex-col md:flex-row md:items-center justify-between border-b border-ink-pink/10 pb-4 last:border-0 hover:bg-ink-pink/5 p-3 rounded-lg transition-colors gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-lg text-ink-text line-clamp-1">{story.title}</p>
                                                {story.published ?
                                                    <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                                                        <Globe className="w-3 h-3 mr-1" /> Public
                                                    </div>
                                                    :
                                                    <div className="flex items-center text-xs text-ink-text/60 bg-white px-2 py-0.5 rounded-full border border-ink-pink/30">
                                                        <Lock className="w-3 h-3 mr-1" /> Private
                                                    </div>
                                                }
                                            </div>
                                            <p className="text-sm text-ink-text/60">
                                                {new Date(story.createdAt).toLocaleDateString()} at {new Date(story.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-ink-text/70 bg-white/50 px-4 py-2 rounded-full border border-ink-pink/10 self-start md:self-auto">
                                            <div className="flex items-center gap-1.5" title="Total Likes">
                                                <Heart className={`w-4 h-4 ${story.likes > 0 ? 'fill-ink-pink text-ink-pink' : ''}`} />
                                                <span className="font-medium text-ink-text">{story.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5" title="Total Comments">
                                                <MessageCircle className={`w-4 h-4 ${story.comments > 0 ? 'fill-blue-400 text-blue-400' : ''}`} />
                                                <span className="font-medium text-ink-text">{story.comments}</span>
                                            </div>
                                            <Link href={`/stories/${story.slug}`}>
                                                <Button variant="ghost" size="sm" className="h-7 text-ink-blush hover:text-ink-blush/80 hover:bg-ink-pink/20">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            !isLoading && (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center p-4 bg-ink-pink/10 rounded-full mb-4">
                                        <Sparkles className="h-8 w-8 text-ink-pink" />
                                    </div>
                                    <h3 className="text-lg font-medium text-ink-text mb-1">Your canvas is empty</h3>
                                    <p className="text-ink-text/60 mb-6">Write your first piece and watch the community interact with it.</p>
                                    <Link href="/write">
                                        <Button variant="premium" className="shadow-md hover:shadow-lg">
                                            Start Writing
                                        </Button>
                                    </Link>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
