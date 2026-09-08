import type { EvClass, RangeKey, ScenarioKey, SectionKey } from "./types";

// Evidence-class vocabulary: every figure in the report carries one of these.
// Glyphs match the site-wide EvidenceLegend convention (● ◦ ◇ ◈); colors keep
// the four-way distinction the original design used to separate verified data
// from signal, modelled estimate and model-driven prediction.
export const CLASS: Record<EvClass, { glyph: string; color: string; name: string }> = {
  V: { glyph: "●", color: "#4fe3c1", name: "VERIFIED" },
  S: { glyph: "◦", color: "#5fb2a4", name: "SIGNAL" },
  E: { glyph: "◇", color: "#9aa6a1", name: "ESTIMATE" },
  P: { glyph: "◈", color: "#d9a441", name: "PREDICTION" },
};

export const EVIDENCE_MIX = [
  { cls: "V" as EvClass, pct: 34 },
  { cls: "S" as EvClass, pct: 41 },
  { cls: "E" as EvClass, pct: 14 },
  { cls: "P" as EvClass, pct: 11 },
];

export const NAV: { n: string; t: string; k: SectionKey }[] = [
  { n: "01", t: "Verdict", k: "verdict" },
  { n: "02", t: "Current state", k: "current" },
  { n: "03", t: "Evidence trail", k: "evidence" },
  { n: "04", t: "Forecast", k: "forecast" },
  { n: "05", t: "Competitive intensity", k: "compete" },
  { n: "06", t: "Timing window", k: "timing" },
  { n: "07", t: "Invalidation risks", k: "risks" },
  { n: "08", t: "Recommendation", k: "recommend" },
];

export const RANGES: Record<RangeKey, { hist: number[]; fc: number[]; head: string; l: string; r: string }> = {
  "30D": { hist: [0.4, 0.43, 0.42, 0.46, 0.49, 0.51, 0.54], fc: [0.54, 0.57, 0.6], head: "+4.1%", l: "05 AUG", r: "OCT" },
  "6M": { hist: [0.28, 0.31, 0.33, 0.36, 0.4, 0.45, 0.49, 0.53], fc: [0.53, 0.6, 0.66, 0.72], head: "+21%", l: "MAR 2026", r: "MAR 2027" },
  "12M": { hist: [0.2, 0.22, 0.25, 0.24, 0.28, 0.33, 0.36, 0.42, 0.46, 0.5], fc: [0.5, 0.57, 0.63, 0.7, 0.76, 0.82], head: "+68%", l: "2026", r: "2027" },
  "3YR": { hist: [0.08, 0.1, 0.13, 0.12, 0.16, 0.21, 0.26, 0.31, 0.38, 0.44, 0.47, 0.5], fc: [0.5, 0.56, 0.62, 0.69, 0.74, 0.8, 0.85, 0.89, 0.92, 0.95], head: "+212%", l: "2024", r: "2029" },
};

export const KILLERS = [
  { name: "Incumbent bundling", p: "31%" },
  { name: "Longer procurement", p: "22%" },
  { name: "EU regulatory drag", p: "17%" },
];

export const FACTS: [string, string, EvClass, number, string, string][] = [
  ["Mid-market firms, 50–999 FTE, DACH", "61,400", "V", 3, "—", "#6d7a75"],
  ["Firms running ≥1 AI workflow pilot", "18.2%", "S", 12, "+2.4pt", "#4fe3c1"],
  ["Median annual pilot budget", "€84k", "E", 7, "+€6k", "#4fe3c1"],
  ["Median procurement cycle", "5.8 mo", "V", 4, "−0.3", "#4fe3c1"],
  ["Public tenders naming workflow automation", "412 YTD", "V", 1, "+38", "#4fe3c1"],
  ["Vendor pricing pages changed, 90d", "26", "S", 26, "+9", "#d9a441"],
  ["Open roles: AI operations, DACH", "1,940", "S", 2, "+12%", "#4fe3c1"],
  ["Compliance review required pre-purchase", "71%", "E", 5, "+4pt", "#d9a441"],
  ["Incumbent suite penetration", "54%", "E", 6, "+1pt", "#d9a441"],
];

