import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Briefcase, Clock } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6">← All Positions</Link>
          <h1 className="text-3xl font-bold text-white font-[var(--font-sora)] sm:text-4xl lg:text-5xl">{title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Engineering</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Remote</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Full-time</span>
            <span className="rounded-full bg-brand-teal/20 px-3 py-0.5 text-xs font-medium text-brand-teal">Senior</span>
          </div>
        </div>
      </section>
      <SectionWrapper id="detail" background="white">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">About the Role</h2>
              <p className="mt-3 text-base text-brand-gray-400 leading-relaxed">We are looking for a talented professional to join our growing team. This role will involve working on enterprise-grade solutions for global clients using cutting-edge technologies.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Responsibilities</h2>
              <ul className="mt-3 space-y-2">
                {["Design and implement scalable solutions", "Collaborate with cross-functional teams", "Mentor junior team members", "Contribute to technical architecture decisions", "Participate in code reviews and knowledge sharing"].map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-brand-gray-400"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Requirements</h2>
              <ul className="mt-3 space-y-2">
                {["5+ years of relevant experience", "Strong problem-solving skills", "Excellent communication skills", "Experience with enterprise-scale systems"].map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm text-brand-gray-400"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-electric" />{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Benefits</h2>
              <ul className="mt-3 space-y-2">
                {["Competitive salary and equity", "Health, dental, and vision insurance", "Flexible work arrangements", "Annual learning budget", "Generous PTO"].map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-brand-gray-400"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />{b}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 rounded-2xl border border-border bg-brand-off-white p-8 text-center">
            <h3 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">Interested in this role?</h3>
            <p className="mt-2 text-sm text-brand-gray-400">Application form will be connected to Supabase in the next phase.</p>
            <Link href="/contact" className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-semibold text-white hover:bg-brand-orange/90 active:scale-[0.98]">
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
