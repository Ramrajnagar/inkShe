import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeartHandshake } from "lucide-react";

export default function GuidelinesPage() {
    return (
        <main className="min-h-screen bg-soft-gradient">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-3xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-ink-blush/20 rounded-full mb-6">
                        <HeartHandshake className="w-8 h-8 text-ink-pink" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink-text mb-4">Community Guidelines</h1>
                    <p className="text-xl text-ink-text/60">How we maintain a safe, empowering sisterhood.</p>
                </div>

                <div className="prose prose-pink max-w-none bg-white/60 p-8 md:p-12 rounded-[2rem] shadow-sm border border-ink-pink/20">
                    <p className="lead text-xl">InkShe was built to be a sanctuary. A place where you can sigh, scream, dream, and write without fear. To keep it that way, we ask everyone to follow these core guidelines.</p>

                    <h3>💖 Be Kind, ALWAYS</h3>
                    <p>If you wouldn&apos;t say it to a friend&apos;s face while they are crying, do not type it here. Constructive feedback on stories is welcome <strong>only</strong> if the author explicitly asks for it. Otherwise, assume people just need a space to be heard.</p>

                    <h3>🛡️ Keep it a Safe Space</h3>
                    <p>We have a zero-tolerance policy for:</p>
                    <ul>
                        <li>Bullying or targeted harassment</li>
                        <li>Hate speech racism, sexism, or discrimination of any kind</li>
                        <li>Doxxing or revealing someone else&apos;s real identity without their consent</li>
                    </ul>

                    <h3>🎨 Respect Authenticity</h3>
                    <p>Write your truth. Share your fictional worlds. Don&apos;t plagiarize other writers. We celebrate original voices and raw emotion here.</p>

                    <h3>🤝 Support One Another</h3>
                    <p>Use the live interactions! If a poem moves you, leave a kind comment. If someone in the Community tab is having a rough day, drop a supportive reply. Our strength lies in our community.</p>

                    <hr />

                    <p className="italic text-sm text-ink-text/50">Violations of these guidelines will result in account suspension. If you see something that breaks these rules, please report it immediately.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
