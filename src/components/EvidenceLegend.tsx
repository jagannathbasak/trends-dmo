const TIERS = [
  { mark: "●", label: "VERIFIED", accent: true },
  { mark: "◦", label: "SIGNAL", accent: false },
  { mark: "◇", label: "ESTIMATE", accent: false },
  { mark: "◈", label: "AI PREDICTION", accent: true },
];

export default function EvidenceLegend({
  trailing,
  className = "",
}: {
  trailing?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.08em] text-white/45 ${className}`}
    >
      {TIERS.map((tier) => (
        <span key={tier.label}>
          <span className={tier.accent ? "text-accent" : undefined}>{tier.mark}</span>{" "}
          {tier.label}
        </span>
      ))}
      {trailing ? <span className="text-white/30">{trailing}</span> : null}
    </div>
  );
}
