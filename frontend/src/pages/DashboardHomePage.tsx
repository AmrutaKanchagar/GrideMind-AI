import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, Gauge, Sparkles } from 'lucide-react'
import AdvisorCard from '../components/AdvisorCard'
import BatteryCard from '../components/BatteryCard'
import CarbonCard from '../components/CarbonCard'
import ChartCard from '../components/ChartCard'
import MetricCard from '../components/MetricCard'
import SolarCard from '../components/SolarCard'
import StatusPanel from '../components/StatusPanel'
import WeatherCard from '../components/WeatherCard'
import { aiStatusItems, advisorRecommendations, batterySnapshot, carbonSnapshot, dashboardMetrics, forecastTrend, industryComparison, monthlySeries, solarSnapshot, solarSplit, weatherSnapshot } from '../data/dashboardDemo'

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden p-6"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Dashboard Widgets</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Reusable cards powered by local dummy data</h1>
            <p className="mt-3 text-white/60">
              Summary cards, charts, weather, solar ROI, battery, carbon, industry comparison, smart advisor, and an AI status panel - all animated and built with reusable card components.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard/analysis"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-electric via-cyan to-emerald px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                Open Analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#widgets"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
              >
                <Gauge className="h-4 w-4" />
                Jump to Widgets
              </a>
            </div>
          </div>

          <div className="grid min-w-[280px] gap-3 rounded-3xl border border-cyan-400/15 bg-cyan-400/10 p-5 text-sm">
            <HeroStat label="Status" value="Demo data" />
            <HeroStat label="Charts" value="Recharts" />
            <HeroStat label="Motion" value="Animated" />
            <HeroStat label="Cards" value="Reusable" />
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </section>

      <section id="widgets" className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Monthly Consumption" subtitle="Dummy usage trend with forecast overlay.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlySeries}>
              <defs>
                <linearGradient id="consumptionFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.82} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.06} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
              <Area type="monotone" dataKey="consumption" stroke="#38bdf8" strokeWidth={2} fill="url(#consumptionFill)" />
              <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Forecast + Risk Trend" subtitle="Projected demand and risk profile.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastTrend}>
              <defs>
                <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.78} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
              <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={2} fill="url(#forecastFill)" />
              <Area type="monotone" dataKey="risk" stroke="#f59e0b" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Solar ROI" subtitle="Split across solar, battery, and grid.">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={solarSplit} dataKey="value" nameKey="name" innerRadius={62} outerRadius={100} paddingAngle={5}>
                {solarSplit.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Industry Comparison" subtitle="Relative energy efficiency benchmark.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryComparison} layout="vertical">
              <CartesianGrid stroke="rgba(148,163,184,0.12)" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" tickLine={false} axisLine={false} width={110} />
              <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
              <Bar dataKey="value" radius={[0, 14, 14, 0]}>
                {industryComparison.map((entry, index) => (
                  <Cell key={entry.name} fill={['#38bdf8', '#8b5cf6', '#10b981', '#06b6d4', '#6366f1'][index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-4">
        <WeatherCard weather={weatherSnapshot.weather} impact={weatherSnapshot.impact} />
        <SolarCard solar={solarSnapshot} />
        <BatteryCard battery={batterySnapshot} />
        <CarbonCard carbon={carbonSnapshot} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <AdvisorCard recommendations={advisorRecommendations} />
        <StatusPanel title="Execution pulse" subtitle="Operational state for the current demo environment." items={aiStatusItems} />
      </section>
    </div>
  )
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
      <span>{label}</span>
      <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
        {value}
      </span>
    </div>
  )
}