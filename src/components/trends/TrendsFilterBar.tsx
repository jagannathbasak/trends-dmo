"use client";

import { useRouter, usePathname } from "next/navigation";
import type { EvidenceTier, Horizon, TrendSort } from "@/types/trends";
import HorizonTabs from "@/components/trends/HorizonTabs";
import { ChevronDownIcon } from "@/components/trends/icons";
import { CATEGORIES } from "@/lib/trends/categories";
import { GEOGRAPHIES } from "@/lib/trends/geographies";
import { EVIDENCE_TIERS, TIER_LABEL } from "@/lib/trends/notation";
import { buildFilteredUrl } from "@/lib/trends/url";

const SORTS: { value: TrendSort; label: string }[] = [
  { value: "momentum", label: "Momentum" },
  { value: "change", label: "Biggest change" },
  { value: "new", label: "Newest" },
];

export interface TrendsFilterBarProps {
  category?: string;
  horizon: Horizon;
  geo?: string;
  tier?: EvidenceTier;
  sort: TrendSort;
  /** The full current query string, so changing one filter preserves the others. */
  currentParams: string;
  /** Disabled when the hub is locked to one category via /trends/category/[category]. */
  categoryLocked?: boolean;
}

/**
 * Renders as siblings (a Fragment), not its own wrapping row — the page places
 * a flex-grow spacer and the EvidenceLegend after it in the same flex-wrap row.
 */
export default function TrendsFilterBar({
  category,
  horizon,
  geo,
  tier,
  sort,
  currentParams,
  categoryLocked = false,
}: TrendsFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  function set(updates: Record<string, string | undefined>) {
    router.replace(buildFilteredUrl(pathname, currentParams, updates));
  }

  const isDefault = (categoryLocked || !category) && horizon === "30d" && !geo && !tier && sort === "momentum";

  return (
    <>
      {!categoryLocked ? (
        <FilterSelect
          label="Category"
          value={category ?? "all"}
          options={[{ value: "all", label: "All" }, ...CATEGORIES.map((c) => ({ value: c.slug, label: c.label }))]}
          onChange={(v) => set({ category: v === "all" ? undefined : v })}
        />
      ) : null}

      <HorizonTabs name="hub-horizon" value={horizon} onChange={(h) => set({ horizon: h === "30d" ? undefined : h })} />

      <FilterSelect
        label="Geography"
        value={geo ?? "global"}
        options={GEOGRAPHIES}
        onChange={(v) => set({ geo: v === "global" ? undefined : v })}
      />

      <FilterSelect
        label="Evidence"
        value={tier ?? "all"}
        options={[{ value: "all", label: "All tiers" }, ...EVIDENCE_TIERS.map((t) => ({ value: t, label: TIER_LABEL[t] }))]}
        onChange={(v) => set({ tier: v === "all" ? undefined : (v as EvidenceTier) })}
      />

      <FilterSelect label="Sort" value={sort} options={SORTS} onChange={(v) => set({ sort: v === "momentum" ? undefined : v })} />

      {!isDefault ? (
        <button
          type="button"
          onClick={() =>
            router.replace(
              buildFilteredUrl(pathname, currentParams, {
                category: categoryLocked ? category : undefined,
                horizon: undefined,
                geo: undefined,
                tier: undefined,
                sort: undefined,
              }),
            )
          }
          className="text-[12px] text-trends-text-muted underline-offset-2 hover:text-trends-text hover:underline"
        >
          Reset
        </button>
      ) : null}
    </>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-[42px] cursor-pointer items-center gap-[9px] rounded-md border border-trends-line bg-trends-surface px-[15px] text-[13px] text-trends-text">
      <span className="text-trends-text-muted">{label}:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none bg-transparent pr-1 text-trends-text outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-trends-surface text-trends-text">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none text-trends-text-muted" />
    </label>
  );
}
