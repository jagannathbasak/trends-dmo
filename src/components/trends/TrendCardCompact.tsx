import Link from "next/link";
import type { TrendSummary } from "@/types/trends";
import Figure from "@/components/primitives/Figure";
import MonoLabel from "@/components/primitives/MonoLabel";
import Sparkline from "@/components/trends/Sparkline";
import { directionTone } from "@/lib/trends/notation";

export interface TrendCardCompactProps {
  trend: TrendSummary;
  rank: number;
  className?: string;
}

/** Rank, name, stage, sparkline and the confidence figure — everything else is dropped. */
export default function TrendCardCompact({ trend, rank, className = "" }: TrendCardCompactProps) {
  return (
    <Link
      href={`/trends/${trend.slug}`}
      className={`flex items-center gap-[13px] rounded-lg border border-trends-line-soft bg-trends-surface-sunken px-[14px] py-[13px] no-underline transition hover:border-trends-line ${className}`}
    >
      <span className="w-4 font-mono text-[11px] text-trends-text-faint">{String(rank).padStart(2, "0")}</span>

      <div className="flex flex-grow flex-col gap-[4px]">
        <span className="text-[14px] text-trends-text">{trend.name}</span>
        <MonoLabel size="xs" tracking>
          STAGE: {trend.stage.toUpperCase()} · {trend.sourceCount} SOURCES
        </MonoLabel>
      </div>

      <Sparkline series={trend.series} direction={trend.direction} variant="compact" />

      <Figure
        tier="prediction"
        value={`${Math.round(trend.forecastTeaser.confidence)}%`}
        tone={directionTone(trend.direction)}
        confidenceShownSeparately
        className="w-[46px] justify-end font-mono text-[11px]"
      />
    </Link>
  );
}
