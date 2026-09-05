import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";

const CONTENTS = [
  "01 Verdict",
  "02 Current state",
  "03 Evidence trail",
  "04 Forecast",
  "05 Competitive intensity",
  "06 Timing window",
  "07 Invalidation risks",
  "08 Recommendation",
];

const EVIDENCE_MIX = [
  { label: "● VERIFIED", pct: 34, accent: true },
  { label: "◦ SIGNAL", pct: 41, accent: false },
  { label: "◇ ESTIMATE", pct: 14, accent: false },
  { label: "◈ PREDICTION", pct: 11, accent: true },
];

const KPIS = [
  { label: "DEMAND 12MO ◈", value: "+68%", accent: true },
  { label: "MARKET SIZE '29 ◈", value: "$14.2B", accent: false },
  { label: "COMPETITION ◈", value: "+34%", accent: false },
  { label: "ENTRY WINDOW ◈", value: "Q1–Q2 2027", accent: false, small: true },
];

const RISKS = [
  { label: "Incumbent bundling ◦", pct: "31%" },
  { label: "Longer procurement ◇", pct: "22%" },
  { label: "EU regulatory drag ◈", pct: "17%" },
];

export default function OpportunityReport() {
  return (
    <section id="reports" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-8 flex max-w-2xl flex-col gap-4">
          <Eyebrow>OPPORTUNITY REPORT</Eyebrow>
          <h2 className="text-balance font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[34px]">
            Intelligence, evidence, forecast and recommendation in one document.
          </h2>
        </Reveal>

        <Reveal delay={100} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F0E]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
            <div className="flex items-baseline gap-3.5">
              <span className="font-display text-sm font-bold tracking-[0.16em]">NVILE</span>
              <span className="hidden font-mono text-[11px] text-white/40 sm:inline">
                OPPORTUNITY REPORT
              </span>
            </div>
            <div className="flex gap-2.5 text-xs font-medium">
              <button
                type="button"
                className="rounded-md border border-white/15 px-3.5 py-2 text-white/75 transition hover:border-white/35"
              >
                Export PDF
              </button>
              <a
                href="#decisions"
                className="rounded-md bg-accent px-3.5 py-2 font-semibold text-accent-ink transition hover:brightness-110"
              >
                Open Decision Center
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr]">
            <div className="hidden flex-col gap-3 border-r border-white/[0.07] p-5 text-xs lg:flex">
              <span className="mb-1 font-mono text-[10px] tracking-[0.1em] text-white/35">
                CONTENTS
              </span>
              {CONTENTS.map((item, i) => (
                <span key={item} className={i === 0 ? "font-semibold text-accent" : "text-white/55"}>
                  {item}
                </span>
              ))}

              <div className="mt-5 rounded-[9px] border border-white/10 p-3.5">
                <div className="mb-2.5 font-mono text-[10px] text-white/40">EVIDENCE MIX</div>
                <div className="flex flex-col gap-2 font-mono text-[11px] text-white/60">
                  {EVIDENCE_MIX.map((tier) => (
                    <div key={tier.label} className="flex justify-between">
                      <span className={tier.accent ? "text-accent" : undefined}>{tier.label}</span>
                      <span>{tier.pct}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex h-1.5 overflow-hidden rounded-full">
                  <span style={{ width: "34%" }} className="bg-accent" />
                  <span style={{ width: "41%" }} className="bg-white/50" />
                  <span style={{ width: "14%" }} className="bg-white/25" />
                  <span style={{ width: "11%" }} className="bg-accent/45" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="mb-1.5 font-display text-xl font-semibold tracking-tight sm:text-[26px]">
                    AI Workflow Platforms · DACH mid-market
                  </h3>
                  <span className="font-mono text-[11px] text-white/40">
                    GENERATED 02 SEP 2026 · 41 SOURCES · 1.2M SIGNALS
                  </span>
                </div>
                <div className="flex gap-1.5 font-mono text-[11px] font-medium">
                  {["30D", "6MO", "12MO", "3YR"].map((h) => (
                    <span
                      key={h}
                      className={`rounded-full border px-3 py-2 ${
                        h === "12MO"
                          ? "border-accent/35 bg-accent/[0.14] text-accent"
                          : "border-white/[0.11] text-white/50"
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-accent/40 bg-accent/5 p-5">
                <div className="mb-3 font-mono text-[10px] tracking-[0.14em] text-accent">
                  VERDICT ◈
                </div>
                <p className="text-balance font-display text-lg font-semibold leading-snug tracking-tight sm:text-2xl">
                  Enter in Q1 2027. Opportunity probability is 87%, and the window narrows as
                  competitive intensity rises 34% through the year.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/55">
                  <span>Confidence 82%</span>
                  <span>Band +52% → +79%</span>
                  <span>Re-scored daily</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                {KPIS.map((kpi) => (
                  <div key={kpi.label} className="rounded-[10px] border border-white/10 p-4">
                    <div className="mb-2 font-mono text-[10px] text-white/45">{kpi.label}</div>
                    <div
                      className={`font-display font-semibold ${kpi.small ? "pt-1 text-lg" : "text-xl sm:text-2xl"} ${
                        kpi.accent ? "text-accent" : ""
                      }`}
                    >
                      {kpi.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
                <div className="rounded-xl border border-white/10 p-5">
                  <div className="mb-3 flex justify-between font-mono text-[10px] text-white/40">
                    <span>HISTORY → FORECAST</span>
                    <span>DEMAND INDEX</span>
                  </div>
                  <svg viewBox="0 0 560 180" className="block h-[160px] w-full sm:h-[180px]">
                    <line x1="0" y1="45" x2="560" y2="45" stroke="rgba(255,255,255,.05)" />
                    <line x1="0" y1="110" x2="560" y2="110" stroke="rgba(255,255,255,.05)" />
                    <polygon
                      points="300,98 365,76 430,54 495,34 560,16 560,48 495,66 430,84 365,96"
                      fill="rgba(79,227,193,.13)"
                    />
                    <polyline
                      points="0,158 60,150 120,140 180,143 240,124 300,98"
                      fill="none"
                      stroke="rgba(230,237,235,.6)"
                      strokeWidth="2.5"
                    />
                    <polyline
                      points="300,98 365,86 430,68 495,49 560,31"
                      fill="none"
                      stroke="#4FE3C1"
                      strokeWidth="2.5"
                      strokeDasharray="7 5"
                    />
                    <line x1="300" y1="6" x2="300" y2="170" stroke="rgba(79,227,193,.35)" strokeDasharray="3 5" />
                    <circle cx="300" cy="98" r="4" fill="#4FE3C1" />
                  </svg>
                  <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/35">
                    <span>2024</span>
                    <span className="text-accent">TODAY</span>
                    <span>2027 ◈</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-white/10 p-5">
                  <div className="font-mono text-[10px] text-white/42">WHAT COULD KILL THIS ◈</div>
                  <div className="flex flex-col gap-2.5 text-sm text-white/75">
                    {RISKS.map((r) => (
                      <div key={r.label} className="flex justify-between">
                        <span>{r.label}</span>
                        <b className="font-semibold">{r.pct}</b>
                      </div>
                    ))}
                  </div>
                  <p className="mt-auto text-[11.5px] leading-relaxed text-white/40">
                    If any risk triggers, the verdict above is recalculated and you are notified.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-[13px] leading-relaxed text-white/65">
                  <span className="text-accent">●</span> 12 verified filings · ◦ 1.2M observed
                  signals · ◇ 4 derived estimates with method shown ·{" "}
                  <span className="text-accent">◈</span> 6 model outputs with band and confidence
                </div>
                <button
                  type="button"
                  className="flex-none self-start rounded-md border border-white/[0.16] px-3.5 py-2 text-xs font-medium sm:self-auto"
                >
                  Open evidence trail
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
