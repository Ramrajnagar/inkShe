import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Need to create Badge
import { MessageCircle, ThumbsUp } from "lucide-react";

const TOPICS = ["Writing Tips", "Mental Health", "Tech & Coding", "Book Club", "Daily Life"];

const DISCUSSIONS = [
    {
        title: "How do you deal with writer's block?",
        author: "Sarah J.",
        replies: 24,
        likes: 156,
        tag: "Writing Tips"
    },
    {
        title: "My experience applying for internships in tech",
        author: "Priya D.",
        replies: 45,
        likes: 203,
        tag: "Tech & Coding"
    },
    {
        title: "Poetry prompt of the week: 'Reflection'",
        author: "InkShe Admin",
        replies: 89,
        likes: 312,
        tag: "Book Club"
    }
];

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink-text">
                            Community
                        </h1>
                        <p className="text-lg text-ink-text/70 max-w-xl">
                            Connect, share, and grow with thousands of other creators.
                        </p>
                    </div>
                    <Button variant="premium">Start a Discussion</Button>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {TOPICS.map((topic) => (
                        <Button key={topic} variant="outline" className="rounded-full border-ink-pink/30 hover:bg-ink-pink/10 hover:text-ink-blush">
                            {topic}
                        </Button>
                    ))}
                </div>

                {/* Discussions Grid */}
                <div className="grid gap-6">
                    {DISCUSSIONS.map((discussion, i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer border-ink-pink/20 bg-white/60">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-ink-blush bg-ink-pink/10 px-2 py-1 rounded-md">
                                            {discussion.tag}
                                        </span>
                                        <span className="text-xs text-ink-text/50">Posted by {discussion.author}</span>
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-ink-text">
                                        {discussion.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-6 text-ink-text/60">
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="font-medium">{discussion.replies}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-5 h-5" />
                                        <span className="font-medium">{discussion.likes}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
