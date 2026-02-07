"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, PenTool, Lock, Users } from "lucide-react";
import { SketchUnderline, SketchSparkle, SketchArrow, SketchCircle } from "@/components/ui/sketch-decorations";
import { HeroBackground } from "@/components/landing/hero-background";
import { RunningText } from "@/components/landing/running-text";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [featuredStories, setFeaturedStories] = useState<any[]>([]);
  const ref = useRef(null);

  import { useState, useEffect } from "react";

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/stories?limit=3");
        if (res.ok) {
          const data = await res.json();
          setFeaturedStories(data.stories);
        }
      } catch (e) {
        console.error("Failed to fetch featured stories");
      }
    }
    fetchFeatured();
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <main className="min-h-screen bg-soft-gradient relative overflow-hidden" ref={ref}>
      <Navbar />

      {/* Decorative Running Text Banner */}
      <div className="relative z-20 mt-16">
        <RunningText />
      </div>

      {/* Hero Section with Localized Background */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">

        {/* Moved Floating Elements Background */}
        <div className="absolute inset-0 pointer-events-none">
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

        {/* Hero Content Container */}
        <div className="container mx-auto px-4 pt-20 pb-40 flex flex-col items-center text-center relative z-10">
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
        </div>
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
          {featuredStories.length > 0 ? featuredStories.map((story, i) => (
            <Link href={`/stories/${story.slug}`} key={i}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink-pink/10 hover:border-ink-pink/30 transition-colors cursor-pointer group h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ink-blush to-ink-purple opacity-80 flex items-center justify-center text-white font-bold text-xs">{story.author?.penName?.[0] || "A"}</div>
                  <span className="text-sm font-medium text-ink-text/70">{story.author?.penName || "Anonymous"}</span>
                </div>
                <h3 className="text-lg font-bold text-ink-text mb-2 group-hover:text-ink-blush transition-colors line-clamp-2">{story.title}</h3>
                <p className="text-ink-text/60 text-sm line-clamp-3 mb-4 flex-grow">
                  {story.content?.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-4 text-xs text-ink-text/40 mt-auto">
                  <span>5 min read</span>
                  <span>•</span>
                  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          )) : (
            // Fallback skelton or empty state if no stories
            [1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-ink-pink/10 opacity-50">
                <div className="h-8 w-24 bg-gray-100 rounded-full mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-100 rounded mb-2"></div>
                <div className="h-20 w-full bg-gray-100 rounded"></div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Community/Testimonials Section */}
      <section className="container mx-auto px-4 py-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-ink-pink/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-ink-purple/10 rounded-full blur-[120px] -z-10" />

        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-2 px-4 bg-white/50 backdrop-blur-sm rounded-full border border-ink-pink/20 text-ink-blush font-medium text-sm mb-4"
          >
            <Users className="w-4 h-4 mr-2" />
            Join 2,000+ Writers
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-ink-text relative inline-block">
            Loved solely by <span className="text-ink-blush">Girls</span>
            <SketchUnderline className="absolute -bottom-2 left-0 w-full text-ink-pink/40 h-4" />
          </h2>
          <p className="text-xl text-ink-text/60 max-w-2xl mx-auto">
            A community where empathy leads and judgment is left at the door.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "I finally found a place where I don't have to pretend. Writing here feels like exhaling after holding my breath for years.",
              author: "Sarah J.",
              role: "Poet",
              color: "bg-ink-pink/10"
            },
            {
              quote: "The anonymity gave me the courage to share my story. The support I received changed my life.",
              author: "Maya R.",
              role: "Student",
              color: "bg-ink-purple/10"
            },
            {
              quote: "It's not just a writing app; it's a sisterhood. I've never felt so understood by strangers.",
              author: "Priya K.",
              role: "Developer",
              color: "bg-ink-blush/10"
            }
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-xl hover:shadow-ink-pink/10 transition-all duration-300 group"
            >
              <div className="absolute -top-4 -left-4">
                <div className={`w-12 h-12 ${testimonial.color} rounded-2xl rotate-12 flex items-center justify-center text-4xl font-serif text-ink-text/40`}>
                  "
                </div>
              </div>

              <p className="text-lg text-ink-text/80 italic mb-6 relative z-10 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 border-t border-ink-pink/10 pt-6">
                <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-ink-text/60`}>
                  {testimonial.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-ink-text group-hover:text-ink-blush transition-colors">{testimonial.author}</h4>
                  <p className="text-sm text-ink-text/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-ink-blush to-ink-purple text-white text-center relative overflow-hidden shadow-2xl shadow-ink-pink/30"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <SketchCircle className="absolute -top-20 -left-20 w-64 h-64 text-white/10" />
          <SketchCircle className="absolute -bottom-40 -right-20 w-96 h-96 text-white/10" />

          <div className="relative z-10 space-y-8">
            <h3 className="text-3xl md:text-5xl font-heading font-black">Ready to share your story?</h3>
            <p className="text-white/80 text-xl max-w-xl mx-auto">
              Join thousands of girls finding their voice today.
            </p>
            <Link href="/signup">
              <Button size="lg" className="h-16 px-10 text-lg bg-white text-ink-blush hover:bg-white/90 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Start Writing for Free
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
