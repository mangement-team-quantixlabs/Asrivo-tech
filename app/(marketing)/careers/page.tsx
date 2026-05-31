import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, MapPin, Briefcase, Heart, Zap, GraduationCap } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getActiveJobListings } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the ASCIRVO family — build your career at one of the fastest-growing technology companies with 25+ open positions.",
};

const perks = [
  { icon: Zap, title: "Cutting-Edge Projects", desc: "Work on AI, Cloud, and enterprise solutions for global clients" },
  { icon: GraduationCap, title: "Learning & Growth", desc: "Annual learning budget, certifications, and conference sponsorships" },
  { icon: Heart, title: "Work-Life Balance", desc: "Flexible hours, remote options, and generous PTO" },
  { icon: Users, title: "Diverse & Inclusive", desc: "A global team that celebrates diversity and fosters belonging" },
];

export default async function CareersPage() {
  const jobs = await getActiveJobListings();

  const mappedRoles = jobs.map(job => ({
    title: job.title,
    dept: job.department,
    location: job.location,
    type: job.employment_type,
    slug: job.slug,
  }));

  const displayRoles = mappedRoles.length > 0 ? mappedRoles : [
    { title: "Senior AI/ML Engineer", dept: "Data & AI", location: "San Francisco / Remote", type: "Full-time", slug: "senior-ai-ml-engineer" },
    { title: "Cloud Solutions Architect", dept: "Cloud", location: "London / Remote", type: "Full-time", slug: "cloud-solutions-architect" },
    { title: "Cybersecurity Analyst", dept: "Security", location: "Bangalore", type: "Full-time", slug: "cybersecurity-analyst" },
    { title: "Full-Stack Developer", dept: "Engineering", location: "Singapore / Remote", type: "Full-time", slug: "full-stack-developer" },
    { title: "Data Engineer", dept: "Data & AI", location: "San Francisco", type: "Full-time", slug: "data-engineer" },
    { title: "DevOps Engineer", dept: "Engineering", location: "Remote", type: "Contract", slug: "devops-engineer" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">We&apos;re Hiring</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">Join the ASCIRVO family</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">Build your career at one of the fastest-growing technology companies. Work on cutting-edge projects with brilliant minds across the globe.</p>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { icon: Briefcase, val: jobs.length > 0 ? `${jobs.length}` : "25+", label: "Open Positions" },
              { icon: MapPin, val: "8", label: "Global Offices" },
              { icon: Users, val: "200+", label: "Team Members" }
            ].map(({ icon: Icon, val, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-white/80" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{val}</div>
                  <div className="text-xs text-white/50">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper id="perks" background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">Life at ASCIRVO</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => { const Icon = p.icon; return (
            <div key={p.title} className="text-center rounded-2xl border border-border p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-base font-semibold text-brand-navy font-[var(--font-sora)]">{p.title}</h3>
              <p className="mt-2 text-sm text-brand-gray-400">{p.desc}</p>
            </div>
          ); })}
        </div>
      </SectionWrapper>

      <SectionWrapper id="openings" background="off-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl">Open Positions</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-brand-gray-400">Find your next role at ASCIRVO</p>
        </div>
        <div className="mt-10 space-y-3">
          {displayRoles.map((role) => (
            <Link key={role.slug} href={`/careers/${role.slug}`} className="group flex items-center justify-between rounded-xl border border-border bg-white p-5 transition-all hover:border-brand-electric/20 hover:shadow-md">
              <div>
                <h3 className="text-base font-semibold text-brand-navy group-hover:text-brand-electric transition-colors">{role.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-brand-gray-400">
                  <span>{role.dept}</span><span>•</span><span>{role.location}</span><span>•</span>
                  <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-teal">{role.type}</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-gray-400 group-hover:text-brand-electric transition-colors" />
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
