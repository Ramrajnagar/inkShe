"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = ["All", "Fiction", "Personal", "Tech", "Fantasy", "Sci-Fi", "Lifestyle"];

export default function StoriesPage() {
    const [stories, setStories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchStories() {
            try {
                const res = await fetch("/api/stories?limit=100");
                if (res.ok) {
                    const data = await res.json();
                    setStories(data.stories);
                }
            } catch (error) {
                console.error("Failed to load stories", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStories();
    }, []);

    const filteredStories = stories.filter(story => {
        const storyCategory = story.category || "General";
        const matchesCategory = activeCategory === "All" || storyCategory === activeCategory;
        const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (story.author?.penName || "Anonymous").toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-soft-gradient">
            <Navbar />

            <section className="container mx-auto px-4 pt-24 pb-12">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Badge className="mb-4 bg-ink-pink/20 text-ink-blush hover:bg-ink-pink/30 border-none px-4 py-1.5 text-sm">
                        Community Stories
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink-text mb-6">
                        Discover stories that <span className="text-ink-blush">matter</span>.
                    </h1>
                    <p className="text-lg text-ink-text/60 max-w-2xl mx-auto">
                        Explore a world of creativity, vulnerability, and imagination shared by girls from around the globe.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-12 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-text/40 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search by title, author, or keyword..."
                            className="pl-12 h-12 bg-white/60 border-ink-text/10 focus:border-ink-blush/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? "bg-ink-blush text-white shadow-md shadow-ink-blush/20"
                                    : "bg-white/40 text-ink-text/70 hover:bg-white/80"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-ink-pink border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredStories.map((story, i) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/60 hover:border-ink-pink/30 hover:shadow-lg hover:shadow-ink-pink/5 transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="outline" className="bg-white/50 border-ink-text/10 text-xs font-normal">
                                        {story.category || "General"}
                                    </Badge>
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-80 flex items-center justify-center text-white text-xs font-bold`}>
                                        {(story.author?.penName || "A")[0]}
                                    </div>
                                </div>

                                <Link href={`/stories/${story.slug}`} className="block">
                                    <h3 className="text-xl font-bold text-ink-text mb-3 group-hover:text-ink-blush transition-colors line-clamp-2">
                                        {story.title}
                                    </h3>
                                    <p className="text-ink-text/60 text-sm line-clamp-3 mb-6 leading-relaxed">
                                        {story.content?.substring(0, 150)}...
                                    </p>
                                </Link>

                                <div className="flex items-center justify-between pt-4 border-t border-ink-text/5 text-xs text-ink-text/40 font-medium">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-3.5 h-3.5" />
                                        <span>5 min</span>
                                    </div>
                                    <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!isLoading && filteredStories.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-ink-text/50 text-lg">No stories found matching your criteria.</p>
                        <Button
                            variant="link"
                            className="text-ink-blush"
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
