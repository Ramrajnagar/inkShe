import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const profileSchema = z.object({
    penName: z.string().min(2, "Pen name must be at least 2 characters").max(50).optional(),
});

export async function GET(req: Request) {
    try {
        const session = await getSession();
        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { id: session.userId },
            select: { penName: true, email: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getSession();
        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const result = profileSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { penName } = result.data;

        // Check uniqueness if penName is being updated
        if (penName) {
            const existing = await db.user.findUnique({
                where: { penName },
            });
            if (existing && existing.id !== session.userId) {
                return NextResponse.json({ error: "Pen name already taken" }, { status: 409 });
            }
        }

        const updatedUser = await db.user.update({
            where: { id: session.userId },
            data: { penName },
        });

        return NextResponse.json({ user: updatedUser });

    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
