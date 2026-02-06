import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Link as LinkIcon, Calendar, Heart, Eye } from "lucide-react";

// Mock Data
const MOCK_USER = {
    name: "Aanya Sharma",
    handle: "@aanya_writes",
    bio: "Software Engineer by day, poet by night. Exploring the intersection of technology and emotion. 🌸 ✨",
    location: "Bangalore, India",
    joined: "September 2025",
    website: "aanya.dev",
    stats: {
        followers: 1205,
        following: 85,
        posts: 12
    },
    posts: [
        {
            title: "Finding My Voice in a Noisy World",
            excerpt: "Growing up, I was always the quiet one. But silence isn't empty; it's full of answers...",
            date: "Oct 12, 2025",
            likes: 124,
            readTime: "4 min read",
            slug: "finding-my-voice"
        },
        {
            title: "The Art of Slow Living",
            excerpt: "In a world that rushes, I am learning to walk. To breathe. To just be...",
            date: "Sep 28, 2025",
            likes: 89,
            readTime: "3 min read",
            slug: "art-of-slow-living"
        },
        {
            title: "React Server Components: A Guide for Beginners",
            excerpt: "Let's break down the magic behind RSCs in a way that actually makes sense.",
            date: "Sep 15, 2025",
            likes: 256,
            readTime: "8 min read",
            slug: "react-server-components"
        }
    ]
};

export default function ProfilePage({ params }: { params: { username: string } }) {
    const user = MOCK_USER;

    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            {/* Profile Header */}
            <div className="bg-gradient-to-b from-ink-pink/20 to-transparent pb-12 pt-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="text-4xl bg-ink-pink text-ink-text">AS</AvatarFallback>
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
                                <span className="flex items-center gap-1"><LinkIcon className="w-4 h-4" /> {user.website}</span>
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
                            <Button variant="premium">Follow</Button>
                            <Button variant="outline">Message</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Content */}
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center gap-8 border-b border-ink-pink/20 pb-4">
                        <button className="text-ink-blush font-bold border-b-2 border-ink-blush pb-4 -mb-4.5 px-2">Written</button>
                        <button className="text-ink-text/60 hover:text-ink-blush font-medium px-2 pb-4 -mb-4">Liked</button>
                        <button className="text-ink-text/60 hover:text-ink-blush font-medium px-2 pb-4 -mb-4">About</button>
                    </div>

                    <div className="grid gap-6">
                        {user.posts.map((post, i) => (
                            <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer bg-white/60 border-ink-text/5">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="text-xs text-ink-text/50 font-medium flex items-center gap-2">
                                                {post.date} &bull; {post.readTime}
                                            </div>
                                            <h3 className="text-xl font-heading font-bold text-ink-text">{post.title}</h3>
                                            <p className="text-ink-text/70 line-clamp-2">{post.excerpt}</p>

                                            <div className="pt-4 flex items-center gap-4 text-ink-text/60 text-sm">
                                                <div className="flex items-center gap-1 hover:text-ink-pink transition-colors">
                                                    <Heart className="w-4 h-4" /> {post.likes}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Thumbnail would go here */}
                                        {/* <div className="w-24 h-24 bg-ink-pink/20 rounded-xl flex-shrink-0" /> */}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
