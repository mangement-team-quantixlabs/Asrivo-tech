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
        "group relative overflow-hidden rounded-2xl bg-[#E8EBFF] p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy/5 text-brand-navy transition-colors group-hover:bg-brand-navy/10 group-hover:text-brand-electric">
          <Icon className="h-5 w-5 stroke-[1.5]" />
        </div>

        {/* Content */}
        <h3 className="text-base font-semibold text-brand-navy font-[var(--font-sora)]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
          {description}
        </p>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-navy/70 transition-all group-hover:text-brand-navy group-hover:gap-2.5">
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
