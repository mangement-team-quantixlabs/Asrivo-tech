import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";
import BlogCard from "@/components/marketing/BlogCard";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description: "Stay informed with cutting-edge perspectives on AI, Cloud, Security, and Digital Transformation from ASCIRVO experts.",
};

const posts = [
  { title: "How Generative AI Is Reshaping Enterprise Software Development", excerpt: "Explore how LLMs and code generation tools are transforming the way enterprises build software.", category: "AI", author: "Dr. Sarah Chen", date: "May 15, 2026", readTime: "8 min read", href: "/insights/generative-ai-enterprise-software" },
  { title: "Zero Trust Architecture: A CISO's Complete Implementation Guide", excerpt: "A step-by-step blueprint for implementing zero-trust security across your organization.", category: "Security", author: "James Mitchell", date: "May 10, 2026", readTime: "12 min read", href: "/insights/zero-trust-architecture-guide" },
  { title: "Multi-Cloud Strategy: Avoiding Vendor Lock-In in 2026", excerpt: "Learn proven strategies for building resilient multi-cloud architectures.", category: "Cloud", author: "Priya Sharma", date: "May 5, 2026", readTime: "6 min read", href: "/insights/multi-cloud-strategy-2026" },
  { title: "The Data Lakehouse Revolution: Why It Matters for Your Business", excerpt: "Understanding the convergence of data lakes and data warehouses for modern analytics.", category: "Data", author: "David Okonkwo", date: "Apr 28, 2026", readTime: "10 min read", href: "/insights/data-lakehouse-revolution" },
  { title: "Building Resilient Microservices at Enterprise Scale", excerpt: "Patterns and practices for designing fault-tolerant distributed systems.", category: "Engineering", author: "Lisa Wang", date: "Apr 20, 2026", readTime: "9 min read", href: "/insights/resilient-microservices" },
  { title: "Digital Twins in Manufacturing: A Practical Guide", excerpt: "How digital twin technology is transforming factory operations and maintenance.", category: "Industry", author: "Rajesh Kumar", date: "Apr 15, 2026", readTime: "7 min read", href: "/insights/digital-twins-manufacturing" },
];

export default function InsightsPage() {
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (<BlogCard key={post.href} {...post} index={i} />))}
        </div>
      </SectionWrapper>
    </>
  );
}
