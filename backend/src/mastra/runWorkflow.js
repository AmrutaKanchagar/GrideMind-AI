import { energyWorkflow } from "./workflows/energyWorkflow.js";

export async function runEnergyWorkflow(input) {
  try {
    const run = await energyWorkflow.createRun();

    const result = await run.start({
      inputData: input,
    });

    return result;
  } catch (error) {
    console.error("Mastra Workflow Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}