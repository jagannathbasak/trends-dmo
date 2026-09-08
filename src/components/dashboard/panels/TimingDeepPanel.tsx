"use client";

import { useState } from "react";
import { QUARTERS, OPENING, CLOSING, DELAYS, GATES, MONITORS } from "@/lib/reportData";
import { Card, ClsMark, SectionLabel } from "@/components/dashboard/reportUi";

const STATUS_COLOR: Record<string, string> = {
  "on track": "text-accent",
  "due next": "text-accent",
  "at risk": "text-amber-300/90",
  "not started": "text-white/40",
};

export default function TimingDeepPanel() {
  const [delayIndex, setDelayIndex] = useState(0);
  const delay = DELAYS[delayIndex];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <SectionLabel>WINDOW SHAPE · Q4 2026 → Q2 2028 ◈</SectionLabel>
          <span className="font-mono text-[10px] text-accent">Peak opportunity Q1–Q2 2027</span>
        </div>
        <div className="flex h-28 items-end gap-2.5">
          {QUARTERS.map((q) => (
            <div key={q.label} className="flex h-full flex-1 items-end">
              <div
                className={`w-full rounded-t-sm ${q.h >= 80 ? "bg-accent" : q.h >= 40 ? "bg-accent/45" : "bg-white/15"}`}
                style={{ height: `${q.h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2.5">
          {QUARTERS.map((q) => (
            <span key={q.label} className="flex-1 text-center font-mono text-[9px] text-white/40">
              {q.label}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Card>
          <SectionLabel>FORCES OPENING IT</SectionLabel>
          <div className="flex flex-col gap-2.5">
            {OPENING.map((o) => (
              <div key={o.t} className="flex items-start gap-2.5 text-sm text-white/75">
                <ClsMark cls={o.cls} />
                <span>{o.t}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>FORCES CLOSING IT</SectionLabel>
          <div className="flex flex-col gap-2.5">
            {CLOSING.map((o) => (
              <div key={o.t} className="flex items-start gap-2.5 text-sm text-white/75">
                <ClsMark cls={o.cls} />
                <span>{o.t}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionLabel>COST OF DELAY · CLICK A QUARTER</SectionLabel>
        <div className="flex flex-col gap-2">
          {DELAYS.map((d, i) => {
            const active = i === delayIndex;
            return (
              <button
                key={d.q}
                type="button"
                onClick={() => setDelayIndex(i)}
                className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left transition ${
                  active ? "border-accent/40 bg-accent/[0.06]" : "border-white/10 hover:border-white/25"
                }`}
              >
                <span className="w-16 flex-none font-mono text-xs text-white/60">{d.q}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className={`h-1.5 rounded-full ${d.cap >= 90 ? "bg-accent" : d.cap >= 70 ? "bg-accent/60" : "bg-amber-300/50"}`}
                    style={{ width: `${d.cap}%` }}
                  />
                </div>
                <span className="w-10 flex-none text-right font-mono text-xs text-white/60">{d.cap}%</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 p-3.5">
          <div className="mb-1 font-mono text-[11px] text-accent">{delay.q} ENTRY</div>
          <p className="text-sm leading-relaxed text-white/70">{delay.note}</p>
        </div>
      </Card>

      <Card>
        <SectionLabel>REVERSE PLAN · TO BE IN MARKET Q1 2027</SectionLabel>
        <p className="mb-3.5 text-xs text-white/45">
          Each gate carries its lead time. The latest start date is derived, not chosen.
        </p>
        <div className="flex flex-col gap-2.5">
          {GATES.map((g) => (
            <div
              key={g.name}
              className="flex flex-col gap-1 rounded-lg border border-white/10 p-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="text-sm font-medium">{g.name}</div>
                <div className="mt-0.5 font-mono text-[10px] text-white/40">
                  lead time {g.lead} · by {g.by}
                </div>
              </div>
              <span className={`flex-none font-mono text-[11px] ${STATUS_COLOR[g.status] ?? "text-white/50"}`}>
                {g.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-baseline justify-between">
          <SectionLabel>TRIGGER MONITORS · WHAT WE WATCH TO MOVE THE DATE</SectionLabel>
          <span className="font-mono text-[10px] text-white/35">checked daily · alerts on cross</span>
        </div>
        <div className="flex flex-col gap-3.5">
          {MONITORS.map((m) => (
            <div key={m.name}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="text-white/75">{m.name}</span>
                <span className="font-mono text-xs text-white/50">
                  {m.cur} · thr {m.thr}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.07]">
                <div
                  className={`h-1.5 rounded-full ${m.pct >= m.thr ? "bg-amber-300/70" : "bg-accent/55"}`}
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
