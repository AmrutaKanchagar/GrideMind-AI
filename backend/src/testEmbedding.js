import { generateEmbedding } from "./services/gemini.js";

const vector = await generateEmbedding("hello world");

console.log("Embedding size:", vector.length);