"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  title: string;
  client: string;
  stat: string;
  statLabel: string;
  industry: string;
  href: string;
  image?: string;
  index?: number;
}

export default function CaseStudyCard({
  title,
  client,
  stat,
  statLabel,
  industry,
  href,
  image,
  index = 0,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/5"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image / Visual Header */}
      <div className="relative h-52 overflow-hidden">
        {/* Background: either the provided image or the gradient fallback */}
        {image ? (
          <Image
            src={image}
            alt={`${industry} case study — ${title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-electric/80 to-brand-teal" />
        )}

        {/* Dark overlay for WCAG text contrast over imagery */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* SVG cross-hatch texture overlay for depth */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 mix-blend-overlay" />

        {/* Industry badge */}
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-brand-navy backdrop-blur-md shadow-sm border border-white/40">
            {industry}
          </span>
        </div>

        {/* Stat highlight — anchored bottom-right over the image */}
        <div className="absolute bottom-4 right-4 z-10 text-right">
          <div className="text-4xl font-extrabold text-white font-[var(--font-sora)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {stat}
          </div>
          <div className="text-xs font-medium text-white/80 tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            {statLabel}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs font-medium text-brand-gray-400 uppercase tracking-wider">
          {client}
        </div>
        <h3 className="mt-1.5 text-base font-semibold text-brand-navy font-[var(--font-sora)] group-hover:text-brand-electric transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="mt-auto pt-4 flex items-center gap-1 text-sm font-medium text-brand-electric">
          Read case study
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
