import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, signToken } from "@/lib/auth";
import { z } from "zod";
import { cookies } from "next/headers";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid email or password format" }, { status: 400 });
        }

        const { email, password } = result.data;

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user || !(await verifyPassword(password, user.passwordHash))) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = signToken({ userId: user.id, email: user.email });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return NextResponse.json({
            user: { id: user.id, email: user.email, penName: user.penName },
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
