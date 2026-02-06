"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [penName, setPenName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ email, password, penName }),
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                alert("Registration failed");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-ink-pink/30">
            <CardHeader className="space-y-1 text-center items-center">
                <div className="bg-ink-pink/20 p-3 rounded-full mb-2">
                    <Sparkles className="h-6 w-6 text-ink-blush" />
                </div>
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>
                    Join InkShe and start your writing journey
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSignup} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="penName">Pen Name (Optional)</Label>
                        <Input
                            id="penName"
                            placeholder="MagicWriter"
                            value={penName}
                            onChange={(e) => setPenName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button className="w-full" type="submit" disabled={loading} variant="premium">
                        {loading ? "Creating account..." : "Sign up"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-center text-sm text-gray-500">
                <p>
                    Already have an account?{" "}
                    <Link href="/login" className="underline hover:text-ink-blush">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