export const SEGMENTS: [string, string, string, string, string, string, string][] = [
  ["DE manufacturing Mittelstand", "€5.1B", "100%", "#4fe3c1", "14%", "low", "#4fe3c1"],
  ["DE professional services", "€3.2B", "63%", "#5fb2a4", "26%", "medium", "#9aa6a1"],
  ["CH financial services", "€1.9B", "37%", "#5fb2a4", "31%", "high", "#d9a441"],
  ["AT industrial & logistics", "€1.4B", "27%", "#4fe3c1", "11%", "low", "#4fe3c1"],
  ["DACH public-sector adjacent", "€2.6B", "51%", "#5fb2a4", "6%", "low", "#4fe3c1"],
];

export const READY: [string, number, number, number, string][] = [
  ["Budget authority at mid-market", 62, 54, 70, "Line managers can sign €50–100k without board review."],
  ["Tooling maturity", 48, 39, 57, "Half the segment still runs core workflow on spreadsheets."],
  ["Compliance load", 77, 70, 84, "Higher is friction. Finance and public buyers carry the most."],
  ["Pilot appetite", 69, 62, 75, "Pilot-to-paid conversion observed at 31% across 12 sources."],
  ["Switching-cost tolerance", 41, 33, 49, "Suite contracts renew on 24–36 month cycles."],
];

export const CHANGES: [string, string, EvClass, string, string][] = [
  ["28 AUG", "Three DE manufacturing groups published AI operations roles at once", "S", "+1.2pt", "#4fe3c1"],
  ["24 AUG", "Two vertical vendors raised list price 8–11% in DACH", "S", "+0.6pt", "#4fe3c1"],
  ["19 AUG", "Austrian federal tender named workflow automation explicitly", "V", "+0.9pt", "#4fe3c1"],
  ["14 AUG", "A suite incumbent added a workflow module to its mid-tier bundle", "V", "−2.1pt", "#d9a441"],
  ["09 AUG", "Median procurement cycle shortened by 9 days across 4 sources", "V", "+0.4pt", "#4fe3c1"],
  ["03 AUG", "Swiss regulator signalled earlier review guidance for AI tooling", "S", "−0.8pt", "#d9a441"],
];

export const GAPS: [string, string][] = [
  ["Private-company revenue below threshold", "No filing obligation for most AT and CH firms under 250 FTE. Modelled from employment and sector margin."],
  ["Churn and renewal rates", "No observable source. Proxied from public case studies and two vendor disclosures."],
  ["Internal build rate", "Inferred from job postings only. Direction is reliable, level is not."],
  ["Discount realisation", "List prices observed, transacted prices not. Assume 12–22% off list."],
];

export type ChainStep = [string, string, string, EvClass, string];
export type Claim = {
  text: string;
  cls: EvClass;
  conf: string;
  weight: string;
  chainMeta: string;
  chain: ChainStep[];
  formula: string;
  inputs: [string, string, EvClass][];
  fragility: string;
};

