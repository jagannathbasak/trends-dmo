import type { TrendDetail } from "@/types/trends";
import Meter from "@/components/primitives/Meter";
import MonoLabel from "@/components/primitives/MonoLabel";
import { toneTextClass, type Tone } from "@/lib/trends/notation";

export interface ScoreBreakdownProps {
  breakdown: TrendDetail["breakdown"];
  sourceCount: number;
  className?: string;
}

export default function ScoreBreakdown({ breakdown, sourceCount, className = "" }: ScoreBreakdownProps) {
  return (
    <section
      className={`flex h-full flex-col gap-[18px] rounded-xl border border-trends-line bg-trends-surface p-[22px] ${className}`}
    >
      <MonoLabel size="2xs">SCORE BREAKDOWN ◇</MonoLabel>

      <BreakdownRow label="Demand" value={breakdown.demand} note={breakdown.demandNote} tone="rise" />
      <BreakdownRow label="Competition" value={breakdown.competition} note={breakdown.competitionNote} tone="fall" />
      <BreakdownRow label="Opportunity" value={breakdown.opportunity} note={breakdown.opportunityNote} tone="rise" />

      <div className="flex-grow" />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-trends-line-soft pt-[14px]">
        <MonoLabel size="2xs">
          CONFIDENCE {breakdown.confidence.toUpperCase()} · {sourceCount} SOURCES
        </MonoLabel>
        <a href="#method" className="text-[12px] text-trends-rise hover:brightness-110">
          Method →
        </a>
      </div>
    </section>
  );
}

function BreakdownRow({ label, value, note, tone }: { label: string; value: number; note: string; tone: Tone }) {
  return (
    <div className="flex flex-col gap-[7px]">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-medium text-trends-text">{label}</span>
        <span className={`font-mono text-[13px] ${toneTextClass(tone)}`}>{value}</span>
      </div>
      <Meter value={value} height="md" tone={tone} />
      <p className="text-[12px] text-trends-text-muted">{note}</p>
    </div>
  );
}
