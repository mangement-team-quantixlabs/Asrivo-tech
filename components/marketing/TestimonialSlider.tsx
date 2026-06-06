"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Transition,
  type TargetAndTransition,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */
interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  company: string;
}

interface TestimonialSliderProps {
  testimonials: TestimonialItem[];
  autoPlay?: boolean;
  interval?: number;
}

interface SlideAnimConfig {
  enter: TargetAndTransition;
  center: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
  exitTransition: Transition;
  mode: "wait" | "sync";
}

/* ─────────────────────────────────────────────────────────────
   Animation config — one distinct strategy per slide index 0-4
   ───────────────────────────────────────────────────────────── */
const SLIDE_ANIMS: SlideAnimConfig[] = [
  // ── Index 0 → Slide 1: 3D Y-Axis Card Flip ─────────────────
  {
    enter: { rotateY: 80, opacity: 0, scale: 0.88, filter: "brightness(0.4)" },
    center: { rotateY: 0, opacity: 1, scale: 1, filter: "brightness(1)" },
    exit: { rotateY: -80, opacity: 0, scale: 0.88, filter: "brightness(0.4)" },
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    exitTransition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    mode: "wait",
  },

  // ── Index 1 → Slide 2: Kinetic Stagger (stagger runs inside component) ──
  {
    enter: { opacity: 0, scale: 0.84, y: 14 },
    center: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, filter: "blur(6px)" },
    transition: { type: "spring", stiffness: 220, damping: 20 },
    exitTransition: { duration: 0.28, ease: "easeOut" as const },
    mode: "wait",
  },

  // ── Index 2 → Slide 3: Circular Clip-Path Reveal ────────────
  {
    enter: { clipPath: "circle(0% at 50% 38%)", opacity: 0.5 },
    center: { clipPath: "circle(150% at 50% 38%)", opacity: 1 },
    exit: { clipPath: "circle(150% at 50% 38%)", opacity: 0, scale: 1.05 },
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    exitTransition: { duration: 0.3, ease: "easeIn" as const },
    mode: "sync",
  },

  // ── Index 3 → Slide 4: Horizontal Blur Streak ───────────────
  {
    enter: { x: "60%", opacity: 0, filter: "blur(22px) brightness(0.3)", scale: 0.9 },
    center: { x: "0%", opacity: 1, filter: "blur(0px) brightness(1)", scale: 1 },
    exit: { x: "-60%", opacity: 0, filter: "blur(22px) brightness(0.3)", scale: 0.9 },
    transition: { duration: 0.58, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    exitTransition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    mode: "wait",
  },

  // ── Index 4 → Slide 5: Vertical Slot-Machine Roll ───────────
  {
    enter: { y: "110%", opacity: 0 },
    center: { y: "0%", opacity: 1 },
    exit: { y: "-110%", opacity: 0 },
    transition: { type: "spring", stiffness: 180, damping: 22 },
    exitTransition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    mode: "wait",
  },
];

/* ─────────────────────────────────────────────────────────────
   Stagger variants for slide index 1 (Kinetic Stagger slide)
   ───────────────────────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const varQuoteIcon = {
  hidden: { y: -48, opacity: 0, scale: 0.7 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 18 },
  },
};

const varQuote = {
  hidden: { scale: 0.86, opacity: 0, y: 14 },
  visible: {
    scale: 1, opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 18 },
  },
};

const varAuthor = {
  hidden: { y: 36, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─────────────────────────────────────────────────────────────
   Per-slide accent palette
   ───────────────────────────────────────────────────────────── */
const ACCENT = [
  { bg: "bg-blue-500/10",   ring: "ring-blue-400/30",   icon: "text-blue-500"   },
  { bg: "bg-violet-500/10", ring: "ring-violet-400/30", icon: "text-violet-500" },
  { bg: "bg-teal-500/10",   ring: "ring-teal-400/30",   icon: "text-teal-500"   },
  { bg: "bg-rose-500/10",   ring: "ring-rose-400/30",   icon: "text-rose-500"   },
  { bg: "bg-amber-500/10",  ring: "ring-amber-400/30",  icon: "text-amber-500"  },
];

/* ─────────────────────────────────────────────────────────────
   Quote icon badge with animated pulse ring
   ───────────────────────────────────────────────────────────── */
