export interface Geography {
  value: string;
  label: string;
}

/** Matches the geography values actually present in the fixture data. */
export const GEOGRAPHIES: Geography[] = [
  { value: "global", label: "Global" },
  { value: "US", label: "United States" },
  { value: "EU", label: "European Union" },
];
