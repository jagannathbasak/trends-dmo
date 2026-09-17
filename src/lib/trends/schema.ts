import { z } from "zod";

export const evidenceTierSchema = z.enum(["verified", "signal", "estimate", "prediction"]);
export const trendDirectionSchema = z.enum(["emerging", "accelerating", "steady", "declining"]);
export const trendStageSchema = z.enum(["early", "scaling", "mature", "fading"]);
export const horizonSchema = z.enum(["30d", "6mo", "12mo", "3yr"]);
export const signalTypeSchema = z.enum([
  "search_demand",
  "capital",
  "hiring",
  "procurement",
  "filings",
  "pricing",
  "social",
]);

export const momentumPointSchema = z.object({
  t: z.string(),
  value: z.number().min(0).max(100),
});

export const forecastPointSchema = z
  .object({
    t: z.string(),
    mid: z.number(),
    low: z.number(),
    high: z.number(),
  })
  .refine((p) => p.low <= p.mid && p.mid <= p.high, {
    message: "forecast point must satisfy low <= mid <= high",
  });

export const signalSchema = z
  .object({
    id: z.string(),
    tier: evidenceTierSchema,
    type: signalTypeSchema,
    what: z.string().min(1),
    sourceName: z.string().min(1),
    sourceUrl: z.string().nullable(),
    observedAt: z.string(),
    changePct: z.number().nullable(),
    weight: z.number().min(0).max(1),
    method: z.string().min(1).optional(),
  })
  .refine((s) => s.tier !== "estimate" || Boolean(s.method), {
    message: "an estimate signal must carry its method",
    path: ["method"],
  });

export const catalystSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  body: z.string().min(1),
  weight: z.number().min(0).max(1),
});

function descendingWeights(catalysts: { weight: number }[]): boolean {
  return catalysts.every((c, i) => i === 0 || catalysts[i - 1].weight >= c.weight);
}

export const catalystListSchema = z
  .array(catalystSchema)
  .refine(descendingWeights, { message: "catalysts must be ranked by descending weight" });

export const invalidationRiskSchema = z.object({
  id: z.string(),
  condition: z.string().min(1),
});

export const relatedEntitySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  kind: z.enum(["company", "topic", "trend"]),
  href: z.string(),
  role: z.string().optional(),
  logoUrl: z.string().nullable().optional(),
});

export const forecastTeaserSchema = z.object({
  horizon: horizonSchema,
  changePct: z.number(),
  confidence: z.number().min(0).max(100),
});

export const trendSummarySchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  summary: z.string().min(1),
  stage: trendStageSchema,
  momentum: z.number().min(0).max(100),
  momentumDelta: z.number(),
  direction: trendDirectionSchema,
  series: z.array(momentumPointSchema).min(2),
  keySignals: z.array(signalSchema).max(3),
  topCatalysts: catalystListSchema.refine((c) => c.length <= 2, {
    message: "at most two catalysts appear on a card",
  }),
  forecastTeaser: forecastTeaserSchema,
  sourceCount: z.number().int().min(0),
  geography: z.string().min(1),
  updatedAt: z.string(),
});

const scenarioSchema = z.object({
  kind: z.enum(["base", "accelerated", "stall"]),
  probability: z.number().min(0).max(1),
  body: z.string().min(1),
});

const scenariosSchema = z
  .array(scenarioSchema)
  .refine((scenarios) => Math.abs(scenarios.reduce((sum, s) => sum + s.probability, 0) - 1) <= 0.01, {
    message: "scenario probabilities must sum to 1 (±0.01)",
  });

export const trendDetailSchema = trendSummarySchema.extend({
  headlineMetrics: z.object({
    demandForecast: z.object({ value: z.number(), bandLow: z.number(), bandHigh: z.number() }),
    opportunityProbability: z.number().min(0).max(100),
    competitionExpected: z.number(),
    entryWindow: z.object({ opens: z.string(), closes: z.string() }),
    confidence: z.number().min(0).max(100),
  }),
  breakdown: z.object({
    demand: z.number().min(0).max(100),
    competition: z.number().min(0).max(100),
    opportunity: z.number().min(0).max(100),
    demandNote: z.string().min(1),
    competitionNote: z.string().min(1),
    opportunityNote: z.string().min(1),
    confidence: z.enum(["high", "medium", "low"]),
  }),
  seriesByHorizon: z.record(horizonSchema, z.array(momentumPointSchema)),
  forecastBand: z.array(forecastPointSchema),
  annotations: z.array(z.object({ t: z.string(), label: z.string() })),
  catalysts: catalystListSchema,
  invalidationRisks: z.array(invalidationRiskSchema),
  forecast: z.object({
    headline: z.string().min(1),
    scenarios: scenariosSchema,
    leadingIndicators: z.array(z.string().min(1)),
    generatedAt: z.string(),
    modelVersion: z.string().min(1),
  }),
  decision: z.object({
    actNowProbability: z.number().min(0).max(1),
    waitProbability: z.number().min(0).max(1),
    waitPeriodLabel: z.string().min(1),
    moves: z.array(z.string().min(1)),
  }),
  related: z.object({
    companies: z.array(relatedEntitySchema),
    trends: z.array(relatedEntitySchema),
  }),
});

export type ValidatedTrendSummary = z.infer<typeof trendSummarySchema>;
export type ValidatedTrendDetail = z.infer<typeof trendDetailSchema>;
