import { FACTS, SEGMENTS, READY, CHANGES, GAPS } from "@/lib/reportData";
import { Card, ClsMark, ClsTag, SectionLabel, SubDivider } from "@/components/dashboard/reportUi";

const CROWD_COLOR: Record<string, string> = {
  low: "text-accent border-accent/30",
  medium: "text-white/55 border-white/15",
  high: "text-amber-300/90 border-amber-300/25",
};

export default function CurrentStatePanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <SectionLabel>STANDING ASSESSMENT</SectionLabel>
        <p className="text-[15px] leading-relaxed">
          The segment is real and moving, but thinly documented. 18.2% of DACH mid-market firms are
          running at least one AI workflow pilot; only a third of the segment produces filings we can
          verify. Budgets are small and repeatable, procurement is slow, and no vendor holds the
          category.
        </p>
      </Card>

      <Card>
        <div className="mb-3 flex items-baseline justify-between">
          <SectionLabel>FACT LEDGER · 9 OF 214 TRACKED FIELDS</SectionLabel>
          <span className="font-mono text-[10px] text-white/30">Δ = change since last scoring</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-left font-mono text-[10px] text-white/40">
                <th className="pb-2 pr-3 font-normal">FIELD</th>
                <th className="pb-2 pr-3 font-normal">VALUE</th>
                <th className="pb-2 pr-3 font-normal">CLASS</th>
                <th className="pb-2 pr-3 font-normal">SRC</th>
                <th className="pb-2 font-normal">Δ 30D</th>
              </tr>
            </thead>
            <tbody>
              {FACTS.map((f) => (
                <tr key={f.name} className="border-b border-white/[0.05] last:border-0">
                  <td className="py-2.5 pr-3 text-white/80">{f.name}</td>
                  <td className="py-2.5 pr-3 font-display font-semibold">{f.v}</td>
                  <td className="py-2.5 pr-3">
                    <ClsTag cls={f.cls} />
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-[11px] text-white/40">{f.src}</td>
                  <td className="py-2.5 font-mono text-[11px] text-white/55">{f.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionLabel>SEGMENT MAP ◇</SectionLabel>
        <div className="flex flex-col gap-3">
          {SEGMENTS.map((s) => (
            <div key={s.name} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="flex-none font-mono text-[11px] text-white/50">{s.size}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-1.5 rounded-full bg-accent/50" style={{ width: s.adoptPct }} />
              </div>
              <div className="flex gap-4 font-mono text-[10px] text-white/40">
                <span>adoption {s.adopt}</span>
                <span className={`rounded-full border px-2 py-0.5 ${CROWD_COLOR[s.crowd]}`}>
                  crowding {s.crowd}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-baseline justify-between">
          <SectionLabel>BUYER READINESS INDEX</SectionLabel>
          <span className="font-mono text-[10px] text-white/30">0–100 · band shown</span>
        </div>
        <div className="flex flex-col gap-4">
          {READY.map((d) => (
            <div key={d.name}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="font-medium">{d.name}</span>
                <span className="font-display font-semibold text-accent">{d.v}</span>
              </div>
              <div className="relative h-1.5 rounded-full bg-white/[0.07]">
                <div
                  className="absolute h-1.5 rounded-full bg-white/15"
                  style={{ left: `${d.lo}%`, width: `${d.hi - d.lo}%` }}
                />
                <div
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent"
                  style={{ left: `calc(${d.v}% - 5px)` }}
                />
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45">{d.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>WHAT CHANGED · LAST 30 DAYS</SectionLabel>
        <div className="flex flex-col gap-3">
          {CHANGES.map((c) => (
            <div key={c.d + c.t} className="flex items-start gap-3 text-sm">
              <span className="w-14 flex-none font-mono text-[10px] text-white/35">{c.d}</span>
              <ClsMark cls={c.cls} />
              <span className="flex-1 text-white/75">{c.t}</span>
              <span
                className={`w-14 flex-none text-right font-mono text-[11px] ${
                  c.delta.startsWith("+") ? "text-accent" : "text-amber-300/80"
                }`}
              >
                {c.delta}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-1 flex items-baseline justify-between">
          <SectionLabel>COVERAGE &amp; KNOWN GAPS ◇</SectionLabel>
          <span className="font-display text-lg font-semibold">34%</span>
        </div>
        <p className="mb-4 text-xs text-white/40">of the segment is covered by verified filings</p>
        <div className="flex flex-col gap-3">
          {GAPS.map((g) => (
            <div key={g.name} className="flex gap-3 text-sm">
              <span className="mt-0.5 text-white/40">◇</span>
              <div>
                <div className="font-medium text-white/85">{g.name}</div>
                <p className="mt-0.5 text-xs leading-relaxed text-white/45">{g.why}</p>
              </div>
            </div>
          ))}
        </div>
        <SubDivider>
          <p className="text-[11.5px] leading-relaxed text-white/40">
            These fields are modelled from proxies, not observed. They carry ESTIMATE or PREDICTION
            class everywhere they appear.
          </p>
        </SubDivider>
      </Card>
    </div>
  );
}
