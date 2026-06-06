import MarqueeStrip from "@/components/marketing/MarqueeStrip";

const trustedCompanies = [
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

export default function TrustedBy() {
  return (
    <section className="border-b border-border bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray-400">
          Trusted by industry leaders
        </p>
      </div>
      <MarqueeStrip items={trustedCompanies} className="mt-4" />
    </section>
  );
}
