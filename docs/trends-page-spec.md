# NVILE — Trends page & Trend detail page

**Implementation spec for Claude Code.** Drop this at `docs/trends-page-spec.md` in the repo and point Claude Code at it.

---

## 0. Kickoff prompt

Paste this into Claude Code from the repo root:

> Read `docs/trends-page-spec.md` in full before writing any code.
>
> First, explore this repo and report back to me, in one message and without writing code: the framework and router in use, where pages/routes live, the styling system and where its tokens are defined, the existing data-fetching pattern, the component library or primitives already in use, and the two or three existing pages whose structure I should follow. Then propose a file plan for the Trends feature.
>
> Do not invent a visual style. Every color, font, radius, shadow, spacing step and control height must come from tokens and components that already exist in this repo. If something the spec needs has no existing equivalent, stop and tell me rather than inventing it.
>
> Once I approve the file plan, build in the phases listed in §12 of the spec, one phase per commit, running typecheck and lint before each.

---

## 1. Scope

Two routes: a Trends discovery hub and a Trend detail page. This spec covers layout, component boundaries, data contracts, URL state, loading/empty/error states, and accessibility. It does not cover the ingestion pipeline, the scoring model, or authentication — those are assumed to exist behind the API described in §4.

Not in scope: alerting delivery, the watchlist page itself (only its add/remove action), any admin or authoring surface.

---

## 2. Ground rules

The wireframe defines **structure and information hierarchy only**. It is deliberately monochrome with bracketed placeholders; it is not a visual design. Do not port its greys, its dashed borders, its sparkline stroke weights, or its `[ Trend name ]` placeholder syntax into the product.

Derive the visual layer from the repo: existing tokens, existing components, existing density. Where the wireframe shows a grey bar, that is a real content field — render the content, or the skeleton, never the bar.

Never fabricate trend data, scores, or company names for demo purposes. If the API is not ready, render the empty and loading states described in §10 against a typed fixture file at `src/fixtures/trends.fixture.ts`, clearly named as fixtures and excluded from production builds.

Direction must never be encoded by color alone — icon plus text label, always (§11).

---

## 3. Routes

| Route | Purpose |
|---|---|
| `/trends` | Discovery hub. Search, filters, four momentum sections, category browse. |
| `/trends/[slug]` | Trend detail. Momentum, score breakdown, drivers, signals, related, forecast. |
| `/trends/category/[category]` | Hub filtered to one area. Same component as `/trends` with the category filter pre-applied. |

`/trends` is server-rendered with the default filter set so it is indexable. `/trends/[slug]` is server-rendered and must emit per-trend `<title>`, meta description, canonical URL and JSON-LD (`Article` or `Dataset`, whichever the SEO setup already uses elsewhere in the repo).

---

## 4. Data contracts

Define these in `src/types/trends.ts`. Adjust naming to match repo conventions, not the other way around.

