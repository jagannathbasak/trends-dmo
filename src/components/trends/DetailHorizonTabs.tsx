"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Horizon } from "@/types/trends";
import HorizonTabs from "@/components/trends/HorizonTabs";
import { buildFilteredUrl } from "@/lib/trends/url";

export interface DetailHorizonTabsProps {
  value: Horizon;
  currentParams: string;
}

export default function DetailHorizonTabs({ value, currentParams }: DetailHorizonTabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <HorizonTabs
      name="detail-horizon"
      value={value}
      onChange={(horizon) => router.replace(buildFilteredUrl(pathname, currentParams, { horizon: horizon === "12mo" ? undefined : horizon }))}
    />
  );
}
