import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Globe, Users } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = {
  title: "About ASCIRVO",
  description:
    "Learn about ASCIRVO — a world-class IT services and digital transformation company with 10+ years of engineering excellence across 15+ countries.",
};

const values = [
  {
    icon: Target,
    title: "Outcome-Driven",
    description: "Every engagement starts with clear success metrics. We measure what matters and deliver transparent results.",
  },
  {
    icon: Eye,
    title: "Innovation First",
    description: "Our R&D teams stay ahead of emerging technologies so your business leads, not follows.",
  },
  {
    icon: Heart,
    title: "Client Partnership",
    description: "We don't just deliver projects — we become strategic partners invested in your long-term success.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "With delivery centers across 15+ countries, we provide 24/7 support with local expertise.",
  },
];

const milestones = [
  { year: "2016", event: "ASCIRVO founded with a vision to redefine IT services" },
  { year: "2018", event: "Expanded to 5 countries with 50+ enterprise clients" },
  { year: "2020", event: "Launched AI & Cloud practices, crossed 200+ clients" },
  { year: "2022", event: "Recognized as a top digital transformation partner" },
  { year: "2024", event: "500+ clients across 15+ countries, 200+ engineers" },
  { year: "2026", event: "Industry leader in AI, Cloud, and Cybersecurity solutions" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20 lg:pb-28">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-teal/5 blur-[100px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">
            About Us
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">
            Engineering excellence,{" "}
            <span className="bg-gradient-to-r from-brand-teal to-brand-electric bg-clip-text text-transparent">
              global impact
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
            ASCIRVO is a world-class IT services and digital transformation company
            trusted by 500+ enterprises across 15+ countries. We combine deep technical
            expertise with industry knowledge to deliver measurable business outcomes.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <SectionWrapper id="our-story" background="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
              Our Story
            </span>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">
              A decade of transforming enterprises
            </h2>
            <p className="mt-4 text-base text-brand-gray-400 leading-relaxed">
              Founded in 2016, ASCIRVO began with a simple mission: to bridge the gap between
              cutting-edge technology and real business impact. What started as a small team
              of passionate engineers has grown into a global force of 200+ experts delivering
              enterprise-grade solutions across AI, Cloud, Cybersecurity, and Digital Transformation.
            </p>
            <p className="mt-4 text-base text-brand-gray-400 leading-relaxed">
              Today, we serve Fortune 500 companies and fast-growing startups alike, helping them
              navigate the complexities of digital transformation with confidence and clarity.
            </p>
          </div>
          <div className="space-y-4">
            {milestones.map((m) => (
              <div key={m.year} className="flex items-start gap-4 rounded-xl border border-border p-4 transition-all hover:border-brand-electric/20 hover:shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white font-bold text-sm font-[var(--font-sora)]">
                  {m.year.slice(2)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-brand-electric">{m.year}</div>
                  <div className="mt-0.5 text-sm text-brand-gray-700">{m.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper id="values" background="off-white">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
            Our Values
          </span>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">
            What drives us every day
          </h2>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="group text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-electric text-white transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-brand-navy font-[var(--font-sora)]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray-400">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper id="stats" background="navy">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: "500+", label: "Clients Worldwide" },
            { value: "15+", label: "Countries" },
            { value: "200+", label: "Engineers & Experts" },
            { value: "98%", label: "Client Retention" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-white font-[var(--font-sora)]">{stat.value}</div>
              <div className="mt-2 text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Quick Links */}
      <SectionWrapper id="explore" background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">
            Learn more about ASCIRVO
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { title: "Leadership Team", description: "Meet the experts driving our vision forward", href: "/about/leadership", icon: Users },
            { title: "Vision & Mission", description: "Our guiding principles and strategic direction", href: "/about/vision-mission", icon: Eye },
            { title: "Global Presence", description: "Our offices and delivery centers worldwide", href: "/about/global-presence", icon: Globe },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-brand-electric/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-navy font-[var(--font-sora)] group-hover:text-brand-electric">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-gray-400">{item.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-electric opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
