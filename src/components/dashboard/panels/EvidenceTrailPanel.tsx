"use client";

import { useState } from "react";
import { CLAIMS, SOURCES, CONTRA } from "@/lib/reportData";
import { Card, ClsMark, ClsTag, SectionLabel } from "@/components/dashboard/reportUi";

export default function EvidenceTrailPanel() {
  const [claimIndex, setClaimIndex] = useState(0);
  const claim = CLAIMS[claimIndex];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <SectionLabel>PROVENANCE</SectionLabel>
        <p className="text-[15px] leading-relaxed">
          Pick a claim. The chain below shows every step from raw source to model input, with the
          class assigned at each hop and what breaks if a step is wrong.
        </p>
        <div className="mt-2.5 font-mono text-[11px] text-white/40">
          45 sources · 1.2M signals · chain of custody retained
        </div>
      </Card>

      <Card>
        <SectionLabel>CLAIMS IN THIS REPORT</SectionLabel>
        <div className="flex flex-col gap-1.5">
          {CLAIMS.map((c, i) => {
            const active = i === claimIndex;
            return (
              <button
                key={c.text}
                type="button"
                onClick={() => setClaimIndex(i)}
                className={`flex items-start justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition ${
                  active ? "border-accent/40 bg-accent/[0.06]" : "border-white/10 hover:border-white/25"
                }`}
              >
                <span className="flex items-start gap-2.5 text-sm">
                  <ClsMark cls={c.cls} />
                  <span className={active ? "text-foreground" : "text-white/70"}>{c.text}</span>
                </span>
                <span className="flex-none font-mono text-[10px] text-white/35">{c.conf}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <SectionLabel>PROVENANCE CHAIN</SectionLabel>
          <span className="font-mono text-[10px] text-white/35">{claim.chainMeta}</span>
        </div>
        <div className="flex flex-col gap-3">
          {claim.chain.map((s, i) => (
            <div key={s.stage} className="flex gap-3.5">
              <div className="flex flex-none flex-col items-center">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[10px] ${
                    i === claim.chain.length - 1
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-white/15 text-white/50"
                  }`}
                >
                  {i + 1}
                </span>
                {i < claim.chain.length - 1 ? <span className="mt-1 h-full w-px bg-white/10" /> : null}
              </div>
              <div className="pb-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-white/40">
                    {s.stage.toUpperCase()}
                  </span>
                  <span className="font-medium text-white/90">{s.label}</span>
                  <ClsTag cls={s.cls} />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{s.detail}</p>
                <span className="mt-1 block font-mono text-[10px] text-white/30">{s.ts}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-3.5 border-t border-white/[0.07] pt-4 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 font-mono text-[10px] text-white/40">METHOD</div>
            <code className="block rounded-md bg-white/[0.04] px-3 py-2 font-mono text-[11px] leading-relaxed text-white/70">
              {claim.formula}
            </code>
            <div className="mt-3 flex flex-col gap-1.5">
              {claim.inputs.map((inp) => (
                <div key={inp.k} className="flex items-center justify-between text-xs">
                  <span className="text-white/50">{inp.k}</span>
                  <span className="flex items-center gap-1.5 font-mono text-white/80">
                    {inp.v}
                    <ClsMark cls={inp.cls} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[10px] text-white/40">IF THIS IS WRONG</div>
            <p className="text-sm leading-relaxed text-white/65">{claim.fragility}</p>
            <div className="mt-3 font-mono text-[10px] text-white/40">
              Load-bearing weight in the verdict: <span className="text-accent">{claim.weight}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionLabel>SOURCE LEDGER · 45 SOURCES</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-left font-mono text-[10px] text-white/40">
                <th className="pb-2 pr-3 font-normal">TYPE</th>
                <th className="pb-2 pr-3 font-normal">N</th>
                <th className="pb-2 pr-3 font-normal">FRESHNESS</th>
                <th className="pb-2 font-normal">WEIGHT</th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.type} className="border-b border-white/[0.05] last:border-0">
                  <td className="py-2.5 pr-3">
                    <span className="mr-1.5">
                      <ClsMark cls={s.cls} />
                    </span>
                    {s.type}
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-white/70">{s.n}</td>
                  <td className="py-2.5 pr-3 font-mono text-[11px] text-white/45">{s.fresh}</td>
                  <td className="py-2.5 font-mono text-[11px] text-white/45">{s.w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionLabel>CONTRADICTION LOG · 3 UNRESOLVED BY SOURCE, RESOLVED BY WEIGHT</SectionLabel>
        <div className="flex flex-col gap-4">
          {CONTRA.map((c) => (
            <div key={c.field} className="rounded-lg border border-white/10 p-4">
              <div className="mb-2 text-sm font-medium">{c.field}</div>
              <div className="flex flex-col gap-1 text-xs text-white/55">
                <span>{c.a}</span>
                <span>{c.b}</span>
              </div>
              <div className="mt-2 text-xs text-accent">→ {c.res}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
