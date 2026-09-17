import type { InvalidationRisk } from "@/types/trends";
import MonoLabel from "@/components/primitives/MonoLabel";

export interface InvalidationRisksProps {
  risks: InvalidationRisk[];
  withdrawnCount?: number;
  className?: string;
}

/**
 * Required on every detail page (§7/§10): a forecast with no stated way to be
 * wrong is the failure mode, so an empty list still renders, saying so.
 */
export default function InvalidationRisks({ risks, withdrawnCount, className = "" }: InvalidationRisksProps) {
  return (
    <section
      className={`flex flex-col gap-[14px] rounded-xl border border-trends-fall-surface-border bg-trends-fall-surface p-[22px] ${className}`}
    >
      <MonoLabel size="2xs" tone="fall">
        NAMED INVALIDATION RISKS
      </MonoLabel>
      <p className="text-[13px] leading-[1.5] text-trends-text-muted">
        What would make this call wrong. If any of these resolves true, the forecast is withdrawn.
      </p>

      {risks.length > 0 ? (
        risks.map((risk, i) => (
          <div key={risk.id} className="flex items-start gap-[10px]">
            <span className="pt-[2px] font-mono text-[12px] text-trends-fall">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[13px] leading-[1.5] text-trends-text-secondary">{risk.condition}</span>
          </div>
        ))
      ) : (
        <p className="text-[13px] leading-[1.5] text-trends-text-secondary">
          No named invalidation risks are recorded for this forecast.
        </p>
      )}

      <div className="flex-grow" />
      {withdrawnCount !== undefined ? <MonoLabel size="xs">{withdrawnCount} FORECASTS WITHDRAWN TO DATE</MonoLabel> : null}
    </section>
  );
}
