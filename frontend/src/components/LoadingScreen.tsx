import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import type { AnalysisStep } from '../types/dashboard'

type LoadingScreenProps = {
  steps: AnalysisStep[]
}

export default function LoadingScreen({ steps }: LoadingScreenProps) {
  const completedSteps = steps.filter((step) => step.complete).length
  const progress = Math.round((completedSteps / Math.max(1, steps.length)) * 100)

  return (
    <section className="glass-panel-strong relative overflow-hidden p-6">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_24%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_30%)]"
        animate={{ opacity: [0.7, 1, 0.72] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">AI Thinking</p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">Generating Report...</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
            GridMind is sequencing weather, historical memory, carbon, solar, battery, prediction, and industry signals before the final report appears.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative grid h-16 w-16 place-items-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 shadow-[0_0_40px_rgba(34,211,238,0.18)]"
          >
            <div className="absolute inset-2 rounded-2xl border border-white/10" />
            <Sparkles className="h-7 w-7" />
          </motion.div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200">
            Gemini Reasoning
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Progress</p>
            <p className="mt-2 text-sm text-white/70">
              {completedSteps} of {steps.length} stages complete
            </p>
          </div>
          <p className="text-sm font-medium text-emerald-200">{progress}%</p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45 }}
            className="h-full rounded-full bg-gradient-to-r from-electric via-cyan to-emerald"
          />
        </div>
      </div>

      <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-2xl border p-4 transition ${step.complete ? 'border-emerald-400/20 bg-emerald-400/10' : 'border-white/10 bg-white/5'}`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={step.complete ? { scale: [1, 1.04, 1] } : {}}
                transition={{ duration: 2, repeat: step.complete ? Infinity : 0, ease: 'easeInOut' }}
                className={`grid h-10 w-10 place-items-center rounded-xl ${step.complete ? 'bg-emerald-400/20 text-emerald-200' : 'border border-white/10 bg-white/10 text-white/70'}`}
              >
                <CheckCircle2 className={`h-5 w-5 ${step.complete ? 'opacity-100' : 'opacity-60'}`} />
              </motion.div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Step {index + 1}</p>
                <p className="mt-1 text-sm font-medium text-white">{step.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-9 w-9 place-items-center rounded-xl bg-white/5"
        >
          <Sparkles className="h-4.5 w-4.5 text-cyan-300" />
        </motion.div>
        <p className="text-sm">The AI is connecting weather, memory, carbon, solar, battery, prediction, and industry signals.</p>
      </div>
    </section>
  )
}