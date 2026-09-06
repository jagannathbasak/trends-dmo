"use client";

import { useState } from "react";
import EvidenceLegend from "@/components/EvidenceLegend";
import { marketById, marketDecision, marketStats, type MarketId } from "@/lib/marketsData";

const CHIPS = [
  "What markets are about to take off?",
  "When should I enter this market?",
  "What could kill this opportunity?",
  "What will this market look like in 12 months?",
];

type Status = "idle" | "loading" | "answered";

export default function AskBox({ marketId }: { marketId: MarketId }) {
  const market = marketById(marketId);
  const decision = marketDecision[marketId];
  const stat = marketStats[marketId]["12MO"];
  const [question, setQuestion] = useState(market.question);
  const [status, setStatus] = useState<Status>("idle");

  function handlePredict() {
    if (!question.trim()) return;
    setStatus("loading");
    window.setTimeout(() => setStatus("answered"), 700);
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-white/10 p-5 sm:p-6">
      <div className="font-mono text-[10px] tracking-[0.1em] text-white/40">ASK NVILE</div>

      <div className="flex flex-col gap-3 rounded-[10px] border border-accent/40 bg-accent/[0.04] p-2 sm:flex-row sm:items-center">
        <input
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
            setStatus("idle");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") handlePredict();
          }}
          placeholder="Ask a forward-looking question about this market…"
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
      </div>

      <div className="flex flex-wrap gap-2">
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
      </div>

      <div
        className={`overflow-hidden rounded-xl border border-white/10 bg-[#0d1413] transition-all duration-500 ${
          status === "answered" ? "opacity-100" : "pointer-events-none h-0 border-0 opacity-0"
        }`}
      >
        {status === "answered" ? (
          <>
            <div className="flex flex-wrap justify-between gap-2 border-b border-white/[0.07] px-4 py-3.5 font-mono text-[10px] tracking-[0.08em] text-white/45 sm:px-5">
              <span>ANSWER · BUILT FROM {market.sources} SOURCES</span>
              <span>
                HORIZON 12MO · CONFIDENCE {stat.confidence}% <span className="text-accent">◈</span>
              </span>
            </div>
            <div className="flex flex-col gap-4 px-4 py-5 sm:px-5">
              <AnswerRow tier="● OBSERVED" tierClass="text-accent">
                {decision.happening}
              </AnswerRow>
              <AnswerRow tier="◦ SIGNAL" tierClass="text-white/50">
                {decision.why}
              </AnswerRow>
              <div className="flex flex-col gap-3 rounded-[10px] border border-accent/35 bg-accent/5 p-4 sm:flex-row">
                <span className="font-mono text-[10px] text-accent sm:w-[88px] sm:flex-none sm:pt-0.5">
                  ◈ PREDICTION
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{decision.verdict}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <EvidenceLegend />
                <span className="font-mono text-[10px] text-white/40">Re-scored daily</span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function AnswerRow({
  tier,
  tierClass,
  children,
}: {
  tier: string;
  tierClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3.5">
      <span className={`w-[80px] flex-none pt-0.5 font-mono text-[10px] ${tierClass}`}>{tier}</span>
      <p className="text-sm leading-relaxed text-white/85">{children}</p>
    </div>
  );
}
