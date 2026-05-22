"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndustryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  index?: number;
}

export default function IndustryCard({
  title,
  description,
  icon: Icon,
  href,
  index = 0,
}: IndustryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy to-brand-midnight p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/20"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Background glow effect */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-electric/10 blur-2xl transition-all duration-500 group-hover:bg-brand-teal/20 group-hover:scale-150" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <h3 className="text-base font-semibold text-white font-[var(--font-sora)]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          {description}
        </p>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-teal transition-all group-hover:gap-2.5">
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
