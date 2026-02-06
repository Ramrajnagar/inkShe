"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

export default function WritePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-ink-pink/20 rounded-full mb-4">
                        <Sparkles className="h-6 w-6 text-ink-blush" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-ink-text">Write Your Story</h1>
                    <p className="text-muted-foreground">Share your thoughts with the world.</p>
                </div>

                <Card className="border-ink-pink/30">
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="The day everything changed..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Your Story</Label>
                            <Textarea
                                id="content"
                                placeholder="Once upon a time..."
                                className="min-h-[300px]"
                            />
                        </div>

                        <Button className="w-full" variant="premium">
                            Publish Story
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
