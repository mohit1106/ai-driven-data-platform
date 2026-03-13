"use client";

import { useState } from "react";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useTenantStore } from "@/stores/tenant-store";
import { useDatasetMeta } from "@/hooks/use-dataset";
import { parseNaturalLanguageQuery } from "@/lib/ai/query-parser";
import { isGeminiAvailable } from "@/lib/ai/gemini-client";
import { cn } from "@/lib/utils/cn";

export function AiQueryBar() {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastIntent, setLastIntent] = useState("");
  const { setFilter, clearFilters } = useTenantStore();
  const { data: meta } = useDatasetMeta();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !meta?.fields || isProcessing) return;

    setIsProcessing(true);
    setLastIntent("");

    try {
      const result = await parseNaturalLanguageQuery(query, meta.fields);
      if (result && Object.keys(result.filters).length > 0) {
        clearFilters();
        Object.entries(result.filters).forEach(([key, value]) => {
          setFilter(key, value);
        });
        setLastIntent(result.intent);
        setQuery("");
      } else {
        setLastIntent("Could not extract filters from your query. Try being more specific.");
      }
    } catch {
      setLastIntent("Failed to process query. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isGeminiAvailable()) return null;

  return (
    <div className="glass rounded-xl p-3 gradient-border">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 shrink-0">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <input
          type="text"
          placeholder="Ask about this data... (e.g., Show October 2022 data)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isProcessing}
          className="flex-1 bg-transparent text-sm text-zinc-300 placeholder-zinc-600 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!query.trim() || isProcessing}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg transition-colors shrink-0",
            query.trim()
              ? "bg-violet-500/20 text-violet-400 hover:bg-violet-500/30"
              : "text-zinc-600"
          )}
        >
          {isProcessing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" />
          )}
        </button>
      </form>
      {lastIntent && (
        <p className="text-xs text-zinc-500 mt-2 pl-9">{lastIntent}</p>
      )}
    </div>
  );
}
