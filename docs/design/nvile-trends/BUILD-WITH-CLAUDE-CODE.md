# NVILE Trends → Next.js

Everything Claude Code needs to build the Trends hub and Trend detail page from the design.

## What is in this folder

```
BUILD-WITH-CLAUDE-CODE.md     ← this file: the spec, and the prompt to paste
reference/trends-hub.html     ← the design, as standalone HTML. Open it in a browser.
reference/trend-detail.html
reference/trend-card.html     ← the card anatomy, with each field numbered and explained
```

The three HTML files are the real design, exported from the canvas — exact colors, type, spacing, SVG charts and markup. They are the source of truth for the visual layer. Claude Code should read them, not guess from a description.

## How to hand it over

1. Unzip this folder into the repo at `docs/design/nvile-trends/`.
2. Open Claude Code at the repo root.
3. Paste the prompt below.

```
Read docs/design/nvile-trends/BUILD-WITH-CLAUDE-CODE.md in full, then read all three
files in docs/design/nvile-trends/reference/. Those HTML files are the approved design —
treat their exact colors, spacing, type sizes, border radii and SVG chart markup as the
specification, not as inspiration.

Before writing any code, explore this repo and report back in one message: the Next.js
version and whether it uses the App Router, the styling system and where its tokens live,
the data-fetching pattern, any existing UI primitives I should reuse, and the two or three
existing pages whose structure I should follow. Then give me a file plan.

Where this repo already has a token, primitive or pattern that matches the design, use the
repo's version. Where it does not, add the token from the spec's token table rather than
hardcoding a hex value in a component. If something in the design has no equivalent here
and no obvious home, stop and ask me.

After I approve the file plan, build in the phases in §9, one commit per phase, with
typecheck and lint clean before each.
```

---

## 1. Scope

Two routes — a discovery hub and a trend detail page — plus the shared trend card. Not in scope: the scoring model, ingestion, auth, the watchlist page itself.

The pages are read-heavy and should be indexable, so both are React Server Components that fetch on the server. Only the filter bar, the horizon and period selectors, the signal-type filter and the search box are client components.

## 2. Design tokens

Take these from `reference/trends-hub.html`; they are listed here so they can go into the token layer in one place.

| Token | Value | Use |
|---|---|---|
| `bg` | `#0A0F0E` | page ground |
| `surface` | `#101817` | cards, controls |
| `surface-sunken` | `#0C1211` | rows, table header, nested panels |
| `surface-accent` | `linear-gradient(180deg,#111B19,#0D1413)` | featured card, base-case scenario, act-now tile |
| `line` | `#1D2B28` | card and control borders |
| `line-soft` | `#16211F` | dividers inside a card, meter tracks |
| `line-accent` | `#23413A` | border on accented surfaces |
| `text` | `#E9F0ED` | primary |
| `text-secondary` | `#C9D6D2` | signal and list copy |
| `text-muted` | `#8A9B97` | body secondary, mono labels |
| `text-faint` | `#6E7E7A` | timestamps, ranks, placeholder |
| `rise` | `#4FD6A6` | accent, rising direction, verified/positive |
| `rise-bg` | `#1F3A33` | selected segment background |
| `fall` | `#E8836F` | declining, competition, risk |
| `fall-surface` | `#150F0E` + border `#3A2A26` | invalidation-risk panel |
| `on-accent` | `#04120D` | text on a `rise` fill |

Radii: `4` chips, `6` small controls, `8` buttons and rows, `10`–`12` cards, `22` pills. Control heights: `44` primary action, `42` filter control, `34` segment item, `32` inline filter chip.

Type: **Space Grotesk** 500/600/700 for display (h1 54/52, h2 24, card title 23, figures 25–34, tracking `-0.01` to `-0.03em`); **IBM Plex Sans** 400/500/600 for body (13–17px, line-height 1.45–1.55); **IBM Plex Mono** 400/500 for every label, figure caption, timestamp and tier glyph (9–13px, uppercase, letter-spacing `0.08`–`0.16em`, usually `text-muted`).

If the product already has licensed faces, swap both families at the token level — nothing in the components should name a font.

## 3. The evidence notation — non-negotiable

Every figure on both pages carries the tier it came from, using the site's existing glyphs:

| Glyph | Tier | Meaning |
|---|---|---|
| `●` | VERIFIED | filings, registries, procurement records, government datasets |
| `◦` | SIGNAL | observed behaviour: hiring, pricing, capital movement, search, shipping |
| `◇` | ESTIMATE | derived figure; method and inputs shown beside the number |
| `◈` | PREDICTION | model output, with a band, a confidence score, named catalysts and named invalidation risks |

Rules the components must enforce:

