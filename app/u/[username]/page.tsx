import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Link as LinkIcon, Calendar, Heart, Eye, MessageCircle, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { FollowButton } from "@/components/features/FollowButton";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const session = await getSession();

    const dbUser = await (db.user as any).findUnique({
        where: { penName: username },
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: { select: { likes: true, comments: true } }
                }
            },
            _count: {
                select: { followers: true, following: true, posts: true } as any
            },
            followers: true
        }
    });

    if (!dbUser) {
        return notFound();
    }

    const isOwnProfile = session && typeof session !== "string" && (session as any).userId === dbUser.id;
    const isFollowing = (session && typeof session !== "string") ? (dbUser as any).followers?.some((f: any) => f.followerId === (session as any).userId) : false;

    const user = {
        id: dbUser.id,
        name: dbUser.fullName || dbUser.penName || "Writer",
        handle: "@" + (dbUser.penName || "writer"),
        bio: dbUser.bio || "This writer preferred to keep their bio a mystery. ✨",
        location: "Planet Earth",
        joined: new Date(dbUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        website: "inkshe.com",
        stats: {
            followers: dbUser._count.followers,
            following: dbUser._count.following,
            posts: dbUser._count.posts
        },
        posts: dbUser.posts.map((p: any) => ({
            id: p.id,
            title: p.title,
            excerpt: p.content.substring(0, 150) + "...",
            date: new Date(p.createdAt).toLocaleDateString(),
            likes: p._count.likes,
            comments: p._count.comments,
            readTime: Math.ceil(p.content.split(' ').length / 200) + " min read",
            slug: p.slug
        }))
    };

    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            {/* Profile Header */}
            <div className="bg-gradient-to-b from-ink-pink/20 to-transparent pb-12 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                            <AvatarImage src={dbUser.avatarUrl || "/placeholder-avatar.jpg"} />
                            <AvatarFallback className="text-4xl bg-ink-pink text-ink-text">{user.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h1 className="text-3xl font-heading font-bold text-ink-text">{user.name}</h1>
                                <p className="text-ink-text/60 font-medium">{user.handle}</p>
                            </div>

                            <p className="text-lg max-w-xl text-ink-text/80 leading-relaxed">
                                {user.bio}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-ink-text/60">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user.location}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {user.joined}</span>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                                <div className="text-center md:text-left">
                                    <span className="font-bold text-ink-text block text-lg">{user.stats.followers}</span>
                                    <span className="text-xs text-ink-text/60 uppercase tracking-wider">Followers</span>
                                </div>
                                <div className="text-center md:text-left">
                                    <span className="font-bold text-ink-text block text-lg">{user.stats.following}</span>
                                    <span className="text-xs text-ink-text/60 uppercase tracking-wider">Following</span>
                                </div>
                                <div className="text-center md:text-left">
                                    <span className="font-bold text-ink-text block text-lg">{user.stats.posts}</span>
                                    <span className="text-xs text-ink-text/60 uppercase tracking-wider">Posts</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {isOwnProfile ? (
                                <Link href="/settings">
                                    <Button variant="outline">Edit Profile</Button>
                                </Link>
                            ) : (
                                <>
                                    <FollowButton followingId={user.id} initialIsFollowing={isFollowing} />
                                    <Button variant="outline">Message</Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* User Content */}
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center gap-8 border-b border-ink-pink/20 pb-4">
                        <button className="text-ink-blush font-bold border-b-2 border-ink-blush pb-4 px-2">Written</button>
                        <button className="text-ink-text/60 hover:text-ink-blush font-medium px-2 pb-4">Liked</button>
                        <button className="text-ink-text/60 hover:text-ink-blush font-medium px-2 pb-4">About</button>
                    </div>

                    <div className="grid gap-6">
                        {user.posts.length > 0 ? user.posts.map((post: any, i: number) => (
                            <Link href={`/stories/${post.slug}`} key={i}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white/60 border-ink-text/5">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-2">
                                                <div className="text-xs text-ink-text/50 font-medium flex items-center gap-2">
                                                    {post.date} &bull; {post.readTime}
                                                </div>
                                                <h3 className="text-xl font-heading font-bold text-ink-text">{post.title}</h3>
                                                <div className="text-ink-text/70 line-clamp-2 prose prose-sm prose-pink" dangerouslySetInnerHTML={{ __html: post.excerpt }} />

                                                <div className="pt-4 flex items-center gap-4 text-ink-text/60 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="w-4 h-4" /> {post.likes}
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
                        )) : (
                            <div className="text-center py-20 bg-white/20 rounded-3xl border border-dashed border-ink-pink/30">
                                <Sparkles className="w-12 h-12 text-ink-pink/30 mx-auto mb-4" />
                                <p className="text-ink-text/50 font-medium">This writer hasn't published any stories yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
