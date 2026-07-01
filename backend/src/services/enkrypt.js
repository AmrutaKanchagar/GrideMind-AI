import axios from "axios";

export async function validateWithEnkrypt(text) {
  try {
    const response = await axios.post(
      "https://api.enkryptai.com/guardrails/detect",
      {
        text,
        detectors: {
          bias: {
            enabled: true
          },
          policy_violation: {
            enabled: true
          },
          toxicity: {
            enabled: true
          },
          injection_attack: {
            enabled: true
          }
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.ENKRYPT_API_KEY
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Enkrypt Error:", error.response?.data || error.message);

    return {
      summary: {},
      details: {},
      error: true
    };
  }
}