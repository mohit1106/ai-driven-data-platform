import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI | null {
  if (!API_KEY) return null;
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
}

export function isGeminiAvailable(): boolean {
  return !!API_KEY;
}

export async function generateInsightStream(
  prompt: string
): Promise<ReadableStream<string> | null> {
  const ai = getGenAI();
  if (!ai) return null;

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContentStream(prompt);

  return new ReadableStream<string>({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(text);
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

export async function generateInsight(prompt: string): Promise<string | null> {
  const ai = getGenAI();
  if (!ai) return null;

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