- A momentum score renders as `MOMENTUM ◇`. A forecast figure renders with `◈`. A signal row renders its own tier.
- A `◈` figure never renders without its confidence and never without the band where one exists.
- Direction is never conveyed by color alone — arrow icon plus the word, always.
- The legend (`● VERIFIED ◦ SIGNAL ◇ ESTIMATE ◈ PREDICTION`) appears once per page.
- The glyph is decorative to a screen reader; the tier name is the accessible text. Render the glyph `aria-hidden` next to a visually-hidden or visible tier label.

Build this as one `<Figure tier={...} value={...} confidence={...} />` primitive. If a number renders without going through it, that is a bug.

## 4. Data contracts

`src/types/trends.ts`:

```ts
export type EvidenceTier = 'verified' | 'signal' | 'estimate' | 'prediction';
export type TrendDirection = 'emerging' | 'accelerating' | 'steady' | 'declining';
export type Horizon = '30d' | '6mo' | '12mo' | '3yr';
export type SignalType =
  | 'search_demand' | 'capital' | 'hiring' | 'procurement' | 'filings' | 'pricing' | 'social';

export interface MomentumPoint { t: string; value: number }
export interface ForecastPoint { t: string; mid: number; low: number; high: number }

export interface Signal {
  id: string; tier: EvidenceTier; type: SignalType;
  what: string;                       // one line, plain language
  sourceName: string; sourceUrl: string | null; observedAt: string;
  changePct: number | null; weight: number;   // 0–1
  method?: string;                    // required when tier === 'estimate'
}

export interface Catalyst { id: string; name: string; body: string; weight: number }  // weight 0–1, shown as .41
export interface InvalidationRisk { id: string; condition: string }

export interface TrendSummary {
  id: string; slug: string; name: string; category: string;
  summary: string;                    // one sentence: the mechanism, not the symptom
  stage: 'early' | 'scaling' | 'mature' | 'fading';
  momentum: number;                   // 0–100, tier: estimate
  momentumDelta: number;              // over the selected period
  direction: TrendDirection;
  series: MomentumPoint[];
  keySignals: Signal[];               // max 3 on a card
  topCatalysts: Catalyst[];           // max 2 on a card
  forecastTeaser: { horizon: Horizon; changePct: number; confidence: number };
  sourceCount: number; geography: string; updatedAt: string;
}

export interface TrendDetail extends TrendSummary {
  headlineMetrics: {
    demandForecast: { value: number; bandLow: number; bandHigh: number };
    opportunityProbability: number;
    competitionExpected: number;
    entryWindow: { opens: string; closes: string };
    confidence: number;
  };
  breakdown: {
    demand: number; competition: number; opportunity: number;
    demandNote: string; competitionNote: string; opportunityNote: string;
    confidence: 'high' | 'medium' | 'low';
  };
  seriesByHorizon: Record<Horizon, MomentumPoint[]>;
  forecastBand: ForecastPoint[];
  annotations: { t: string; label: string }[];
  catalysts: Catalyst[];
  invalidationRisks: InvalidationRisk[];
  forecast: {
    headline: string;
    scenarios: { kind: 'base' | 'accelerated' | 'stall'; probability: number; body: string }[];
    leadingIndicators: string[];
    generatedAt: string; modelVersion: string;
  };
  decision: {
    actNowProbability: number; waitProbability: number; waitPeriodLabel: string;
    moves: string[];
  };
  related: { companies: RelatedEntity[]; trends: RelatedEntity[] };
}

export interface RelatedEntity {
  id: string; name: string; kind: 'company' | 'topic' | 'trend';
  href: string; role?: string; logoUrl?: string | null;
}
```

Validate at the fetch boundary: scenario probabilities sum to 1 ± 0.01; catalyst weights descending; a `prediction` figure always has a confidence; an `estimate` signal always has `method`; `keySignals.length <= 3`.

## 5. API

```
GET /api/trends/sections?horizon=&category=&geo=&tier=
  → { trending: TrendSummary[], emerging: [...], accelerating: [...], declining: [...] }
GET /api/trends?q=&category=&horizon=&geo=&tier=&sort=&section=&cursor=&limit=
  → { items: TrendSummary[], nextCursor, total }
GET /api/trends/[slug]?horizon=
  → TrendDetail
GET /api/trends/[slug]/signals?type=&cursor=&limit=
  → { items: Signal[], nextCursor }
POST /api/watchlist { trendId } · DELETE /api/watchlist/[trendId]
```

First paint of the hub uses `sections` — one request, four sections. Cache at the edge for 5 minutes with `stale-while-revalidate`; the page shows "UPDATED n MIN AGO", it is not a ticker.

## 6. Routes and file plan

