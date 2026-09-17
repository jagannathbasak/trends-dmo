export type EvidenceTier = "verified" | "signal" | "estimate" | "prediction";
export type TrendDirection = "emerging" | "accelerating" | "steady" | "declining";
export type TrendStage = "early" | "scaling" | "mature" | "fading";
export type Horizon = "30d" | "6mo" | "12mo" | "3yr";
export type SignalType =
  | "search_demand"
  | "capital"
  | "hiring"
  | "procurement"
  | "filings"
  | "pricing"
  | "social";

export interface MomentumPoint {
  t: string;
  value: number;
}

export interface ForecastPoint {
  t: string;
  mid: number;
  low: number;
  high: number;
}

export interface Signal {
  id: string;
  tier: EvidenceTier;
  type: SignalType;
  what: string;
  sourceName: string;
  sourceUrl: string | null;
  observedAt: string;
  changePct: number | null;
  weight: number;
  method?: string;
}

export interface Catalyst {
  id: string;
  name: string;
  body: string;
  weight: number;
}

export interface InvalidationRisk {
  id: string;
  condition: string;
}

export interface RelatedEntity {
  id: string;
  name: string;
  kind: "company" | "topic" | "trend";
  href: string;
  role?: string;
  logoUrl?: string | null;
}

export interface HeadlineMetrics {
  demandForecast: { value: number; bandLow: number; bandHigh: number };
  opportunityProbability: number;
  competitionExpected: number;
  entryWindow: { opens: string; closes: string };
  confidence: number;
}

export interface TrendSummary {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  stage: TrendStage;
  momentum: number;
  momentumDelta: number;
  direction: TrendDirection;
  series: MomentumPoint[];
  /** Short lead-in to the full forecastBand on TrendDetail, for the featured card's chart. Same momentum-index scale as `series`, not the %-change figures in forecastTeaser. */
  forecastPreview?: ForecastPoint[];
  /** Populated for every trend; only the featured card's 4 KPI tiles read it. */
  headlineMetrics?: HeadlineMetrics;
  keySignals: Signal[];
  topCatalysts: Catalyst[];
  forecastTeaser: { horizon: Horizon; changePct: number; confidence: number };
  sourceCount: number;
  geography: string;
  updatedAt: string;
}

export interface TrendDetail extends TrendSummary {
  headlineMetrics: HeadlineMetrics;
  breakdown: {
    demand: number;
    competition: number;
    opportunity: number;
    demandNote: string;
    competitionNote: string;
    opportunityNote: string;
    confidence: "high" | "medium" | "low";
  };
  seriesByHorizon: Record<Horizon, MomentumPoint[]>;
  forecastBand: ForecastPoint[];
  annotations: { t: string; label: string }[];
  catalysts: Catalyst[];
  invalidationRisks: InvalidationRisk[];
  forecast: {
    headline: string;
    scenarios: { kind: "base" | "accelerated" | "stall"; probability: number; body: string }[];
    leadingIndicators: string[];
    generatedAt: string;
    modelVersion: string;
  };
  decision: {
    actNowProbability: number;
    waitProbability: number;
    waitPeriodLabel: string;
    moves: string[];
  };
  related: { companies: RelatedEntity[]; trends: RelatedEntity[] };
}

export interface TrendSection {
  trending: TrendSummary[];
  emerging: TrendSummary[];
  accelerating: TrendSummary[];
  declining: TrendSummary[];
}

export type TrendSort = "momentum" | "change" | "new";

export interface TrendFilters {
  q?: string;
  category?: string;
  horizon?: Horizon;
  geo?: string;
  tier?: EvidenceTier;
  sort?: TrendSort;
}
