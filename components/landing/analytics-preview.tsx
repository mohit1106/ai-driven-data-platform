"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const previewData = [
  { name: "IOCL", value: 6245, fill: "#f97316" },
  { name: "RIL", value: 4691, fill: "#f59e0b" },
  { name: "BPCL", value: 1261, fill: "#eab308" },
  { name: "CPCL", value: 962, fill: "#d97706" },
  { name: "HPCL", value: 787, fill: "#ea580c" },
];

const counters = [
  { label: "Records Analyzed", target: 8510, suffix: "+" },
  { label: "Departments", target: 4, suffix: "" },
  { label: "Data Points", target: 25000, suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function AnalyticsPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="analytics" className="relative py-24 lg:py-32" ref={sectionRef}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/3 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Chart preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 gradient-border"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-medium text-zinc-300">
                  Top Refineries by Output
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Quantity in 000 Metric Tonnes
                </p>
              </div>
              <span className="text-xs text-zinc-600 px-2 py-1 rounded-md bg-white/5">
                Oct 2022
              </span>
            </div>
            <div className="h-64">
              {isInView && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={previewData} layout="vertical" barCategoryGap="20%">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "#71717a", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={50}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={1500}>
                      {previewData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* Right: Content + counters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm font-medium text-orange-400 mb-3 block">
                Live Analytics
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Real-time data from{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  data.gov.in
                </span>
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Connect directly to government open data APIs and visualize
                trends across petroleum production, public procurement, and
                more. Our analytics engine computes statistics in real-time.
              </p>
            </div>

            {/* Animated counters */}
            <div className="grid grid-cols-3 gap-6">
              {counters.map((counter) => (
                <div key={counter.label} className="glass rounded-xl p-4 text-center gradient-border">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    <AnimatedCounter
                      target={counter.target}
                      suffix={counter.suffix}
                    />
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {counter.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
