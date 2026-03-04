import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { followingId } = body;
        const session = await getSession();

        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const followerId = session.userId;

        if (followerId === followingId) {
            return NextResponse.json({ error: "You cannot follow yourself" }, { status: 400 });
        }

        // Check if already following
        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (existingFollow) {
            // Unfollow
            await db.follow.delete({
                where: {
                    id: existingFollow.id,
                },
            });
            return NextResponse.json({ following: false });
        } else {
            // Follow
            await db.follow.create({
                data: {
                    followerId,
                    followingId,
                },
            });
            return NextResponse.json({ following: true });
        }

    } catch (error) {
        console.error("Follow error:", error);
        return NextResponse.json({ error: "Failed to process follow request" }, { status: 500 });
    }
}
