"use client";

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import EvidenceLegend from "@/components/EvidenceLegend";
import Reveal from "@/components/Reveal";

const CHIPS = [
  "What markets are about to take off?",
  "Which industries will grow fastest?",
  "When should I enter this market?",
  "What could kill this opportunity?",
  "What will this market look like in 12 months?",
];

const DEFAULT_QUESTION = "Where will demand for AI workflow platforms emerge next?";

type Status = "idle" | "loading" | "answered";

export default function AskNvile() {
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [status, setStatus] = useState<Status>("idle");

  function handlePredict() {
    if (!question.trim()) return;
    setStatus("loading");
    window.setTimeout(() => setStatus("answered"), 900);
  }

  return (
    <section id="ask" className="scroll-mt-20 border-b border-white/[0.07] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-[820px] flex-col gap-5">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>ASK NVILE</Eyebrow>
          <h2 className="text-balance font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[34px]">
            Questions a research report cannot answer
          </h2>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-3 rounded-[10px] border border-accent/40 bg-accent/[0.04] p-2 sm:flex-row sm:items-center sm:p-2">
          <input
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
              setStatus("idle");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") handlePredict();
            }}
            placeholder="Ask a forward-looking question about any market…"
            className="w-full flex-1 bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-white/35 sm:px-4"
          />
          <button
            type="button"
            onClick={handlePredict}
            disabled={status === "loading"}
            className="rounded-md bg-accent px-5 py-2.5 text-xs font-semibold text-accent-ink transition hover:brightness-110 disabled:opacity-60 sm:mr-1"
          >
            {status === "loading" ? "Predicting…" : "Predict"}
          </button>
        </Reveal>

        <Reveal delay={120} className="flex flex-wrap justify-center gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setQuestion(chip);
                setStatus("idle");
              }}
              className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
            >
              {chip}
            </button>
          ))}
        </Reveal>

        <Reveal
          delay={160}
          className={`overflow-hidden rounded-xl border border-white/10 bg-[#0d1413] transition-all duration-500 ${
            status === "answered" ? "opacity-100" : "pointer-events-none h-0 border-0 opacity-0"
          }`}
        >
          {status === "answered" ? (
            <>
              <div className="flex flex-wrap justify-between gap-2 border-b border-white/[0.07] px-4 py-3.5 font-mono text-[10px] tracking-[0.08em] text-white/45 sm:px-5">
                <span>ANSWER · BUILT FROM 41 SOURCES</span>
                <span>
                  HORIZON 12MO · CONFIDENCE 82% <span className="text-accent">◈</span>
                </span>
              </div>
              <div className="flex flex-col gap-4 px-4 py-5 sm:px-5">
                <AnswerRow tier="● VERIFIED" tierClass="text-accent">
                  German mid-market software spend grew 19% year over year, confirmed across 12
                  filings and two government datasets.
                </AnswerRow>
                <AnswerRow tier="◦ SIGNAL" tierClass="text-white/50">
                  Hiring for automation engineers in DE and NL is up 2.4× over 90 days — the
                  earliest reliable precursor we track.
                </AnswerRow>
                <AnswerRow tier="◇ ESTIMATE" tierClass="text-white/50" muted>
                  Addressable spend in the region sits near $2.1B, derived from headcount and
                  per-seat benchmarks.
                </AnswerRow>

                <div className="flex flex-col gap-3 rounded-[10px] border border-accent/35 bg-accent/5 p-4 sm:flex-row">
                  <span className="font-mono text-[10px] text-accent sm:w-[88px] sm:flex-none sm:pt-0.5">
                    ◈ PREDICTION
                  </span>
                  <div className="flex flex-1 flex-col gap-3">
                    <p className="text-sm leading-relaxed">
                      Demand concentrates in DE and NL mid-market first, reaching{" "}
                      <b className="font-semibold text-accent">+68% by Q3 2027</b>. Nordics
                      follow two quarters later. Optimal entry <b>Q1–Q2 2027</b>, before
                      competition rises 34%.
                    </p>
                    <svg viewBox="0 0 880 120" className="block h-[100px] w-full sm:h-[120px]">
                      <polygon
                        points="440,72 550,58 660,42 770,26 880,12 880,50 770,62 660,78 550,88"
                        fill="rgba(79,227,193,.13)"
                      />
                      <polyline
                        points="0,104 110,98 220,90 330,88 440,72"
                        fill="none"
                        stroke="rgba(230,237,235,.6)"
                        strokeWidth="2"
                      />
                      <polyline
                        points="440,72 550,64 660,52 770,38 880,26"
                        fill="none"
                        stroke="#4FE3C1"
                        strokeWidth="2"
                        strokeDasharray="7 5"
                      />
                      <line x1="440" y1="4" x2="440" y2="112" stroke="rgba(79,227,193,.35)" strokeDasharray="3 5" />
                    </svg>
                    <div className="flex gap-5 font-mono text-[10px] text-white/40">
                      <span>OBSERVED</span>
                      <span className="text-accent">TODAY</span>
                      <span>FORECAST · BAND ±11%</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <EvidenceLegend />
                  <div className="flex gap-2.5 text-xs font-medium">
                    <button type="button" className="rounded-md border border-white/15 px-3.5 py-2 text-white/80 transition hover:border-white/35">
                      Show sources
                    </button>
                    <a
                      href="#reports"
                      className="rounded-md bg-accent px-3.5 py-2 font-semibold text-accent-ink transition hover:brightness-110"
                    >
                      Open full report
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

function AnswerRow({
  tier,
  tierClass,
  children,
  muted = false,
}: {
  tier: string;
  tierClass: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex gap-3.5">
      <span className={`w-[76px] flex-none pt-0.5 font-mono text-[10px] ${tierClass}`}>{tier}</span>
      <p className={`text-sm leading-relaxed ${muted ? "text-white/70" : "text-white/85"}`}>
        {children}
      </p>
    </div>
  );
}
