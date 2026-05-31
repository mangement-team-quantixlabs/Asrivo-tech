import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";
import CaseStudiesList from "@/components/marketing/CaseStudiesList";
import { getPublishedCaseStudies } from "@/lib/supabase/queries";
import type { CaseStudy } from "@/types";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore how ASCIRVO has helped enterprises achieve measurable transformation across industries.",
};

const fallbackCaseStudies: CaseStudy[] = [
  {
    id: "fallback-cs-1",
    title: "AI-Powered Fraud Detection for Global Banking Platform",
    slug: "ai-fraud-detection",
    client_name: "Major European Bank",
    industry: "Banking",
    service: "AI/ML",
    region: "Europe",
    challenge: "Traditional threshold systems let 12% of fraudulent credit activities bypass initial checks.",
    solution: "We deployed an adaptive anomaly detection engine using neural networks to screen transactions in real time.",
    results: [
      { stat: "94%", label: "Fraud detection rate" },
      { stat: "< 50ms", label: "Response latency" },
    ],
    technologies: ["Python", "TensorFlow", "Kubernetes"],
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-cs-2",
    title: "Cloud Migration & Modernization for Healthcare Provider",
    slug: "healthcare-cloud-migration",
    client_name: "Leading US Health Network",
    industry: "Healthcare",
    service: "Cloud Solutions",
    region: "North America",
    challenge: "High server maintainance cost and slow application deployment cycles.",
    solution: "Migrated over 120 applications to a fully compliant AWS multi-region infrastructure using IAC.",
    results: [
      { stat: "60%", label: "Infrastructure cost reduction" },
      { stat: "99.99%", label: "Uptime achieved" },
    ],
    technologies: ["AWS", "Terraform", "Docker"],
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-cs-3",
    title: "Smart Factory IoT Platform for Manufacturing Giant",
    slug: "smart-factory-iot",
    client_name: "Fortune 500 Manufacturer",
    industry: "Manufacturing",
    service: "Digital Transformation",
    region: "Global",
    challenge: "Unplanned factory downtime cost $8M annually due to late mechanical defect detection.",
    solution: "Deployed sensor logging edge hubs with predictive maintenance ML modules.",
    results: [
      { stat: "3x", label: "Operational efficiency gain" },
      { stat: "-45%", label: "Equipment downtime" },
    ],
    technologies: ["IoT Edge", "Azure IoT Hub", "Python"],
    is_published: true,
    created_at: "",
    updated_at: "",
  },
];

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();
  const displayStudies = caseStudies.length > 0 ? caseStudies : fallbackCaseStudies;

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
        <CaseStudiesList initialCaseStudies={displayStudies} />
      </SectionWrapper>
    </>
  );
}
