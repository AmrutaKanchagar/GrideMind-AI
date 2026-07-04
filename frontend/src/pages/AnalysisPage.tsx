import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import LoadingScreen from '../components/LoadingScreen'
import { useGridMindData } from '../context/GridMindDataContext'
import { buildDashboardMetrics, buildMonthlySeries } from '../utils/report'
import { analysisSteps } from '../data/mockData'

type AnalysisFormValues = {
  monthlyUnits: number
  billAmount: number
  peakUsageTime: 'morning' | 'afternoon' | 'evening'
  appliances: string
  locationType: 'home' | 'shop' | 'office' | 'factory' | 'industry'
  city: string
}

type AnalysisFormErrors = Partial<Record<keyof AnalysisFormValues, string>>

const SESSION_STORAGE_KEY = 'gridmind.analysis.form'

const defaultForm: AnalysisFormValues = {
  monthlyUnits: 18500,
  billAmount: 12800,
  peakUsageTime: 'evening',
  appliances: 'HVAC, compressors, pumps',
  locationType: 'factory',
  city: 'Bengaluru',
}

const peakUsageOptions = [
  { value: 'morning', label: 'Morning peak' },
  { value: 'afternoon', label: 'Afternoon peak' },
  { value: 'evening', label: 'Evening peak' },
] as const

const locationOptions = [
  { value: 'home', label: 'Home' },
  { value: 'shop', label: 'Shop' },
  { value: 'office', label: 'Office' },
  { value: 'factory', label: 'Factory' },
  { value: 'industry', label: 'Industry' },
] as const