function QuoteIconBadge({ index, pulse = true }: { index: number; pulse?: boolean }) {
  const a = ACCENT[index % 5];
  return (
    <div
      className={cn(
        "relative flex h-14 w-14 items-center justify-center rounded-2xl ring-4 transition-all duration-500",
        a.bg, a.ring
      )}
    >
      {pulse && (
        <motion.span
          className={cn("absolute inset-0 rounded-2xl ring-4 opacity-60", a.ring)}
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <Quote className={cn("h-7 w-7", a.icon)} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Slide content: default (used for indexes 0, 2, 3, 4)
   ───────────────────────────────────────────────────────────── */
function DefaultContent({ t }: { t: TestimonialItem }) {
  return (
    <div className="text-center w-full px-2">
      <blockquote className="mx-auto max-w-3xl text-lg leading-relaxed text-brand-gray-700 md:text-xl italic">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="mt-6">
        <p className="text-base font-semibold text-brand-navy font-[var(--font-sora)]">{t.name}</p>
        <p className="mt-0.5 text-sm text-brand-gray-400">{t.title}, {t.company}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Slide content: kinetic stagger (index 1)
   ───────────────────────────────────────────────────────────── */
function KineticContent({ t, slideIndex }: { t: TestimonialItem; slideIndex: number }) {
  return (
    <motion.div
      className="text-center w-full px-2"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={varQuoteIcon} className="mb-8 flex justify-center">
        <QuoteIconBadge index={slideIndex} pulse={false} />
      </motion.div>
      <motion.blockquote
        variants={varQuote}
        className="mx-auto max-w-3xl text-lg leading-relaxed text-brand-gray-700 md:text-xl italic"
      >
        &ldquo;{t.quote}&rdquo;
      </motion.blockquote>
      <motion.div variants={varAuthor} className="mt-6">
        <p className="text-base font-semibold text-brand-navy font-[var(--font-sora)]">{t.name}</p>
        <p className="mt-0.5 text-sm text-brand-gray-400">{t.title}, {t.company}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Slider
   ───────────────────────────────────────────────────────────── */
export default function TestimonialSlider({
  testimonials,
  autoPlay = true,
  interval = 6000,
}: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const blockRef = useRef(false);

  /* Throttled navigation — prevents mid-animation skips */
  const goTo = useCallback(
    (next: number) => {
      if (blockRef.current || next === current) return;
      blockRef.current = true;
      setPrevIdx(current);
      setCurrent(next);
      setTimeout(() => { blockRef.current = false; }, 850);
    },
    [current]
  );

  const goNext = useCallback(
    () => goTo((current + 1) % testimonials.length),
    [current, goTo, testimonials.length]
  );
  const goPrev = useCallback(
    () => goTo(current === 0 ? testimonials.length - 1 : current - 1),
    [current, goTo, testimonials.length]
  );

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(goNext, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, goNext]);

  /* Animation driven by the OUTGOING slide's index */
  const animIdx = (prevIdx !== null ? prevIdx : current) % 5;
  const anim = SLIDE_ANIMS[animIdx];

  /* Slide content factory */
  function renderContent(idx: number) {
    const t = testimonials[idx];
    return idx % 5 === 1
      ? <KineticContent key={`k-${idx}`} t={t} slideIndex={idx} />
      : <DefaultContent key={`d-${idx}`} t={t} />;
  }

  const showGlobalIcon = current % 5 !== 1;

  return (
    <div className="relative select-none" style={{ perspective: "1200px" }}>

      {/* ── Quote icon (slide 1 / Kinetic renders its own internally) ── */}
      <div className="mb-8 flex justify-center" style={{ minHeight: "3.5rem" }}>
        <AnimatePresence mode="wait">
          {showGlobalIcon && (
            <motion.div
              key={`icon-${current}`}
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <QuoteIconBadge index={current} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Slide content area – fixed height prevents layout jumps ── */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: "clamp(220px, 30vw, 280px)" }}
      >
        <AnimatePresence mode={anim.mode}>
          <motion.div
            key={current}
            initial={anim.enter}
            animate={anim.center}
            exit={anim.exit}
            transition={anim.transition}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: "transform, opacity, filter", transformStyle: "preserve-3d" }}
          >
            {renderContent(current)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div className="mt-10 flex items-center justify-center gap-5">
        <motion.button
          onClick={goPrev}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-blue-50 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-brand-gray-700" />
        </motion.button>

        {/* Morphing capsule dots */}
        <LayoutGroup id="testimonial-dots">
          <div className="flex items-center gap-[7px]">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                layout
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-[10px] rounded-full cursor-pointer focus:outline-none",
                  i === current
                    ? "bg-brand-electric"
                    : "bg-brand-gray-400/30 hover:bg-brand-gray-400/60"
                )}
                animate={{ width: i === current ? 30 : 10 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            ))}
          </div>
        </LayoutGroup>

        <motion.button
          onClick={goNext}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-blue-50 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-brand-gray-700" />
        </motion.button>
      </div>

      {/* ── Animated slide counter ── */}
      <div className="mt-4 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-xs text-brand-gray-400 font-medium tracking-[0.18em] uppercase tabular-nums"
          >
            {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;
            {String(testimonials.length).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
