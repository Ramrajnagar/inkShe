import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const session = await getSession();

        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ session: null, user: null });
        }

        const user = await db.user.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                penName: true,
                fullName: true,
                avatarUrl: true,
            }
        });

        return NextResponse.json({ session, user });
    } catch (error) {
        console.error("Session API error:", error);
        return NextResponse.json({ session: null, user: null }, { status: 500 });
    }
}
