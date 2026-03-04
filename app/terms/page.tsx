import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollText } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-soft-gradient">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-3xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-ink-purple/20 rounded-full mb-6">
                        <ScrollText className="w-8 h-8 text-ink-purple" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink-text mb-4">Terms of Service</h1>
                    <p className="text-xl text-ink-text/60">The rules that keep InkShe a kind place.</p>
                </div>

                <div className="prose prose-pink max-w-none bg-white/60 p-8 md:p-12 rounded-[2rem] shadow-sm border border-ink-pink/20">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By creating an account and using InkShe, you agree to these Terms of Service. If you do not agree with them, please do not use the platform.</p>

                    <h2>2. User Content & Ownership</h2>
                    <p>You retain full ownership rights to all the original content you write and publish on InkShe. By posting content, you grant us a non-exclusive license to display it on our platform.</p>

                    <h2>3. Acceptable Use</h2>
                    <p>You agree not to use InkShe to:</p>
                    <ul>
                        <li>Harass, abuse, or engage in toxic behavior toward other members.</li>
                        <li>Publish hate speech, explicit content, or illegal material.</li>
                        <li>Spam or manipulate the platform&apos;s interactions (likes, comments).</li>
                    </ul>
                    <p>We reserve the right to remove content or suspend accounts that violate these rules.</p>

                    <h2>4. Account Security</h2>
                    <p>You are responsible for safeguarding the password that you use to access the platform. We cannot and will not be liable for any loss or damage arising from your failure to comply with this requirement.</p>

                    <h2>5. Changes to the Service</h2>
                    <p>InkShe is continually evolving. We may change, suspend, or discontinue any aspect of the service at any time without notice.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
