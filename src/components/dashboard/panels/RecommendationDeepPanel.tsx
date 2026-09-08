"use client";

import { useState } from "react";
import { useModal } from "@/components/ModalProvider";
import { PHASES, UPGRADES, STOPS } from "@/lib/reportData";
import { Card, SectionLabel } from "@/components/dashboard/reportUi";

export default function RecommendationDeepPanel() {
  const { open } = useModal();
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-[1.5px] border-accent bg-accent/[0.07] p-6 sm:p-7">
        <div className="mb-3.5 font-mono text-[10px] tracking-[0.12em] text-accent">RECOMMENDATION</div>
        <p className="mb-5 text-balance font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          Fund a DACH mid-market entry now, sized for a Q1 2027 launch, starting with AT industrial
          and DE manufacturing where crowding is lowest.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[11px] text-white/55">
          <span>Decision owner · Head of new markets</span>
          <span>Decide by 15 Oct 2026</span>
          <span>Committed spend to first gate · €340k</span>
        </div>
      </Card>

      <Card>
        <SectionLabel>PHASED PLAN</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {PHASES.map((p, i) => {
            const isOpen = openPhase === i;
            return (
              <div key={p.n} className="overflow-hidden rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenPhase(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-accent">{p.n}</span>
                    <span className="font-medium">{p.name}</span>
                    <span className="font-mono text-[11px] text-white/40">{p.when}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/60">{p.cost}</span>
                    <span className="font-mono text-[10px] text-white/40">{isOpen ? "CLOSE" : "OPEN"}</span>
                  </div>
                </button>
                {isOpen ? (
                  <div className="flex flex-col gap-3 border-t border-white/[0.07] p-4 pt-3.5 text-sm">
                    <div>
                      <div className="mb-1 font-mono text-[10px] text-white/40">WORK</div>
                      <p className="leading-relaxed text-white/70">{p.work}</p>
                    </div>
                    <div>
                      <div className="mb-1 font-mono text-[10px] text-accent">GATE TO CONTINUE</div>
                      <p className="leading-relaxed text-white/70">{p.gate}</p>
                    </div>
                    <div>
                      <div className="mb-1 font-mono text-[10px] text-amber-300/80">KILL CRITERIA</div>
                      <p className="leading-relaxed text-white/70">{p.kill}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionLabel>HOW TO RAISE CONFIDENCE FROM 82%</SectionLabel>
        <p className="mb-3.5 text-xs text-white/45">
          Each purchase converts modelled fields into verified ones and tightens the band.
        </p>
        <div className="flex flex-col gap-2.5">
          {UPGRADES.map((u) => (
            <div
              key={u.name}
              className="flex flex-col gap-1 rounded-lg border border-white/10 p-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm text-white/80">{u.name}</span>
              <div className="flex flex-none gap-4 font-mono text-[11px]">
                <span className="text-white/50">{u.cost}</span>
                <span className="text-accent">{u.gain}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>STOP RULES</SectionLabel>
        <div className="flex flex-col gap-2.5">
          {STOPS.map((s) => (
            <div key={s} className="flex items-start gap-2.5 text-sm text-white/75">
              <span className="mt-0.5 text-amber-300/80">◆</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p className="mt-3.5 text-[11.5px] leading-relaxed text-white/40">
          This report is re-scored daily. A decision recorded here is tracked against the outcome.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => open("Record decision")}
            className="rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-accent-ink transition hover:brightness-110"
          >
            Record decision
          </button>
        </div>
      </Card>
    </div>
  );
}
