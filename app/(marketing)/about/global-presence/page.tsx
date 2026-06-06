import { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = {
  title: "Global Presence",
  description: "ASCIRVO operates across 15+ countries with offices in San Francisco, London, Singapore, Bangalore, Dubai, and Sydney.",
};

const offices = [
  { city: "San Francisco", country: "United States", type: "Global HQ", address: "100 Innovation Drive, Suite 500, CA 94105", phone: "+1 (800) 123-4567", email: "sf@ascirvo.com" },
  { city: "London", country: "United Kingdom", type: "EMEA HQ", address: "25 Canary Wharf, Tower 3, E14 5AB", phone: "+44 20 7946 0958", email: "london@ascirvo.com" },
  { city: "Singapore", country: "Singapore", type: "APAC HQ", address: "1 Raffles Place, Tower 2, Level 30", phone: "+65 6823 4567", email: "singapore@ascirvo.com" },
  { city: "Bangalore", country: "India", type: "Engineering Center", address: "Embassy Tech Village, Outer Ring Road, 560103", phone: "+91 80 4567 8900", email: "bangalore@ascirvo.com" },
  { city: "Dubai", country: "UAE", type: "MEA Office", address: "Dubai Internet City, Building 12, Level 5", phone: "+971 4 123 4567", email: "dubai@ascirvo.com" },
  { city: "Sydney", country: "Australia", type: "ANZ Office", address: "100 Barangaroo Avenue, Tower 1, NSW 2000", phone: "+61 2 9876 5432", email: "sydney@ascirvo.com" },
];

export default function GlobalPresencePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">
            Global Reach
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">
            Our Global Presence
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
            With offices and delivery centers across 6 continents, we provide 24/7 support
            with local expertise and global scale.
          </p>
        </div>
      </section>

      <SectionWrapper id="offices" background="white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <div key={office.city} className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-brand-electric/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy font-[var(--font-sora)]">{office.city}</h3>
                  <span className="text-xs font-medium text-brand-electric">{office.type}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-brand-gray-400">{office.address}</p>
              <p className="text-sm text-brand-gray-400">{office.country}</p>
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-sm text-brand-gray-400">
                  <Phone className="h-3.5 w-3.5" /> {office.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-gray-400">
                  <Mail className="h-3.5 w-3.5" /> {office.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
