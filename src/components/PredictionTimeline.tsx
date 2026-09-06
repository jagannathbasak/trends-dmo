"use client";

import { useState } from "react";
import HorizonPicker, { type Horizon } from "@/components/HorizonPicker";
import Eyebrow from "@/components/Eyebrow";
import EvidenceLegend from "@/components/EvidenceLegend";
import Reveal from "@/components/Reveal";
import { bandPolygon, linePoints, timelineSeries } from "@/lib/forecastData";

const METRIC_STYLE_ACCENT = "border-accent/30 bg-accent/5";

export default function PredictionTimeline() {
  const [horizon, setHorizon] = useState<Horizon>("12MO");
  const data = timelineSeries[horizon];
  const splitX = data.forecast[0][0];
  const splitY = data.forecast[0][1];

  return (
    <section
      id="prediction"
      className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="flex max-w-xl flex-col gap-4">
            <Eyebrow>PREDICTION INTELLIGENCE</Eyebrow>
            <h2 className="text-balance font-handwritten text-[28px] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[38px] lg:text-[42px]">
              A weak signal in March becomes a market movement by Q3. We show you the whole arc.
            </h2>
            <p className="text-[15px] leading-relaxed text-white/60 sm:text-base">
              Historical movement, current momentum and forward forecast sit on one line — so
              you can see the moment the trend was detectable, and how far ahead of consensus
              you are now.
            </p>
          </Reveal>

          <Reveal delay={100} className="flex flex-col items-start gap-2.5 lg:items-end">
            <span className="font-mono text-[10px] tracking-[0.1em] text-white/40">
              PREDICTION HORIZON
            </span>
            <HorizonPicker value={horizon} onChange={setHorizon} />
          </Reveal>
        </div>

        <Reveal delay={140} className="relative rounded-2xl border border-white/10 bg-[#0d1413] p-5 sm:p-6">
          <div className="mb-3.5 flex flex-wrap justify-between gap-2 font-mono text-[10px] tracking-[0.08em] text-white/40">
            <span>HISTORICAL MOVEMENT · 24 MONTHS</span>
            <span className="text-accent">CURRENT MOMENTUM</span>
            <span>FORWARD FORECAST · {horizon} ◈</span>
          </div>

          <svg viewBox="0 0 1180 300" className="block h-[220px] w-full sm:h-[300px]">
            <line x1="0" y1="60" x2="1180" y2="60" stroke="rgba(255,255,255,.05)" />
            <line x1="0" y1="140" x2="1180" y2="140" stroke="rgba(255,255,255,.05)" />
            <line x1="0" y1="220" x2="1180" y2="220" stroke="rgba(255,255,255,.05)" />
            <polygon points={bandPolygon(data.forecast, data.band)} fill="rgba(79,227,193,.12)" />
            <polyline
              points={linePoints(data.observed)}
              fill="none"
              stroke="rgba(230,237,235,.6)"
              strokeWidth="2.5"
            />
            <polyline
              points={linePoints(data.forecast)}
              fill="none"
              stroke="#4FE3C1"
              strokeWidth="2.5"
              strokeDasharray="8 6"
            />
            <line x1={splitX} y1="10" x2={splitX} y2="280" stroke="rgba(79,227,193,.35)" strokeDasharray="4 6" />
            <circle cx={splitX} cy={splitY} r="5" fill="#4FE3C1" />
          </svg>

          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.07] pt-3.5 font-mono text-[10px] tracking-[0.08em] text-white/45">
            <EvidenceLegend trailing="MODELLED PROJECTION · NOT A GUARANTEE" />
          </div>
        </Reveal>

        <Reveal delay={200} className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <MetricCard label="TREND VELOCITY ◦" value={data.velocity} note={data.velocityNote} accent />
          <MetricCard label="PREDICTED MOVEMENT ◈" value={data.movement} note={data.movementBand} />
          <MetricCard label="CATALYSTS ●" value="3 active" note="Ranked by contribution weight" />
          <MetricCard
            label="TIMING WINDOW ◈"
            value={data.timing}
            note={data.timingNote}
            accent
            highlight
          />
        </Reveal>
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
    <div
      className={`rounded-[10px] border p-4 ${highlight ? METRIC_STYLE_ACCENT : "border-white/10"}`}
    >
      <div className="mb-2.5 font-mono text-[10px] text-white/45">{label}</div>
      <div className={`font-display text-[20px] font-semibold sm:text-[22px] ${accent ? "text-accent" : ""}`}>
        {value}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-white/45">{note}</p>
    </div>
  );
}
