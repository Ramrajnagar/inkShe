"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Please fill in both title and content.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/stories/${data.story.slug}`);
                router.refresh();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to publish story");
            }
        } catch (error) {
            console.error("Publish error:", error);
            alert("An unexpected error occurred while publishing. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen">
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-ink-pink/20 rounded-full mb-4">
                        <Sparkles className="h-6 w-6 text-ink-blush" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-ink-text">Write Your Story</h1>
                    <p className="text-muted-foreground">Share your thoughts with the world.</p>
                </div>

                <Card className="border-ink-pink/30 bg-white/80 backdrop-blur-sm shadow-sm">
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-base font-semibold">Title</Label>
                            <Input
                                id="title"
                                placeholder="The day everything changed..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-lg font-medium border-ink-pink/20 focus:border-ink-blush focus:ring-ink-blush/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-base font-semibold">Your Story</Label>
                            <Textarea
                                id="content"
                                placeholder="Once upon a time..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="min-h-[400px] text-lg leading-relaxed border-ink-pink/20 focus:border-ink-blush focus:ring-ink-blush/20 resize-none p-4"
                            />
                        </div>

                        <Button
                            className="w-full text-lg py-6 font-bold shadow-md hover:shadow-lg transition-all"
                            variant="premium"
                            onClick={handlePublish}
                            disabled={isLoading}
                        >
                            {isLoading ? "Publishing..." : "Publish Story"}
                            {!isLoading && <Sparkles className="ml-2 w-5 h-5" />}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

