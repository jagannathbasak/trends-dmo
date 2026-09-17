import type { ForecastPoint, MomentumPoint } from "@/types/trends";

export type Point = [number, number];

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

export function linePoints(points: Point[]): string {
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");
}

/** Upper edge forward + lower edge reversed, closing into one filled band shape. */
export function bandPolygonPoints(upper: Point[], lower: Point[]): string {
  return linePoints([...upper, ...[...lower].reverse()]);
}

export interface Domain {
  min: number;
  max: number;
}

/** Tightens the y-axis to the data actually being shown, padded, rather than a fixed 0–100 scale. */
export function computeDomain(values: number[], padRatio = 0.18): Domain {
  if (values.length === 0) return { min: 0, max: 100 };
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 10;
  const pad = span * padRatio;
  return { min: Math.max(0, min - pad), max: max + pad };
}

export function scaleX(index: number, count: number, width: number): number {
  if (count <= 1) return 0;
  return (index / (count - 1)) * width;
}

export function scaleY(value: number, height: number, domain: Domain, padTop = 8, padBottom = 8): number {
  const usable = height - padTop - padBottom;
  const span = domain.max - domain.min || 1;
  const ratio = (value - domain.min) / span;
  return height - padBottom - ratio * usable;
}

export function seriesToPoints(series: MomentumPoint[], width: number, height: number, domain: Domain): Point[] {
  return series.map((p, i) => [scaleX(i, series.length, width), scaleY(p.value, height, domain)]);
}

/** The band's upper/lower edges continue from the same x position the observed line ends on. */
export function forecastBandToPoints(
  band: ForecastPoint[],
  width: number,
  height: number,
  domain: Domain,
  startIndex: number,
  totalCount: number,
) {
  const mid: Point[] = [];
  const upper: Point[] = [];
  const lower: Point[] = [];
  band.forEach((p, i) => {
    const x = scaleX(startIndex + i, totalCount, width);
    mid.push([x, scaleY(p.mid, height, domain)]);
    upper.push([x, scaleY(p.high, height, domain)]);
    lower.push([x, scaleY(p.low, height, domain)]);
  });
  return { mid, upper, lower };
}

/** Nearest index in a dated series to an annotation's ISO timestamp, for placing a vertical marker. */
export function indexOfClosestDate(t: string, series: { t: string }[]): number {
  const target = new Date(t).getTime();
  let bestIndex = 0;
  let bestDiff = Infinity;
  series.forEach((p, i) => {
    const diff = Math.abs(new Date(p.t).getTime() - target);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = i;
    }
  });
  return bestIndex;
}

export const CARD_SPARKLINE = {
  viewBox: "0 0 120 32",
  width: 120,
  height: 32,
  strokeWidth: 2,
} as const;

export const COMPACT_SPARKLINE = {
  viewBox: "0 0 56 22",
  width: 56,
  height: 22,
  strokeWidth: 1.8,
} as const;

export const FEATURED_CHART = {
  viewBox: "0 0 760 120",
  width: 760,
  height: 120,
  gridlines: [30, 60, 90],
  bandOpacity: 0.14,
  observedStrokeWidth: 2.4,
  forecastStrokeWidth: 2,
  forecastDash: "5 4",
  splitLineWidth: 1,
  splitDotRadius: 3.5,
} as const;

export const DETAIL_CHART = {
  viewBox: "0 0 860 260",
  width: 860,
  height: 260,
  gridlines: [52, 104, 156, 208],
  bandOpacity: 0.13,
  observedStrokeWidth: 2.6,
  forecastStrokeWidth: 2.2,
  forecastDash: "6 5",
  splitLineWidth: 1,
  splitDotRadius: 4,
  annotationDash: "3 5",
} as const;
