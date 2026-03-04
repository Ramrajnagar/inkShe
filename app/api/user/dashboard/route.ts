import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await getSession();

        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { id: session.userId },
            select: { penName: true }
        });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        // Fetch all user posts with their relations
        const stories = await db.post.findMany({
            where: { authorId: session.userId },
            include: {
                _count: { select: { comments: true, likes: true } },
                likes: { where: { createdAt: { gte: startOfMonth } } }, // Likes this month
            },
            orderBy: { createdAt: 'desc' },
        });

        let totalLikes = 0;
        let recentLikes = 0;
        let totalComments = 0;
        const recentStories = stories.slice(0, 5); // Take top 5 recent

        for (const story of stories) {
            totalLikes += story._count.likes;
            totalComments += story._count.comments;
            recentLikes += story.likes.length;
        }

        // Calculate a mock "views" metric based on engagement since real views aren't tracked yet
        const viewsCount = stories.length * 150 + totalLikes * 10 + totalComments * 25;
        const recentViewsCount = Math.floor(viewsCount * 0.15); // Say 15% are recent

        return NextResponse.json({
            user: { penName: user?.penName || "Writer" },
            stats: {
                stories: stories.length,
                views: viewsCount,
                viewsGrowth: recentViewsCount,
                likes: totalLikes,
                likesGrowth: recentLikes,
                comments: totalComments
            },
            recentStories: recentStories.map(s => ({
                id: s.id,
                title: s.title,
                slug: s.slug,
                createdAt: s.createdAt,
                likes: s._count.likes,
                comments: s._count.comments,
                published: s.published
            }))
        });

    } catch (error) {
        console.error("Dashboard API error:", error);
        return NextResponse.json(
            { error: "Failed to load dashboard data" },
            { status: 500 }
        );
    }
}
