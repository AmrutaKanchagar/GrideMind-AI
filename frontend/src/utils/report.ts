import type { EnergyAnalysisInput, EnergyReport } from '../types/api'

export function getReportSummary(report: EnergyReport | null) {
  const recommendations = report?.recommendations ?? report?.advice ?? []

  return {
    title: report?.report_title ?? 'AI Energy Intelligence Report',
    summary: report?.summary ?? 'Live backend analysis is loading.',
    riskScore: report?.risk_score ?? 0,
    riskLevel: report?.risk_level ?? 'Unknown',
    energyGrade: report?.energy_grade ?? '—',
    confidence: report?.confidence_score ?? 0,
    forecastSummary: report?.forecast_summary ?? 'Awaiting model output.',
    savingsEstimate: report?.savings_estimate ?? '—',
    recommendations,
  }
}

export function buildDashboardMetrics(input: EnergyAnalysisInput | null, report: EnergyReport | null) {
  const summary = getReportSummary(report)
  const weather = report?.weather
  const solar = report?.solar
  const carbon = report?.carbon

  const savingsMonthly = solar?.yearlySavings ? Math.round(solar.yearlySavings / 12) : 0

  return [
    {
      label: 'Monthly Units',
      value: input?.monthlyUnits ?? 0,
      suffix: ' kWh',
      delta: summary.forecastSummary,
      accent: 'electric' as const,
    },
    {
      label: 'Electricity Bill',
      value: input?.billAmount ?? 0,
      suffix: '',
      delta: summary.savingsEstimate,
      accent: 'emerald' as const,
    },
    {
      label: 'Risk Score',
      value: summary.riskScore,
      suffix: '/100',
      delta: summary.riskLevel,
      accent: 'violet' as const,
    },
    {
      label: 'Energy Grade',
      value: summary.energyGrade,
      suffix: '',
      delta: summary.energyGrade,
      accent: 'cyan' as const,
    },
    {
      label: 'Savings Estimate',
      value: savingsMonthly,
      suffix: ' /mo',
      delta: solar?.recommendation ?? summary.savingsEstimate,
      accent: 'emerald' as const,
    },
    {
      label: 'Carbon Emission',
      value: carbon?.monthlyCO2 ? Math.round(carbon.monthlyCO2) : 0,
      suffix: ' kgCO₂',
      delta: weather ? `${weather.city} · ${weather.condition}` : 'Awaiting weather data',
      accent: 'violet' as const,
    },
  ]
}

export function buildMonthlySeries(input: EnergyAnalysisInput | null, report: EnergyReport | null) {
  const futurePrediction = report?.futurePrediction ?? []
  const baseline = input?.billAmount ?? 0

  if (futurePrediction.length === 0) {
    return [
      { name: 'Now', consumption: baseline, forecast: baseline, risk: report?.risk_score ?? 0, solar: 0, carbon: report?.carbon?.monthlyCO2 ?? 0 },
    ]
  }

  return futurePrediction.map((item) => ({
    name: `${item.month}M`,
    consumption: Math.max(0, Math.round((item.predictedBill + baseline) / 2)),
    forecast: item.predictedBill,
    risk: Math.max(0, Math.min(100, Math.round((report?.risk_score ?? 0) + item.month * 1.5))),
    solar: report?.solar ? Math.min(100, Math.round((report.solar.recommendedKW / Math.max(1, input?.monthlyUnits ?? 1)) * 1000 * item.month)) : 0,
    carbon: report?.carbon ? Math.round(report.carbon.monthlyCO2 * (1 - item.month / 24)) : 0,
  }))
}

export function buildIndustryData(report: EnergyReport | null) {
  const comparison = report?.industryComparison
  const efficiency = comparison?.efficiency ?? 0
  const difference = comparison?.difference ?? 0
  const averageUnits = comparison?.averageUnits ?? 0

  return [
    { name: 'Your Facility', value: Math.max(0, averageUnits + difference) },
    { name: 'Industry Avg', value: averageUnits },
    { name: 'Efficiency', value: efficiency },
  ]
}

export function buildSolarSplit(report: EnergyReport | null) {
  const solar = report?.solar
  const battery = report?.battery
  const carbon = report?.carbon

  if (!solar) {
    return []
  }

  return [
    { name: 'Solar Capex', value: solar.installationCost, color: '#38bdf8' },
    { name: 'Battery Capex', value: battery?.estimatedCost ?? 0, color: '#8b5cf6' },
    { name: '25Y Savings', value: solar.lifetimeSavings, color: '#10b981' },
    { name: 'Carbon Gain', value: carbon?.treesNeeded ?? 0, color: '#06b6d4' },
  ]
}
