import type { ElementType, ReactNode } from "react";
import type { Tone } from "@/lib/trends/notation";
import { toneTextClass } from "@/lib/trends/notation";

const SIZE_CLASS = {
  "2xs": "text-[9px]",
  xs: "text-[10px]",
  sm: "text-[11px]",
} as const;

export interface MonoLabelProps {
  children: ReactNode;
  tone?: Tone | "muted" | "faint";
  size?: keyof typeof SIZE_CLASS;
  tracking?: boolean;
  as?: ElementType;
  className?: string;
}

function toneClass(tone: MonoLabelProps["tone"]): string {
  if (tone === "muted") return "text-trends-text-muted";
  if (tone === "faint") return "text-trends-text-faint";
  if (tone === "rise" || tone === "fall" || tone === "neutral") return toneTextClass(tone);
  return "text-trends-text-muted";
}

export default function MonoLabel({
  children,
  tone = "muted",
  size = "xs",
  tracking = true,
  as: Component = "span",
  className = "",
}: MonoLabelProps) {
  return (
    <Component
      className={`font-mono ${SIZE_CLASS[size]} ${tracking ? "tracking-[0.1em]" : ""} ${toneClass(tone)} ${className}`}
    >
      {children}
    </Component>
  );
}
