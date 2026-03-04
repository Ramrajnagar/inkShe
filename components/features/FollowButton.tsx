"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserPlus, UserMinus } from "lucide-react";

export function FollowButton({
    followingId,
    initialIsFollowing
}: {
    followingId: string;
    initialIsFollowing: boolean;
}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsFollowing(initialIsFollowing);
    }, [initialIsFollowing]);

    const handleFollow = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/user/follow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ followingId })
            });

            if (res.ok) {
                const data = await res.json();
                setIsFollowing(data.following);
                router.refresh();
            }
        } catch (error) {
            console.error("Follow failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={isFollowing ? "outline" : "premium"}
            className={`h-12 px-8 rounded-2xl font-bold transition-all flex items-center gap-2 ${isFollowing ? "border-2 border-ink-pink/20 hover:border-ink-blush" : "shadow-lg shadow-ink-pink/20"
                }`}
            onClick={handleFollow}
            disabled={isLoading}
        >
            {isLoading ? "..." : (
                <>
                    {isFollowing ? <UserMinus className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {isFollowing ? "Unfollow" : "Follow Back"}
                </>
            )}
        </Button>
    );
}
