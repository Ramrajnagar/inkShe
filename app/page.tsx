"use client";

import { Button } from "@/components/ui/button";
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
            <Button variant="premium" size="lg" className="h-14 px-10 text-lg">
              Start Writing
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 text-lg bg-white/50 border-ink-text/10">
              Read Stories
            </Button>
          </div>
        </motion.div>
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

      <Footer />
    </main>
  );
}