```ts
export type TrendDirection = 'emerging' | 'accelerating' | 'steady' | 'declining';
export type TrendPeriod = '7d' | '30d' | '90d' | '12m' | '5y';
export type SignalType =
  | 'search_demand' | 'funding' | 'hiring' | 'news' | 'patents' | 'social' | 'regulatory';

export interface MomentumPoint { t: string; value: number }          // t: ISO date

export interface TrendSummary {
  id: string;
  slug: string;
  name: string;
  category: string;                    // slug of the area: markets, ai, finance…
  summary: string;                     // one sentence, plain language
  momentum: number;                    // 0–100
  momentumDelta: number;               // change vs prior period, signed
  direction: TrendDirection;
  series: MomentumPoint[];             // sparkline, ≤ 60 points
  keySignals: KeySignal[];             // max 3 on a card
  whyItIsMoving: string;               // ≤ 2 sentences
  related: { companies: RelatedEntity[]; topics: RelatedEntity[] };
  geography: string;                   // 'global' or ISO region code
  updatedAt: string;
}

export interface KeySignal {
  id: string;
  type: SignalType;
  label: string;                       // what happened, one line
  changePct: number | null;
  weight: number;                      // 0–1, contribution to the score
  sourceName: string;
  sourceUrl: string | null;
  observedAt: string;
}

export interface RelatedEntity {
  id: string; name: string; kind: 'company' | 'topic' | 'trend';
  href: string; role?: string; logoUrl?: string | null;
}

export interface ScoreBreakdown {
  demand: number; competition: number; opportunity: number;   // each 0–100
  demandNote: string; competitionNote: string; opportunityNote: string;
  confidence: 'high' | 'medium' | 'low';
  sourceCount: number;
}

export interface Driver { id: string; kind: 'driver' | 'counterforce'; title: string; body: string }

export interface ForecastScenario {
  id: string;
  kind: 'base' | 'accelerated' | 'stall';
  title: string;
  probability: number;                 // 0–1, the three must sum to 1
  body: string;
}

export interface Forecast {
  headline: string;                    // the call, 1–2 sentences
  horizon: '6m' | '12m' | '3y';
  scenarios: ForecastScenario[];
  leadingIndicators: string[];
  implications: string[];
  generatedAt: string;
  modelVersion: string;
}

export interface TrendDetail extends TrendSummary {
  breakdown: ScoreBreakdown;
  drivers: Driver[];
  forecastsByHorizon: Record<'6m' | '12m' | '3y', Forecast>;
  seriesByPeriod: Record<TrendPeriod, MomentumPoint[]>;
  annotations: { t: string; label: string }[];   // marked events on the chart
}
```

Invariants to enforce in a validator (zod or whatever the repo uses) at the fetch boundary: `momentum` within 0–100; scenario probabilities sum to 1 ± 0.01; `keySignals.length <= 3`; `series.length >= 2` or the sparkline is not rendered.

---

## 5. API

```
GET /api/trends
  ?q=&category=&period=30d&geo=global&sort=momentum&section=trending|emerging|accelerating|declining&limit=&cursor=
  → { section, items: TrendSummary[], nextCursor: string | null, total: number }

GET /api/trends/sections?period=&category=&geo=
  → { trending: TrendSummary[], emerging: TrendSummary[], accelerating: TrendSummary[], declining: TrendSummary[] }

GET /api/trends/:slug?period=&horizon=
  → TrendDetail

GET /api/trends/:slug/signals?type=&cursor=&limit=
  → { items: KeySignal[], nextCursor: string | null }

POST /api/watchlist   { trendId }        → 204
DELETE /api/watchlist/:trendId           → 204
```

The hub's first paint uses `/api/trends/sections` — one request, four sections. Filter changes refetch that same endpoint. "View all" within a section switches to the paginated `/api/trends?section=…`.

Cache `sections` and detail responses at the edge for 5 minutes with `stale-while-revalidate`; scores move continuously but not per-second, and the page must not feel like a ticker.

---

## 6. `/trends` — the hub

Top to bottom:

**Header.** Existing app nav. `Trends` is the active item.

**Page heading.** `Trends` plus one sentence of subhead naming the areas covered.

**Search.** A single full-width `<input type="search">` inside a labelled form, with a submit button. The visible label may be visually hidden but must exist. Submitting sets `?q=` and filters all four sections server-side; it does not navigate to a separate results route. Debounce type-ahead suggestions at 200ms if suggestions exist; if they do not, ship without them rather than faking them.

**Filter bar.** One row, left-aligned, with a reset control at the far right that appears only when a filter is non-default:
- Category — dropdown, options from the area list, default `All`
- Time period — segmented control, `7D / 30D / 90D / 12M`, default `30D`
- Geography — dropdown, default `Global`
- Sort — dropdown: `Momentum`, `Biggest change`, `Newest`

Each maps to a URL query param (`category`, `period`, `geo`, `sort`). The URL is the single source of truth: filter state is read from the URL on mount, written on change with a replace (not push) for rapid toggles, and the page must restore exactly from a pasted URL. Changing a filter refetches; it does not full-page navigate.

**Trending Now.** Section header with the rule beneath it, a one-line explanation of what the ranking means, and a `View all` link. Three full `TrendCard`s in a 3-column grid.

