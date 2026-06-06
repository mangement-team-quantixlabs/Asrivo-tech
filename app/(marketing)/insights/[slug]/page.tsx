import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">← All Insights</Link>
          <span className="inline-block rounded-full bg-brand-electric/20 px-3 py-1 text-xs font-medium text-brand-teal mb-4">Technology</span>
          <h1 className="text-3xl font-bold text-white font-[var(--font-sora)] sm:text-4xl lg:text-5xl leading-tight">{title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Dr. Sarah Chen</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> May 15, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 8 min read</span>
          </div>
        </div>
      </section>
      <SectionWrapper id="content" background="white">
        <article className="prose prose-lg mx-auto max-w-3xl text-brand-gray-700">
          <p className="text-lg leading-relaxed text-brand-gray-400">This blog post content will be dynamically loaded from Supabase in the next phase. The rich text content will be stored as Tiptap JSON blocks and rendered here.</p>
          <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)] mt-8">Introduction</h2>
          <p className="text-base leading-relaxed text-brand-gray-400 mt-4">The landscape of enterprise technology is rapidly evolving. Organizations that embrace innovation are seeing transformative results across their operations, customer experiences, and bottom lines.</p>
          <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)] mt-8">Key Takeaways</h2>
          <ul className="mt-4 space-y-2">
            {["Enterprises adopting AI see 30-40% efficiency gains", "Cloud-native architectures reduce time-to-market by 3x", "Zero-trust security is now a board-level priority", "Data-driven decisions outperform intuition by 23%"].map((item) => (
              <li key={item} className="flex items-start gap-2 text-base text-brand-gray-400"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0" />{item}</li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl border border-border bg-brand-off-white p-8 text-center">
            <h3 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Want to learn more?</h3>
            <p className="mt-2 text-sm text-brand-gray-400">Talk to our experts about how these insights apply to your business.</p>
            <Link href="/contact" className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-semibold text-white hover:bg-brand-orange/90">
              Contact Us <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      </SectionWrapper>
    </>
  );
}
