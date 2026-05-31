import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/lib/supabase/queries";
import ShareButtons from "@/components/marketing/ShareButtons";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: `${study.title} | ASCIRVO Case Study`,
    description: study.challenge ? study.challenge.substring(0, 160) : "",
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // Parse results JSONB safely
  let resultsArray: { stat: string; label: string }[] = [];
  try {
    if (study.results) {
      resultsArray = typeof study.results === "string" ? JSON.parse(study.results) : study.results;
    }
  } catch (e) {
    console.error("Error parsing results JSON", e);
  }

  // Fetch related case studies
  const allStudies = await getPublishedCaseStudies();
  const relatedStudies = allStudies
    .filter(cs => cs.slug !== slug)
    .filter(cs => cs.industry === study.industry)
    .slice(0, 3);

  if (relatedStudies.length < 3) {
    const filled = allStudies
      .filter(cs => cs.slug !== slug && !relatedStudies.some(rs => rs.id === cs.id))
      .slice(0, 3 - relatedStudies.length);
    relatedStudies.push(...filled);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">← All Case Studies</Link>
          <span className="inline-block rounded-full bg-brand-electric/20 px-3 py-1 text-xs font-medium text-brand-teal mb-4">{study.industry}</span>
          <h1 className="text-3xl font-bold text-white font-[var(--font-sora)] sm:text-4xl lg:text-5xl leading-tight">{study.title}</h1>
          <p className="mt-4 text-base text-white/60">Client: {study.client_name} | Service: {study.service} | Region: {study.region}</p>
        </div>
      </section>

      <SectionWrapper id="detail" background="white">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Challenge</h2>
            <p className="mt-3 text-base text-brand-gray-400 leading-relaxed">{study.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Solution</h2>
            <p className="mt-3 text-base text-brand-gray-400 leading-relaxed">{study.solution}</p>
          </div>
          
          {resultsArray.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">Results</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {resultsArray.map((r, i) => (
                  <div key={i} className="rounded-xl border border-border bg-brand-off-white p-5 text-center">
                    <div className="text-2xl font-bold text-brand-navy font-[var(--font-sora)]">{r.stat}</div>
                    <div className="mt-1 text-sm text-brand-gray-400">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {study.technologies && study.technologies.length > 0 && (
            <div className="pt-2">
              <h2 className="text-lg font-bold text-brand-navy font-[var(--font-sora)] mb-3">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <span key={t} className="rounded-full bg-brand-gray-100 px-3 py-1 text-xs font-medium text-brand-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {study.testimonial && (
            <div className="rounded-2xl border border-border bg-brand-navy/5 p-6 italic text-brand-gray-700 relative">
              <span className="absolute top-2 left-4 text-4xl text-brand-navy/20 font-serif">&ldquo;</span>
              <p className="pl-4 relative z-10">{study.testimonial}</p>
            </div>
          )}

          {/* Share Buttons */}
          <div className="border-t border-b border-border/80 py-4 flex items-center justify-between">
            <ShareButtons title={study.title} />
          </div>

          <div className="text-center pt-4">
            <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-orange px-8 text-sm font-semibold text-white hover:bg-brand-orange/90 active:scale-[0.98]">
              Achieve Similar Results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <SectionWrapper id="related-studies" background="off-white" className="border-t border-border">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-brand-navy font-[var(--font-sora)] mb-8">Related Case Studies</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedStudies.map((rS, i) => {
                let firstStat = { stat: "N/A", label: "Result" };
                try {
                  const results = typeof rS.results === "string" ? JSON.parse(rS.results) : rS.results;
                  if (Array.isArray(results) && results.length > 0) {
                    firstStat = {
                      stat: results[0].stat || "N/A",
                      label: results[0].label || "Result"
                    };
                  }
                } catch (e) {
                  console.error("Error parsing related results", e);
                }
                return (
                  <CaseStudyCard 
                    key={rS.id}
                    title={rS.title}
                    client={rS.client_name || "Enterprise Client"}
                    stat={firstStat.stat}
                    statLabel={firstStat.label}
                    industry={rS.industry || "Technology"}
                    href={`/case-studies/${rS.slug}`}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
