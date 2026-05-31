import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle, MapPin, Briefcase, Clock } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getJobBySlug } from "@/lib/supabase/queries";
import ApplicationForm from "@/components/forms/ApplicationForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Position Not Found" };
  return {
    title: `${job.title} | ASCIRVO Careers`,
    description: job.description ? job.description.substring(0, 160) : "",
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">← All Positions</Link>
          <h1 className="text-3xl font-bold text-white font-[var(--font-sora)] sm:text-4xl lg:text-5xl">{job.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {job.department}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {job.employment_type}</span>
            <span className="rounded-full bg-brand-teal/20 px-3 py-0.5 text-xs font-medium text-brand-teal">{job.experience_level}</span>
          </div>
        </div>
      </section>
      <SectionWrapper id="detail" background="white">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">About the Role</h2>
              <p className="mt-3 text-base text-brand-gray-400 leading-relaxed">{job.description}</p>
            </div>
            
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Responsibilities</h2>
                <ul className="mt-3 space-y-2">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-gray-400">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(job.requirements_must && job.requirements_must.length > 0) && (
              <div>
                <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Requirements</h2>
                <ul className="mt-3 space-y-2">
                  {job.requirements_must.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-gray-400">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-electric" />
                      {r}
                    </li>
                  ))}
                  {job.requirements_nice && job.requirements_nice.map((r, i) => (
                    <li key={`nice-${i}`} className="flex items-start gap-2 text-sm text-brand-gray-400 opacity-80">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-electric/60" />
                      <span><span className="font-semibold text-xs text-brand-gray-400 mr-1">[Preferred]</span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Benefits</h2>
                <ul className="mt-3 space-y-2">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-gray-400">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="pt-8">
            <ApplicationForm jobId={job.id} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
