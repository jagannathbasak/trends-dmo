"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { EVIDENCE_COLOR, EVIDENCE_LABEL, EVIDENCE_SHAPE, EVIDENCE_TRAIL, KILLERS, METRICS, VERDICT } from "../lib/mock-data";

type VerdictStateProps = {
  queryText: string;
  onEditQuery: () => void;
  onRefine: (query: string) => void;
};

export default function VerdictState({ queryText, onEditQuery, onRefine }: VerdictStateProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [refineQ, setRefineQ] = useState("");

  // Publish the live scrollbar width so the header's content box matches the
  // report column exactly — measured, because it differs per platform.
  useLayoutEffect(() => {
    const measure = () => {
      const el = scrollRef.current;
      if (!el) return;
      document.documentElement.style.setProperty("--sbw", `${el.offsetWidth - el.clientWidth}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => () => document.documentElement.style.setProperty("--sbw", "0px"), []);

  const submitRefine = () => {
    if (!refineQ.trim()) return;
    onRefine(refineQ.trim());
    setRefineQ("");
  };

  return (
    <section className="state-verdict">
      <div className="verdict-header">
        <div className="verdict-header-inner">
          <div style={{ minWidth: 0 }}>
            <div className="header-q">{queryText}</div>
            <div className="header-meta">
              {VERDICT.date} · {VERDICT.sources} · {VERDICT.signals}
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-ghost" onClick={onEditQuery}>
              Edit query
            </button>
            <Link href="/dashboard" className="btn-dash">
              Open dashboard →
            </Link>
          </div>
        </div>
      </div>

      <div className="verdict-scroll" ref={scrollRef}>
        <div className="verdict-col">
          <div className="asked-block">
            <span className="eyebrow eyebrow-muted">You asked</span>
            <div className="asked-bubble">{queryText}</div>
          </div>

          <div className="answered-row">
            <span className="eyebrow eyebrow-muted" style={{ whiteSpace: "nowrap" }}>
              Nvile answered
            </span>
            <span className="answered-rule" />
          </div>

          <div className="verdict-card">
            <div className="verdict-top">
              <span className="verdict-tag">
                <span className="dot" />
                Verdict
              </span>
              <span className="verdict-src">model output · band shown</span>
            </div>
            <div className="verdict-body">
              <div>
                <p className="verdict-statement">{VERDICT.statement}</p>
                <p className="verdict-reason">{VERDICT.reasoning}</p>
              </div>
              <div className="conf-block">
                <div className="conf-labels">
                  <span>
                    Confidence <b>{VERDICT.confidence}%</b>
                  </span>
                  <span>
                    Band <b>{VERDICT.band}</b>
                  </span>
                </div>
                <div className="conf-track">
                  <div className="conf-fill" style={{ width: `${VERDICT.confidence}%` }} />
                </div>
                <div className="rescore">
                  <span className="dot-live" />
                  Re-scored daily
                </div>
              </div>
            </div>
          </div>

          <div className="metrics-grid">
            {METRICS.map((m) => (
              <div key={m.key} className="metric-card">
                <div className="metric-head">
                  <span className="metric-glyph" style={{ background: EVIDENCE_COLOR[m.evidence] }} />
                  <span>{m.key}</span>
                </div>
                <div className="metric-value" style={{ color: m.valueColor }}>
                  {m.value}
                </div>
                <div className="metric-sub">{m.sub}</div>
              </div>
            ))}
          </div>

          <div className="report-split">
            <div className="panel">
              <div className="panel-head">
                <span>History → forecast</span>
                <span>Demand index</span>
              </div>
              <svg
                viewBox="0 0 600 170"
                preserveAspectRatio="none"
                style={{ width: "100%", height: 140, display: "block" }}
              >
                <path
                  d="M300,96 L372,72 L444,54 L516,40 L588,26 L588,74 L516,84 L444,98 L372,108 L300,96 Z"
                  fill="#1e3a2c"
                  opacity="0.5"
                />
                <path
                  d="M12,138 L84,132 L156,118 L228,108 L300,96"
                  fill="none"
                  stroke="#6b7570"
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M300,96 L372,86 L444,72 L516,58 L588,44"
                  fill="none"
                  stroke="#39a874"
                  strokeWidth="1.8"
                  strokeDasharray="6 5"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="300"
                  y1="8"
                  x2="300"
                  y2="162"
                  stroke="#26302c"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx="300" cy="96" r="3.5" fill="#39a874" />
              </svg>
              <div className="chart-labels">
                <span>2023</span>
                <span style={{ color: "var(--accent)" }}>Today</span>
                <span>2029</span>
              </div>
            </div>

            <div className="panel risks-panel">
              <div className="risks-title">
                <span className="dot" />
                What could kill this
              </div>
              <div className="risks-list">
                {KILLERS.map((k) => (
                  <div key={k.name} className="risk-row">
                    <div className="risk-top">
                      <span className="risk-name">{k.name}</span>
                      <span className="risk-pct">{k.pct}%</span>
                    </div>
                    <div className="risk-track">
                      <div className="risk-fill" style={{ width: `${k.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="risk-note">
                If any risk triggers, the verdict is recalculated and you are notified.
              </div>
            </div>
          </div>

          <div className="panel evidence-panel">
            <div className="evidence-legend">
              {EVIDENCE_TRAIL.map((e) => (
                <span key={e.evidence} className="ev-tag" style={{ color: EVIDENCE_COLOR[e.evidence] }}>
                  <span className={`dot${EVIDENCE_SHAPE[e.evidence] !== "filled" ? ` ${EVIDENCE_SHAPE[e.evidence]}` : ""}`} />
                  {e.count} {EVIDENCE_LABEL[e.evidence]}
                </span>
              ))}
            </div>
            <div className="evidence-actions">
              <Link href="/dashboard" className="btn-ghost">
                Evidence trail
              </Link>
              <Link href="/dashboard" className="btn-ghost">
                Export PDF
              </Link>
            </div>
          </div>

          <div className="composer-dock">
            <div className="composer-pill">
              <div className="composer-field">
                <span className="composer-caret">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  value={refineQ}
                  onChange={(e) => setRefineQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitRefine();
                  }}
                  placeholder="Refine the question, or ask about one number"
                />
                <span className="run-hint">⏎ Run</span>
              </div>
              <Link href="/dashboard" className="btn-send">
                Open full dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
