export type ClsKey = "V" | "S" | "E" | "P";

export const CLS: Record<ClsKey, { mark: string; label: string }> = {
  V: { mark: "●", label: "VERIFIED" },
  S: { mark: "◦", label: "SIGNAL" },
  E: { mark: "◇", label: "ESTIMATE" },
  P: { mark: "◈", label: "PREDICTION" },
};

// ---------- 02 Current state ----------

export const FACTS: { name: string; v: string; cls: ClsKey; src: number; d: string }[] = [
  { name: "Mid-market firms, 50–999 FTE, DACH", v: "61,400", cls: "V", src: 3, d: "—" },
  { name: "Firms running ≥1 AI workflow pilot", v: "18.2%", cls: "S", src: 12, d: "+2.4pt" },
  { name: "Median annual pilot budget", v: "€84k", cls: "E", src: 7, d: "+€6k" },
  { name: "Median procurement cycle", v: "5.8 mo", cls: "V", src: 4, d: "−0.3" },
  { name: "Public tenders naming workflow automation", v: "412 YTD", cls: "V", src: 1, d: "+38" },
  { name: "Vendor pricing pages changed, 90d", v: "26", cls: "S", src: 26, d: "+9" },
  { name: "Open roles: AI operations, DACH", v: "1,940", cls: "S", src: 2, d: "+12%" },
  { name: "Compliance review required pre-purchase", v: "71%", cls: "E", src: 5, d: "+4pt" },
  { name: "Incumbent suite penetration", v: "54%", cls: "E", src: 6, d: "+1pt" },
];

export const SEGMENTS: { name: string; size: string; adoptPct: string; adopt: string; crowd: string }[] = [
  { name: "DE manufacturing Mittelstand", size: "€5.1B", adoptPct: "100%", adopt: "14%", crowd: "low" },
  { name: "DE professional services", size: "€3.2B", adoptPct: "63%", adopt: "26%", crowd: "medium" },
  { name: "CH financial services", size: "€1.9B", adoptPct: "37%", adopt: "31%", crowd: "high" },
  { name: "AT industrial & logistics", size: "€1.4B", adoptPct: "27%", adopt: "11%", crowd: "low" },
  { name: "DACH public-sector adjacent", size: "€2.6B", adoptPct: "51%", adopt: "6%", crowd: "low" },
];

export const READY: { name: string; v: number; lo: number; hi: number; note: string }[] = [
  { name: "Budget authority at mid-market", v: 62, lo: 54, hi: 70, note: "Line managers can sign €50–100k without board review." },
  { name: "Tooling maturity", v: 48, lo: 39, hi: 57, note: "Half the segment still runs core workflow on spreadsheets." },
  { name: "Compliance load", v: 77, lo: 70, hi: 84, note: "Higher is friction. Finance and public buyers carry the most." },
  { name: "Pilot appetite", v: 69, lo: 62, hi: 75, note: "Pilot-to-paid conversion observed at 31% across 12 sources." },
  { name: "Switching-cost tolerance", v: 41, lo: 33, hi: 49, note: "Suite contracts renew on 24–36 month cycles." },
];

export const CHANGES: { d: string; t: string; cls: ClsKey; delta: string }[] = [
  { d: "28 AUG", t: "Three DE manufacturing groups published AI operations roles at once", cls: "S", delta: "+1.2pt" },
  { d: "24 AUG", t: "Two vertical vendors raised list price 8–11% in DACH", cls: "S", delta: "+0.6pt" },
  { d: "19 AUG", t: "Austrian federal tender named workflow automation explicitly", cls: "V", delta: "+0.9pt" },
  { d: "14 AUG", t: "A suite incumbent added a workflow module to its mid-tier bundle", cls: "V", delta: "−2.1pt" },
  { d: "09 AUG", t: "Median procurement cycle shortened by 9 days across 4 sources", cls: "V", delta: "+0.4pt" },
  { d: "03 AUG", t: "Swiss regulator signalled earlier review guidance for AI tooling", cls: "S", delta: "−0.8pt" },
];

