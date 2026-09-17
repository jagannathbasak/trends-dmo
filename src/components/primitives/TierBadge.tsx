import type { EvidenceTier } from "@/types/trends";
import { TIER_GLYPH, TIER_LABEL } from "@/lib/trends/notation";

export interface TierBadgeProps {
  tier: EvidenceTier;
  /** Show the tier name visibly (evidence table, legend) vs. glyph-only with an sr-only name (signal lists). */
  showLabel?: boolean;
  className?: string;
}

/**
 * The evidence-tier marker used standalone: the legend, the evidence table's
 * TIER column, and the glyph prefix on a key-signal row. Always rendered in
 * the fixed "rise" accent — this is the design's evidence-quality color, not
 * a judgement on the number it sits beside (see Figure for that).
 */
export default function TierBadge({ tier, showLabel = false, className = "" }: TierBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-[5px] font-mono text-trends-rise ${className}`}>
      <span aria-hidden="true">{TIER_GLYPH[tier]}</span>
      <span className={showLabel ? "tracking-[0.08em]" : "sr-only"}>{TIER_LABEL[tier].toUpperCase()}</span>
    </span>
  );
}
