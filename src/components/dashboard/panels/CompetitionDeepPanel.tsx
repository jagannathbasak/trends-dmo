"use client";

import { useState } from "react";
import { DECOMP, ARCHETYPES, GRID, PLAYERS, MOVES } from "@/lib/reportData";
import { Card, ClsMark, SectionLabel } from "@/components/dashboard/reportUi";

function cellStyle(v: number) {
  if (v >= 60) return "bg-amber-300/[0.16] text-amber-200/90 hover:border-amber-300/40";
  if (v < 30) return "bg-accent/[0.12] text-accent hover:border-accent/40";
  return "bg-white/[0.05] text-white/70 hover:border-white/25";
}

const THREAT_COLOR: Record<string, string> = {
  high: "text-amber-300/90",
  medium: "text-white/60",
  low: "text-accent",
};

export default function CompetitionDeepPanel() {
  const [cell, setCell] = useState({ row: 0, col: 0 });
  const active = GRID[cell.row];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mb-3 flex items-baseline justify-between">
          <SectionLabel>INTENSITY INDEX · 8 QUARTERS ◈</SectionLabel>
          <span className="font-mono text-[10px] text-white/35">rising · steepest since Q2 2025</span>
        </div>
        <div className="font-display text-3xl font-semibold text-accent">+34%</div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-white/35">
          <span>Q4 2024</span>
          <span>Q3 2026</span>
        </div>
      </Card>

      <Card>
        <SectionLabel>WHAT THE +34% IS MADE OF</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {DECOMP.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <span className="w-[150px] flex-none text-xs text-white/65">{d.name}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-2 rounded-full bg-accent/55" style={{ width: `${(Number(d.v) / 11) * 100}%` }} />
              </div>
              <span className="w-6 flex-none text-right font-mono text-xs text-white/70">{d.v}</span>
              <span className="w-20 flex-none text-right font-mono text-[10px] text-white/35">{d.src}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <SectionLabel>CROWDING GRID · SEGMENT × ARCHETYPE</SectionLabel>
          <span className="font-mono text-[10px] text-white/35">click a cell · amber = crowded, mint = open lane</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-xs">
            <thead>
              <tr>
                <th className="w-32" />
                {ARCHETYPES.map((a) => (
                  <th key={a} className="pb-2 text-left font-mono text-[10px] font-normal text-white/40">
                    {a}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRID.map((row, ri) => (
                <tr key={row.seg}>
                  <td className="py-1 pr-3 text-white/70">{row.seg}</td>
                  {row.vals.map((v, ci) => {
                    const isActive = cell.row === ri && cell.col === ci;
                    return (
                      <td key={ci} className="py-1 pr-2">
                        <button
                          type="button"
                          onClick={() => setCell({ row: ri, col: ci })}
                          className={`flex h-9 w-full items-center justify-center rounded-md border font-mono text-[11px] transition ${cellStyle(
                            v,
                          )} ${isActive ? "border-white/40" : "border-transparent"}`}
                        >
                          {v}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-lg border border-white/10 p-3.5">
          <div className="font-mono text-[11px] text-white/60">
            {active.seg} × {ARCHETYPES[cell.col]} · crowding {active.vals[cell.col]}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-white/70">{active.notes[cell.col]}</p>
        </div>
        <div className="mt-4 border-t border-white/[0.07] pt-4">
          <div className="mb-1 font-mono text-[10px] text-accent">OPEN LANE</div>
          <p className="text-sm leading-relaxed text-white/65">
            AT industrial and DACH public-adjacent buyers show demand growth above segment average
            with the lowest crowding on the grid. Neither is covered by a vertical native today.
          </p>
        </div>
      </Card>

      <Card>
        <SectionLabel>ARCHETYPE BOARD</SectionLabel>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {PLAYERS.map((p) => (
            <div key={p.name} className="rounded-lg border border-white/10 p-4">
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span className="font-medium">{p.name}</span>
                <span className="flex-none font-mono text-[10px] text-white/40">{p.momentum}</span>
              </div>
              <p className="text-xs leading-relaxed text-white/55">{p.move}</p>
              <div className="mt-2.5 flex items-center justify-between font-mono text-[10px]">
                <span className="text-white/40">{p.count}</span>
                <span className={THREAT_COLOR[p.threat]}>
                  <ClsMark cls={p.cls} /> threat {p.threat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>MOVES FEED</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {MOVES.map((m) => (
            <div key={m.d + m.t} className="flex items-start gap-3 text-sm">
              <span className="w-14 flex-none font-mono text-[10px] text-white/35">{m.d}</span>
              <ClsMark cls={m.cls} />
              <span className="flex-1 text-white/75">{m.t}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