export const GAPS: { name: string; why: string }[] = [
  { name: "Private-company revenue below threshold", why: "No filing obligation for most AT and CH firms under 250 FTE. Modelled from employment and sector margin." },
  { name: "Churn and renewal rates", why: "No observable source. Proxied from public case studies and two vendor disclosures." },
  { name: "Internal build rate", why: "Inferred from job postings only. Direction is reliable, level is not." },
  { name: "Discount realisation", why: "List prices observed, transacted prices not. Assume 12–22% off list." },
];

// ---------- 03 Evidence trail ----------

export type Claim = {
  text: string;
  cls: ClsKey;
  conf: string;
  weight: string;
  chainMeta: string;
  chain: { stage: string; label: string; detail: string; cls: ClsKey; ts: string }[];
  formula: string;
  inputs: { k: string; v: string; cls: ClsKey }[];
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
      { stage: "Source", label: "19 primary sources", detail: "12 public tenders, 4 vendor pricing archives, 2 job-posting feeds, 1 industry association survey.", cls: "V", ts: "02 Sep 08:14" },
      { stage: "Extraction", label: "Structured field capture", detail: "Named-entity extraction over tender text and pricing pages. Mean extraction confidence 0.91; 3 documents fell below 0.8 and were dropped.", cls: "V", ts: "02 Sep 08:16" },
      { stage: "Normalisation", label: "Segment and currency alignment", detail: "Firm sizes mapped to the 50–999 FTE band, all values converted at 30-day average FX, seasonal adjustment applied to hiring.", cls: "E", ts: "02 Sep 08:17" },
      { stage: "Aggregation", label: "Demand index construction", detail: "Four sub-indices weighted by source reliability: tenders 0.34, pricing 0.26, hiring 0.24, survey 0.16.", cls: "E", ts: "02 Sep 08:19" },
      { stage: "Model", label: "12-month projection", detail: "Ensemble forecast with procurement-lag prior. Point estimate +68%, band +52% to +79%.", cls: "P", ts: "02 Sep 08:22" },
      { stage: "Review", label: "Analyst sign-off", detail: "Two reviewers confirmed source eligibility and the weighting change from the July revision.", cls: "V", ts: "02 Sep 09:40" },
    ],
    formula: "demand_12m = Σ(sub_index × reliability_w) × procurement_lag_prior",
    inputs: [
      { k: "tender volume growth", v: "+31%", cls: "V" },
      { k: "pricing-page churn", v: "+9 pages", cls: "S" },
      { k: "hiring signal", v: "+12%", cls: "S" },
      { k: "procurement lag prior", v: "0.87", cls: "E" },
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
      { stage: "Source", label: "Firm registry and filings", detail: "61,400 firms in band from three national registries. Revenue observed for 34% of them.", cls: "V", ts: "01 Sep 16:41" },
      { stage: "Extraction", label: "Revenue and headcount capture", detail: "Filing parse for DE; registry-only for AT and CH below threshold.", cls: "V", ts: "01 Sep 16:44" },
      { stage: "Imputation", label: "Missing revenue filled", detail: "Sector margin and headcount regression for the 66% without filings. Residual error ±14%.", cls: "E", ts: "01 Sep 16:51" },
      { stage: "Derivation", label: "Spend share applied", detail: "Workflow tooling spend share of IT budget, 1.8%, from two association surveys.", cls: "E", ts: "01 Sep 16:58" },
      { stage: "Model", label: "Compound to 2029", detail: "CAGR 21.4% applied with adoption ceiling at 61%. Band $11.1B to $17.9B.", cls: "P", ts: "01 Sep 17:02" },
    ],
    formula: "market_2029 = firms × imputed_revenue × it_share × workflow_share × (1+cagr)^3",
    inputs: [
      { k: "firms in band", v: "61,400", cls: "V" },
      { k: "imputed revenue coverage", v: "66%", cls: "E" },
      { k: "workflow spend share", v: "1.8%", cls: "E" },
      { k: "CAGR", v: "21.4%", cls: "P" },
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
      { stage: "Source", label: "Vendor and funding observation", detail: "26 vendor pricing archives, 14 funding announcements, 9 partner-programme changes.", cls: "V", ts: "02 Sep 07:31" },
      { stage: "Extraction", label: "Move classification", detail: "Each event typed as pricing, funding, feature, or GTM and scored for reach in DACH.", cls: "S", ts: "02 Sep 07:38" },
      { stage: "Aggregation", label: "Intensity index", detail: "Four components summed: pricing pressure 11, funding inflow 9, feature parity 8, GTM saturation 6.", cls: "E", ts: "02 Sep 07:47" },
      { stage: "Model", label: "Forward projection", detail: "Trend extrapolation with bundling prior. +34% through 2027, band +21% to +48%.", cls: "P", ts: "02 Sep 07:55" },
    ],
    formula: "intensity = pricing_p + funding_i + feature_parity + gtm_saturation",
    inputs: [
      { k: "pricing pressure", v: "11", cls: "S" },
      { k: "funding inflow", v: "9", cls: "V" },
      { k: "feature parity", v: "8", cls: "E" },
      { k: "GTM saturation", v: "6", cls: "E" },
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
      { stage: "Source", label: "Tender award records", detail: "412 award records with published publication and award dates.", cls: "V", ts: "30 Aug 11:06" },
      { stage: "Extraction", label: "Date-pair capture", detail: "Publication-to-award interval computed per record; 6 records with missing dates excluded.", cls: "V", ts: "30 Aug 11:12" },
      { stage: "Aggregation", label: "Median and spread", detail: "Median 5.8 months, interquartile 4.1 to 8.6. Public-sector records skew long and are reported separately.", cls: "V", ts: "30 Aug 11:20" },
    ],
    formula: "cycle_median = median(award_date − publication_date)",
    inputs: [
      { k: "award records", v: "412", cls: "V" },
      { k: "excluded records", v: "6", cls: "V" },
      { k: "IQR", v: "4.1–8.6 mo", cls: "V" },
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
      { stage: "Inputs", label: "Three upstream claims", detail: "Demand trajectory, intensity projection, and procurement cycle feed the window model.", cls: "P", ts: "02 Sep 09:02" },
      { stage: "Model", label: "Window solver", detail: "Finds the interval where demand growth exceeds intensity growth by more than 20pt, offset by one procurement cycle.", cls: "P", ts: "02 Sep 09:04" },
      { stage: "Sensitivity", label: "Interval stability", detail: "Window holds under 71% of simulated paths. Bundling is the dominant closing force.", cls: "P", ts: "02 Sep 09:06" },
      { stage: "Review", label: "Analyst sign-off", detail: "Reviewer noted the window is unusually narrow for this category and flagged it in the recommendation.", cls: "V", ts: "02 Sep 10:15" },
    ],
    formula: "window = { t : Δdemand(t) − Δintensity(t) > 20pt } − procurement_cycle",
    inputs: [
      { k: "demand growth", v: "+68%", cls: "S" },
      { k: "intensity growth", v: "+34%", cls: "S" },
      { k: "procurement offset", v: "5.8 mo", cls: "V" },
      { k: "paths holding", v: "71%", cls: "P" },
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
      { stage: "Source", label: "Survey and tender language", detail: "Two association surveys, three tender requirement sets naming review steps.", cls: "S", ts: "27 Aug 14:12" },
      { stage: "Normalisation", label: "Definition alignment", detail: "Surveys used different definitions of review; harmonised to any formal pre-purchase sign-off.", cls: "E", ts: "27 Aug 14:22" },
      { stage: "Aggregation", label: "Weighted share", detail: "Weighted to segment composition. 71%, band 61% to 79%.", cls: "E", ts: "27 Aug 14:30" },
    ],
    formula: "review_share = Σ(survey_share × segment_weight), definitions harmonised",
    inputs: [
      { k: "surveys", v: "2", cls: "S" },
      { k: "tender requirement sets", v: "3", cls: "V" },
      { k: "harmonisation adjustment", v: "−4pt", cls: "E" },
    ],
    fragility: "Definition harmonisation is the soft step. Under the strictest definition the figure is 52%.",
  },
];

