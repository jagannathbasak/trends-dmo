/**
 * Raw hex values for the Trends design, exactly as specified in
 * docs/design/nvile-trends/reference/*.html. These mirror the `--color-trends-*`
 * custom properties declared in src/app/globals.css — that CSS layer drives every
 * Tailwind utility (bg-trends-*, text-trends-*, border-trends-*), and this module
 * exists only because inline SVG stroke/fill attributes are server-rendered and
 * can't resolve CSS custom properties at render time. Keep the two in sync.
 */
export const TRENDS_COLOR = {
  bg: "#0A0F0E",
  surface: "#101817",
  surfaceSunken: "#0C1211",
  line: "#1D2B28",
  lineSoft: "#16211F",
  lineAccent: "#23413A",
  text: "#E9F0ED",
  textSecondary: "#C9D6D2",
  textMuted: "#8A9B97",
  textFaint: "#6E7E7A",
  rise: "#4FD6A6",
  riseBg: "#1F3A33",
  fall: "#E8836F",
  fallSurface: "#150F0E",
  fallSurfaceBorder: "#3A2A26",
  onAccent: "#04120D",
  /** Chart-only accents that never appear as a Tailwind utility, just SVG geometry. */
  chartSplitLine: "#2C4B43",
  chartAnnotationLine: "#233833",
} as const;

export function directionColor(direction: "emerging" | "accelerating" | "steady" | "declining"): string {
  if (direction === "declining") return TRENDS_COLOR.fall;
  if (direction === "steady") return TRENDS_COLOR.textMuted;
  return TRENDS_COLOR.rise;
}
