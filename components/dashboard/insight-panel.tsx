"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, RefreshCw, AlertCircle } from "lucide-react";
import { useUiStore } from "@/stores/ui-store";
import { useTenantStore } from "@/stores/tenant-store";
import { getDatasetConfig } from "@/lib/datasets/registry";
import { useDataset } from "@/hooks/use-dataset";
import { summarizeDataset } from "@/lib/analytics/engine";
import { buildInsightPrompt } from "@/lib/ai/insight-generator";
import { generateInsightStream, isGeminiAvailable } from "@/lib/ai/gemini-client";

export function InsightPanel() {
  const { insightPanelOpen, setInsightPanelOpen } = useUiStore();
  const { activeTenant, activeFilters } = useTenantStore();
  const config = getDatasetConfig(activeTenant);
  const { data } = useDataset();

  const [insight, setInsight] = useState("");
  const [status, setStatus] = useState<"idle" | "thinking" | "analyzing" | "streaming" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    if (!data?.records?.length) return null;
    return summarizeDataset(data.records, config);
  }, [data?.records, config]);

  const generateInsights = useCallback(async () => {
    if (!data?.records?.length || !summary) return;
    if (!isGeminiAvailable()) {
      setStatus("error");
      setError("Gemini API key not configured. Add NEXT_PUBLIC_GEMINI_API_KEY to .env.local");
      return;
    }

    setInsight("");
    setError("");
    setStatus("thinking");

    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("analyzing");

      const prompt = buildInsightPrompt(config, summary, activeFilters, data.records);

      await new Promise((r) => setTimeout(r, 600));
      setStatus("streaming");

      const stream = await generateInsightStream(prompt);
      if (!stream) {
        throw new Error("Failed to create stream");
      }

      const reader = stream.getReader();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += value;
        setInsight(fullText);
      }

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to generate insights");
    }
  }, [data?.records, summary, config, activeFilters]);

  // Auto-generate on open or data change
  useEffect(() => {
    if (insightPanelOpen && data?.records?.length && status === "idle") {
      const timer = setTimeout(generateInsights, 500);
      return () => clearTimeout(timer);
    }
  }, [insightPanelOpen, data?.records?.length]);

  // Reset when tenant changes
  useEffect(() => {
    setInsight("");
    setStatus("idle");
    setError("");
  }, [activeTenant]);

  if (!insightPanelOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="glass rounded-xl gradient-border overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <span className="text-sm font-medium">AI Insights</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={generateInsights}
              disabled={status === "thinking" || status === "analyzing" || status === "streaming"}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-zinc-300 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${status === "streaming" ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setInsightPanelOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {/* Status messages */}
          {(status === "thinking" || status === "analyzing") && (
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <div className="h-4 w-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              {status === "thinking" ? "Thinking..." : "Analyzing dataset..."}
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-red-400">{error}</p>
                {!isGeminiAvailable() && (
                  <p className="text-zinc-500 text-xs mt-2">
                    To enable AI insights, set your Gemini API key in{" "}
                    <code className="text-zinc-400">.env.local</code>:
                    <br />
                    <code className="text-xs text-violet-400">
                      NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
                    </code>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Insight text */}
          {insight && (
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {insight}
                {status === "streaming" && (
                  <span className="inline-block w-0.5 h-4 bg-violet-400 animate-pulse ml-0.5 align-text-bottom" />
                )}
              </div>
            </div>
          )}

          {/* Idle state */}
          {status === "idle" && !insight && (
            <div className="text-center py-8">
              <Sparkles className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
              <p className="text-sm text-zinc-500">
                Click refresh to generate AI insights
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