export const SOURCES: { type: string; n: string; fresh: string; w: string; cls: ClsKey }[] = [
  { type: "Public tenders & awards", n: "12", fresh: "median 6 days", w: "0.34", cls: "V" },
  { type: "Company filings", n: "9", fresh: "median 41 days", w: "0.22", cls: "V" },
  { type: "Vendor pricing archives", n: "26", fresh: "median 11 days", w: "0.14", cls: "S" },
  { type: "Job-posting feeds", n: "2", fresh: "daily", w: "0.12", cls: "S" },
  { type: "Association surveys", n: "2", fresh: "median 5 months", w: "0.10", cls: "S" },
  { type: "Patent & trademark records", n: "4", fresh: "median 18 days", w: "0.08", cls: "V" },
];

export const CONTRA: { field: string; a: string; b: string; res: string }[] = [
  { field: "Mid-market pilot adoption", a: "Association survey: 24% of firms report a pilot.", b: "Job-posting derived estimate: 15%.", res: "Resolved to 18.2%. Survey weighted 0.4 for self-selection, postings 0.6 for coverage." },
  { field: "Workflow spend share of IT budget", a: "Survey A: 2.3% of IT budget.", b: "Survey B: 1.4%, different definition of workflow tooling.", res: "Resolved to 1.8% after harmonising definitions. Band widened to reflect the disagreement." },
  { field: "Incumbent penetration", a: "Vendor disclosure implies 61% share.", b: "Tender awards imply 47%.", res: "Resolved to 54%. Vendor figure discounted for global-to-DACH extrapolation." },
];

