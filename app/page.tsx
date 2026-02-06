"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, PenTool, Lock, Users } from "lucide-react";
import { SketchUnderline, SketchSparkle, SketchArrow } from "@/components/ui/sketch-decorations";
import { HeroBackground } from "@/components/landing/hero-background";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <main className="min-h-screen bg-soft-gradient relative overflow-hidden" ref={ref}>
      <Navbar />

      {/* Floating Elements Background - Aesthetic Sketches */}
      <div className="absolute inset-0 pointer-events-none sticky top-0 h-screen overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: -50,
              x: Math.sin(i) * 30,
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            className="absolute text-ink-pink opacity-40 mix-blend-multiply"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            {/* Using SVG sketches instead of just emoji */}
            {i % 2 === 0 ? (
              <SketchSparkle className="w-12 h-12 text-ink-blush/40" />
            ) : (
              <Heart className="w-8 h-8 text-ink-pink/50 fill-ink-pink/20" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-40 flex flex-col items-center text-center relative z-10 w-full min-h-[90vh] justify-center">

        {/* Animated Hero Background */}
        <div className="w-full max-w-5xl mb-12">
          <HeroBackground />
        </div>

        {/* Decorative Sketches around Hero */}
        <SketchSparkle className="absolute top-1/4 left-[15%] text-ink-purple w-16 h-16 opacity-60" delay={0.5} />
        <SketchSparkle className="absolute bottom-1/3 right-[15%] text-ink-blush w-12 h-12 opacity-60" delay={0.8} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-8 relative"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/70 backdrop-blur-md border border-ink-pink text-ink-blush font-semibold shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>A safe space created just for her.</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-heading font-bold text-ink-text leading-[1.1] tracking-tight">
            Your words. <br />
            <span className="relative inline-block text-ink-blush">
              Your freedom.
              <SketchUnderline className="absolute -bottom-2 left-0 w-full text-ink-pink h-6" delay={1} />
            </span>
          </h1>

          <p className="text-2xl text-ink-text/80 leading-relaxed max-w-2xl mx-auto font-light">
            A cozy corner of the internet to write, share, and just
            <span className="font-medium text-ink-blush italic px-1"> be yourself </span>
            without judgment.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link href="/signup">
              <Button variant="premium" size="lg" className="h-16 px-12 text-xl rounded-2xl shadow-lg shadow-ink-pink/20 hover:shadow-ink-pink/40 transition-all hover:-translate-y-1">
                Start Writing
                <PenTool className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/stories">
              <Button variant="outline" size="lg" className="h-16 px-12 text-xl rounded-2xl bg-white/60 border-ink-pink/50 text-ink-text hover:bg-white hover:border-ink-blush transition-all">
                Read Stories
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink-text mb-6">How InkShe Works</h2>
          <p className="text-xl text-ink-text/60 max-w-2xl mx-auto">It's simple, safe, and made for you.</p>
          <SketchArrow className="absolute lg:right-[30%] top-full text-ink-purple/50 w-24 h-24 rotate-12 hidden lg:block" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Create Pen Name",
              desc: "Choose a secret identity. No real names required.",
              color: "text-ink-pink"
            },
            {
              step: "02",
              title: "Write Freely",
              desc: "Use our beautiful editor to write stories, diaries, or thoughts.",
              color: "text-ink-blush"
            },
            {
              step: "03",
              title: "Share or Keep",
              desc: "Publish to the community or keep it locked in your digital diary.",
              color: "text-ink-purple"
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-10 rounded-[2rem] bg-white/60 border border-white/80 shadow-sm hover:shadow-xl hover:shadow-ink-pink/10 backdrop-blur-md transition-all group"
            >
              <span className={`absolute -top-10 left-8 text-8xl font-black ${item.color} opacity-20`}>{item.step}</span>
              <h3 className="text-2xl font-bold text-ink-text mt-6 mb-4 relative z-10 group-hover:text-ink-blush transition-colors">{item.title}</h3>
              <p className="text-lg text-ink-text/70 relative z-10 leading-relaxed">{item.desc}</p>
              <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-${item.color.replace('text-', '')}/10 to-transparent rounded-bl-[2rem] rounded-tr-[50%] pointer-events-none`} />
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
