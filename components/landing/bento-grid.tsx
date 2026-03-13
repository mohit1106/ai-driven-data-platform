"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Building2,
  Globe,
  Table2,
  MessageSquare,
  Command,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Driven Insights",
    description:
      "Google Gemini analyzes your filtered data and generates key insights, trends, and recommendations in real-time.",
    gradient: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    span: "lg:col-span-2",
  },
  {
    icon: Building2,
    title: "Multi-Tenant Architecture",
    description:
      "Switch between departments seamlessly. Each dataset gets its own theme, filters, and analytics context.",
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    span: "",
  },
  {
    icon: Globe,
    title: "Government Open Data",
    description:
      "Direct integration with data.gov.in APIs. Access petroleum, procurement, and production datasets.",
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    span: "",
  },
  {
    icon: Table2,
    title: "High-Performance Data Grid",
    description:
      "Virtualized rendering handles 100K+ rows at 60fps. Sort, filter, search, and navigate with keyboard shortcuts.",
    gradient: "from-orange-500 to-amber-500",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    span: "lg:col-span-2",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description:
      "Ask questions like \"Show October 2022 output\" and the dashboard auto-applies the right filters.",
    gradient: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
    span: "",
  },
  {
    icon: Command,
    title: "Command Palette",
    description:
      "Press Ctrl+K to instantly switch departments, toggle roles, search data, or trigger AI analysis.",
    gradient: "from-yellow-500 to-orange-500",
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-400",
    span: "",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function BentoGrid() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-orange-400 mb-3">
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              analyze data
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A comprehensive analytics toolkit built for exploring Indian
            government datasets with speed, intelligence, and clarity.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`group glass rounded-2xl p-6 gradient-border transition-all duration-300 hover:scale-[1.02] cursor-default ${feature.span}`}
            >
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.iconBg} mb-4`}
              >
                <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
              {/* Subtle gradient glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
