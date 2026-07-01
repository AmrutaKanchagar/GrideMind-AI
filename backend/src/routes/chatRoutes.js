import express from "express";
import { askEnergyAssistant } from "../agents/chatAgent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, context } = req.body;

    const answer = await askEnergyAssistant(question, context);

    res.json({
      success: true,
      answer
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
});

export default router;