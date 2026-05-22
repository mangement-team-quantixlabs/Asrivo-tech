"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  title: string;
  client: string;
  stat: string;
  statLabel: string;
  industry: string;
  href: string;
  index?: number;
}

export default function CaseStudyCard({
  title,
  client,
  stat,
  statLabel,
  industry,
  href,
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
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-brand-navy via-brand-electric/80 to-brand-teal overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        {/* Industry badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {industry}
          </span>
        </div>

        {/* Stat highlight */}
        <div className="absolute bottom-4 right-4 text-right">
          <div className="text-3xl font-bold text-white font-[var(--font-sora)]">{stat}</div>
          <div className="text-xs text-white/70">{statLabel}</div>
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
