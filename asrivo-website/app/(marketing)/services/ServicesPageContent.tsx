"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ServiceCard from "@/components/marketing/ServiceCard";
import { services } from "@/lib/constants";

export default function ServicesPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">Our Services</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">
            Technology solutions that{" "}
            <span className="bg-gradient-to-r from-brand-teal to-brand-electric bg-clip-text text-transparent">drive results</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">From AI-powered automation to enterprise cloud migration, we deliver end-to-end technology solutions tailored to your business challenges.</p>
        </div>
      </section>
      <SectionWrapper id="all-services" background="off-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} title={service.title} description={service.description} icon={service.icon} href={`/services/${service.slug}`} gradient={service.color} index={i} />
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper id="services-cta" background="navy">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white font-[var(--font-sora)] md:text-4xl">Not sure which service fits your needs?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">Talk to our experts for a free consultation. We&apos;ll help you identify the right solutions for your business.</p>
          <Link href="/contact" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand-orange px-8 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-xl hover:shadow-brand-orange/25 active:scale-[0.98]">
            Start a Conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
