"use client";

import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: { name: string; domain?: string }[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export default function MarqueeStrip({
  items,
  className,
  speed = "normal",
}: MarqueeStripProps) {
  const speeds = {
    slow: "60s",
    normal: "40s",
    fast: "25s",
  };

  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden py-6",
        className
      )}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F9FAFB] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F9FAFB] to-transparent" />

      <div
        className="flex items-center gap-12 whitespace-nowrap"
        style={{
          animation: `marquee ${speeds[speed]} linear infinite`,
          width: "fit-content",
        }}
      >
        {allItems.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center justify-center px-4 py-2"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              {/* White Card */}
              <div className="flex h-24 w-40 items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                {item.domain ? (
                  <img 
                    src={`https://logo.clearbit.com/${item.domain}`} 
                    alt={`${item.name} logo`} 
                    className="max-h-full max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const nextEl = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                      if (nextEl) nextEl.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="flex h-10 w-10 items-center justify-center rounded bg-brand-gray-100"
                  style={{ display: item.domain ? 'none' : 'flex' }}
                >
                  <span className="text-sm font-bold text-brand-gray-400">
                    {item.name.charAt(0)}
                  </span>
                </div>
              </div>
              <span className="text-[13px] font-medium tracking-wide text-brand-gray-500">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
