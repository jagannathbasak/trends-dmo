import Link from "next/link";
import type { TrendSummary } from "@/types/trends";
import Figure from "@/components/primitives/Figure";
import TierBadge from "@/components/primitives/TierBadge";
import Meter from "@/components/primitives/Meter";
import MonoLabel from "@/components/primitives/MonoLabel";
import DirectionBadge from "@/components/primitives/DirectionBadge";
import Sparkline from "@/components/trends/Sparkline";
import { ArrowRightIcon } from "@/components/trends/icons";
import { categoryLabel } from "@/lib/trends/categories";
import { directionTone } from "@/lib/trends/notation";
import { formatSigned, formatSignedPct } from "@/lib/trends/format";

export interface TrendCardProps {
  trend: TrendSummary;
  className?: string;
}

/** The standard card — see docs/design/nvile-trends/reference/trend-card.html for the numbered anatomy. */
export default function TrendCard({ trend, className = "" }: TrendCardProps) {
  const tone = directionTone(trend.direction);

  return (
    <article
      className={`flex h-full flex-col gap-[14px] rounded-xl border border-trends-line bg-trends-surface p-[22px] ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-[3px] border border-trends-line px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-trends-text-muted">
          {categoryLabel(trend.category).toUpperCase()}
        </span>
        <DirectionBadge direction={trend.direction} />
      </div>

      <h3 className="font-display text-[23px] font-semibold leading-[1.15] tracking-[-0.015em] text-trends-text">
        {trend.name}
      </h3>

      <p className="text-pretty text-[13px] leading-[1.55] text-trends-text-muted">{trend.summary}</p>

      <div className="flex items-end justify-between border-y border-trends-line-soft py-[13px]">
        <Figure
          tier="estimate"
          label="MOMENTUM"
          value={Math.round(trend.momentum)}
          unit="/100"
          stacked
          glyphPosition="label"
          valueClassName="font-display text-[28px] font-semibold leading-none text-trends-text"
        />
        <div className="flex flex-col items-end gap-[6px]">
          <Sparkline series={trend.series} direction={trend.direction} variant="card" />
          <MonoLabel tone={tone} size="sm" tracking={false}>
            {formatSigned(trend.momentumDelta)} 30D
          </MonoLabel>
        </div>
      </div>

      {trend.keySignals.length > 0 ? (
        <div className="flex flex-col gap-[9px]">
          <MonoLabel size="2xs">KEY SIGNALS</MonoLabel>
          {trend.keySignals.map((signal) => (
            <div key={signal.id} className="flex items-baseline gap-[9px] text-[13px]">
              <TierBadge tier={signal.tier} />
              <span className="flex-grow text-trends-text-secondary">{signal.what}</span>
              {signal.changePct !== null ? (
                <span className="font-mono text-[11px] text-trends-text-faint">{formatSignedPct(signal.changePct)}</span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {trend.topCatalysts.length > 0 ? (
        <div className="flex flex-col gap-[9px]">
          <MonoLabel size="2xs">TOP CATALYSTS</MonoLabel>
          {trend.topCatalysts.slice(0, 2).map((catalyst) => (
            <div key={catalyst.id} className="flex items-center gap-[10px]">
              <span className="w-[118px] text-[12px] text-trends-text-secondary">{catalyst.name}</span>
              <Meter value={catalyst.weight} max={1} height="xs" className="flex-grow" tone={tone === "fall" ? "fall" : "rise"} />
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex-grow" />

      <div className="flex items-center justify-between border-t border-trends-line-soft pt-[13px]">
        <Figure
          tier="prediction"
          label={trend.forecastTeaser.horizon.toUpperCase()}
          value={formatSignedPct(trend.forecastTeaser.changePct)}
          confidence={trend.forecastTeaser.confidence}
          tone={trend.forecastTeaser.changePct < 0 ? "fall" : "rise"}
          className="font-mono text-[11px]"
        />
        <Link
          href={`/trends/${trend.slug}`}
          className="flex items-center gap-[7px] text-[13px] font-semibold text-trends-rise hover:brightness-110"
        >
          Evidence trail
          <ArrowRightIcon className="text-trends-rise" />
        </Link>
      </div>
    </article>
  );
}
