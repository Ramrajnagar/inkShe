import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import { z } from "zod";
import { cookies } from "next/headers";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    penName: z.string().min(2).optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, penName } = registerSchema.parse(body);

        const existingUser = await db.user.findFirst({
            where: {
                OR: [{ email }, { penName: penName || undefined }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email or pen name" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await db.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                penName,
            },
        });

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
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: `Error: ${error instanceof Error ? error.message : "Internal server error"}` },
            { status: 500 }
        );
    }
}
