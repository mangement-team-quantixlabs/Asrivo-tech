"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: string;
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  gradient = "from-brand-navy to-brand-electric",
  index = 0,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/5 hover:border-brand-electric/20"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient accent on hover */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          gradient
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white transition-transform duration-300 group-hover:scale-110",
          gradient
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-brand-navy font-[var(--font-sora)] group-hover:text-brand-electric transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-gray-400">
        {description}
      </p>

      {/* Learn more */}
      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-electric opacity-0 transition-all duration-300 group-hover:opacity-100">
        Learn more
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
