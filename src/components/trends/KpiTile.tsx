import type { ReactNode } from "react";
import MonoLabel from "@/components/primitives/MonoLabel";

const RADIUS_CLASS = {
  lg: "rounded-lg", // 8px — the hub's featured-card tiles
  md: "rounded-[10px]", // 10px — the detail page's headline-metric tiles
} as const;

export interface KpiTileProps {
  label: string;
  note?: ReactNode;
  children: ReactNode;
  accent?: boolean;
  radius?: keyof typeof RADIUS_CLASS;
  className?: string;
}

export default function KpiTile({ label, note, children, accent = false, radius = "lg", className = "" }: KpiTileProps) {
  return (
    <div
      className={`flex flex-col gap-[7px] border p-[13px] ${RADIUS_CLASS[radius]} ${
        accent ? "border-trends-line-accent bg-gradient-to-b from-[#111B19] to-[#0D1413]" : "border-trends-line bg-trends-surface-sunken"
      } ${className}`}
    >
      <MonoLabel size="2xs" className="leading-[1.3]">
        {label}
      </MonoLabel>
      <span className="font-display text-[25px] font-semibold leading-none">{children}</span>
      {note ? <span className="font-mono text-[10px] text-trends-text-faint">{note}</span> : null}
    </div>
  );
}
