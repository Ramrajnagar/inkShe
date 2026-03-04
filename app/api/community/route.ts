import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const communityPostSchema = z.object({
    content: z.string().min(1, "Post content is required"),
    tag: z.string().optional().default("General"),
});

export async function POST(req: Request) {
    try {
        const session = await getSession();

        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const result = communityPostSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { content, tag } = result.data;

        // Generate a simple slug for community post
        const slug = "community-" + Date.now().toString() + "-" + Math.random().toString(36).substring(7);

        // We use the first 50 chars as the title
        const title = content.length > 50 ? content.substring(0, 47) + "..." : content;

        const post = await db.post.create({
            data: {
                title,
                content,
                slug,
                category: "Community",
                excerpt: tag, // Reusing excerpt to store community tag.
                authorId: session.userId,
                published: true, // Always publish community posts
            },
            include: {
                author: true,
                _count: {
                    select: { comments: true, likes: true }
                }
            }
        });

        return NextResponse.json({ post });

    } catch (error) {
        console.error("Create community post error:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const posts = await db.post.findMany({
            where: {
                published: true,
                category: "Community",
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 50,
            include: {
                author: {
                    select: {
                        penName: true,
                        fullName: true,
                    }
                },
                _count: {
                    select: { comments: true, likes: true }
                }
            }
        });

        // Format for frontend
        const formattedPosts = posts.map(p => ({
            id: p.id,
            slug: p.slug,
            content: p.content,
            author: p.author.penName || p.author.fullName || "Anonymous",
            replies: p._count.comments,
            likes: p._count.likes,
            tag: p.excerpt || "General",
            createdAt: p.createdAt
        }));

        return NextResponse.json({ posts: formattedPosts });
    } catch (error) {
        console.error("Fetch community posts error:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}
