import { CLS, type ClsKey } from "@/lib/reportData";

export function isAccentCls(cls: ClsKey) {
  return cls === "V" || cls === "P";
}

export function ClsMark({ cls }: { cls: ClsKey }) {
  return <span className={isAccentCls(cls) ? "text-accent" : "text-white/40"}>{CLS[cls].mark}</span>;
}

export function ClsTag({ cls }: { cls: ClsKey }) {
  return (
    <span className={`font-mono text-[10px] ${isAccentCls(cls) ? "text-accent" : "text-white/45"}`}>
      {CLS[cls].mark} {CLS[cls].label}
    </span>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-white/10 p-5 ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 font-mono text-[10px] tracking-[0.14em] text-white/45">{children}</div>;
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 font-mono text-[10px] tracking-[0.1em] text-white/40">{children}</div>;
}

export function SubDivider({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 border-t border-white/[0.07] pt-4">{children}</div>;
}
