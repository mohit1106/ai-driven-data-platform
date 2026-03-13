import type { AnalyticsSummary, DatasetConfig } from "@/types/dataset";

export function buildInsightPrompt(
  config: DatasetConfig,
  summary: AnalyticsSummary,
  filters: Record<string, string>,
  sampleRows: Record<string, string | number>[]
): string {
  const filterLines = Object.entries(filters)
    .map(([k, v]) => `  - ${k}: ${v}`)
    .join("\n");

  const statsLines = Object.entries(summary.numericStats)
    .map(
      ([field, stats]) =>
        `  - ${field}: mean=${stats.mean.toFixed(2)}, median=${stats.median.toFixed(2)}, min=${stats.min.toFixed(2)}, max=${stats.max.toFixed(2)}, sum=${stats.sum.toFixed(2)}`
    )
    .join("\n");

  const topCatLines = summary.topCategories
    .map((c) => `  - ${c.name}: ${c.count} records`)
    .join("\n");

  const sampleJson = JSON.stringify(sampleRows.slice(0, 15), null, 2);

  return `You are a data analyst specializing in Indian government datasets.

Dataset: ${config.name}
Department: ${config.department}
Organization: ${config.org.join(", ")}

${filterLines ? `Filters applied:\n${filterLines}` : "No filters applied."}

Summary Statistics:
  Total records in current view: ${summary.totalRecords}
${statsLines}

Top Categories:
${topCatLines}

Trend: ${summary.trend} (${summary.trendPercent.toFixed(1)}% change)

Sample Data (first 15 rows):
${sampleJson}

Provide 3-5 key insights about this data. Be specific with numbers and percentages.
Format each insight as a clear bullet point with a bold headline.
Include one actionable recommendation at the end.
Keep the response concise and professional.`;
}

export function buildChatPrompt(
  config: DatasetConfig,
  summary: AnalyticsSummary,
  filters: Record<string, string>,
  sampleRows: Record<string, string | number>[],
  chatHistory: { role: "user" | "assistant"; content: string }[],
  newQuestion: string
): string {
  const statsLines = Object.entries(summary.numericStats)
    .map(
      ([field, stats]) =>
        `  - ${field}: mean=${stats.mean.toFixed(2)}, median=${stats.median.toFixed(2)}, min=${stats.min.toFixed(2)}, max=${stats.max.toFixed(2)}, sum=${stats.sum.toFixed(2)}`
    )
    .join("\n");

  const topCatLines = summary.topCategories
    .map((c) => `  - ${c.name}: ${c.count} records`)
    .join("\n");

  const filterLines = Object.entries(filters)
    .map(([k, v]) => `  - ${k}: ${v}`)
    .join("\n");

  const sampleJson = JSON.stringify(sampleRows.slice(0, 10), null, 2);

  const historyBlock = chatHistory
    .slice(-10)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  return `You are a helpful data analyst chatbot for the Bharat Insight platform. You specialize in answering questions about Indian government datasets.

Dataset: ${config.name}
Department: ${config.department}

${filterLines ? `Active Filters:\n${filterLines}` : "No filters applied."}

Summary Statistics (current view: ${summary.totalRecords} records):
${statsLines}

Top Categories:
${topCatLines}

Trend: ${summary.trend} (${summary.trendPercent.toFixed(1)}% change)

Sample Data (10 rows):
${sampleJson}

${historyBlock ? `Previous conversation:\n${historyBlock}\n` : ""}
User: ${newQuestion}

Instructions:
- Answer the user's question using the data provided above.
- Be concise and specific. Use actual numbers from the data.
- If the user asks about data not in the sample, explain what's visible and suggest filters.
- Use markdown formatting (bold, bullet points) for readability.
- Keep answers under 200 words unless more detail is specifically requested.`;
}
