import "server-only";

import { FIXTURE_SIGNALS, FIXTURE_SOURCES_SCANNED, FIXTURE_TRENDS, toSummary } from "@/fixtures/trends.fixture";
import type {
  EvidenceTier,
  Horizon,
  Signal,
  SignalType,
  TrendDetail,
  TrendDirection,
  TrendSection,
  TrendSummary,
} from "@/types/trends";
import { isCategorySlug } from "@/lib/trends/categories";

/**
 * Shared data-access layer over the fixture. Both the /api/trends/* route
 * handlers (client-side filter refetches) and the server-rendered pages (first
 * paint) call these directly, so the pages never make a self-referential HTTP
 * request to their own API.
 */

export interface TrendsQuery {
  q?: string;
  category?: string;
  horizon?: Horizon;
  geo?: string;
  tier?: EvidenceTier;
  sort?: "momentum" | "change" | "new";
}

const DEFAULT_HORIZON: Horizon = "30d";
const VALID_HORIZONS: Horizon[] = ["30d", "6mo", "12mo", "3yr"];
const VALID_TIERS: EvidenceTier[] = ["verified", "signal", "estimate", "prediction"];
const VALID_SORTS = ["momentum", "change", "new"] as const;

export function normalizeQuery(input: {
  q?: string | null;
  category?: string | null;
  horizon?: string | null;
  geo?: string | null;
  tier?: string | null;
  sort?: string | null;
}): Required<Pick<TrendsQuery, "sort" | "horizon">> & TrendsQuery {
  const category = input.category && input.category !== "all" && isCategorySlug(input.category) ? input.category : undefined;
  const horizon = VALID_HORIZONS.includes(input.horizon as Horizon) ? (input.horizon as Horizon) : DEFAULT_HORIZON;
  const geo = input.geo && input.geo !== "global" ? input.geo : undefined;
  const tier = VALID_TIERS.includes(input.tier as EvidenceTier) ? (input.tier as EvidenceTier) : undefined;
  const sort = (VALID_SORTS as readonly string[]).includes(input.sort ?? "") ? (input.sort as TrendsQuery["sort"]) : "momentum";
  return {
    ...(input.q ? { q: input.q } : {}),
    ...(category ? { category } : {}),
    horizon: horizon as Horizon,
    ...(geo ? { geo } : {}),
    ...(tier ? { tier } : {}),
    sort: sort ?? "momentum",
  };
}

function matchesQuery(trend: TrendSummary, query: TrendsQuery): boolean {
  if (query.category && trend.category !== query.category) return false;
  if (query.geo && trend.geography !== query.geo) return false;
  if (query.tier && !trend.keySignals.some((s) => s.tier === query.tier)) return false;
  if (query.q) {
    const needle = query.q.trim().toLowerCase();
    if (needle) {
      const haystack = `${trend.name} ${trend.summary} ${trend.category}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
  }
  return true;
}

function sortTrends(items: TrendSummary[], sort: TrendsQuery["sort"]): TrendSummary[] {
  const sorted = [...items];
  if (sort === "change") {
    sorted.sort((a, b) => b.momentumDelta - a.momentumDelta);
  } else if (sort === "new") {
    sorted.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  } else {
    sorted.sort((a, b) => b.momentum - a.momentum);
  }
  return sorted;
}

function summaries(): TrendSummary[] {
  return FIXTURE_TRENDS.map(toSummary);
}

export function getTrendSections(query: TrendsQuery = {}): TrendSection {
  const filtered = summaries().filter((t) => matchesQuery(t, query));
  const byDirection = (direction: TrendDirection) =>
    sortTrends(
      filtered.filter((t) => t.direction === direction),
      "momentum",
    ).slice(0, 4);

  return {
    trending: sortTrends(filtered, "momentum").slice(0, 4),
    emerging: byDirection("emerging"),
    accelerating: byDirection("accelerating"),
    declining: byDirection("declining"),
  };
}

export interface ListTrendsResult {
  items: TrendSummary[];
  nextCursor: string | null;
  total: number;
}

export function listTrends(
  query: TrendsQuery & { section?: "trending" | "emerging" | "accelerating" | "declining"; cursor?: string; limit?: number },
): ListTrendsResult {
  let filtered = summaries().filter((t) => matchesQuery(t, query));
  if (query.section && query.section !== "trending") {
    filtered = filtered.filter((t) => t.direction === query.section);
  }
  const sorted = sortTrends(filtered, query.sort);

  const limit = clampLimit(query.limit, 12);
  const offset = parseCursor(query.cursor);
  const page = sorted.slice(offset, offset + limit);
  const nextOffset = offset + limit;

  return {
    items: page,
    nextCursor: nextOffset < sorted.length ? String(nextOffset) : null,
    total: sorted.length,
  };
}

export function getTrendBySlug(slug: string): TrendDetail | null {
  return FIXTURE_TRENDS.find((t) => t.slug === slug) ?? null;
}

export interface ListSignalsResult {
  items: Signal[];
  nextCursor: string | null;
}

export function getTrendSignals(
  slug: string,
  opts: { type?: SignalType | "all"; cursor?: string; limit?: number } = {},
): ListSignalsResult {
  const all = FIXTURE_SIGNALS[slug] ?? [];
  const filtered = opts.type && opts.type !== "all" ? all.filter((s) => s.type === opts.type) : all;

  const limit = clampLimit(opts.limit, 5);
  const offset = parseCursor(opts.cursor);
  const page = filtered.slice(offset, offset + limit);
  const nextOffset = offset + limit;

  return {
    items: page,
    nextCursor: nextOffset < filtered.length ? String(nextOffset) : null,
  };
}

export function sourcesScanned(): number {
  return FIXTURE_SOURCES_SCANNED;
}

function clampLimit(limit: number | undefined, fallback: number): number {
  if (!limit || Number.isNaN(limit) || limit <= 0) return fallback;
  return Math.min(limit, 50);
}

function parseCursor(cursor: string | undefined): number {
  const n = Number(cursor);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/**
 * In-memory watchlist. There is no persistence layer yet — this stands in for
 * one, scoped to this server process, until real storage exists behind it.
 */
const watchlist = new Set<string>();

export function addToWatchlist(trendId: string): void {
  watchlist.add(trendId);
}

export function removeFromWatchlist(trendId: string): void {
  watchlist.delete(trendId);
}

export function isWatchlisted(trendId: string): boolean {
  return watchlist.has(trendId);
}
