"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import ServiceCard from "@/components/marketing/ServiceCard";
import { services } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" background="off-white">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
          What We Do
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl lg:text-5xl">
          Services that drive{" "}
          <span className="bg-gradient-to-r from-brand-electric to-brand-teal bg-clip-text text-transparent">
            real impact
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-brand-gray-400 leading-relaxed">
          From AI-powered automation to enterprise cloud migration, we deliver
          end-to-end technology solutions tailored to your business.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={`/services/${service.slug}`}
            gradient={service.color}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
