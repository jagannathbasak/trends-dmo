import type { Horizon } from "@/components/HorizonPicker";
import { HORIZONS } from "@/components/HorizonPicker";
import { dimensionsByScenario, type Scenario } from "@/lib/dimensionsData";
import { heroSeries, type Point } from "@/lib/forecastData";

export type MarketId = "ai-workflow" | "energy-storage" | "clinical-docs" | "circular-packaging";

export type MarketMeta = {
  id: MarketId;
  name: string;
  shortName: string;
  tier: "VERIFIED" | "SIGNAL" | "ESTIMATE";
  stage: "TREND" | "EMERGING" | "WEAK SIGNAL";
  sources: number;
  signals: string;
  question: string;
  sparkline: string;
  dashed?: boolean;
};

export const MARKETS: MarketMeta[] = [
  {
    id: "ai-workflow",
    name: "AI Workflow Platforms",
    shortName: "AI Workflow Platforms",
    tier: "VERIFIED",
    stage: "TREND",
    sources: 41,
    signals: "1.2M",
    question: "Where will demand for AI workflow platforms emerge next?",
    sparkline: "0,26 40,22 80,14 120,8 160,4",
  },
  {
    id: "energy-storage",
    name: "Industrial Energy Storage",
    shortName: "Energy Storage",
    tier: "SIGNAL",
    stage: "EMERGING",
    sources: 27,
    signals: "640K",
    question: "Where is industrial energy storage demand heading next?",
    sparkline: "0,24 40,20 80,18 120,11 160,7",
  },
  {
    id: "clinical-docs",
    name: "Clinical Documentation AI",
    shortName: "Clinical Docs AI",
    tier: "VERIFIED",
    stage: "TREND",
    sources: 33,
    signals: "890K",
    question: "Is clinical documentation AI still worth entering now?",
    sparkline: "0,20 40,12 80,10 120,14 160,18",
  },
  {
    id: "circular-packaging",
    name: "Circular Packaging Mandates",
    shortName: "Circular Packaging",
    tier: "ESTIMATE",
    stage: "WEAK SIGNAL",
    sources: 19,
    signals: "310K",
    question: "When will circular packaging mandates create real demand?",
    sparkline: "0,25 40,24 80,22 120,20 160,15",
    dashed: true,
  },
];

export function marketById(id: MarketId): MarketMeta {
  return MARKETS.find((m) => m.id === id) ?? MARKETS[0];
}

type StatRow = {
  demand: string;
  probability: string;
  competition: string;
  window: string;
  confidence: number;
  velocity: string;
  velocityNote: string;
  movementBand: string;
  timingNote: string;
};

