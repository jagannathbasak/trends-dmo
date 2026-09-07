"use client";

import HorizonPicker, { HORIZONS, type Horizon } from "@/components/HorizonPicker";
import EvidenceLegend from "@/components/EvidenceLegend";
import { useModal } from "@/components/ModalProvider";
import { bandPolygon, linePoints } from "@/lib/forecastData";
import {
  MARKETS,
  marketById,
  marketChart,
  marketDecision,
  marketDimensions,
  marketStats,
  type MarketId,
} from "@/lib/marketsData";

export default function ReportDoc({
  marketId,
  horizon,
  onSelectMarket,
  onSelectHorizon,
}: {
  marketId: MarketId;
  horizon: Horizon;
  onSelectMarket: (id: MarketId) => void;
  onSelectHorizon: (h: Horizon) => void;
}) {
  const { open } = useModal();
  const market = marketById(marketId);
  const decision = marketDecision[marketId];
  const stat = marketStats[marketId][horizon];
  const base = marketDimensions[marketId].BASE;
  const chart = marketChart[marketId][horizon];

  return (
    <main className="flex flex-col gap-4 p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="mb-1.5 font-display text-xl font-semibold tracking-tight sm:text-[26px]">
            {market.name} · {market.segment}
          </h1>
          <span className="font-mono text-[11px] text-white/40">
            GENERATED {market.generated} · {market.sources} SOURCES · {market.signals} SIGNALS
          </span>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <span className="font-mono text-[10px] tracking-[0.1em] text-white/40">MARKET</span>
            <div className="relative w-full sm:w-auto">
              <select
                value={marketId}
                onChange={(event) => onSelectMarket(event.target.value as MarketId)}
                aria-label="Change market"
                className="w-full min-w-[230px] cursor-pointer appearance-none rounded-lg border border-white/15 bg-white/[0.04] py-2.5 pl-3.5 pr-9 font-mono text-[11px] font-semibold tracking-[0.06em] text-foreground outline-none transition hover:border-white/30 hover:bg-white/[0.07] focus-visible:border-accent/60"
              >
                {MARKETS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#0A0F0E] text-foreground">
                    {m.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-white/45">
                ▾
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <span className="font-mono text-[10px] tracking-[0.1em] text-white/40">HORIZON</span>
            <HorizonPicker value={horizon} onChange={onSelectHorizon} />
          </div>
        </div>
      </div>

      <div id="verdict" className="scroll-mt-24 rounded-xl border border-accent/40 bg-accent/5 p-5">
        <div className="mb-3 font-mono text-[10px] tracking-[0.14em] text-accent">VERDICT ◈</div>
        <p className="text-balance font-display text-lg font-semibold leading-snug tracking-tight sm:text-2xl">
          {decision.verdict}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/55">
          <span>Confidence {stat.confidence}%</span>
          <span>{stat.movementBand.replace(" to ", " → ")}</span>
          <span>Re-scored daily</span>
        </div>
      </div>

      <div id="current-state" className="scroll-mt-24 rounded-xl border border-white/10 p-5">
        <div className="mb-2 font-mono text-[10px] tracking-[0.14em] text-white/45">CURRENT STATE · OBSERVED</div>
        <p className="text-[15px] leading-relaxed">{decision.happening}</p>
        <div className="mt-2.5 font-mono text-[11px] text-white/40">{decision.happeningEvidence}</div>

        <div className="mt-5 border-t border-white/[0.07] pt-4">
          <div className="mb-2 font-mono text-[10px] tracking-[0.14em] text-white/45">WHY IT&apos;S HAPPENING</div>
          <p className="text-sm leading-relaxed text-white/75">{decision.why}</p>
          <div className="mt-3.5 flex flex-col gap-2.5">
            {decision.catalysts.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="w-[190px] flex-none text-xs text-white/70 sm:w-[240px]">
                  <span className={c.mark === "●" ? "text-accent" : "text-white/40"}>{c.mark}</span>{" "}
                  {c.label}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-1.5 rounded-full bg-accent/60" style={{ width: `${c.pct}%` }} />
                </span>
                <span className="w-8 flex-none text-right font-mono text-[11px] text-white/45">.{c.pct}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 font-mono text-[11px] text-white/40">{decision.whyTag}</div>
        </div>
      </div>

      <div id="evidence-trail" className="scroll-mt-24 rounded-xl border border-white/10 p-5">
        <div className="mb-2 font-mono text-[10px] tracking-[0.14em] text-white/45">EVIDENCE TRAIL</div>
        <p className="text-sm leading-relaxed text-white/75">
          Every figure above opens to its basis. {market.sources} verified filings and {market.signals}{" "}
          observed signals sit beneath this forecast, alongside derived estimates and model outputs — each
          labelled by evidence tier.
        </p>
        <EvidenceLegend className="mt-4" />
        <div className="mt-3 flex h-1.5 overflow-hidden rounded-full">
          <span style={{ width: "34%" }} className="bg-accent" />
          <span style={{ width: "41%" }} className="bg-white/50" />
          <span style={{ width: "14%" }} className="bg-white/25" />
          <span style={{ width: "11%" }} className="bg-accent/45" />
        </div>
        <div className="mt-4 flex flex-col gap-4 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[13px] leading-relaxed text-white/65">
            <span className="text-accent">●</span> {market.sources} verified filings · ◦ {market.signals}{" "}
            observed signals · ◇ 4 derived estimates with method shown ·{" "}
            <span className="text-accent">◈</span> 6 model outputs with band and confidence
          </div>
          <button
            type="button"
            onClick={() => open("Open evidence trail")}
            className="flex-none self-start rounded-md border border-white/[0.16] px-3.5 py-2 text-xs font-medium sm:self-auto"
          >
            Open evidence trail
          </button>
        </div>
      </div>

      <div id="forecast" className="scroll-mt-24 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <Kpi label={`DEMAND ${horizon} ◈`} value={stat.demand} accent />
        <Kpi label="MARKET SIZE '29 ◈" value={base.marketSize} />
        <Kpi label="COMPETITION ◈" value={stat.competition} />
        <Kpi label="ENTRY WINDOW ◈" value={stat.window} small />
      </div>

      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-xl border border-white/10 p-5">
          <div className="mb-3 flex justify-between font-mono text-[10px] text-white/40">
            <span>HISTORY → FORECAST</span>
            <span>DEMAND INDEX</span>
          </div>
          <svg viewBox="0 0 620 210" preserveAspectRatio="none" className="block h-[160px] w-full sm:h-[180px]">
            <line x1="0" y1="45" x2="620" y2="45" stroke="rgba(255,255,255,.05)" />
            <line x1="0" y1="110" x2="620" y2="110" stroke="rgba(255,255,255,.05)" />
            <polygon points={bandPolygon(chart.forecast, chart.band)} fill="rgba(79,227,193,.13)" />
            <polyline points={linePoints(chart.observed)} fill="none" stroke="rgba(230,237,235,.6)" strokeWidth="2.5" />
            <polyline
              points={linePoints(chart.forecast)}
              fill="none"
              stroke="#4FE3C1"
              strokeWidth="2.5"
              strokeDasharray="7 5"
            />
            <line
              x1={chart.forecast[0][0]}
              y1="6"
              x2={chart.forecast[0][0]}
              y2="204"
              stroke="rgba(79,227,193,.35)"
              strokeDasharray="3 5"
            />
            <circle cx={chart.forecast[0][0]} cy={chart.forecast[0][1]} r="4" fill="#4FE3C1" />
          </svg>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/35">
            <span>OBSERVED</span>
            <span className="text-accent">TODAY</span>
            <span>FORECAST · {horizon} ◈</span>
          </div>
        </div>

        <div id="risks" className="scroll-mt-24 flex flex-col gap-3 rounded-xl border border-white/10 p-5">
          <div className="font-mono text-[10px] text-white/42">WHAT COULD KILL THIS ◈</div>
          <div className="flex flex-col gap-2.5 text-sm text-white/75">
            {decision.risks.map((r) => (
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

      <div id="competition" className="scroll-mt-24 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col rounded-xl border border-white/10 p-5">
          <div className="mb-2 font-mono text-[10px] text-white/45">COMPETITIVE INTENSITY ◈</div>
          <p className="text-sm leading-relaxed text-white/75">{base.competitionNote}</p>

          <div className="mt-4 border-t border-white/[0.07] pt-4">
            <div className="mb-2 font-mono text-[10px] text-white/40">INTENSITY ACROSS HORIZONS</div>
            <div className="grid grid-cols-4 gap-2">
              {HORIZONS.map((h) => (
                <div
                  key={h}
                  className={`rounded-md border p-2.5 text-center ${
                    h === horizon ? "border-accent/40 bg-accent/[0.08]" : "border-white/10"
                  }`}
                >
                  <div className="font-mono text-[9px] text-white/40">{h}</div>
                  <div
                    className={`mt-1 font-display text-sm font-semibold ${h === horizon ? "text-accent" : ""}`}
                  >
                    {marketStats[marketId][h].competition}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-4">
            <span className="mr-1 font-mono text-[10px] text-white/40">CONCENTRATION</span>
            {base.geo.map((g, i) => (
              <span
                key={g.region}
                className={`rounded-full border px-2.5 py-1 font-mono text-[11px] ${
                  i === 0 ? "border-accent/35 text-accent" : "border-white/10 text-white/55"
                }`}
              >
                {g.region} {g.value}
              </span>
            ))}
          </div>
        </div>

        <div id="timing" className="scroll-mt-24 flex flex-col rounded-xl border border-white/10 p-5">
          <div className="mb-2 font-mono text-[10px] text-white/45">TIMING WINDOW ◈</div>
          <p className="text-sm leading-relaxed text-white/75">{stat.timingNote}</p>

          <div className="mt-4 border-t border-white/[0.07] pt-4">
            <div className="mb-2 font-mono text-[10px] text-white/40">WINDOW ACROSS HORIZONS</div>
            <div className="flex flex-col gap-1.5">
              {HORIZONS.map((h) => (
                <div key={h} className="flex items-center justify-between text-xs">
                  <span className={`font-mono ${h === horizon ? "text-accent" : "text-white/45"}`}>{h}</span>
                  <span className={h === horizon ? "font-semibold text-accent" : "text-white/70"}>
                    {marketStats[marketId][h].window}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
            <span className="font-mono text-[10px] text-white/40">MOMENTUM</span>
            <span className="font-display text-sm font-semibold text-accent">{base.momentum}</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white/50">{base.momentumNote}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 p-5">
        <span className="mr-1 font-mono text-[10px] text-white/45">FORECAST SCENARIOS</span>
        {(["BEAR", "BASE", "BULL"] as const).map((s) => (
          <span
            key={s}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] ${
              s === "BASE" ? "border-accent/35 bg-accent/[0.1] text-accent" : "border-white/10 text-white/55"
            }`}
          >
            {s} · {marketDimensions[marketId][s].demand}
          </span>
        ))}
      </div>

      <div
        id="recommendation"
        className="scroll-mt-24 rounded-xl border-[1.5px] border-accent bg-accent/[0.07] p-6 sm:p-7"
      >
        <div className="mb-3.5 font-mono text-[10px] tracking-[0.12em] text-accent">RECOMMENDATION</div>
        <p className="mb-5 text-balance font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          {decision.recommendation}
        </p>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          <ActionCard label="IF YOU ACT NOW ◈" value={`${decision.actNow}%`} note="probability of success" accent />
          <ActionCard label="IF YOU WAIT TWO QUARTERS ◈" value={`${decision.waitTwo}%`} note={decision.waitNote} />
          <ActionCard label="WATCH FOR ◦" value={decision.watchFor} note="alerts on trigger" small />
        </div>
        <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[11.5px] leading-relaxed text-white/45">
            Derived from modelled predictions. Every input carries its evidence tier and confidence, and
            the call is re-scored as new signals land.
          </p>
          <div className="flex flex-none gap-2.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => open("Share with team")}
              className="rounded-md border border-white/20 px-4 py-2.5 text-white/85 transition hover:border-white/40"
            >
              Share with team
            </button>
            <button
              type="button"
              onClick={() => open("Track this decision")}
              className="rounded-md bg-accent px-4 py-2.5 font-semibold text-accent-ink transition hover:brightness-110"
            >
              Track this decision
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}

function Kpi({
  label,
  value,
  accent = false,
  small = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div className="rounded-[10px] border border-white/10 p-4">
      <div className="mb-2 font-mono text-[10px] text-white/45">{label}</div>
      <div
        className={`font-display font-semibold ${small ? "pt-1 text-lg" : "text-xl sm:text-2xl"} ${
          accent ? "text-accent" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ActionCard({
  label,
  value,
  note,
  accent = false,
  small = false,
}: {
  label: string;
  value: string;
  note: string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div className="rounded-[10px] border border-white/[0.14] bg-[#0A0F0E]/35 p-4">
      <div className="mb-2 font-mono text-[10px] text-white/45">{label}</div>
      <div
        className={`font-display font-semibold ${small ? "text-lg" : "text-xl"} ${accent ? "text-accent" : ""}`}
      >
        {value}
      </div>
      <p className="mt-1.5 text-xs text-white/50">{note}</p>
    </div>
  );
}
