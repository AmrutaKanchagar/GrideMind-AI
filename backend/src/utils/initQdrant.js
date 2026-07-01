import { qdrant } from "../services/qdrant.js";

export async function initQdrant() {
  try {
    const collections = await qdrant.getCollections();

    const exists = collections.collections.find(
      (c) => c.name === "energy_memory"
    );

    if (!exists) {
      await qdrant.createCollection("energy_memory", {
        vectors: {
          size: 768,
          distance: "Cosine",
        },
      });

      console.log("✅ energy_memory collection created");
    } else {
      console.log("✅ energy_memory already exists");
    }
  } catch (err) {
    console.error("❌ Qdrant init error:", err.message);
  }
}