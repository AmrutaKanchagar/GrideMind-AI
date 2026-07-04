export type MenuItem = {
  label: string
  icon: string
  path: string
}

export type SummaryMetric = {
  label: string
  value: number | string
  suffix?: string
  delta: string
  accent: 'electric' | 'emerald' | 'violet' | 'cyan'
}

export type ChartPoint = {
  name: string
  consumption: number
  forecast: number
  risk: number
  solar: number
  carbon: number
}

export type Recommendation = {
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low'
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export type AnalysisStep = {
  label: string
  complete: boolean
}