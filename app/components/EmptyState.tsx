"use client";

import { useState } from "react";
import { STARTERS } from "../lib/mock-data";

type Depth = "STANDARD" | "DEEP";

type EmptyStateProps = {
  onRun: (query: string) => void;
};

export default function EmptyState({ onRun }: EmptyStateProps) {
  const [q, setQ] = useState("");
  const [depth, setDepth] = useState<Depth>("STANDARD");

  const submit = (query: string) => {
    if (!query.trim()) return;
    onRun(query.trim());
  };

  return (
    <section className="state-empty">
      <div className="empty-inner">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span className="eyebrow">Ask once</span>
          <h1 className="headline">What market decision are you weighing?</h1>
          <p className="sub">
            Every figure comes back with its evidence class. Nothing is stated at a grade it has not
            earned.
          </p>
        </div>

        <div className="composer-box">
          <textarea
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(q);
              }
            }}
            placeholder="e.g. Should we enter AI workflow platforms in DACH mid-market?"
          />
          <div className="composer-row">
            <div className="depths">
              {(["STANDARD", "DEEP"] as const).map((k) => (
                <button
                  key={k}
                  className={`depth-btn${k === depth ? " active" : ""}`}
                  onClick={() => setDepth(k)}
                >
                  {k === "STANDARD" ? "Standard" : "Deep"}
                </button>
              ))}
            </div>
            <button className="btn-primary" onClick={() => submit(q)}>
              Analyze
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="starters">
          {STARTERS.map((t) => (
            <button key={t} className="chip" onClick={() => submit(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
