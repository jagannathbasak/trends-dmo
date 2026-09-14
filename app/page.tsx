"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import EmptyState from "./components/EmptyState";
import RunningState from "./components/RunningState";
import VerdictState from "./components/VerdictState";
import { DEFAULT_QUERY } from "./lib/mock-data";

type View = "empty" | "running" | "verdict";

const ANALYSIS_DELAY_MS = 2200;

export default function NvileMainPage() {
  const [view, setView] = useState<View>("empty");
  const [activeThread, setActiveThread] = useState(0);
  const [queryText, setQueryText] = useState(DEFAULT_QUERY);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const runAnalysis = (query: string) => {
    setQueryText(query);
    setView("running");
    setSidebarOpen(false);
    setTimeout(() => setView("verdict"), ANALYSIS_DELAY_MS);
  };

  const newAnalysis = () => {
    setView("empty");
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <div
        className={`sidebar-backdrop${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        activeThread={activeThread}
        onSelectThread={(i) => {
          setActiveThread(i);
          setSidebarOpen(false);
        }}
        onNewAnalysis={newAnalysis}
        open={sidebarOpen}
      />

      <main className="main">
        <div className="mobile-bar">
          <button className="menu-btn" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span className="brand-name" style={{ fontSize: 11 }}>
            NVILE
          </span>
        </div>

        {view === "empty" && <EmptyState onRun={runAnalysis} />}
        {view === "running" && <RunningState queryText={queryText} />}
        {view === "verdict" && (
          <VerdictState queryText={queryText} onEditQuery={newAnalysis} onRefine={runAnalysis} />
        )}
      </main>
    </div>
  );
}
