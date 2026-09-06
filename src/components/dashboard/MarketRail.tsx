"use client";

import { MARKETS, marketStats, type MarketId } from "@/lib/marketsData";

const STAGE_STYLE: Record<string, string> = {
  TREND: "text-accent",
  EMERGING: "text-white/60",
  "WEAK SIGNAL": "text-white/45",
};

const TIER_MARK: Record<string, string> = {
  VERIFIED: "●",
  SIGNAL: "◦",
  ESTIMATE: "◇",
};

export default function MarketRail({
  selected,
  onSelect,
}: {
  selected: MarketId;
  onSelect: (id: MarketId) => void;
}) {
  return (
    <aside className="flex-none lg:w-[280px]">
      <div className="mb-3 font-mono text-[10px] tracking-[0.14em] text-white/40">
        MARKETS TRACKED
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {MARKETS.map((market) => {
          const active = market.id === selected;
          const stat = marketStats[market.id]["12MO"];
          return (
            <button
              key={market.id}
              type="button"
              onClick={() => onSelect(market.id)}
              className={`flex w-[220px] flex-none flex-col gap-2.5 rounded-xl border p-4 text-left transition lg:w-auto ${
                active
                  ? "border-accent/40 bg-accent/[0.07]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold leading-snug">
                  {market.shortName}{" "}
                  <span className={active ? "text-accent" : "text-white/40"}>
                    {TIER_MARK[market.tier]}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[10px] tracking-[0.06em] ${STAGE_STYLE[market.stage]}`}>
                  {market.stage}
                </span>
                <svg viewBox="0 0 160 30" className="h-[22px] w-[80px]">
                  <polyline
                    points={market.sparkline}
                    fill="none"
                    stroke={active ? "#4FE3C1" : "rgba(230,237,235,.5)"}
                    strokeWidth="2"
                    strokeDasharray={market.dashed ? "4 4" : undefined}
                  />
                </svg>
              </div>
              <div className="flex items-baseline justify-between font-mono text-[11px]">
                <span className={`font-semibold ${active ? "text-accent" : "text-foreground"}`}>
                  {stat.demand} 12MO
                </span>
                <span className="text-white/45">{stat.probability} prob</span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
