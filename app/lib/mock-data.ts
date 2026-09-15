export type EvidenceClass = "verified" | "observed" | "derived" | "model";

// Evidence is shown as a color-coded dot, not a unicode glyph — a shape per
// class (filled / ring / dashed) reads as a designed system rather than
// decorative symbols, and the meaning still holds without relying on color alone.
export const EVIDENCE_SHAPE: Record<EvidenceClass, "filled" | "ring" | "dash"> = {
  verified: "filled",
  observed: "ring",
  derived: "ring",
  model: "dash",
};

export const EVIDENCE_COLOR: Record<EvidenceClass, string> = {
  verified: "var(--accent)",
  observed: "#5fb8ad",
  derived: "var(--text-dim)",
  model: "var(--amber)",
};

export const EVIDENCE_LABEL: Record<EvidenceClass, string> = {
  verified: "verified filings",
  observed: "observed signals",
  derived: "derived estimates",
  model: "model outputs with band",
};

export const DEFAULT_QUERY = "Should we enter AI workflow platforms in DACH mid-market?";

export type ThreadStatus = "verdict" | "rescoring" | "archived";

export const THREADS: { title: string; meta: string; status: ThreadStatus }[] = [
  { title: "AI workflow platforms · DACH mid-market", meta: "Verdict · 82%", status: "verdict" },
  { title: "EU edge compute", meta: "Re-scoring · 3h", status: "rescoring" },
  { title: "Vertical SaaS · Nordics", meta: "Verdict · 61%", status: "verdict" },
  { title: "Payments infra · UK SMB", meta: "Archived", status: "archived" },
];

export const STARTERS = [
  "Compare two segments",
  "Re-run last report",
  "Where is competition thinnest?",
];

export const ANALYSIS_STEPS = [
  { text: "45 sources read", status: "done" as const },
  { text: "1.2M signals scored", status: "done" as const },
  { text: "Classing evidence", status: "current" as const },
  { text: "Drafting verdict", status: "pending" as const },
];

export const VERDICT = {
  statement: "Enter in Q1 2027.",
  reasoning:
    "Opportunity probability is +64%, and the window narrows as competitive intensity rises 34% through the year.",
  confidence: 82,
  band: "+52 → +79%",
  sources: "45 sources",
  signals: "1.2M signals",
  date: "02 Sep 2026",
};

export const METRICS = [
  {
    key: "Demand, 12m",
    evidence: "observed" as EvidenceClass,
    value: "+18.2%",
    valueColor: "var(--accent)",
    sub: "observed signal",
  },
  {
    key: "Market size, '29",
    evidence: "derived" as EvidenceClass,
    value: "$14.2B",
    valueColor: "var(--text)",
    sub: "derived estimate",
  },
  {
    key: "Competition",
    evidence: "observed" as EvidenceClass,
    value: "+34%",
    valueColor: "var(--text)",
    sub: "intensity index",
  },
  {
    key: "Entry window",
    evidence: "model" as EvidenceClass,
    value: "Q1–Q2 '27",
    valueColor: "var(--text)",
    sub: "model output",
  },
];

export const EVIDENCE_TRAIL = [
  { count: "12", evidence: "verified" as EvidenceClass },
  { count: "1.2M", evidence: "observed" as EvidenceClass },
  { count: "4", evidence: "derived" as EvidenceClass },
  { count: "6", evidence: "model" as EvidenceClass },
];

export const KILLERS = [
  { name: "Incumbent bundling", pct: 31 },
  { name: "EU AI Act timing", pct: 22 },
  { name: "Mid-market budget freeze", pct: 17 },
];
