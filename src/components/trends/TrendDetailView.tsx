import Link from "next/link";
import type { Horizon, TrendDetail } from "@/types/trends";
import DirectionBadge from "@/components/primitives/DirectionBadge";
import EvidenceLegend from "@/components/primitives/EvidenceLegend";
import Figure from "@/components/primitives/Figure";
import MonoLabel from "@/components/primitives/MonoLabel";
import CatalystList from "@/components/trends/CatalystList";
import DetailHorizonTabs from "@/components/trends/DetailHorizonTabs";
import InvalidationRisks from "@/components/trends/InvalidationRisks";
import KpiTile from "@/components/trends/KpiTile";
import MomentumChart from "@/components/trends/MomentumChart";
import ScoreBreakdown from "@/components/trends/ScoreBreakdown";
import SignalTable from "@/components/trends/SignalTable";
import { categoryLabel } from "@/lib/trends/categories";
import { formatEntryWindow, formatQuarter, formatRelativeTime, formatSigned, formatSignedPct } from "@/lib/trends/format";
import { forecastsWithdrawnCount, getTrendSignals } from "@/lib/trends/api";

const HORIZON_LABEL: Record<Horizon, string> = { "30d": "30D", "6mo": "6MO", "12mo": "12MO", "3yr": "3YR" };

export interface TrendDetailViewProps {
  detail: TrendDetail;
  horizon: Horizon;
  currentParams: string;
}

