import type { Horizon } from "@/components/HorizonPicker";
import EvidenceLegend from "@/components/EvidenceLegend";
import { bandPolygon, linePoints } from "@/lib/forecastData";
import { marketChart, marketStats, type MarketId } from "@/lib/marketsData";

export default function ForecastPanel({
  marketId,
  horizon,
}: {
  marketId: MarketId;
  horizon: Horizon;
}) {
  const chart = marketChart[marketId][horizon];
  const stat = marketStats[marketId][horizon];
  const splitX = chart.forecast[0][0];
  const splitY = chart.forecast[0][1];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#101817] to-[#0b1211]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
        <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r lg:p-6">
          <svg viewBox="0 0 620 210" className="block h-[190px] w-full sm:h-[210px]">
            <line x1="0" y1="30" x2="620" y2="30" stroke="rgba(255,255,255,.06)" />
            <line x1="0" y1="90" x2="620" y2="90" stroke="rgba(255,255,255,.06)" />
            <line x1="0" y1="150" x2="620" y2="150" stroke="rgba(255,255,255,.06)" />
            <polygon points={bandPolygon(chart.forecast, chart.band)} fill="rgba(79,227,193,.13)" />
            <polyline points={linePoints(chart.observed)} fill="none" stroke="rgba(230,237,235,.7)" strokeWidth="2" />
            <polyline
              points={linePoints(chart.forecast)}
              fill="none"
              stroke="#4FE3C1"
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            <line x1={splitX} y1="0" x2={splitX} y2="200" stroke="rgba(79,227,193,.4)" strokeDasharray="3 4" />
            <circle cx={splitX} cy={splitY} r="4" fill="#4FE3C1" />
          </svg>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] tracking-[0.06em] text-white/40">
            <span>OBSERVED</span>
            <span className="text-accent">TODAY</span>
            <span>FORECAST · {horizon} ◈</span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 p-5 sm:p-6">
          <Metric label={`${horizon} DEMAND FORECAST`} value={stat.demand} valueClassName="text-accent" />
          <Divider />
          <Metric label="OPPORTUNITY PROBABILITY" value={stat.probability} />
          <Divider />
          <Metric label="COMPETITION EXPECTED" value={stat.competition} />
          <Divider />
          <Metric label="OPTIMAL ENTRY WINDOW" value={stat.window} small />
          <div className="mt-auto border-t border-white/[0.07] pt-3.5">
            <div className="mb-1.5 flex justify-between font-mono text-[10px] text-white/50">
              <span>FORECAST CONFIDENCE</span>
              <span className="text-foreground">{stat.confidence}%</span>
            </div>
            <div className="h-[5px] rounded-full bg-white/[0.09]">
              <div
                className="h-[5px] rounded-full bg-accent transition-all duration-500"
                style={{ width: `${stat.confidence}%` }}
              />
            </div>
            <p className="mt-2.5 text-[10.5px] leading-relaxed text-white/40">
              Modelled projection. Not a guarantee.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/[0.07] bg-white/[0.015] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <EvidenceLegend />
        <span className="font-mono text-[10px] text-white/35">EVERY FIGURE OPENS ITS BASIS</span>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  valueClassName = "",
  small = false,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  small?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[11px] text-white/50">
        {label} <span className="text-accent">◈</span>
      </span>
      <span className={`font-display font-semibold ${small ? "text-[18px]" : "text-[22px]"} ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.07]" />;
}
