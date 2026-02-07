import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SketchUnderline } from "@/components/ui/sketch-decorations";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-ink-neutral p-4 text-center">
            <h1 className="text-6xl md:text-9xl font-black text-ink-pink opacity-20 relative">
                404
            </h1>
            <div className="relative -mt-12 md:-mt-20 z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-text">
                    Page Not Found
                </h2>
                <p className="text-lg text-ink-text/60 max-w-md mx-auto">
                    Oops! It seems like this story hasn't been written yet... or maybe it's hiding?
                    <SketchUnderline className="block mx-auto w-24 h-4 text-ink-blush/50 mt-2" />
                </p>
                <Link href="/">
                    <Button variant="premium" size="lg" className="mt-8">
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