export const CLAIMS: Claim[] = [
  {
    text: "Demand for AI workflow platforms in DACH mid-market grows 68% over 12 months",
    cls: "S",
    conf: "conf 0.84",
    weight: "34% of the verdict",
    chainMeta: "6 hops · 19 sources · last verified 02 Sep 2026 08:14 CET",
    chain: [
      ["Source", "19 primary sources", "12 public tenders, 4 vendor pricing archives, 2 job-posting feeds, 1 industry association survey.", "V", "02 Sep 08:14"],
      ["Extraction", "Structured field capture", "Named-entity extraction over tender text and pricing pages. Mean extraction confidence 0.91; 3 documents fell below 0.8 and were dropped.", "V", "02 Sep 08:16"],
      ["Normalisation", "Segment and currency alignment", "Firm sizes mapped to the 50–999 FTE band, all values converted at 30-day average FX, seasonal adjustment applied to hiring.", "E", "02 Sep 08:17"],
      ["Aggregation", "Demand index construction", "Four sub-indices weighted by source reliability: tenders 0.34, pricing 0.26, hiring 0.24, survey 0.16.", "E", "02 Sep 08:19"],
      ["Model", "12-month projection", "Ensemble forecast with procurement-lag prior. Point estimate +68%, band +52% to +79%.", "P", "02 Sep 08:22"],
      ["Review", "Analyst sign-off", "Two reviewers confirmed source eligibility and the weighting change from the July revision.", "V", "02 Sep 09:40"],
    ],
    formula: "demand_12m = Σ(sub_index × reliability_w) × procurement_lag_prior",
    inputs: [
      ["tender volume growth", "+31%", "V"],
      ["pricing-page churn", "+9 pages", "S"],
      ["hiring signal", "+12%", "S"],
      ["procurement lag prior", "0.87", "E"],
    ],
    fragility: "If tender growth is overstated by 10pt, the 12-month figure falls to +54% and the window slips one quarter.",
  },
  {
    text: "Serviceable market reaches $14.2B by 2029",
    cls: "E",
    conf: "conf 0.71",
    weight: "19% of the verdict",
    chainMeta: "5 hops · 11 sources · last verified 01 Sep 2026 17:02 CET",
    chain: [
      ["Source", "Firm registry and filings", "61,400 firms in band from three national registries. Revenue observed for 34% of them.", "V", "01 Sep 16:41"],
      ["Extraction", "Revenue and headcount capture", "Filing parse for DE; registry-only for AT and CH below threshold.", "V", "01 Sep 16:44"],
      ["Imputation", "Missing revenue filled", "Sector margin and headcount regression for the 66% without filings. Residual error ±14%.", "E", "01 Sep 16:51"],
      ["Derivation", "Spend share applied", "Workflow tooling spend share of IT budget, 1.8%, from two association surveys.", "E", "01 Sep 16:58"],
      ["Model", "Compound to 2029", "CAGR 21.4% applied with adoption ceiling at 61%. Band $11.1B to $17.9B.", "P", "01 Sep 17:02"],
    ],
    formula: "market_2029 = firms × imputed_revenue × it_share × workflow_share × (1+cagr)^3",
    inputs: [
      ["firms in band", "61,400", "V"],
      ["imputed revenue coverage", "66%", "E"],
      ["workflow spend share", "1.8%", "E"],
      ["CAGR", "21.4%", "P"],
    ],
    fragility: "This is the weakest verified link in the report. A 0.4pt error in spend share moves the 2029 figure by $3.1B.",
  },
  {
    text: "Competitive intensity rises 34% through 2027",
    cls: "S",
    conf: "conf 0.79",
    weight: "22% of the verdict",
    chainMeta: "4 hops · 26 sources · last verified 02 Sep 2026 07:55 CET",
    chain: [
      ["Source", "Vendor and funding observation", "26 vendor pricing archives, 14 funding announcements, 9 partner-programme changes.", "V", "02 Sep 07:31"],
      ["Extraction", "Move classification", "Each event typed as pricing, funding, feature, or GTM and scored for reach in DACH.", "S", "02 Sep 07:38"],
      ["Aggregation", "Intensity index", "Four components summed: pricing pressure 11, funding inflow 9, feature parity 8, GTM saturation 6.", "E", "02 Sep 07:47"],
      ["Model", "Forward projection", "Trend extrapolation with bundling prior. +34% through 2027, band +21% to +48%.", "P", "02 Sep 07:55"],
    ],
    formula: "intensity = pricing_p + funding_i + feature_parity + gtm_saturation",
    inputs: [
      ["pricing pressure", "11", "S"],
      ["funding inflow", "9", "V"],
      ["feature parity", "8", "E"],
      ["GTM saturation", "6", "E"],
    ],
    fragility: "If two of the tracked vertical vendors exit DACH, intensity falls to +19% and the window widens by a quarter.",
  },
  {
    text: "Median procurement cycle is 5.8 months",
    cls: "V",
    conf: "conf 0.93",
    weight: "11% of the verdict",
    chainMeta: "3 hops · 4 sources · last verified 30 Aug 2026 11:20 CET",
    chain: [
      ["Source", "Tender award records", "412 award records with published publication and award dates.", "V", "30 Aug 11:06"],
      ["Extraction", "Date-pair capture", "Publication-to-award interval computed per record; 6 records with missing dates excluded.", "V", "30 Aug 11:12"],
      ["Aggregation", "Median and spread", "Median 5.8 months, interquartile 4.1 to 8.6. Public-sector records skew long and are reported separately.", "V", "30 Aug 11:20"],
    ],
    formula: "cycle_median = median(award_date − publication_date)",
    inputs: [
      ["award records", "412", "V"],
      ["excluded records", "6", "V"],
      ["IQR", "4.1–8.6 mo", "V"],
    ],
    fragility: "Fully observed. Risk here is representativeness: private-sector cycles are not in the tender feed.",
  },
  {
    text: "Entry window opens Q1 2027 and closes late 2027",
    cls: "P",
    conf: "conf 0.76",
    weight: "entry timing",
    chainMeta: "4 hops · derived from three claims above",
    chain: [
      ["Inputs", "Three upstream claims", "Demand trajectory, intensity projection, and procurement cycle feed the window model.", "P", "02 Sep 09:02"],
      ["Model", "Window solver", "Finds the interval where demand growth exceeds intensity growth by more than 20pt, offset by one procurement cycle.", "P", "02 Sep 09:04"],
      ["Sensitivity", "Interval stability", "Window holds under 71% of simulated paths. Bundling is the dominant closing force.", "P", "02 Sep 09:06"],
      ["Review", "Analyst sign-off", "Reviewer noted the window is unusually narrow for this category and flagged it in the recommendation.", "V", "02 Sep 10:15"],
    ],
    formula: "window = { t : Δdemand(t) − Δintensity(t) > 20pt } − procurement_cycle",
    inputs: [
      ["demand growth", "+68%", "S"],
      ["intensity growth", "+34%", "S"],
      ["procurement offset", "5.8 mo", "V"],
      ["paths holding", "71%", "P"],
    ],
    fragility: "This is a prediction, not an observation. It moves whenever any of the three upstream claims moves.",
  },
  {
    text: "71% of buyers require a compliance review before purchase",
    cls: "E",
    conf: "conf 0.68",
    weight: "7% of the verdict",
    chainMeta: "3 hops · 5 sources · last verified 27 Aug 2026 14:30 CET",
    chain: [
      ["Source", "Survey and tender language", "Two association surveys, three tender requirement sets naming review steps.", "S", "27 Aug 14:12"],
      ["Normalisation", "Definition alignment", "Surveys used different definitions of review; harmonised to any formal pre-purchase sign-off.", "E", "27 Aug 14:22"],
      ["Aggregation", "Weighted share", "Weighted to segment composition. 71%, band 61% to 79%.", "E", "27 Aug 14:30"],
    ],
    formula: "review_share = Σ(survey_share × segment_weight), definitions harmonised",
    inputs: [
      ["surveys", "2", "S"],
      ["tender requirement sets", "3", "V"],
      ["harmonisation adjustment", "−4pt", "E"],
    ],
    fragility: "Definition harmonisation is the soft step. Under the strictest definition the figure is 52%.",
  },
];

