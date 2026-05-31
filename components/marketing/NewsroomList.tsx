"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { NewsroomPost } from "@/types";

interface NewsroomListProps {
  initialPosts: NewsroomPost[];
}

const typeLabels: Record<string, string> = {
  all: "All News",
  press_release: "Press Releases",
  media_coverage: "Media Coverage",
  award: "Awards",
  announcement: "Announcements",
};

const typeColors: Record<string, string> = {
  award: "bg-amber-100 text-amber-700",
  press_release: "bg-blue-100 text-blue-700",
  announcement: "bg-emerald-100 text-emerald-700",
  media_coverage: "bg-rose-100 text-rose-700",
};

export default function NewsroomList({ initialPosts }: NewsroomListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.summary && post.summary.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === "all" || post.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [initialPosts, searchQuery, selectedType]);

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                selectedType === key
                  ? "bg-brand-electric text-white shadow-lg shadow-brand-electric/25"
                  : "bg-white border border-border text-brand-gray-700 hover:border-brand-electric/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm placeholder:text-brand-gray-400 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20 text-brand-gray-700 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-400" />
        </div>
      </div>

      {/* Grid / List of news items */}
      {filteredPosts.length > 0 ? (
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((item, i) => {
              const dateStr = item.published_at
                ? new Date(item.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              const isExternal = !!item.source_url;
              const linkHref = isExternal ? item.source_url! : `/newsroom/${item.slug}`;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <div className="group rounded-2xl border border-border bg-white p-6 transition-all hover:border-brand-electric/20 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                          typeColors[item.type] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {typeLabels[item.type] || item.type}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-brand-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {dateStr}
                      </span>
                      {item.source && (
                        <span className="text-xs text-brand-gray-400">• Source: {item.source}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-brand-navy font-[var(--font-sora)] group-hover:text-brand-electric transition-colors leading-snug">
                      {isExternal ? (
                        <a
                          href={linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:underline"
                        >
                          {item.headline}
                          <ExternalLink className="h-4 w-4 shrink-0 text-brand-gray-400 group-hover:text-brand-electric" />
                        </a>
                      ) : (
                        <Link href={linkHref} className="hover:underline">
                          {item.headline}
                        </Link>
                      )}
                    </h3>

                    {item.summary && (
                      <p className="mt-2 text-sm text-brand-gray-400 leading-relaxed">
                        {item.summary}
                      </p>
                    )}

                    {!isExternal && (
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-electric">
                        <Link href={linkHref} className="hover:underline">
                          Read Press Release
                        </Link>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center"
        >
          <p className="text-base font-semibold text-brand-navy font-[var(--font-sora)]">
            No news items found
          </p>
          <p className="mt-1 text-sm text-brand-gray-400">
            Try adjusting your search query or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
}
