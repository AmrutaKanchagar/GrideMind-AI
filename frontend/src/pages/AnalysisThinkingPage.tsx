import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft } from 'lucide-react'
import LoadingScreen from '../components/LoadingScreen'
import { useGridMindData } from '../context/GridMindDataContext'
import { analysisSteps } from '../data/mockData'

type AnalysisFormValues = {
  monthlyUnits: number
  billAmount: number
  peakUsageTime: 'morning' | 'afternoon' | 'evening'
  appliances: string
  locationType: 'home' | 'shop' | 'office' | 'factory' | 'industry'
  city: string
}

const SESSION_STORAGE_KEY = 'gridmind.analysis.form'

const defaultForm: AnalysisFormValues = {
  monthlyUnits: 18500,
  billAmount: 12800,
  peakUsageTime: 'evening',
  appliances: 'HVAC, compressors, pumps',
  locationType: 'factory',
  city: 'Bengaluru',
}

export default function AnalysisThinkingPage() {
  const { runAnalysis, analysisStatus, analysisError } = useGridMindData()
  const navigate = useNavigate()
  const location = useLocation()
  const [stepState, setStepState] = useState(analysisSteps)
  const [statusText, setStatusText] = useState('Connecting weather, memory, industrial, carbon, solar, battery, and forecast signals.')
  const [isRunning, setIsRunning] = useState(true)
  const form = useMemo(() => loadForm(location.state as { form?: AnalysisFormValues } | null), [location.state])

  useEffect(() => {
    let cancelled = false
    const timers: number[] = []

    const run = async () => {
      setIsRunning(true)
      setStepState(analysisSteps.map((step) => ({ ...step, complete: false })))
      const labels = [
        'Reading weather and demand signals...',
        'Searching historical memory and industry benchmarks...',
        'Computing carbon, solar, and battery implications...',
        'Finalizing AI reasoning and report synthesis...',
      ]

      const analysisPromise = runAnalysis({
        monthlyUnits: form.monthlyUnits,
        billAmount: form.billAmount,
        peakUsageTime: form.peakUsageTime,
        appliances: form.appliances.split(',').map((item) => item.trim()).filter(Boolean),
        locationType: form.locationType,
        city: form.city,
      })

      analysisSteps.forEach((_, index) => {
        timers.push(
          window.setTimeout(() => {
            setStepState((current) => current.map((item, itemIndex) => (itemIndex <= index ? { ...item, complete: true } : item)))
            setStatusText(labels[Math.min(index, labels.length - 1)] ?? labels[labels.length - 1])
          }, index * 700),
        )
      })

      await analysisPromise
      if (cancelled) {
        return
      }

      window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
      setIsRunning(false)
      setStatusText('Report ready. Returning to the analysis page...')
      timers.push(
        window.setTimeout(() => {
          navigate('/dashboard/analysis', { replace: true })
        }, 900),
      )
    }

    void run()

    return () => {
      cancelled = true
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [form.billAmount, form.city, form.locationType, form.monthlyUnits, form.appliances, form.peakUsageTime, navigate, runAnalysis])

  if (analysisStatus === 'error' && !isRunning) {
    return (
      <div className="space-y-6">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-300/70">AI Thinking</p>
          <h1 className="mt-3 text-3xl font-semibold">Analysis failed</h1>
          <p className="mt-3 max-w-3xl text-white/60">{analysisError ?? 'The backend could not complete the analysis.'}</p>
          <button
            onClick={() => navigate('/dashboard/analysis', { replace: true })}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to form
          </button>
        </motion.section>
      </div>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">AI Thinking Screen</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">GridMind is thinking before the report appears</h1>
        <p className="mt-4 text-white/60">{statusText}</p>

        <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-white/4 p-5">
          <SummaryRow label="Monthly Units" value={form.monthlyUnits.toLocaleString()} />
          <SummaryRow label="Bill" value={`$${form.billAmount.toLocaleString()}`} />
          <SummaryRow label="Peak Usage" value={form.peakUsageTime} />
          <SummaryRow label="Location" value={`${form.city} · ${form.locationType}`} />
          <SummaryRow label="Appliances" value={form.appliances} />
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-sm text-cyan-100/90">
          <Sparkles className="h-5 w-5" />
          <p>The analysis screen is routed separately so results do not appear until the AI pass completes.</p>
        </div>
      </motion.section>

      <LoadingScreen steps={stepState} />
    </div>
  )
}

function loadForm(locationState: { form?: AnalysisFormValues } | null): AnalysisFormValues {
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-3 text-sm text-white/80">
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  )
}
