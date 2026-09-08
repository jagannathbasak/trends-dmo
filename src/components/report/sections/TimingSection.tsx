import { CLASS, CLOSING, DELAYS, GATES, MONITORS, OPENING, QUARTERS } from "@/lib/opportunityReport/data";

export default function TimingSection({
  delay,
  onSelectDelay,
}: {
  delay: number;
  onSelectDelay: (i: number) => void;
}) {
  const delayDetail = DELAYS[delay];

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5 sm:p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Window shape · Q4 2026 → Q2 2028 <span className="text-[#d9a441]">◈</span>
          </span>
          <span className="font-mono text-[9px] font-medium tracking-[0.1em] text-white/40">
            Peak opportunity Q1–Q2 2027
          </span>
        </div>
        <div className="mb-2 flex items-end gap-1">
          {QUARTERS.map(([label, h, bg, lc]) => (
            <div key={label} className="flex flex-1 flex-col justify-end text-center">
              <div className="mb-1.5 flex h-[100px] items-end">
                <div className="w-full rounded-[2px]" style={{ height: `${h * 0.9}px`, background: bg }} />
              </div>
              <div className="font-mono text-[9px] font-medium tracking-[0.06em]" style={{ color: lc }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3.5 flex gap-1 border-t border-white/10 pt-3.5">
          <div className="flex-[2] border-r border-white/10 pr-3.5">
            <div className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-accent">
              Forces opening the window
            </div>
            <div className="flex flex-col gap-1.5">
              {OPENING.map(([t, c]) => (
                <div key={t} className="font-display text-[12px] leading-relaxed text-white/80">
                  {t} <span className="text-[9px]" style={{ color: CLASS[c].color }}>{CLASS[c].glyph}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-[2] pl-3.5">
            <div className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-[#d9a441]">
              Forces closing it
            </div>
            <div className="flex flex-col gap-1.5">
              {CLOSING.map(([t, c]) => (
                <div key={t} className="font-display text-[12px] leading-relaxed text-white/80">
                  {t} <span className="text-[9px]" style={{ color: CLASS[c].color }}>{CLASS[c].glyph}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-4 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Cost of delay · click a quarter
          </div>
          <div className="flex flex-col gap-2">
            {DELAYS.map(([q, cap], i) => {
              const active = delay === i;
              const barC = cap >= 90 ? "#4fe3c1" : cap >= 70 ? "#2f8d6b" : "#8a6f38";
              const vc = cap >= 90 ? "#4fe3c1" : "#c3ccc7";
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => onSelectDelay(i)}
                  className={`flex w-full items-center gap-3 rounded-[3px] border px-2.5 py-2 text-left transition ${
                    active ? "border-accent/40 bg-[#101614]" : "border-white/10 bg-[#0b0f0e]"
                  }`}
                >
                  <span className="flex-none basis-15 font-mono text-[10px] font-medium tracking-[0.06em] text-white/55">
                    {q}
                  </span>
                  <span className="block h-2 flex-1 rounded-full bg-white/[0.07]">
                    <span className="block h-full rounded-full" style={{ width: `${cap}%`, background: barC }} />
                  </span>
                  <span className="flex-none basis-11 text-right font-mono text-[11.5px] font-semibold" style={{ color: vc }}>
                    {cap}%
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-3.5 border-t border-white/10 pt-3">
            <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-accent">
              {delayDetail[0]} entry
            </div>
            <div className="font-mono text-[12px] leading-relaxed text-white/55">{delayDetail[2]}</div>
          </div>
        </div>

        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Reverse plan · to be in market Q1 2027
          </div>
          <div className="mb-4 font-mono text-[10px] leading-relaxed text-white/35">
            Each gate carries its lead time. The latest start date is derived, not chosen.
          </div>
          <div className="flex flex-col">
            {GATES.map(([name, lead, by, c, status]) => (
              <div key={name} className="grid grid-cols-[1fr_auto] items-baseline gap-2.5 border-b border-white/[0.05] py-2.5">
                <div>
                  <div className="font-display text-[12.5px] text-white/85">{name}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-white/40">lead time {lead}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[11px] font-semibold" style={{ color: c }}>
                    {by}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-white/35">
                    {status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[4px] border border-white/10 bg-[#0c100f] p-4.5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Trigger monitors · what we watch to move the date
          </span>
          <span className="font-mono text-[9px] font-medium tracking-[0.1em] text-white/40">
            Checked daily · alerts on cross
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {MONITORS.map(([name, cur, w, thr, c]) => (
            <div key={name} className="rounded-[3px] border border-white/10 bg-[#0e1211] p-3.5">
              <div className="mb-2.5 min-h-8 font-display text-[11.5px] leading-tight text-white/85">{name}</div>
              <div className="relative mb-2 h-1.5 rounded-full bg-white/[0.07]">
                <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${w}%`, background: c }} />
                <div className="absolute -top-1 -bottom-1 w-0.5 bg-[#d9a441]" style={{ left: `${thr}%` }} />
              </div>
              <div className="flex justify-between font-mono text-[9.5px] font-medium tracking-[0.06em] text-white/40">
                <span style={{ color: c }}>{cur}</span>
                <span>thr {thr}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
