import type { AnalysisStep, ChartPoint, MenuItem, Recommendation, SummaryMetric } from '../types/dashboard'

export const sidebarItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { label: 'Energy Analysis', icon: 'Sparkles', path: '/dashboard/analysis' },
  { label: 'Forecast', icon: 'TrendingUp', path: '/dashboard/forecast' },
  { label: 'Weather', icon: 'CloudSun', path: '/dashboard/weather' },
  { label: 'Solar ROI', icon: 'SunMedium', path: '/dashboard/solar' },
  { label: 'Battery', icon: 'BatteryCharging', path: '/dashboard/battery' },
  { label: 'Carbon', icon: 'Leaf', path: '/dashboard/carbon' },
  { label: 'Industry Comparison', icon: 'BarChart3', path: '/dashboard/comparison' },
  { label: 'Smart Advisor', icon: 'BrainCircuit', path: '/dashboard/advisor' },
  { label: 'AI Chat', icon: 'MessageSquareMore', path: '/dashboard/chat' },
  { label: 'Scenario Simulator', icon: 'SlidersHorizontal', path: '/dashboard/scenario' },
  { label: 'Reports', icon: 'FileText', path: '/dashboard/reports' },
  { label: 'Settings', icon: 'Settings2', path: '/dashboard/settings' },
]

export const summaryMetrics: SummaryMetric[] = [
  { label: 'Monthly Units', value: 18420, suffix: ' kWh', delta: '+8.4%', accent: 'electric' },
  { label: 'Electricity Bill', value: 12840, suffix: '', delta: '-12.1%', accent: 'emerald' },
  { label: 'Risk Score', value: 18, suffix: '/100', delta: '-6.0%', accent: 'violet' },
  { label: 'Energy Grade', value: 92, suffix: '/100', delta: '+4.2%', accent: 'cyan' },
  { label: 'Savings Estimate', value: 3520, suffix: ' /mo', delta: '+19.8%', accent: 'emerald' },
  { label: 'Carbon Emission', value: 14, suffix: ' tCO₂', delta: '-9.5%', accent: 'violet' },
]

export const chartSeries: ChartPoint[] = [
  { name: 'Jan', consumption: 62, forecast: 58, risk: 22, solar: 18, carbon: 28 },
  { name: 'Feb', consumption: 67, forecast: 61, risk: 25, solar: 23, carbon: 30 },
  { name: 'Mar', consumption: 63, forecast: 60, risk: 23, solar: 25, carbon: 27 },
  { name: 'Apr', consumption: 71, forecast: 66, risk: 27, solar: 29, carbon: 32 },
  { name: 'May', consumption: 69, forecast: 68, risk: 24, solar: 34, carbon: 29 },
  { name: 'Jun', consumption: 75, forecast: 71, risk: 29, solar: 38, carbon: 34 },
  { name: 'Jul', consumption: 79, forecast: 75, risk: 31, solar: 40, carbon: 36 },
]

export const recommendations: Recommendation[] = [
  {
    title: 'Shift peak loads to off-peak windows',
    description: 'Move HVAC pre-cooling and industrial batch processing to lower tariff hours.',
    priority: 'High',
  },
  {
    title: 'Install a 120 kW rooftop solar system',
    description: 'Projected payback is under 3.8 years with strong lifetime savings.',
    priority: 'High',
  },
  {
    title: 'Add battery reserve for critical loads',
    description: 'A 320 kWh battery improves resilience during grid variability and outages.',
    priority: 'Medium',
  },
  {
    title: 'Optimize compressor cycling',
    description: 'Minor control changes reduce wasted demand spikes without capex.',
    priority: 'Low',
  },
]

export const analysisSteps: AnalysisStep[] = [
  { label: 'Weather Analysis', complete: false },
  { label: 'Historical Memory Search', complete: false },
  { label: 'Industry Comparison', complete: false },
  { label: 'Carbon Analysis', complete: false },
  { label: 'Solar ROI', complete: false },
  { label: 'Battery Recommendation', complete: false },
  { label: 'Future Prediction', complete: false },
  { label: 'Gemini AI Reasoning', complete: false },
]