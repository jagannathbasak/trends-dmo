"use client";

import { useState } from "react";
import Link from "next/link";
import HorizonPicker, { type Horizon } from "@/components/HorizonPicker";
import { MARKETS, type MarketId } from "@/lib/marketsData";
import { SCENARIOS, type Scenario } from "@/lib/dimensionsData";
import EvidenceLegend from "@/components/EvidenceLegend";
import MarketRail from "@/components/dashboard/MarketRail";
import ForecastPanel from "@/components/dashboard/ForecastPanel";
import PredictionPanel from "@/components/dashboard/PredictionPanel";
import DimensionsGrid from "@/components/dashboard/DimensionsGrid";
import DecisionLadder from "@/components/dashboard/DecisionLadder";
import AskBox from "@/components/dashboard/AskBox";

export default function DashboardShell() {
  const [marketId, setMarketId] = useState<MarketId>("ai-workflow");
  const [horizon, setHorizon] = useState<Horizon>("12MO");
  const [scenario, setScenario] = useState<Scenario>("BASE");

  const market = MARKETS.find((m) => m.id === marketId) ?? MARKETS[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-[17px] font-bold tracking-[0.16em]">
              NVILE
            </Link>
            <span className="hidden rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-accent sm:inline-flex sm:items-center sm:gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              DASHBOARD · LIVE
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-[11px] text-white/45 transition hover:text-white/75"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-start lg:gap-8">
        <MarketRail selected={marketId} onSelect={setMarketId} />

        <main className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] text-white/40">
                {market.tier === "VERIFIED" ? "●" : market.tier === "SIGNAL" ? "◦" : "◇"}{" "}
                {market.tier} · {market.sources} SOURCES · {market.signals} SIGNALS
              </div>
              <h1 className="mt-1.5 text-balance font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[32px]">
                {market.name}
              </h1>
            </div>
            <HorizonPicker value={horizon} onChange={setHorizon} />
          </div>

          <ForecastPanel marketId={marketId} horizon={horizon} />

          <PredictionPanel marketId={marketId} horizon={horizon} />

          <section className="flex flex-col gap-4 rounded-2xl border border-white/10 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="font-mono text-[10px] tracking-[0.1em] text-white/40">
                WHAT NVILE PREDICTS · SCENARIO
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs font-medium">
                {SCENARIOS.map((s) => {
                  const active = s.key === scenario;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setScenario(s.key)}
                      className={`rounded-[7px] border px-3.5 py-2 transition ${
                        active
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-white/10 text-white/55 hover:border-white/25"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <DimensionsGrid marketId={marketId} scenario={scenario} />
          </section>

          <DecisionLadder marketId={marketId} />

          <AskBox key={marketId} marketId={marketId} />

          <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <EvidenceLegend />
            <span className="font-mono text-[10px] text-white/35">
              PREDICTIONS ARE MODELLED, NOT GUARANTEED
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
