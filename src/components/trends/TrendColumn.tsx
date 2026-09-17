import Link from "next/link";
import type { TrendSummary } from "@/types/trends";
import MonoLabel from "@/components/primitives/MonoLabel";
import TrendCardCompact from "@/components/trends/TrendCardCompact";

export interface TrendColumnProps {
  id: string;
  title: string;
  description: string;
  href: string;
  items: TrendSummary[];
}

/** One of the three parallel Emerging / Accelerating / Declining columns. */
export default function TrendColumn({ id, title, description, href, items }: TrendColumnProps) {
  return (
    <section id={id} className="scroll-mt-20 flex flex-col gap-[14px]">
      <div className="flex items-end justify-between gap-3 border-b border-trends-line pb-[12px]">
        <div className="flex flex-col gap-[5px]">
          <h2 className="font-display text-[18px] font-semibold text-trends-text">{title}</h2>
          <MonoLabel size="xs">{description}</MonoLabel>
        </div>
        <Link href={href} className="text-[12px] text-trends-rise hover:brightness-110">
          All →
        </Link>
      </div>

      {items.length > 0 ? (
        items.map((trend, i) => <TrendCardCompact key={trend.id} trend={trend} rank={i + 1} />)
      ) : (
        <p className="rounded-lg border border-trends-line-soft bg-trends-surface-sunken px-[14px] py-[13px] text-[13px] text-trends-text-muted">
          No trends match the current filters.
        </p>
      )}
    </section>
  );
}