// ---------- 04 Forecast ----------

export type ScenarioKey = "base" | "accel" | "stall";

export const SCENARIOS: Record<ScenarioKey, { n: string; p: string; note: string; prob: number; mkt: number; win: string }> = {
  base: { n: "Base", p: "58%", note: "Adoption holds pace, incumbents bundle late 2027.", prob: 87, mkt: 14.2, win: "Q1–Q2 2027" },
  accel: { n: "Accelerated", p: "22%", note: "Compliance pressure pulls budgets forward two quarters.", prob: 93, mkt: 17.6, win: "Q4 2026–Q1 2027" },
  stall: { n: "Stalled", p: "20%", note: "Procurement lengthens, pilots stay pilots.", prob: 61, mkt: 9.4, win: "Q3 2027–Q1 2028" },
};

export const ASSUME: { key: string; label: string; dProb: number; dMkt: number; win: string | null }[] = [
  { key: "a1", label: "EU AI Act enforcement slips to 2028", dProb: 4, dMkt: 0.6, win: null },
  { key: "a2", label: "A suite incumbent bundles by Q3 2027", dProb: -16, dMkt: -1.4, win: "Q4 2026–Q1 2027 · compressed" },
  { key: "a3", label: "ECB cuts ≥100bp by mid-2027", dProb: 3, dMkt: 0.9, win: null },
];

export const TORNADO: { name: string; swing: string; l: number; r: number }[] = [
  { name: "Bundling by suite incumbents", swing: "38pt", l: 82, r: 26 },
  { name: "Procurement cycle length", swing: "24pt", l: 54, r: 18 },
  { name: "Regulatory timing", swing: "19pt", l: 41, r: 22 },
  { name: "Interest-rate path", swing: "14pt", l: 28, r: 31 },
  { name: "In-house build rate", swing: "12pt", l: 26, r: 9 },
  { name: "Signal coverage decay", swing: "9pt", l: 19, r: 7 },
];

