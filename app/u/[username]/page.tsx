import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { FollowButton } from "@/components/features/FollowButton";
import { MessageButton } from "@/components/features/MessageButton";
import { ProfileTabs } from "@/components/features/ProfileTabs";

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
            likes: {
                include: {
                    post: {
                        include: { author: true }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 10
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
        })),
        likedPosts: dbUser.likes.map((l: any) => ({
            id: l.post.id,
            title: l.post.title,
            excerpt: l.post.excerpt || (l.post.content.substring(0, 100) + "..."),
            authorName: l.post.author.fullName || l.post.author.penName || "Writer",
            slug: l.post.slug,
            date: new Date(l.post.createdAt).toLocaleDateString(),
        }))
    };

    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            {/* Profile Header */}
            <div className="bg-gradient-to-b from-ink-pink/20 to-transparent pb-12 pt-12 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <Avatar className="w-40 h-40 border-[6px] border-white shadow-2xl rounded-[40px]">
                            <AvatarImage src={dbUser.avatarUrl || "/placeholder-avatar.jpg"} className="object-cover" />
                            <AvatarFallback className="text-5xl bg-ink-pink text-ink-text">{user.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div className="space-y-1">
                                <h1 className="text-4xl md:text-5xl font-heading font-black text-ink-text tracking-tight">{user.name}</h1>
                                <p className="text-ink-blush font-extrabold text-lg flex items-center justify-center md:justify-start gap-2">
                                    {user.handle}
                                    <Sparkles className="w-4 h-4" />
                                </p>
                            </div>

                            <p className="text-xl max-w-2xl text-ink-text/80 leading-relaxed font-body">
                                {user.bio}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-ink-text/50 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-ink-blush" /> {user.location}</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-ink-blush" /> Joined {user.joined}</span>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-10 pt-4">
                                <div className="text-center md:text-left group cursor-pointer">
                                    <span className="font-black text-ink-text block text-2xl group-hover:text-ink-blush transition-colors">{user.stats.followers}</span>
                                    <span className="text-[10px] text-ink-text/40 uppercase tracking-widest font-black">Followers</span>
                                </div>
                                <div className="text-center md:text-left group cursor-pointer">
                                    <span className="font-black text-ink-text block text-2xl group-hover:text-ink-blush transition-colors">{user.stats.following}</span>
                                    <span className="text-[10px] text-ink-text/40 uppercase tracking-widest font-black">Following</span>
                                </div>
                                <div className="text-center md:text-left group cursor-pointer">
                                    <span className="font-black text-ink-text block text-2xl group-hover:text-ink-blush transition-colors">{user.stats.posts}</span>
                                    <span className="text-[10px] text-ink-text/40 uppercase tracking-widest font-black">Posts</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            {isOwnProfile ? (
                                <Link href="/settings">
                                    <Button variant="outline" className="h-12 px-8 rounded-2xl border-2 font-bold hover:bg-ink-pink/10 hover:text-ink-blush transition-all">
                                        Edit Profile
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <FollowButton followingId={user.id} initialIsFollowing={isFollowing} />
                                    <MessageButton receiverId={user.id} receiverName={user.name} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content Tabs */}
            <div className="container mx-auto px-4 md:px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <ProfileTabs user={user} />
                </div>
            </div>

            <Footer />
        </main>
    );
}
