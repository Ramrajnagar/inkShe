"use client";

import { useTransition, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [penName, setPenName] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/user/profile");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user?.penName) setPenName(data.user.penName);
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setIsPending(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ penName }),
            });

            if (res.ok) {
                alert("Profile updated successfully!");
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to update profile");
            }
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setIsPending(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback
            router.push("/login");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen">
            <h1 className="text-3xl font-heading font-bold text-ink-text mb-8">Settings</h1>

            <div className="space-y-6">
                {/* Profile Section */}
                <Card className="border-ink-pink/20 bg-white/80 backdrop-blur-sm shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-ink-blush" />
                            Profile Settings
                        </CardTitle>
                        <CardDescription>
                            Update your public profile information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="penName" className="text-sm font-medium text-ink-text">
                                Pen Name
                            </label>
                            <Input
                                id="penName"
                                placeholder="Your secret identity..."
                                value={penName}
                                onChange={(e) => setPenName(e.target.value)}
                                className="border-ink-pink/20 focus:border-ink-blush focus:ring-ink-blush/20"
                                disabled={isLoading}
                            />
                            <p className="text-xs text-muted-foreground">
                                This is the name displayed on your published stories.
                            </p>
                        </div>
                        <Button
                            className="w-full sm:w-auto bg-ink-blush hover:bg-ink-blush/90 text-white font-bold"
                            disabled={isPending || isLoading}
                            onClick={handleSave}
                        >
                            {isPending ? (
                                <>Saving...</>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Account Actions */}
                <Card className="border-red-100 bg-red-50/30">
                    <CardHeader>
                        <CardTitle className="text-red-600 text-lg">Account Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="w-full sm:w-auto"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
