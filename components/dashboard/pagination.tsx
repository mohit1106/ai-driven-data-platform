"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTenantStore } from "@/stores/tenant-store";
import { useDataset, PAGE_SIZE } from "@/hooks/use-dataset";
import { cn } from "@/lib/utils/cn";

export function Pagination() {
  const { page, setPage } = useTenantStore();
  const { data, isFetching } = useDataset();

  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasNext = page < totalPages - 1;
  const hasPrev = page > 0;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between rounded-xl glass px-4 py-3 gradient-border">
      <span className="text-xs text-zinc-500">
        Page {page + 1} of {totalPages}
        <span className="ml-2 text-zinc-600">
          ({total.toLocaleString("en-IN")} total records)
        </span>
      </span>

      <div className="flex items-center gap-1">
        <button
          disabled={!hasPrev || isFetching}
          onClick={() => setPage(page - 1)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-sm transition-colors",
            hasPrev && !isFetching
              ? "bg-white/5 text-zinc-300 hover:bg-white/10"
              : "text-zinc-600 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i;
          } else if (page < 3) {
            pageNum = i;
          } else if (page > totalPages - 4) {
            pageNum = totalPages - 5 + i;
          } else {
            pageNum = page - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              disabled={isFetching}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors",
                pageNum === page
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  : "text-zinc-400 hover:bg-white/10"
              )}
            >
              {pageNum + 1}
            </button>
          );
        })}

        <button
          disabled={!hasNext || isFetching}
          onClick={() => setPage(page + 1)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-sm transition-colors",
            hasNext && !isFetching
              ? "bg-white/5 text-zinc-300 hover:bg-white/10"
              : "text-zinc-600 cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
