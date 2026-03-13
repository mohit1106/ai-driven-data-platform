export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function min(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.min(...values);
}

export function max(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.max(...values);
}

export function sum(values: number[]): number {
  return values.reduce((s, v) => s + v, 0);
}

export function standardDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const avg = mean(values);
  const squareDiffs = values.map((v) => Math.pow(v - avg, 2));
  return Math.sqrt(mean(squareDiffs));
}

export function topK(
  items: string[],
  k = 5
): { name: string; count: number }[] {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    const key = item?.toString().trim() || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, k);
}

export function trendDirection(
  values: number[]
): { direction: "up" | "down" | "stable"; percent: number } {
  if (values.length < 2) return { direction: "stable", percent: 0 };
  const n = values.length;
  const xMean = (n - 1) / 2;
  const yMean = mean(values);

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (i - xMean) * (values[i] - yMean);
    denominator += (i - xMean) * (i - xMean);
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const percentChange =
    yMean === 0 ? 0 : ((slope * n) / Math.abs(yMean)) * 100;

  if (Math.abs(percentChange) < 2) return { direction: "stable", percent: 0 };
  return {
    direction: slope > 0 ? "up" : "down",
    percent: Math.abs(percentChange),
  };
}
