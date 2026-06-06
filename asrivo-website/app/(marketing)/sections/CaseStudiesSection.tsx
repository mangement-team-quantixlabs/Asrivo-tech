import SectionWrapper from "@/components/layout/SectionWrapper";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";

const featuredCaseStudies = [
  {
    title: "AI-Powered Fraud Detection for Global Banking Platform",
    client: "Major European Bank",
    stat: "94%",
    statLabel: "Fraud detection rate",
    industry: "Banking & Finance",
    href: "/case-studies/ai-fraud-detection",
  },
  {
    title: "Cloud Migration & Modernization for Healthcare Provider",
    client: "Leading US Health Network",
    stat: "60%",
    statLabel: "Infrastructure cost reduction",
    industry: "Healthcare",
    href: "/case-studies/healthcare-cloud-migration",
  },
  {
    title: "Smart Factory IoT Platform for Manufacturing Giant",
    client: "Fortune 500 Manufacturer",
    stat: "3x",
    statLabel: "Operational efficiency gain",
    industry: "Manufacturing",
    href: "/case-studies/smart-factory-iot",
  },
];

export default function CaseStudiesSection() {
  return (
    <SectionWrapper id="case-studies" background="white">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
          Proven Results
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl lg:text-5xl">
          Featured case studies
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-brand-gray-400 leading-relaxed">
          See how we&apos;ve helped enterprises across industries achieve measurable transformation.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCaseStudies.map((study, i) => (
          <CaseStudyCard key={study.href} {...study} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
