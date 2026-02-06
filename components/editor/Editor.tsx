"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import { Toggle } from "@/components/ui/toggle"; // Unused
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 border-b border-ink-pink/20 p-2 bg-ink-neutral/50 sticky top-0 z-10">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(editor.isActive("bold") ? "bg-ink-pink/20 text-ink-blush" : "")}
            >
                <Bold className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(editor.isActive("italic") ? "bg-ink-pink/20 text-ink-blush" : "")}
            >
                <Italic className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn(editor.isActive("heading", { level: 1 }) ? "bg-ink-pink/20 text-ink-blush" : "")}
            >
                <Heading1 className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn(editor.isActive("heading", { level: 2 }) ? "bg-ink-pink/20 text-ink-blush" : "")}
            >
                <Heading2 className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(editor.isActive("bulletList") ? "bg-ink-pink/20 text-ink-blush" : "")}
            >
                <List className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(editor.isActive("orderedList") ? "bg-ink-pink/20 text-ink-blush" : "")}
            >
                <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn(editor.isActive("blockquote") ? "bg-ink-pink/20 text-ink-blush" : "")}
            >
                <Quote className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default function Editor({ content, onChange }: { content?: string, onChange?: (html: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "<p>Start writing your beautiful story...</p>",
        editorProps: {
            attributes: {
                class: "prose prose-pink max-w-none focus:outline-none p-4 min-h-[300px]",
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    return (
        <div className="border border-ink-pink/20 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
