import { qdrant } from "../services/qdrant.js";

export async function createCollection() {
  try {
    const collections = await qdrant.getCollections();

    const exists = collections.collections.find(
      (c) => c.name === "energy_memory"
    );

    if (exists) {
      console.log("energy_memory already exists");
      return;
    }

    await qdrant.createCollection("energy_memory", {
      vectors: {
        size: 768,
        distance: "Cosine",
      },
    });

    console.log("energy_memory collection created ✅");
  } catch (err) {
    console.error("Collection error:", err);
  }
}