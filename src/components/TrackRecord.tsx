import Reveal from "@/components/Reveal";

const STATS = [
  { value: "78%", note: "of 12-month forecasts landed inside the stated band" },
  { value: "412", note: "predictions resolved and published with their outcome" },
  { value: "5.2 mo", note: "median lead time over mainstream coverage" },
  { value: "31", note: "forecasts we withdrew when a risk triggered" },
];

export default function TrackRecord() {
  return (
    <section id="track-record" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h2 className="text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px]">
            We score our own predictions in public.
          </h2>
          <span className="font-mono text-[11px] text-white/40">
            TRACK RECORD · TRAILING 24 MONTHS
          </span>
        </Reveal>

        <div className="mb-4 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 60} className="rounded-[10px] border border-white/10 p-5">
              <div className="font-display text-[28px] font-semibold text-accent sm:text-[32px]">
                {stat.value}
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">{stat.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260} className="flex flex-col items-start gap-4 rounded-xl border border-white/10 p-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="mb-2.5 font-mono text-[10px] text-white/40">
              EXAMPLE · CALLED MAR 2025, RESOLVED JUN 2026
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              &ldquo;Agent tooling demand rises 40–55% within 12 months.&rdquo; Actual:{" "}
              <b className="font-semibold text-accent">+47%</b>, inside band, 7 months ahead of
              trade press.
            </p>
          </div>
          <button
            type="button"
            className="flex-none rounded-md border border-white/[0.18] px-4 py-2.5 text-sm font-medium"
          >
            See all resolved calls
          </button>
        </Reveal>
      </div>
    </section>
  );
}
