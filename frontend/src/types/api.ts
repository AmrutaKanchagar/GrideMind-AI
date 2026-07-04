export type EnergyAnalysisInput = {
  monthlyUnits: number
  billAmount: number
  peakUsageTime: string
  appliances: string[]
  locationType: string
  city?: string
}

export type EnergyFuturePrediction = {
  month: number
  predictedUnits: number
  predictedBill: number
}

export type EnergyReport = {
  report_title?: string
  summary?: string
  user_type?: string
  risk_score?: number
  risk_level?: string
  energy_grade?: string
  confidence_score?: number
  prediction?: string
  forecast_summary?: string
  recommendations?: Array<{ priority?: string; category?: string; recommendation: string } | string>
  savings_estimate?: string
  futurePrediction?: EnergyFuturePrediction[]
  weather?: {
    city: string
    temperature: number
    humidity: number
    condition: string
  }
  weatherImpact?: {
    impact?: string
    increase?: number
  }
  industryComparison?: {
    averageUnits: number
    difference: number
    efficiency: number
    ranking: string
    insight: string
  }
  solar?: {
    recommendedKW: number
    installationCost: number
    yearlySavings: number
    paybackYears: number
    lifetimeSavings: number
    recommendation: string
  }
  battery?: {
    recommendedBatteryKWh: number
    expectedBackupHours: number
    estimatedCost: number
    recommendation: string
  }
  carbon?: {
    monthlyCO2: number
    yearlyCO2: number
    treesNeeded: number
    greenScore: number
    status: string
  }
  advice?: Array<{
    priority: string
    category: string
    recommendation: string
  }>
  detectedAnomalies?: unknown[]
  validation?: unknown
  enkrypt?: unknown
  similarCases?: unknown[]
}

export type EnergyAnalysisResponse =
  | {
      success: true
      timestamp: string
      report: EnergyReport
    }
  | {
      success: false
      error: string
      raw_response?: string
    }

export type ChatResponse =
  | {
      success: true
      answer: string
    }
  | {
      success: false
      error: string
    }

export type ScenarioResponse =
  | {
      success: true
      scenario: Record<string, unknown>
    }
  | {
      success: false
      error: string
    }

export type PdfResponse =
  | {
      success: true
      pdf: string
    }
  | {
      success: false
      error: string
    }
