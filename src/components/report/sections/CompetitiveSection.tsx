import { ARCHETYPES, CLASS, DECOMP, GRID, MOVES, PLAYERS } from "@/lib/opportunityReport/data";

export default function CompetitiveSection({
  cell,
  onSelectCell,
}: {
  cell: string;
  onSelectCell: (id: string) => void;
}) {
  const [ri, ci] = cell.split("-").map(Number);
  const gr = GRID[ri] ?? GRID[0];
  const cellDetail = {
    title: `${gr[0]} × ${ARCHETYPES[ci]} · crowding ${gr[1][ci]}`,
    note: gr[2][ci],
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Intensity index · 8 quarters <span className="text-[#5fb2a4]">◦</span>
          </div>
          <div className="mb-3.5 flex items-baseline gap-3">
            <span className="font-display text-[30px] font-bold text-foreground">+34%</span>
            <span className="font-mono text-[10.5px] font-medium text-[#d9a441]">
              rising · steepest since Q2 2025
            </span>
          </div>
          <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="block h-[76px] w-full">
            <path
              d="M0,80 L57,74 L114,70 L171,58 L228,52 L285,40 L342,26 L400,14"
              fill="none"
              stroke="#d9a441"
              strokeWidth={1.8}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="mt-1.5 flex justify-between font-mono text-[9px] font-medium tracking-[0.1em] text-white/40">
            <span>Q4 2024</span>
            <span>Q3 2026</span>
          </div>
        </div>

        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-4 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            What the +34% is made of
          </div>
          <div className="mb-4 flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
            {["32%", "27%", "24%", "17%"].map((w, i) => (
              <div key={DECOMP[i][0]} style={{ width: w, background: DECOMP[i][2] }} />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {DECOMP.map(([name, v, c, src]) => (
              <div key={name} className="flex items-baseline gap-2.5">
                <span className="h-2 w-2 flex-none rounded-sm" style={{ background: c }} />
                <span className="flex-1 font-display text-[12px] text-white/80">{name}</span>
                <span className="font-mono text-[11px] font-semibold text-foreground">{v}</span>
                <span className="flex-none basis-16 text-right font-mono text-[10px] text-white/35">{src}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Crowding grid · segment × archetype
          </span>
          <span className="font-mono text-[9px] font-medium tracking-[0.1em] text-white/40">
            Click a cell · amber = crowded, mint = open lane
          </span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[520px]">
            <div className="mb-1 grid grid-cols-[minmax(150px,1.4fr)_repeat(4,minmax(0,1fr))] gap-1">
              <span />
              {ARCHETYPES.map((a) => (
                <span
                  key={a}
                  className="text-center font-mono text-[9px] font-medium uppercase tracking-[0.1em] leading-tight text-white/35"
                >
                  {a}
                </span>
              ))}
            </div>
            {GRID.map(([seg, vals], ri2) => (
              <div key={seg} className="mb-1 grid grid-cols-[minmax(150px,1.4fr)_repeat(4,minmax(0,1fr))] gap-1">
                <span className="flex items-center font-display text-[12px] text-white/75">{seg}</span>
                {vals.map((v, ci2) => {
                  const id = `${ri2}-${ci2}`;
                  const active = cell === id;
                  const amber = v >= 60;
                  const open = v < 30;
                  const bg = amber
                    ? `rgba(217,164,65,${(v / 190).toFixed(2)})`
                    : open
                      ? "rgba(79,227,193,0.14)"
                      : `rgba(120,140,132,${(v / 300).toFixed(2)})`;
                  const tc = amber ? "#f0dcb2" : open ? "#9fe8c4" : "#c3ccc7";
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onSelectCell(id)}
                      style={{ background: bg, borderColor: active ? "#4fe3c1" : "#1c2321", color: tc }}
                      className="rounded-[3px] border py-2.5 font-mono text-[11.5px] font-semibold"
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3.5 flex flex-wrap items-baseline gap-3.5 border-t border-white/10 pt-3">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-accent">
            {cellDetail.title}
          </span>
          <span className="min-w-[220px] flex-1 font-mono text-[12px] leading-relaxed text-white/55">
            {cellDetail.note}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#0e1211]">
          <div className="border-b border-white/10 px-4.5 py-3 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Archetype board
          </div>
          {PLAYERS.map(([name, momentum, mc, move, count, threat, tc, c]) => (
            <div key={name} className="border-b border-white/[0.05] px-4.5 py-3.5">
              <div className="mb-1.5 flex items-baseline justify-between gap-2.5">
                <span className="font-display text-[13.5px] font-semibold text-white/90">{name}</span>
                <span className="font-mono text-[10.5px] font-medium" style={{ color: mc }}>
                  {momentum}
                </span>
              </div>
              <div className="mb-1.5 font-mono text-[11.5px] leading-relaxed text-white/50">{move}</div>
              <div className="flex gap-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-white/35">
                <span>{count}</span>
                <span style={{ color: tc }}>Threat {threat}</span>
                <span style={{ color: CLASS[c].color }}>
                  {CLASS[c].glyph} {CLASS[c].name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[4px] border border-white/10 bg-[#0e1211] p-4.5">
          <div className="mb-3.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Moves feed
          </div>
          {MOVES.map(([d, t, c]) => (
            <div key={d + t} className="flex gap-3 border-b border-white/[0.05] py-2.5">
              <span className="flex-none basis-11 pt-0.5 font-mono text-[9.5px] text-white/40">{d}</span>
              <span className="flex-1 font-display text-[12.5px] leading-relaxed text-white/80">
                {t} <span className="text-[9px]" style={{ color: CLASS[c].color }}>{CLASS[c].glyph}</span>
              </span>
            </div>
          ))}
          <div className="mt-3.5 rounded-[3px] border border-accent/30 bg-accent/[0.05] p-3.5">
            <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-accent">
              Open lane
            </div>
            <div className="font-display text-[13px] leading-relaxed text-white/85">
              AT industrial and DACH public-adjacent buyers show demand growth above segment
              average with the lowest crowding on the grid. Neither is covered by a vertical
              native today.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
