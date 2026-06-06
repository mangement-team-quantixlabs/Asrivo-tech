"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import IndustryCard from "@/components/marketing/IndustryCard";
import { industries } from "@/lib/constants";

export default function IndustriesPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">Industries</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">
            Deep domain{" "}
            <span className="bg-gradient-to-r from-brand-teal to-brand-electric bg-clip-text text-transparent">expertise</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">We understand the unique challenges of your industry and deliver tailored solutions that create lasting impact.</p>
        </div>
      </section>
      <SectionWrapper id="all-industries" background="off-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.slug} title={industry.title} description={industry.description} icon={industry.icon} href={`/industries/${industry.slug}`} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
