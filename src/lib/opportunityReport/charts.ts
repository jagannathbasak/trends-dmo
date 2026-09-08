import { RANGES, SCEN } from "./data";
import type { RangeKey, ScenarioKey } from "./types";

const pt = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;

export function buildHistoryChart(range: RangeKey) {
  const d = RANGES[range];
  const H = 180;
  const W = 600;
  const pad = 16;
  const all = d.hist.length + d.fc.length - 1;
  const X = (i: number) => (W * i) / (all - 1);
  const Y = (v: number) => H - pad - (H - 2 * pad) * v;
  const off = d.hist.length - 1;

  const hist = d.hist.map((v, i) => pt(X(i), Y(v)));
  const fc = d.fc.map((v, i) => pt(X(off + i), Y(v)));
  const up = d.fc.map((v, i) => pt(X(off + i), Y(Math.min(1, v + 0.035 * i))));
  const dn = d.fc
    .map((v, i) => pt(X(off + i), Y(Math.max(0, v - 0.05 * i))))
    .reverse();

  return {
    hist: `M${hist.join(" L ")}`,
    fc: `M${fc.join(" L ")}`,
    band: `M${up.join(" L ")} L ${dn.join(" L ")} Z`,
    tx: X(off).toFixed(1),
    ty: Y(d.fc[0]).toFixed(1),
    l: d.l,
    r: d.r,
  };
}

export function buildForecastFan(scenario: ScenarioKey) {
  const s = SCEN[scenario];
  const H = 210;
  const W = 640;
  const pad = 14;
  const hist = [0.08, 0.11, 0.14, 0.19, 0.25, 0.32, 0.4, 0.46, 0.5];
  const all = hist.length + s.p50.length - 1;
  const X = (i: number) => (W * i) / (all - 1);
  const Y = (v: number) => H - pad - (H - 2 * pad) * (v / 1.1);
  const off = hist.length - 1;

  const band = (f: number) => {
    const u = s.p50.map((v, i) => pt(X(off + i), Y(Math.min(1.1, v + s.spread * f * i))));
    const l = s.p50
      .map((v, i) => pt(X(off + i), Y(Math.max(0, v - s.spread * f * i * 1.2))))
      .reverse();
    return `M${u.join(" L ")} L ${l.join(" L ")} Z`;
  };

  return {
    hist: `M${hist.map((v, i) => pt(X(i), Y(v))).join(" L ")}`,
    p50: `M${s.p50.map((v, i) => pt(X(off + i), Y(v))).join(" L ")}`,
    outer: band(1),
    inner: band(0.45),
    tx: X(off).toFixed(1),
  };
}
