export function formatNumber(value: number, decimals = 2): string {
  if (isNaN(value)) return "—";
  if (Math.abs(value) >= 1_000_000) {
    return (value / 1_000_000).toFixed(decimals) + "M";
  }
  if (Math.abs(value) >= 1_000) {
    return (value / 1_000).toFixed(decimals) + "K";
  }
  return value.toFixed(decimals);
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatIndianNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function parseNumeric(value: string | number): number {
  if (typeof value === "number") return value;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const MONTH_ORDER: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3,
  may: 4, june: 5, july: 6, august: 7,
  september: 8, october: 9, november: 10, december: 11,
};

export function monthToIndex(month: string): number {
  return MONTH_ORDER[month.toLowerCase()] ?? -1;
}

export function sortByMonthYear(
  a: { month: string; year: string },
  b: { month: string; year: string }
): number {
  const yearDiff = parseInt(a.year) - parseInt(b.year);
  if (yearDiff !== 0) return yearDiff;
  return monthToIndex(a.month) - monthToIndex(b.month);
}
