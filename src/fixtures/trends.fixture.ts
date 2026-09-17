import "server-only";

import type {
  Catalyst,
  ForecastPoint,
  Horizon,
  InvalidationRisk,
  MomentumPoint,
  RelatedEntity,
  Signal,
  SignalType,
  TrendDetail,
  TrendDirection,
  TrendSummary,
} from "@/types/trends";
import { TREND_SEEDS, type SeedSignal, type TrendSeed } from "@/fixtures/trends.seeds";

/**
 * Server-only fixture dataset. Numbers are generated deterministically from the
 * scalar parameters in trends.seeds.ts — never hand-typed and never random, so
 * the same trend renders the same chart on every request. This stands in for the
 * ingestion/scoring backend described in the spec until that exists; swapping it
 * out later means replacing what lib/trends/api.ts calls, not the route handlers
 * or components that call it.
 */

const NOW = new Date("2026-09-17T09:00:00.000Z");

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  return h;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * 86_400_000);
}

const HORIZON_CONFIG: Record<Horizon, { points: number; stepDays: number }> = {
  "30d": { points: 11, stepDays: 3 },
  "6mo": { points: 13, stepDays: 15 },
  "12mo": { points: 13, stepDays: 30 },
  "3yr": { points: 13, stepDays: 84 },
};

const HORIZON_ORDER: Horizon[] = ["30d", "6mo", "12mo", "3yr"];

const DIRECTION_SWING: Record<TrendDirection, number> = {
  emerging: 26,
  accelerating: 22,
  steady: 6,
  declining: -18,
};

function buildHorizonSeries(seedKey: string, endValue: number, direction: TrendDirection, horizon: Horizon): MomentumPoint[] {
  const { points, stepDays } = HORIZON_CONFIG[horizon];
  const totalDays = points * stepDays;
  const scaleFactor = clamp(Math.sqrt(totalDays / 30), 0.7, 3.2);
  const swing = DIRECTION_SWING[direction] * scaleFactor;
  const startValue = clamp(endValue - swing, 2, 98);
  const noiseAmplitude = clamp(Math.abs(swing) * 0.18, 1.5, 6);
  const rand = mulberry32(hashSeed(`${seedKey}-${horizon}`));

  const series: MomentumPoint[] = [];
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const eased = progress * progress * (3 - 2 * progress);
    const base = startValue + (endValue - startValue) * eased;
    const noise = i === points - 1 ? 0 : (rand() - 0.5) * noiseAmplitude;
    const t = isoDate(addDays(NOW, -(points - 1 - i) * stepDays));
    series.push({ t, value: round1(clamp(base + noise, 0, 100)) });
  }
  return series;
}

function buildForecastBand(seedKey: string, todayValue: number, direction: TrendDirection, confidencePct: number): ForecastPoint[] {
  const points = 5;
  const stepDays = 90;
  const projectedSwing = DIRECTION_SWING[direction] * 0.55;
  const endMid = clamp(todayValue + projectedSwing, 2, 98);
  const widenBase = clamp((100 - confidencePct) * 0.35, 4, 28);
  const rand = mulberry32(hashSeed(`${seedKey}-band`));

  const band: ForecastPoint[] = [];
  for (let i = 0; i < points; i++) {
    const progress = (i + 1) / points;
    const mid = todayValue + (endMid - todayValue) * progress + (rand() - 0.5) * 1.5;
    const widen = widenBase * (0.35 + progress * 0.65);
    const t = isoDate(addDays(NOW, (i + 1) * stepDays));
    band.push({
      t,
      mid: round1(clamp(mid, 0, 100)),
      low: round1(clamp(mid - widen, 0, 100)),
      high: round1(clamp(mid + widen, 0, 100)),
    });
  }
  return band;
}

function toSignal(id: string, s: SeedSignal): Signal {
  return {
    id,
    tier: s.tier,
    type: s.type,
    what: s.what,
    sourceName: s.sourceName,
    sourceUrl: s.sourceUrl,
    observedAt: isoDate(addDays(NOW, -s.daysAgo)),
    changePct: s.changePct,
    weight: s.weight,
    ...(s.method ? { method: s.method } : {}),
  };
}

const FILLER_SIGNAL_TYPES: SignalType[] = [
  "search_demand",
  "capital",
  "hiring",
  "procurement",
  "filings",
  "pricing",
  "social",
];

