import { qdrant } from "./qdrant.js";
import { generateEmbedding } from "./gemini.js";

const COLLECTION = "energy_memory";

export async function saveEnergyMemory(data) {
  const text = JSON.stringify(data);

  const vector = await generateEmbedding(text);

  await qdrant.upsert(COLLECTION, {
    points: [
      {
        id: Date.now(),
        vector,
        payload: data,
      },
    ],
  });
}

export async function searchSimilarEnergy(data) {
  const text = JSON.stringify(data);

  const vector = await generateEmbedding(text);

  const result = await qdrant.search(COLLECTION, {
    vector,
    limit: 5,
    with_payload: true,
  });

  return result;
}