export const SOURCES: [string, string, string, string, EvClass][] = [
  ["Public tenders & awards", "12", "median 6 days", "0.34", "V"],
  ["Company filings", "9", "median 41 days", "0.22", "V"],
  ["Vendor pricing archives", "26", "median 11 days", "0.14", "S"],
  ["Job-posting feeds", "2", "daily", "0.12", "S"],
  ["Association surveys", "2", "median 5 months", "0.10", "S"],
  ["Patent & trademark records", "4", "median 18 days", "0.08", "V"],
];

export const CONTRA: [string, string, string, string][] = [
  ["Mid-market pilot adoption", "Association survey: 24% of firms report a pilot.", "Job-posting derived estimate: 15%.", "Resolved to 18.2%. Survey weighted 0.4 for self-selection, postings 0.6 for coverage."],
  ["Workflow spend share of IT budget", "Survey A: 2.3% of IT budget.", "Survey B: 1.4%, different definition of workflow tooling.", "Resolved to 1.8% after harmonising definitions. Band widened to reflect the disagreement."],
  ["Incumbent penetration", "Vendor disclosure implies 61% share.", "Tender awards imply 47%.", "Resolved to 54%. Vendor figure discounted for global-to-DACH extrapolation."],
];

export const SCEN: Record<ScenarioKey, { n: string; p: string; note: string; p50: number[]; spread: number; prob: number; mkt: number; win: string }> = {
  base: { n: "Base", p: "58%", note: "Adoption holds pace, incumbents bundle late 2027.", p50: [0.5, 0.58, 0.65, 0.72, 0.79, 0.85, 0.9], spread: 0.045, prob: 87, mkt: 14.2, win: "Q1–Q2 2027" },
  accel: { n: "Accelerated", p: "22%", note: "Compliance pressure pulls budgets forward two quarters.", p50: [0.5, 0.62, 0.74, 0.85, 0.94, 1.0, 1.05], spread: 0.06, prob: 93, mkt: 17.6, win: "Q4 2026–Q1 2027" },
  stall: { n: "Stalled", p: "20%", note: "Procurement lengthens, pilots stay pilots.", p50: [0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68], spread: 0.035, prob: 61, mkt: 9.4, win: "Q3 2027–Q1 2028" },
};

