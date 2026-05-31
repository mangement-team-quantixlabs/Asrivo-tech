import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";
import JobsList from "@/components/marketing/JobsList";
import { getActiveJobListings } from "@/lib/supabase/queries";
import type { JobListing } from "@/types";

export const metadata: Metadata = {
  title: "Open Positions",
  description: "Browse all open positions at ASCIRVO. Join our team of 200+ engineers and experts.",
};

const fallbackJobs: JobListing[] = [
  {
    id: "fallback-job-1",
    title: "Senior AI/ML Engineer",
    slug: "senior-ai-ml-engineer",
    department: "Data & AI",
    location: "San Francisco / Remote",
    employment_type: "Full-time",
    experience_level: "Senior",
    description: "We are looking for a Senior AI/ML Engineer to lead the design and implementation of generative AI systems for enterprise clients.",
    is_active: true,
    posted_at: "",
    created_at: "",
  },
  {
    id: "fallback-job-2",
    title: "Cloud Solutions Architect",
    slug: "cloud-solutions-architect",
    department: "Cloud",
    location: "London / Remote",
    employment_type: "Full-time",
    experience_level: "Lead",
    description: "Help enterprise organizations transition to robust, secure, and cost-effective multi-cloud environments.",
    is_active: true,
    posted_at: "",
    created_at: "",
  },
  {
    id: "fallback-job-3",
    title: "Cybersecurity Analyst",
    slug: "cybersecurity-analyst",
    department: "Security",
    location: "Bangalore",
    employment_type: "Full-time",
    experience_level: "Mid",
    description: "Monitor, detect, and mitigate threats across client infrastructures and support SOC operations.",
    is_active: true,
    posted_at: "",
    created_at: "",
  },
  {
    id: "fallback-job-4",
    title: "Full-Stack Developer",
    slug: "full-stack-developer",
    department: "Engineering",
    location: "Singapore / Remote",
    employment_type: "Full-time",
    experience_level: "Senior",
    description: "Develop enterprise-grade web applications using modern React, Next.js and Node.js frameworks.",
    is_active: true,
    posted_at: "",
    created_at: "",
  },
];

export default async function OpenPositionsPage() {
  const jobs = await getActiveJobListings();
  const displayJobs = jobs.length > 0 ? jobs : fallbackJobs;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl">Open Positions</h1>
          <p className="mt-4 text-lg text-white/60">{displayJobs.length} positions available across our global offices.</p>
        </div>
      </section>
      <SectionWrapper id="all-roles" background="off-white">
        <JobsList initialJobs={displayJobs} />
      </SectionWrapper>
    </>
  );
}
