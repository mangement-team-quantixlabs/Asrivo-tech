import MarqueeStrip from "@/components/marketing/MarqueeStrip";

const trustedCompanies = [
  { name: "TechCorp" },
  { name: "GlobalBank" },
  { name: "HealthPlus" },
  { name: "RetailMax" },
  { name: "EnergyOne" },
  { name: "CloudFirst" },
  { name: "DataVault" },
  { name: "CyberShield" },
  { name: "FinanceHub" },
  { name: "MedTech" },
  { name: "SmartGrid" },
  { name: "DigiServe" },
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
