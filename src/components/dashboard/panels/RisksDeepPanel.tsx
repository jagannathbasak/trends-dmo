"use client";

import { useState } from "react";
import { RISKS, FALS } from "@/lib/reportData";
import { Card, SectionLabel } from "@/components/dashboard/reportUi";

const FALSIFIER_COLOR: Record<string, string> = {
  holding: "text-accent",
  watch: "text-amber-300/90",
  "not yet testable": "text-white/40",
};

const BASE_PROB = 87;
const BASE_CONF = 82;
const BASE_WIN = "Q1–Q2 2027";

export default function RisksDeepPanel() {
  const [fired, setFired] = useState<Record<string, boolean>>({});

  let prob = BASE_PROB;
  let conf = BASE_CONF;
  let win = BASE_WIN;
  let firedCount = 0;
  RISKS.forEach((r) => {
    if (fired[r.key]) {
      firedCount++;
      prob -= r.dProb;
      conf -= r.dConf;
      if (r.win) win = r.win;
    }
  });
  prob = Math.max(8, prob);

  const sentence = firedCount
    ? `Under ${firedCount} simulated trigger${firedCount > 1 ? "s" : ""}, entry moves to ${win} and opportunity probability falls to ${prob}%.`
    : `No risk triggered. Enter in Q1 2027 at ${BASE_PROB}% opportunity probability, confidence ${BASE_CONF}%.`;

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-accent/40 bg-accent/5">
        <div className="mb-3 flex items-center justify-between">
          <SectionLabel>VERDICT UNDER SIMULATION</SectionLabel>
          <button
            type="button"
            onClick={() => setFired({})}
            className="font-mono text-[10px] text-white/45 underline decoration-white/20 underline-offset-2 hover:text-white/75"
          >
            Reset
          </button>
        </div>
        <p className="text-[15px] leading-relaxed">{sentence}</p>
        <div className="mt-4 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <div>
            <div className="font-mono text-[10px] text-white/40">PROBABILITY</div>
            <div className={`mt-1 font-display text-lg font-semibold ${prob >= 80 ? "text-accent" : prob >= 65 ? "" : "text-amber-300/90"}`}>
              {prob}%
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-white/40">CONFIDENCE</div>
            <div className="mt-1 font-display text-lg font-semibold">{conf}%</div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-white/40">ENTRY WINDOW</div>
            <div className="mt-1 font-display text-lg font-semibold">{win}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-white/40">RISKS FIRED</div>
            <div className={`mt-1 font-display text-lg font-semibold ${firedCount ? "text-amber-300/90" : ""}`}>
              {firedCount} of {RISKS.length}
            </div>
          </div>
        </div>
      </Card>

      {RISKS.map((r) => {
        const on = !!fired[r.key];
        return (
          <Card key={r.key} className={on ? "border-amber-300/30 bg-amber-300/[0.04]" : undefined}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] tracking-[0.1em] text-white/45">{r.name.toUpperCase()} ◈</div>
                <div className="mt-1 font-display text-xl font-semibold">{r.p}</div>
              </div>
              <button
                type="button"
                onClick={() => setFired((prev) => ({ ...prev, [r.key]: !prev[r.key] }))}
                className={`flex-none rounded-md border px-3.5 py-2 text-xs font-medium transition ${
                  on
                    ? "border-amber-300/50 bg-amber-300/90 text-[#201603]"
                    : "border-white/15 text-white/75 hover:border-white/35"
                }`}
              >
                {on ? "Triggered · clear" : "Simulate trigger"}
              </button>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-[1fr_220px]">
              <div>
                <div className="mb-1 font-mono text-[10px] text-white/40">VERDICT IF TRIGGERED</div>
                <p className="text-sm leading-relaxed text-white/70">{r.effect}</p>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] text-white/40">EARLY WARNING · LEAD {r.lead}</div>
                <p className="text-xs leading-relaxed text-white/55">{r.warning}</p>
              </div>
            </div>
          </Card>
        );
      })}

      <Card>
        <SectionLabel>PRE-REGISTERED FALSIFIERS</SectionLabel>
        <p className="mb-3.5 text-xs text-white/45">Written before the forecast · not editable after publication</p>
        <div className="flex flex-col gap-3">
          {FALS.map((f) => (
            <div key={f.claim} className="flex flex-col gap-1 rounded-lg border border-white/10 p-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-medium text-white/85">{f.claim}</div>
                <div className="mt-0.5 font-mono text-[10px] text-white/40">
                  {f.test} · check {f.check}
                </div>
              </div>
              <span className={`flex-none font-mono text-[11px] ${FALSIFIER_COLOR[f.status] ?? "text-white/50"}`}>
                {f.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
