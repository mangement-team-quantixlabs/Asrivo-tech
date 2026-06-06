"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  valueClassName?: string;
  labelClassName?: string;
}

export default function StatCounter({
  value,
  suffix = "",
  label,
  duration = 2,
  valueClassName,
  labelClassName,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className={cn("text-4xl font-bold tracking-tight text-white font-[var(--font-sora)] md:text-5xl lg:text-6xl", valueClassName)}>
        {count}
        {suffix}
      </div>
      <div className={cn("mt-2 text-sm font-medium text-white/60 md:text-base", labelClassName)}>
        {label}
      </div>
    </motion.div>
  );
}
