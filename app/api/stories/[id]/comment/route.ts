import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getSession();

        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { content } = body;

        if (!content || typeof content !== "string" || content.trim().length === 0) {
            return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
        }

        if (id.startsWith("mock-")) {
            return NextResponse.json({
                id: Date.now().toString(),
                author: session.penName || "You",
                avatar: "/placeholder-avatar.jpg",
                content: content.trim(),
                likes: 0,
                date: "Just now"
            });
        }

        const comment = await db.comment.create({
            data: {
                content: content.trim(),
                postId: id,
                authorId: session.userId,
            },
            include: { author: true }
        });

        return NextResponse.json({
            id: comment.id,
            author: comment.author.penName || comment.author.fullName || "Anonymous",
            avatar: comment.author.avatarUrl || "/placeholder-avatar.jpg",
            content: comment.content,
            likes: 0,
            date: new Date(comment.createdAt).toLocaleDateString() + " " + new Date(comment.createdAt).toLocaleTimeString()
        });
    } catch (error) {
        console.error("Comment error:", error);
        return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
    }
}
