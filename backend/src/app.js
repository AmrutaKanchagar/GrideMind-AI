import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import energyRoute from "./routes/energyRoute.js";
import demoRoute from "./routes/demoRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import { initQdrant } from "./utils/initQdrant.js";
import chatRoutes from "./routes/chatRoutes.js";
import scenarioRoutes from "./routes/scenarioRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/dashboard", dashboardRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/energy", energyRoute);
app.use("/api/demo", demoRoute);
app.use("/api/scenario", scenarioRoutes);
app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "GridMind AI running ⚡"
  });
});

initQdrant()
  .then(() => console.log("🧠 Qdrant ready"))
  .catch((err) => console.error("Qdrant init failed:", err.message));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});