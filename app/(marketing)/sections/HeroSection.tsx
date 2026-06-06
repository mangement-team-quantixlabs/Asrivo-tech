"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import StatCounter from "@/components/marketing/StatCounter";
import NetworkBackground from "@/components/marketing/NetworkBackground";
import { heroStats } from "@/lib/constants";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-theme-lavender">
      {/* Background & Complex Graphics Layer */}
      <NetworkBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-[1] mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-4xl relative z-20">
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme-teal/30 bg-theme-cyan/50 px-4 py-1.5 text-xs font-medium text-theme-navy backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-theme-teal animate-pulse" />
              Trusted by 500+ enterprises worldwide
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight text-theme-navy font-[var(--font-sora)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-theme-teal to-theme-navy bg-clip-text text-transparent drop-shadow-sm">
              Tomorrow&apos;s
            </span>{" "}
            <br className="hidden md:block" />
            Digital Enterprise
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-theme-slate md:text-xl font-medium"
          >
            We deliver enterprise-grade AI, Cloud, Cybersecurity, and Digital
            Transformation solutions that drive measurable business outcomes
            across industries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="/services"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-theme-orange px-8 text-base font-semibold text-white transition-all hover:bg-theme-orange/90 hover:shadow-xl hover:shadow-theme-orange/25 active:scale-[0.98]"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-theme-navy px-8 text-base font-semibold text-theme-navy transition-all hover:bg-theme-navy/5 active:scale-[0.98]"
            >
              <Play className="h-4 w-4" />
              Talk to an Expert
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          className="mt-24 grid grid-cols-2 gap-8 border-t border-theme-navy/10 pt-10 md:grid-cols-4 relative z-20"
        >
          {heroStats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              valueClassName="text-white drop-shadow-md"
              labelClassName="text-theme-slate font-semibold"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
