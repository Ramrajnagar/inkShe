import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Heart, Eye } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-heading font-bold text-ink-text">Hello, Writer! ✨</h1>
                <p className="text-ink-text/60">Here&apos;s what&apos;s happening with your stories.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-ink-pink/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-ink-blush" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-ink-pink/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                        <Heart className="h-4 w-4 text-ink-blush" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">342</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-ink-pink/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published Stories</CardTitle>
                        <FileText className="h-4 w-4 text-ink-blush" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Keep writing!</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-ink-pink/30">
                    <CardHeader>
                        <CardTitle>Recent Drafts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b border-ink-pink/10 pb-4 last:border-0">
                                    <div>
                                        <p className="font-medium">My Journey to Tech {i}</p>
                                        <p className="text-sm text-muted-foreground">Edited 2 days ago</p>
                                    </div>
                                    <div className="text-sm text-ink-blush font-medium cursor-pointer hover:underline">
                                        Edit
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