export const CALIB: { bucket: string; act: string; pred: number }[] = [
  { bucket: "0–20%", act: "14%", pred: 18 },
  { bucket: "20–40%", act: "31%", pred: 33 },
  { bucket: "40–60%", act: "52%", pred: 49 },
  { bucket: "60–80%", act: "69%", pred: 72 },
  { bucket: "80–100%", act: "88%", pred: 85 },
];

// ---------- 05 Competitive intensity ----------

export const DECOMP: { name: string; v: string; src: string }[] = [
  { name: "Pricing pressure", v: "11", src: "26 sources" },
  { name: "Funding inflow", v: "9", src: "14 events" },
  { name: "Feature parity", v: "8", src: "derived" },
  { name: "GTM saturation", v: "6", src: "derived" },
];

export const ARCHETYPES = ["Suite incumbents", "Vertical AI natives", "Regional SIs", "Open-source stacks"];

export const GRID: { seg: string; vals: number[]; notes: string[] }[] = [
  { seg: "DE manufacturing", vals: [68, 34, 52, 21], notes: ["Bundled workflow modules reach this segment first.", "Four natives target it, none with a DACH-local team.", "Dense SI coverage, but reselling rather than building.", "Internal platform teams at the largest firms only."] },
  { seg: "DE prof. services", vals: [74, 61, 44, 29], notes: ["Highest incumbent penetration on the grid.", "Crowded. Six natives with German-language product.", "SIs bundle workflow into broader digital programmes.", "Some adoption at digital-first consultancies."] },
  { seg: "CH financial svcs", vals: [81, 58, 66, 18], notes: ["Suite contracts near-universal at this size.", "Compliance-ready natives compete hard here.", "Regulated-industry SIs hold the relationships.", "Rare. Compliance review discourages it."] },
  { seg: "AT industrial", vals: [41, 17, 38, 14], notes: ["Bundling has not reached AT mid-market yet.", "Open lane. No native with an AT presence.", "Regional SIs are the incumbent channel.", "Negligible."] },
  { seg: "Public adjacent", vals: [46, 12, 71, 24], notes: ["Framework agreements favour incumbents.", "Open lane, but tender access is the barrier.", "SIs own public-sector procurement access.", "Preferred in some federal guidance."] },
];

export const PLAYERS: { name: string; momentum: string; move: string; count: string; threat: string; cls: ClsKey }[] = [
  { name: "Suite incumbents", momentum: "accelerating", move: "Adding workflow modules to mid-tier bundles. One did so in August.", count: "7 vendors", threat: "high", cls: "V" },
  { name: "Vertical AI natives", momentum: "fast growth", move: "23 tracked. Nine raised in the last four quarters; three now sell in German.", count: "23 vendors", threat: "medium", cls: "S" },
  { name: "Regional systems integrators", momentum: "steady", move: "Reselling and implementing. Hold the buyer relationship in AT and public sector.", count: "~140 firms", threat: "medium", cls: "E" },
  { name: "Open-source stacks", momentum: "flat", move: "Adopted where internal platform teams exist. Not a commercial competitor below 500 FTE.", count: "n/a", threat: "low", cls: "E" },
];

export const MOVES: { d: string; t: string; cls: ClsKey }[] = [
  { d: "28 AUG", t: "Vertical native opened a Munich office and posted 11 GTM roles", cls: "V" },
  { d: "24 AUG", t: "Two vendors raised DACH list prices 8–11%", cls: "S" },
  { d: "21 AUG", t: "Suite incumbent published a workflow module in its mid-tier bundle", cls: "V" },
  { d: "16 AUG", t: "€40M raise announced by a workflow native with DACH ambitions", cls: "V" },
  { d: "11 AUG", t: "Regional SI announced a workflow practice with 30 consultants", cls: "S" },
  { d: "04 AUG", t: "Open-source workflow project shipped a German-language admin console", cls: "V" },
];

