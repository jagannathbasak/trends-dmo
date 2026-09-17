"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "@/components/trends/icons";
import { buildFilteredUrl } from "@/lib/trends/url";

export interface TrendsSearchProps {
  defaultValue?: string;
  /** The full current query string (all filters), so submitting search never drops them. */
  currentParams: string;
  className?: string;
}

export default function TrendsSearch({ defaultValue = "", currentParams, className = "" }: TrendsSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      className={`flex flex-col gap-3 sm:flex-row ${className}`}
      onSubmit={(event) => {
        event.preventDefault();
        router.replace(buildFilteredUrl(pathname, currentParams, { q: value.trim() || undefined }));
      }}
    >
      <label htmlFor="trends-search" className="sr-only">
        Search trends
      </label>
      <div className="flex h-[58px] flex-grow items-center gap-[14px] rounded-lg border border-trends-line bg-trends-surface px-5 focus-within:border-trends-line-accent">
        <SearchIcon className="flex-shrink-0 text-trends-text-muted" />
        <input
          id="trends-search"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search a trend, market, technology, company or behaviour"
          className="flex-grow bg-transparent text-[15px] text-trends-text outline-none placeholder:text-trends-text-faint"
        />
        <span className="rounded border border-trends-line px-[7px] py-1 font-mono text-[10px] tracking-[0.1em] text-trends-text-faint">
          ⌘K
        </span>
      </div>
      <button
        type="submit"
        className="h-[58px] rounded-lg bg-trends-rise px-8 text-[15px] font-semibold text-trends-on-accent transition hover:brightness-110"
      >
        Search
      </button>
    </form>
  );
}
