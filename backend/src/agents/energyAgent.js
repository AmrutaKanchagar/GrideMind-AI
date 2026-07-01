import { saveEnergyMemory, searchSimilarEnergy } from "../services/memory.js";
import { askGemini } from "../services/gemini.js";
import { detectAnomalies } from "../utils/anomalyEngine.js";
import { validateAIReport } from "../services/safetyService.js";
import { validateWithEnkrypt } from "../services/enkrypt.js";
import { predictFutureConsumption } from "../prediction/predictionEngine.js";
import { getWeather } from "../services/weather.js";
import { calculateWeatherImpact } from "../utils/weatherImpact.js";
import { compareWithSimilarFactories } from "../services/comparisonService.js";
import { calculateSolarROI } from "../services/solarService.js";
import { recommendBattery } from "../services/batteryService.js";
import { calculateCarbonFootprint } from "../services/carbonService.js";
import { generateEnergyAdvice } from "../services/advisorService.js";

export async function analyzeEnergy(data) {
  try {

    // Save current request
    await saveEnergyMemory(data);

    // Retrieve similar cases
    const similar = await searchSimilarEnergy(data);

    // Detect anomalies
    const anomalies = detectAnomalies(data);

    // Future prediction
    const futurePrediction = predictFutureConsumption(data);

    // Get live weather
    const weather = await getWeather(data.city);

    // Calculate weather impact
    const weatherImpact = calculateWeatherImpact(weather);

    const comparison = compareWithSimilarFactories(
    data,
    similar
);

    // Calculate solar ROI
    const solar = calculateSolarROI(data);

    // Recommend battery storage
    const battery = recommendBattery(data);

    // Calculate carbon footprint
    const carbon = calculateCarbonFootprint(data);

    // Generate energy advice
    const advice = generateEnergyAdvice(data, {  solar,battery });

    // Build AI Prompt
    
    const prompt = `
You are GridMind AI.

Analyze this energy data.

Current Data:
${JSON.stringify(data, null, 2)}

Similar Historical Records:
${JSON.stringify(similar, null, 2)}

Detected Anomalies:
${JSON.stringify(anomalies, null, 2)}

Future Forecast:
${JSON.stringify(futurePrediction, null, 2)}

Weather Information:
${JSON.stringify(weather, null, 2)}

Weather Impact:
${JSON.stringify(weatherImpact, null, 2)}

Industry Comparison:
${JSON.stringify(comparison, null, 2)}

Solar:
${JSON.stringify(solar, null, 2)}

Battery:
${JSON.stringify(battery, null, 2)}

Carbon Footprint:
${JSON.stringify(carbon, null, 2)}

Energy Advice:
${JSON.stringify(advice, null, 2)}

Return ONLY JSON.

{
  "report_title":"AI Energy Intelligence Report",
  "summary":"",
  "user_type":"",
  "risk_score":0,
  "risk_level":"",
  "energy_grade":"",
  "confidence_score":0,
  "prediction":"",
  "forecast_summary":"",
  "recommendations":[],
  "savings_estimate":""
}

Rules:

- Only JSON
- No markdown
- No explanation
- Use weather while making prediction
`;

    // Generate AI Report
    const aiResponse = await askGemini(prompt);

    let report;

    try {
      report = JSON.parse(aiResponse);
    } catch (err) {
      return {
        success: false,
        error: "Gemini returned invalid JSON.",
        raw_response: aiResponse
      };
    }

    // Local validation
    const validation = validateAIReport(report);

    report.validation = validation;

    // Prediction Engine
    report.futurePrediction = futurePrediction;

    // Historical Memory
    report.similarCases = similar;

    // Weather
    report.weather = weather;

    // Weather Intelligence
    report.weatherImpact = weatherImpact;

    report.industryComparison = comparison;

    report.solar = solar;

    report.battery = battery;

    report.carbon = carbon;

    report.advice = advice;

    // Rule anomalies
    report.detectedAnomalies = anomalies;

    // Enkrypt Validation
    try {

      const enkrypt = await validateWithEnkrypt(
        JSON.stringify(report)
      );

      report.enkrypt = enkrypt;

    } catch {

      report.enkrypt = {
        status: "failed",
        message: "Enkrypt validation unavailable"
      };

    }

    return {

      success: true,

      timestamp: new Date().toISOString(),

      report

    };

  } catch (error) {

    console.error(error);

    return {

      success: false,

      error: error.message

    };

  }
}