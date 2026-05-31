import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getNewsroomPostBySlug } from "@/lib/supabase/queries";
import ShareButtons from "@/components/marketing/ShareButtons";
import type { NewsroomPost } from "@/types";

const fallbackNewsDetails: Record<string, NewsroomPost> = {
  "ascirvo-expands-singapore": {
    id: "fallback-news-2",
    headline: "ASCIRVO Expands APAC Operations with New Singapore Office",
    slug: "ascirvo-expands-singapore",
    type: "press_release",
    source: "ASCIRVO PR Team",
    summary: "New Asia-Pacific headquarters to serve growing demand for AI and cloud solutions in the region.",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Scaling to Meet Growing Demand in APAC" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Singapore, May 2026 — ASCIRVO, a global leader in enterprise digital transformation and IT consulting services, today announced the opening of its new regional headquarters in Singapore. The office will serve as the hub for ASCIRVO's expansion in the Asia-Pacific region, driving localized delivery of AI/ML engineering, multi-cloud modernization, and zero-trust cybersecurity operations.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Addressing Local Market Demand" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The new Singapore team will focus on accelerating digital transformations for clients across financial services, high-tech manufacturing, and logistics. By expanding operations, ASCIRVO aims to provide direct local engineering expertise, helping companies design and build secure, scalable solutions tailored to their exact compliance and operational requirements.",
            },
          ],
        },
      ],
    },
    is_published: true,
    created_at: "",
    updated_at: "",
    published_at: "2026-04-25T00:00:00Z",
  },
  "ascirvo-cloud-partnership": {
    id: "fallback-news-3",
    headline: "ASCIRVO Partners with Leading Cloud Provider for Enterprise Solutions",
    slug: "ascirvo-cloud-partnership",
    type: "announcement",
    source: "ASCIRVO Alliances Team",
    summary: "Strategic partnership to deliver next-generation cloud-native solutions for enterprise clients globally.",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Strengthening Enterprise Cloud Capabilities" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "San Francisco, April 2026 — ASCIRVO is proud to announce a new tier-one strategic partnership with major global cloud hyperscalers. This alliance enables joint co-innovation labs, custom architecture accelerators, and deep engineering collaborations to help mutual enterprise customers migrate safely and run workloads at lower cost.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Through this partnership, ASCIRVO will gain early access to preview cloud services and dedicated partner support channels, ensuring client infrastructures remain highly optimized and secure under the highest industry standards.",
            },
          ],
        },
      ],
    },
    is_published: true,
    created_at: "",
    updated_at: "",
    published_at: "2026-04-10T00:00:00Z",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getNewsroomPostBySlug(slug)) || fallbackNewsDetails[slug];
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.headline} | ASCIRVO Newsroom`,
    description: post.summary,
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
        This article has no content.
      </p>
    );
  }

  return content.content.map((block: TiptapContentNode, idx: number) => {
    switch (block.type) {
      case "heading": {
        const HeadingTag = `h${block.attrs?.level || 2}` as "h2" | "h3" | "h4";
        const text = block.content?.map((c: TiptapContentNode) => c.text).join("") || "";
        return (
          <HeadingTag
            key={idx}
            className="text-2xl font-bold text-brand-navy font-[var(--font-sora)] mt-8 mb-4"
          >
            {text}
          </HeadingTag>
        );
      }
      case "paragraph": {
        const text = block.content?.map((c: TiptapContentNode) => c.text).join("") || "";
        return (
          <p key={idx} className="text-base leading-relaxed text-brand-gray-700 mt-4">
            {text}
          </p>
        );
      }
      default:
        return null;
    }
  });
}


export default async function NewsroomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getNewsroomPostBySlug(slug)) || fallbackNewsDetails[slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/newsroom"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6"
          >
            ← Back to Newsroom
          </Link>
          <span className="inline-block rounded-full bg-brand-electric/20 px-3 py-1 text-xs font-semibold text-brand-teal mb-4 uppercase tracking-wider">
            {post.type.replace("_", " ")}
          </span>
          <h1 className="text-3xl font-bold text-white font-[var(--font-sora)] sm:text-4xl lg:text-5xl leading-tight">
            {post.headline}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent"}
            </span>
            {post.source && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Source: {post.source}
              </span>
            )}
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
            <ShareButtons title={post.headline} />
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-brand-off-white p-8 text-center">
            <h3 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">
              Media Inquiries
            </h3>
            <p className="mt-2 text-sm text-brand-gray-400">
              For interviews, press assets, or other media inquiries, please reach out to our team.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-semibold text-white hover:bg-brand-orange/90"
            >
              Contact PR Team <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
