import express from "express";
import { generatePDF } from "../services/pdfService.js";

const router = express.Router();

router.post("/", (req, res) => {

    const report = req.body.report;

    const file = generatePDF(report);

    res.json({

        success: true,

        pdf: file

    });

});

export default router;