import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const messageSchema = z.object({
    receiverId: z.string(),
    content: z.string().min(1, "Message content is required").max(1000),
});

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || typeof session === "string" || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const result = messageSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { receiverId, content } = result.data;

        if (session.userId === receiverId) {
            return NextResponse.json({ error: "You cannot message yourself" }, { status: 400 });
        }

        const message = await db.message.create({
            data: {
                senderId: session.userId,
                receiverId,
                content: content.trim(),
            }
        });

        return NextResponse.json({ message });

    } catch (error) {
        console.error("Message send error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
