"use client";

import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: { name: string }[];
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

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
            className="flex h-10 items-center justify-center px-2"
          >
            {/* Logo placeholder - styled text */}
            <div className="flex items-center gap-2 text-brand-gray-400/60 transition-all hover:text-brand-gray-700">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-gray-100">
                <span className="text-xs font-bold text-brand-gray-400">
                  {item.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium tracking-wide">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
