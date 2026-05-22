import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Latest news, press releases, and media coverage from ASCIRVO.",
};

const news = [
  { headline: "ASCIRVO Named a Top Digital Transformation Partner for 2026", type: "Award", date: "May 12, 2026", summary: "Recognized by leading industry analysts for excellence in enterprise digital transformation consulting and delivery." },
  { headline: "ASCIRVO Expands APAC Operations with New Singapore Office", type: "Press Release", date: "Apr 25, 2026", summary: "New Asia-Pacific headquarters to serve growing demand for AI and cloud solutions in the region." },
  { headline: "ASCIRVO Partners with Leading Cloud Provider for Enterprise Solutions", type: "Announcement", date: "Apr 10, 2026", summary: "Strategic partnership to deliver next-generation cloud-native solutions for enterprise clients globally." },
  { headline: "ASCIRVO AI Platform Featured in Industry Report", type: "Media Coverage", date: "Mar 28, 2026", summary: "Our AI-powered fraud detection platform highlighted as a breakthrough solution in financial services." },
  { headline: "ASCIRVO Achieves SOC 2 Type II Certification", type: "Announcement", date: "Mar 15, 2026", summary: "Demonstrating our commitment to the highest standards of security and data protection for our clients." },
  { headline: "ASCIRVO Crosses 500 Enterprise Clients Milestone", type: "Press Release", date: "Feb 20, 2026", summary: "A milestone achievement reflecting a decade of delivering measurable business outcomes for enterprises worldwide." },
];

const typeColors: Record<string, string> = {
  "Award": "bg-brand-orange/10 text-brand-orange",
  "Press Release": "bg-brand-electric/10 text-brand-electric",
  "Announcement": "bg-brand-teal/10 text-brand-teal",
  "Media Coverage": "bg-brand-success/10 text-brand-success",
};

export default function NewsroomPage() {
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
        <div className="space-y-4">
          {news.map((item) => (
            <article key={item.headline} className="group rounded-2xl border border-border bg-white p-6 transition-all hover:border-brand-electric/20 hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${typeColors[item.type] || "bg-brand-gray-100 text-brand-gray-400"}`}>{item.type}</span>
                <span className="flex items-center gap-1.5 text-xs text-brand-gray-400"><Calendar className="h-3 w-3" />{item.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-navy font-[var(--font-sora)] group-hover:text-brand-electric transition-colors">{item.headline}</h3>
              <p className="mt-2 text-sm text-brand-gray-400 leading-relaxed">{item.summary}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
