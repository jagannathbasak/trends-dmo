"use client";

import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { useModal } from "@/components/ModalProvider";

export default function DecisionCenter() {
  const { open } = useModal();

  return (
    <section id="decisions" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <Reveal>
            <Eyebrow>DECISION CENTER</Eyebrow>
            <h2 className="mt-3.5 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px] lg:text-[38px]">
              One market, four questions, one call.
            </h2>
          </Reveal>
          <Reveal delay={80} className="font-mono text-[11px] text-white/40">
            AI WORKFLOW PLATFORMS · HORIZON 12MO ▾
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          <Reveal delay={100}>
            <Step
              index="01 · WHAT IS HAPPENING"
              tag="OBSERVED"
              chart={<Sparkline points="0,52 55,46 110,36 165,26 220,14" />}
            >
              <p className="text-[15px] leading-relaxed">
                Demand is up 41% over 18 months, and hiring for automation roles in DACH has
                tripled since March.
              </p>
              <div className="mt-2 font-mono text-[11px] text-white/40">
                <span className="text-accent">●</span> 12 VERIFIED SOURCES · ◦ 1.2M SIGNALS
              </div>
            </Step>
          </Reveal>

          <Connector />

          <Reveal delay={140}>
            <Step
              index="02 · WHY IT IS HAPPENING"
              tag="CAUSAL WEIGHTS"
              chart={
                <div className="flex flex-col gap-1.5">
                  <Bar pct={84} />
                  <Bar pct={58} dim />
                  <Bar pct={37} dim />
                </div>
              }
            >
              <p className="text-[15px] leading-relaxed">
                Agent tooling crossed production reliability, and budgets are being reallocated
                out of legacy RPA contracts.
              </p>
              <div className="mt-2 font-mono text-[11px] text-white/40">
                3 RANKED CATALYSTS · EACH CITED
              </div>
            </Step>
          </Reveal>

          <Connector />

          <Reveal delay={180}>
            <Step
              index="03 · WHAT IS LIKELY NEXT ◈"
              tag="CONFIDENCE 82%"
              accent
              chart={
                <svg viewBox="0 0 220 60" className="h-[60px] w-full">
                  <polygon
                    points="0,44 55,34 110,24 165,14 220,8 220,30 165,36 110,44 55,52"
                    fill="rgba(79,227,193,.14)"
                  />
                  <polyline
                    points="0,48 55,40 110,30 165,20 220,12"
                    fill="none"
                    stroke="#4FE3C1"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                  />
                </svg>
              }
            >
              <p className="text-[15px] leading-relaxed">
                Demand reaches <b className="font-semibold text-accent">+68% by Q3 2027</b> with
                competition up 34%. Momentum weakens after Q3, which is what closes the window.
              </p>
              <div className="mt-2 font-mono text-[11px] text-white/40">
                BAND +52% → +79% · MODELLED, NOT GUARANTEED
              </div>
            </Step>
          </Reveal>

          <Connector />

          <Reveal delay={220} className="rounded-xl border-[1.5px] border-accent bg-accent/[0.07] p-6 sm:p-7">
            <div className="mb-3.5 font-mono text-[10px] tracking-[0.12em] text-accent">
              04 · WHAT YOU SHOULD DO ABOUT IT
            </div>
            <p className="mb-5 text-balance font-display text-xl font-semibold leading-snug tracking-tight sm:text-[27px]">
              Commit budget in Q4 2026, launch in Q1 2027, and target DE and NL mid-market before
              the Nordics.
            </p>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              <ActionCard label="IF YOU ACT NOW ◈" value="87%" note="probability of success" accent />
              <ActionCard
                label="IF YOU WAIT TWO QUARTERS ◈"
                value="54%"
                note="competition absorbs the lead"
              />
              <ActionCard label="WATCH FOR ◦" value="Incumbent bundling" note="alerts on trigger" small />
            </div>
            <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-[11.5px] leading-relaxed text-white/45">
                This recommendation is derived from modelled predictions. Every input carries
                its evidence tier and confidence, and the call is re-scored as new signals land.
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  tag,
  chart,
  children,
  accent = false,
}: {
  index: string;
  tag: string;
  chart: React.ReactNode;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-4 rounded-xl border p-5 sm:grid-cols-[190px_1fr_180px] sm:gap-6 ${
        accent ? "border-accent/35 bg-accent/[0.04]" : "border-white/10"
      }`}
    >
      <div>
        <div className="mb-1.5 font-mono text-[10px] tracking-[0.12em] text-accent">{index}</div>
        <div className="font-mono text-[11px] text-white/35">{tag}</div>
      </div>
      <div>{children}</div>
      <div className="hidden sm:block">{chart}</div>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-5 w-px bg-accent/35" />;
}

function Sparkline({ points }: { points: string }) {
  return (
    <svg viewBox="0 0 220 60" className="h-[60px] w-full">
      <polyline points={points} fill="none" stroke="rgba(230,237,235,.6)" strokeWidth="2" />
    </svg>
  );
}

function Bar({ pct, dim = false }: { pct: number; dim?: boolean }) {
  return (
    <div className="h-2 rounded-sm bg-white/10">
      <div
        className={`h-2 rounded-sm ${dim ? "bg-white/40" : "bg-accent/60"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
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
        className={`font-display font-semibold ${small ? "text-lg" : "text-xl"} ${
          accent ? "text-accent" : ""
        }`}
      >
        {value}
      </div>
      <p className="mt-1.5 text-xs text-white/50">{note}</p>
    </div>
  );
}
