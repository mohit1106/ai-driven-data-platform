"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  Database,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

// Animated chart data
const chartData = [
  { month: "Apr", value: 2450, prev: 2200 },
  { month: "May", value: 2800, prev: 2400 },
  { month: "Jun", value: 3200, prev: 2600 },
  { month: "Jul", value: 2950, prev: 2800 },
  { month: "Aug", value: 3500, prev: 3000 },
  { month: "Sep", value: 3800, prev: 3200 },
  { month: "Oct", value: 4200, prev: 3500 },
  { month: "Nov", value: 4600, prev: 3700 },
  { month: "Dec", value: 4100, prev: 3900 },
];

// AI insight text for typewriter effect
const insightText =
  "📊 Key Insight: Crude oil processing increased by 18.4% in Q3 2022, with IOCL-PARADIP leading at 1,330 MT. The petroleum sector shows strong growth trends across major refineries, with BPCL and HPCL showing consistent output improvements.";

// Ticker data
const tickerItems = [
  { label: "IOCL Total", value: "6,245.22 MT", change: "+5.2%" },
  { label: "BPCL Mumbai", value: "1,261.03 MT", change: "+3.8%" },
  { label: "HPCL Visakh", value: "787.49 MT", change: "+2.1%" },
  { label: "RIL Total", value: "4,691.26 MT", change: "+7.4%" },
  { label: "CPCL Manali", value: "961.61 MT", change: "-1.2%" },
  { label: "IOCL Koyali", value: "1,323.40 MT", change: "+4.6%" },
  { label: "IOCL Haldia", value: "724.58 MT", change: "+1.9%" },
  { label: "IOCL Mathura", value: "794.59 MT", change: "+3.3%" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [chartReady, setChartReady] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(insightText.slice(0, index + 1));
      index++;
      if (index >= insightText.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setChartReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/3 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            <motion.div
              custom={0}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Analytics Platform
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            >
              Unlock Insights from{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                India&apos;s Public Data
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-lg text-zinc-400 max-w-xl leading-relaxed"
            >
              Explore government datasets across departments with intelligent
              visualizations, real-time analytics, and AI-driven insights.
              Built on data.gov.in open data APIs.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-medium text-white transition-all hover:shadow-xl hover:shadow-orange-500/25 hover:scale-[1.02]"
              >
                Explore Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#features"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-zinc-300 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
              >
                Learn More
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={4}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex gap-8 pt-4"
            >
              {[
                { icon: Database, label: "Datasets", value: "4+" },
                { icon: BarChart3, label: "Records", value: "8,500+" },
                { icon: TrendingUp, label: "Real-time", value: "Insights" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/5">
                    <stat.icon className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{stat.value}</div>
                    <div className="text-xs text-zinc-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Interactive demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-4"
          >
            {/* Chart card */}
            <div className="glass rounded-2xl p-6 gradient-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-300">
                    Crude Oil Processing Trend
                  </h3>
                  <p className="text-xs text-zinc-500">Monthly Output (000 MT)</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +18.4%
                </div>
              </div>
              <div className="h-48">
                {chartReady && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="gradient-hero" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(0,0,0,0.85)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        labelStyle={{ color: "#a1a1aa" }}
                      />
                      <Area type="monotone" dataKey="prev" stroke="rgba(255,255,255,0.1)" fill="none" strokeDasharray="4 4" />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#f97316"
                        strokeWidth={2}
                        fill="url(#gradient-hero)"
                        dot={false}
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* AI insight card */}
            <div className="glass rounded-2xl p-5 gradient-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/20">
                  <Sparkles className="h-3 w-3 text-violet-400" />
                </div>
                <span className="text-xs font-medium text-violet-400">
                  AI Insight
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                {displayedText}
                <span className="inline-block w-0.5 h-4 bg-violet-400 animate-pulse ml-0.5 align-text-bottom" />
              </p>
            </div>
          </motion.div>
        </div>

        {/* Data ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 overflow-hidden border-t border-b border-white/5 py-4"
        >
          <div className="flex animate-ticker whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-4 px-8 text-sm"
              >
                <span className="text-zinc-500">{item.label}</span>
                <span className="font-mono font-medium">{item.value}</span>
                <span
                  className={`font-mono text-xs ${
                    item.change.startsWith("+")
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-zinc-800">│</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
