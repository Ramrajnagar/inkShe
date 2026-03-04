import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getSession();

        if (id.startsWith("mock-")) {
            return NextResponse.json({
                likesCount: 124,
                commentsCount: 2,
                userHasLiked: false,
                comments: [
                    {
                        id: "1",
                        author: "Riya K.",
                        avatar: "/placeholder-user-1.jpg",
                        content: "This moved me to tears.",
                        likes: 24,
                        date: "2 hours ago",
                        timestamp: Date.now()
                    }
                ]
            });
        }

        const post = await db.post.findUnique({
            where: { id },
            include: {
                likes: true,
                comments: {
                    include: { author: true },
                    orderBy: { createdAt: "desc" }
                }
            }
        });

        if (!post) {
            return NextResponse.json({ error: "Story not found" }, { status: 404 });
        }

        let userHasLiked = false;
        if (session && typeof session !== "string" && session.userId) {
            userHasLiked = post.likes.some(like => like.userId === session.userId);
        }

        const comments = post.comments.map(c => ({
            id: c.id,
            author: c.author.penName || c.author.fullName || "Anonymous",
            avatar: c.author.avatarUrl || "/placeholder-avatar.jpg",
            content: c.content,
            likes: 0,
            date: new Date(c.createdAt).toLocaleDateString() + " " + new Date(c.createdAt).toLocaleTimeString(),
            timestamp: c.createdAt.getTime()
        }));

        return NextResponse.json({
            likesCount: post.likes.length,
            commentsCount: post.comments.length,
            userHasLiked,
            comments
        });
    } catch (error) {
        console.error("Fetch interactions error:", error);
        return NextResponse.json({ error: "Failed to fetch interactions" }, { status: 500 });
    }
}
