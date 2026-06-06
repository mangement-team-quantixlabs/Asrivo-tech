import { Metadata } from "next";
import { Eye, Target, Compass, Lightbulb } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "ASCIRVO's vision and mission — engineering tomorrow's digital enterprise with innovation, integrity, and measurable impact.",
};

export default function VisionMissionPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">
            Our Purpose
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">
            Vision & Mission
          </h1>
        </div>
      </section>

      <SectionWrapper id="vision" background="white">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-brand-navy to-brand-midnight p-8 lg:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-teal/20 text-brand-teal">
              <Eye className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white font-[var(--font-sora)]">Our Vision</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70 italic">
              &ldquo;To be the digital face of ASCIRVO — a platform that earns trust, drives enquiries,
              and reflects world-class engineering capability.&rdquo;
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 lg:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-gray-400">
              To empower enterprises worldwide with innovative technology solutions that drive
              measurable business outcomes, foster digital transformation, and create lasting
              competitive advantage.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="principles" background="off-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">Guiding Principles</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, title: "Excellence", desc: "We pursue excellence in every line of code, every client interaction, and every solution we deliver." },
            { icon: Lightbulb, title: "Innovation", desc: "We embrace emerging technologies and creative problem-solving to stay ahead of the curve." },
            { icon: Compass, title: "Integrity", desc: "We operate with transparency, honesty, and accountability in everything we do." },
            { icon: Eye, title: "Impact", desc: "We measure success by the tangible business outcomes we create for our clients." },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-2xl border border-border bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-navy font-[var(--font-sora)]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray-400">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
