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
  { label: "● VERIFIED", pct: 34, accent: true },
  { label: "◦ SIGNAL", pct: 41, accent: false },
  { label: "◇ ESTIMATE", pct: 14, accent: false },
  { label: "◈ PREDICTION", pct: 11, accent: true },
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
        <div className="mb-2.5 font-mono text-[10px] text-white/40">EVIDENCE MIX</div>
        <div className="flex flex-col gap-2 font-mono text-[11px] text-white/60">
          {EVIDENCE_MIX.map((tier) => (
            <div key={tier.label} className="flex justify-between">
              <span className={tier.accent ? "text-accent" : undefined}>{tier.label}</span>
              <span>{tier.pct}%</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-1.5 overflow-hidden rounded-full">
          <span style={{ width: "34%" }} className="bg-accent" />
          <span style={{ width: "41%" }} className="bg-white/50" />
          <span style={{ width: "14%" }} className="bg-white/25" />
          <span style={{ width: "11%" }} className="bg-accent/45" />
        </div>
      </div>
    </aside>
  );
}
