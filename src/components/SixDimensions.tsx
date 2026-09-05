"use client";

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { SCENARIOS, dimensionsByScenario, type Scenario } from "@/lib/dimensionsData";

export default function SixDimensions() {
  const [scenario, setScenario] = useState<Scenario>("BASE");
  const d = dimensionsByScenario[scenario];

  return (
    <section className="border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-7">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-xl">
            <Eyebrow>WHAT NVILE PREDICTS</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]">
              Six forecasts, each with its own confidence and invalidation risk.
            </h2>
          </Reveal>

          <Reveal delay={100} className="flex flex-wrap gap-2 font-mono text-xs font-medium">
            {SCENARIOS.map((s) => {
              const active = s.key === scenario;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setScenario(s.key)}
                  className={`rounded-[7px] border px-4 py-2.5 transition ${
                    active
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-white/10 text-white/55 hover:border-white/25"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <Card>
              <CardHead label="PREDICTED DEMAND ◈" tag={`CONF ${d.demandConfidence}%`} />
              <div className="font-display text-[26px] font-semibold text-accent sm:text-[30px]">
                {d.demand}
              </div>
              <MiniChart />
              <p className="text-xs leading-relaxed text-white/45">{d.demandNote}</p>
            </Card>
          </Reveal>

          <Reveal delay={60}>
            <Card>
              <CardHead label="PREDICTED MARKET SIZE ◈" tag={`CONF 74%`} />
              <div className="font-display text-[26px] font-semibold sm:text-[30px]">
                {d.marketSize}
              </div>
              <div className="flex flex-col gap-2 font-mono text-[11px] text-white/50">
                <BarRow year="2026 ◇" value={d.marketSize2026} pct={d.marketBar2026} />
                <BarRow year="2027 ◈" value={d.marketSize2027} pct={d.marketBar2027} tint />
                <BarRow year="2029 ◈" value={d.marketSize2029} pct={d.marketBar2029} tint strong />
              </div>
              <p className="text-xs leading-relaxed text-white/45">
                Derived from an ◇ estimated 2026 base, method shown.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={120}>
            <Card>
              <CardHead label="PREDICTED COMPETITION ◈" tag="CONF 79%" />
              <div className="font-display text-[26px] font-semibold sm:text-[30px]">
                {d.competition}
              </div>
              <div className="flex h-[70px] items-end gap-1.5">
                {[34, 41, 48, 62, 79, 100].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm ${
                      i < 3
                        ? "bg-white/[0.28]"
                        : "border border-dashed border-accent/70 border-b-0"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-xs leading-relaxed text-white/45">{d.competitionNote}</p>
            </Card>
          </Reveal>

          <Reveal delay={0}>
            <Card>
              <div className="font-mono text-[10px] text-white/45">PREDICTED CONSUMER NEED ◈</div>
              <div className="font-display text-lg font-semibold leading-snug sm:text-xl">
                Shift toward embedded agents
              </div>
              <div className="flex flex-col gap-2 text-xs text-white/55">
                <NeedRow label="1 · Agent-native workflows" score="0.81" accent />
                <NeedRow label="2 · Audit and provenance" score="0.64" />
                <NeedRow label="3 · Seat-free pricing" score="0.41" />
              </div>
              <p className="mt-auto text-xs leading-relaxed text-white/45">
                Ranked from ◦ 41k observed signals.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={60}>
            <Card>
              <div className="font-mono text-[10px] text-white/45">
                PREDICTED GEOGRAPHIC OPPORTUNITY ◈
              </div>
              <div className="flex h-24 items-center justify-center rounded-lg border border-white/[0.09] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.05)_0_5px,transparent_5px_11px)] font-mono text-[10px] text-white/35">
                CHOROPLETH — REGIONAL FORECAST
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] text-white/55">
                {d.geo.map((g, i) => (
                  <span
                    key={g.region}
                    className={`rounded-full border px-2.5 py-1 ${
                      i === 0 ? "border-accent/35 text-accent" : "border-white/10"
                    }`}
                  >
                    {g.region} {g.value}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={120}>
            <Card highlight>
              <div className="font-mono text-[10px] text-white/45">
                PREDICTED TREND MOMENTUM ◈
              </div>
              <div className="font-display text-[26px] font-semibold text-accent sm:text-[30px]">
                {d.momentum}
              </div>
              <svg viewBox="0 0 300 60" className="block h-[60px] w-full">
                <polyline
                  points="0,52 60,44 120,32 180,18 240,12 300,22"
                  fill="none"
                  stroke="#4FE3C1"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                <circle cx="240" cy="12" r="4" fill="#4FE3C1" />
              </svg>
              <p className="text-xs leading-relaxed text-white/50">{d.momentumNote}</p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col gap-3.5 rounded-xl border p-5 ${
        highlight ? "border-accent/30 bg-accent/5" : "border-white/10"
      }`}
    >
      {children}
    </div>
  );
}

function CardHead({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="font-mono text-[10px] text-white/45">{label}</span>
      <span className="font-mono text-[10px] text-white/35">{tag}</span>
    </div>
  );
}

function MiniChart() {
  return (
    <svg viewBox="0 0 300 70" className="block h-[70px] w-full">
      <polygon
        points="150,42 200,30 250,18 300,6 300,30 250,42 200,52"
        fill="rgba(79,227,193,.13)"
      />
      <polyline points="0,60 50,56 100,50 150,42" fill="none" stroke="rgba(230,237,235,.6)" strokeWidth="2" />
      <polyline
        points="150,42 200,36 250,26 300,16"
        fill="none"
        stroke="#4FE3C1"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
    </svg>
  );
}

function BarRow({
  year,
  value,
  pct,
  tint = false,
  strong = false,
}: {
  year: string;
  value: string;
  pct: number;
  tint?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-14">{year}</span>
      <span className="h-2 flex-1 rounded-full bg-white/[0.13]">
        <span
          className={`block h-2 rounded-full transition-all duration-500 ${
            strong ? "bg-accent" : tint ? "bg-accent/60" : "bg-white/45"
          }`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="w-12 text-right text-foreground">{value}</span>
    </div>
  );
}

function NeedRow({ label, score, accent = false }: { label: string; score: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <b className={`font-semibold ${accent ? "text-accent" : ""}`}>{score}</b>
    </div>
  );
}
