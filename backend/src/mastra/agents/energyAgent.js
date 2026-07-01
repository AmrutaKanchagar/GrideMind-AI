import { saveEnergyMemory, searchSimilarEnergy } from "../services/memory.js";
import { askGemini } from "../services/gemini.js";
import { detectAnomalies } from "../utils/anomalyEngine.js";
import { validateAIReport } from "../services/safetyService.js";
import { validateWithEnkrypt } from "../services/enkrypt.js";
import { predictFutureConsumption } from "../prediction/predictionEngine.js";

export async function analyzeEnergy(data) {
  try {
    // Step 1: Save current request to Qdrant
    await saveEnergyMemory(data);

    // Step 2: Retrieve similar historical records
    const similar = await searchSimilarEnergy(data);

    // Step 3: Detect anomalies
    const anomalies = detectAnomalies(data);

    // Step 4: Generate future prediction
    const futurePrediction = predictFutureConsumption(data);

    // Step 5: Build AI prompt
    const prompt = `
You are GridMind AI, an expert Energy Intelligence Agent.

Analyze the following energy consumption data.

Current Data:
${JSON.stringify(data, null, 2)}

Similar Historical Records:
${JSON.stringify(similar, null, 2)}

Detected Rule-Based Anomalies:
${JSON.stringify(anomalies, null, 2)}

Future Forecast:
${JSON.stringify(futurePrediction, null, 2)}

Return ONLY valid JSON.

{
  "report_title": "AI Energy Intelligence Report",
  "summary": "",
  "user_type": "",
  "risk_score": 0,
  "risk_level": "",
  "energy_grade": "",
  "confidence_score": 0,
  "anomalies": [],
  "prediction": "",
  "forecast_summary": "",
  "recommendations": [],
  "savings_estimate": ""
}

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- Risk score between 0-100.
- Confidence score between 0-100.
- Use anomalies while generating recommendations.
- Explain future trend using the forecast.
`;

    // Step 6: Generate AI response
    const aiResponse = await askGemini(prompt);

    let report;

    try {
      report = JSON.parse(aiResponse);
    } catch (err) {
      return {
        success: false,
        error: "Gemini returned invalid JSON.",
        raw_response: aiResponse,
      };
    }

    // Step 7: Validation
    const validation = validateAIReport(report);
    report.validation = validation;

    // Step 8: Attach AI prediction
    report.futurePrediction = futurePrediction;

    // Step 9: Attach historical memory
    report.similarCases = similar;

    // Step 10: Attach anomalies
    report.detectedAnomalies = anomalies;

    // Step 11: Enkrypt Validation
    try {
      const enkryptResult = await validateWithEnkrypt(
        JSON.stringify(report)
      );

      report.enkrypt = enkryptResult;
    } catch (err) {
      report.enkrypt = {
        status: "failed",
        message: "Unable to validate with Enkrypt AI.",
      };
    }

    // Step 12: Final Response
    return {
      success: true,
      timestamp: new Date().toISOString(),
      report,
    };
  } catch (error) {
    console.error("Energy Agent Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}