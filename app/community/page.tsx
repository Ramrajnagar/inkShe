import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiveCommunity } from "@/components/features/LiveCommunity";

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink-text">
                            Community
                        </h1>
                        <p className="text-lg text-ink-text/70 max-w-xl">
                            Connect, share, and grow with thousands of other creators. Live sync enabled.
                        </p>
                    </div>
                </div>

                <LiveCommunity />
            </div>

            <Footer />
        </main>
    );
}
