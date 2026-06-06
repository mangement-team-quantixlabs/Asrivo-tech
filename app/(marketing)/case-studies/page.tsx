import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore how ASCIRVO has helped enterprises achieve measurable transformation across industries.",
};

const caseStudies = [
  { title: "AI-Powered Fraud Detection for Global Banking Platform", client: "Major European Bank", stat: "94%", statLabel: "Fraud detection rate", industry: "Banking & Finance", href: "/case-studies/ai-fraud-detection", image: "/images/case-studies/banking-finance.png" },
  { title: "Cloud Migration & Modernization for Healthcare Provider", client: "Leading US Health Network", stat: "60%", statLabel: "Infrastructure cost reduction", industry: "Healthcare", href: "/case-studies/healthcare-cloud-migration", image: "/images/case-studies/healthcare.png" },
  { title: "Smart Factory IoT Platform for Manufacturing Giant", client: "Fortune 500 Manufacturer", stat: "3x", statLabel: "Operational efficiency gain", industry: "Manufacturing", href: "/case-studies/smart-factory-iot", image: "/images/case-studies/manufacturing.png" },
  { title: "Real-Time Personalization Engine for Retail Leader", client: "Global Retail Chain", stat: "28%", statLabel: "Revenue increase", industry: "Retail & E-Commerce", href: "/case-studies/retail-personalization" },
  { title: "Zero Trust Security Architecture for Financial Services", client: "FinServe Technologies", stat: "99.9%", statLabel: "Compliance achieved", industry: "Banking & Finance", href: "/case-studies/zero-trust-finserve" },
  { title: "Smart Grid Analytics Platform for Energy Utility", client: "National Energy Corp", stat: "30%", statLabel: "Grid efficiency gain", industry: "Energy & Utilities", href: "/case-studies/smart-grid-analytics" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">Proven Results</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">Case Studies</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">See how we&apos;ve helped enterprises across industries achieve measurable transformation.</p>
        </div>
      </section>

      <SectionWrapper id="studies" background="off-white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.href} {...study} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
