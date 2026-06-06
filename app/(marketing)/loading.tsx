/**
 * loading.tsx — Next.js Route-Level Loading UI
 *
 * Next.js App Router automatically renders this file as a Suspense fallback
 * whenever the marketing route group is navigating or server components are
 * streaming. No manual wiring needed — this is zero-config loading state.
 *
 * Architecture:
 * - Each skeleton section mirrors the EXACT structure & box model of its
 *   real counterpart, guaranteeing Zero CLS when real content paints.
 * - Shimmer animation is GPU-accelerated (transform only, no repaints).
 * - aria-busy + aria-hidden on containers, sr-only live region for a11y.
 */

import SectionWrapper from "@/components/layout/SectionWrapper";
import {
  HeroSkeleton,
  TrustedBySkeleton,
  ServiceCardSkeleton,
  CaseStudyCardSkeleton,
  BlogCardSkeleton,
  TestimonialSkeleton,
} from "@/components/ui/card-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    /*
     * Outer wrapper: aria-busy signals "page in progress" to AT.
     * aria-hidden is NOT set here so the live region inside is announced.
     */
    <div aria-busy="true" role="main">
      {/* ── Visually hidden live region for screen readers ── */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Loading page content, please wait…
      </span>

      {/* ══════════════════════════════════════
          1. Hero Section Skeleton
          ══════════════════════════════════════ */}
      <HeroSkeleton />

      {/* ══════════════════════════════════════
          2. Trusted By Marquee Skeleton
          ══════════════════════════════════════ */}
      <TrustedBySkeleton />

      {/* ══════════════════════════════════════
          3. Services Section Skeleton
          Mirrors: ServicesSection — 6 cards in a 3-col grid
          ══════════════════════════════════════ */}
      <SectionWrapper id="services-skeleton" background="off-white" animate={false}>
        {/* Section heading skeleton */}
        <div className="text-center" aria-hidden="true">
          <Skeleton className="mx-auto h-3.5 w-20 rounded-md" />
          <Skeleton className="mx-auto mt-3 h-10 w-96 max-w-full rounded-xl" />
          <div className="mx-auto mt-4 flex max-w-2xl flex-col items-center gap-1.5">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════
          4. Case Studies Section Skeleton
          Mirrors: CaseStudiesSection — 3 cards in a 3-col grid
          ══════════════════════════════════════ */}
      <SectionWrapper id="case-studies-skeleton" background="white" animate={false}>
        <div className="text-center" aria-hidden="true">
          <Skeleton className="mx-auto h-3.5 w-28 rounded-md" />
          <Skeleton className="mx-auto mt-3 h-10 w-80 max-w-full rounded-xl" />
          <div className="mx-auto mt-4 flex max-w-2xl flex-col items-center gap-1.5">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <CaseStudyCardSkeleton key={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════
          5. Insights Section Skeleton
          Mirrors: InsightsSection — 3 blog cards
          ══════════════════════════════════════ */}
      <SectionWrapper id="insights-skeleton" background="off-white" animate={false}>
        <div className="text-center" aria-hidden="true">
          <Skeleton className="mx-auto h-3.5 w-48 rounded-md" />
          <Skeleton className="mx-auto mt-3 h-10 w-72 max-w-full rounded-xl" />
          <div className="mx-auto mt-4 flex max-w-2xl flex-col items-center gap-1.5">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════
          6. Testimonials Section Skeleton
          Mirrors: TestimonialsSection — single testimonial card
          ══════════════════════════════════════ */}
      <SectionWrapper id="testimonials-skeleton" background="white" animate={false}>
        <div className="text-center mb-4" aria-hidden="true">
          <Skeleton className="mx-auto h-3.5 w-36 rounded-md" />
          <Skeleton className="mx-auto mt-3 h-10 w-72 max-w-full rounded-xl" />
        </div>

        <div className="mx-auto max-w-4xl mt-10" aria-hidden="true">
          <TestimonialSkeleton />
        </div>
      </SectionWrapper>

      {/* ══════════════════════════════════════
          7. Careers CTA Skeleton (simple banner)
          ══════════════════════════════════════ */}
      <SectionWrapper id="careers-skeleton" background="off-white" animate={false}>
        <div
          className="flex flex-col items-center gap-6 rounded-2xl bg-brand-navy/5 p-10 text-center sm:flex-row sm:text-left sm:gap-10 sm:p-14"
          aria-hidden="true"
        >
          <div className="flex-1 flex flex-col gap-3">
            <Skeleton className="h-8 w-64 max-w-full rounded-xl" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
          <Skeleton className="h-12 w-36 flex-shrink-0 rounded-full" />
        </div>
      </SectionWrapper>
    </div>
  );
}