export const ASSUME: { k: string; label: string; dProb: number; dMkt: number; win: string | null }[] = [
  { k: "a1", label: "EU AI Act enforcement slips to 2028", dProb: 4, dMkt: 0.6, win: null },
  { k: "a2", label: "A suite incumbent bundles by Q3 2027", dProb: -16, dMkt: -1.4, win: "Q4 2026–Q1 2027 · compressed" },
  { k: "a3", label: "ECB cuts ≥100bp by mid-2027", dProb: 3, dMkt: 0.9, win: null },
];

export const TORNADO: [string, string, number, number][] = [
  ["Bundling by suite incumbents", "38pt", 82, 26],
  ["Procurement cycle length", "24pt", 54, 18],
  ["Regulatory timing", "19pt", 41, 22],
  ["Interest-rate path", "14pt", 28, 31],
  ["In-house build rate", "12pt", 26, 9],
  ["Signal coverage decay", "9pt", 19, 7],
];

export const CALIB: [string, string, number, number][] = [
  ["0–20%", "14%", 14, 18],
  ["20–40%", "31%", 31, 33],
  ["40–60%", "52%", 52, 49],
  ["60–80%", "69%", 69, 72],
  ["80–100%", "88%", 88, 85],
];

export const DECOMP: [string, string, string, string][] = [
  ["Pricing pressure", "11", "#d9a441", "26 sources"],
  ["Funding inflow", "9", "#b98a3a", "14 events"],
  ["Feature parity", "8", "#8a6f38", "derived"],
  ["GTM saturation", "6", "#5b4d2c", "derived"],
];

export const ARCHETYPES = ["Suite incumbents", "Vertical AI natives", "Regional SIs", "Open-source stacks"];

export const GRID: [string, number[], string[]][] = [
  ["DE manufacturing", [68, 34, 52, 21], ["Bundled workflow modules reach this segment first.", "Four natives target it, none with a DACH-local team.", "Dense SI coverage, but reselling rather than building.", "Internal platform teams at the largest firms only."]],
  ["DE prof. services", [74, 61, 44, 29], ["Highest incumbent penetration on the grid.", "Crowded. Six natives with German-language product.", "SIs bundle workflow into broader digital programmes.", "Some adoption at digital-first consultancies."]],
  ["CH financial svcs", [81, 58, 66, 18], ["Suite contracts near-universal at this size.", "Compliance-ready natives compete hard here.", "Regulated-industry SIs hold the relationships.", "Rare. Compliance review discourages it."]],
  ["AT industrial", [41, 17, 38, 14], ["Bundling has not reached AT mid-market yet.", "Open lane. No native with an AT presence.", "Regional SIs are the incumbent channel.", "Negligible."]],
  ["Public adjacent", [46, 12, 71, 24], ["Framework agreements favour incumbents.", "Open lane, but tender access is the barrier.", "SIs own public-sector procurement access.", "Preferred in some federal guidance."]],
];

export const PLAYERS: [string, string, string, string, string, string, string, EvClass][] = [
  ["Suite incumbents", "accelerating", "#d9a441", "Adding workflow modules to mid-tier bundles. One did so in August.", "7 vendors", "high", "#d9a441", "V"],
  ["Vertical AI natives", "fast growth", "#d9a441", "23 tracked. Nine raised in the last four quarters; three now sell in German.", "23 vendors", "medium", "#b98a3a", "S"],
  ["Regional systems integrators", "steady", "#5fb2a4", "Reselling and implementing. Hold the buyer relationship in AT and public sector.", "~140 firms", "medium", "#b98a3a", "E"],
  ["Open-source stacks", "flat", "#4fe3c1", "Adopted where internal platform teams exist. Not a commercial competitor below 500 FTE.", "n/a", "low", "#4fe3c1", "E"],
];