// ---------- 06 Timing window ----------

export const QUARTERS: { label: string; h: number }[] = [
  { label: "Q4 26", h: 34 },
  { label: "Q1 27", h: 88 },
  { label: "Q2 27", h: 100 },
  { label: "Q3 27", h: 72 },
  { label: "Q4 27", h: 48 },
  { label: "Q1 28", h: 26 },
  { label: "Q2 28", h: 14 },
];

export const OPENING: { t: string; cls: ClsKey }[] = [
  { t: "Compliance deadlines push workflow projects into 2027 budgets", cls: "V" },
  { t: "Procurement cycles shortened by 9 days across four sources", cls: "V" },
  { t: "No vertical native has an AT or public-sector presence yet", cls: "S" },
];

export const CLOSING: { t: string; cls: ClsKey }[] = [
  { t: "Suite incumbents bundling workflow into mid-tier contracts", cls: "V" },
  { t: "Nine funded natives hiring German-speaking GTM teams", cls: "S" },
  { t: "Suite renewal cycle locks buyers for 24–36 months once signed", cls: "E" },
];

export const DELAYS: { q: string; cap: number; note: string }[] = [
  { q: "Q1 2027", cap: 100, note: "Full window. Price realisation at list minus 12%, and the first two quarters carry no direct native competitor in AT industrial." },
  { q: "Q2 2027", cap: 92, note: "Still inside peak. Expect one additional native in DE manufacturing; discounting deepens to 16%." },
  { q: "Q3 2027", cap: 78, note: "Bundling likely visible. Deals still close but land-and-expand slows; €2.1M of first-year revenue foregone versus Q1." },
  { q: "Q4 2027", cap: 55, note: "Half the window is gone. Entry becomes a displacement motion against signed suite contracts." },
  { q: "Q1 2028", cap: 31, note: "Category is contested and priced. Entry only justifiable with a differentiated wedge, not a general platform." },
];

export const GATES: { name: string; lead: string; by: string; status: string }[] = [
  { name: "Segment decision locked", lead: "2 weeks", by: "15 Oct 2026", status: "due next" },
  { name: "Local compliance review completed", lead: "10 weeks", by: "20 Dec 2026", status: "on track" },
  { name: "German-language product parity", lead: "16 weeks", by: "31 Dec 2026", status: "at risk" },
  { name: "First two reference customers signed", lead: "12 weeks", by: "15 Jan 2027", status: "not started" },
  { name: "DACH GTM team in seat", lead: "14 weeks", by: "01 Feb 2027", status: "not started" },
];

export const MONITORS: { name: string; cur: string; pct: number; thr: number }[] = [
  { name: "Suite bundling announcements, rolling 90d", cur: "2 of 4", pct: 50, thr: 75 },
  { name: "Median tender award lag", cur: "5.8 mo", pct: 66, thr: 80 },
  { name: "Funded natives with DACH GTM roles", cur: "9 of 14", pct: 64, thr: 71 },
  { name: "Source freshness median", cur: "11 days", pct: 52, thr: 75 },
];

// ---------- 07 Invalidation risks ----------

export type Risk = {
  key: string;
  name: string;
  p: string;
  dProb: number;
  dConf: number;
  lead: string;
  win: string | null;
  effect: string;
  warning: string;
};

