import express from "express";
import { analyzeEnergy } from "../agents/energyAgent.js";
import { detectAnomalies } from "../utils/anomalyEngine.js";

const router = express.Router();

/**
 * SUMMARY DASHBOARD
 */
router.post("/summary", async (req, res) => {
  const data = req.body;

  const result = await analyzeEnergy(data);

  res.json({
    success: true,
    type: "summary",
    data: result
  });
});

/**
 * RISK DASHBOARD
 */
router.post("/risk", async (req, res) => {
  const data = req.body;

  const anomalies = detectAnomalies(data);

  res.json({
    success: true,
    type: "risk",
    data: {
      risk_level:
        data.billAmount > 3000
          ? "HIGH"
          : data.billAmount > 1500
          ? "MEDIUM"
          : "LOW",
      anomalies
    }
  });
});

/**
 * TREND SIMULATION (for charts)
 */
router.post("/trends", async (req, res) => {
  const base = req.body.monthlyUnits || 200;

  const trend = Array.from({ length: 6 }, (_, i) => ({
    month: `Month ${i + 1}`,
    usage: base + Math.floor(Math.random() * 100 - 40)
  }));

  res.json({
    success: true,
    type: "trend",
    data: trend
  });
});

export default router;