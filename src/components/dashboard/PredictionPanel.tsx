import type { Horizon } from "@/components/HorizonPicker";
import EvidenceLegend from "@/components/EvidenceLegend";
import { bandPolygon, linePoints } from "@/lib/forecastData";
import { marketChart, marketDecision, marketStats, type MarketId } from "@/lib/marketsData";

export default function PredictionPanel({
  marketId,
  horizon,
}: {
  marketId: MarketId;
  horizon: Horizon;
}) {
  const chart = marketChart[marketId][horizon];
  const stat = marketStats[marketId][horizon];
  const catalystCount = marketDecision[marketId].catalysts.length;
  const splitX = chart.forecast[0][0];
  const splitY = chart.forecast[0][1];

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#0d1413] p-5 sm:p-6">
      <div className="flex flex-wrap justify-between gap-2 font-mono text-[10px] tracking-[0.08em] text-white/40">
        <span>HISTORICAL MOVEMENT</span>
        <span className="text-accent">CURRENT MOMENTUM</span>
        <span>FORWARD FORECAST · {horizon} ◈</span>
      </div>

      <svg
        viewBox="0 0 620 210"
        preserveAspectRatio="none"
        className="block h-[220px] w-full sm:h-[280px]"
      >
        <line x1="0" y1="30" x2="620" y2="30" stroke="rgba(255,255,255,.05)" />
        <line x1="0" y1="90" x2="620" y2="90" stroke="rgba(255,255,255,.05)" />
        <line x1="0" y1="150" x2="620" y2="150" stroke="rgba(255,255,255,.05)" />
        <polygon points={bandPolygon(chart.forecast, chart.band)} fill="rgba(79,227,193,.12)" />
        <polyline points={linePoints(chart.observed)} fill="none" stroke="rgba(230,237,235,.6)" strokeWidth="2.5" />
        <polyline
          points={linePoints(chart.forecast)}
          fill="none"
          stroke="#4FE3C1"
          strokeWidth="2.5"
          strokeDasharray="8 6"
        />
        <line x1={splitX} y1="6" x2={splitX} y2="204" stroke="rgba(79,227,193,.35)" strokeDasharray="4 6" />
        <circle cx={splitX} cy={splitY} r="5" fill="#4FE3C1" />
      </svg>

      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.07] pt-3.5">
        <EvidenceLegend trailing="MODELLED PROJECTION · NOT A GUARANTEE" />
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <MetricCard label="TREND VELOCITY ◦" value={stat.velocity} note={stat.velocityNote} accent />
        <MetricCard label="PREDICTED MOVEMENT ◈" value={stat.demand} note={stat.movementBand} />
        <MetricCard
          label="CATALYSTS ●"
          value={`${catalystCount} active`}
          note="Ranked by contribution weight"
        />
        <MetricCard label="TIMING WINDOW ◈" value={stat.window} note={stat.timingNote} accent highlight />
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  note,
  accent = false,
  highlight = false,
}: {
  label: string;
  value: string;
  note: string;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-[10px] border p-4 ${highlight ? "border-accent/30 bg-accent/5" : "border-white/10"}`}>
      <div className="mb-2.5 font-mono text-[10px] text-white/45">{label}</div>
      <div className={`font-display text-[20px] font-semibold sm:text-[22px] ${accent ? "text-accent" : ""}`}>
        {value}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-white/45">{note}</p>
    </div>
  );
}
