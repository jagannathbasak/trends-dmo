"use client";

import { useState } from "react";
import Link from "next/link";
import { CLASS, EVIDENCE_MIX, NAV, RANGES, REPORT_META } from "@/lib/opportunityReport/data";
import type { RangeKey, ScenarioKey, SectionKey } from "@/lib/opportunityReport/types";
import VerdictSection from "./sections/VerdictSection";
import CurrentStateSection from "./sections/CurrentStateSection";
import EvidenceTrailSection from "./sections/EvidenceTrailSection";
import ForecastSection from "./sections/ForecastSection";
import CompetitiveSection from "./sections/CompetitiveSection";
import TimingSection from "./sections/TimingSection";
import RisksSection from "./sections/RisksSection";
import RecommendationSection from "./sections/RecommendationSection";

const RANGE_KEYS = Object.keys(RANGES) as RangeKey[];

export default function OpportunityReportApp() {
  const [section, setSection] = useState<SectionKey>("verdict");
  const [range, setRange] = useState<RangeKey>("12M");
  const [claim, setClaim] = useState(0);
  const [scenario, setScenario] = useState<ScenarioKey>("base");
  const [assume, setAssume] = useState<Record<string, boolean>>({});
  const [risks, setRisks] = useState<Record<string, boolean>>({});
  const [cell, setCell] = useState("2-3");
  const [delay, setDelay] = useState(0);
  const [phase, setPhase] = useState(0);

  const idx = NAV.findIndex((n) => n.k === section);
  const nextItem = NAV[(idx + 1) % NAV.length];

  function toggleAssume(k: string) {
    setAssume((prev) => ({ ...prev, [k]: !prev[k] }));
  }
  function toggleRisk(k: string) {
    setRisks((prev) => ({ ...prev, [k]: !prev[k] }));
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0a0d0c]/95 px-5 py-3.5 backdrop-blur-sm sm:px-6">
        <div className="flex items-baseline gap-3.5">
          <Link href="/" className="font-display text-sm font-bold tracking-[0.22em] text-foreground">
            NVILE
          </Link>
          <span className="hidden font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-white/40 sm:inline">
            Opportunity report
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-[3px] border border-white/15 bg-white/[0.03] px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.08em] text-white/75 transition hover:border-white/30"
          >
            Export PDF
          </button>
          <button
            type="button"
            onClick={() => setSection("recommend")}
            className="rounded-[3px] border border-accent bg-accent px-3.5 py-2 font-mono text-[10.5px] font-semibold tracking-[0.08em] text-accent-ink transition hover:brightness-110"
          >
            Open Decision Center
          </button>
        </div>
      </div>

      <div className="flex items-start">
        <aside className="sticky top-[53px] hidden max-h-[calc(100vh-53px)] w-[208px] flex-none overflow-auto border-r border-white/10 px-4.5 py-5.5 lg:block">
          <div className="mb-3 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
            Contents
          </div>
          <nav className="mb-6.5 flex flex-col gap-0.5">
            {NAV.map((item) => {
              const active = section === item.k;
              return (
                <button
                  key={item.k}
                  type="button"
                  onClick={() => setSection(item.k)}
                  className={`flex items-baseline gap-2 border-l-2 px-2 py-1.5 text-left font-mono text-[10.5px] font-medium tracking-[0.05em] transition ${
                    active
                      ? "border-accent bg-[#101614] text-accent"
                      : "border-transparent text-white/55 hover:text-white/80"
                  }`}
                >
                  <span className="opacity-60">{item.n}</span>
                  <span>{item.t}</span>
                </button>
              );
            })}
          </nav>

          <div className="rounded-[4px] border border-white/10 bg-[#0c100f] p-3.5">
            <div className="mb-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/35">
              Evidence mix
            </div>
            <div className="mb-3 flex flex-col gap-1.5">
              {EVIDENCE_MIX.map(({ cls, pct }) => {
                const c = CLASS[cls];
                return (
                  <div
                    key={cls}
                    className="flex items-center gap-1.5 font-mono text-[9.5px] font-medium tracking-[0.1em] text-white/60"
                  >
                    <span style={{ color: c.color }}>{c.glyph}</span>
                    <span className="flex-1">{c.name}</span>
                    <span className="text-white/80">{pct}%</span>
                  </div>
                );
              })}
            </div>
            <div className="flex h-1 overflow-hidden rounded-full bg-white/[0.06]">
              {EVIDENCE_MIX.map(({ cls, pct }) => (
                <div key={cls} style={{ width: `${pct}%`, background: CLASS[cls].color }} />
              ))}
            </div>
            <div className="mt-2.5 font-mono text-[9px] leading-relaxed text-white/35">
              Every figure in this report carries its class. Nothing is stated at a grade it has
              not earned.
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-7 pb-16 sm:px-7.5">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <h1 className="mb-2 text-balance font-display text-[27px] font-semibold leading-[1.15] tracking-[-0.01em] text-foreground">
                {REPORT_META.title}
              </h1>
              <div className="font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/40">
                {REPORT_META.generated}
              </div>
            </div>
            <div className="flex gap-1.5">
              {RANGE_KEYS.map((r) => {
                const active = range === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRange(r)}
                    className={`rounded-[3px] border px-2.5 py-1.5 font-mono text-[9.5px] font-medium tracking-[0.1em] transition ${
                      active
                        ? "border-accent/45 bg-accent/[0.12] text-accent"
                        : "border-white/10 bg-[#0e1211] text-white/55"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            {section === "verdict" && (
              <VerdictSection range={range} onOpenEvidence={() => setSection("evidence")} onOpenRisks={() => setSection("risks")} />
            )}
            {section === "current" && <CurrentStateSection />}
            {section === "evidence" && <EvidenceTrailSection claim={claim} onSelectClaim={setClaim} />}
            {section === "forecast" && (
              <ForecastSection
                scenario={scenario}
                onSelectScenario={setScenario}
                assume={assume}
                onToggleAssume={toggleAssume}
              />
            )}
            {section === "compete" && <CompetitiveSection cell={cell} onSelectCell={setCell} />}
            {section === "timing" && <TimingSection delay={delay} onSelectDelay={setDelay} />}
            {section === "risks" && (
              <RisksSection
                risks={risks}
                onToggleRisk={toggleRisk}
                onReset={() => setRisks({})}
                baseProb={REPORT_META.verdictProb}
                baseConf={REPORT_META.confidence}
              />
            )}
            {section === "recommend" && (
              <RecommendationSection phase={phase} onSelectPhase={setPhase} onPrint={() => window.print()} />
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3.5 border-t border-white/10 pt-4.5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/40">
              {REPORT_META.reportId}
            </span>
            <button
              type="button"
              onClick={() => setSection(nextItem.k)}
              className="rounded-[3px] border border-white/15 bg-white/[0.03] px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.06em] text-white/75 transition hover:border-white/30"
            >
              {nextItem.n} {nextItem.t} →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
