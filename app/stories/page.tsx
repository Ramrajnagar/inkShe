"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock data for stories
const stories = [
    {
        id: 1,
        title: "The day the stars fell",
        excerpt: "It started as a normal Tuesday evening, but then I looked up at the sky and saw something specific. The constellations weren't where they were supposed to be...",
        author: "DreamWriter",
        category: "Fantasy",
        readTime: "5 min",
        date: "2 hours ago",
        tags: ["Magic", "Stars"],
        color: "from-purple-500 to-indigo-500"
    },
    {
        id: 2,
        title: "My journey through coding bootcamp",
        excerpt: "I never thought I'd be a developer. I was an artist first. But code is just another canvas, isn't it? Here is how I survived my first 3 months...",
        author: "CodeQueen",
        category: "Tech",
        readTime: "8 min",
        date: "1 day ago",
        tags: ["Career", "Learning"],
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        title: "Whispers of the old oak",
        excerpt: "Grandma used to say the tree in our backyard could talk. I didn't believe her until I turned sixteen and heard my name in the rustling leaves...",
        author: "NatureGal",
        category: "Fiction",
        readTime: "6 min",
        date: "2 days ago",
        tags: ["Nature", "Mystery"],
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 4,
        title: "Why I stopped trying to be perfect",
        excerpt: "Perfectionism was my armor. If I was perfect, no one could hurt me. But armor is heavy, and I was tired of carrying the weight of the world...",
        author: "RealTalk",
        category: "Personal",
        readTime: "4 min",
        date: "3 days ago",
        tags: ["Mental Health", "Growth"],
        color: "from-rose-500 to-pink-500"
    },
    {
        id: 5,
        title: "Cyberpunk City 2099",
        excerpt: "Neon rain slicked the streets of Neo-Tokyo. Protocol 7 was in effect, and I was the only one with the key to the mainframe...",
        author: "SciFiFan",
        category: "Sci-Fi",
        readTime: "10 min",
        date: "4 days ago",
        tags: ["Future", "Action"],
        color: "from-violet-500 to-fuchsia-500"
    },
    {
        id: 6,
        title: "The art of baking bread",
        excerpt: "There is something incredibly grounding about kneading dough. Flour, water, yeast, salt. Simple ingredients that create something so complex...",
        author: "BakerStreet",
        category: "Lifestyle",
        readTime: "3 min",
        date: "5 days ago",
        tags: ["Food", "Hobbies"],
        color: "from-orange-500 to-amber-500"
    }
];

const categories = ["All", "Fiction", "Personal", "Tech", "Fantasy", "Sci-Fi", "Lifestyle"];

export default function StoriesPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStories = stories.filter(story => {
        const matchesCategory = activeCategory === "All" || story.category === activeCategory;
        const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.author.toLowerCase().includes(searchQuery.toLowerCase());
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

                {/* Search and Filter */}
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

                {/* Stories Grid */}
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
                                    {story.category}
                                </Badge>
                                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${story.color} opacity-80 flex items-center justify-center text-white text-xs font-bold`}>
                                    {story.author[0]}
                                </div>
                            </div>

                            <Link href={`#story-${story.id}`} className="block">
                                <h3 className="text-xl font-bold text-ink-text mb-3 group-hover:text-ink-blush transition-colors line-clamp-2">
                                    {story.title}
                                </h3>
                                <p className="text-ink-text/60 text-sm line-clamp-3 mb-6 leading-relaxed">
                                    {story.excerpt}
                                </p>
                            </Link>

                            <div className="flex items-center justify-between pt-4 border-t border-ink-text/5 text-xs text-ink-text/40 font-medium">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>{story.readTime}</span>
                                </div>
                                <span>{story.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredStories.length === 0 && (
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
