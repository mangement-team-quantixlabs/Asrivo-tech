"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  href: string;
  index?: number;
}

export default function BlogCard({
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  href,
  index = 0,
}: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    AI: "bg-violet-100 text-violet-700",
    Cloud: "bg-blue-100 text-blue-700",
    Security: "bg-emerald-100 text-emerald-700",
    Data: "bg-orange-100 text-orange-700",
    "Industry News": "bg-pink-100 text-pink-700",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/5"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Cover image placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-brand-off-white to-brand-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-2xl bg-brand-navy/5 flex items-center justify-center">
            <span className="text-3xl font-bold text-brand-navy/20 font-[var(--font-sora)]">A</span>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              categoryColors[category] || "bg-gray-100 text-gray-700"
            )}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-brand-navy font-[var(--font-sora)] group-hover:text-brand-electric transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="mt-2 text-sm text-brand-gray-400 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
          <div className="text-xs text-brand-gray-400">
            <span className="font-medium text-brand-gray-700">{author}</span>
            <span className="mx-1.5">·</span>
            {date}
          </div>
          <div className="flex items-center gap-1 text-xs text-brand-gray-400">
            <Clock className="h-3 w-3" />
            {readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
