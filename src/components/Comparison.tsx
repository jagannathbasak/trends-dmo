import Reveal from "@/components/Reveal";

const CONVENTIONAL = [
  "Quarterly reports, already priced in",
  "Backward-looking survey data",
  "One number, no confidence stated",
  "No view on timing",
  "Findings, not decisions",
];

const NVILE = [
  "Continuous signal detection, re-scored daily",
  "Forward forecasts at 30 days to 3 years",
  "Bands, confidence and evidence tier on every figure",
  "Explicit entry windows and invalidation risks",
  "A recommendation you can act on",
];

export default function Comparison() {
  return (
    <section id="why-nvile" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h2 className="text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
            Traditional research tells you where the market was.
          </h2>
          <span className="font-mono text-[11px] text-white/40">COMPARISON</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal delay={80} className="flex flex-col gap-3.5 rounded-xl border border-white/10 p-6">
            <div className="font-mono text-[10px] tracking-[0.12em] text-white/40">
              CONVENTIONAL MARKET RESEARCH
            </div>
            <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-white/55">
              {CONVENTIONAL.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="flex flex-col gap-3.5 rounded-xl border border-accent/35 bg-accent/[0.04] p-6">
            <div className="font-mono text-[10px] tracking-[0.12em] text-accent">NVILE</div>
            <ul className="flex flex-col gap-2.5 text-sm leading-relaxed">
              {NVILE.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
