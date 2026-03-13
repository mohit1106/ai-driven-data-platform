import type { ApiField } from "@/types/api";
import { generateInsight } from "./gemini-client";

export interface ParsedQuery {
  filters: Record<string, string>;
  intent: string;
}

export async function parseNaturalLanguageQuery(
  query: string,
  fields: ApiField[]
): Promise<ParsedQuery | null> {
  const fieldDesc = fields
    .map((f) => `  - id: "${f.id}", name: "${f.name}", type: "${f.type}"`)
    .join("\n");

  const prompt = `You are a query parser for an Indian government data analytics platform.

Available dataset fields:
${fieldDesc}

User query: "${query}"

Extract filters from this natural language query. Return ONLY a valid JSON object with this exact structure:
{
  "filters": { "field_id": "value" },
  "intent": "brief description of what the user wants"
}

Rules:
- Only use field IDs from the available fields list above.
- Month values should be capitalized (e.g., "October", "January").
- Year values should be plain numbers as strings (e.g., "2022").
- If a field value is not clearly specified, do not include it.
- Return ONLY the JSON, no markdown, no code blocks, no extra text.`;

  try {
    const response = await generateInsight(prompt);
    if (!response) return null;

    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.filters || typeof parsed.filters !== "object") return null;

    // Validate filter keys against known fields
    const validFieldIds = new Set(fields.map((f) => f.id));
    const validFilters: Record<string, string> = {};

    for (const [key, value] of Object.entries(parsed.filters)) {
      if (validFieldIds.has(key) && value) {
        validFilters[key] = String(value);
      }
    }

    return {
      filters: validFilters,
      intent: parsed.intent || query,
    };
  } catch {
    return null;
  }
}