export const marketStats: Record<MarketId, Record<Horizon, StatRow>> = {
  "ai-workflow": {
    "30D": {
      demand: "+4%",
      probability: "92%",
      competition: "+5%",
      window: "Immediate",
      confidence: 90,
      velocity: "Steady",
      velocityNote: "×1.1 against the 90-day average",
      movementBand: "Band +2% to +6%",
      timingNote: "No near-term catalyst expected",
    },
    "6MO": {
      demand: "+29%",
      probability: "89%",
      competition: "+17%",
      window: "Q4 '26 – Q1 '27",
      confidence: 86,
      velocity: "Building",
      velocityNote: "×1.7 against the 90-day average",
      movementBand: "Band +19% to +36%",
      timingNote: "Narrows as adoption compounds",
    },
    "12MO": {
      demand: "+68%",
      probability: "87%",
      competition: "+34%",
      window: "Q1–Q2 2027",
      confidence: 82,
      velocity: "Accelerating",
      velocityNote: "×2.4 against the 90-day average",
      movementBand: "Band +52% to +79%",
      timingNote: "Closes as competition rises",
    },
    "3YR": {
      demand: "+182%",
      probability: "74%",
      competition: "+96%",
      window: "Before Q4 2028",
      confidence: 68,
      velocity: "Structural",
      velocityNote: "×3.6 against the 3-year baseline",
      movementBand: "Band +140% to +221%",
      timingNote: "Multiple entry points, widening band",
    },
  },
  "energy-storage": {
    "30D": {
      demand: "+2%",
      probability: "80%",
      competition: "+4%",
      window: "Immediate",
      confidence: 85,
      velocity: "Steady",
      velocityNote: "×1.0 against the 90-day average",
      movementBand: "Band +1% to +4%",
      timingNote: "RFP volume still ramping",
    },
    "6MO": {
      demand: "+18%",
      probability: "76%",
      competition: "+12%",
      window: "Q1 '27",
      confidence: 80,
      velocity: "Building",
      velocityNote: "×1.4 against the 90-day average",
      movementBand: "Band +11% to +24%",
      timingNote: "Utilities moving pilots to contracts",
    },
    "12MO": {
      demand: "+41%",
      probability: "72%",
      competition: "+19%",
      window: "Q3 '27",
      confidence: 75,
      velocity: "Building",
      velocityNote: "×1.6 against the 90-day average",
      movementBand: "Band +33% to +49%",
      timingNote: "Opens as interconnection deadlines firm up",
    },
    "3YR": {
      demand: "+102%",
      probability: "61%",
      competition: "+58%",
      window: "Through 2029",
      confidence: 60,
      velocity: "Accelerating",
      velocityNote: "×2.0 against the 3-year baseline",
      movementBand: "Band +74% to +130%",
      timingNote: "Grid-modernisation funding is the swing factor",
    },
  },
  "clinical-docs": {
    "30D": {
      demand: "+1%",
      probability: "58%",
      competition: "+6%",
      window: "Narrow",
      confidence: 62,
      velocity: "Slowing",
      velocityNote: "×0.9 against the 90-day average",
      movementBand: "Band 0% to +3%",
      timingNote: "Procurement cycles already lengthening",
    },
    "6MO": {
      demand: "+6%",
      probability: "53%",
      competition: "+15%",
      window: "Closing soon",
      confidence: 57,
      velocity: "Slowing",
      velocityNote: "×0.8 against the 90-day average",
      movementBand: "Band +2% to +10%",
      timingNote: "EHR vendors signalling bundled features",
    },
    "12MO": {
      demand: "+12%",
      probability: "48%",
      competition: "+22%",
      window: "Closing",
      confidence: 51,
      velocity: "Slowing",
      velocityNote: "×1.0 against the 90-day average",
      movementBand: "Band +5% to +18%",
      timingNote: "Window closes as bundling reaches GA",
    },
    "3YR": {
      demand: "+19%",
      probability: "39%",
      competition: "+40%",
      window: "Largely closed",
      confidence: 40,
      velocity: "Cooling",
      velocityNote: "×0.6 against the 3-year baseline",
      movementBand: "Band +6% to +30%",
      timingNote: "Standalone category mostly absorbed",
    },
  },
  "circular-packaging": {
    "30D": {
      demand: "0%",
      probability: "44%",
      competition: "+1%",
      window: "Too early",
      confidence: 48,
      velocity: "Forming",
      velocityNote: "×0.7 against the 90-day average",
      movementBand: "Band -1% to +2%",
      timingNote: "No binding mandate dates yet",
    },
    "6MO": {
      demand: "+9%",
      probability: "52%",
      competition: "+5%",
      window: "Forming",
      confidence: 55,
      velocity: "Forming",
      velocityNote: "×1.0 against the 90-day average",
      movementBand: "Band +3% to +15%",
      timingNote: "Draft language circulating in three states",
    },
    "12MO": {
      demand: "+29%",
      probability: "61%",
      competition: "+11%",
      window: "2028",
      confidence: 63,
      velocity: "Building",
      velocityNote: "×1.3 against the 90-day average",
      movementBand: "Band +17% to +41%",
      timingNote: "Opens once enforcement dates are confirmed",
    },
    "3YR": {
      demand: "+88%",
      probability: "66%",
      competition: "+37%",
      window: "2028–2030",
      confidence: 70,
      velocity: "Accelerating",
      velocityNote: "×1.9 against the 3-year baseline",
      movementBand: "Band +55% to +129%",
      timingNote: "Widens once compliance vendors scale",
    },
  },
};

