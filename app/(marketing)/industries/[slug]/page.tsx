import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { industries } from "@/lib/constants";

const industryDetails: Record<string, {
  challenges: string[];
  solutions: string[];
  stats: { value: string; label: string }[];
}> = {
  "banking-finance": {
    challenges: ["Regulatory compliance complexity", "Legacy system modernization", "Fraud detection at scale", "Customer experience expectations"],
    solutions: ["AI-powered fraud detection", "Cloud-native core banking", "Real-time compliance monitoring", "Omnichannel digital banking"],
    stats: [{ value: "94%", label: "Fraud detection accuracy" }, { value: "40%", label: "Cost reduction" }, { value: "3x", label: "Faster time to market" }],
  },
  "healthcare": {
    challenges: ["Data interoperability", "Patient privacy (HIPAA)", "Clinical decision support", "Telehealth scalability"],
    solutions: ["FHIR-compliant data platforms", "HIPAA-certified cloud infrastructure", "AI-assisted diagnostics", "Scalable telehealth solutions"],
    stats: [{ value: "60%", label: "Reduced wait times" }, { value: "99.9%", label: "Uptime achieved" }, { value: "45%", label: "Efficiency improvement" }],
  },
  "manufacturing": {
    challenges: ["Unplanned downtime", "Supply chain visibility", "Quality control", "Energy optimization"],
    solutions: ["IoT-driven predictive maintenance", "Real-time supply chain tracking", "Computer vision quality inspection", "Smart energy management"],
    stats: [{ value: "73%", label: "Downtime reduction" }, { value: "2x", label: "ROI exceeded" }, { value: "35%", label: "Energy savings" }],
  },
  "retail": {
    challenges: ["Omnichannel consistency", "Inventory optimization", "Customer personalization", "Last-mile delivery"],
    solutions: ["Unified commerce platforms", "AI-powered demand forecasting", "Real-time personalization engines", "Smart logistics optimization"],
    stats: [{ value: "28%", label: "Revenue increase" }, { value: "40%", label: "Cart abandonment reduction" }, { value: "50%", label: "Inventory accuracy" }],
  },
  "energy": {
    challenges: ["Grid modernization", "Renewable integration", "Predictive maintenance", "Regulatory compliance"],
    solutions: ["Smart grid platforms", "Renewable energy management", "Asset performance monitoring", "Automated compliance reporting"],
    stats: [{ value: "30%", label: "Grid efficiency gain" }, { value: "45%", label: "Maintenance cost reduction" }, { value: "25%", label: "Carbon reduction" }],
  },
  "government": {
    challenges: ["Citizen service delivery", "Data security", "Legacy modernization", "Inter-agency integration"],
    solutions: ["Digital citizen portals", "FedRAMP-compliant cloud", "API-driven modernization", "Secure data sharing platforms"],
    stats: [{ value: "60%", label: "Service delivery speedup" }, { value: "99.9%", label: "Security compliance" }, { value: "40%", label: "Cost savings" }],
  },
};

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  const details = industryDetails[slug];
  if (!industry || !details) notFound();
  const Icon = industry.icon;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">← All Industries</Link>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-teal/20 text-brand-teal mb-4"><Icon className="h-7 w-7" /></div>
          <h1 className="text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">{industry.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">{industry.description}</p>
        </div>
      </section>

      {/* Stats */}
      <SectionWrapper id="stats" background="white">
        <div className="grid grid-cols-3 gap-6 text-center">
          {details.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border p-6">
              <div className="text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">{s.value}</div>
              <div className="mt-2 text-sm text-brand-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Challenges & Solutions */}
      <SectionWrapper id="challenges" background="off-white">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-orange">Industry Challenges</span>
            <h2 className="mt-3 text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Pain points we solve</h2>
            <div className="mt-6 space-y-3">
              {details.challenges.map((c) => (
                <div key={c} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
                  <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm text-brand-gray-700">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-teal">Our Solutions</span>
            <h2 className="mt-3 text-2xl font-bold text-brand-navy font-[var(--font-sora)]">How ASCIRVO helps</h2>
            <div className="mt-6 space-y-3">
              {details.solutions.map((s) => (
                <div key={s} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  <span className="text-sm text-brand-gray-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="cta" background="navy">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white font-[var(--font-sora)] md:text-4xl">Talk to a domain specialist</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">Let&apos;s discuss how we can solve your {industry.title.toLowerCase()} challenges.</p>
          <Link href="/contact" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand-orange px-8 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 active:scale-[0.98]">
            Contact a Specialist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
