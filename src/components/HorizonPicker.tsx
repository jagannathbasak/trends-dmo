"use client";

export const HORIZONS = ["30D", "6MO", "12MO", "3YR"] as const;
export type Horizon = (typeof HORIZONS)[number];

export default function HorizonPicker({
  value,
  onChange,
  size = "md",
  className = "",
}: {
  value: Horizon;
  onChange: (horizon: Horizon) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  const pad = size === "sm" ? "px-3 py-1.5 text-[11px]" : "px-4.5 py-2.5 text-xs";

  return (
    <div
      className={`inline-flex overflow-hidden rounded-lg border border-white/10 font-mono ${className}`}
    >
      {HORIZONS.map((horizon) => {
        const active = horizon === value;
        return (
          <button
            key={horizon}
            type="button"
            onClick={() => onChange(horizon)}
            className={`${pad} border-r border-white/[0.07] font-medium transition last:border-r-0 ${
              active
                ? "bg-accent/15 text-accent"
                : "text-white/50 hover:bg-white/[0.04] hover:text-white/75"
            }`}
          >
            {horizon}
          </button>
        );
      })}
    </div>
  );
}
