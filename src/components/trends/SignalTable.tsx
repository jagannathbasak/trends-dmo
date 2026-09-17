import type { Signal, SignalType } from "@/types/trends";
import TierBadge from "@/components/primitives/TierBadge";
import Meter from "@/components/primitives/Meter";
import MonoLabel from "@/components/primitives/MonoLabel";
import { SIGNAL_TYPES, SIGNAL_TYPE_LABEL } from "@/lib/trends/notation";
import { formatSignedPct } from "@/lib/trends/format";

const GRID_COLS = "md:grid-cols-[96px_150px_minmax(0,1fr)_160px_96px_80px]";

export interface SignalTableProps {
  signals: Signal[];
  totalCount: number;
  activeType?: SignalType | "all";
  className?: string;
}

/**
 * The evidence trail — every signal behind the score. Filtering and "load
 * more" pagination are wired up in a later phase; this renders the real
 * first page of real signals now. Below md it becomes stacked rows, never a
 * horizontally scrolling table (§7) — rendered as two separate layouts
 * (mobile stacked, desktop grid) rather than one shared structure, since
 * Tailwind needs literal class names, not ones assembled at runtime.
 */
export default function SignalTable({ signals, totalCount, activeType = "all", className = "" }: SignalTableProps) {
  const typesPresent = SIGNAL_TYPES.filter((t) => signals.some((s) => s.type === t) || t === activeType);
  const remaining = totalCount - signals.length;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MonoLabel size="2xs">THE EVIDENCE TRAIL — EVERY SIGNAL BEHIND THE SCORE</MonoLabel>
        <div className="flex flex-wrap gap-[7px]">
          <FilterPill label="All" active={activeType === "all"} />
          {typesPresent.map((type) => (
            <FilterPill key={type} label={SIGNAL_TYPE_LABEL[type]} active={activeType === type} />
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

        {signals.map((signal, i) => (
          <SignalRow key={signal.id} signal={signal} isLast={i === signals.length - 1} />
        ))}
      </div>

      {remaining > 0 ? (
        <button
          type="button"
          className="mt-[14px] h-11 rounded-lg border border-trends-line bg-trends-surface px-[22px] text-[13px] text-trends-text"
        >
          Load the remaining {remaining} signals
        </button>
      ) : null}
    </div>
  );
}

function FilterPill({ label, active }: { label: string; active: boolean }) {
  return (
    <button
      type="button"
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
