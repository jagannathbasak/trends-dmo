"use client";

import { useState } from "react";
import { SCENARIOS, ASSUME, TORNADO, CALIB, type ScenarioKey } from "@/lib/reportData";
import { Card, SectionLabel } from "@/components/dashboard/reportUi";

const SCENARIO_KEYS: ScenarioKey[] = ["base", "accel", "stall"];

function fanPoints(scenarioKey: ScenarioKey): { hist: string; mid: string; band: string } {
  const hist = [8, 11, 14, 19, 25, 32, 40, 46, 50];
  const spreadByScenario: Record<ScenarioKey, number> = { base: 4.5, accel: 6, stall: 3.5 };
  const endByScenario: Record<ScenarioKey, number> = { base: 90, accel: 105, stall: 68 };
  const spread = spreadByScenario[scenarioKey];
  const end = endByScenario[scenarioKey];
  const steps = 7;
  const start = 50;
  const mid: number[] = [];
  for (let i = 0; i < steps; i++) mid.push(start + ((end - start) * i) / (steps - 1));

  const W = 640;
  const H = 200;
  const pad = 12;
  const all = hist.length + mid.length - 1;
  const x = (i: number) => (W * i) / all;
  const y = (v: number) => H - pad - ((H - 2 * pad) * v) / 110;
  const off = hist.length - 1;

  const histPts = hist.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const midPts = mid.map((v, i) => `${x(off + i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const upper = mid.map((v, i) => `${x(off + i).toFixed(1)},${y(Math.min(110, v + spread * i)).toFixed(1)}`);
  const lower = mid
    .map((v, i) => `${x(off + i).toFixed(1)},${y(Math.max(0, v - spread * i * 1.2)).toFixed(1)}`)
    .reverse();
  const band = upper.concat(lower).join(" ");

  return { hist: histPts, mid: midPts, band };
}

export default function ForecastDeepPanel() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("base");
  const [assumptions, setAssumptions] = useState<Record<string, boolean>>({});

  const scenario = SCENARIOS[scenarioKey];
  const fan = fanPoints(scenarioKey);

  let prob = scenario.prob;
  let mkt = scenario.mkt;
  let win = scenario.win;
  ASSUME.forEach((a) => {
    if (assumptions[a.key]) {
      prob += a.dProb;
      mkt += a.dMkt;
      if (a.win) win = a.win;
    }
  });
  prob = Math.max(5, Math.min(97, prob));

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <SectionLabel>{scenario.n.toUpperCase()} SCENARIO · DEMAND INDEX TO 2029 ◈</SectionLabel>
          <span className="font-mono text-[10px] text-white/35">P10 / P50 / P90 shown</span>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {SCENARIO_KEYS.map((key) => {
            const s = SCENARIOS[key];
            const active = key === scenarioKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setScenarioKey(key)}
                className={`rounded-lg border px-3.5 py-2 text-left transition ${
                  active ? "border-accent/40 bg-accent/[0.06]" : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className={`font-mono text-[11px] font-medium ${active ? "text-accent" : "text-white/70"}`}>
                  {s.n} · {s.p}
                </div>
                <div className="mt-0.5 max-w-[220px] text-[11px] text-white/45">{s.note}</div>
              </button>
            );
          })}
        </div>
        <svg viewBox="0 0 640 200" preserveAspectRatio="none" className="block h-[170px] w-full sm:h-[200px]">
          <line x1="0" y1="55" x2="640" y2="55" stroke="rgba(255,255,255,.05)" />
          <line x1="0" y1="120" x2="640" y2="120" stroke="rgba(255,255,255,.05)" />
          <polygon points={fan.band} fill="rgba(79,227,193,.12)" />
          <polyline points={fan.hist} fill="none" stroke="rgba(230,237,235,.6)" strokeWidth="2.5" />
          <polyline points={fan.mid} fill="none" stroke="#4FE3C1" strokeWidth="2.5" strokeDasharray="7 5" />
        </svg>
        <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/35">
          <span>2024</span>
          <span className="text-accent">TODAY</span>
          <span>2029</span>
        </div>
      </Card>

      <Card>
        <div className="mb-1 flex items-baseline justify-between">
          <SectionLabel>LIVE RECALCULATION</SectionLabel>
        </div>
        <p className="mb-4 text-sm text-white/55">Switch an assumption and the forecast re-scores in front of you.</p>
        <div className="flex flex-col gap-1.5">
          {ASSUME.map((a) => {
            const on = !!assumptions[a.key];
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setAssumptions((prev) => ({ ...prev, [a.key]: !prev[a.key] }))}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition ${
                  on ? "border-accent/40 bg-accent/[0.06]" : "border-white/10 hover:border-white/25"
                }`}
              >
                <span className={`text-sm ${on ? "text-foreground" : "text-white/65"}`}>{a.label}</span>
                <span className={`flex-none font-mono text-xs ${a.dProb > 0 ? "text-accent" : "text-amber-300/85"}`}>
                  {a.dProb > 0 ? "+" : ""}
                  {a.dProb}pt
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3.5 border-t border-white/[0.07] pt-4">
          <div>
            <div className="font-mono text-[10px] text-white/40">PROBABILITY</div>
            <div
              className={`mt-1 font-display text-xl font-semibold ${
                prob >= 80 ? "text-accent" : prob >= 65 ? "text-foreground" : "text-amber-300/90"
              }`}
            >
              {prob}%
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-white/40">MARKET &apos;29</div>
            <div className="mt-1 font-display text-xl font-semibold">${mkt.toFixed(1)}B</div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-white/40">WINDOW</div>
            <div className="mt-1 font-display text-lg font-semibold">{win}</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionLabel>DRIVER SENSITIVITY · SWING IN 2029 DEMAND</SectionLabel>
        <div className="flex flex-col gap-3">
          {TORNADO.map((t) => (
            <div key={t.name} className="flex items-center gap-3">
              <span className="w-[200px] flex-none text-xs text-white/65 sm:w-[240px]">{t.name}</span>
              <div className="flex h-3 flex-1 overflow-hidden rounded-sm bg-white/[0.06]">
                <div className="flex h-3 flex-1 justify-end">
                  <div className="h-3 bg-amber-300/40" style={{ width: `${t.l}%` }} />
                </div>
                <div className="h-3 flex-1">
                  <div className="h-3 bg-accent/50" style={{ width: `${t.r}%` }} />
                </div>
              </div>
              <span className="w-10 flex-none text-right font-mono text-[11px] text-white/45">{t.swing}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-white/40">
          Left: downside if the driver moves against the thesis. Right: upside.
        </p>
      </Card>

      <Card>
        <SectionLabel>MODEL CARD</SectionLabel>
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <div className="mb-1 font-mono text-[10px] text-white/40">METHOD</div>
            <p className="leading-relaxed text-white/70">
              Gradient-boosted ensemble over 214 features, with hand-set priors for regulation and
              procurement lag. Signals weighted by source reliability.
            </p>
          </div>
          <div>
            <div className="mb-1 font-mono text-[10px] text-white/40">TRAINING &amp; BACKTEST</div>
            <p className="leading-relaxed text-white/70">
              Window 2019–2026. Held-out MAPE 11.4% at 12 months, 19.8% at 36 months. Recalibrated 28
              Aug 2026.
            </p>
          </div>
          <div>
            <div className="mb-1 font-mono text-[10px] text-white/40">KNOWN FAILURE MODES</div>
            <p className="leading-relaxed text-white/70">
              Underreacts to sudden bundling by large suite vendors. Overreacts to hiring-signal spikes
              in Q1. Thin verified data below 200 FTE in AT and CH.
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-white/[0.07] pt-4">
          <div className="mb-2 font-mono text-[10px] text-white/40">CALIBRATION · PREDICTED VS ACTUAL</div>
          <div className="flex flex-col gap-2.5">
            {CALIB.map((c) => (
              <div key={c.bucket} className="flex items-center gap-3 text-xs">
                <span className="w-16 flex-none font-mono text-white/45">{c.bucket}</span>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="h-1.5 rounded-full bg-white/[0.07]">
                    <div className="h-1.5 rounded-full bg-white/30" style={{ width: `${c.pred}%` }} />
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.07]">
                    <div className="h-1.5 rounded-full bg-accent/60" style={{ width: c.act }} />
                  </div>
                </div>
                <span className="w-24 flex-none text-right font-mono text-[10px] text-white/45">
                  pred {c.pred}% · act {c.act}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
