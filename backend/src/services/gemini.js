import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

// Text generation model
const model = genAI.getGenerativeModel({
  model: DEFAULT_MODEL,
});

// Embedding model
const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

// Generate text
export async function askGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw error;
  }
}

// Generate embeddings
export async function generateEmbedding(text) {
  try {
    const result = await embeddingModel.embedContent(text);

    return result.embedding.values;
  } catch (error) {
    console.error("Embedding Error:", error.message);
    throw error;
  }
}