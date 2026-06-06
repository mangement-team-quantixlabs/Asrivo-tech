import { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = {
  title: "Leadership Team",
  description: "Meet the visionary leaders driving ASCIRVO's mission to deliver world-class IT services and digital transformation.",
};

const leaders = [
  { name: "Rajesh Kumar", title: "Chief Executive Officer", department: "Executive", bio: "20+ years in enterprise technology leadership. Previously VP of Engineering at a Fortune 100 tech company." },
  { name: "Sarah Chen", title: "Chief Technology Officer", department: "Technology", bio: "AI and cloud architecture expert with 15+ years building scalable platforms for global enterprises." },
  { name: "James Mitchell", title: "Chief Operating Officer", department: "Operations", bio: "Operations and delivery excellence leader with experience scaling global service organizations." },
  { name: "Priya Sharma", title: "VP of Engineering", department: "Engineering", bio: "Full-stack engineering leader specializing in cloud-native architectures and DevOps transformation." },
  { name: "David Okonkwo", title: "VP of Data & AI", department: "Data & AI", bio: "Data science and machine learning expert, former research scientist at a top AI lab." },
  { name: "Lisa Wang", title: "VP of Client Success", department: "Client Success", bio: "Client relationship strategist with a track record of 98%+ retention across enterprise accounts." },
];

export default function LeadershipPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">
            Our Team
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">
            Leadership Team
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
            Meet the visionary leaders driving ASCIRVO&apos;s mission to deliver world-class technology solutions.
          </p>
        </div>
      </section>

      <SectionWrapper id="leaders" background="white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((person) => (
            <div key={person.name} className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-brand-electric/20">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-electric text-2xl font-bold text-white font-[var(--font-sora)]">
                {person.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-navy font-[var(--font-sora)]">{person.name}</h3>
              <p className="text-sm font-medium text-brand-electric">{person.title}</p>
              <p className="mt-1 text-xs text-brand-gray-400">{person.department}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray-400">{person.bio}</p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray-400 hover:text-brand-electric transition-colors">
                <ExternalLink className="h-4 w-4" /> LinkedIn
              </button>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
