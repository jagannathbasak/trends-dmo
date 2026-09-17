import type { EvidenceTier, TrendDirection } from "@/types/trends";

export const TIER_GLYPH: Record<EvidenceTier, string> = {
  verified: "●",
  signal: "◦",
  estimate: "◇",
  prediction: "◈",
};

export const TIER_LABEL: Record<EvidenceTier, string> = {
  verified: "Verified",
  signal: "Signal",
  estimate: "Estimate",
  prediction: "Prediction",
};

export const EVIDENCE_TIERS: EvidenceTier[] = ["verified", "signal", "estimate", "prediction"];

export const DIRECTION_LABEL: Record<TrendDirection, string> = {
  emerging: "Emerging",
  accelerating: "Accelerating",
  steady: "Steady",
  declining: "Declining",
};

/** viewBox is "0 0 24 24", stroke-width 2.6, matching reference/*.html exactly. Steady has no polyline — it renders as a flat line. */
export const DIRECTION_ARROW_POINTS: Partial<Record<TrendDirection, string>> = {
  accelerating: "5,17 12,8 19,17",
  emerging: "4,16 10,10 14,14 20,6",
  declining: "5,8 12,17 19,8",
};

export type Tone = "rise" | "fall" | "neutral";

export function directionTone(direction: TrendDirection): Tone {
  if (direction === "declining") return "fall";
  if (direction === "steady") return "neutral";
  return "rise";
}

export function toneTextClass(tone: Tone): string {
  if (tone === "rise") return "text-trends-rise";
  if (tone === "fall") return "text-trends-fall";
  return "text-trends-text";
}

export function toneFillClass(tone: Tone): string {
  if (tone === "rise") return "bg-trends-rise";
  if (tone === "fall") return "bg-trends-fall";
  return "bg-trends-text-muted";
}
