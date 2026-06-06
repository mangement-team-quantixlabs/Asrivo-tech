"use client";

import React from "react";

/* ─── Brand Logo Components ─── */

function SchneiderElectricLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#3DCD58" strokeWidth="3" fill="none" />
        <path d="M14 26L26 14" stroke="#3DCD58" strokeWidth="3" strokeLinecap="round" />
        <path d="M14 20L26 20" stroke="#3DCD58" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[15px] font-bold tracking-tight" style={{ color: "#3DCD58" }}>
        Schneider Electric
      </span>
    </div>
  );
}

function TataLogo() {
  return (
    <span className="text-[22px] font-bold tracking-tight" style={{ color: "#486AAE", fontFamily: "serif" }}>
      TATA
    </span>
  );
}

function AccentureLogo() {
  return (
    <div className="flex items-center">
      <span className="text-[18px] font-semibold" style={{ color: "#A100FF" }}>
        accenture
      </span>
      <span className="text-[18px] font-bold" style={{ color: "#A100FF", marginLeft: "1px" }}>
        &gt;
      </span>
    </div>
  );
}

function DeloitteLogo() {
  return (
    <div className="flex flex-col items-start">
      <span className="text-[20px] font-bold tracking-tight" style={{ color: "#86BC25" }}>
        Deloitte.
      </span>
    </div>
  );
}

function JPMorganLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z" fill="none" stroke="#003A70" strokeWidth="2"/>
        <path d="M10 16h12M16 10v12" stroke="#003A70" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="text-[15px] font-bold tracking-tight" style={{ color: "#003A70" }}>
        JPMorgan Chase
      </span>
    </div>
  );
}

function UnileverLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 2C16 2 6 8 6 18c0 6 4.5 12 10 12s10-6 10-12C26 8 16 2 16 2z" fill="#1F36C7" />
      </svg>
      <span className="text-[17px] font-bold" style={{ color: "#1F36C7" }}>
        Unilever
      </span>
    </div>
  );
}

function HSBCLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <polygon points="0,0 20,10 0,20" fill="#DB0011" />
        <polygon points="20,10 40,0 40,20" fill="#DB0011" />
        <polygon points="0,20 20,30 0,40" fill="#DB0011" />
        <polygon points="20,30 40,20 40,40" fill="#DB0011" />
      </svg>
      <span className="text-[18px] font-bold tracking-wider" style={{ color: "#DB0011" }}>
        HSBC
      </span>
    </div>
  );
}

function PhilipsLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#0B5ED7" strokeWidth="2" fill="none" />
        <path d="M10 20L16 8l6 12" stroke="#0B5ED7" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <circle cx="16" cy="21" r="2" fill="#0B5ED7" />
      </svg>
      <span className="text-[17px] font-bold tracking-tight" style={{ color: "#0B5ED7" }}>
        PHILIPS
      </span>
    </div>
  );
}

function BoschLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
        <rect x="2" y="8" width="36" height="24" rx="12" stroke="#E20015" strokeWidth="3" fill="none" />
        <circle cx="20" cy="20" r="5" fill="#E20015" />
      </svg>
      <span className="text-[18px] font-extrabold tracking-tight" style={{ color: "#E20015" }}>
        BOSCH
      </span>
    </div>
  );
}

function SiemensLogo() {
  return (
    <span className="text-[20px] font-bold tracking-wide" style={{ color: "#009999" }}>
      SIEMENS
    </span>
  );
}

function InfosysLogo() {
  return (
    <div className="flex items-center">
      <span className="text-[18px] font-bold tracking-tight" style={{ color: "#007CC3" }}>
        Infosys
      </span>
    </div>
  );
}

function SamsungLogo() {
  return (
    <span
      className="text-[20px] font-bold tracking-[0.25em]"
      style={{ color: "#1428A0" }}
    >
      SAMSUNG
    </span>
  );
}

/* ─── Logo Map ─── */

const brandLogos: { key: string; label: string; Logo: React.FC }[] = [
  { key: "schneider", label: "Schneider Electric", Logo: SchneiderElectricLogo },
  { key: "tata", label: "Tata", Logo: TataLogo },
  { key: "accenture", label: "Accenture", Logo: AccentureLogo },
  { key: "deloitte", label: "Deloitte", Logo: DeloitteLogo },
  { key: "jpmorgan", label: "JPMorgan Chase", Logo: JPMorganLogo },
  { key: "unilever", label: "Unilever", Logo: UnileverLogo },
  { key: "hsbc", label: "HSBC", Logo: HSBCLogo },
  { key: "philips", label: "Philips", Logo: PhilipsLogo },
  { key: "bosch", label: "Bosch", Logo: BoschLogo },
  { key: "siemens", label: "Siemens", Logo: SiemensLogo },
  { key: "infosys", label: "Infosys", Logo: InfosysLogo },
  { key: "samsung", label: "Samsung", Logo: SamsungLogo },
];

/* ─── Component ─── */

export default function TrustedBy() {
  // Duplicate for seamless infinite scroll
  const allLogos = [...brandLogos, ...brandLogos];

  return (
    <section className="border-b border-border bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Trusted by industry leaders
        </p>
      </div>

      {/* Marquee row */}
      <div className="relative mt-8 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex items-center gap-16 whitespace-nowrap"
          style={{
            animation: "marquee 45s linear infinite",
            width: "fit-content",
          }}
        >
          {allLogos.map((brand, i) => (
            <div
              key={`${brand.key}-${i}`}
              className="flex flex-col items-center justify-center gap-3 px-4"
            >
              {/* Brand logo — ~40-50px height */}
              <div className="flex h-[48px] items-center justify-center">
                <brand.Logo />
              </div>
              {/* Company name */}
              <span className="text-[11px] font-medium tracking-wide text-gray-400">
                {brand.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
