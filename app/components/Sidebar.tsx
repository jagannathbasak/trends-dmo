"use client";

import { THREADS } from "../lib/mock-data";

type SidebarProps = {
  activeThread: number;
  onSelectThread: (index: number) => void;
  onNewAnalysis: () => void;
  open: boolean;
};

export default function Sidebar({ activeThread, onSelectThread, onNewAnalysis, open }: SidebarProps) {
  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <div className="sidebar-head">
        <div className="brand">
          <span className="brand-mark" />
          <span className="brand-name">Nvile</span>
          <span className="brand-tag">Analyst</span>
        </div>
        <button className="btn-new" onClick={onNewAnalysis}>
          <span className="plus">+</span>New analysis
        </button>
      </div>

      <div className="sidebar-nav">
        <div className="section-head">
          <span className="section-label">Recent</span>
          <span className="section-count">{THREADS.length}</span>
        </div>
        <nav className="threads">
          {THREADS.map((t, i) => (
            <button
              key={t.title}
              className={`thread-row${i === activeThread ? " active" : ""}`}
              data-status={t.status}
              title={t.title}
              onClick={() => onSelectThread(i)}
            >
              <span className="thread-dot" />
              <span className="thread-title">{t.title}</span>
              <span className="thread-meta">{t.meta}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-foot">
        <div className="watchlist-head">
          <span className="dot-live" />
          Watchlist
        </div>
        <div className="watchlist-copy">
          Three markets re-score nightly. You hear from us only when a verdict moves.
        </div>
      </div>
    </aside>
  );
}
