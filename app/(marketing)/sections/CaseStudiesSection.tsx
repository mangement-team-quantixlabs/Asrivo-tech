import SectionWrapper from "@/components/layout/SectionWrapper";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";
import { getPublishedCaseStudies } from "@/lib/supabase/queries";

export default async function CaseStudiesSection() {
  const caseStudies = await getPublishedCaseStudies({ limit: 3 });

  const mappedStudies = caseStudies.map(cs => {
    // Parse results JSONB
    let firstStat = { stat: "N/A", label: "Result" };
    try {
      const results = typeof cs.results === 'string' ? JSON.parse(cs.results) : cs.results;
      if (Array.isArray(results) && results.length > 0) {
        firstStat = {
          stat: results[0].stat || "N/A",
          label: results[0].label || "Result"
        };
      }
    } catch (e) {
      console.error("Error parsing case study results", e);
    }

    return {
      title: cs.title,
      client: cs.client_name || "Enterprise Client",
      stat: firstStat.stat,
      statLabel: firstStat.label,
      industry: cs.industry || "Technology",
      href: `/case-studies/${cs.slug}`,
    };
  });

  const displayStudies = mappedStudies.length > 0 ? mappedStudies : [
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
        {displayStudies.map((study, i) => (
          <CaseStudyCard key={study.href} {...study} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
