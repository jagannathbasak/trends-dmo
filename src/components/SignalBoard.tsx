import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";

const ROWS = [
  {
    market: "AI workflow platforms",
    verified: true,
    stage: "TREND",
    stageAccent: true,
    points: "0,26 40,22 80,14 120,8 160,4",
    strokeAccent: true,
    movement: "+68%",
    prob: "87%",
    window: "Q1 '27",
    windowAccent: false,
  },
  {
    market: "Industrial energy storage",
    verified: false,
    weak: true,
    stage: "EMERGING",
    stageAccent: false,
    points: "0,24 40,20 80,18 120,11 160,7",
    strokeAccent: false,
    movement: "+41%",
    prob: "72%",
    window: "Q3 '27",
    windowAccent: false,
  },
  {
    market: "Clinical documentation AI",
    verified: true,
    stage: "TREND",
    stageAccent: true,
    points: "0,20 40,12 80,10 120,14 160,18",
    strokeAccent: false,
    movement: "+12%",
    prob: "48%",
    window: "CLOSING",
    windowAccent: true,
  },
  {
    market: "Circular packaging mandates",
    estimate: true,
    stage: "WEAK SIGNAL",
    stageAccent: false,
    points: "0,25 40,24 80,22 120,20 160,15",
    strokeAccent: false,
    dashed: true,
    movement: "+29%",
    prob: "61%",
    window: "2028",
    windowAccent: false,
  },
];

const CATALYSTS = [
  { label: "Agent tooling reached production reliability", mark: "●", pct: 84 },
  { label: "Procurement budgets reallocated from RPA", mark: "◦", pct: 58 },
  { label: "Compliance frameworks stabilised in EU", mark: "◇", pct: 37 },
];

const RISKS = [
  { label: "Incumbent bundling", pct: "31%" },
  { label: "Procurement cycles lengthen", pct: "22%" },
  { label: "EU regulatory drag", pct: "17%" },
];

export default function SignalBoard() {
  return (
    <section className="border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-7">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <Reveal>
            <Eyebrow>EMERGING SIGNAL BOARD</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]">
              What is about to take off
            </h2>
          </Reveal>
          <Reveal delay={80} className="font-mono text-[11px] text-white/40">
            RANKED BY 12-MO PREDICTED MOVEMENT · HORIZON 12MO ▾
          </Reveal>
        </div>

        <Reveal delay={120} className="overflow-x-auto rounded-xl border border-white/10">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[2fr_1fr_1.4fr_0.9fr_0.9fr_1fr] border-b border-white/[0.08] bg-white/[0.02] px-5 py-3.5 font-mono text-[10px] tracking-[0.08em] text-white/40">
              <span>MARKET / SIGNAL</span>
              <span>STAGE</span>
              <span>MOMENTUM</span>
              <span>12MO ◈</span>
              <span>PROB ◈</span>
              <span>WINDOW ◈</span>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.market}
                className={`grid grid-cols-[2fr_1fr_1.4fr_0.9fr_0.9fr_1fr] items-center px-5 py-4 text-sm ${
                  i < ROWS.length - 1 ? "border-b border-white/[0.06]" : ""
                }`}
              >
                <span className="font-semibold">
                  {row.market} {row.verified ? <span className="text-accent">●</span> : null}
                  {row.weak ? <span className="text-white/50">◦</span> : null}
                  {row.estimate ? <span className="text-white/50">◇</span> : null}
                </span>
                <span
                  className={`font-mono text-[11px] ${row.stageAccent ? "text-accent" : "text-white/55"}`}
                >
                  {row.stage}
                </span>
                <svg viewBox="0 0 160 30" className="h-[30px] w-[160px]">
                  <polyline
                    points={row.points}
                    fill="none"
                    stroke={row.strokeAccent ? "#4FE3C1" : "rgba(230,237,235,.6)"}
                    strokeWidth="2"
                    strokeDasharray={row.dashed ? "4 4" : undefined}
                  />
                </svg>
                <span className={`font-semibold ${row.strokeAccent ? "text-accent" : ""}`}>
                  {row.movement}
                </span>
                <span>{row.prob}</span>
                <span
                  className={`font-mono text-xs ${row.windowAccent ? "text-white/45" : ""}`}
                >
                  {row.window}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal delay={160} className="flex flex-col gap-3.5 rounded-xl border border-white/10 p-5">
            <div className="font-mono text-[10px] text-white/45">
              WHY IT IS MOVING — RANKED CATALYSTS
            </div>
            <div className="flex flex-col gap-3">
              {CATALYSTS.map((c) => (
                <div key={c.label} className="flex items-center gap-3.5 text-sm">
                  <span className="flex-1">
                    {c.label} <span className={c.mark === "●" ? "text-accent" : "text-white/50"}>{c.mark}</span>
                  </span>
                  <span className="h-1.5 w-[120px] rounded-full bg-white/10">
                    <span
                      className={`block h-1.5 rounded-full ${c.pct > 70 ? "bg-accent" : "bg-white/45"}`}
                      style={{ width: `${c.pct}%` }}
                    />
                  </span>
                  <span className="w-9 text-right font-mono text-xs">{(c.pct / 100).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="flex flex-col gap-3.5 rounded-xl border border-white/10 p-5">
            <div className="font-mono text-[10px] text-white/45">WHAT WOULD INVALIDATE THIS ◈</div>
            <div className="flex flex-col gap-2.5 text-sm text-white/70">
              {RISKS.map((r) => (
                <div key={r.label} className="flex justify-between">
                  <span>{r.label}</span>
                  <b className="font-semibold">{r.pct}</b>
                </div>
              ))}
            </div>
            <p className="mt-auto text-[11.5px] leading-relaxed text-white/40">
              Each risk is monitored; the forecast is re-scored when one triggers.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
