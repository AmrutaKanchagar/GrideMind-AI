import express from "express";
import { simulateScenario } from "../services/scenarioService.js";

const router = express.Router();

router.post("/", (req, res) => {

    const { current, changes } = req.body;

    const result =
        simulateScenario(current, changes);

    res.json({
        success: true,
        scenario: result
    });

});

export default router;