"use client";

import type { Horizon } from "@/types/trends";

const HORIZONS: { value: Horizon; label: string }[] = [
  { value: "30d", label: "30D" },
  { value: "6mo", label: "6MO" },
  { value: "12mo", label: "12MO" },
  { value: "3yr", label: "3YR" },
];

export interface HorizonTabsProps {
  value: Horizon;
  onChange: (horizon: Horizon) => void;
  /** Radio group name — must be unique per instance on the page (the hub and a future detail page each need their own). */
  name: string;
  ariaLabel?: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Real radio inputs, not styled buttons — arrow-key navigation between segments
 * is then native browser behaviour, not something to hand-roll (§10).
 */
export default function HorizonTabs({ value, onChange, name, ariaLabel = "Time horizon", size = "md", className = "" }: HorizonTabsProps) {
  const segmentHeight = size === "sm" ? "h-[32px]" : "h-[34px]";

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`inline-flex h-[42px] items-center gap-[2px] rounded-md border border-trends-line bg-trends-surface p-1 ${className}`}
    >
      {HORIZONS.map((h) => {
        const checked = h.value === value;
        return (
          <label
            key={h.value}
            className={`relative flex ${segmentHeight} cursor-pointer items-center rounded px-[14px] font-mono text-[12px] transition ${
              checked ? "bg-trends-rise-bg text-trends-rise" : "text-trends-text-muted hover:text-trends-text"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={h.value}
              checked={checked}
              onChange={() => onChange(h.value)}
              className="peer sr-only"
            />
            <span className="rounded peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-trends-rise">
              {h.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
