import MarqueeStrip from "@/components/marketing/MarqueeStrip";
import { getActivePartners } from "@/lib/supabase/queries";

export default async function TrustedBy() {
  const partners = await getActivePartners();
  
  const items = partners.map(p => ({
    name: p.company_name
  }));

  const displayItems = items.length > 0 ? items : [
    { name: "Accenture" },
    { name: "Deloitte" },
    { name: "JPMorgan Chase" },
    { name: "Siemens" },
    { name: "Unilever" },
    { name: "HSBC" },
    { name: "Philips" },
    { name: "SAP" },
    { name: "Bosch" },
    { name: "Schneider Electric" },
    { name: "Tata Consultancy" },
    { name: "Infosys" },
  ];

  return (
    <section className="border-b border-border bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray-400">
          Trusted by industry leaders
        </p>
      </div>
      <MarqueeStrip items={displayItems} className="mt-4" />
    </section>
  );
}
