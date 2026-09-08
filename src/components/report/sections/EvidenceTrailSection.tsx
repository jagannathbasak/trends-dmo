import { CLAIMS, CLASS, CONTRA, SOURCES } from "@/lib/opportunityReport/data";

export default function EvidenceTrailSection({
  claim,
  onSelectClaim,
}: {
  claim: number;
  onSelectClaim: (i: number) => void;
}) {
  const cd = CLAIMS[claim];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-[70ch] text-balance font-display text-base font-medium leading-relaxed text-white/85">
          Pick a claim. The chain below shows every step from raw source to model input, with the
          class assigned at each hop and what breaks if a step is wrong.
        </p>
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
          45 sources · 1.2M signals · chain of custody retained
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)]">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4">
          <div className="mb-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Claims in this report
          </div>
          <div className="flex flex-col gap-1">
            {CLAIMS.map((c, i) => {
              const active = i === claim;
              const cls = CLASS[c.cls];
              return (
                <button
                  key={c.text}
                  type="button"
                  onClick={() => onSelectClaim(i)}
                  className={`flex w-full flex-col gap-1.5 rounded-[3px] border px-3 py-2.5 text-left transition ${
                    active ? "border-accent/40 bg-[#101614]" : "border-white/10 bg-[#0c100f]"
                  }`}
                >
                  <span className={`font-display text-[12.5px] leading-snug ${active ? "text-foreground" : "text-white/70"}`}>
                    {c.text}
                  </span>
                  <span className="flex gap-2.5 font-mono text-[9px]" style={{ color: cls.color }}>
                    {cls.glyph} {cls.name} <span className="text-white/35">{c.conf}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
                Provenance chain
              </span>
              <span className="font-mono text-[9px] font-medium tracking-[0.1em] text-white/40">
                {cd.chainMeta}
              </span>
            </div>
            <div className="flex flex-col">
              {cd.chain.map(([stage, label, detail, c, ts]) => {
                const cls = CLASS[c];
                return (
                  <div key={stage + label} className="grid grid-cols-[100px_1fr] gap-3.5 pb-4">
                    <div className="pt-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.13em] text-white/35">
                      {stage}
                    </div>
                    <div className="relative border-l border-white/10 pl-4">
                      <span
                        className="absolute -left-[3.5px] top-1.5 h-1.5 w-1.5 rounded-full"
                        style={{ background: cls.color }}
                      />
                      <div className="mb-1 font-display text-[13px] text-white/90">{label}</div>
                      <div className="max-w-[74ch] font-mono text-[11.5px] leading-relaxed text-white/55">
                        {detail}
                      </div>
                      <div className="mt-1.5 flex gap-3 font-mono text-[9px]" style={{ color: cls.color }}>
                        {cls.glyph} {cls.name} <span className="text-white/40">{ts}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-[4px] border border-white/10 bg-[#0c100f] p-4.5">
              <div className="mb-3 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
                Method
              </div>
              <div className="mb-3 rounded-[3px] border border-accent/20 bg-accent/[0.05] px-3 py-2.5 font-mono text-[12px] leading-relaxed text-accent">
                {cd.formula}
              </div>
              <div className="flex flex-col gap-2">
                {cd.inputs.map(([k, v, c]) => (
                  <div key={k} className="flex justify-between gap-2.5 font-mono text-[11px] text-white/55">
                    <span>{k}</span>
                    <span style={{ color: CLASS[c].color }}>
                      {v} {CLASS[c].glyph}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[4px] border border-[#3a3120] bg-[#14110a] p-4.5">
              <div className="mb-3 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#a4863f]">
                If this is wrong
              </div>
              <div className="mb-3 font-display text-[13.5px] leading-relaxed text-[#e0d9c8]">
                {cd.fragility}
              </div>
              <div className="font-mono text-[10px] leading-relaxed text-[#82755a]">
                Load-bearing weight in the verdict: {cd.weight}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#0e1211]">
          <div className="border-b border-white/10 px-4.5 py-3 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Source ledger · 45 sources
          </div>
          <div className="grid grid-cols-[minmax(0,1.6fr)_40px_minmax(0,0.9fr)_minmax(0,0.7fr)] gap-0 border-b border-white/[0.06] px-4.5 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
            <span>Type</span>
            <span>N</span>
            <span>Freshness</span>
            <span className="text-right">Weight</span>
          </div>
          {SOURCES.map(([type, n, fresh, w, c]) => (
            <div
              key={type}
              className="grid grid-cols-[minmax(0,1.6fr)_40px_minmax(0,0.9fr)_minmax(0,0.7fr)] items-center gap-0 border-b border-white/[0.05] px-4.5 py-2.5"
            >
              <span className="font-display text-[12.5px] text-white/85">
                {type} <span className="text-[9px]" style={{ color: CLASS[c].color }}>{CLASS[c].glyph}</span>
              </span>
              <span className="font-mono text-[11.5px] font-semibold text-foreground">{n}</span>
              <span className="font-mono text-[11px] text-white/55">{fresh}</span>
              <span className="text-right font-mono text-[11px] font-medium text-accent">{w}</span>
            </div>
          ))}
        </div>

        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Contradiction log · 3 unresolved by source, resolved by weight
          </div>
          <div className="flex flex-col gap-3.5">
            {CONTRA.map(([field, a, b, res]) => (
              <div key={field} className="border-l-2 border-white/15 pl-3.5">
                <div className="mb-1 font-display text-[12.5px] text-white/85">{field}</div>
                <div className="font-mono text-[11px] leading-relaxed text-white/50">{a}</div>
                <div className="font-mono text-[11px] leading-relaxed text-white/50">{b}</div>
                <div className="mt-1.5 font-mono text-[10.5px] font-medium leading-relaxed text-accent">
                  → {res}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
