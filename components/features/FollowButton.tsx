"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
            size="sm"
            className="h-6 px-3 text-[10px] rounded-full"
            onClick={handleFollow}
            disabled={isLoading}
        >
            {isLoading ? "..." : (isFollowing ? "Following" : "Follow")}
        </Button>
    );
}
