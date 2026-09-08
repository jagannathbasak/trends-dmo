import { KILLERS, RANGES, REPORT_META } from "@/lib/opportunityReport/data";
import { buildHistoryChart } from "@/lib/opportunityReport/charts";
import type { RangeKey } from "@/lib/opportunityReport/types";

export default function VerdictSection({
  range,
  onOpenEvidence,
  onOpenRisks,
}: {
  range: RangeKey;
  onOpenEvidence: () => void;
  onOpenRisks: () => void;
}) {
  const chart = buildHistoryChart(range);
  const demandHead = RANGES[range].head;

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-[4px] border border-accent/25 bg-accent/[0.04] p-5 sm:p-5.5">
        <div className="mb-3.5 flex items-center gap-1.5">
          <span className="font-mono text-[9.5px] font-semibold tracking-[0.18em] text-accent">
            VERDICT
          </span>
          <span className="text-[10px] text-[#d9a441]">◈</span>
        </div>
        <p className="mb-4 max-w-[62ch] text-balance font-display text-xl font-semibold leading-[1.42] text-foreground">
          Enter in Q1 2027. Opportunity probability is {REPORT_META.verdictProb}%, and the window
          narrows as competitive intensity rises 34% through the year.
        </p>
        <div className="flex flex-wrap gap-4.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-white/50">
          <span>Confidence {REPORT_META.confidence}%</span>
          <span>Band {REPORT_META.band}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            Re-scored daily
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4">
          <div className="mb-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
            Demand {range} <span className="text-[#5fb2a4]">◦</span>
          </div>
          <div className="font-display text-[26px] font-bold text-accent">{demandHead}</div>
        </div>
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4">
          <div className="mb-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
            Market size &apos;29 <span className="text-white/50">◇</span>
          </div>
          <div className="font-display text-[26px] font-bold text-foreground">$14.2B</div>
        </div>
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4">
          <div className="mb-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
            Competition <span className="text-[#5fb2a4]">◦</span>
          </div>
          <div className="font-display text-[26px] font-bold text-foreground">+34%</div>
        </div>
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4">
          <div className="mb-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
            Entry window <span className="text-[#d9a441]">◈</span>
          </div>
          <div className="font-display text-[22px] font-bold text-foreground">Q1–Q2 2027</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4">
          <div className="mb-2 flex justify-between font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
            <span>History → forecast</span>
            <span>Demand index</span>
          </div>
          <svg viewBox="0 0 600 180" preserveAspectRatio="none" className="block h-[152px] w-full">
            <path d={chart.band} fill="#12463a" opacity={0.6} />
            <path d={chart.hist} fill="none" stroke="#d3dbd7" strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
            <path d={chart.fc} fill="none" stroke="#4fe3c1" strokeWidth={1.8} strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
            <line x1={chart.tx} y1="8" x2={chart.tx} y2="172" stroke="#3b453f" strokeWidth={1} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
            <circle cx={chart.tx} cy={chart.ty} r={4} fill="#4fe3c1" />
          </svg>
          <div className="mt-1.5 flex justify-between font-mono text-[9px] font-medium tracking-[0.12em] text-white/40">
            <span>{chart.l}</span>
            <span className="text-accent">TODAY</span>
            <span>{chart.r}</span>
          </div>
        </div>

        <div className="flex flex-col rounded-[4px] border border-white/10 bg-[#0e1211] p-4">
          <div className="mb-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
            What could kill this <span className="text-[#d9a441]">◈</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {KILLERS.map((k) => (
              <button
                key={k.name}
                type="button"
                onClick={onOpenRisks}
                className="flex w-full items-baseline justify-between gap-2.5 border-b border-white/[0.06] pb-2 text-left"
              >
                <span className="font-display text-[13px] text-foreground/90">
                  {k.name} <span className="text-[9px] text-[#d9a441]">◈</span>
                </span>
                <span className="font-mono text-[12px] font-semibold text-[#d9a441]">{k.p}</span>
              </button>
            ))}
          </div>
          <div className="mt-auto pt-4 font-mono text-[10px] leading-relaxed text-[#a4863f]">
            If any risk triggers, the verdict above is recalculated and you are notified.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[4px] border border-white/10 bg-[#0e1211] p-3.5">
        <div className="font-mono text-[10.5px] leading-[1.7] tracking-[0.02em] text-white/55">
          <span className="text-accent">●</span> 12 verified filings · 1.2M observed signals ·{" "}
          <span className="text-white/50">◇</span> 4 derived estimates with method shown ·{" "}
          <span className="text-[#d9a441]">◈</span> 6 model outputs with band and confidence
        </div>
        <button
          type="button"
          onClick={onOpenEvidence}
          className="rounded-[3px] border border-white/15 bg-white/[0.03] px-3.5 py-2 font-mono text-[10.5px] font-medium tracking-[0.06em] text-white/75 transition hover:border-white/30"
        >
          Open evidence trail
        </button>
      </div>
    </section>
  );
}
