import { toneFillClass, type Tone } from "@/lib/trends/notation";

const HEIGHT_CLASS = {
  xs: "h-[5px]",
  sm: "h-[6px]",
  md: "h-[7px]",
} as const;

export interface MeterProps {
  value: number;
  max?: number;
  tone?: Tone;
  height?: keyof typeof HEIGHT_CLASS;
  /** Only needed if this meter isn't paired with adjacent visible text stating the same value. */
  label?: string;
  className?: string;
}

export default function Meter({ value, max = 100, tone = "rise", height = "sm", label, className = "" }: MeterProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-trends-line-soft ${HEIGHT_CLASS[height]} ${className}`}
      {...(label
        ? { role: "progressbar", "aria-label": label, "aria-valuenow": Math.round(value), "aria-valuemin": 0, "aria-valuemax": max }
        : { "aria-hidden": "true" })}
    >
      <div className={`h-full rounded-full ${toneFillClass(tone)}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
