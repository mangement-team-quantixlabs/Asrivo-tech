/**
 * card-skeletons.tsx
 *
 * Pixel-perfect skeleton placeholders for every card type in the site.
 * Each skeleton mirrors the EXACT CSS box model of its real counterpart:
 * — same padding, height, gap, border-radius, and grid structure
 * — ensures Zero CLS: the DOM does not resize when real data paints
 *
 * All shimmer animation is handled by .skeleton in globals.css
 * using transform: translateX (GPU-only, no repaint/reflow).
 */

import { Skeleton } from "@/components/ui/skeleton";

/* ─────────────────────────────────────────
   1. ServiceCard Skeleton
   Mirrors: components/marketing/ServiceCard.tsx
   Real card: rounded-2xl border bg-white p-6
   ───────────────────────────────────────── */
export function ServiceCardSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-white p-6"
      aria-hidden="true"
    >
      {/* Icon placeholder — matches h-12 w-12 rounded-xl mb-4 */}
      <Skeleton className="mb-4 h-12 w-12 rounded-xl" />

      {/* Title — matches text-lg font-semibold ~28px tall */}
      <Skeleton className="h-6 w-4/5 rounded-md" />

      {/* Description — matches text-sm leading-relaxed, 3 lines, mt-2 */}
      <div className="mt-3 flex flex-col gap-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-11/12 rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>

      {/* "Learn more" CTA — matches mt-4 h-4 w-24 */}
      <Skeleton className="mt-5 h-4 w-24 rounded-md" />
    </div>
  );
}

/* ─────────────────────────────────────────
   2. CaseStudyCard Skeleton
   Mirrors: components/marketing/CaseStudyCard.tsx
   Real card: rounded-2xl border bg-white
     Image: h-52 overflow-hidden
     Content: p-5
   ───────────────────────────────────────── */
export function CaseStudyCardSkeleton() {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
      aria-hidden="true"
    >
      {/* Image header — exact h-52 to match real card */}
      <Skeleton className="h-52 w-full rounded-none" />

      {/* Content — matches p-5 */}
      <div className="flex flex-1 flex-col p-5">
        {/* Client label — text-xs uppercase, ~16px */}
        <Skeleton className="h-3.5 w-1/3 rounded-md" />

        {/* Title — text-base font-semibold, 2 lines, mt-1.5 */}
        <div className="mt-2 flex flex-col gap-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-4/5 rounded-md" />
        </div>

        {/* "Read case study" CTA — mt-auto pt-4, h-3.5 w-28 */}
        <div className="mt-auto pt-5">
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   3. BlogCard (Insights) Skeleton
   Mirrors: components/marketing/BlogCard.tsx
   Real card: rounded-2xl border bg-white
     Image: h-44
     Content: p-5, flex flex-col
     Meta: border-t mt-auto pt-4
   ───────────────────────────────────────── */
export function BlogCardSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
      aria-hidden="true"
    >
      {/* Cover image — exact h-44 */}
      <Skeleton className="h-44 w-full rounded-none" />

      {/* Content — matches p-5 */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title — text-base font-semibold, 2 lines */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-4/5 rounded-md" />
        </div>

        {/* Excerpt — text-sm, 2 lines, mt-2 */}
        <div className="mt-2.5 flex flex-col gap-1.5">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-10/12 rounded-md" />
        </div>

        {/* Meta row — border-t, mt-auto pt-4, flex justify-between */}
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <Skeleton className="h-3.5 w-28 rounded-md" />
          <Skeleton className="h-3.5 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   4. Testimonial Skeleton
   Mirrors: components/marketing/TestimonialSlider.tsx
   Real card: max-w-4xl, quote block + author
   ───────────────────────────────────────── */
export function TestimonialSkeleton() {
  return (
    <div
      className="w-full rounded-2xl border border-border bg-white p-8 md:p-10"
      aria-hidden="true"
    >
      {/* Quote mark placeholder */}
      <Skeleton className="mb-6 h-8 w-10 rounded-md" />

      {/* Quote text — 4 lines */}
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-11/12 rounded-md" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
      </div>

      {/* Author row — avatar + name/title, mt-8 */}
      <div className="mt-8 flex items-center gap-4">
        {/* Avatar circle */}
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3.5 w-48 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   5. TrustedBy Logo Marquee Skeleton
   Mirrors: app/(marketing)/sections/TrustedBy.tsx
   Shows a row of logo pill placeholders
   ───────────────────────────────────────── */
export function TrustedBySkeleton() {
  return (
    <div className="border-b border-border bg-white py-12" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* "Trusted by..." label */}
        <Skeleton className="mx-auto h-3 w-48 rounded-md" />
      </div>

      {/* Logo row — 8 pill placeholders */}
      <div className="mt-8 flex items-center justify-center gap-10 overflow-hidden px-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-2.5 w-16 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   6. Hero Section Skeleton
   Mirrors: app/(marketing)/sections/HeroSection.tsx
   ───────────────────────────────────────── */
export function HeroSkeleton() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-[#C1BFFF]/30"
      aria-hidden="true"
    >
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <Skeleton className="h-7 w-64 rounded-full" />

          {/* Headline — 3 lines */}
          <div className="mt-6 flex flex-col gap-3">
            <Skeleton className="h-14 w-full rounded-xl sm:h-16 md:h-20" />
            <Skeleton className="h-14 w-4/5 rounded-xl sm:h-16 md:h-20" />
          </div>

          {/* Subtext */}
          <div className="mt-6 flex flex-col gap-2">
            <Skeleton className="h-5 w-full max-w-2xl rounded-md" />
            <Skeleton className="h-5 w-10/12 max-w-2xl rounded-md" />
            <Skeleton className="h-5 w-3/4 max-w-2xl rounded-md" />
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Skeleton className="h-13 w-44 rounded-full" />
            <Skeleton className="h-13 w-44 rounded-full" />
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-gray-200 pt-10 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