const FILLER_TEMPLATES: { tier: Signal["tier"]; what: (label: string) => string }[] = [
  { tier: "signal", what: (l) => `${l} activity ticked up against its trailing baseline.` },
  { tier: "verified", what: (l) => `A filed disclosure confirmed continued movement in ${l.toLowerCase()} activity.` },
  { tier: "signal", what: (l) => `${l} volume was noted above the prior comparable period.` },
  { tier: "estimate", what: (l) => `${l} is estimated to have shifted based on sampled panel data.` },
];

const SIGNAL_TYPE_LABEL: Record<SignalType, string> = {
  search_demand: "Search demand",
  capital: "Capital movement",
  hiring: "Hiring",
  procurement: "Procurement",
  filings: "Filings",
  pricing: "Pricing",
  social: "Social",
};

const FILLER_SOURCES = [
  "Northline Labour Index",
  "Quietstone AI search index",
  "Copperline Ventures deal tracker",
  "Cascade Ledger filings index",
  "Ashgrove Partners survey",
  "Palisade Systems pricing tracker",
];

function buildFillerSignals(seed: TrendSeed, count: number): Signal[] {
  if (count <= 0) return [];
  const rand = mulberry32(hashSeed(`${seed.slug}-signals`));
  const direction = seed.direction === "declining" ? -1 : 1;
  const signals: Signal[] = [];
  for (let i = 0; i < count; i++) {
    const type = FILLER_SIGNAL_TYPES[Math.floor(rand() * FILLER_SIGNAL_TYPES.length)];
    const template = FILLER_TEMPLATES[Math.floor(rand() * FILLER_TEMPLATES.length)];
    const label = SIGNAL_TYPE_LABEL[type];
    const weight = round1(clamp(0.15 + rand() * 0.55, 0.1, 0.85)) / 1;
    const changePct = Math.round(direction * (3 + rand() * 22));
    const method = template.tier === "estimate" ? "Sampled panel data, method consistent with the category's other estimates." : undefined;
    signals.push({
      id: `${seed.slug}-signal-fill-${i}`,
      tier: template.tier,
      type,
      what: template.what(label),
      sourceName: FILLER_SOURCES[Math.floor(rand() * FILLER_SOURCES.length)],
      sourceUrl: null,
      observedAt: isoDate(addDays(NOW, -(4 + Math.floor(rand() * 90)))),
      changePct,
      weight: Math.round(weight * 100) / 100,
      ...(method ? { method } : {}),
    });
  }
  return signals.sort((a, b) => (a.observedAt < b.observedAt ? 1 : -1));
}

function buildCatalysts(seed: TrendSeed): Catalyst[] {
  return seed.catalysts.map((c, i) => ({
    id: `${seed.slug}-catalyst-${i}`,
    name: c.name,
    body: c.body,
    weight: c.weight,
  }));
}

function buildInvalidationRisks(seed: TrendSeed): InvalidationRisk[] {
  return seed.invalidationRisks.map((condition, i) => ({
    id: `${seed.slug}-risk-${i}`,
    condition,
  }));
}

function buildRelated(seed: TrendSeed): TrendDetail["related"] {
  const companies: RelatedEntity[] = seed.relatedCompanies.map((c, i) => ({
    id: `${seed.slug}-company-${i}`,
    name: c.name,
    kind: "company",
    href: "#",
    role: c.role,
    logoUrl: null,
  }));

  const trends: RelatedEntity[] = seed.relatedTrendSlugs.map((slug) => {
    const target = TREND_SEEDS.find((s) => s.slug === slug);
    return {
      id: `${seed.slug}-related-${slug}`,
      name: target?.name ?? slug,
      kind: "trend",
      href: `/trends/${slug}`,
    };
  });

  return { companies, trends };
}

function buildAnnotations(seed: TrendSeed, series12mo: MomentumPoint[]): { t: string; label: string }[] {
  const firstCatalyst = seed.catalysts[0];
  if (!firstCatalyst || series12mo.length < 4) return [];
  const index = Math.floor(series12mo.length * 0.55);
  return [{ t: series12mo[index].t, label: `${firstCatalyst.name} entered` }];
}

