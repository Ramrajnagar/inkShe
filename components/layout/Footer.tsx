export function Footer() {
    return (
        <footer className="border-t border-ink-pink/20 bg-ink-neutral py-8 mt-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-ink-text/60">
                    © {new Date().getFullYear()} InkShe. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-sm text-ink-text/60 hover:text-ink-blush">
                        Privacy
                    </a>
                    <a href="#" className="text-sm text-ink-text/60 hover:text-ink-blush">
                        Terms
                    </a>
                    <a href="#" className="text-sm text-ink-text/60 hover:text-ink-blush">
                        Guidelines
                    </a>
                </div>
            </div>
        </footer>
    );
}
