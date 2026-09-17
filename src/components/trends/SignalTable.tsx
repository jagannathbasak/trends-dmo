"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Signal, SignalType } from "@/types/trends";
import TierBadge from "@/components/primitives/TierBadge";
import Meter from "@/components/primitives/Meter";
import MonoLabel from "@/components/primitives/MonoLabel";
import { SIGNAL_TYPE_LABEL } from "@/lib/trends/notation";
import { formatSignedPct } from "@/lib/trends/format";
import { buildFilteredUrl } from "@/lib/trends/url";

const GRID_COLS = "md:grid-cols-[96px_150px_minmax(0,1fr)_160px_96px_80px]";

export interface SignalTableProps {
  slug: string;
  initialSignals: Signal[];
  initialNextCursor: string | null;
  /** Total signals matching the active type filter (not the trend's overall sourceCount). */
  totalCount: number;
  /** Every type present anywhere in this trend's signals, for the pill list — not just what's on the current page. */
  availableTypes: SignalType[];
  activeType: SignalType | "all";
  currentParams: string;
  className?: string;
}

/**
 * The evidence trail — every signal behind the score. Type pills update the
 * URL (?signal=), which re-renders this whole component fresh (the parent
 * keys it by activeType); "Load more" is local state on top of that first
 * page, fetched from the real /api/trends/[slug]/signals route.
 */
export default function SignalTable({
  slug,
  initialSignals,
  initialNextCursor,
  totalCount,
  availableTypes,
  activeType,
  currentParams,
  className = "",
}: SignalTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [signals, setSignals] = useState(initialSignals);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remaining = Math.max(0, totalCount - signals.length);

  async function loadMore() {
    if (!nextCursor || loading) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ cursor: nextCursor });
      if (activeType !== "all") params.set("type", activeType);
      const res = await fetch(`/api/trends/${slug}/signals?${params.toString()}`);
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      const data: { items: Signal[]; nextCursor: string | null } = await res.json();
      setSignals((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
    } catch {
      setError("Couldn't load more signals — try again.");
    } finally {
      setLoading(false);
    }
  }

  function selectType(type: SignalType | "all") {
    router.replace(buildFilteredUrl(pathname, currentParams, { signal: type === "all" ? undefined : type }));
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MonoLabel size="2xs">THE EVIDENCE TRAIL — EVERY SIGNAL BEHIND THE SCORE</MonoLabel>
        <div className="flex flex-wrap gap-[7px]" role="group" aria-label="Filter by signal type">
          <FilterPill label="All" active={activeType === "all"} onClick={() => selectType("all")} />
          {availableTypes.map((type) => (
            <FilterPill key={type} label={SIGNAL_TYPE_LABEL[type]} active={activeType === type} onClick={() => selectType(type)} />
          ))}
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-trends-line bg-trends-surface">
        <div
          className={`hidden border-b border-trends-line bg-trends-surface-sunken px-5 py-[13px] font-mono text-[9px] tracking-[0.12em] text-trends-text-muted md:grid md:items-center md:gap-[16px] ${GRID_COLS}`}
        >
          <span>TIER</span>
          <span>SIGNAL TYPE</span>
          <span>WHAT HAPPENED</span>
          <span>SOURCE</span>
          <span>CHANGE</span>
          <span>WEIGHT</span>
        </div>

        <div aria-live="polite">
          {signals.map((signal, i) => (
            <SignalRow key={signal.id} signal={signal} isLast={i === signals.length - 1} />
          ))}
          {signals.length === 0 ? <p className="px-5 py-6 text-[13px] text-trends-text-muted">No signals match this filter.</p> : null}
        </div>
      </div>

      {error ? <p className="mt-[10px] text-[12px] text-trends-fall">{error}</p> : null}

      {nextCursor ? (
        <button
          type="button"
          onClick={loadMore}
          disabled={loading}
          className="mt-[14px] h-11 rounded-lg border border-trends-line bg-trends-surface px-[22px] text-[13px] text-trends-text disabled:opacity-60"
        >
          {loading ? "Loading…" : `Load the remaining ${remaining} signals`}
        </button>
      ) : null}
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-8 rounded-md border px-3 text-[12px] ${
        active ? "border-trends-line-accent bg-trends-rise-bg text-trends-rise" : "border-trends-line bg-trends-surface text-trends-text-muted"
      }`}
    >
      {label}
    </button>
  );
}

function SignalSource({ signal }: { signal: Signal }) {
  return signal.sourceUrl ? (
    <a href={signal.sourceUrl} target="_blank" rel="noopener" className="text-trends-rise underline-offset-2 hover:underline">
      {signal.sourceName}
    </a>
  ) : (
    <>{signal.sourceName}</>
  );
}

function SignalRow({ signal, isLast }: { signal: Signal; isLast: boolean }) {
  const changeTone = signal.changePct === null ? "text-trends-text-faint" : signal.changePct < 0 ? "text-trends-fall" : "text-trends-rise";
  const meterTone = signal.changePct !== null && signal.changePct < 0 ? "fall" : "rise";
  const borderClass = isLast ? "" : "border-b border-trends-line-soft";

  return (
    <div className={`px-5 py-[15px] ${borderClass}`}>
      {/* Mobile: stacked, labelled rows. */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center justify-between">
          <TierBadge tier={signal.tier} showLabel className="text-[10px]" />
          <span className={`font-mono text-[13px] ${changeTone}`}>{signal.changePct === null ? "—" : formatSignedPct(signal.changePct)}</span>
        </div>
        <span className="text-[13px] text-trends-text">{signal.what}</span>
        <span className="text-[11px] text-trends-text-muted">
          {SIGNAL_TYPE_LABEL[signal.type]} · <SignalSource signal={signal} /> · {signal.observedAt}
        </span>
        {signal.method ? <span className="text-[11px] italic text-trends-text-faint">{signal.method}</span> : null}
        <Meter value={signal.weight} max={1} height="xs" tone={meterTone} label={`Weight ${Math.round(signal.weight * 100)}%`} />
      </div>

      {/* Desktop: the real grid table. */}
      <div className={`hidden md:grid md:items-center md:gap-[16px] ${GRID_COLS}`}>
        <TierBadge tier={signal.tier} showLabel className="text-[10px]" />
        <span className="text-[13px] text-trends-text-secondary">{SIGNAL_TYPE_LABEL[signal.type]}</span>
        <span className="text-[13px] text-trends-text">{signal.what}</span>
        <span className="font-mono text-[11px] text-trends-text-muted">
          <SignalSource signal={signal} /> · {signal.observedAt}
        </span>
        <span className={`font-mono text-[13px] ${changeTone}`}>{signal.changePct === null ? "—" : formatSignedPct(signal.changePct)}</span>
        <Meter value={signal.weight} max={1} height="xs" tone={meterTone} />
      </div>
      {signal.method ? <span className="hidden text-[11px] italic text-trends-text-faint md:mt-1 md:block">{signal.method}</span> : null}
    </div>
  );
}