function buildTrend(seed: TrendSeed): TrendDetail {
  const seriesByHorizon = Object.fromEntries(
    HORIZON_ORDER.map((h) => [h, buildHorizonSeries(seed.slug, seed.momentum, seed.direction, h)]),
  ) as Record<Horizon, MomentumPoint[]>;

  const forecastBand = buildForecastBand(seed.slug, seed.momentum, seed.direction, seed.metrics.confidencePct);
  const namedSignals = seed.keySignals.map((s, i) => toSignal(`${seed.slug}-signal-${i}`, s));
  const catalysts = buildCatalysts(seed);

  const summary: TrendSummary = {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    summary: seed.summary,
    stage: seed.stage,
    momentum: seed.momentum,
    momentumDelta: seed.momentumDelta,
    direction: seed.direction,
    series: seriesByHorizon["30d"],
    keySignals: namedSignals,
    topCatalysts: catalysts.slice(0, 2),
    forecastTeaser: {
      horizon: "12mo",
      changePct: seed.metrics.demandPct,
      confidence: seed.metrics.confidencePct,
    },
    sourceCount: seed.sourceCount,
    geography: seed.geography,
    updatedAt: NOW.toISOString(),
  };

  const detail: TrendDetail = {
    ...summary,
    headlineMetrics: {
      demandForecast: {
        value: seed.metrics.demandPct,
        bandLow: seed.metrics.demandBandLow,
        bandHigh: seed.metrics.demandBandHigh,
      },
      opportunityProbability: seed.metrics.opportunityPct,
      competitionExpected: seed.metrics.competitionPct,
      entryWindow: { opens: seed.metrics.entryOpens, closes: seed.metrics.entryCloses },
      confidence: seed.metrics.confidencePct,
    },
    breakdown: {
      demand: seed.metrics.demandScore,
      competition: seed.metrics.competitionScore,
      opportunity: seed.metrics.opportunityScore,
      demandNote: seed.metrics.demandNote,
      competitionNote: seed.metrics.competitionNote,
      opportunityNote: seed.metrics.opportunityNote,
      confidence: seed.metrics.confidencePct >= 75 ? "high" : seed.metrics.confidencePct >= 55 ? "medium" : "low",
    },
    seriesByHorizon,
    forecastBand,
    annotations: buildAnnotations(seed, seriesByHorizon["12mo"]),
    catalysts,
    invalidationRisks: buildInvalidationRisks(seed),
    forecast: {
      headline: seed.forecastHeadline,
      scenarios: [
        { kind: "base", probability: 0.62, body: seed.scenarios.base },
        { kind: "accelerated", probability: 0.23, body: seed.scenarios.accelerated },
        { kind: "stall", probability: 0.15, body: seed.scenarios.stall },
      ],
      leadingIndicators: seed.leadingIndicators,
      generatedAt: NOW.toISOString(),
      modelVersion: "nvile-forecast-2026.3",
    },
    decision: {
      actNowProbability: seed.actNowProbability,
      waitProbability: seed.waitProbability,
      waitPeriodLabel: seed.waitPeriodLabel,
      moves: seed.moves,
    },
    related: buildRelated(seed),
  };

  return detail;
}

/** All signals for a trend, including generated filler rows, for the paginated evidence trail. */
export const FIXTURE_SIGNALS: Record<string, Signal[]> = Object.fromEntries(
  TREND_SEEDS.map((seed) => {
    const namedSignals = seed.keySignals.map((s, i) => toSignal(`${seed.slug}-signal-${i}`, s));
    const fillerCount = Math.max(0, seed.sourceCount - namedSignals.length);
    return [seed.slug, [...namedSignals, ...buildFillerSignals(seed, fillerCount)]];
  }),
);

export const FIXTURE_TRENDS: TrendDetail[] = TREND_SEEDS.map(buildTrend);

export function toSummary(detail: TrendDetail): TrendSummary {
  const {
    id,
    slug,
    name,
    category,
    summary,
    stage,
    momentum,
    momentumDelta,
    direction,
    series,
    keySignals,
    topCatalysts,
    forecastTeaser,
    sourceCount,
    geography,
    updatedAt,
  } = detail;
  return {
    id,
    slug,
    name,
    category,
    summary,
    stage,
    momentum,
    momentumDelta,
    direction,
    series,
    keySignals,
    topCatalysts,
    forecastTeaser,
    sourceCount,
    geography,
    updatedAt,
  };
}

export const FIXTURE_SOURCES_SCANNED = 214;