export default function TrendDetailView({ detail, horizon, currentParams }: TrendDetailViewProps) {
  const series = detail.seriesByHorizon[horizon];
  const delta = series.length >= 2 ? series[series.length - 1].value - series[0].value : detail.momentumDelta;
  const annotations = detail.annotations.filter((a) => a.t >= series[0].t && a.t <= series[series.length - 1].t);
  const { items: firstSignals } = getTrendSignals(detail.slug, { limit: 5 });

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col px-5 pb-16 sm:px-8">
      <nav aria-label="Breadcrumb" className="mt-[30px] flex items-center gap-[9px] font-mono text-[11px] tracking-[0.08em] text-trends-text-faint">
        <Link href="/trends" className="hover:text-trends-text-muted">
          TRENDS
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={`/trends/category/${detail.category}`} className="hover:text-trends-text-muted">
          {categoryLabel(detail.category).toUpperCase()}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-trends-text-muted">{detail.name.toUpperCase()}</span>
      </nav>

      <div className="mt-[18px] flex flex-col items-start gap-6 lg:flex-row lg:justify-between">
        <div className="flex max-w-[860px] flex-col gap-[14px]">
          <div className="flex flex-wrap items-center gap-[10px]">
            <span className="rounded border border-trends-line-accent bg-[#0F1F1B] px-[9px] py-[5px]">
              <DirectionBadge direction={detail.direction} />
            </span>
            <MonoLabel size="xs">
              {categoryLabel(detail.category).toUpperCase()} · {detail.sourceCount} SOURCES · UPDATED {formatRelativeTime(detail.updatedAt)} ·{" "}
              {detail.geography.toUpperCase()}
            </MonoLabel>
          </div>
          <h1 className="text-balance font-display text-[36px] font-bold leading-[1.02] tracking-[-0.03em] text-trends-text sm:text-[54px]">
            {detail.name}
          </h1>
          <p className="text-pretty text-[17px] leading-[1.5] text-trends-text-muted">{detail.summary}</p>
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center gap-[10px]">
          <button type="button" className="h-11 rounded-lg border border-trends-line bg-trends-surface px-[18px] text-[13px] text-trends-text">
            Add to watchlist
          </button>
          <button type="button" className="h-11 rounded-lg border border-trends-line bg-trends-surface px-[18px] text-[13px] text-trends-text">
            Share with team
          </button>
          <button type="button" className="h-11 rounded-lg bg-trends-rise px-5 text-[13px] font-semibold text-trends-on-accent transition hover:brightness-110">
            Export report
          </button>
        </div>
      </div>

      <div className="mt-[28px] flex flex-wrap items-center justify-between gap-3">
        <DetailHorizonTabs value={horizon} currentParams={currentParams} />
        <EvidenceLegend />
      </div>

      <div className="mt-[14px] grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-5">
        <KpiTile label="12MO DEMAND FORECAST" radius="md" accent note={`BAND ${formatSignedPct(detail.headlineMetrics.demandForecast.bandLow)} — ${formatSignedPct(detail.headlineMetrics.demandForecast.bandHigh)}`}>
          <Figure tier="prediction" value={formatSignedPct(detail.headlineMetrics.demandForecast.value)} tone="rise" confidenceShownSeparately />
        </KpiTile>
        <KpiTile label="OPPORTUNITY PROBABILITY" radius="md" note="12-MONTH HORIZON">
          <Figure tier="prediction" value={`${Math.round(detail.headlineMetrics.opportunityProbability)}%`} tone="rise" confidenceShownSeparately />
        </KpiTile>
        <KpiTile label="COMPETITION EXPECTED" radius="md" note="NET NEW ENTRANTS">
          <Figure tier="prediction" value={formatSignedPct(detail.headlineMetrics.competitionExpected)} tone="fall" confidenceShownSeparately />
        </KpiTile>
        <KpiTile label="OPTIMAL ENTRY WINDOW" radius="md" note={`CLOSES ${formatQuarter(detail.headlineMetrics.entryWindow.closes)}`}>
          <Figure
            tier="prediction"
            value={formatEntryWindow(detail.headlineMetrics.entryWindow.opens, detail.headlineMetrics.entryWindow.closes)}
            tone="neutral"
            confidenceShownSeparately
            valueClassName="text-[19px]"
          />
        </KpiTile>
        <KpiTile label="FORECAST CONFIDENCE" radius="md" className="col-span-2 sm:col-span-1">
          <span className="text-trends-text">{Math.round(detail.headlineMetrics.confidence)}%</span>
          <span className="mt-[7px] block h-[5px] overflow-hidden rounded-full bg-trends-line-soft" aria-hidden="true">
            <span className="block h-full rounded-full bg-trends-rise" style={{ width: `${detail.headlineMetrics.confidence}%` }} />
          </span>
        </KpiTile>
      </div>

      <SectionHeading index="01" title="What is happening" caption={`MOMENTUM ◇ ${Math.round(detail.momentum)}/100 · ${formatSigned(delta)} OVER ${HORIZON_LABEL[horizon]}`} />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[2.15fr_1fr]">
        <section className="flex h-[400px] flex-col gap-4 rounded-xl border border-trends-line bg-trends-surface p-[22px]">
          <div className="flex items-center justify-between gap-3">
            <MonoLabel size="2xs">OBSERVED MOMENTUM ◇ — PREDICTED BAND ◈</MonoLabel>
            <MonoLabel size="xs">SHADED AREA = 80% PREDICTION BAND</MonoLabel>
          </div>
          <div className="flex-grow">
            <MomentumChart series={series} forecastBand={detail.forecastBand} direction={detail.direction} preset="detail" annotations={annotations} />
          </div>
          <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.1em] text-trends-text-faint">
            <span>{HORIZON_LABEL[horizon]} AGO</span>
            <span className="text-trends-rise">TODAY</span>
            <span>+12MO FORECAST ◈</span>
          </div>
        </section>

        <ScoreBreakdown breakdown={detail.breakdown} sourceCount={detail.sourceCount} />
      </div>

      <SignalTable signals={firstSignals} totalCount={detail.sourceCount} className="mt-[22px]" />

      <SectionHeading index="02" title="Why it is happening" caption="RANKED CATALYSTS · WEIGHTED CONTRIBUTION" className="mt-[46px]" />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[2.15fr_1fr]">
        <CatalystList catalysts={detail.catalysts} />
        <InvalidationRisks risks={detail.invalidationRisks} withdrawnCount={forecastsWithdrawnCount()} />
      </div>
    </div>
  );
}

function SectionHeading({ index, title, caption, className = "" }: { index: string; title: string; caption: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-end gap-[14px] border-b border-trends-line pb-[14px] ${className}`}>
      <span className="font-mono text-[12px] tracking-[0.1em] text-trends-rise">{index}</span>
      <h2 className="font-display text-[24px] font-semibold tracking-[-0.01em] text-trends-text">{title}</h2>
      <MonoLabel size="xs" className="mb-[4px]">
        {caption}
      </MonoLabel>
    </div>
  );
}
