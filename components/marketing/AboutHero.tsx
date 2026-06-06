"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   About Page Hero
   Background: solid deep navy #0A1931 (as per design spec)
   Navbar sits on top so we push content down with pt-32
   ───────────────────────────────────────────────────────────── */
export default function AboutHero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-24 lg:pb-32"
      style={{ backgroundColor: "#0A1931" }}
    >
      {/* ── Subtle depth orbs — very low opacity so the solid colour dominates ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,198,190,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Animated grid lines overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "#93C5FD", // light-blue-300
            }}
          >
            About Us
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mt-6 max-w-4xl text-4xl font-bold leading-[1.12] font-[var(--font-sora)] sm:text-5xl lg:text-6xl"
          style={{ color: "#FFFFFF" }}
        >
          Engineering excellence,{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #67E8F9, #38BDF8, #7DD3FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            global impact
          </span>
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.90)" }}
        >
          ASCIRVO is a world-class IT services and digital transformation company
          trusted by 500+ enterprises across 15+ countries. We combine deep technical
          expertise with industry knowledge to deliver measurable business outcomes.
        </motion.p>

        {/* Stat pills row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {[
            { value: "500+", label: "Enterprise Clients" },
            { value: "15+", label: "Countries" },
            { value: "10+", label: "Years of Excellence" },
            { value: "98%", label: "Client Retention" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 rounded-full px-5 py-2.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            >
              <span
                className="text-sm font-bold font-[var(--font-sora)]"
                style={{ color: "#FFFFFF" }}
              >
                {s.value}
              </span>
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.70)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
