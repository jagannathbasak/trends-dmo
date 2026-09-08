import { PHASES, STOPS, UPGRADES } from "@/lib/opportunityReport/data";

export default function RecommendationSection({
  phase,
  onSelectPhase,
  onPrint,
}: {
  phase: number;
  onSelectPhase: (i: number) => void;
  onPrint: () => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-[4px] border border-accent/25 bg-accent/[0.04] p-5.5 sm:p-6">
        <div className="mb-3.5 flex items-center gap-1.5">
          <span className="font-mono text-[9.5px] font-semibold tracking-[0.18em] text-accent">
            RECOMMENDATION
          </span>
          <span className="text-[10px] text-[#d9a441]">◈</span>
        </div>
        <p className="mb-4.5 max-w-[60ch] text-balance font-display text-[22px] font-semibold leading-[1.4] text-foreground">
          Fund a DACH mid-market entry now, sized for a Q1 2027 launch, starting with AT industrial
          and DE manufacturing where crowding is lowest.
        </p>
        <div className="flex flex-wrap gap-5 font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-white/45">
          <span>Decision owner · Head of new markets</span>
          <span>Decide by 15 Oct 2026</span>
          <span>Committed spend to first gate · €340k</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {PHASES.map(([n, name, when, cost, work, gate, kill], i) => {
          const open = phase === i;
          return (
            <div
              key={n}
              className={`overflow-hidden rounded-[4px] border bg-[#0e1211] ${open ? "border-white/20" : "border-white/10"}`}
            >
              <button
                type="button"
                onClick={() => onSelectPhase(open ? -1 : i)}
                className="grid w-full grid-cols-[34px_minmax(0,1fr)_auto] items-baseline gap-3.5 px-4.5 py-3.5 text-left"
              >
                <span className="font-mono text-[11px] font-semibold text-accent">{n}</span>
                <span>
                  <span className="block font-display text-[15px] font-semibold text-foreground">{name}</span>
                  <span className="mt-1 block font-mono text-[9.5px] font-medium uppercase tracking-[0.1em] text-white/40">
                    {when} · {cost}
                  </span>
                </span>
                <span className="font-mono text-[10px] font-medium text-white/40">{open ? "CLOSE" : "OPEN"}</span>
              </button>
              {open && (
                <div className="grid grid-cols-1 gap-4 px-4.5 pb-4.5 sm:grid-cols-3">
                  <div>
                    <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
                      Work
                    </div>
                    <div className="font-mono text-[12px] leading-relaxed text-white/60">{work}</div>
                  </div>
                  <div>
                    <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-accent">
                      Gate to continue
                    </div>
                    <div className="font-mono text-[12px] leading-relaxed text-white/60">{gate}</div>
                  </div>
                  <div>
                    <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#d9a441]">
                      Kill criteria
                    </div>
                    <div className="font-mono text-[12px] leading-relaxed text-[#82755a]">{kill}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            How to raise confidence from 82%
          </div>
          <div className="mb-4 font-mono text-[10px] leading-relaxed text-white/35">
            Each purchase converts modelled fields into verified ones and tightens the band.
          </div>
          <div className="flex flex-col">
            {UPGRADES.map(([name, cost, gain]) => (
              <div
                key={name}
                className="grid grid-cols-[minmax(0,1fr)_70px_70px] items-baseline gap-2.5 border-b border-white/[0.05] py-2.5"
              >
                <span className="font-display text-[12.5px] leading-snug text-white/85">{name}</span>
                <span className="text-right font-mono text-[11px] text-white/50">{cost}</span>
                <span className="text-right font-mono text-[11px] font-semibold text-accent">{gain}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[4px] border border-white/10 bg-[#0c100f] p-4.5">
          <div className="mb-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Stop rules
          </div>
          <div className="mb-4.5 flex flex-col gap-2.5">
            {STOPS.map((s) => (
              <div key={s} className="flex gap-2.5">
                <span className="text-[9px] text-[#d9a441]">◈</span>
                <span className="font-display text-[12.5px] leading-relaxed text-white/80">{s}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="max-w-[34ch] font-mono text-[10px] leading-relaxed text-white/35">
              This report is re-scored daily. A decision recorded here is tracked against the
              outcome.
            </span>
            <button
              type="button"
              onClick={onPrint}
              className="rounded-[3px] border border-accent bg-accent px-3.5 py-2 font-mono text-[10.5px] font-semibold tracking-[0.08em] text-accent-ink transition hover:brightness-110"
            >
              Record decision
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
