export type SectionId =
  | "verdict"
  | "current-state"
  | "evidence-trail"
  | "forecast"
  | "competition"
  | "timing"
  | "risks"
  | "recommendation";

const EVIDENCE_MIX = [
  { mark: "●", label: "VERIFIED", pct: 34, color: "#4FE3C1" },
  { mark: "◍", label: "SIGNAL", pct: 41, color: "#3AA79B" },
  { mark: "◇", label: "ESTIMATE", pct: 14, color: "#8A9694" },
  { mark: "◆", label: "PREDICTION", pct: 11, color: "#E3A93F" },
];

const CONTENTS: { label: string; id: SectionId }[] = [
  { label: "01 Verdict", id: "verdict" },
  { label: "02 Current state", id: "current-state" },
  { label: "03 Evidence trail", id: "evidence-trail" },
  { label: "04 Forecast", id: "forecast" },
  { label: "05 Competitive intensity", id: "competition" },
  { label: "06 Timing window", id: "timing" },
  { label: "07 Invalidation risks", id: "risks" },
  { label: "08 Recommendation", id: "recommendation" },
];

export default function ReportSidebar({
  active,
  onSelect,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  return (
    <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] flex-col gap-1 overflow-y-auto border-r border-white/[0.07] p-6 text-xs lg:flex">
      <span className="mb-2 font-mono text-[10px] tracking-[0.1em] text-white/35">CONTENTS</span>
      {CONTENTS.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`-mx-2 rounded-md px-2 py-1.5 text-left transition ${
              isActive
                ? "bg-accent/10 font-semibold text-accent"
                : "text-white/55 hover:bg-white/[0.05] hover:text-white/85"
            }`}
          >
            {item.label}
          </button>
        );
      })}

      <div className="mt-5 rounded-[9px] border border-white/10 p-3.5">
        <div className="mb-3 font-mono text-[10px] tracking-[0.14em] text-white/40">EVIDENCE MIX</div>
        <div className="flex flex-col gap-2.5 font-mono text-[11px]">
          {EVIDENCE_MIX.map((tier) => (
            <div key={tier.label} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span style={{ color: tier.color }}>{tier.mark}</span>
                <span className="tracking-[0.06em] text-white/70">{tier.label}</span>
              </span>
              <span className="text-white/85">{tier.pct}%</span>
            </div>
          ))}
        </div>
        <div className="mt-3.5 flex h-1.5 overflow-hidden rounded-full">
          {EVIDENCE_MIX.map((tier) => (
            <span key={tier.label} style={{ width: `${tier.pct}%`, backgroundColor: tier.color }} />
          ))}
        </div>
        <p className="mt-3.5 font-mono text-[10.5px] leading-relaxed text-white/35">
          Every figure in this report carries its class. Nothing is stated at a grade it has not
          earned.
        </p>
      </div>
    </aside>
  );
}
