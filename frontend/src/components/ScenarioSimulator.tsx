import { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard from './ChartCard'
import { useGridMindData } from '../context/GridMindDataContext'
import { formatCurrency } from '../utils/format'

export default function ScenarioSimulator() {
  const { analysisInput, scenarioResult, scenarioStatus, scenarioError, runScenario } = useGridMindData()
  const [scenario, setScenario] = useState({
    monthlyUnits: analysisInput.monthlyUnits,
    electricityBill: analysisInput.billAmount,
    peakUsage: 82,
    solarInstalled: 46,
    batteryInstalled: 35,
  })

  useEffect(() => {
    setScenario((current) => ({
      ...current,
      monthlyUnits: analysisInput.monthlyUnits,
      electricityBill: analysisInput.billAmount,
    }))
  }, [analysisInput.billAmount, analysisInput.monthlyUnits])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void runScenario(
        {
          monthlyUnits: analysisInput.monthlyUnits,
          billAmount: analysisInput.billAmount,
          peakUsageTime: analysisInput.peakUsageTime,
          appliances: analysisInput.appliances,
          locationType: analysisInput.locationType,
        },
        {
          monthlyUnits: scenario.monthlyUnits,
          billAmount: scenario.electricityBill,
          peakUsage: scenario.peakUsage,
          solarInstalled: scenario.solarInstalled,
          batteryInstalled: scenario.batteryInstalled,
        },
      )
    }, 450)

    return () => window.clearTimeout(timeout)
  }, [analysisInput, runScenario, scenario])

  const chartData = useMemo(() => {
    const baseline = scenarioResult?.billAmount ? Number(scenarioResult.billAmount) : scenario.electricityBill
    const predicted = scenarioResult?.predictedBill ? Number(scenarioResult.predictedBill) : Math.max(6200, baseline - ((100 - scenario.peakUsage) * 0.38 + scenario.solarInstalled * 0.6 + scenario.batteryInstalled * 0.45) * 40)

    return [
      { name: 'Baseline', value: baseline },
      { name: 'Projected', value: predicted },
      { name: 'Savings', value: Number(scenarioResult?.savings ?? 0) },
    ]
  }, [scenario, scenarioResult])

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-panel p-5">
        <div>
          <p className="text-sm text-white/55">Scenario Simulator</p>
          <h3 className="mt-1 text-lg font-semibold">Real-time what-if analysis</h3>
        </div>

        <div className="mt-6 space-y-5">
          <Slider label="Monthly Units" value={scenario.monthlyUnits} min={10000} max={35000} step={100} onChange={(value) => setScenario((current) => ({ ...current, monthlyUnits: value }))} />
          <Slider label="Bill" value={scenario.electricityBill} min={4000} max={24000} step={100} onChange={(value) => setScenario((current) => ({ ...current, electricityBill: value }))} />
          <Slider label="Peak Usage" value={scenario.peakUsage} min={20} max={100} step={1} onChange={(value) => setScenario((current) => ({ ...current, peakUsage: value }))} />
          <Slider label="Solar Installed" value={scenario.solarInstalled} min={0} max={100} step={1} onChange={(value) => setScenario((current) => ({ ...current, solarInstalled: value }))} />
          <Slider label="Battery Installed" value={scenario.batteryInstalled} min={0} max={100} step={1} onChange={(value) => setScenario((current) => ({ ...current, batteryInstalled: value }))} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <MiniStat label="Projected Savings" value={formatCurrency(Math.max(0, Number(scenarioResult?.savings ?? 0)))} />
          <MiniStat label="Risk Delta" value={scenarioResult?.riskScore ? `${scenarioResult.riskScore}/100` : '—'} />
          <MiniStat label="Energy Grade" value={scenarioResult?.energyGrade?.toString?.() ?? '—'} />
        </div>

        {scenarioStatus === 'error' ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">{scenarioError ?? 'Unable to update scenario.'}</div> : null}
      </section>

      <ChartCard title="Budget Response" subtitle="The chart updates instantly as you move the sliders.">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="scenarioFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: 'rgba(2, 6, 23, 0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} fill="url(#scenarioFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm text-white/70">
        <span>{label}</span>
        <span>{value.toLocaleString()}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-400"
      />
    </label>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}