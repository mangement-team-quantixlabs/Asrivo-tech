"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import StatCounter from "@/components/marketing/StatCounter";
import { heroStats } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-midnight">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-brand-electric/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-brand-teal/5 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
              Trusted by 500+ enterprises worldwide
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white font-[var(--font-sora)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-brand-teal to-brand-electric bg-clip-text text-transparent">
              Tomorrow&apos;s
            </span>{" "}
            Digital Enterprise
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            We deliver enterprise-grade AI, Cloud, Cybersecurity, and Digital
            Transformation solutions that drive measurable business outcomes
            across industries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-xl hover:shadow-brand-orange/25 active:scale-[0.98]"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-[0.98]"
            >
              <Play className="h-4 w-4" />
              Talk to an Expert
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
