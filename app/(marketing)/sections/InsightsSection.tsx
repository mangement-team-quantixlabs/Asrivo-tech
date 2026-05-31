import SectionWrapper from "@/components/layout/SectionWrapper";
import BlogCard from "@/components/marketing/BlogCard";
import { getPublishedBlogPosts } from "@/lib/supabase/queries";

export default async function InsightsSection() {
  const posts = await getPublishedBlogPosts(3);

  const mappedPosts = posts.map(post => ({
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.category || "AI",
    author: post.author_name || "ASCIRVO Expert",
    date: post.published_at 
      ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : "Recent",
    readTime: `${post.read_time_minutes || 5} min read`,
    href: `/insights/${post.slug}`,
  }));

  const displayPosts = mappedPosts.length > 0 ? mappedPosts : [
    {
      title: "How Generative AI Is Reshaping Enterprise Software Development",
      excerpt: "Explore how LLMs and code generation tools are transforming the way enterprises build and maintain software at scale.",
      category: "AI",
      author: "Dr. Sarah Chen",
      date: "May 15, 2026",
      readTime: "8 min read",
      href: "/insights/generative-ai-enterprise-software",
    },
    {
      title: "Zero Trust Architecture: A CISO's Complete Implementation Guide",
      excerpt: "A step-by-step blueprint for implementing zero-trust security across your organization's infrastructure and applications.",
      category: "Security",
      author: "James Mitchell",
      date: "May 10, 2026",
      readTime: "12 min read",
      href: "/insights/zero-trust-architecture-guide",
    },
    {
      title: "Multi-Cloud Strategy: Avoiding Vendor Lock-In in 2026",
      excerpt: "Learn proven strategies for building resilient multi-cloud architectures that maximize flexibility and minimize risk.",
      category: "Cloud",
      author: "Priya Sharma",
      date: "May 5, 2026",
      readTime: "6 min read",
      href: "/insights/multi-cloud-strategy-2026",
    },
  ];

  return (
    <SectionWrapper id="insights" background="off-white">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
          Insights & Thought Leadership
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl lg:text-5xl">
          Latest from our experts
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-brand-gray-400 leading-relaxed">
          Stay informed with cutting-edge perspectives on technology, strategy, and digital transformation.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post, i) => (
          <BlogCard key={post.href} {...post} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