export default function AnalysisPage() {
  const { analysisReport, analysisStatus, analysisError } = useGridMindData()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState<AnalysisFormValues>(() => loadSavedForm(location.state as { form?: AnalysisFormValues } | null))
  const [errors, setErrors] = useState<AnalysisFormErrors>({})
  const [touched, setTouched] = useState(false)
  const [showResultsPrompt, setShowResultsPrompt] = useState(false)

  useEffect(() => {
    if (analysisReport) {
      setShowResultsPrompt(true)
    }
  }, [analysisReport])

  useEffect(() => {
    if (location.state && 'form' in (location.state as Record<string, unknown>)) {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify((location.state as { form: AnalysisFormValues }).form))
    }
  }, [location.state])

  const appliancesList = useMemo(
    () => form.appliances.split(',').map((item) => item.trim()).filter(Boolean),
    [form.appliances],
  )

  const reportMetrics = useMemo(
    () => buildDashboardMetrics({ ...form, appliances: appliancesList }, analysisReport),
    [analysisReport, appliancesList, form],
  )
  const reportData = useMemo(
    () => buildMonthlySeries({ ...form, appliances: appliancesList }, analysisReport),
    [analysisReport, appliancesList, form],
  )

  const validate = (values: AnalysisFormValues) => {
    const nextErrors: AnalysisFormErrors = {}

    if (!Number.isFinite(values.monthlyUnits) || values.monthlyUnits < 1000) {
      nextErrors.monthlyUnits = 'Enter a valid monthly usage value.'
    }

    if (!Number.isFinite(values.billAmount) || values.billAmount < 500) {
      nextErrors.billAmount = 'Enter a valid bill amount.'
    }

    if (values.appliances.trim().length < 3) {
      nextErrors.appliances = 'List at least one appliance or load.'
    }

    if (values.city.trim().length < 2) {
      nextErrors.city = 'Enter a location or city name.'
    }

    return nextErrors
  }

  const updateField = <K extends keyof AnalysisFormValues>(field: K, value: AnalysisFormValues[K]) => {
    setForm((current) => {
      const updated = { ...current, [field]: value }
      if (touched) {
        setErrors(validate(updated))
      }
      return updated
    })
  }

  const handleAnalyze = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)

    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(form))
    navigate('/dashboard/analysis/thinking', { state: { form }, replace: false })
  }

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Energy Analysis</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Modern input form for AI energy analysis</h1>
            <p className="mt-3 max-w-3xl text-white/60">
              Fill in the inputs, press Analyze, and GridMind AI will take you to a dedicated thinking screen before any results appear.
            </p>
          </div>
          <div className="grid min-w-[260px] gap-3 rounded-3xl border border-cyan-400/15 bg-cyan-400/10 p-5 text-sm">
            <StatusRow label="Flow" value="Form → Thinking → Results" />
            <StatusRow label="Validation" value={Object.keys(errors).length > 0 ? 'Needs attention' : 'Ready'} />
            <StatusRow label="Output" value={analysisStatus === 'error' ? 'Retryable' : 'Backend report'} />
          </div>
        </div>
      </motion.section>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleAnalyze} className="glass-panel space-y-5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">Input Fields</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Analysis request</h2>
            </div>
            <Link to="/dashboard" className="text-sm text-white/60 transition hover:text-white">
              Back to dashboard
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Monthly Units"
              value={form.monthlyUnits}
              error={touched ? errors.monthlyUnits : undefined}
              helper="Enter the monthly consumption used for the analysis."
            >
              <input
                type="number"
                min={1000}
                max={100000}
                value={form.monthlyUnits}
                onChange={(event) => updateField('monthlyUnits', Number(event.target.value))}
                onBlur={() => setErrors(validate(form))}
                className={inputClass}
              />
            </Field>

            <Field
              label="Bill"
              value={form.billAmount}
              error={touched ? errors.billAmount : undefined}
              helper="Use the latest bill amount for a better recommendation."
            >
              <input
                type="number"
                min={500}
                max={200000}
                value={form.billAmount}
                onChange={(event) => updateField('billAmount', Number(event.target.value))}
                onBlur={() => setErrors(validate(form))}
                className={inputClass}
              />
            </Field>

            <Field label="Peak Usage" helper="Choose the time window where usage is highest.">
              <select
                value={form.peakUsageTime}
                onChange={(event) => updateField('peakUsageTime', event.target.value as AnalysisFormValues['peakUsageTime'])}
                className={inputClass}
              >
                {peakUsageOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-950 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Location"
              value={form.city}
              error={touched ? errors.city : undefined}
              helper="City or site name helps the weather and tariff models."
            >
              <div className="space-y-3">
                <input
                  type="text"
                  value={form.city}
                  onChange={(event) => updateField('city', event.target.value)}
                  onBlur={() => setErrors(validate(form))}
                  placeholder="Bengaluru"
                  className={inputClass}
                />
                <select
                  value={form.locationType}
                  onChange={(event) => updateField('locationType', event.target.value as AnalysisFormValues['locationType'])}
                  className={inputClass}
                >
                  {locationOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-950 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </Field>

            <Field
              label="Appliances"
              value={form.appliances}
              error={touched ? errors.appliances : undefined}
              helper="Comma-separated loads such as HVAC, pumps, compressors, or chillers."
            >
              <textarea
                value={form.appliances}
                onChange={(event) => updateField('appliances', event.target.value)}
                onBlur={() => setErrors(validate(form))}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <div className="rounded-3xl border border-dashed border-white/10 bg-white/4 p-4 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Before you analyze</p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                The analyze action will move you into a dedicated AI thinking screen so the report does not appear instantly.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-electric via-cyan to-violet px-6 py-4 text-sm font-semibold text-white transition hover:scale-[1.01]"
            >
              Analyze
            </button>
            {touched && Object.keys(errors).length > 0 ? <span className="text-sm text-rose-300">Fix the highlighted inputs first.</span> : null}
          </div>
        </motion.form>

        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="glass-panel p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">Validation Preview</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Preview label="Units" value={form.monthlyUnits.toLocaleString()} />
              <Preview label="Bill" value={`$${form.billAmount.toLocaleString()}`} />
              <Preview label="Peak" value={peakUsageOptions.find((item) => item.value === form.peakUsageTime)?.label ?? form.peakUsageTime} />
              <Preview label="Location" value={`${form.city} · ${locationOptions.find((item) => item.value === form.locationType)?.label ?? form.locationType}`} />
            </div>
          </div>

          <div className="glass-panel p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">Result readiness</p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              After analysis completes, the backend report will render below this form with charts, recommendations, and risk insights.
            </p>
            <div className="mt-5 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reportData}>
                  <defs>
                    <linearGradient id="analysisFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
                  <Area type="monotone" dataKey="forecast" stroke="#38bdf8" strokeWidth={2} fill="url(#analysisFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>
      </div>

      {analysisStatus === 'loading' && !analysisReport ? <LoadingScreen steps={analysisSteps.map((step, index) => ({ ...step, complete: index < 2 }))} /> : null}

      {!showResultsPrompt && analysisStatus === 'error' && !analysisReport ? (
        <div className="glass-panel border-rose-400/20 bg-rose-400/10 p-5 text-rose-100">
          {analysisError ?? 'The analysis API returned an error.'}
        </div>
      ) : null}

      {analysisReport ? (
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {reportMetrics.slice(0, 4).map((metric) => (
              <div key={metric.label} className="glass-panel p-5">
                <p className="text-sm text-white/55">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold">
                  {metric.value.toString()}
                  <span className="ml-1 text-sm text-white/55">{metric.suffix ?? ''}</span>
                </p>
                <p className="mt-2 text-sm text-cyan-200">{metric.delta}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold">Savings Projection</h2>
              <div className="mt-4 h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportData}>
                    <defs>
                      <linearGradient id="reportFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.85} />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
                    <Area type="monotone" dataKey="forecast" stroke="#38bdf8" fill="url(#reportFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold">Priority Recommendations</h2>
              <div className="mt-4 space-y-3">
                {(analysisReport?.advice ?? analysisReport?.recommendations ?? []).slice(0, 4).map((item, index) => {
                  const recommendation = typeof item === 'string' ? item : item.recommendation
                  const priority = typeof item === 'string' ? 'Low' : item.priority ?? 'Low'

                  return (
                    <div key={`${priority}-${index}`} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{priority}</p>
                      <p className="mt-2 font-medium text-white">{recommendation}</p>
                    </div>
                  )
                })}
                {(analysisReport?.advice ?? analysisReport?.recommendations ?? []).length === 0 ? (
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4 text-white/60">No recommendations returned yet.</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="glass-panel p-5">
            <h2 className="text-lg font-semibold">Final Risk Breakdown</h2>
            <div className="mt-5 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'Risk Drivers', weather: analysisReport?.weatherImpact?.increase ?? 0, load: analysisReport?.risk_score ?? 0, tariff: analysisReport?.carbon?.greenScore ?? 0, equipment: analysisReport?.confidence_score ?? 0 }]}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(2, 6, 23, 0.94)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }} />
                  {['weather', 'load', 'tariff', 'equipment'].map((key, index) => (
                    <Bar key={key} dataKey={key} stackId="a" radius={[12, 12, 0, 0]} fill={['#38bdf8', '#8b5cf6', '#10b981', '#06b6d4'][index]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>
      ) : null}
    </div>
  )
}

function loadSavedForm(locationState: { form?: AnalysisFormValues } | null): AnalysisFormValues {
  if (locationState?.form) {
    return locationState.form
  }

  try {
    const saved = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!saved) {
      return defaultForm
    }

    return { ...defaultForm, ...JSON.parse(saved) } as AnalysisFormValues
  } catch {
    return defaultForm
  }
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-white/80">
      <span>{label}</span>
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-200">{value}</span>
    </div>
  )
}

function Field({
  label,
  value,
  helper,
  error,
  children,
}: {
  label: string
  value?: string | number
  helper?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block rounded-3xl border border-white/10 bg-white/4 p-4 transition focus-within:border-cyan-400/30 focus-within:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          {helper ? <p className="mt-1 text-xs leading-5 text-white/45">{helper}</p> : null}
        </div>
        {typeof value !== 'undefined' ? <span className="text-xs uppercase tracking-[0.24em] text-white/40">{value}</span> : null}
      </div>
      <div className="mt-4">{children}</div>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </label>
  )
}

function Preview({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  )
}

const inputClass = 'w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40 focus:bg-slate-950/80'
