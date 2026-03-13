"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Trash2, Loader2, Bot, User } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { useTenantStore } from "@/stores/tenant-store";
import { getDatasetConfig } from "@/lib/datasets/registry";
import { useDataset } from "@/hooks/use-dataset";
import { summarizeDataset } from "@/lib/analytics/engine";
import { buildChatPrompt } from "@/lib/ai/insight-generator";
import { generateInsightStream, isGeminiAvailable } from "@/lib/ai/gemini-client";

export function Chatbot() {
  const {
    messages,
    isStreaming,
    chatOpen,
    addMessage,
    updateMessage,
    setStreaming,
    setChatOpen,
    clearMessages,
  } = useChatStore();

  const { activeTenant, activeFilters } = useTenantStore();
  const config = getDatasetConfig(activeTenant);
  const { data } = useDataset();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const summary = useMemo(() => {
    if (!data?.records?.length) return null;
    return summarizeDataset(data.records, config);
  }, [data?.records, config]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (chatOpen) inputRef.current?.focus();
  }, [chatOpen]);

  const handleSend = useCallback(async () => {
    const question = input.trim();
    if (!question || isStreaming || !summary || !data?.records) return;

    setInput("");
    addMessage("user", question);

    if (!isGeminiAvailable()) {
      addMessage(
        "assistant",
        "⚠️ Gemini API key not configured. Add `NEXT_PUBLIC_GEMINI_API_KEY` to `.env.local` to enable the chatbot."
      );
      return;
    }

    setStreaming(true);
    const assistantId = addMessage("assistant", "");

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const prompt = buildChatPrompt(
        config,
        summary,
        activeFilters,
        data.records,
        chatHistory,
        question
      );

      const stream = await generateInsightStream(prompt);
      if (!stream) {
        updateMessage(assistantId, "Failed to connect to AI. Please try again.");
        setStreaming(false);
        return;
      }

      const reader = stream.getReader();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += value;
        updateMessage(assistantId, fullText);
      }
    } catch (err) {
      updateMessage(
        assistantId,
        `Error: ${err instanceof Error ? err.message : "Failed to get response"}`
      );
    } finally {
      setStreaming(false);
    }
  }, [input, isStreaming, summary, data, messages, config, activeFilters, addMessage, updateMessage, setStreaming]);

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30 transition-shadow hover:shadow-2xl hover:shadow-orange-500/40"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col w-[420px] h-[560px] rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-zinc-950/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Data Assistant</h3>
                  <p className="text-[10px] text-zinc-500">
                    Ask about {config.shortName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearMessages}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 mb-4">
                    <Bot className="h-6 w-6 text-orange-400" />
                  </div>
                  <h4 className="text-sm font-medium text-zinc-300 mb-1">
                    Ask me anything about the data
                  </h4>
                  <p className="text-xs text-zinc-600 max-w-[250px]">
                    I can analyze trends, compare values, explain anomalies, and more using the currently loaded dataset.
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      "What are the top refineries?",
                      "Show me the trend analysis",
                      "Which month had the highest output?",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInput(suggestion);
                          inputRef.current?.focus();
                        }}
                        className="block w-full text-left text-xs text-zinc-500 hover:text-zinc-300 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/5"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-orange-500/20 text-orange-100 rounded-br-md"
                        : "bg-white/5 text-zinc-300 rounded-bl-md"
                    }`}
                  >
                    {msg.content || (
                      <span className="flex items-center gap-2 text-zinc-500">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Thinking...
                      </span>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/5 px-4 py-3 bg-zinc-950/80 backdrop-blur">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about this dataset..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isStreaming}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-300 placeholder-zinc-600 outline-none focus:border-orange-500/40 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white transition-all hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {isStreaming ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
