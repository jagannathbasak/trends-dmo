const MINUS = "−";

export function formatSigned(value: number, decimals = 0): string {
  const rounded = Math.round(value * 10 ** decimals) / 10 ** decimals;
  const sign = rounded > 0 ? "+" : rounded < 0 ? MINUS : "";
  return `${sign}${Math.abs(rounded).toFixed(decimals)}`;
}

export function formatSignedPct(value: number, decimals = 0): string {
  return `${formatSigned(value, decimals)}%`;
}

/** ".41" style — the design drops the leading zero on a 0–1 weight. */
export function formatWeight(weight: number): string {
  return weight.toFixed(2).replace(/^0\./, ".").replace(/^-0\./, `${MINUS}.`);
}

function quarterOf(iso: string): { q: number; year: number } {
  const d = new Date(iso);
  return { q: Math.floor(d.getUTCMonth() / 3) + 1, year: d.getUTCFullYear() };
}

/** "Q3 2027" for a single date. */
export function formatQuarter(iso: string): string {
  const { q, year } = quarterOf(iso);
  return `Q${q} ${year}`;
}

/** "Q1–Q2 2027", or "Q4 2026 – Q1 2027" when the window spans a year boundary. Uses an en dash, not the signed-number minus. */
export function formatEntryWindow(opens: string, closes: string): string {
  const start = quarterOf(opens);
  const end = quarterOf(closes);
  if (start.year === end.year) {
    return start.q === end.q ? `Q${start.q} ${start.year}` : `Q${start.q}–Q${end.q} ${start.year}`;
  }
  return `Q${start.q} ${start.year} – Q${end.q} ${end.year}`;
}

export function formatRelativeTime(iso: string, now: Date = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} MIN AGO`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} HR AGO`;
  const days = Math.round(hours / 24);
  return `${days} DAY${days === 1 ? "" : "S"} AGO`;
}
