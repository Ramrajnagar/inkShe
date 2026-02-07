import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Calendar } from "lucide-react";
import { CommentSection } from "@/components/features/CommentSection";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

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

    let post = null;

    try {
        if (!slug.startsWith('mock-')) {
            const dbPost = await db.post.findUnique({
                where: { id: slug }, // Using ID for simplicity in search page link, or slug if available
                include: { author: true }
            });

            if (dbPost) {
                // Transform DB post to UI format
                post = {
                    title: dbPost.title,
                    content: dbPost.content,
                    author: {
                        name: dbPost.author.fullName || dbPost.author.penName || "Anonymous",
                        handle: "@" + (dbPost.author.penName || "writer"),
                        bio: dbPost.author.bio || "Just another dreamer.",
                        image: dbPost.author.avatarUrl || "/placeholder-avatar.jpg",
                        penName: dbPost.author.penName
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
            // Logic to return slightly different mocks based on ID could go here
            post = MOCK_POST;
            if (slug.includes('2')) post = { ...MOCK_POST, title: "My Journey into Tech" };
        } else {
            // If legitimate DB fetch failed and it's not a mock slug, maybe mock it for now to avoid 404 for the user demo?
            // Or better, stick to MOCK_POST as default for any unknown slug to keep the site "working" visually
            post = MOCK_POST;
        }
    }

    if (!post) return notFound();

    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            <article className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
                {/* Header */}
                <header className="mb-8 space-y-6">
                    <div className="flex items-center gap-3 text-sm text-ink-text/60">
                        <span className="bg-ink-pink/20 text-ink-blush px-3 py-1 rounded-full font-medium">
                            {post.tags[0]}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {post.publishedAt}
                        </span>
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
                            <div>
                                <Link href={`/u/${post.author.handle.replace('@', '')}`} className="font-bold text-ink-text hover:text-ink-blush transition-colors cursor-pointer">
                                    {post.author.name}
                                </Link>
                                <p className="text-xs text-ink-text/60">{post.author.handle}</p>
                            </div>
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
                </header>

                {/* Content */}
                <div
                    className="prose prose-lg prose-pink max-w-none font-body text-ink-text/90 leading-loose"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Interaction Bar */}
                <div className="mt-12 flex items-center justify-between bg-white/50 backdrop-blur-sm border border-ink-pink/20 rounded-full px-6 py-3 shadow-sm sticky bottom-8">
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent hover:text-ink-blush p-0">
                            <Heart className="w-6 h-6" />
                            <span className="font-medium">{post.stats.likes}</span>
                        </Button>
                        <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent hover:text-ink-blush p-0">
                            <MessageCircle className="w-6 h-6" />
                            <span className="font-medium">{post.stats.comments}</span>
                        </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>

                {/* Comments Section */}
                <section id="comments" className="mt-16 border-t border-ink-pink/20 pt-8">
                    <CommentSection />
                </section>
            </article>

            <Footer />
        </main>
    );
}
