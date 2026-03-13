// Dataset configuration types

export interface TenantTheme {
  primary: string;
  accent: string;
  gradient: string;
  bgGradient: string;
  chartColors: string[];
}

export interface DatasetConfig {
  id: string;
  datasetId: string;
  name: string;
  shortName: string;
  description: string;
  department: string;
  org: string[];
  icon: string;
  theme: TenantTheme;
  numericFields: string[];
  categoryField?: string;
  timeField?: { month: string; year: string };
}

export interface AnalyticsSummary {
  totalRecords: number;
  numericStats: Record<
    string,
    {
      mean: number;
      median: number;
      min: number;
      max: number;
      sum: number;
    }
  >;
  topCategories: { name: string; count: number }[];
  trend: "up" | "down" | "stable";
  trendPercent: number;
}
