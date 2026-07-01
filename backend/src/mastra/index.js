import { Mastra } from "@mastra/core";

import { energyWorkflow } from "./workflows/energyWorkflow.js";

export const mastra = new Mastra({
  workflows: {
    energyWorkflow,
  },
});