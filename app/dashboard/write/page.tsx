"use client";

import { useState } from "react";
import Editor from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function WritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePublish = () => {
        alert("Publish feature coming soon (PostgreSQL required)!");
        console.log({ title, content });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-heading font-bold text-ink-text">New Story</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost">Save Draft</Button>
                    <Button variant="premium" onClick={handlePublish}>Publish</Button>
                </div>
            </div>

            <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0 space-y-6">
                    <Input
                        placeholder="Title of your story..."
                        className="text-4xl font-heading font-bold border-none px-0 bg-transparent placeholder:text-gray-300 focus-visible:ring-0 h-auto py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Editor onChange={setContent} />
                </CardContent>
            </Card>
        </div>
    );
}
