import type { ForecastPoint, MomentumPoint, TrendDirection } from "@/types/trends";
import {
  DETAIL_CHART,
  FEATURED_CHART,
  bandPolygonPoints,
  computeDomain,
  forecastBandToPoints,
  indexOfClosestDate,
  linePoints,
  scaleX,
  seriesToPoints,
} from "@/lib/trends/chart";
import { directionTone } from "@/lib/trends/notation";
import { TRENDS_COLOR } from "@/lib/trends/palette";

export interface MomentumChartProps {
  series: MomentumPoint[];
  forecastBand: ForecastPoint[];
  direction: TrendDirection;
  preset: "featured" | "detail";
  /** Marked historical events — dated against `series`. Only meaningful on the "detail" preset. */
  annotations?: { t: string; label: string }[];
  className?: string;
}

/**
 * The observed-momentum + predicted-band chart used on the featured card and
 * the trend detail page — same construction (gridlines, filled band, dashed
 * forecast line, solid observed line, split marker), different dimensions.
 * Decorative: the numbers it illustrates are already rendered as accessible
 * text (Figure) beside every chart in the reference design.
 */
export default function MomentumChart({ series, forecastBand, direction, preset, annotations = [], className = "" }: MomentumChartProps) {
  const config = preset === "detail" ? DETAIL_CHART : FEATURED_CHART;
  const { width, height } = config;
  const totalCount = series.length + forecastBand.length;

  const domain = computeDomain([...series.map((p) => p.value), ...forecastBand.flatMap((p) => [p.low, p.high])]);

  const observedPoints = seriesToPoints(series, width, height, domain, totalCount);
  const splitPoint = observedPoints[observedPoints.length - 1];
  const forecast = forecastBandToPoints(forecastBand, width, height, domain, series.length, totalCount);

  const tone = directionTone(direction);
  const lineColor = tone === "fall" ? TRENDS_COLOR.fall : tone === "neutral" ? TRENDS_COLOR.textMuted : TRENDS_COLOR.rise;

  const bandFill = bandPolygonPoints([splitPoint, ...forecast.upper], forecast.lower);
  const forecastLine = linePoints([splitPoint, ...forecast.mid]);
  const observedLine = linePoints(observedPoints);

  return (
    <svg viewBox={config.viewBox} preserveAspectRatio="none" width="100%" height="100%" className={className} aria-hidden="true">
      {config.gridlines.map((y) => (
        <line key={y} x1={0} y1={y} x2={width} y2={y} stroke={TRENDS_COLOR.lineSoft} strokeWidth={1} />
      ))}

      {annotations.map((a) => {
        const index = indexOfClosestDate(a.t, series);
        const x = scaleX(index, totalCount, width);
        return (
          <line
            key={a.t}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke={TRENDS_COLOR.chartAnnotationLine}
            strokeWidth={1}
            strokeDasharray="3 5"
          />
        );
      })}

      <polygon points={bandFill} fill={lineColor} fillOpacity={config.bandOpacity} />
      <polyline points={forecastLine} fill="none" stroke={lineColor} strokeWidth={config.forecastStrokeWidth} strokeDasharray={config.forecastDash} />
      <polyline points={observedLine} fill="none" stroke={lineColor} strokeWidth={config.observedStrokeWidth} />

      <line
        x1={splitPoint[0]}
        y1={0}
        x2={splitPoint[0]}
        y2={height}
        stroke={TRENDS_COLOR.chartSplitLine}
        strokeWidth={config.splitLineWidth}
      />
      <circle cx={splitPoint[0]} cy={splitPoint[1]} r={config.splitDotRadius} fill={lineColor} />
    </svg>
  );
}
