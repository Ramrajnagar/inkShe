"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PenTool, LayoutDashboard, FileText, Heart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Stories", href: "/dashboard/stories", icon: FileText },
    { name: "Saved", href: "/dashboard/saved", icon: Heart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 border-r border-ink-pink/20 min-h-screen bg-white/50 backdrop-blur-sm flex flex-col p-6 hidden md:flex">
            <div className="mb-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-ink-pink/20 p-2 rounded-full">
                        <PenTool className="h-5 w-5 text-ink-blush" />
                    </div>
                    <span className="text-xl font-heading font-bold bg-gradient-to-r from-ink-blush to-ink-purple bg-clip-text text-transparent">
                        InkShe
                    </span>
                </Link>
            </div>

            <nav className="flex-1 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-ink-pink/20 text-ink-blush"
                                : "text-ink-text/70 hover:bg-ink-pink/10 hover:text-ink-blush"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="pt-6 border-t border-ink-pink/20">
                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </div>
        </div>
    );
}
