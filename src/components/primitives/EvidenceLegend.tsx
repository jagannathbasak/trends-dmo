import TierBadge from "@/components/primitives/TierBadge";
import { EVIDENCE_TIERS } from "@/lib/trends/notation";

export interface EvidenceLegendProps {
  className?: string;
}

/** The four evidence tiers, spelled out once per page — never repeated per §3. */
export default function EvidenceLegend({ className = "" }: EvidenceLegendProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.1em] text-trends-text-muted ${className}`}>
      {EVIDENCE_TIERS.map((tier) => (
        <TierBadge key={tier} tier={tier} showLabel />
      ))}
    </div>
  );
}
