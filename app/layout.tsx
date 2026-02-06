import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "InkShe | Your Words. Your Freedom.",
    template: "%s | InkShe",
  },
  description: "A safe, premium content creator platform for girls to express themselves freely. Write stories, poems, and thoughts in a non-judgmental space.",
  keywords: ["writing", "safe space", "girls", "blogging", "stories", "poetry"],
  authors: [{ name: "InkShe Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inkshe.com",
    siteName: "InkShe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InkShe Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InkShe | Your Words. Your Freedom.",
    description: "A safe, premium content creator platform for girls.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, playfair.variable, "antialiased min-h-screen bg-ink-neutral text-ink-text selection:bg-ink-pink selection:text-ink-text")}>
        {children}
      </body>
    </html>
  );
}
