import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useGridMindData } from '../context/GridMindDataContext'
import { buildDashboardMetrics, buildIndustryData, buildMonthlySeries, getReportSummary } from '../utils/report'

type SectionPageProps = {
  section: 'forecast' | 'weather' | 'solar' | 'battery' | 'carbon' | 'comparison' | 'advisor'
  title: string
  subtitle: string
}

export default function SectionPage({ section, title, subtitle }: SectionPageProps) {
  const { analysisInput, analysisReport, analysisStatus, analysisError, ensureDemoReport } = useGridMindData()

  useEffect(() => {
    void ensureDemoReport()
  }, [ensureDemoReport])

  const summary = useMemo(() => getReportSummary(analysisReport), [analysisReport])
  const metrics = useMemo(() => buildDashboardMetrics(analysisInput, analysisReport), [analysisInput, analysisReport])
  const series = useMemo(() => buildMonthlySeries(analysisInput, analysisReport), [analysisInput, analysisReport])
  const industryData = useMemo(() => buildIndustryData(analysisReport), [analysisReport])

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">{title}</p>
        <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
        <p className="mt-3 max-w-3xl text-white/60">{subtitle}</p>
      </motion.section>

      {analysisStatus === 'error' && !analysisReport ? <div className="glass-panel border-rose-400/20 bg-rose-400/10 p-5 text-rose-100">{analysisError ?? 'Could not load backend data.'}</div> : null}

      {analysisReport ? (
        <div className="grid gap-5 xl:grid-cols-3">
          {section === 'forecast' ? (
            <>
              <div className="glass-panel p-5 xl:col-span-2">
                <h2 className="text-lg font-semibold text-white">Future Prediction</h2>
                <div className="mt-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series}>
                      <defs>
                        <linearGradient id="sectionForecastFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.06} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
                      <Area type="monotone" dataKey="forecast" stroke="#38bdf8" fill="url(#sectionForecastFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <SidePanel title="Forecast summary" content={summary.forecastSummary} />
            </>
          ) : null}

          {section === 'weather' ? (
            <>
              <SidePanel title="Weather" content={analysisReport.weather ? `${analysisReport.weather.city} · ${analysisReport.weather.temperature}°C · ${analysisReport.weather.condition}` : 'Waiting for weather data'} />
              <SidePanel title="Weather impact" content={analysisReport.weatherImpact?.impact ?? 'No impact available yet.'} />
              <SidePanel title="Metrics" content={`${analysisReport.weatherImpact?.increase ?? 0}% expected increase`} />
            </>
          ) : null}

          {section === 'solar' ? (
            <>
              <SidePanel title="Recommended Capacity" content={analysisReport.solar ? `${analysisReport.solar.recommendedKW} kW` : '—'} />
              <SidePanel title="Payback" content={analysisReport.solar ? `${analysisReport.solar.paybackYears} years` : '—'} />
              <SidePanel title="Lifetime Savings" content={analysisReport.solar ? `$${analysisReport.solar.lifetimeSavings.toLocaleString()}` : '—'} />
            </>
          ) : null}

          {section === 'battery' ? (
            <>
              <SidePanel title="Recommended Storage" content={analysisReport.battery ? `${analysisReport.battery.recommendedBatteryKWh} kWh` : '—'} />
              <SidePanel title="Backup Hours" content={analysisReport.battery ? `${analysisReport.battery.expectedBackupHours} h` : '—'} />
              <SidePanel title="Estimated Cost" content={analysisReport.battery ? `$${analysisReport.battery.estimatedCost.toLocaleString()}` : '—'} />
            </>
          ) : null}

          {section === 'carbon' ? (
            <>
              <SidePanel title="Monthly CO₂" content={analysisReport.carbon ? `${Math.round(analysisReport.carbon.monthlyCO2)} kg` : '—'} />
              <SidePanel title="Trees Needed" content={analysisReport.carbon ? `${analysisReport.carbon.treesNeeded}` : '—'} />
              <SidePanel title="Green Score" content={analysisReport.carbon ? `${analysisReport.carbon.greenScore}` : '—'} />
            </>
          ) : null}

          {section === 'comparison' ? (
            <>
              <div className="glass-panel p-5 xl:col-span-2">
                <h2 className="text-lg font-semibold text-white">Industry Comparison</h2>
                <div className="mt-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={industryData} layout="vertical">
                      <CartesianGrid stroke="rgba(148,163,184,0.12)" horizontal={false} />
                      <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" tickLine={false} axisLine={false} width={120} />
                      <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
                      <Bar dataKey="value" radius={[0, 14, 14, 0]} fill="#38bdf8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <SidePanel title="Ranking" content={analysisReport.industryComparison?.ranking ?? '—'} />
            </>
          ) : null}

          {section === 'advisor' ? (
            <>
              {(analysisReport.advice ?? analysisReport.recommendations ?? []).slice(0, 3).map((item, index) => {
                const recommendation = typeof item === 'string' ? item : item.recommendation
                const priority = typeof item === 'string' ? 'Low' : item.priority ?? 'Low'

                return (
                  <div key={`${recommendation}-${index}`} className="glass-panel p-5">
                    <div className="flex items-center justify-between">
                      <h2 className="font-medium text-white">{typeof item === 'string' ? 'Recommendation' : item.category ?? 'Recommendation'}</h2>
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/58">{recommendation}</p>
                    <button className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-cyan-100">
                      Priority {priority}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
            </>
          ) : null}
        </div>
      ) : (
        <div className="glass-panel p-5 text-white/60">Loading live section data from the backend.</div>
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        {metrics.slice(0, 3).map((metric) => (
          <div key={metric.label} className="glass-panel p-5">
            <p className="text-sm text-white/55">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{metric.value.toString()}{metric.suffix ?? ''}</p>
            <p className="mt-2 text-sm text-cyan-200">{metric.delta}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SidePanel({ title, content }: { title: string; content: string }) {
  return (
    <div className="glass-panel p-5">
      <h2 className="font-medium text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/60">{content}</p>
    </div>
  )
}