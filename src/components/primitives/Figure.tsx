import type { ReactNode } from "react";
import type { EvidenceTier } from "@/types/trends";
import { TIER_GLYPH, TIER_LABEL, toneTextClass, type Tone } from "@/lib/trends/notation";

export interface FigureProps {
  tier: EvidenceTier;
  value: ReactNode;
  /** Smaller, muted suffix right after the value — e.g. "/100". */
  unit?: ReactNode;
  /** Caption text, e.g. "MOMENTUM" or "12MO DEMAND FORECAST". */
  label?: ReactNode;
  /** 0–100. Renders as "· CONF n%" after the value. A prediction without one logs a dev warning unless acknowledged. */
  confidence?: number;
  /** Set when a prediction's confidence is shown separately (e.g. one shared tile for a group of figures) rather than inline here. */
  confidenceShownSeparately?: boolean;
  tone?: Tone;
  /** Label on its own line above the value, vs. label and value sharing one inline run. */
  stacked?: boolean;
  /** Where the tier glyph attaches when a label is present. Ignored without a label — the glyph then always sits on the value. */
  glyphPosition?: "label" | "value";
  showTierLabel?: boolean;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export default function Figure({
  tier,
  value,
  unit,
  label,
  confidence,
  confidenceShownSeparately = false,
  tone = "neutral",
  stacked = false,
  glyphPosition = "value",
  showTierLabel = false,
  className = "",
  valueClassName = "",
  labelClassName = "",
}: FigureProps) {
  if (process.env.NODE_ENV !== "production" && tier === "prediction" && confidence === undefined && !confidenceShownSeparately) {
    console.warn(
      `Figure: a "prediction" tier figure (value=${String(value)}) rendered without a confidence. ` +
        `Pass confidence, or confidenceShownSeparately if it's shown in a nearby shared tile.`,
    );
  }

  const glyph = <span aria-hidden="true">{TIER_GLYPH[tier]}</span>;
  const tierName = <span className={showTierLabel ? "tracking-[0.08em]" : "sr-only"}>{TIER_LABEL[tier].toUpperCase()}</span>;

  const valueLine = (
    <span className={`inline-flex items-baseline gap-[6px] ${toneTextClass(tone)} ${valueClassName}`}>
      {(glyphPosition === "value" || !label) && (
        <>
          {glyph}
          {tierName}
        </>
      )}
      <span>{value}</span>
      {unit ? <span className="text-trends-text-muted">{unit}</span> : null}
      {confidence !== undefined ? (
        <span className="text-trends-text-muted">· CONF {Math.round(confidence)}%</span>
      ) : null}
    </span>
  );

  const labelLine = label ? (
    <span className={`inline-flex items-center gap-[5px] text-trends-text-muted ${labelClassName}`}>
      <span>{label}</span>
      {glyphPosition === "label" ? (
        <>
          {glyph}
          {tierName}
        </>
      ) : null}
    </span>
  ) : null;

  if (stacked) {
    return (
      <span className={`flex flex-col ${className}`}>
        {labelLine}
        {valueLine}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-baseline gap-[6px] ${className}`}>
      {labelLine}
      {valueLine}
    </span>
  );
}