export const MOVES: [string, string, EvClass][] = [
  ["28 AUG", "Vertical native opened a Munich office and posted 11 GTM roles", "V"],
  ["24 AUG", "Two vendors raised DACH list prices 8–11%", "S"],
  ["21 AUG", "Suite incumbent published a workflow module in its mid-tier bundle", "V"],
  ["16 AUG", "€40M raise announced by a workflow native with DACH ambitions", "V"],
  ["11 AUG", "Regional SI announced a workflow practice with 30 consultants", "S"],
  ["04 AUG", "Open-source workflow project shipped a German-language admin console", "V"],
];

export const QUARTERS: [string, number, string, string][] = [
  ["Q4 26", 34, "#243029", "#6d7a75"],
  ["Q1 27", 88, "#4fe3c1", "#4fe3c1"],
  ["Q2 27", 100, "#4fe3c1", "#4fe3c1"],
  ["Q3 27", 72, "#2f8d6b", "#9aa6a1"],
  ["Q4 27", 48, "#8a6f38", "#9aa6a1"],
  ["Q1 28", 26, "#5b4d2c", "#6d7a75"],
  ["Q2 28", 14, "#243029", "#6d7a75"],
];

export const OPENING: [string, EvClass][] = [
  ["Compliance deadlines push workflow projects into 2027 budgets", "V"],
  ["Procurement cycles shortened by 9 days across four sources", "V"],
  ["No vertical native has an AT or public-sector presence yet", "S"],
];

export const CLOSING: [string, EvClass][] = [
  ["Suite incumbents bundling workflow into mid-tier contracts", "V"],
  ["Nine funded natives hiring German-speaking GTM teams", "S"],
  ["Suite renewal cycle locks buyers for 24–36 months once signed", "E"],
];

export const DELAYS: [string, number, string][] = [
  ["Q1 2027", 100, "Full window. Price realisation at list minus 12%, and the first two quarters carry no direct native competitor in AT industrial."],
  ["Q2 2027", 92, "Still inside peak. Expect one additional native in DE manufacturing; discounting deepens to 16%."],
  ["Q3 2027", 78, "Bundling likely visible. Deals still close but land-and-expand slows; €2.1M of first-year revenue foregone versus Q1."],
  ["Q4 2027", 55, "Half the window is gone. Entry becomes a displacement motion against signed suite contracts."],
  ["Q1 2028", 31, "Category is contested and priced. Entry only justifiable with a differentiated wedge, not a general platform."],
];

export const GATES: [string, string, string, string, string][] = [
  ["Segment decision locked", "2 weeks", "15 Oct 2026", "#4fe3c1", "due next"],
  ["Local compliance review completed", "10 weeks", "20 Dec 2026", "#4fe3c1", "on track"],
  ["German-language product parity", "16 weeks", "31 Dec 2026", "#d9a441", "at risk"],
  ["First two reference customers signed", "12 weeks", "15 Jan 2027", "#9aa6a1", "not started"],
  ["DACH GTM team in seat", "14 weeks", "01 Feb 2027", "#9aa6a1", "not started"],
];

export const MONITORS: [string, string, number, number, string][] = [
  ["Suite bundling announcements, rolling 90d", "2 of 4", 50, 75, "#4fe3c1"],
  ["Median tender award lag", "5.8 mo", 66, 80, "#4fe3c1"],
  ["Funded natives with DACH GTM roles", "9 of 14", 64, 71, "#d9a441"],
  ["Source freshness median", "11 days", 52, 75, "#4fe3c1"],
];

export const FALS: [string, string, string, string, string][] = [
  ["Demand growth exceeds 40% over 12 months", "Demand index reading on 02 Sep 2027", "02 Sep 2027", "holding", "#4fe3c1"],
  ["No suite incumbent bundles workflow at mid-tier before Q3 2027", "Pricing-page and bundle monitoring, weekly", "continuous", "watch", "#d9a441"],
  ["Median procurement cycle stays under 7 months", "Tender award records, quarterly", "15 Jan 2027", "holding", "#4fe3c1"],
  ["At least 3 of 5 AT industrial pilots convert to paid", "Reference-customer tracking", "30 Jun 2027", "not yet testable", "#9aa6a1"],
];

