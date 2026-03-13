import type { DatasetConfig } from "@/types/dataset";

export const datasets: Record<string, DatasetConfig> = {
  "crude-oil-processing": {
    id: "crude-oil-processing",
    datasetId: "8d3b6596-b09e-4077-aebf-425193185a5b",
    name: "Crude Oil Processed by Refineries",
    shortName: "Crude Oil Processing",
    description:
      "Monthly data on crude oil processed by various refineries across India",
    department: "Ministry of Petroleum and Natural Gas",
    org: [
      "Ministry of Petroleum and Natural Gas",
      "Petroleum Planning & Analysis Cell (PPAC)",
    ],
    icon: "Flame",
    theme: {
      primary: "hsl(25, 95%, 53%)",
      accent: "hsl(38, 92%, 50%)",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent",
      chartColors: ["#f97316", "#f59e0b", "#eab308", "#d97706", "#ea580c"],
    },
    numericFields: ["quantity_000_metric_tonnes_"],
    categoryField: "oil_companies_",
    timeField: { month: "_month_", year: "year" },
  },
  "petroleum-products": {
    id: "petroleum-products",
    datasetId: "8b75d7c2-814b-4eb2-9698-c96d69e5f128",
    name: "Production of Petroleum Products by Refineries & Fractionators",
    shortName: "Petroleum Products",
    description:
      "Monthly production data of various petroleum products by refineries and fractionators",
    department: "Ministry of Petroleum and Natural Gas",
    org: [
      "Ministry of Petroleum and Natural Gas",
      "Petroleum Planning & Analysis Cell (PPAC)",
    ],
    icon: "Droplets",
    theme: {
      primary: "hsl(160, 84%, 39%)",
      accent: "hsl(142, 71%, 45%)",
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent",
      chartColors: ["#10b981", "#22c55e", "#14b8a6", "#059669", "#34d399"],
    },
    numericFields: ["quantity_000_metric_tonnes_"],
    categoryField: "products",
    timeField: { month: "month", year: "year" },
  },
  "crude-oil-production": {
    id: "crude-oil-production",
    datasetId: "7932c3ed-c88d-4e0c-bc39-17e3e3170483",
    name: "Monthly Indigenous Crude Oil Production",
    shortName: "Crude Oil Production",
    description:
      "Monthly indigenous crude oil production data by company across India",
    department: "Ministry of Petroleum and Natural Gas",
    org: [
      "Ministry of Petroleum and Natural Gas",
      "Petroleum Planning & Analysis Cell (PPAC)",
    ],
    icon: "Factory",
    theme: {
      primary: "hsl(217, 91%, 60%)",
      accent: "hsl(199, 89%, 48%)",
      gradient: "from-blue-500 via-sky-500 to-cyan-500",
      bgGradient: "from-blue-500/10 via-sky-500/5 to-transparent",
      chartColors: ["#3b82f6", "#0ea5e9", "#06b6d4", "#2563eb", "#38bdf8"],
    },
    numericFields: ["quantity_000_metric_tonnes_"],
    categoryField: "company_name",
    timeField: { month: "month", year: "year" },
  },
  "public-procurement": {
    id: "public-procurement",
    datasetId: "fbf7f636-5926-41d5-b168-b030c3415a5c",
    name: "Assam Public Procurement Data 2020-21",
    shortName: "Public Procurement",
    description:
      "Public procurement data from Assam covering tenders, contracts, and government purchases",
    department: "Finance Department, Assam",
    org: [
      "Assam",
      "Finance Department, Assam",
      "Assam Society for Comprehensive Financial Management System (AS-CFMS)",
    ],
    icon: "FileText",
    theme: {
      primary: "hsl(263, 70%, 50%)",
      accent: "hsl(280, 65%, 60%)",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      bgGradient: "from-violet-500/10 via-purple-500/5 to-transparent",
      chartColors: ["#8b5cf6", "#a855f7", "#d946ef", "#7c3aed", "#c084fc"],
    },
    numericFields: ["tender_value_amount", "tender_numberoftenderers", "tender_tenderperiod_durationindays"],
    categoryField: "buyer_name",
    timeField: undefined,
  },
};

export const datasetList = Object.values(datasets);

export function getDatasetConfig(id: string): DatasetConfig {
  const config = datasets[id];
  if (!config) {
    throw new Error(`Dataset "${id}" not found in registry`);
  }
  return config;
}

export const DEFAULT_TENANT = "crude-oil-processing";
