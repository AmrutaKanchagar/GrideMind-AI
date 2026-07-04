import type { SummaryMetric } from '../types/dashboard'

export const dashboardMetrics: SummaryMetric[] = [
  { label: 'Monthly Usage', value: 18420, suffix: ' kWh', delta: '+6.2%', accent: 'electric' },
  { label: 'Savings', value: 48200, suffix: ' USD', delta: '+12.4%', accent: 'emerald' },
  { label: 'Risk Score', value: 27, suffix: '/100', delta: '-4.8%', accent: 'violet' },
  { label: 'Confidence', value: 94, suffix: '%', delta: '+1.8%', accent: 'cyan' },
]

export const monthlySeries = [
  { name: 'Jan', consumption: 118, forecast: 128, risk: 26 },
  { name: 'Feb', consumption: 124, forecast: 132, risk: 28 },
  { name: 'Mar', consumption: 130, forecast: 136, risk: 31 },
  { name: 'Apr', consumption: 141, forecast: 145, risk: 33 },
  { name: 'May', consumption: 149, forecast: 153, risk: 35 },
  { name: 'Jun', consumption: 158, forecast: 161, risk: 38 },
  { name: 'Jul', consumption: 166, forecast: 172, risk: 40 },
]

export const forecastTrend = [
  { name: 'Jan', forecast: 128, risk: 26 },
  { name: 'Feb', forecast: 132, risk: 28 },
  { name: 'Mar', forecast: 136, risk: 31 },
  { name: 'Apr', forecast: 145, risk: 33 },
  { name: 'May', forecast: 153, risk: 35 },
  { name: 'Jun', forecast: 161, risk: 38 },
  { name: 'Jul', forecast: 172, risk: 40 },
]

export const industryComparison = [
  { name: 'Manufacturing', value: 82 },
  { name: 'Warehousing', value: 74 },
  { name: 'Commercial', value: 68 },
  { name: 'Retail', value: 59 },
  { name: 'GridMind Site', value: 91 },
]

export const solarSplit = [
  { name: 'Solar', value: 52, color: '#38bdf8' },
  { name: 'Battery', value: 28, color: '#10b981' },
  { name: 'Grid', value: 20, color: '#8b5cf6' },
]

export const weatherSnapshot = {
  weather: {
    city: 'Bengaluru',
    temperature: 31,
    humidity: 64,
    condition: 'Partly cloudy',
  },
  impact: {
    impact: 'Mild heat pressure expected on peak load.',
    increase: 12,
  },
}

export const solarSnapshot = {
  installationCost: 148000,
  recommendedKW: 84,
  paybackYears: 3.8,
  lifetimeSavings: 742000,
}

export const batterySnapshot = {
  recommendedBatteryKWh: 220,
  expectedBackupHours: 6.4,
  estimatedCost: 126000,
  recommendation: 'Add 220 kWh storage for evening peak resilience.',
}

export const carbonSnapshot = {
  monthlyCO2: 5120,
  treesNeeded: 246,
  greenScore: 87,
  status: 'Strong carbon profile with room to improve off-peak usage.',
}

export const advisorRecommendations = [
  {
    category: 'Demand shift',
    recommendation: 'Move 14% of controllable load into the solar window to reduce peak exposure.',
    priority: 'High' as const,
  },
  {
    category: 'Battery dispatch',
    recommendation: 'Use 220 kWh storage for late-evening discharge and grid smoothing.',
    priority: 'Medium' as const,
  },
  {
    category: 'Carbon reduction',
    recommendation: 'Replace the remaining high-emission consumption blocks with off-peak sourcing.',
    priority: 'Low' as const,
  },
]

export const aiStatusItems = [
  { label: 'Analysis Engine', value: 'Online', tone: 'emerald' as const },
  { label: 'Weather Feed', value: 'Synced', tone: 'cyan' as const },
  { label: 'Forecast Model', value: 'Stable', tone: 'violet' as const },
  { label: 'Report Layer', value: 'Ready', tone: 'amber' as const },
]