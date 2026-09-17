import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EvidenceLegend from "@/components/primitives/EvidenceLegend";
import FeaturedTrendCard from "@/components/trends/FeaturedTrendCard";
import TrendCard from "@/components/trends/TrendCard";
import TrendColumn from "@/components/trends/TrendColumn";
import { ChevronDownIcon, SearchIcon } from "@/components/trends/icons";
import { getTrendSections, listTrends, sourcesScanned } from "@/lib/trends/api";
import { CATEGORIES } from "@/lib/trends/categories";
import { formatRelativeTime } from "@/lib/trends/format";

const PERIODS = ["30D", "6MO", "12MO", "3YR"] as const;

const FILTER_BUTTON =
  "flex h-[42px] items-center gap-[9px] rounded-md border border-trends-line bg-trends-surface px-[15px] text-[13px] text-trends-text";

export default function TrendsPage() {
  const sections = getTrendSections();
  const [featured, ...standard] = sections.trending;
  const { total } = listTrends({ limit: 1 });
  const freshness = sections.trending[0]?.updatedAt ?? new Date().toISOString();

  return (
    <>
      <Navbar />
      <main className="font-trends-sans">
        <div className="mx-auto flex max-w-[1280px] flex-col px-5 pb-16 sm:px-8">
          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-[40px] font-bold leading-[1.02] tracking-[-0.03em] text-trends-text sm:text-[52px]">
                Trends
              </h1>
              <p className="max-w-[760px] text-pretty text-[16px] text-trends-text-muted">
                What is moving across markets, technology, AI, finance, startups, consumer behaviour, industry and
                science — why it is moving, and where it leads.
              </p>
            </div>
            <span className="whitespace-nowrap font-mono text-[11px] tracking-[0.12em] text-trends-text-muted">
              UPDATED {formatRelativeTime(freshness)} · {sourcesScanned()} SOURCES SCANNED
            </span>
          </div>

          <form className="mt-[30px] flex flex-col gap-3 sm:flex-row">
            <label htmlFor="trends-search" className="sr-only">
              Search trends
            </label>
            <div className="flex h-[58px] flex-grow items-center gap-[14px] rounded-lg border border-trends-line bg-trends-surface px-5">
              <SearchIcon className="flex-shrink-0 text-trends-text-muted" />
              <input
                id="trends-search"
                type="search"
                placeholder="Search a trend, market, technology, company or behaviour"
                className="flex-grow bg-transparent text-[15px] text-trends-text outline-none placeholder:text-trends-text-faint"
              />
              <span className="rounded border border-trends-line px-[7px] py-1 font-mono text-[10px] tracking-[0.1em] text-trends-text-faint">
                ⌘K
              </span>
            </div>
            <button
              type="submit"
              className="h-[58px] rounded-lg bg-trends-rise px-8 text-[15px] font-semibold text-trends-on-accent transition hover:brightness-110"
            >
              Search
            </button>
          </form>

          <div className="mt-[14px] flex flex-wrap items-center gap-[10px]">
            <button type="button" className={FILTER_BUTTON}>
              Category: All
              <ChevronDownIcon className="text-trends-text-muted" />
            </button>

            <div className="flex h-[42px] items-center gap-[2px] rounded-md border border-trends-line bg-trends-surface p-1">
              {PERIODS.map((period) => (
                <button
                  key={period}
                  type="button"
                  className={`h-[32px] rounded px-[14px] font-mono text-[12px] ${
                    period === "30D" ? "bg-trends-rise-bg text-trends-rise" : "text-trends-text-muted"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            <button type="button" className={FILTER_BUTTON}>
              Geography: Global
              <ChevronDownIcon className="text-trends-text-muted" />
            </button>
            <button type="button" className={FILTER_BUTTON}>
              Evidence: All tiers
              <ChevronDownIcon className="text-trends-text-muted" />
            </button>
            <button type="button" className={FILTER_BUTTON}>
              Sort: Momentum
              <ChevronDownIcon className="text-trends-text-muted" />
            </button>

            <div className="flex-grow" />
            <EvidenceLegend />
          </div>

          <div id="trending" className="scroll-mt-20 mt-[46px] flex items-end justify-between gap-4 border-b border-trends-line pb-[14px]">
            <div className="flex flex-col gap-[6px]">
              <h2 className="font-display text-[24px] font-semibold tracking-[-0.01em] text-trends-text">Trending now</h2>
              <span className="font-mono text-[10px] tracking-[0.12em] text-trends-text-muted">
                RANKED BY 30-DAY MOMENTUM · ALL CATEGORIES
              </span>
            </div>
            <Link href="#trending" className="whitespace-nowrap text-[13px] text-trends-rise hover:brightness-110">
              View all {total} →
            </Link>
          </div>

          {featured ? <FeaturedTrendCard trend={featured} className="mt-[22px]" /> : null}

          <div className="mt-[22px] grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {standard.map((trend) => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
          </div>

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
                  className="rounded-full border border-trends-line bg-trends-surface px-4 py-[10px] text-[13px] text-trends-text hover:border-trends-line-accent"
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
      </main>
      <Footer />
    </>
  );
}
