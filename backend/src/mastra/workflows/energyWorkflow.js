import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

import { analyzeEnergy } from "../../agents/energyAgent.js";

const analyzeStep = createStep({
  id: "energy-analysis",

  inputSchema: z.object({
    monthlyUnits: z.number(),
    billAmount: z.number(),
    peakUsageTime: z.string(),
    appliances: z.array(z.string()),
    locationType: z.string(),
  }),

  outputSchema: z.any(),

  execute: async ({ inputData }) => {
    const report = await analyzeEnergy(inputData);

    return report;
  },
});

export const energyWorkflow = createWorkflow({
  id: "gridmind-energy-workflow",

  inputSchema: z.object({
    monthlyUnits: z.number(),
    billAmount: z.number(),
    peakUsageTime: z.string(),
    appliances: z.array(z.string()),
    locationType: z.string(),
  }),

  outputSchema: z.any(),
})
.then(analyzeStep)
.commit();