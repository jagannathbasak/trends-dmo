"use client";

import { useState } from "react";
import Link from "next/link";
import type { Horizon } from "@/components/HorizonPicker";
import type { MarketId } from "@/lib/marketsData";
import ReportPanel from "@/components/dashboard/ReportPanel";

export default function DashboardShell() {
  const [marketId, setMarketId] = useState<MarketId>("ai-workflow");
  const [horizon, setHorizon] = useState<Horizon>("12MO");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-[17px] font-bold tracking-[0.16em]">
              NVILE
            </Link>
            <span className="hidden rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-accent sm:inline-flex sm:items-center sm:gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              DASHBOARD · LIVE
            </span>
          </div>
          <Link href="/" className="font-mono text-[11px] text-white/45 transition hover:text-white/75">
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
        <ReportPanel
          marketId={marketId}
          horizon={horizon}
          onSelectMarket={setMarketId}
          onSelectHorizon={setHorizon}
        />
      </main>
    </div>
  );
}
