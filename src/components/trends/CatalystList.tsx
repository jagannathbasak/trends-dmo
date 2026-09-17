import type { Catalyst } from "@/types/trends";
import Meter from "@/components/primitives/Meter";
import { formatWeight } from "@/lib/trends/format";

export interface CatalystListProps {
  catalysts: Catalyst[];
  className?: string;
}

/** Ranked catalysts — 01, 02, 03 — each with its weighted contribution. */
export default function CatalystList({ catalysts, className = "" }: CatalystListProps) {
  return (
    <div className={`flex flex-col gap-[12px] ${className}`}>
      {catalysts.map((catalyst, i) => (
        <div
          key={catalyst.id}
          className="flex flex-col items-start gap-[14px] rounded-xl border border-trends-line bg-trends-surface p-5 sm:flex-row"
        >
          <span className="font-mono text-[11px] text-trends-text-faint sm:pt-[3px]">{String(i + 1).padStart(2, "0")}</span>
          <div className="flex flex-grow flex-col gap-[8px]">
            <span className="font-display text-[17px] font-semibold text-trends-text">{catalyst.name}</span>
            <p className="text-[13px] leading-[1.5] text-trends-text-muted">{catalyst.body}</p>
          </div>
          <div className="flex w-full flex-col items-end gap-[8px] sm:w-[200px]">
            <span className="font-mono text-[13px] text-trends-rise">{formatWeight(catalyst.weight)}</span>
            <Meter value={catalyst.weight} max={1} height="sm" className="w-full sm:w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
