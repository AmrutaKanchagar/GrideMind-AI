import express from "express";
import { analyzeEnergy } from "../agents/energyAgent.js";

const router = express.Router();

router.post("/demo", async (req, res) => {
  const result = await analyzeEnergy(req.body);

  res.json({
    success: true,
    data: result
  });
});

export default router;