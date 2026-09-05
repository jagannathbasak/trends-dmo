import type { Horizon } from "@/components/HorizonPicker";

export type Point = [number, number];

export function linePoints(points: Point[]): string {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export function bandPolygon(forecast: Point[], maxSpread: number): string {
  const n = forecast.length;
  const upper = forecast.map(([x, y], i) => `${x},${(y - (maxSpread * i) / (n - 1)).toFixed(1)}`);
  const lower = forecast
    .map(([x, y], i) => `${x},${(y + (maxSpread * i) / (n - 1)).toFixed(1)}`)
    .reverse();
  return [...upper, ...lower].join(" ");
}

export type HeroSeries = {
  observed: Point[];
  forecast: Point[];
  band: number;
  demand: string;
  probability: string;
  competition: string;
  window: string;
  confidence: number;
};

export const heroSeries: Record<Horizon, HeroSeries> = {
  "30D": {
    observed: [
      [0, 150],
      [100, 145],
      [200, 138],
      [300, 130],
      [400, 120],
      [500, 112],
      [560, 106],
    ],
    forecast: [
      [560, 106],
      [590, 99],
      [620, 91],
    ],
    band: 6,
    demand: "+4%",
    probability: "92%",
    competition: "+5%",
    window: "Immediate",
    confidence: 90,
  },
  "6MO": {
    observed: [
      [0, 168],
      [80, 160],
      [160, 150],
      [240, 142],
      [320, 128],
      [400, 114],
      [460, 104],
    ],
    forecast: [
      [460, 104],
      [510, 90],
      [560, 72],
      [620, 54],
    ],
    band: 14,
    demand: "+29%",
    probability: "89%",
    competition: "+17%",
    window: "Q4 '26 – Q1 '27",
    confidence: 86,
  },
  "12MO": {
    observed: [
      [0, 178],
      [60, 170],
      [120, 158],
      [180, 162],
      [240, 142],
      [300, 122],
      [360, 104],
    ],
    forecast: [
      [360, 104],
      [420, 88],
      [480, 69],
      [540, 46],
      [620, 24],
    ],
    band: 26,
    demand: "+68%",
    probability: "87%",
    competition: "+34%",
    window: "Q1–Q2 2027",
    confidence: 82,
  },
  "3YR": {
    observed: [
      [0, 186],
      [60, 182],
      [120, 176],
      [180, 168],
      [220, 158],
    ],
    forecast: [
      [220, 158],
      [300, 130],
      [380, 98],
      [460, 66],
      [540, 38],
      [620, 14],
    ],
    band: 40,
    demand: "+182%",
    probability: "74%",
    competition: "+96%",
    window: "Before Q4 2028",
    confidence: 68,
  },
};

export type TimelineSeries = {
  observed: Point[];
  forecast: Point[];
  band: number;
  velocity: string;
  velocityNote: string;
  movement: string;
  movementBand: string;
  timing: string;
  timingNote: string;
};

export const timelineSeries: Record<Horizon, TimelineSeries> = {
  "30D": {
    observed: [
      [0, 240],
      [220, 234],
      [440, 224],
      [660, 214],
      [880, 202],
      [1050, 192],
    ],
    forecast: [
      [1050, 192],
      [1120, 186],
      [1180, 180],
    ],
    band: 6,
    velocity: "Steady",
    velocityNote: "×1.1 against the 90-day average",
    movement: "+4%",
    movementBand: "Band +2% to +6%",
    timing: "Open now",
    timingNote: "No near-term catalyst expected",
  },
  "6MO": {
    observed: [
      [0, 250],
      [180, 244],
      [360, 232],
      [540, 220],
      [720, 200],
      [880, 176],
    ],
    forecast: [
      [880, 176],
      [980, 156],
      [1080, 132],
      [1180, 108],
    ],
    band: 16,
    velocity: "Building",
    velocityNote: "×1.7 against the 90-day average",
    movement: "+29%",
    movementBand: "Band +19% to +36%",
    timing: "Q4 '26 – Q1 '27",
    timingNote: "Narrows as adoption compounds",
  },
  "12MO": {
    observed: [
      [0, 262],
      [110, 256],
      [220, 246],
      [330, 250],
      [440, 228],
      [550, 200],
      [660, 168],
    ],
    forecast: [
      [660, 168],
      [790, 152],
      [920, 126],
      [1050, 96],
      [1180, 66],
    ],
    band: 30,
    velocity: "Accelerating",
    velocityNote: "×2.4 against the 90-day average",
    movement: "+68%",
    movementBand: "Band +52% to +79%",
    timing: "Q1–Q2 '27",
    timingNote: "Closes as competition rises",
  },
  "3YR": {
    observed: [
      [0, 270],
      [150, 262],
      [300, 252],
      [450, 238],
      [560, 222],
    ],
    forecast: [
      [560, 222],
      [720, 180],
      [880, 132],
      [1030, 84],
      [1180, 40],
    ],
    band: 50,
    velocity: "Structural",
    velocityNote: "×3.6 against the 3-year baseline",
    movement: "+182%",
    movementBand: "Band +140% to +221%",
    timing: "Through 2028",
    timingNote: "Multiple entry points, widening band",
  },
};
