import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-soft-gradient">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-3xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-ink-pink/20 rounded-full mb-6">
                        <Shield className="w-8 h-8 text-ink-blush" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink-text mb-4">Privacy Policy</h1>
                    <p className="text-xl text-ink-text/60">Your trust and safety are our highest priorities.</p>
                </div>

                <div className="prose prose-pink max-w-none bg-white/60 p-8 md:p-12 rounded-[2rem] shadow-sm border border-ink-pink/20">
                    <h2>1. What Information We Collect</h2>
                    <p>We collect only what is absolutely necessary to provide you with a safe and functional platform:</p>
                    <ul>
                        <li><strong>Account Data:</strong> Email address, secure password hash, and an optional pen name.</li>
                        <li><strong>Content Data:</strong> The stories, poems, and comments you explicitly choose to publish or save on InkShe.</li>
                        <li><strong>Interaction Data:</strong> Likes and community interactions, so we can display them live.</li>
                    </ul>

                    <h2>2. How We Protect Your Anonymity</h2>
                    <p>We strongly believe in your right to express yourself without fear of judgment. Your real name (if provided) is never shown publicly unless you explicitly use it as your pen name. Your email address is exclusively used for login and important platform communications.</p>

                    <h2>3. Data Deletion</h2>
                    <p>You own your words. You can delete individual stories, comments, or your entire account at any time. When you do, we remove that data from our live databases immediately.</p>

                    <h2>4. Third-Party Sharing</h2>
                    <p><strong>We do not sell your data.</strong> Period. We only share data with essential service providers necessary to operate the site (like secure database hosting and email delivery services).</p>

                    <h2>5. Contact Us</h2>
                    <p>If you have any questions or concerns about how we handle your data, please reach out to us at <strong>ramrajnagar2005@gmail.com</strong>.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
