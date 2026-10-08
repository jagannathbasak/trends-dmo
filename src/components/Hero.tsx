"use client";

import { useState } from "react";
import HorizonPicker, { type Horizon } from "@/components/HorizonPicker";
import EvidenceLegend from "@/components/EvidenceLegend";
import Reveal from "@/components/Reveal";
import { bandPolygon, heroSeries, linePoints } from "@/lib/forecastData";

const LOGOS = ["Halden Capital", "Meridian Group", "Northbeam", "Argent & Vale", "Corvus Labs"];

export default function Hero() {
  const [horizon, setHorizon] = useState<Horizon>("12MO");
  const data = heroSeries[horizon];

  return (
    <section id="platform" className="border-b border-white/[0.07] px-5 pt-16 sm:px-8 sm:pt-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 pb-4 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-1.5 font-mono text-[11px] tracking-[0.1em] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            FORECASTING ENGINE · LIVE
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-3xl text-balance font-display text-[38px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[52px] md:text-[62px]">
            See what is coming before you make the decision.
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-white/60 sm:text-[17px]">
            NVILE detects the signals, explains why they are moving, forecasts where they lead,
            and tells you what to do about it — with every number labelled by how much we
            actually know.
          </p>
        </Reveal>

        <Reveal delay={200} className="flex w-full justify-center">
          <button
            type="button"
            className="flex w-full max-w-[480px] items-center justify-center gap-3 rounded-[10px] border border-white/10 bg-white/[0.015] px-6 py-3 text-[15px] font-medium text-white/70 transition hover:border-white/20 hover:text-white/85"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </Reveal>
      </div>

      <Reveal delay={260} className="mx-auto max-w-[1280px] py-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#101817] to-[#0b1211]">
          <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-display text-[17px] font-semibold">AI Workflow Platforms</span>
              <span className="font-mono text-[11px] text-white/45">
                MARKET · 41 SOURCES · UPDATED 4 MIN AGO
              </span>
            </div>
            <HorizonPicker value={horizon} onChange={setHorizon} size="sm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
            <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r lg:p-6">
              <svg viewBox="0 0 620 210" className="block h-[190px] w-full sm:h-[210px]">
                <line x1="0" y1="30" x2="620" y2="30" stroke="rgba(255,255,255,.06)" />
                <line x1="0" y1="90" x2="620" y2="90" stroke="rgba(255,255,255,.06)" />
                <line x1="0" y1="150" x2="620" y2="150" stroke="rgba(255,255,255,.06)" />
                <polygon points={bandPolygon(data.forecast, data.band)} fill="rgba(79,227,193,.13)" />
                <polyline
                  points={linePoints(data.observed)}
                  fill="none"
                  stroke="rgba(230,237,235,.7)"
                  strokeWidth="2"
                />
                <polyline
                  points={linePoints(data.forecast)}
                  fill="none"
                  stroke="#4FE3C1"
                  strokeWidth="2"
                  strokeDasharray="6 5"
                />
                <line
                  x1={data.forecast[0][0]}
                  y1="0"
                  x2={data.forecast[0][0]}
                  y2="200"
                  stroke="rgba(79,227,193,.4)"
                  strokeDasharray="3 4"
                />
                <circle cx={data.forecast[0][0]} cy={data.forecast[0][1]} r="4" fill="#4FE3C1" />
              </svg>
              <div className="mt-1.5 flex justify-between font-mono text-[10px] tracking-[0.06em] text-white/40">
                <span>OBSERVED</span>
                <span className="text-accent">TODAY</span>
                <span>FORECAST · {horizon} ◈</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 p-5 sm:p-6">
              <div>
                <Metric
                  label={`${horizon} DEMAND FORECAST`}
                  value={data.demand}
                  valueClassName="text-accent"
                />
                <span className="mt-0.5 block rotate-[-1.5deg] text-right font-handwritten text-[13px] text-accent/80">
                  ↳ moved twice today
                </span>
              </div>
              <Divider />
              <Metric label="OPPORTUNITY PROBABILITY" value={data.probability} />
              <Divider />
              <Metric label="COMPETITION EXPECTED" value={data.competition} />
              <Divider />
              <Metric label="OPTIMAL ENTRY WINDOW" value={data.window} small />
              <div className="mt-auto border-t border-white/[0.07] pt-3.5">
                <div className="mb-1.5 flex justify-between font-mono text-[10px] text-white/50">
                  <span>FORECAST CONFIDENCE</span>
                  <span className="text-foreground">{data.confidence}%</span>
                </div>
                <div className="h-[5px] rounded-full bg-white/[0.09]">
                  <div
                    className="h-[5px] rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${data.confidence}%` }}
                  />
                </div>
                <p className="mt-2.5 text-[10.5px] leading-relaxed text-white/40">
                  Modelled projection with an 11-point band. Not a guarantee.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/[0.07] bg-white/[0.015] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <EvidenceLegend />
            <span className="font-mono text-[10px] text-white/35">
              EVERY FIGURE OPENS ITS BASIS
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={320} className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 pb-14 sm:flex-row sm:gap-8">
        <span className="font-mono text-[10px] tracking-[0.1em] text-white/30">TRUSTED BY</span>
        <div className="flex w-full flex-wrap items-center justify-center gap-6 sm:justify-between">
          {LOGOS.map((logo) => (
            <span key={logo} className="font-display text-sm font-medium tracking-tight text-white/25">
              {logo}
            </span>
          ))}
        </div>
      </Reveal>
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
      <span
        className={`font-display font-semibold ${small ? "text-[18px]" : "text-[22px]"} ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.07]" />;
}
