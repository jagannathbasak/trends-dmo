export type Scenario = "BEAR" | "BASE" | "BULL";

export const SCENARIOS: { key: Scenario; label: string }[] = [
  { key: "BEAR", label: "BEAR · +21%" },
  { key: "BASE", label: "BASE · +68%" },
  { key: "BULL", label: "BULL · +112%" },
];

export const dimensionsByScenario: Record<
  Scenario,
  {
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
  }
> = {
  BEAR: {
    demand: "+21%",
    demandConfidence: 68,
    demandNote: "Band ±9 pts. Invalidated further if hiring growth stalls.",
    marketSize: "$10.8B",
    marketSize2026: "$8.4B",
    marketSize2027: "$9.3B",
    marketSize2029: "$10.8B",
    marketBar2026: 78,
    marketBar2027: 86,
    marketBar2029: 100,
    competition: "+18%",
    competitionNote: "Intensity stays low → moderate through 2027.",
    momentum: "Steady",
    momentumNote: "Velocity ×1.2, no clear inflection yet.",
    geo: [
      { region: "DE", value: "+38%" },
      { region: "NL", value: "+30%" },
      { region: "NORDICS", value: "+24%" },
    ],
  },
  BASE: {
    demand: "+68%",
    demandConfidence: 82,
    demandNote: "Band ±11 pts. Invalidated if enterprise budgets contract.",
    marketSize: "$14.2B",
    marketSize2026: "$8.4B",
    marketSize2027: "$11.1B",
    marketSize2029: "$14.2B",
    marketBar2026: 59,
    marketBar2027: 78,
    marketBar2029: 100,
    competition: "+34%",
    competitionNote: "Intensity moves moderate → high by Q3 2027.",
    momentum: "Accelerating",
    momentumNote: "Velocity ×2.4 now, weakening after Q3 2027.",
    geo: [
      { region: "DE", value: "+74%" },
      { region: "NL", value: "+61%" },
      { region: "NORDICS", value: "+52%" },
    ],
  },
  BULL: {
    demand: "+112%",
    demandConfidence: 61,
    demandNote: "Band ±19 pts. Requires a second wave of enterprise adoption.",
    marketSize: "$18.6B",
    marketSize2026: "$9.1B",
    marketSize2027: "$13.7B",
    marketSize2029: "$18.6B",
    marketBar2026: 49,
    marketBar2027: 74,
    marketBar2029: 100,
    competition: "+52%",
    competitionNote: "Intensity moves high → severe by Q2 2027.",
    momentum: "Surging",
    momentumNote: "Velocity ×3.3, a second demand wave forming.",
    geo: [
      { region: "DE", value: "+121%" },
      { region: "NL", value: "+103%" },
      { region: "NORDICS", value: "+90%" },
    ],
  },
};