export const PHASES: [string, string, string, string, string, string, string][] = [
  ["01", "Discovery and compliance", "Now → Dec 2026", "€340k", "Five paid pilots in AT industrial and DE manufacturing. Local compliance review. German-language product parity scoped and staffed.", "Three of five pilots reach a signed paid agreement, and compliance review completes without a blocking finding.", "Fewer than two pilots convert, or compliance review surfaces a change needing more than one quarter of engineering."],
  ["02", "Launch", "Jan → Jun 2027", "€1.9M", "DACH GTM team of nine. Two reference customers public. Channel agreements with two regional SIs.", "€1.2M in signed ARR by 30 Jun 2027 with a median cycle under 7 months.", "Median cycle exceeds 9 months, or a suite incumbent bundles at mid-tier before launch completes."],
  ["03", "Expand or exit", "Jul 2027 → Q1 2028", "€3.4M", "Extend to DE professional services and public-adjacent tenders. Move from direct to mixed channel.", "€4M ARR run rate and net revenue retention above 105%.", "Retention below 90%, or price realisation more than 25% below list for two consecutive quarters."],
];

export const UPGRADES: [string, string, string][] = [
  ["Buy transacted-price data for DACH workflow deals", "€48k", "band −6pt"],
  ["Commission a 400-firm mid-market survey", "€120k", "band −9pt"],
  ["License AT and CH private-company revenue estimates", "€26k", "band −4pt"],
];

export const STOPS = [
  "Two consecutive quarters where competitive intensity grows faster than demand.",
  "Confidence falls below 70% for one full quarter without new verified data.",
  "Any single risk on the invalidation page triggers before the first gate closes.",
];

export const RISKS: {
  k: string;
  name: string;
  p: string;
  dProb: number;
  dConf: number;
  lead: string;
  win: string | null;
  effect: string;
  warning: string;
}[] = [
  { k: "r1", name: "Incumbent bundling", p: "31%", dProb: 16, dConf: 6, lead: "6–8 weeks", win: "Q4 2026–Q1 2027 · compressed", effect: "Window compresses by two quarters and price realisation falls 18%. Entry still positive, but the first-mover premium disappears.", warning: "Suite vendor pricing-page changes plus partner-programme announcements in DE." },
  { k: "r2", name: "Longer procurement", p: "22%", dProb: 11, dConf: 4, lead: "1 quarter", win: "Q3 2027–Q1 2028 · slips", effect: "Median cycle moves from 5.8 to 8+ months. Launch slips two quarters and cash-to-first-revenue rises 40%.", warning: "Tender publication-to-award lag in the public feed; procurement headcount postings." },
  { k: "r3", name: "EU regulatory drag", p: "17%", dProb: 9, dConf: 5, lead: "2 quarters", win: "Q3 2027–Q1 2028 · slips", effect: "Compliance review becomes mandatory pre-pilot in regulated segments. CH financial services drops out of the near-term plan.", warning: "Draft guidance published; national implementation notes from DE and AT regulators." },
  { k: "r4", name: "Mittelstand builds in-house", p: "12%", dProb: 7, dConf: 3, lead: "2–3 quarters", win: null, effect: "Serviceable market shrinks roughly 15% as larger mid-market firms use internal platform teams.", warning: "Internal AI-platform job postings at firms above 500 FTE." },
  { k: "r5", name: "Signal quality decay", p: "9%", dProb: 4, dConf: 9, lead: "immediate", win: null, effect: "Job-post and pricing feeds lose coverage, band widens from ±14pt to ±26pt. The verdict holds but confidence does not.", warning: "Source freshness median crossing 21 days; extraction confidence below 0.8." },
];

export const REPORT_META = {
  title: "AI Workflow Platforms · DACH mid-market",
  generated: "Generated 02 Sep 2026 · 45 sources · 1.2M signals",
  reportId: "NVILE · predictive intelligence · report NV-2026-0902-DACH",
  verdictProb: 87,
  confidence: 82,
  band: "+52% → +79%",
};
