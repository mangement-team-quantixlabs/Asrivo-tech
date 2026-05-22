import { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = {
  title: "Technology Partners",
  description: "ASCIRVO partners with leading technology companies to deliver best-in-class solutions to our clients.",
};

const partners = [
  { name: "Amazon Web Services", category: "Cloud", tier: "Advanced Partner" },
  { name: "Microsoft Azure", category: "Cloud", tier: "Gold Partner" },
  { name: "Google Cloud", category: "Cloud", tier: "Partner" },
  { name: "Snowflake", category: "Data", tier: "Select Partner" },
  { name: "Databricks", category: "Data", tier: "Partner" },
  { name: "CrowdStrike", category: "Security", tier: "Alliance Partner" },
  { name: "Palo Alto Networks", category: "Security", tier: "Partner" },
  { name: "HashiCorp", category: "Infrastructure", tier: "Technology Partner" },
  { name: "MongoDB", category: "Database", tier: "Partner" },
  { name: "Confluent", category: "Data Streaming", tier: "Partner" },
  { name: "Okta", category: "Identity", tier: "Partner" },
  { name: "Vercel", category: "Platform", tier: "Agency Partner" },
];

export default function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">Ecosystem</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">Technology Partners</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">We partner with industry-leading technology companies to deliver best-in-class solutions.</p>
        </div>
      </section>

      <SectionWrapper id="partners-grid" background="off-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {partners.map((p) => (
            <div key={p.name} className="group rounded-2xl border border-border bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg hover:border-brand-electric/20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy/5 text-brand-navy font-bold text-xl font-[var(--font-sora)]">
                {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-brand-navy">{p.name}</h3>
              <p className="text-xs text-brand-electric mt-1">{p.tier}</p>
              <span className="mt-2 inline-block rounded-full bg-brand-off-white px-3 py-0.5 text-xs text-brand-gray-400">{p.category}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
