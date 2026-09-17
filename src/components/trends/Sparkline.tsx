import type { MomentumPoint, TrendDirection } from "@/types/trends";
import { CARD_SPARKLINE, COMPACT_SPARKLINE, computeDomain, linePoints, seriesToPoints } from "@/lib/trends/chart";
import { directionTone } from "@/lib/trends/notation";
import { TRENDS_COLOR } from "@/lib/trends/palette";

export interface SparklineProps {
  series: MomentumPoint[];
  direction: TrendDirection;
  variant?: "card" | "compact";
  className?: string;
}

export default function Sparkline({ series, direction, variant = "card", className = "" }: SparklineProps) {
  const preset = variant === "compact" ? COMPACT_SPARKLINE : CARD_SPARKLINE;
  const domain = computeDomain(series.map((p) => p.value));
  const points = seriesToPoints(series, preset.width, preset.height, domain);
  const tone = directionTone(direction);
  const stroke = tone === "fall" ? TRENDS_COLOR.fall : tone === "neutral" ? TRENDS_COLOR.textMuted : TRENDS_COLOR.rise;

  return (
    <svg
      viewBox={preset.viewBox}
      width={preset.width}
      height={preset.height}
      className={className}
      aria-hidden="true"
    >
      <polyline points={linePoints(points)} fill="none" stroke={stroke} strokeWidth={preset.strokeWidth} />
    </svg>
  );
}
