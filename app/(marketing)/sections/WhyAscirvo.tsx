"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { whyAscirvo } from "@/lib/constants";

export default function WhyAscirvo() {
  return (
    <SectionWrapper id="why-ascirvo" background="white">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
          Why Choose Us
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl lg:text-5xl">
          The ASCIRVO advantage
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-brand-gray-400 leading-relaxed">
          Four pillars that define how we deliver value to every client, every project.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {whyAscirvo.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div key={i} className="group text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-electric text-white transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-electric/20">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-brand-navy font-[var(--font-sora)]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray-400">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
