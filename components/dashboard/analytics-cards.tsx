"use client";

import { useMemo } from "react";
import { TrendingUp, TrendingDown, Minus, BarChart3, Hash, Trophy } from "lucide-react";
import { useTenantStore } from "@/stores/tenant-store";
import { getDatasetConfig } from "@/lib/datasets/registry";
import { summarizeDataset } from "@/lib/analytics/engine";
import { useDataset } from "@/hooks/use-dataset";
import { formatNumber, formatCompact } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export function AnalyticsCards() {
  const { activeTenant } = useTenantStore();
  const config = getDatasetConfig(activeTenant);
  const { data, isLoading } = useDataset();

  const summary = useMemo(() => {
    if (!data?.records?.length) return null;
    return summarizeDataset(data.records, config);
  }, [data?.records, config]);

  if (isLoading || !summary) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  const primaryField = config.numericFields[0];
  const stats = summary.numericStats[primaryField];
  const topCategory = summary.topCategories[0];

  const cards = [
    {
      title: "Average",
      value: stats ? formatNumber(stats.mean) : "—",
      subtitle: primaryField?.replace(/_/g, " "),
      extra: stats ? `Median: ${formatNumber(stats.median)}` : "",
      icon: BarChart3,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Maximum",
      value: stats ? formatNumber(stats.max) : "—",
      subtitle: "Highest value",
      extra: stats ? `Min: ${formatNumber(stats.min)}` : "",
      icon: Hash,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Top Category",
      value: topCategory?.name || "—",
      subtitle: topCategory ? `${topCategory.count} records` : "",
      extra: summary.topCategories[1] ? `#2: ${summary.topCategories[1].name}` : "",
      icon: Trophy,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Trend",
      value:
        summary.trend === "up"
          ? `+${summary.trendPercent.toFixed(1)}%`
          : summary.trend === "down"
            ? `-${summary.trendPercent.toFixed(1)}%`
            : "Stable",
      subtitle: `${formatCompact(data?.total || 0)} total records`,
      extra: `${summary.totalRecords} in current page`,
      icon:
        summary.trend === "up"
          ? TrendingUp
          : summary.trend === "down"
            ? TrendingDown
            : Minus,
      color:
        summary.trend === "up"
          ? "text-emerald-400"
          : summary.trend === "down"
            ? "text-red-400"
            : "text-zinc-400",
      bg:
        summary.trend === "up"
          ? "bg-emerald-500/10"
          : summary.trend === "down"
            ? "bg-red-500/10"
            : "bg-zinc-500/10",
      border:
        summary.trend === "up"
          ? "border-emerald-500/20"
          : summary.trend === "down"
            ? "border-red-500/20"
            : "border-zinc-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={cn(
            "glass rounded-2xl p-5 gradient-border transition-all hover:scale-[1.01]",
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{card.title}</span>
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl", card.bg)}>
              <card.icon className={cn("h-4 w-4", card.color)} />
            </div>
          </div>
          <div className={cn("text-2xl xl:text-3xl font-bold truncate", card.title === "Top Category" && "text-lg xl:text-xl")}>
            {card.value}
          </div>
          <div className="text-xs text-zinc-500 mt-1.5 truncate">{card.subtitle}</div>
          {card.extra && (
            <div className="text-[11px] text-zinc-600 mt-1 truncate">{card.extra}</div>
          )}
        </div>
      ))}
    </div>
  );
}
