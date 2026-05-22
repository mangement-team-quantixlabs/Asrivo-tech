"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "off-white" | "navy" | "midnight";
  animate?: boolean;
  /** Inner container max width */
  containerClassName?: string;
}

export default function SectionWrapper({
  children,
  className,
  id,
  background = "white",
  animate = true,
  containerClassName,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const bgClasses = {
    white: "bg-white",
    "off-white": "bg-brand-off-white",
    navy: "bg-brand-navy text-white",
    midnight: "bg-brand-midnight text-white",
  };

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative py-20 lg:py-28",
        bgClasses[background],
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {animate ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
