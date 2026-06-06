import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = { title: "Case Study" };

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">← All Case Studies</Link>
          <h1 className="text-3xl font-bold text-white font-[var(--font-sora)] sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-white/60">This case study will be powered by Supabase data in the next phase.</p>
        </div>
      </section>

      <SectionWrapper id="detail" background="white">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Challenge</h2>
            <p className="mt-3 text-base text-brand-gray-400 leading-relaxed">The client needed to modernize legacy systems while maintaining zero downtime and regulatory compliance across multiple regions.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Solution</h2>
            <p className="mt-3 text-base text-brand-gray-400 leading-relaxed">ASCIRVO designed and implemented a cloud-native architecture with automated compliance monitoring and real-time performance optimization.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Results</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[{ stat: "40%", label: "Cost Reduction" }, { stat: "99.9%", label: "Uptime" }, { stat: "3x", label: "Faster Deployment" }].map((r) => (
                <div key={r.label} className="rounded-xl border border-border bg-brand-off-white p-5 text-center">
                  <div className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">{r.stat}</div>
                  <div className="mt-1 text-sm text-brand-gray-400">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center pt-8">
            <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-orange px-8 text-sm font-semibold text-white hover:bg-brand-orange/90 active:scale-[0.98]">
              Achieve Similar Results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
