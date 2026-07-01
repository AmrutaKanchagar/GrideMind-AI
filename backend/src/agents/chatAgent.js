import { askGemini } from "../services/gemini.js";

export async function askEnergyAssistant(question, context = {}) {
  const prompt = `
You are GridMind AI.

You are an expert Energy Consultant.

Answer the user's question using the provided energy report.

Energy Report:

${JSON.stringify(context, null, 2)}

User Question:

${question}

Rules:

- Give practical advice.
- Keep answers concise.
- Mention estimated savings when appropriate.
- Explain technical concepts in simple language.
`;

  try {
    return await askGemini(prompt);
  } catch (error) {
    return `I’m connected to the GridMind backend, but the AI service is currently unavailable. ${error instanceof Error ? error.message : "Please check your Gemini configuration."}`;
  }
}