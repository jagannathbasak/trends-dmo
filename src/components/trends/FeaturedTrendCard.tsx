import Link from "next/link";
import type { ReactNode } from "react";
import type { TrendSummary } from "@/types/trends";
import Figure from "@/components/primitives/Figure";
import Meter from "@/components/primitives/Meter";
import MonoLabel from "@/components/primitives/MonoLabel";
import MomentumChart from "@/components/trends/MomentumChart";
import { ArrowRightIcon } from "@/components/trends/icons";
import { categoryLabel } from "@/lib/trends/categories";
import { formatEntryWindow, formatRelativeTime, formatSignedPct, formatWeight } from "@/lib/trends/format";

export interface FeaturedTrendCardProps {
  trend: TrendSummary;
  className?: string;
}

/** The "Trending now" hero card — needs headlineMetrics and forecastPreview, which every fixture summary carries. */
export default function FeaturedTrendCard({ trend, className = "" }: FeaturedTrendCardProps) {
  const { headlineMetrics, forecastPreview } = trend;

  return (
    <article
      className={`flex flex-col gap-[26px] rounded-xl border border-trends-line-accent bg-gradient-to-b from-[#111B19] to-[#0D1413] p-[26px] lg:flex-row lg:gap-[34px] ${className}`}
    >
      <div className="flex flex-col gap-[14px] lg:w-[460px] lg:flex-shrink-0">
        <div className="flex flex-wrap items-center gap-[10px]">
          <span className="rounded-[3px] bg-trends-rise px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-trends-on-accent">
            TOP MOVER
          </span>
          <MonoLabel size="xs">
            {categoryLabel(trend.category).toUpperCase()} · {trend.sourceCount} SOURCES · UPDATED {formatRelativeTime(trend.updatedAt)}
          </MonoLabel>
        </div>

        <h3 className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-trends-text">{trend.name}</h3>
        <p className="text-pretty text-[14px] leading-[1.55] text-trends-text-muted">{trend.summary}</p>

        {trend.topCatalysts.length > 0 ? (
          <div className="mt-[2px] flex flex-col gap-[9px]">
            <MonoLabel size="2xs">WHY IT IS MOVING — RANKED CATALYSTS</MonoLabel>
            {trend.topCatalysts.map((catalyst) => (
              <div key={catalyst.id} className="flex items-center gap-[12px]">
                <span className="w-[150px] text-[13px] text-trends-text">{catalyst.name}</span>
                <Meter value={catalyst.weight} max={1} height="sm" className="flex-grow" />
                <span className="w-9 text-right font-mono text-[11px] text-trends-text-muted">{formatWeight(catalyst.weight)}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex-grow" />

        <Link
          href={`/trends/${trend.slug}`}
          className="flex h-11 items-center justify-center gap-[9px] rounded-lg bg-trends-rise text-[14px] font-semibold text-trends-on-accent transition hover:brightness-110"
        >
          Open the evidence trail
          <ArrowRightIcon size={15} />
        </Link>
      </div>

      <div className="flex flex-grow flex-col gap-[16px]">
        {headlineMetrics ? (
          <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-4">
            <KpiTile label="12MO DEMAND FORECAST">
              <Figure tier="prediction" value={formatSignedPct(headlineMetrics.demandForecast.value)} tone="rise" confidenceShownSeparately />
            </KpiTile>
            <KpiTile label="OPPORTUNITY PROBABILITY">
              <Figure tier="prediction" value={`${Math.round(headlineMetrics.opportunityProbability)}%`} tone="rise" confidenceShownSeparately />
            </KpiTile>
            <KpiTile label="COMPETITION EXPECTED">
              <Figure tier="prediction" value={formatSignedPct(headlineMetrics.competitionExpected)} tone="fall" confidenceShownSeparately />
            </KpiTile>
            <KpiTile label="OPTIMAL ENTRY WINDOW">
              <Figure
                tier="prediction"
                value={formatEntryWindow(headlineMetrics.entryWindow.opens, headlineMetrics.entryWindow.closes)}
                tone="neutral"
                confidenceShownSeparately
                valueClassName="text-[19px]"
              />
            </KpiTile>
          </div>
        ) : null}

        {forecastPreview ? (
          <div className="flex flex-grow flex-col gap-[8px] rounded-lg border border-trends-line bg-trends-surface-sunken p-[14px]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <MonoLabel size="2xs">
                MOMENTUM ◇ {Math.round(trend.momentum)}/100 · FORECAST BAND ◈
              </MonoLabel>
              <MonoLabel size="2xs">FORECAST CONFIDENCE {Math.round(headlineMetrics?.confidence ?? trend.forecastTeaser.confidence)}%</MonoLabel>
            </div>
            <div className="min-h-[120px] flex-grow">
              <MomentumChart series={trend.series} forecastBand={forecastPreview} direction={trend.direction} preset="featured" />
            </div>
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.1em] text-trends-text-faint">
              <span>30D AGO</span>
              <span className="text-trends-rise">TODAY</span>
              <span>12MO FORECAST</span>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function KpiTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[7px] rounded-lg border border-trends-line bg-trends-surface-sunken p-[13px]">
      <MonoLabel size="2xs" className="leading-[1.3]">
        {label}
      </MonoLabel>
      <span className="font-display text-[25px] font-semibold leading-none">{children}</span>
    </div>
  );
}
