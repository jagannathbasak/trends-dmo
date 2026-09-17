import Link from "next/link";
import { notFound } from "next/navigation";
import EvidenceLegend from "@/components/primitives/EvidenceLegend";
import FeaturedTrendCard from "@/components/trends/FeaturedTrendCard";
import TrendCard from "@/components/trends/TrendCard";
import TrendColumn from "@/components/trends/TrendColumn";
import TrendsFilterBar from "@/components/trends/TrendsFilterBar";
import TrendsSearch from "@/components/trends/TrendsSearch";
import { getTrendSections, listTrends, normalizeQuery, sourcesScanned } from "@/lib/trends/api";
import { CATEGORIES, categoryLabel, isCategorySlug } from "@/lib/trends/categories";
import { formatRelativeTime } from "@/lib/trends/format";

export interface TrendsHubProps {
  searchParams: Record<string, string | string[] | undefined>;
  /** Set by /trends/category/[category] — pre-applies the category and hides its dropdown. */
  forcedCategory?: string;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toParamsString(raw: Record<string, string | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}

export default function TrendsHub({ searchParams, forcedCategory }: TrendsHubProps) {
  if (forcedCategory && !isCategorySlug(forcedCategory)) {
    notFound();
  }

  const rawQuery = {
    q: firstValue(searchParams.q),
    category: forcedCategory ? undefined : firstValue(searchParams.category),
    horizon: firstValue(searchParams.horizon),
    geo: firstValue(searchParams.geo),
    tier: firstValue(searchParams.tier),
    sort: firstValue(searchParams.sort),
  };
  const currentParams = toParamsString(rawQuery);

  const query = normalizeQuery({ ...rawQuery, category: forcedCategory ?? rawQuery.category });
  const sections = getTrendSections(query);
  const [featured, ...standard] = sections.trending;
  const { total } = listTrends(query);
  const freshness = sections.trending[0]?.updatedAt ?? new Date().toISOString();

  const heading = forcedCategory
    ? `What is moving in ${categoryLabel(forcedCategory)} — why it is moving, and where it leads.`
    : "What is moving across markets, technology, AI, finance, startups, consumer behaviour, industry and science — why it is moving, and where it leads.";
  const trendingCaption = forcedCategory ? `${categoryLabel(forcedCategory).toUpperCase()} CATEGORY` : "ALL CATEGORIES";

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col px-5 pb-16 sm:px-8">
      <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-[40px] font-bold leading-[1.02] tracking-[-0.03em] text-trends-text sm:text-[52px]">
            Trends
          </h1>
          <p className="max-w-[760px] text-pretty text-[16px] text-trends-text-muted">{heading}</p>
        </div>
        <span className="whitespace-nowrap font-mono text-[11px] tracking-[0.12em] text-trends-text-muted">
          UPDATED {formatRelativeTime(freshness)} · {sourcesScanned()} SOURCES SCANNED
        </span>
      </div>

      <TrendsSearch defaultValue={query.q} currentParams={currentParams} className="mt-[30px]" />

      <div className="mt-[14px] flex flex-wrap items-center gap-[10px]">
        <TrendsFilterBar
          category={query.category}
          horizon={query.horizon}
          geo={query.geo}
          tier={query.tier}
          sort={query.sort}
          currentParams={currentParams}
          categoryLocked={Boolean(forcedCategory)}
        />
        <div className="flex-grow" />
        <EvidenceLegend />
      </div>

      <div id="trending" className="scroll-mt-20 mt-[46px] flex items-end justify-between gap-4 border-b border-trends-line pb-[14px]">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-display text-[24px] font-semibold tracking-[-0.01em] text-trends-text">Trending now</h2>
          <span className="font-mono text-[10px] tracking-[0.12em] text-trends-text-muted">
            RANKED BY 30-DAY MOMENTUM · {trendingCaption}
          </span>
        </div>
        <Link href="#trending" className="whitespace-nowrap text-[13px] text-trends-rise hover:brightness-110">
          View all {total} →
        </Link>
      </div>

      {featured ? <FeaturedTrendCard trend={featured} className="mt-[22px]" /> : <EmptyState />}

      {standard.length > 0 ? (
        <div className="mt-[22px] grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {standard.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      ) : null}

      <div className="mt-[50px] grid grid-cols-1 gap-[22px] lg:grid-cols-3">
        <TrendColumn
          id="emerging"
          title="Emerging"
          description="WHAT IS ABOUT TO TAKE OFF · HORIZON 12MO"
          href="#emerging"
          items={sections.emerging}
        />
        <TrendColumn
          id="accelerating"
          title="Accelerating"
          description="ESTABLISHED AND GAINING SPEED"
          href="#accelerating"
          items={sections.accelerating}
        />
        <TrendColumn
          id="declining"
          title="Declining"
          description="LOSING CAPITAL, ATTENTION OR ADOPTION"
          href="#declining"
          items={sections.declining}
        />
      </div>

      <div className="mt-[50px] flex flex-col gap-[14px]">
        <span className="font-mono text-[9px] tracking-[0.14em] text-trends-text-muted">BROWSE BY AREA</span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/trends/category/${category.slug}`}
              className={`rounded-full border px-4 py-[10px] text-[13px] hover:border-trends-line-accent ${
                category.slug === forcedCategory
                  ? "border-trends-line-accent bg-trends-rise-bg text-trends-rise"
                  : "border-trends-line bg-trends-surface text-trends-text"
              }`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-trends-line-soft pt-[18px] text-[12px] text-trends-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          Every figure is labelled by how much we actually know. Predictions are model output with a band, named
          catalysts and named invalidation risks — not a guarantee.
        </span>
        <Link href="#method" className="whitespace-nowrap text-trends-rise hover:brightness-110">
          Method →
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-[22px] flex flex-col items-start gap-2 rounded-xl border border-trends-line bg-trends-surface p-[26px]">
      <p className="text-[14px] text-trends-text-muted">
        No trends match the current filters. Use Reset in the filter bar above to clear them.
      </p>
    </div>
  );
}
