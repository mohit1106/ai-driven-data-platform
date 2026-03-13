"use client";

import { useMemo } from "react";
import { useTenantStore } from "@/stores/tenant-store";
import { useDatasetMeta } from "@/hooks/use-dataset";
import { X, Filter as FilterIcon } from "lucide-react";

export function FilterBar() {
  const { activeFilters, setFilter, removeFilter, clearFilters } = useTenantStore();
  const { data: meta } = useDatasetMeta();

  const filterableFields = useMemo(() => {
    if (!meta?.fields) return [];
    return meta.fields.filter((f) => f.type === "keyword" || f.type === "double");
  }, [meta?.fields]);

  const activeCount = Object.keys(activeFilters).length;

  return (
    <div className="glass rounded-xl px-4 py-3 gradient-border">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Label */}
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300 shrink-0">
          <FilterIcon className="h-4 w-4 text-zinc-500" />
          <span className="hidden xl:inline">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-[10px] font-bold text-orange-400">
              {activeCount}
            </span>
          )}
        </div>

        {/* Inline filter inputs */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {filterableFields.map((field) => (
            <div key={field.id} className="relative">
              <input
                type="text"
                placeholder={field.name}
                value={activeFilters[field.id] || ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setFilter(field.id, e.target.value);
                  } else {
                    removeFilter(field.id);
                  }
                }}
                className="w-36 xl:w-44 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 placeholder-zinc-600 outline-none transition-colors focus:border-orange-500/50 focus:bg-white/[0.07]"
              />
              {activeFilters[field.id] && (
                <button
                  onClick={() => removeFilter(field.id)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-zinc-200"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Active filter chips + clear */}
        {activeCount > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {Object.entries(activeFilters).map(([key, value]) => {
              const field = filterableFields.find((f) => f.id === key);
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 text-xs text-orange-300"
                >
                  {field?.name || key}: {value}
                  <button onClick={() => removeFilter(key)} className="ml-0.5 hover:text-orange-100">
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              );
            })}
            <button
              onClick={clearFilters}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