**Emerging / Accelerating / Declining.** Three equal columns side by side, each with its own header, one-line definition, `All →` link, and four `TrendCardCompact` rows. Side by side is deliberate — the four states are meant to be legible at once rather than hidden behind tabs. Below `lg` they stack (§11).

**Browse by area.** A wrapped row of category links, each navigating to `/trends/category/[category]`.

**Footer line.** One sentence on update cadence.

### Component inventory

```
TrendsPage
├── TrendsSearch            { defaultValue, onSubmit }
├── TrendsFilterBar         { value: TrendFilters, onChange, onReset }
│   ├── FilterSelect        { label, options, value, onChange }
│   └── PeriodSegmented     { value: TrendPeriod, onChange }
├── TrendSection            { title, description, href, children }
│   └── TrendCard           { trend: TrendSummary }
│       ├── DirectionBadge  { direction }
│       ├── MomentumScore   { value, delta }
│       ├── Sparkline       { series, direction }
│       ├── SignalList      { signals, max: 3 }
│       └── RelatedChips    { entities, max: 3 }
├── TrendColumn             { title, description, href, items }
│   └── TrendCardCompact    { trend: TrendSummary }
└── CategoryBrowse          { categories }
```

`TrendCard` fields, in order, per the card anatomy artboard: category chip, trend name (heading), one-line summary, momentum score with sparkline, up to three key signals, why it is moving, related companies and topics, and one action linking to the detail page. The entire card is not a link — the heading and the action are, so that the related chips inside stay independently clickable. Use one `<a>` on the heading with a stretched pseudo-element only if no nested interactive elements exist in the final design; otherwise keep the explicit action button.

`TrendCardCompact` keeps rank, name, summary line, sparkline and delta; it drops signals, why-it-is-moving and related.

---

## 7. `/trends/[slug]` — trend detail

**Breadcrumb.** `Trends / [Category] / [Trend name]`, all but the last linked.

**Hero.** Category chip, direction badge, updated timestamp and geography; the trend name as `<h1>`; the one-sentence summary; watchlist and share actions on the right.

