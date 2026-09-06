"use client";

import { useModal } from "@/components/ModalProvider";
import { marketDecision, marketDimensions, marketStats, type MarketId } from "@/lib/marketsData";

export default function DecisionLadder({ marketId }: { marketId: MarketId }) {
  const { open } = useModal();
  const decision = marketDecision[marketId];
  const stat12 = marketStats[marketId]["12MO"];
  const base = marketDimensions[marketId].BASE;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-white/10 p-5 sm:p-6">
      <div className="font-mono text-[10px] tracking-[0.1em] text-white/40">DECISION CENTER</div>

      <div className="rounded-xl border border-accent/40 bg-accent/5 p-5">
        <div className="mb-2.5 font-mono text-[10px] tracking-[0.14em] text-accent">VERDICT ◈</div>
        <p className="text-balance font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl">
          {decision.verdict}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Step index="01 · WHAT IS HAPPENING" tag="OBSERVED">
          <p className="text-[15px] leading-relaxed">{decision.happening}</p>
          <div className="mt-2 font-mono text-[11px] text-white/40">{decision.happeningEvidence}</div>
        </Step>

        <Connector />

        <Step index="02 · WHY IT IS HAPPENING" tag="CAUSAL WEIGHTS">
          <p className="text-[15px] leading-relaxed">{decision.why}</p>
          <div className="mt-2 font-mono text-[11px] text-white/40">{decision.whyTag}</div>
        </Step>

        <Connector />

        <Step index="03 · WHAT IS LIKELY NEXT ◈" tag={`CONFIDENCE ${stat12.confidence}%`} accent>
          <p className="text-[15px] leading-relaxed">
            Demand reaches <b className="font-semibold text-accent">{stat12.demand} by {stat12.window}</b>{" "}
            with competition {stat12.competition}.
          </p>
          <div className="mt-2 font-mono text-[11px] text-white/40">
            {base.demandNote}
          </div>
        </Step>

        <Connector />

        <div className="rounded-xl border-[1.5px] border-accent bg-accent/[0.07] p-6 sm:p-7">
          <div className="mb-3.5 font-mono text-[10px] tracking-[0.12em] text-accent">
            04 · WHAT YOU SHOULD DO ABOUT IT
          </div>
          <p className="mb-5 text-balance font-display text-xl font-semibold leading-snug tracking-tight sm:text-[26px]">
            {decision.recommendation}
          </p>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            <ActionCard label="IF YOU ACT NOW ◈" value={`${decision.actNow}%`} note="probability of success" accent />
            <ActionCard
              label="IF YOU WAIT TWO QUARTERS ◈"
              value={`${decision.waitTwo}%`}
              note={decision.waitNote}
            />
            <ActionCard label="WATCH FOR ◦" value={decision.watchFor} note="alerts on trigger" small />
          </div>
          <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[11.5px] leading-relaxed text-white/45">
              Derived from modelled predictions. Every input carries its evidence tier and
              confidence, and the call is re-scored as new signals land.
            </p>
            <div className="flex flex-none gap-2.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => open("Share with team")}
                className="rounded-md border border-white/20 px-4 py-2.5 text-white/85 transition hover:border-white/40"
              >
                Share with team
              </button>
              <button
                type="button"
                onClick={() => open("Track this decision")}
                className="rounded-md bg-accent px-4 py-2.5 font-semibold text-accent-ink transition hover:brightness-110"
              >
                Track this decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  tag,
  children,
  accent = false,
}: {
  index: string;
  tag: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${accent ? "border-accent/35 bg-accent/[0.04]" : "border-white/10"}`}
    >
      <div className="mb-1.5 font-mono text-[10px] tracking-[0.12em] text-accent">{index}</div>
      <div className="mb-3 font-mono text-[11px] text-white/35">{tag}</div>
      {children}
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-5 w-px bg-accent/35" />;
}

function ActionCard({
  label,
  value,
  note,
  accent = false,
  small = false,
}: {
  label: string;
  value: string;
  note: string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div className="rounded-[10px] border border-white/[0.14] bg-[#0A0F0E]/35 p-4">
      <div className="mb-2 font-mono text-[10px] text-white/45">{label}</div>
      <div
        className={`font-display font-semibold ${small ? "text-lg" : "text-xl"} ${accent ? "text-accent" : ""}`}
      >
        {value}
      </div>
      <p className="mt-1.5 text-xs text-white/50">{note}</p>
    </div>
  );
}