export const RISKS: Risk[] = [
  { key: "r1", name: "Incumbent bundling", p: "31%", dProb: 16, dConf: 6, lead: "6–8 weeks", win: "Q4 2026–Q1 2027 · compressed", effect: "Window compresses by two quarters and price realisation falls 18%. Entry still positive, but the first-mover premium disappears.", warning: "Suite vendor pricing-page changes plus partner-programme announcements in DE." },
  { key: "r2", name: "Longer procurement", p: "22%", dProb: 11, dConf: 4, lead: "1 quarter", win: "Q3 2027–Q1 2028 · slips", effect: "Median cycle moves from 5.8 to 8+ months. Launch slips two quarters and cash-to-first-revenue rises 40%.", warning: "Tender publication-to-award lag in the public feed; procurement headcount postings." },
  { key: "r3", name: "EU regulatory drag", p: "17%", dProb: 9, dConf: 5, lead: "2 quarters", win: "Q3 2027–Q1 2028 · slips", effect: "Compliance review becomes mandatory pre-pilot in regulated segments. CH financial services drops out of the near-term plan.", warning: "Draft guidance published; national implementation notes from DE and AT regulators." },
  { key: "r4", name: "Mittelstand builds in-house", p: "12%", dProb: 7, dConf: 3, lead: "2–3 quarters", win: null, effect: "Serviceable market shrinks roughly 15% as larger mid-market firms use internal platform teams.", warning: "Internal AI-platform job postings at firms above 500 FTE." },
  { key: "r5", name: "Signal quality decay", p: "9%", dProb: 4, dConf: 9, lead: "immediate", win: null, effect: "Job-post and pricing feeds lose coverage, band widens from ±14pt to ±26pt. The verdict holds but confidence does not.", warning: "Source freshness median crossing 21 days; extraction confidence below 0.8." },
];

export const FALS: { claim: string; test: string; check: string; status: string }[] = [
  { claim: "Demand growth exceeds 40% over 12 months", test: "Demand index reading on 02 Sep 2027", check: "02 Sep 2027", status: "holding" },
  { claim: "No suite incumbent bundles workflow at mid-tier before Q3 2027", test: "Pricing-page and bundle monitoring, weekly", check: "continuous", status: "watch" },
  { claim: "Median procurement cycle stays under 7 months", test: "Tender award records, quarterly", check: "15 Jan 2027", status: "holding" },
  { claim: "At least 3 of 5 AT industrial pilots convert to paid", test: "Reference-customer tracking", check: "30 Jun 2027", status: "not yet testable" },
];

// ---------- 08 Recommendation ----------

export const PHASES: { n: string; name: string; when: string; cost: string; work: string; gate: string; kill: string }[] = [
  { n: "01", name: "Discovery and compliance", when: "Now → Dec 2026", cost: "€340k", work: "Five paid pilots in AT industrial and DE manufacturing. Local compliance review. German-language product parity scoped and staffed.", gate: "Three of five pilots reach a signed paid agreement, and compliance review completes without a blocking finding.", kill: "Fewer than two pilots convert, or compliance review surfaces a change needing more than one quarter of engineering." },
  { n: "02", name: "Launch", when: "Jan → Jun 2027", cost: "€1.9M", work: "DACH GTM team of nine. Two reference customers public. Channel agreements with two regional SIs.", gate: "€1.2M in signed ARR by 30 Jun 2027 with a median cycle under 7 months.", kill: "Median cycle exceeds 9 months, or a suite incumbent bundles at mid-tier before launch completes." },
  { n: "03", name: "Expand or exit", when: "Jul 2027 → Q1 2028", cost: "€3.4M", work: "Extend to DE professional services and public-adjacent tenders. Move from direct to mixed channel.", gate: "€4M ARR run rate and net revenue retention above 105%.", kill: "Retention below 90%, or price realisation more than 25% below list for two consecutive quarters." },
];

export const UPGRADES: { name: string; cost: string; gain: string }[] = [
  { name: "Buy transacted-price data for DACH workflow deals", cost: "€48k", gain: "band −6pt" },
  { name: "Commission a 400-firm mid-market survey", cost: "€120k", gain: "band −9pt" },
  { name: "License AT and CH private-company revenue estimates", cost: "€26k", gain: "band −4pt" },
];

export const STOPS: string[] = [
  "Two consecutive quarters where competitive intensity grows faster than demand.",
  "Confidence falls below 70% for one full quarter without new verified data.",
  "Any single risk on the invalidation page triggers before the first gate closes.",
];