```
app/trends/page.tsx                    server: fetches sections, renders the hub
app/trends/loading.tsx                 skeletons matching card dimensions
app/trends/error.tsx
app/trends/category/[category]/page.tsx
app/trends/[slug]/page.tsx             server: fetches detail, generateMetadata + JSON-LD
app/trends/[slug]/loading.tsx
app/trends/[slug]/error.tsx
components/trends/TrendCard.tsx
components/trends/TrendCardCompact.tsx
components/trends/TrendColumn.tsx
components/trends/FeaturedTrendCard.tsx
components/trends/TrendsFilterBar.tsx        'use client'
components/trends/TrendsSearch.tsx           'use client'
components/trends/HorizonTabs.tsx            'use client'
components/trends/SignalTable.tsx
components/trends/SignalTypeFilter.tsx       'use client'
components/trends/CatalystList.tsx
components/trends/InvalidationRisks.tsx
components/trends/ForecastScenarios.tsx
components/trends/DecisionPanel.tsx
components/trends/MomentumChart.tsx          SVG, server-rendered
components/trends/Sparkline.tsx              SVG
components/primitives/Figure.tsx             tier glyph + value + confidence
components/primitives/TierBadge.tsx
components/primitives/DirectionBadge.tsx
components/primitives/Meter.tsx
components/primitives/MonoLabel.tsx
components/primitives/EvidenceLegend.tsx
lib/trends/api.ts  lib/trends/schema.ts  types/trends.ts
```

Charts are inline SVG rendered on the server — copy the path and band geometry from the reference files. Do not pull in a charting library for these two shapes.

## 7. The hub — `/trends`

Order: nav → heading with `UPDATED n MIN AGO · n SOURCES SCANNED` → search → filter bar → evidence legend → **Trending now** (one featured card, then three cards) → **Emerging / Accelerating / Declining** as three parallel columns of four compact rows → browse by area → the disclosure line.

Filters map to URL params and the URL is the single source of truth: `q`, `category`, `horizon` (`30d|6mo|12mo|3yr`, default `30d`), `geo`, `tier`, `sort`. Read on mount, write with `router.replace`, restore exactly from a pasted URL, fall back silently on a malformed value. Changing a filter refetches the sections; it does not navigate.

The four states sit side by side deliberately — all four are legible at once, no tabs. Below `lg` they stack.

The featured card carries the four headline forecast tiles, the momentum chart with its forecast band, and ranked catalysts with weight bars. Standard cards carry the eight fields documented in `reference/trend-card.html`. Compact rows carry rank, name, stage, sparkline and the `◈` probability.

## 8. The detail page — `/trends/[slug]`

Built on the Decision Center spine, and the section numbers are part of the design:

- **01 · What is happening** — hero, horizon tabs, five headline metric tiles, the momentum chart with its 80% prediction band, the score breakdown rail, then the evidence trail table (tier, signal type, what happened, source, change, weight) with type filters and cursor pagination.
- **02 · Why it is happening** — ranked catalysts with weighted contributions, beside the named invalidation risks panel. The risks panel is required. If the model returns none, render it saying so; a page with no stated way to be wrong is the failure mode.
- **03 · What is likely next** — the headline call, three scenario cards (base emphasized), leading indicators to watch.
- **04 · What you should do about it** — act-now vs wait probabilities side by side, the moves, and the two actions.

Then related companies and connected trends, then a footer carrying generation time, model version, source count and "not a guarantee".

## 9. Build order

1. Types, zod schemas, API client, fixtures. No UI.
2. Primitives: `Figure`, `TierBadge`, `DirectionBadge`, `Meter`, `MonoLabel`, `EvidenceLegend`, `Sparkline`.
3. `TrendCard`, `TrendCardCompact`, `FeaturedTrendCard` against fixtures — compare side by side with `reference/trends-hub.html`.
4. `/trends` layout, fixtures only, no filtering.
5. Filter bar, search, URL state, wired to `sections`.
6. `/trends/[slug]` sections 01 and 02, including `MomentumChart`.
7. Evidence trail table with filtering and pagination.
8. Sections 03 and 04, related blocks.
9. Loading, empty and per-section error boundaries.
10. Accessibility and responsive passes.
11. Metadata, canonical, JSON-LD, sitemap entries.

One commit per phase.

## 10. Acceptance

- Every number on both pages renders through `Figure` and shows its tier; no `◈` without a confidence.
- Direction reads correctly in greyscale.
- A pasted `/trends?category=ai&horizon=12mo&tier=verified&sort=change` restores that exact view.
- The invalidation-risks panel is always present on a detail page.
- Every signal row shows a source; an estimate row shows its method.
- Keyboard only: filter, search, open a trend, switch horizon, filter signals, add to watchlist — all reachable with visible focus. Segmented controls are radio groups, so arrow keys work.
- Contrast ≥ 4.5:1 (3:1 above 24px) — check `text-faint` on `surface` and any text sitting on a `rise` fill.
- With `sections` failing for one section, the other three still render.
- No hex values, font names or pixel spacing hardcoded in a component.
- Both routes server-render; view-source shows the trend names and figures.
