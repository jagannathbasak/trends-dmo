import { FALS, RISKS } from "@/lib/opportunityReport/data";

export default function RisksSection({
  risks,
  onToggleRisk,
  onReset,
  baseProb,
  baseConf,
}: {
  risks: Record<string, boolean>;
  onToggleRisk: (k: string) => void;
  onReset: () => void;
  baseProb: number;
  baseConf: number;
}) {
  let sProb = baseProb;
  let sConf = baseConf;
  let sWin = "Q1–Q2 2027";
  let fired = 0;
  RISKS.forEach((r) => {
    if (risks[r.k]) {
      fired++;
      sProb -= r.dProb;
      sConf -= r.dConf;
      if (r.win) sWin = r.win;
    }
  });
  sProb = Math.max(8, sProb);
  const probColor = sProb >= 80 ? "#4fe3c1" : sProb >= 65 ? "#eef3f0" : "#d9a441";
  const firedColor = fired ? "#d9a441" : "#eef3f0";
  const sentence = fired
    ? `Under ${fired} simulated trigger${fired > 1 ? "s" : ""}, entry moves to ${sWin} and opportunity probability falls to ${sProb}%.`
    : `No risk triggered. Enter in Q1 2027 at ${baseProb}% opportunity probability, confidence ${baseConf}%.`;

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-[4px] border border-accent/25 bg-accent/[0.04] p-4.5 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3.5">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-accent">
            Verdict under simulation
          </span>
          <button
            type="button"
            onClick={onReset}
            className="rounded-[3px] border border-accent/30 bg-[#101a17] px-2.5 py-1.5 font-mono text-[9.5px] font-medium tracking-[0.08em] text-accent transition hover:brightness-110"
          >
            Reset
          </button>
        </div>
        <p className="mb-4.5 max-w-[60ch] text-balance font-display text-[19px] font-semibold leading-[1.45] text-foreground">
          {sentence}
        </p>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <div>
            <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
              Probability
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[25px] font-bold" style={{ color: probColor }}>
                {sProb}%
              </span>
              <span className="font-mono text-[10.5px] font-medium text-white/40">
                {fired ? `from ${baseProb}%` : "baseline"}
              </span>
            </div>
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
              Confidence
            </div>
            <div className="font-display text-[25px] font-bold text-foreground">{sConf}%</div>
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
              Entry window
            </div>
            <div className="pt-1 font-display text-[15px] font-semibold leading-tight text-foreground">{sWin}</div>
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
              Risks fired
            </div>
            <div className="font-display text-[25px] font-bold" style={{ color: firedColor }}>
              {fired} of 5
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RISKS.map((r) => {
          const on = !!risks[r.k];
          return (
            <div
              key={r.k}
              className={`flex flex-col gap-3 rounded-[4px] border p-4 ${
                on ? "border-[#4a3c1e] bg-[#14110a]" : "border-white/10 bg-[#0e1211]"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2.5">
                <span className="font-display text-[14.5px] font-semibold leading-snug text-foreground">
                  {r.name} <span className="text-[9px] text-[#d9a441]">◈</span>
                </span>
                <span className="font-mono text-[13px] font-semibold text-[#d9a441]">{r.p}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="mb-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
                    Verdict if triggered
                  </div>
                  <div className="font-mono text-[12px] leading-relaxed text-white/60">{r.effect}</div>
                </div>
                <div>
                  <div className="mb-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
                    Early warning · lead {r.lead}
                  </div>
                  <div className="font-mono text-[12px] leading-relaxed text-white/60">{r.warning}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggleRisk(r.k)}
                className={`mt-auto rounded-[3px] border px-3 py-2 font-mono text-[10px] font-medium tracking-[0.08em] transition ${
                  on
                    ? "border-[#d9a441] bg-[#d9a441] text-[#201603]"
                    : "border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30"
                }`}
              >
                {on ? "Triggered · clear" : "Simulate trigger"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#0e1211]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4.5 py-3">
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
            Pre-registered falsifiers
          </span>
          <span className="font-mono text-[9px] font-medium tracking-[0.1em] text-white/40">
            Written before the forecast · not editable after publication
          </span>
        </div>
        {FALS.map(([claimT, test, check, status, c]) => (
          <div
            key={claimT}
            className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)_90px_90px] items-baseline gap-3.5 border-b border-white/[0.05] px-4.5 py-3.5"
          >
            <span className="font-display text-[13px] leading-snug text-white/85">{claimT}</span>
            <span className="font-mono text-[11.5px] leading-relaxed text-white/50">{test}</span>
            <span className="font-mono text-[10px] font-medium tracking-[0.06em] text-white/40">{check}</span>
            <span
              className="text-right font-mono text-[9.5px] font-medium uppercase tracking-[0.1em]"
              style={{ color: c }}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
