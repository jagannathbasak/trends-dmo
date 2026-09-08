import { CLASS, CHANGES, FACTS, GAPS, READY, SEGMENTS } from "@/lib/opportunityReport/data";

export default function CurrentStateSection() {
  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5 sm:p-5">
        <div className="mb-3 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
          Standing assessment
        </div>
        <p className="max-w-[78ch] text-balance font-display text-[17px] font-medium leading-relaxed text-white/90">
          The segment is real and moving, but thinly documented. 18.2% of DACH mid-market firms
          are running at least one AI workflow pilot; only a third of the segment produces filings
          we can verify. Budgets are small and repeatable, procurement is slow, and no vendor
          holds the category.
        </p>
      </div>

      <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#0e1211]">
        <div className="flex items-center justify-between border-b border-white/10 px-4.5 py-3">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Fact ledger · 9 of 214 tracked fields
          </span>
          <span className="font-mono text-[9px] font-medium tracking-[0.12em] text-white/35">
            Δ = change since last scoring
          </span>
        </div>
        <div className="grid grid-cols-[minmax(0,2.4fr)_minmax(0,0.9fr)_minmax(0,1fr)_50px_minmax(0,0.8fr)] gap-0 border-b border-white/[0.06] px-4.5 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.13em] text-white/35">
          <span>Field</span>
          <span>Value</span>
          <span>Class</span>
          <span>Src</span>
          <span className="text-right">Δ 30d</span>
        </div>
        {FACTS.map(([name, v, c, src, d, dc]) => (
          <div
            key={name}
            className="grid grid-cols-[minmax(0,2.4fr)_minmax(0,0.9fr)_minmax(0,1fr)_50px_minmax(0,0.8fr)] items-center gap-0 border-b border-white/[0.05] px-4.5 py-2.5"
          >
            <span className="font-display text-[13px] text-white/85">{name}</span>
            <span className="font-mono text-[13px] font-semibold text-foreground">{v}</span>
            <span className="font-mono text-[9px] font-medium tracking-[0.11em]" style={{ color: CLASS[c].color }}>
              {CLASS[c].glyph} {CLASS[c].name}
            </span>
            <span className="font-mono text-[11px] text-white/50">{src}</span>
            <span className="text-right font-mono text-[11px] font-medium" style={{ color: dc }}>
              {d}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-4 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Segment map <span className="text-white/50">◇</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {SEGMENTS.map(([name, size, w, bar, adopt, crowd, crowdC]) => (
              <div key={name}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="font-display text-[12.5px] text-white/85">{name}</span>
                  <span className="font-mono text-[11.5px] font-semibold text-foreground">{size}</span>
                </div>
                <div className="mb-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full" style={{ width: w, background: bar }} />
                </div>
                <div className="flex justify-between font-mono text-[9.5px] tracking-[0.08em] text-white/40">
                  <span>adoption {adopt}</span>
                  <span style={{ color: crowdC }}>crowding {crowd}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-4 flex justify-between">
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
              Buyer readiness index
            </span>
            <span className="font-mono text-[9px] font-medium tracking-[0.12em] text-white/35">
              0–100 · band shown
            </span>
          </div>
          <div className="flex flex-col gap-3.5">
            {READY.map(([name, v, lo, hi, note]) => {
              const c = name === "Compliance load" ? "#d9a441" : "#4fe3c1";
              return (
                <div key={name}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="font-display text-[12.5px] text-white/85">{name}</span>
                    <span className="font-mono text-[11.5px] font-semibold" style={{ color: c }}>
                      {v}
                    </span>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-white/[0.06]">
                    <div
                      className="absolute inset-y-0 rounded-full bg-white/10"
                      style={{ left: `${lo}%`, width: `${hi - lo}%` }}
                    />
                    <div
                      className="absolute -top-0.5 -bottom-0.5 w-0.5"
                      style={{ left: `${v}%`, background: c }}
                    />
                  </div>
                  <div className="mt-1.5 font-mono text-[9.5px] tracking-[0.06em] text-white/35">{note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            What changed · last 30 days
          </div>
          <div className="flex flex-col">
            {CHANGES.map(([d, t, c, i, ic]) => (
              <div key={d + t} className="flex gap-3 border-b border-white/[0.05] py-2.5">
                <span className="flex-none basis-11 pt-0.5 font-mono text-[9.5px] tracking-[0.06em] text-white/40">
                  {d}
                </span>
                <span className="flex-1 font-display text-[12.5px] leading-relaxed text-white/80">
                  {t} <span className="text-[9px]" style={{ color: CLASS[c].color }}>{CLASS[c].glyph}</span>
                </span>
                <span className="flex-none pt-0.5 font-mono text-[10.5px] font-semibold" style={{ color: ic }}>
                  {i}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[4px] border border-[#3a3120] bg-[#14110a] p-4.5">
          <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#a4863f]">
            Coverage &amp; known gaps
          </div>
          <div className="mb-1 font-display text-[30px] font-bold text-[#d9a441]">34%</div>
          <div className="mb-4 font-mono text-[10.5px] tracking-[0.06em] text-[#8a7c5e]">
            of the segment is covered by verified filings
          </div>
          <div className="flex flex-col gap-3">
            {GAPS.map(([name, why]) => (
              <div key={name} className="flex gap-2.5">
                <span className="text-[9px] text-[#6b5a30]">◇</span>
                <div>
                  <div className="font-display text-[12.5px] text-[#e0d9c8]">{name}</div>
                  <div className="mt-0.5 font-mono text-[10px] leading-relaxed text-[#82755a]">{why}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[#241f16] pt-3 font-mono text-[10px] leading-relaxed text-[#82755a]">
            These fields are modelled from proxies, not observed. They carry ESTIMATE or PREDICTION
            class everywhere they appear.
          </div>
        </div>
      </div>
    </section>
  );
}
