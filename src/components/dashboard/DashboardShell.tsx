"use client";

import { useState } from "react";
import Link from "next/link";
import type { Horizon } from "@/components/HorizonPicker";
import type { MarketId } from "@/lib/marketsData";
import ReportSidebar from "@/components/dashboard/ReportSidebar";
import ReportDoc from "@/components/dashboard/ReportDoc";

export default function DashboardShell() {
  const [marketId, setMarketId] = useState<MarketId>("ai-workflow");
  const [horizon, setHorizon] = useState<Horizon>("12MO");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 h-[65px] border-b border-white/[0.07] bg-background/95 backdrop-blur-md">
        <div className="flex h-full flex-wrap items-center justify-between gap-3 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-[17px] font-bold tracking-[0.16em]">
              NVILE
            </Link>
            <span className="hidden items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-accent sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              DASHBOARD · LIVE
            </span>
            <span className="hidden font-mono text-[11px] text-white/40 md:inline">OPPORTUNITY REPORT</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md border border-white/15 px-3.5 py-2 text-white/75 transition hover:border-white/35"
            >
              Export PDF
            </button>
            <a
              href="#recommendation"
              className="rounded-md bg-accent px-3.5 py-2 font-semibold text-accent-ink transition hover:brightness-110"
            >
              Open Decision Center
            </a>
            <Link href="/" className="font-mono text-[11px] text-white/45 transition hover:text-white/75">
              ← Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
        <ReportSidebar />
        <ReportDoc
          marketId={marketId}
          horizon={horizon}
          onSelectMarket={setMarketId}
          onSelectHorizon={setHorizon}
        />
      </div>
    </div>
  );
}
