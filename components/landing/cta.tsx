"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, BarChart3 } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 p-12 lg:p-16 text-center"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(249, 115, 22, 0.08), transparent 60%), rgba(255,255,255,0.02)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-orange-500/10 blur-[100px]" />
          </div>

          <div className="relative space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to explore{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                India&apos;s data?
              </span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg">
              Dive into the dashboard and discover insights across 4
              government departments. No login required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 font-medium text-white transition-all hover:shadow-xl hover:shadow-orange-500/25 hover:scale-[1.02]"
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-medium text-zinc-300 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <BarChart3 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-zinc-400">
              Bharat<span className="text-orange-400">Insight</span>
            </span>
          </div>
          <p className="text-xs text-zinc-600">
            Built with Next.js, TanStack, Zustand & Google Gemini • Data from data.gov.in
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <span>Next.js 15</span>
            <span>TypeScript</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
