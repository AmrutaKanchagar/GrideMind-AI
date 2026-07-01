import express from "express";
import { runEnergyWorkflow } from "../mastra/runWorkflow.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const result = await runEnergyWorkflow(req.body);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;