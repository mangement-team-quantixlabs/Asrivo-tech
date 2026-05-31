import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/supabase/queries";
import ShareButtons from "@/components/marketing/ShareButtons";
import BlogCard from "@/components/marketing/BlogCard";
import NewsletterForm from "@/components/forms/NewsletterForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | ASCIRVO`,
    description: post.excerpt,
  };
}

interface TiptapContentNode {
  type: string;
  text?: string;
  attrs?: {
    level?: number;
    [key: string]: unknown;
  };
  content?: TiptapContentNode[];
}

interface TiptapDoc {
  type: string;
  content?: TiptapContentNode[];
}

function renderContent(contentUnknown: unknown) {
  const content = contentUnknown as TiptapDoc | null | undefined;
  if (!content || !content.content) {
    return (
      <p className="text-lg leading-relaxed text-brand-gray-400">
        This blog post has no content.
      </p>
    );
  }

  return content.content.map((block: TiptapContentNode, idx: number) => {
    switch (block.type) {
      case 'heading': {
        const HeadingTag = `h${block.attrs?.level || 2}` as 'h2' | 'h3' | 'h4';
        const text = block.content?.map((c: TiptapContentNode) => c.text).join('') || '';
        return (
          <HeadingTag key={idx} className="text-2xl font-bold text-brand-navy font-[var(--font-sora)] mt-8 mb-4">
            {text}
          </HeadingTag>
        );
      }
      case 'paragraph': {
        const text = block.content?.map((c: TiptapContentNode) => c.text).join('') || '';
        return (
          <p key={idx} className="text-base leading-relaxed text-brand-gray-400 mt-4">
            {text}
          </p>
        );
      }
      default:
        return null;
    }
  });
}


export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const allPosts = await getPublishedBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .filter(p => p.category === post.category)
    .slice(0, 3);

  if (relatedPosts.length < 3) {
    const filled = allPosts
      .filter(p => p.slug !== slug && !relatedPosts.some(rp => rp.id === p.id))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...filled);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">← All Insights</Link>
          <span className="inline-block rounded-full bg-brand-electric/20 px-3 py-1 text-xs font-medium text-brand-teal mb-4">{post.category}</span>
          <h1 className="text-3xl font-bold text-white font-[var(--font-sora)] sm:text-4xl lg:text-5xl leading-tight">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {post.author_name || "ASCIRVO Expert"}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> 
              {post.published_at 
                ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : "Recent"}
            </span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.read_time_minutes || 5} min read</span>
          </div>
        </div>
      </section>
      
      <SectionWrapper id="content" background="white">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-lg text-brand-gray-700">
            {renderContent(post.content)}
          </article>

          {/* Share Buttons */}
          <div className="mt-10 border-t border-b border-border/80 py-4 flex items-center justify-between">
            <ShareButtons title={post.title} />
          </div>

          {/* Newsletter CTA Block */}
          <div className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-brand-navy to-brand-midnight p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-electric/5 blur-[80px]" />
            <div className="relative z-[1] flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md">
                <h3 className="text-xl font-bold font-[var(--font-sora)]">Stay ahead of the curve</h3>
                <p className="mt-2 text-sm text-white/60">Get industry insights, tech trends, and ASCIRVO news delivered to your inbox.</p>
              </div>
              <NewsletterForm source="blog-post" variant="inline" className="w-full md:max-w-xs" />
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-brand-off-white p-8 text-center">
            <h3 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Want to learn more?</h3>
            <p className="mt-2 text-sm text-brand-gray-400">Talk to our experts about how these insights apply to your business.</p>
            <Link href="/contact" className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-semibold text-white hover:bg-brand-orange/90">
              Contact Us <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <SectionWrapper id="related-posts" background="off-white" className="border-t border-border">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)] mb-8">Related Insights</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rPost, i) => {
                const formattedDate = rPost.published_at 
                  ? new Date(rPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : "Recent";
                return (
                  <BlogCard 
                    key={rPost.id}
                    title={rPost.title}
                    excerpt={rPost.excerpt || ""}
                    category={rPost.category || "AI"}
                    author={rPost.author_name || "ASCIRVO Expert"}
                    date={formattedDate}
                    readTime={`${rPost.read_time_minutes || 5} min read`}
                    href={`/insights/${rPost.slug}`}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
