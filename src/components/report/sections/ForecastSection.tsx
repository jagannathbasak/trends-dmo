import { ASSUME, CALIB, SCEN, TORNADO } from "@/lib/opportunityReport/data";
import { buildForecastFan } from "@/lib/opportunityReport/charts";
import type { ScenarioKey } from "@/lib/opportunityReport/types";

export default function ForecastSection({
  scenario,
  onSelectScenario,
  assume,
  onToggleAssume,
}: {
  scenario: ScenarioKey;
  onSelectScenario: (k: ScenarioKey) => void;
  assume: Record<string, boolean>;
  onToggleAssume: (k: string) => void;
}) {
  const scen = SCEN[scenario];
  const fan = buildForecastFan(scenario);

  let prob = scen.prob;
  let mkt = scen.mkt;
  let win = scen.win;
  ASSUME.forEach((a) => {
    if (assume[a.k]) {
      prob += a.dProb;
      mkt += a.dMkt;
      if (a.win) win = a.win;
    }
  });
  prob = Math.max(5, Math.min(97, prob));
  const probColor = prob >= 80 ? "#4fe3c1" : prob >= 65 ? "#eef3f0" : "#d9a441";

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SCEN) as ScenarioKey[]).map((k) => {
          const s = SCEN[k];
          const active = scenario === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => onSelectScenario(k)}
              className={`flex-1 basis-[190px] rounded-[4px] border px-3.5 py-3 text-left transition ${
                active ? "border-accent/40 bg-accent/[0.05]" : "border-white/10 bg-[#0e1211]"
              }`}
            >
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className={`font-display text-[12.5px] font-semibold ${active ? "text-accent" : "text-white/80"}`}>
                  {s.n}
                </span>
                <span className={`font-mono text-[12px] font-semibold ${active ? "text-accent" : "text-white/55"}`}>
                  {s.p}
                </span>
              </div>
              <div className="font-mono text-[10px] leading-relaxed text-white/45">{s.note}</div>
            </button>
          );
        })}
      </div>

      <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            {scen.n} scenario · demand index to 2029 <span className="text-[#d9a441]">◈</span>
          </span>
          <span className="font-mono text-[9px] font-medium tracking-[0.12em] text-white/35">
            P10 / P50 / P90 shown
          </span>
        </div>
        <svg viewBox="0 0 640 210" preserveAspectRatio="none" className="block h-[210px] w-full">
          <path d={fan.outer} fill="#0f3830" opacity={0.5} />
          <path d={fan.inner} fill="#155c48" opacity={0.55} />
          <path d={fan.hist} fill="none" stroke="#d3dbd7" strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
          <path d={fan.p50} fill="none" stroke="#4fe3c1" strokeWidth={1.8} strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
          <line x1={fan.tx} y1="8" x2={fan.tx} y2="196" stroke="#3b453f" strokeWidth={1} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="mt-1.5 flex justify-between font-mono text-[9px] font-medium tracking-[0.12em] text-white/40">
          <span>2024</span>
          <span className="text-accent">TODAY</span>
          <span>2029</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-[4px] border border-accent/25 bg-accent/[0.04] p-4.5">
          <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-accent">
            Live recalculation
          </div>
          <div className="mb-4 font-mono text-[10px] leading-relaxed text-white/45">
            Switch an assumption and the forecast re-scores in front of you.
          </div>
          <div className="mb-4.5 flex flex-col gap-2">
            {ASSUME.map((a) => {
              const on = !!assume[a.k];
              return (
                <button
                  key={a.k}
                  type="button"
                  onClick={() => onToggleAssume(a.k)}
                  className={`flex w-full items-center gap-2.5 rounded-[3px] border px-3 py-2.5 text-left transition ${
                    on ? "border-accent/40 bg-[#101a17]" : "border-white/10 bg-[#0b0f0e]"
                  }`}
                >
                  <span
                    className="relative inline-block h-3.5 w-6.5 flex-none rounded-full transition-colors"
                    style={{ background: on ? "#2c6a58" : "#1f2724" }}
                  >
                    <span
                      className="absolute top-0.5 h-2.5 w-2.5 rounded-full transition-all"
                      style={{ left: on ? "14px" : "2px", background: on ? "#4fe3c1" : "#6d7a75" }}
                    />
                  </span>
                  <span className={`flex-1 font-display text-[12px] leading-snug ${on ? "text-foreground" : "text-white/60"}`}>
                    {a.label}
                  </span>
                  <span className="font-mono text-[10px] font-medium" style={{ color: a.dProb > 0 ? "#4fe3c1" : "#d9a441" }}>
                    {a.dProb > 0 ? "+" : ""}
                    {a.dProb}pt
                  </span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
                Probability
              </div>
              <div className="font-display text-[22px] font-bold" style={{ color: probColor }}>
                {prob}%
              </div>
            </div>
            <div>
              <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
                Market &apos;29
              </div>
              <div className="font-display text-[22px] font-bold text-foreground">${mkt.toFixed(1)}B</div>
            </div>
            <div>
              <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
                Window
              </div>
              <div className="pt-1 font-display text-[14px] font-semibold leading-tight text-foreground">{win}</div>
            </div>
          </div>
        </div>

        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-4 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Driver sensitivity · swing in 2029 demand
          </div>
          <div className="flex flex-col gap-2.5">
            {TORNADO.map(([name, swing, l, r]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between font-mono text-[11px] text-white/55">
                  <span>{name}</span>
                  <span className="text-white/35">±{swing}</span>
                </div>
                <div className="flex h-2 items-stretch">
                  <div className="flex flex-1 justify-end">
                    <div style={{ width: `${l}%`, background: "#8a6f38" }} />
                  </div>
                  <div className="w-px bg-white/15" />
                  <div className="flex-1">
                    <div style={{ width: `${r}%`, background: "#2f8d6b" }} className="h-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3.5 font-mono text-[9.5px] leading-relaxed text-white/40">
            Left: downside if the driver moves against the thesis. Right: upside.
          </div>
        </div>
      </div>

      <div className="rounded-[4px] border border-white/10 bg-[#0c100f] p-5">
        <div className="mb-4 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
          Model card
        </div>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
              Method
            </div>
            <div className="font-mono text-[12px] leading-relaxed text-white/60">
              Gradient-boosted ensemble over 214 features, with hand-set priors for regulation and
              procurement lag. Signals weighted by source reliability.
            </div>
          </div>
          <div>
            <div className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
              Training &amp; backtest
            </div>
            <div className="font-mono text-[12px] leading-relaxed text-white/60">
              Window 2019–2026. Held-out MAPE 11.4% at 12 months, 19.8% at 36 months. Recalibrated
              28 Aug 2026.
            </div>
          </div>
          <div>
            <div className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
              Calibration · predicted vs actual
            </div>
            <div className="flex flex-col gap-1.5">
              {CALIB.map(([bucket, act, w, pred]) => (
                <div key={bucket} className="flex items-center gap-2 font-mono text-[10px] text-white/50">
                  <span className="flex-none basis-11">{bucket}</span>
                  <span className="relative block h-1.5 flex-1 rounded-full bg-white/[0.07]">
                    <span
                      className="absolute inset-y-0 left-0 block rounded-full bg-[#2f8d6b]"
                      style={{ width: `${w}%` }}
                    />
                    <span
                      className="absolute -top-0.5 -bottom-0.5 block w-0.5 bg-white/70"
                      style={{ left: `${pred}%` }}
                    />
                  </span>
                  <span className="flex-none basis-8 text-right">{act}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#a4863f]">
              Known failure modes
            </div>
            <div className="font-mono text-[12px] leading-relaxed text-[#82755a]">
              Underreacts to sudden bundling by large suite vendors. Overreacts to hiring-signal
              spikes in Q1. Thin verified data below 200 FTE in AT and CH.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
