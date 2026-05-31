import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";
import NewsroomList from "@/components/marketing/NewsroomList";
import { getPublishedNewsroomPosts } from "@/lib/supabase/queries";
import type { NewsroomPost } from "@/types";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Latest news, press releases, and media coverage from ASCIRVO.",
};

const fallbackNews: NewsroomPost[] = [
  {
    id: "fallback-news-1",
    headline: "ASCIRVO Named a Top Digital Transformation Partner for 2026",
    slug: "ascirvo-top-partner-2026",
    type: "award",
    source: "Global Tech Review",
    source_url: "https://example.com/awards",
    summary: "Recognized by leading industry analysts for excellence in enterprise digital transformation consulting and delivery.",
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-news-2",
    headline: "ASCIRVO Expands APAC Operations with New Singapore Office",
    slug: "ascirvo-expands-singapore",
    type: "press_release",
    source: "ASCIRVO PR Team",
    summary: "New Asia-Pacific headquarters to serve growing demand for AI and cloud solutions in the region.",
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-news-3",
    headline: "ASCIRVO Partners with Leading Cloud Provider for Enterprise Solutions",
    slug: "ascirvo-cloud-partnership",
    type: "announcement",
    source: "ASCIRVO Alliances Team",
    summary: "Strategic partnership to deliver next-generation cloud-native solutions for enterprise clients globally.",
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-news-4",
    headline: "ASCIRVO AI Platform Featured in Industry Report",
    slug: "ascirvo-ai-platform-featured",
    type: "media_coverage",
    source: "Modern Tech Journal",
    source_url: "https://example.com/media",
    summary: "Our AI-powered fraud detection platform highlighted as a breakthrough solution in financial services.",
    is_published: true,
    created_at: "",
    updated_at: "",
  },
];

export default async function NewsroomPage() {
  const posts = await getPublishedNewsroomPosts();
  const displayNews = posts.length > 0 ? posts : fallbackNews;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">Press & Media</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">Newsroom</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">Latest news, press releases, and media coverage from ASCIRVO.</p>
        </div>
      </section>
      <SectionWrapper id="news" background="off-white">
        <NewsroomList initialPosts={displayNews} />
      </SectionWrapper>
    </>
  );
}
