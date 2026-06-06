"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import IndustryCard from "@/components/marketing/IndustryCard";
import { industries } from "@/lib/constants";

export default function IndustriesSection() {
  return (
    <SectionWrapper id="industries" background="white">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
          Industries
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl lg:text-5xl">
          Deep domain expertise
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-brand-gray-400 leading-relaxed">
          We understand your industry challenges and deliver tailored solutions that create lasting impact.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, i) => (
          <IndustryCard
            key={industry.slug}
            title={industry.title}
            description={industry.description}
            icon={industry.icon}
            href={`/industries/${industry.slug}`}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
