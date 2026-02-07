import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const storySchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    content: z.string().min(1, "Content is required"),
});

export async function POST(req: Request) {
    try {
        const session = await getSession();

        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const result = storySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { title, content } = result.data;

        // Generate a simple slug
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") + "-" + Date.now().toString().slice(-4);

        const story = await db.post.create({
            data: {
                title,
                content,
                slug,
                authorId: session.userId,
                published: true, // Auto-publish for now
            },
        });

        return NextResponse.json({ story });

    } catch (error) {
        console.error("Create story error:", error);
        return NextResponse.json(
            { error: "Failed to create story" },
            { status: 500 }
        );
    }
    export async function GET(req: Request) {
        try {
            const { searchParams } = new URL(req.url);
            const limit = parseInt(searchParams.get("limit") || "10");
            const featured = searchParams.get("featured") === "true";

            const stories = await db.post.findMany({
                where: {
                    published: true,
                    // Add featured logic if we had a featured flag, for now just latest
                },
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: {
                        select: {
                            penName: true,
                        }
                    }
                }
            });

            return NextResponse.json({ stories });
        } catch (error) {
            console.error("Fetch stories error:", error);
            return NextResponse.json(
                { error: "Failed to fetch stories" },
                { status: 500 }
            );
        }
    }
