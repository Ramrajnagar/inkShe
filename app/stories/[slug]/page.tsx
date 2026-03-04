import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Calendar } from "lucide-react";
import { LiveInteractions } from "@/components/features/LiveInteractions";
import { FollowButton } from "@/components/features/FollowButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

// Mock data for display purposes
const MOCK_POST = {
    title: "Finding My Voice in a Noisy World",
    content: `
    <p>Growing up, I was always the quiet one. The girl who sat in the back of the class, observing rather than participating. But silence isn't empty; it's full of answers.</p>
    <p>I started writing when I was twelve. Small poems at first, hidden in the back of my math notebook. They were my secret garden, a place where I could be loud without making a sound.</p>
    <h2>The Turning Point</h2>
    <p>It wasn't until I shared my first story online that I realized my words had weight. A stranger commented, "This is exactly how I feel." That connection—that digital thread tying my heart to another's—changed everything.</p>
    <blockquote>"Your voice is your most powerful tool. Don't be afraid to use it."</blockquote>
    <p>Now, I write to empower. I write the stories I wish I had read when I was younger. Stories about girls who code, girls who lead, and girls who are still figuring it out.</p>
    <p>If you're reading this, know that your story matters too. Don't let the noise of the world drown out the whisper of your soul.</p>
  `,
    author: {
        name: "Aanya Sharma",
        handle: "@aanya_writes",
        bio: "Dreamer. Writer. Coder. Sharing my journey one word at a time.",
        image: "/placeholder-avatar.jpg",
        penName: "Aanya Sharma"
    },
    publishedAt: "Oct 12, 2025",
    stats: {
        likes: 124,
        comments: 45
    },
    tags: ["Personal Growth", "Writing", "Inspiration"]
};

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await getSession();

    let post = null;
    let actualId = slug;

    try {
        if (!slug.startsWith('mock-')) {
            const dbPost = await db.post.update({
                where: { slug: slug },
                data: { views: { increment: 1 } },
                include: {
                    author: {
                        include: {
                            followers: true
                        }
                    }
                }
            });

            if (dbPost) {
                actualId = dbPost.id;
                const isFollowing = (session && typeof session !== "string") ? dbPost.author.followers.some(f => f.followerId === session.userId) : false;

                post = {
                    id: dbPost.id,
                    title: dbPost.title,
                    content: dbPost.content,
                    views: dbPost.views,
                    author: {
                        id: dbPost.authorId,
                        name: dbPost.author.fullName || dbPost.author.penName || "Anonymous",
                        handle: "@" + (dbPost.author.penName || "writer"),
                        bio: dbPost.author.bio || "Just another dreamer.",
                        image: dbPost.author.avatarUrl || "/placeholder-avatar.jpg",
                        penName: dbPost.author.penName,
                        isFollowing
                    },
                    publishedAt: new Date(dbPost.createdAt).toLocaleDateString(),
                    stats: { likes: 0, comments: 0 },
                    tags: [dbPost.category || "General"]
                };
            }
        }
    } catch (e) {
        console.error("Error fetching post:", e);
    }

    // Fallback to mock if not found in DB (or if it's a mock slug)
    if (!post) {
        if (slug.startsWith('mock-')) {
            post = { ...MOCK_POST, id: slug, views: 1024, author: { ...MOCK_POST.author, id: "mock-author", isFollowing: false } };
            if (slug.includes('2')) post.title = "My Journey into Tech";
        } else {
            post = { ...MOCK_POST, id: slug, views: 1024, author: { ...MOCK_POST.author, id: "mock-author", isFollowing: false } };
        }
    }

    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            <article className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
                {/* Header */}
                <header className="mb-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-ink-text/60">
                            <span className="bg-ink-pink/20 text-ink-blush px-3 py-1 rounded-full font-medium">
                                {post.tags[0]}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {post.publishedAt}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-ink-text/40 text-xs font-medium bg-white/50 px-3 py-1 rounded-full border border-ink-pink/10">
                            <Heart className="w-3 h-3 fill-ink-pink text-ink-pink animate-pulse" />
                            <span>{Math.floor(Math.random() * 10) + 2} Live Now</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink-text leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-ink-pink/20 py-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border border-ink-pink/30">
                                <AvatarImage src={post.author.image} />
                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col text-left">
                                <div className="flex items-center gap-2">
                                    <Link href={`/u/${post.author.handle.replace('@', '')}`} className="font-bold text-ink-text hover:text-ink-blush transition-colors cursor-pointer">
                                        {post.author.name}
                                    </Link>
                                    {session && typeof session !== "string" && session.userId !== post.author.id && (
                                        <FollowButton
                                            followingId={post.author.id}
                                            initialIsFollowing={post.author.isFollowing}
                                        />
                                    )}
                                </div>
                                <p className="text-xs text-ink-text/60 text-left">{post.author.handle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end px-4 border-r border-ink-pink/10">
                                <span className="text-2xl font-bold text-ink-text">{(post.views || 0).toLocaleString()}</span>
                                <span className="text-[10px] text-ink-text/40 uppercase tracking-widest font-bold">Total Views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="hover:bg-ink-pink/10 hover:text-ink-blush">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="hover:bg-ink-pink/10 hover:text-ink-blush">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div
                    className="prose prose-lg prose-pink max-w-none font-body text-ink-text/90 leading-loose text-left"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Live Interactions (Likes & Comments) */}
                <LiveInteractions postId={actualId} />
            </article>

            <Footer />
        </main>
    );
}
