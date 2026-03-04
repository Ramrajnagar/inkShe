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

        if (id.startsWith("mock-")) {
            return NextResponse.json({ liked: true });
        }

        const existingLike = await db.like.findUnique({
            where: {
                postId_userId: {
                    postId: id,
                    userId: session.userId,
                },
            },
        });

        if (existingLike) {
            await db.like.delete({
                where: { id: existingLike.id },
            });
            return NextResponse.json({ liked: false });
        }

        await db.like.create({
            data: {
                postId: id,
                userId: session.userId,
            },
        });

        return NextResponse.json({ liked: true });
    } catch (error) {
        console.error("Like error:", error);
        return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
    }
}
