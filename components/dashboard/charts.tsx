"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTenantStore } from "@/stores/tenant-store";
import { getDatasetConfig } from "@/lib/datasets/registry";
import { useDataset } from "@/hooks/use-dataset";
import { parseNumeric, monthToIndex } from "@/lib/utils/format";

export function Charts() {
  const { activeTenant } = useTenantStore();
  const config = getDatasetConfig(activeTenant);
  const { data, isLoading } = useDataset();

  // Bar chart: quantity by category
  const barData = useMemo(() => {
    if (!data?.records?.length || !config.categoryField || !config.numericFields[0]) return [];

    const grouped: Record<string, number[]> = {};
    data.records.forEach((r) => {
      const category = String(r[config.categoryField!] || "Other");
      const value = parseNumeric(r[config.numericFields[0]]);
      if (value > 0) {
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(value);
      }
    });

    return Object.entries(grouped)
      .map(([name, values]) => ({
        name: name.length > 20 ? name.substring(0, 18) + "…" : name,
        value: values.reduce((a, b) => a + b, 0) / values.length,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [data?.records, config]);

  // Area chart: trend over time
  const areaData = useMemo(() => {
    if (!data?.records?.length || !config.timeField || !config.numericFields[0]) return [];

    const grouped: Record<string, number[]> = {};
    data.records.forEach((r) => {
      const month = String(r[config.timeField!.month] || "");
      const year = String(r[config.timeField!.year] || "");
      const key = `${month.substring(0, 3)} ${year.slice(-2)}`;
      const value = parseNumeric(r[config.numericFields[0]]);
      if (value > 0 && month) {
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(value);
      }
    });

    return Object.entries(grouped)
      .map(([period, values]) => ({
        period,
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        total: values.reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => {
        const [mA, yA] = a.period.split(" ");
        const [mB, yB] = b.period.split(" ");
        const yearDiff = parseInt(yA || "0") - parseInt(yB || "0");
        if (yearDiff !== 0) return yearDiff;
        return monthToIndex(mA || "") - monthToIndex(mB || "");
      })
      .slice(0, 12);
  }, [data?.records, config]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="skeleton h-64 rounded-xl" />
        <div className="skeleton h-64 rounded-xl" />
      </div>
    );
  }

  const colors = config.theme.chartColors;

  const tooltipStyle = {
    contentStyle: {
      background: "rgba(0,0,0,0.9)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      fontSize: "12px",
      color: "#fafafa",
    },
    labelStyle: { color: "#a1a1aa" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Bar Chart */}
      {barData.length > 0 && (
        <div className="glass rounded-xl p-4 gradient-border">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-zinc-300">
              Average by {config.categoryField?.replace(/_/g, " ")}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Top categories</p>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: "#a1a1aa", fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Area Chart */}
      {areaData.length > 0 && (
        <div className="glass rounded-xl p-4 gradient-border">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-zinc-300">Trend Over Time</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Average values by period</p>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors[0]} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={colors[0]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="period" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="avg" stroke={colors[0]} strokeWidth={2} fill="url(#gradient-area)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
