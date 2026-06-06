import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Positions",
  description: "Browse all open positions at ASCIRVO. Join our team of 200+ engineers and experts.",
};

const roles = [
  { title: "Senior AI/ML Engineer", dept: "Data & AI", location: "San Francisco / Remote", type: "Full-time", level: "Senior", slug: "senior-ai-ml-engineer" },
  { title: "Cloud Solutions Architect", dept: "Cloud", location: "London / Remote", type: "Full-time", level: "Lead", slug: "cloud-solutions-architect" },
  { title: "Cybersecurity Analyst", dept: "Security", location: "Bangalore", type: "Full-time", level: "Mid", slug: "cybersecurity-analyst" },
  { title: "Full-Stack Developer", dept: "Engineering", location: "Singapore / Remote", type: "Full-time", level: "Senior", slug: "full-stack-developer" },
  { title: "Data Engineer", dept: "Data & AI", location: "San Francisco", type: "Full-time", level: "Mid", slug: "data-engineer" },
  { title: "DevOps Engineer", dept: "Engineering", location: "Remote", type: "Contract", level: "Senior", slug: "devops-engineer" },
  { title: "Product Manager", dept: "Product", location: "San Francisco", type: "Full-time", level: "Senior", slug: "product-manager" },
  { title: "UX Designer", dept: "Design", location: "London / Remote", type: "Full-time", level: "Mid", slug: "ux-designer" },
];

export default function OpenPositionsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl">Open Positions</h1>
          <p className="mt-4 text-lg text-white/60">{roles.length} positions available across our global offices.</p>
        </div>
      </section>
      <SectionWrapper id="all-roles" background="off-white">
        <div className="space-y-3">
          {roles.map((role) => (
            <Link key={role.slug} href={`/careers/${role.slug}`} className="group flex items-center justify-between rounded-xl border border-border bg-white p-5 transition-all hover:border-brand-electric/20 hover:shadow-md">
              <div>
                <h3 className="text-base font-semibold text-brand-navy group-hover:text-brand-electric transition-colors">{role.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-brand-gray-400">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{role.dept}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{role.location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{role.type}</span>
                  <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-teal">{role.level}</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-gray-400 group-hover:text-brand-electric transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
