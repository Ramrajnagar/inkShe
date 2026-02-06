"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Heart, Sparkles, PenTool, Lock, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-soft-gradient relative overflow-hidden">
      <Navbar />

      {/* Floating Elements Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: -100,
              x: Math.sin(i) * 50,
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            className="absolute text-ink-pink/30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${80 + (i % 2) * 10}%`,
              fontSize: `${20 + i * 10}px`,
            }}
          >
            {i % 2 === 0 ? "♥" : "✨"}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-ink-pink/30 text-ink-blush text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Designated safe space for girls</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-ink-text leading-tight">
            Your words. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-blush to-ink-purple">
              Your freedom.
            </span>
          </h1>

          <p className="text-xl text-ink-text/80 leading-relaxed max-w-2xl mx-auto">
            A safe, cozy corner of the internet where you can write, share, and be yourself without judgment.
            Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup">
              <Button variant="premium" size="lg" className="h-14 px-10 text-lg">
                Start Writing
              </Button>
            </Link>
            <Link href="/stories">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg bg-white/50 border-ink-text/10">
                Read Stories
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-text mb-4">How InkShe Works</h2>
          <p className="text-lg text-ink-text/60 max-w-2xl mx-auto">It's simple, safe, and made for you.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Your Pen Name",
              desc: "Choose a secret identity. No real names required.",
            },
            {
              step: "02",
              title: "Write Your Heart Out",
              desc: "Use our beautiful editor to write stories, diaries, or thoughts.",
            },
            {
              step: "03",
              title: "Share or Keep Private",
              desc: "Publish to the community or keep it locked in your digital diary.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-sm"
            >
              <span className="absolute -top-6 left-8 text-6xl font-black text-ink-pink/20">{item.step}</span>
              <h3 className="text-xl font-bold text-ink-text mt-4 mb-2 relative z-10">{item.title}</h3>
              <p className="text-ink-text/70 relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Lock,
              title: "Safe & Secure",
              desc: "Anonymous pen-names, toxic-free comments, and a strictly moderated community.",
            },
            {
              icon: PenTool,
              title: "Express Freely",
              desc: "Rich editor for your stories, poems, thoughts, and technical articles.",
            },
            {
              icon: Users,
              title: "Supportive Community",
              desc: "Connect with like-minded girls who uplift and inspire each other.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-ink-pink/20 rounded-2xl flex items-center justify-center mb-6 text-ink-blush">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
              <p className="text-ink-text/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Stories Preview */}
      <section className="container mx-auto px-4 py-20 bg-ink-pink/5 rounded-3xl my-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink-text mb-2">Featured Stories</h2>
            <p className="text-ink-text/60">Read what others are sharing</p>
          </div>
          <Link href="/stories">
            <Button variant="ghost" className="text-ink-blush hover:text-ink-blush/80 hover:bg-ink-pink/10">
              View all stories →
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for stories - in a real app these would be dynamic */}
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-ink-pink/10 hover:border-ink-pink/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ink-blush to-ink-purple opacity-80"></div>
                <span className="text-sm font-medium text-ink-text/70">DreamWriter{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-ink-text mb-2 group-hover:text-ink-blush transition-colors">The day the stars fell</h3>
              <p className="text-ink-text/60 text-sm line-clamp-3 mb-4">
                It started as a normal Tuesday evening, but then I looked up at the sky and saw something specific...
              </p>
              <div className="flex items-center gap-4 text-xs text-ink-text/40">
                <span>5 min read</span>
                <span>•</span>
                <span>Just now</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
