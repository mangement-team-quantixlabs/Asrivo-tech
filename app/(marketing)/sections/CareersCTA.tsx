import Link from "next/link";
import { ArrowRight, Users, MapPin, Briefcase } from "lucide-react";
import { getActiveJobCount } from "@/lib/supabase/queries";

export default async function CareersCTA() {
  const jobCount = await getActiveJobCount();
  const jobsLabel = jobCount > 0 ? `${jobCount}` : "25+";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-electric/90 to-brand-teal py-20 lg:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white font-[var(--font-sora)] md:text-4xl lg:text-5xl">
              Join the ASCIRVO family
            </h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Build your career at one of the fastest-growing technology companies.
              Work on cutting-edge projects with brilliant minds across the globe.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 lg:justify-start">
              {[
                { icon: Briefcase, value: jobsLabel, label: "Open Positions" },
                { icon: MapPin, value: "8", label: "Global Offices" },
                { icon: Users, value: "200+", label: "Team Members" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-4 w-4 text-white/80" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-xs text-white/50">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <Link
              href="/careers"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-brand-navy transition-all hover:shadow-xl hover:shadow-black/10 active:scale-[0.98]"
            >
              Explore Careers
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
