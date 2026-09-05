import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";

const TIERS = [
  {
    mark: "● VERIFIED",
    markClass: "text-accent",
    body: "Filings, registries, procurement records and government datasets. Cited and dated.",
  },
  {
    mark: "◦ SIGNAL",
    markClass: "text-white/50",
    body: "Observed behaviour: hiring, pricing changes, capital movement, search and shipping data.",
  },
  {
    mark: "◇ ESTIMATE",
    markClass: "text-white/50",
    body: "Derived figures. The method and inputs are shown next to the number.",
  },
  {
    mark: "◈ PREDICTION",
    markClass: "text-accent",
    body: "Model output with a band, a confidence score, named catalysts and named invalidation risks.",
  },
];

const STAT_TILES = [
  { value: "1,400+", label: "live data sources" },
  { value: "Daily", label: "forecast re-scoring" },
  { value: "4 tiers", label: "on every figure shown" },
  { value: "Full audit", label: "trail per prediction" },
];

export default function MethodIntegrations() {
  return (
    <section id="method" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>SOURCES &amp; METHOD</Eyebrow>
          <h2 className="text-balance font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[30px]">
            How a prediction gets made, and what it is allowed to claim.
          </h2>
          <div className="flex flex-col gap-3.5">
            {TIERS.map((tier) => (
              <div key={tier.mark} className="flex gap-3.5 text-[13.5px] leading-relaxed text-white/60">
                <span className={`w-[78px] flex-none pt-0.5 font-mono text-[11px] ${tier.markClass}`}>
                  {tier.mark}
                </span>
                <span>{tier.body}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 p-5">
            {STAT_TILES.map((tile) => (
              <div key={tile.label}>
                <div className="font-display text-[22px] font-semibold">{tile.value}</div>
                <p className="mt-1 text-xs text-white/45">{tile.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-white/10 p-5">
            <div className="font-mono text-[10px] tracking-[0.12em] text-white/40">
              INTEGRATIONS &amp; API
            </div>
            <p className="text-[13.5px] leading-relaxed text-white/60">
              Push forecasts into the tools where decisions get argued. Query the engine directly
              for your own models.
            </p>
            <div className="flex gap-2.5">
              {["Slack", "Notion", "Sheets", "REST API"].map((name) => (
                <span
                  key={name}
                  className="flex h-[34px] flex-1 items-center justify-center rounded-md border border-white/[0.09] font-mono text-[10px] text-white/45"
                >
                  {name}
                </span>
              ))}
            </div>
            <a href="#pricing" className="font-mono text-xs font-medium text-accent">
              READ THE API DOCS →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
