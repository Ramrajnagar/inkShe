import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-ink-neutral">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-20">
                <div className="max-w-3xl mx-auto text-center space-y-8 mb-20">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-ink-text">
                        We are <span className="text-ink-blush">InkShe</span>.
                    </h1>
                    <p className="text-xl text-ink-text/80 leading-relaxed">
                        A digital sanctuary built for girls to express, create, and inspire.
                        No judgment. No hate. Just pure creativity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-ink-pink/20 rounded-2xl flex items-center justify-center text-ink-blush">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold">Our Mission</h3>
                        <p className="text-ink-text/70">
                            To give every girl a voice. Whether you are a coder, a poet, or a dreamer,
                            your story deserves to be heard.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-ink-pink/20 rounded-2xl flex items-center justify-center text-ink-blush">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold">Safe Space</h3>
                        <p className="text-ink-text/70">
                            Safety is our #1 priority. We use advanced moderation to keep toxicity out,
                            so you can focus on being you.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-ink-pink/20 rounded-2xl flex items-center justify-center text-ink-blush">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold">Empowerment</h3>
                        <p className="text-ink-text/70">
                            We believe in the power of sisterhood. When girls support girls,
                            magic happens.
                        </p>
                    </div>
                </div>

                <div className="mt-20 text-center bg-white/50 border border-ink-pink/20 rounded-3xl p-12">
                    <h2 className="text-3xl font-heading font-bold mb-6">Ready to tell your story?</h2>
                    <Button variant="premium" size="lg">Join the Community</Button>
                </div>
            </div>

            <Footer />
        </main>
    );
}