function parsePct(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export type ChartSeries = { observed: Point[]; forecast: Point[]; band: number };

function scaleChart(base: ChartSeries, factor: number): ChartSeries {
  const pivot = base.observed[0][1];
  const clamped = Math.max(factor, 0.08);
  const scaleY = (pts: Point[]): Point[] =>
    pts.map(([x, y]) => [x, Math.round((pivot + (y - pivot) * clamped) * 10) / 10]);
  return {
    observed: scaleY(base.observed),
    forecast: scaleY(base.forecast),
    band: Math.round(base.band * Math.max(clamped, 0.35) * 10) / 10,
  };
}

function buildMarketChart(id: MarketId): Record<Horizon, ChartSeries> {
  const entries = HORIZONS.map((h) => {
    const base = heroSeries[h];
    if (id === "ai-workflow") return [h, { observed: base.observed, forecast: base.forecast, band: base.band }] as const;
    const factor = parsePct(marketStats[id][h].demand) / parsePct(marketStats["ai-workflow"][h].demand);
    return [h, scaleChart(base, factor)] as const;
  });
  return Object.fromEntries(entries) as Record<Horizon, ChartSeries>;
}

export const marketChart: Record<MarketId, Record<Horizon, ChartSeries>> = {
  "ai-workflow": buildMarketChart("ai-workflow"),
  "energy-storage": buildMarketChart("energy-storage"),
  "clinical-docs": buildMarketChart("clinical-docs"),
  "circular-packaging": buildMarketChart("circular-packaging"),
};

export type DimensionSet = {
  demand: string;
  demandConfidence: number;
  demandNote: string;
  marketSize: string;
  marketSize2026: string;
  marketSize2027: string;
  marketSize2029: string;
  marketBar2026: number;
  marketBar2027: number;
  marketBar2029: number;
  competition: string;
  competitionNote: string;
  momentum: string;
  momentumNote: string;
  geo: { region: string; value: string }[];
};

export const marketDimensions: Record<MarketId, Record<Scenario, DimensionSet>> = {
  "ai-workflow": dimensionsByScenario,
  "energy-storage": {
    BEAR: {
      demand: "+18%",
      demandConfidence: 60,
      demandNote: "Band ±7 pts. Slows further if grid-storage subsidies lapse.",
      marketSize: "$6.1B",
      marketSize2026: "$4.8B",
      marketSize2027: "$5.3B",
      marketSize2029: "$6.1B",
      marketBar2026: 79,
      marketBar2027: 87,
      marketBar2029: 100,
      competition: "+9%",
      competitionNote: "Intensity stays low as capex cycles remain long.",
      momentum: "Steady",
      momentumNote: "Velocity ×1.1, utility-scale bids still sparse.",
      geo: [
        { region: "DE", value: "+22%" },
        { region: "NL", value: "+17%" },
        { region: "NORDICS", value: "+29%" },
      ],
    },
    BASE: {
      demand: "+41%",
      demandConfidence: 75,
      demandNote: "Band ±10 pts. Invalidated if lithium input costs spike.",
      marketSize: "$8.9B",
      marketSize2026: "$5.6B",
      marketSize2027: "$7.1B",
      marketSize2029: "$8.9B",
      marketBar2026: 63,
      marketBar2027: 80,
      marketBar2029: 100,
      competition: "+19%",
      competitionNote: "Intensity moves low → moderate as utilities scale procurement.",
      momentum: "Building",
      momentumNote: "Velocity ×1.6, grid operators moving from pilots to contracts.",
      geo: [
        { region: "DE", value: "+34%" },
        { region: "NL", value: "+26%" },
        { region: "NORDICS", value: "+47%" },
      ],
    },
    BULL: {
      demand: "+72%",
      demandConfidence: 55,
      demandNote: "Band ±16 pts. Requires a second wave of grid-modernisation funding.",
      marketSize: "$11.4B",
      marketSize2026: "$6.4B",
      marketSize2027: "$9.0B",
      marketSize2029: "$11.4B",
      marketBar2026: 56,
      marketBar2027: 79,
      marketBar2029: 100,
      competition: "+33%",
      competitionNote: "Intensity moves moderate → high as new entrants scale fast.",
      momentum: "Accelerating",
      momentumNote: "Velocity ×2.1, subsidy-driven demand pulling forward.",
      geo: [
        { region: "DE", value: "+58%" },
        { region: "NL", value: "+45%" },
        { region: "NORDICS", value: "+81%" },
      ],
    },
  },
  "clinical-docs": {
    BEAR: {
      demand: "+6%",
      demandConfidence: 45,
      demandNote: "Band ±5 pts. Slows further if reimbursement codes stay unclear.",
      marketSize: "$3.6B",
      marketSize2026: "$3.1B",
      marketSize2027: "$3.3B",
      marketSize2029: "$3.6B",
      marketBar2026: 86,
      marketBar2027: 92,
      marketBar2029: 100,
      competition: "+14%",
      competitionNote: "Intensity plateaus as incumbents consolidate share.",
      momentum: "Cooling",
      momentumNote: "Velocity ×0.8, hospital procurement cycles lengthening.",
      geo: [
        { region: "DE", value: "+9%" },
        { region: "NL", value: "+7%" },
        { region: "NORDICS", value: "+11%" },
      ],
    },
    BASE: {
      demand: "+12%",
      demandConfidence: 51,
      demandNote: "Band ±6 pts. Invalidated if a dominant EHR vendor bundles the feature free.",
      marketSize: "$4.4B",
      marketSize2026: "$3.4B",
      marketSize2027: "$3.8B",
      marketSize2029: "$4.4B",
      marketBar2026: 77,
      marketBar2027: 86,
      marketBar2029: 100,
      competition: "+22%",
      competitionNote: "Intensity moves moderate → high as EHR vendors bundle in.",
      momentum: "Slowing",
      momentumNote: "Velocity ×1.0, window narrows as incumbents catch up.",
      geo: [
        { region: "DE", value: "+16%" },
        { region: "NL", value: "+13%" },
        { region: "NORDICS", value: "+19%" },
      ],
    },
    BULL: {
      demand: "+23%",
      demandConfidence: 38,
      demandNote: "Band ±11 pts. Needs a reimbursement change that has not been proposed.",
      marketSize: "$5.3B",
      marketSize2026: "$3.6B",
      marketSize2027: "$4.3B",
      marketSize2029: "$5.3B",
      marketBar2026: 68,
      marketBar2027: 81,
      marketBar2029: 100,
      competition: "+31%",
      competitionNote: "Intensity moves high fast as bundling accelerates.",
      momentum: "Volatile",
      momentumNote: "Velocity swings ×0.6–1.4 with policy signals.",
      geo: [
        { region: "DE", value: "+27%" },
        { region: "NL", value: "+21%" },
        { region: "NORDICS", value: "+30%" },
      ],
    },
  },
  "circular-packaging": {
    BEAR: {
      demand: "+14%",
      demandConfidence: 50,
      demandNote: "Band ±8 pts. Stalls if EU mandate timelines slip again.",
      marketSize: "$2.8B",
      marketSize2026: "$2.1B",
      marketSize2027: "$2.4B",
      marketSize2029: "$2.8B",
      marketBar2026: 75,
      marketBar2027: 86,
      marketBar2029: 100,
      competition: "+5%",
      competitionNote: "Intensity stays low; compliance vendors still forming.",
      momentum: "Forming",
      momentumNote: "Velocity ×0.9, mandate dates still provisional.",
      geo: [
        { region: "DE", value: "+19%" },
        { region: "NL", value: "+15%" },
        { region: "NORDICS", value: "+12%" },
      ],
    },
    BASE: {
      demand: "+29%",
      demandConfidence: 63,
      demandNote: "Band ±9 pts. Invalidated if mandate enforcement is delayed past 2028.",
      marketSize: "$4.0B",
      marketSize2026: "$2.4B",
      marketSize2027: "$3.1B",
      marketSize2029: "$4.0B",
      marketBar2026: 60,
      marketBar2027: 78,
      marketBar2029: 100,
      competition: "+11%",
      competitionNote: "Intensity stays low → moderate ahead of enforcement.",
      momentum: "Building",
      momentumNote: "Velocity ×1.3, procurement teams pre-positioning for 2028.",
      geo: [
        { region: "DE", value: "+33%" },
        { region: "NL", value: "+27%" },
        { region: "NORDICS", value: "+21%" },
      ],
    },
    BULL: {
      demand: "+55%",
      demandConfidence: 46,
      demandNote: "Band ±17 pts. Requires enforcement to pull forward into 2027.",
      marketSize: "$5.6B",
      marketSize2026: "$2.7B",
      marketSize2027: "$3.9B",
      marketSize2029: "$5.6B",
      marketBar2026: 48,
      marketBar2027: 70,
      marketBar2029: 100,
      competition: "+21%",
      competitionNote: "Intensity moves moderate → high once enforcement is confirmed.",
      momentum: "Surging",
      momentumNote: "Velocity ×1.9 if enforcement date is confirmed early.",
      geo: [
        { region: "DE", value: "+61%" },
        { region: "NL", value: "+49%" },
        { region: "NORDICS", value: "+38%" },
      ],
    },
  },
};

export type Catalyst = { label: string; mark: "●" | "◦" | "◇"; pct: number };
export type Risk = { label: string; pct: string };

export type DecisionContent = {
  verdict: string;
  happening: string;
  happeningEvidence: string;
  why: string;
  whyTag: string;
  recommendation: string;
  actNow: number;
  waitTwo: number;
  waitNote: string;
  watchFor: string;
  catalysts: Catalyst[];
  risks: Risk[];
};

export const marketDecision: Record<MarketId, DecisionContent> = {
  "ai-workflow": {
    verdict:
      "Enter in Q1 2027. Opportunity probability is 87%, and the window narrows as competitive intensity rises 34% through the year.",
    happening:
      "Demand is up 41% over 18 months, and hiring for automation roles in DACH has tripled since March.",
    happeningEvidence: "● 12 VERIFIED SOURCES · ◦ 1.2M SIGNALS",
    why: "Agent tooling crossed production reliability, and budgets are being reallocated out of legacy RPA contracts.",
    whyTag: "3 RANKED CATALYSTS · EACH CITED",
    recommendation:
      "Commit budget in Q4 2026, launch in Q1 2027, and target DE and NL mid-market before the Nordics.",
    actNow: 87,
    waitTwo: 54,
    waitNote: "competition absorbs the lead",
    watchFor: "Incumbent bundling",
    catalysts: [
      { label: "Agent tooling reached production reliability", mark: "●", pct: 84 },
      { label: "Procurement budgets reallocated from RPA", mark: "◦", pct: 58 },
      { label: "Compliance frameworks stabilised in EU", mark: "◇", pct: 37 },
    ],
    risks: [
      { label: "Incumbent bundling", pct: "31%" },
      { label: "Procurement cycles lengthen", pct: "22%" },
      { label: "EU regulatory drag", pct: "17%" },
    ],
  },
  "energy-storage": {
    verdict:
      "Enter in Q3 2027. Opportunity probability is 72%, building as utilities move from pilots to signed contracts.",
    happening:
      "Capex commitments for grid-scale storage are up 24% over 18 months, and RFP volume from European grid operators has doubled since Q4.",
    happeningEvidence: "● 9 VERIFIED FILINGS · ◦ 640K SIGNALS",
    why: "Grid operators are pre-committing capex ahead of renewables interconnection deadlines, and battery cell costs fell 18% over two quarters.",
    whyTag: "3 RANKED CATALYSTS · EACH CITED",
    recommendation:
      "Commit budget in Q1 2027, target DE grid operators first, and revisit NL and the Nordics as interconnection deadlines firm up.",
    actNow: 81,
    waitTwo: 58,
    waitNote: "early movers lock in utility relationships",
    watchFor: "Lithium input cost swings",
    catalysts: [
      { label: "Interconnection deadlines forcing utility capex", mark: "●", pct: 79 },
      { label: "Battery cell costs fell 18% over two quarters", mark: "◦", pct: 61 },
      { label: "Grid-modernisation subsidies confirmed in three states", mark: "◇", pct: 44 },
    ],
    risks: [
      { label: "Lithium input cost spike", pct: "28%" },
      { label: "Interconnection permitting delays", pct: "24%" },
      { label: "Subsidy programme lapses", pct: "16%" },
    ],
  },
  "clinical-docs": {
    verdict:
      "Hold new commitments. Opportunity probability has fallen to 48% as dominant EHR vendors move to bundle the feature.",
    happening:
      "Demand growth has slowed to +12% over 18 months as hospital procurement cycles lengthen and budget approvals slip.",
    happeningEvidence: "● 11 VERIFIED SOURCES · ◦ 890K SIGNALS",
    why: "Two dominant EHR vendors have signalled plans to bundle documentation AI into existing contracts, softening the case for a standalone purchase.",
    whyTag: "2 RANKED CATALYSTS · EACH CITED",
    recommendation:
      "Hold new budget commitments. If entering, move within two quarters, before EHR bundling reaches general availability.",
    actNow: 48,
    waitTwo: 29,
    waitNote: "bundling likely reaches general availability",
    watchFor: "EHR vendor bundling",
    catalysts: [
      { label: "EHR vendors signalled bundled documentation AI", mark: "●", pct: 71 },
      { label: "Hospital procurement cycles lengthening", mark: "◦", pct: 46 },
    ],
    risks: [
      { label: "EHR vendor bundling reaches GA", pct: "39%" },
      { label: "Reimbursement codes stay unclear", pct: "26%" },
      { label: "Budget approvals slip further", pct: "19%" },
    ],
  },
  "circular-packaging": {
    verdict:
      "Track, don't commit. Opportunity probability sits at 61% and rises once EU enforcement dates are confirmed.",
    happening:
      "Signal is still forming: policy filings referencing circular-packaging mandates are up 3× over 12 months, but no binding dates are confirmed.",
    happeningEvidence: "◦ 6 SIGNAL SOURCES · ◇ 310K SIGNALS",
    why: "EU member states are aligning draft language ahead of a 2028 compliance deadline, and three governments have opened public consultation.",
    whyTag: "2 RANKED CATALYSTS · EACH CITED",
    recommendation:
      "Track the mandate timeline now. Commit budget only once enforcement dates are confirmed, likely Q2 2027 at the earliest.",
    actNow: 55,
    waitTwo: 66,
    waitNote: "clarity on enforcement dates improves the odds",
    watchFor: "EU mandate enforcement date",
    catalysts: [
      { label: "Three governments opened public consultation", mark: "◦", pct: 55 },
      { label: "Compliance vendors pre-positioning for 2028", mark: "◇", pct: 33 },
    ],
    risks: [
      { label: "Mandate enforcement delayed past 2028", pct: "34%" },
      { label: "Draft language weakened in negotiation", pct: "21%" },
      { label: "Compliance vendor supply stays thin", pct: "14%" },
    ],
  },
};
