import type { TrendDirection } from "@/types/trends";
import { DIRECTION_ARROW_POINTS, DIRECTION_LABEL, directionTone, toneTextClass } from "@/lib/trends/notation";

export interface DirectionBadgeProps {
  direction: TrendDirection;
  size?: "sm" | "md";
  className?: string;
}

/** Arrow icon + word, never color alone — the icon alone would be invisible in greyscale or to a color-blind reader. */
export default function DirectionBadge({ direction, size = "sm", className = "" }: DirectionBadgeProps) {
  const points = DIRECTION_ARROW_POINTS[direction];
  const dimension = size === "md" ? 13 : 12;
  const tone = toneTextClass(directionTone(direction));

  return (
    <span className={`inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.06em] ${tone} ${className}`}>
      <svg viewBox="0 0 24 24" width={dimension} height={dimension} aria-hidden="true">
        {points ? (
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.6" />
        ) : (
          <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2.6" />
        )}
      </svg>
      {DIRECTION_LABEL[direction].toUpperCase()}
    </span>
  );
}
