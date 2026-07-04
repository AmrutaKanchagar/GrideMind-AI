import axios from 'axios'
import type {
  ChatResponse,
  EnergyAnalysisInput,
  EnergyAnalysisResponse,
  EnergyReport,
  PdfResponse,
  ScenarioResponse,
} from '../types/api'

export const gridMindApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

export async function requestEnergyAnalysis(input: EnergyAnalysisInput) {
  try {
    const response = await gridMindApi.post<EnergyAnalysisResponse>('/api/energy/analyze', input)
    return response.data
  } catch {
    const fallback = await gridMindApi.post<{ success: true; type: string; data: unknown }>('/api/dashboard/summary', input)

    return {
      success: true as const,
      timestamp: new Date().toISOString(),
      report: fallback.data.data as EnergyReport,
    }
  }
}

export async function requestChatAnswer(question: string, context: unknown) {
  const response = await gridMindApi.post<ChatResponse>('/api/chat', {
    question,
    context,
  })

  return response.data
}

export async function requestScenario(current: Record<string, unknown>, changes: Record<string, unknown>) {
  const response = await gridMindApi.post<ScenarioResponse>('/api/scenario', {
    current,
    changes,
  })

  return response.data
}

export async function requestPdf(report: unknown) {
  const response = await gridMindApi.post<PdfResponse>('/api/pdf', {
    report,
  })

  return response.data
}
