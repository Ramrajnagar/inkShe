import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Heart, Eye, PenTool, Sparkles, Plus } from "lucide-react";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SketchUnderline, SketchSparkle } from "@/components/ui/sketch-decorations";

async function getUserStats(userId: string) {
    const storiesCount = await db.post.count({
        where: { authorId: userId }
    });

    // In a real app, you would aggregate views/likes from a related table
    // For now, we'll mock the views/likes to keep the UI engaging
    return {
        stories: storiesCount,
        views: storiesCount * 124 + 42,
        likes: storiesCount * 12 + 5
    };
}

async function getRecentStories(userId: string) {
    return await db.post.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: 'desc' },
        take: 5
    });
}

export default async function DashboardPage() {
    const session = await getSession();

    if (!session || typeof session === 'string' || !session.userId) {
        redirect("/login");
    }

    let stats: { stories: number; views: number; likes: number; };
    let recentStories: any[] = [];

    try {
        stats = await getUserStats(session.userId);
        recentStories = await getRecentStories(session.userId);
    } catch (error) {
        console.error("Dashboard data fetch error:", error);
        // Fallback or safe error state
        stats = { stories: 0, views: 0, likes: 0 };
        recentStories = [];
    }


    return (
        <div className="space-y-8 min-h-screen pb-20">
            {/* Welcome Section */}
            <div className="relative">
                <div className="absolute -top-10 -left-10 opacity-30 pointer-events-none">
                    <SketchSparkle className="w-24 h-24 text-ink-pink" />
                </div>
                <h1 className="text-4xl font-heading font-bold text-ink-text relative inline-block">
                    Hello, Writer!
                    <span className="text-2xl ml-2">✨</span>
                    <SketchUnderline className="absolute -bottom-2 left-0 w-full text-ink-blush/40 h-4" />
                </h1>
                <p className="text-ink-text/60 mt-2 text-lg">Your creative space is ready.</p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
                <Link href="/write">
                    <Button variant="premium" size="lg" className="shadow-lg shadow-ink-pink/20">
                        <Plus className="mr-2 h-5 w-5" />
                        Write New Story
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button variant="outline" size="lg" className="bg-white/50 border-ink-pink/30 hover:bg-white">
                        Settings
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                        <div className="p-2 bg-ink-pink/10 rounded-full group-hover:bg-ink-pink/20 transition-colors">
                            <Eye className="h-4 w-4 text-ink-blush" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">{stats.views.toLocaleString()}</div>
                        <p className="text-xs text-ink-blush font-medium mt-1">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Likes</CardTitle>
                        <div className="p-2 bg-ink-purple/10 rounded-full group-hover:bg-ink-purple/20 transition-colors">
                            <Heart className="h-4 w-4 text-ink-purple" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">{stats.likes.toLocaleString()}</div>
                        <p className="text-xs text-ink-purple font-medium mt-1">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-ink-pink/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:shadow-ink-pink/10 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Published Stories</CardTitle>
                        <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                            <FileText className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-ink-text">{stats.stories}</div>
                        <p className="text-xs text-muted-foreground mt-1">Keep writing!</p>
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
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentStories.length > 0 ? (
                            <div className="space-y-4">
                                {recentStories.map((story) => (
                                    <div key={story.id} className="flex items-center justify-between border-b border-ink-pink/10 pb-4 last:border-0 hover:bg-ink-pink/5 p-2 rounded-lg transition-colors">
                                        <div>
                                            <p className="font-medium text-lg text-ink-text">{story.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(story.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Link href={`/stories/${story.slug}`}>
                                            <Button variant="ghost" size="sm" className="text-ink-blush hover:text-ink-blush/80 hover:bg-ink-pink/10">
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center p-4 bg-ink-neutral rounded-full mb-4">
                                    <FileText className="h-8 w-8 text-ink-pink" />
                                </div>
                                <h3 className="text-lg font-medium text-ink-text">No stories yet</h3>
                                <p className="text-muted-foreground mb-4">Start your journey by writing your first story.</p>
                                <Link href="/write">
                                    <Button variant="outline" className="border-ink-pink/40 hover:bg-ink-pink/10 text-ink-blush">
                                        Write a Story
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
