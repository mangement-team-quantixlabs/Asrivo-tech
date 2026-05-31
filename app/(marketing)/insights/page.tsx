import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";
import BlogList from "@/components/marketing/BlogList";
import { getPublishedBlogPosts } from "@/lib/supabase/queries";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description: "Stay informed with cutting-edge perspectives on AI, Cloud, Security, and Digital Transformation from ASCIRVO experts.",
};

const fallbackPosts: BlogPost[] = [
  {
    id: "fallback-1",
    title: "How Generative AI Is Reshaping Enterprise Software Development",
    slug: "generative-ai-enterprise-software",
    excerpt: "Explore how LLMs and code generation tools are transforming the way enterprises build software.",
    category: "AI",
    author_name: "Dr. Sarah Chen",
    published_at: "2026-05-15T00:00:00Z",
    read_time_minutes: 8,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    title: "Zero Trust Architecture: A CISO's Complete Implementation Guide",
    slug: "zero-trust-architecture-guide",
    excerpt: "A step-by-step blueprint for implementing zero-trust security across your organization.",
    category: "Security",
    author_name: "James Mitchell",
    published_at: "2026-05-10T00:00:00Z",
    read_time_minutes: 12,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    title: "Multi-Cloud Strategy: Avoiding Vendor Lock-In in 2026",
    slug: "multi-cloud-strategy-2026",
    excerpt: "Learn proven strategies for building resilient multi-cloud architectures.",
    category: "Cloud",
    author_name: "Priya Sharma",
    published_at: "2026-05-05T00:00:00Z",
    read_time_minutes: 6,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-4",
    title: "The Data Lakehouse Revolution: Why It Matters for Your Business",
    slug: "data-lakehouse-revolution",
    excerpt: "Understanding the convergence of data lakes and data warehouses for modern analytics.",
    category: "Data",
    author_name: "David Okonkwo",
    published_at: "2026-04-28T00:00:00Z",
    read_time_minutes: 10,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-5",
    title: "Building Resilient Microservices at Enterprise Scale",
    slug: "resilient-microservices",
    excerpt: "Patterns and practices for designing fault-tolerant distributed systems.",
    category: "Engineering",
    author_name: "Lisa Wang",
    published_at: "2026-04-20T00:00:00Z",
    read_time_minutes: 9,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-6",
    title: "Digital Twins in Manufacturing: A Practical Guide",
    slug: "digital-twins-manufacturing",
    excerpt: "How digital twin technology is transforming factory operations and maintenance.",
    category: "Industry News",
    author_name: "Rajesh Kumar",
    published_at: "2026-04-15T00:00:00Z",
    read_time_minutes: 7,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
];

export default async function InsightsPage() {
  const posts = await getPublishedBlogPosts();
  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">Thought Leadership</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">Insights & Blog</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">Cutting-edge perspectives on technology, strategy, and digital transformation from our experts.</p>
        </div>
      </section>
      <SectionWrapper id="posts" background="off-white">
        <BlogList initialPosts={displayPosts} />
      </SectionWrapper>
    </>
  );
}
