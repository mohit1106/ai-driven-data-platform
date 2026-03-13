import type { DatasetConfig, AnalyticsSummary } from "@/types/dataset";
import { mean, median, min, max, sum, topK, trendDirection } from "./statistics";
import { parseNumeric, monthToIndex } from "@/lib/utils/format";

export function summarizeDataset(
  records: Record<string, string | number>[],
  config: DatasetConfig
): AnalyticsSummary {
  const numericStats: AnalyticsSummary["numericStats"] = {};

  for (const fieldId of config.numericFields) {
    const values = records
      .map((r) => parseNumeric(r[fieldId]))
      .filter((v) => v > 0);

    numericStats[fieldId] = {
      mean: mean(values),
      median: median(values),
      min: min(values),
      max: max(values),
      sum: sum(values),
    };
  }

  // Top categories
  const categoryValues = config.categoryField
    ? records.map((r) => String(r[config.categoryField!] || ""))
    : [];
  const topCategories = topK(categoryValues, 5);

  // Trend detection - sort by time then analyze primary numeric field
  let trendDir: "up" | "down" | "stable" = "stable";
  let trendPercent = 0;

  if (config.timeField && config.numericFields.length > 0) {
    const primaryField = config.numericFields[0];
    const sorted = [...records].sort((a, b) => {
      const yearA = parseInt(String(a[config.timeField!.year])) || 0;
      const yearB = parseInt(String(b[config.timeField!.year])) || 0;
      if (yearA !== yearB) return yearA - yearB;
      const monthA = monthToIndex(String(a[config.timeField!.month]));
      const monthB = monthToIndex(String(b[config.timeField!.month]));
      return monthA - monthB;
    });

    const timeValues = sorted.map((r) => parseNumeric(r[primaryField])).filter((v) => v > 0);
    const trend = trendDirection(timeValues);
    trendDir = trend.direction;
    trendPercent = trend.percent;
  }

  return {
    totalRecords: records.length,
    numericStats,
    topCategories,
    trend: trendDir,
    trendPercent,
  };
}
