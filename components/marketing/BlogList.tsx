"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
import type { BlogPost } from "@/types";

interface BlogListProps {
  initialPosts: BlogPost[];
}

const CATEGORIES = ["All", "AI", "Cloud", "Security", "Data", "Industry News", "Engineering"];

export default function BlogList({ initialPosts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-brand-electric text-white shadow-lg shadow-brand-electric/25"
                  : "bg-white border border-border text-brand-gray-700 hover:border-brand-electric/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm placeholder:text-brand-gray-400 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20 text-brand-gray-700 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-400" />
        </div>
      </div>

      {/* Grid List */}
      {filteredPosts.length > 0 ? (
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => {
              const formattedDate = post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard
                    title={post.title}
                    excerpt={post.excerpt || ""}
                    category={post.category || "AI"}
                    author={post.author_name || "ASCIRVO Expert"}
                    date={formattedDate}
                    readTime={`${post.read_time_minutes || 5} min read`}
                    href={`/insights/${post.slug}`}
                    index={i}
                  />
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
            No articles found
          </p>
          <p className="mt-1 text-sm text-brand-gray-400">
            Try adjusting your search query or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
}