**Momentum panel** (two-thirds width). Score out of 100 with signed delta, a period segmented control (`7D / 90D / 12M / 5Y` — note this differs from the hub's set), and a line chart of `seriesByPeriod[period]` with dashed vertical annotations from `annotations`. The chart needs an accessible fallback: a visually-hidden table of the series, or `aria-label` carrying start value, end value and direction.

**Score breakdown** (one-third width, beside the chart). Demand, Competition, Opportunity — each a labelled meter with its numeric value and a one-line note. Confidence and source count sit at the bottom of the panel.

**What is driving the change.** Three columns from `drivers`: two drivers and one counter-force. The counter-force is required — if the API returns none, render the column with an explicit "no significant counter-force identified" rather than dropping it. A one-sided page is the failure mode here.

**Underlying signals.** A filter row of signal types plus `All`, then a table: signal type, what happened, source and date, change, weight. Source links out in a new tab with `rel="noopener"`. `Load more` paginates via cursor. Below `md` the table becomes a stacked list of labelled rows — never a horizontally scrolling table.

**Related.** Two columns: companies moving on this (logo, name, one-line context, role in trend) and connected topics as chips, each linking to its own trend or entity page.

**Forecast.** The payoff block, visually the heaviest element on the page. Contains: the headline call; a horizon selector (`6 mo / 12 mo / 3 yr`) which swaps `forecastsByHorizon`; three scenario cards (base, accelerated, stall) each with a probability and a short body, base case emphasized; leading indicators to watch; what it means if you are building here; and two actions — score an idea against this trend (primary) and alert me on changes (secondary).

Every forecast surface must carry the generation timestamp and a one-line statement that forecasts are model-generated from the signals above and update as evidence arrives. That line is not optional and not a tooltip.

---

## 8. URL state summary

| Param | Route | Values | Default |
|---|---|---|---|
| `q` | hub | free text | empty |
| `category` | hub | area slug | `all` |
| `period` | hub | `7d\|30d\|90d\|12m` | `30d` |
| `geo` | hub | `global` or region | `global` |
| `sort` | hub | `momentum\|change\|new` | `momentum` |
| `period` | detail | `7d\|90d\|12m\|5y` | `90d` |
| `horizon` | detail | `6m\|12m\|3y` | `6m` |
| `signal` | detail | SignalType or `all` | `all` |

Unknown or malformed values fall back to the default silently rather than erroring.

---

## 9. States

**Loading.** Skeletons that match the real layout's dimensions so nothing shifts — card-shaped blocks with the same heights as the loaded cards, meter tracks at zero, chart area reserved. No spinners on first paint.

**Empty — no results for filters.** State which filter is responsible, offer a single reset action, and keep the filter bar mounted. Do not show an illustration.

**Empty — a section has fewer than four items.** Render what exists; do not pad.

**Error.** Per-section error boundary, so one failing section does not blank the hub. Retry action on each. The detail page fails to a full-page error with a link back to `/trends`.

**Stale.** If a response is older than its cache window, render it and mark the timestamp as stale rather than blocking.

---

## 10. Accessibility

Real elements throughout: `<button>` for actions, `<a href>` for navigation, `<input>` paired with a `<label>` for search. No `role`/`onClick` on a `div`.

Direction, scenario likelihood and signal weight must all be readable without color — icon plus text label, or numeric value plus meter.

The period and horizon segmented controls are radio groups (`role="radiogroup"` with real radios, or a `<fieldset>` of radios styled as segments), not rows of buttons, so arrow keys work.

Icon-only controls carry `aria-label`. The chart carries a text alternative. Filter changes announce results via a polite live region ("24 trends match"). Text contrast at least 4.5:1, 3:1 above 24px — check the muted caption color and any filled element with text on it, which are the two that usually fail. Touch targets at least 44px.

Focus order follows the visual order. A skip link to the results region if the filter bar has more than six tab stops.

---

## 11. Responsive

| Breakpoint | Hub | Detail |
|---|---|---|
| `≥ 1280` | 3-col trending, 3-col state columns | 2/3 + 1/3 chart and breakdown; 3-col drivers; 3-col scenarios |
| `1024–1279` | 2-col trending, 3-col state columns | chart full width, breakdown below; 3-col drivers |
| `768–1023` | 2-col trending, state columns stack to 2 then 1 | single column; signals table becomes stacked rows |
| `< 768` | single column; filter bar scrolls horizontally with the segmented control kept whole; sections collapse to top 3 with "show more" | single column; scenario cards stack; sticky bottom bar with the primary forecast action |

---

## 12. Build order

1. Types, zod schemas, fixtures, and the API client. No UI.
2. Primitives: `DirectionBadge`, `MomentumScore`, `Sparkline`, `SignalList`, `RelatedChips`, `Meter`. Storybook or equivalent if the repo has one.
3. `TrendCard` and `TrendCardCompact` against fixtures.
4. `/trends` layout with the four sections, fixtures only, no filtering.
5. Filter bar and URL state, wired to the live sections endpoint.
6. Search.
7. `/trends/[slug]`: hero, chart, breakdown, drivers.
8. Signals table with filtering and pagination.
9. Related and forecast blocks.
10. States: loading skeletons, empty, error boundaries.
11. Accessibility pass and responsive pass.
12. SEO: metadata, canonical, JSON-LD, sitemap entries for trend pages.

One commit per phase. Typecheck and lint clean before each.

---

## 13. Acceptance checklist

- A pasted `/trends?category=ai&period=90d&geo=global&sort=change` URL restores exactly that view.
- Every card's action reaches the matching detail page; every detail page reaches back.
- No card renders a momentum score without a direction label, and no direction is conveyed by color alone.
- The counter-force column is always present on detail pages.
- Every signal row shows its source; a signal with no source URL still shows a source name.
- The forecast block always shows its generation timestamp and the model-generated disclosure.
- Keyboard-only: filter, search, open a trend, switch period, switch horizon, filter signals, add to watchlist — all reachable, all with visible focus.
- Lighthouse accessibility ≥ 95 on both routes; no contrast failures.
- With the API returning 500 for one section, the other three still render.
- No hardcoded hex values, font families or spacing outside the repo's token system.
