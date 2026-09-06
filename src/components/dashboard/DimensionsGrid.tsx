import type { Scenario } from "@/lib/dimensionsData";
import { marketDimensions, type MarketId } from "@/lib/marketsData";

export default function DimensionsGrid({
  marketId,
  scenario,
}: {
  marketId: MarketId;
  scenario: Scenario;
}) {
  const d = marketDimensions[marketId][scenario];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHead label="PREDICTED DEMAND ◈" tag={`CONF ${d.demandConfidence}%`} />
        <div className="font-display text-[26px] font-semibold text-accent sm:text-[28px]">{d.demand}</div>
        <p className="text-xs leading-relaxed text-white/45">{d.demandNote}</p>
      </Card>

      <Card>
        <CardHead label="PREDICTED MARKET SIZE ◈" tag="BY 2029" />
        <div className="font-display text-[26px] font-semibold sm:text-[28px]">{d.marketSize}</div>
        <div className="flex flex-col gap-2 font-mono text-[11px] text-white/50">
          <BarRow year="2026 ◇" value={d.marketSize2026} pct={d.marketBar2026} />
          <BarRow year="2027 ◈" value={d.marketSize2027} pct={d.marketBar2027} tint />
          <BarRow year="2029 ◈" value={d.marketSize2029} pct={d.marketBar2029} tint strong />
        </div>
      </Card>

      <Card>
        <CardHead label="PREDICTED COMPETITION ◈" tag="INTENSITY" />
        <div className="font-display text-[26px] font-semibold sm:text-[28px]">{d.competition}</div>
        <p className="text-xs leading-relaxed text-white/45">{d.competitionNote}</p>
      </Card>

      <Card highlight>
        <div className="font-mono text-[10px] text-white/45">PREDICTED TREND MOMENTUM ◈</div>
        <div className="font-display text-[26px] font-semibold text-accent sm:text-[28px]">{d.momentum}</div>
        <p className="text-xs leading-relaxed text-white/50">{d.momentumNote}</p>
      </Card>

      <Card>
        <div className="font-mono text-[10px] text-white/45">PREDICTED GEOGRAPHIC OPPORTUNITY ◈</div>
        <div className="flex flex-wrap gap-2 font-mono text-[11px] text-white/55">
          {d.geo.map((g, i) => (
            <span
              key={g.region}
              className={`rounded-full border px-2.5 py-1 ${
                i === 0 ? "border-accent/35 text-accent" : "border-white/10"
              }`}
            >
              {g.region} {g.value}
            </span>
          ))}
        </div>
      </Card>

      <Card>
        <div className="font-mono text-[10px] text-white/45">EVIDENCE MIX ◈</div>
        <p className="text-xs leading-relaxed text-white/45">
          Re-scored daily. Confidence reflects evidence tier mix and how far the forecast reaches
          beyond observed data.
        </p>
      </Card>
    </div>
  );
}

function Card({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col gap-3 rounded-xl border p-5 ${
        highlight ? "border-accent/30 bg-accent/5" : "border-white/10"
      }`}
    >
      {children}
    </div>
  );
}

function CardHead({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="font-mono text-[10px] text-white/45">{label}</span>
      <span className="font-mono text-[10px] text-white/35">{tag}</span>
    </div>
  );
}

function BarRow({
  year,
  value,
  pct,
  tint = false,
  strong = false,
}: {
  year: string;
  value: string;
  pct: number;
  tint?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-14">{year}</span>
      <span className="h-2 flex-1 rounded-full bg-white/[0.13]">
        <span
          className={`block h-2 rounded-full transition-all duration-500 ${
            strong ? "bg-accent" : tint ? "bg-accent/60" : "bg-white/45"
          }`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="w-12 text-right text-foreground">{value}</span>
    </div>
  );
}
