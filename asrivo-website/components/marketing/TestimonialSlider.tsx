"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function TestimonialSlider({
  testimonials,
  autoPlay = true,
  interval = 6000,
}: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      {/* Quote icon */}
      <div className="mb-8 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-electric/10">
          <Quote className="h-7 w-7 text-brand-electric" />
        </div>
      </div>

      {/* Testimonial content */}
      <div className="relative min-h-[200px] overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-center"
          >
            <blockquote className="mx-auto max-w-3xl text-lg leading-relaxed text-brand-gray-700 md:text-xl md:leading-relaxed italic">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <div className="text-base font-semibold text-brand-navy font-[var(--font-sora)]">
                {testimonials[current].name}
              </div>
              <div className="mt-0.5 text-sm text-brand-gray-400">
                {testimonials[current].title}, {testimonials[current].company}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-brand-gray-100"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4 text-brand-gray-700" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-6 bg-brand-electric"
                  : "w-2 bg-brand-gray-400/30 hover:bg-brand-gray-400/50"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-brand-gray-100"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4 text-brand-gray-700" />
        </button>
      </div>
    </div>
  );
}
