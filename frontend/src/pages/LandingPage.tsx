import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Cpu, PlayCircle, Rocket, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AnimatedBackground from '../components/AnimatedBackground'
import { useGridMindData } from '../context/GridMindDataContext'
import { buildMonthlySeries, getReportSummary } from '../utils/report'

const features = [
  { title: 'AI Energy Intelligence', copy: 'Multi-agent analysis across weather, memory, solar, carbon, battery, and forecasting.', icon: Cpu },
  { title: 'Executive Dashboard', copy: 'Commercial-grade reporting with premium charts, KPI cards, and operational visibility.', icon: BarChart3 },
  { title: 'Automated Workflow', copy: 'Analyze, think, and generate a polished final report in one guided flow.', icon: Rocket },
  { title: 'Decision Safety', copy: 'Prioritized recommendations, risk flags, and explainable reasoning for operators.', icon: ShieldCheck },
]

const workflow = ['Capture energy inputs', 'Run AI reasoning', 'Rank savings actions', 'Render live insights']
const stack = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'React Router DOM', 'Axios']

export default function LandingPage() {
  const navigate = useNavigate()
  const { analysisReport, analysisInput, ensureDemoReport } = useGridMindData()

  useEffect(() => {
    void ensureDemoReport()
  }, [ensureDemoReport])

  const summary = useMemo(() => getReportSummary(analysisReport), [analysisReport])
  const series = useMemo(() => buildMonthlySeries(analysisInput, analysisReport), [analysisInput, analysisReport])

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-white">
      <AnimatedBackground />
      <main className="relative z-10">
        <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12 sm:px-8 lg:px-10">
          <div className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200"
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Smart Energy Intelligence Platform
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mt-6 max-w-4xl text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="gradient-text">GridMind AI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl"
              >
                A commercial-grade energy intelligence experience for modern operations teams. Forecast demand, surface savings, benchmark carbon, and generate premium AI reports in seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <button
                  onClick={() => navigate('/dashboard/analysis')}
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-electric via-cyan to-violet px-6 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.25)] transition hover:scale-[1.02] hover:brightness-110"
                >
                  <Zap className="h-4.5 w-4.5" />
                  Start Analysis
                  <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  <PlayCircle className="h-4.5 w-4.5" />
                  Watch Demo
                </button>
              </motion.div>

              <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/45">
                <div className="h-px w-12 bg-white/20" />
                Scroll to explore
                <div className="h-px w-12 bg-white/20" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="animated-border relative rounded-[28px] bg-slate-950/70 p-4 shadow-glow backdrop-blur-2xl">
                <div className="rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_36%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96))] p-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm text-white/55">Live AI cockpit</p>
                      <h2 className="mt-1 text-xl font-semibold">{summary.title}</h2>
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200">
                      {analysisReport ? 'Connected' : 'Loading'}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <InfoCard title="Weather" value={analysisReport?.weather ? `${analysisReport.weather.city} · ${analysisReport.weather.condition}` : 'Waiting'} />
                    <InfoCard title="Risk" value={`${summary.riskScore}/100`} />
                    <InfoCard title="Solar" value={analysisReport?.solar ? `${analysisReport.solar.recommendedKW} kW` : 'Waiting'} />
                    <InfoCard title="Grade" value={summary.energyGrade} />
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/50">Energy signal</p>
                      <p className="text-sm text-emerald-300">{summary.savingsEstimate}</p>
                    </div>
                    <div className="mt-4 flex h-40 items-end gap-3">
                      {series.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(20, Math.min(100, (point.forecast / Math.max(1, analysisInput.billAmount)) * 100))}%` }}
                          transition={{ duration: 0.8, delay: index * 0.08 }}
                          className="flex-1 rounded-t-2xl bg-gradient-to-t from-electric via-cyan to-violet shadow-[0_0_30px_rgba(59,130,246,0.18)]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-5 bottom-10 rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 shadow-glow backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">AI Status</p>
                <p className="mt-1 text-sm font-medium">{summary.summary}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="glass-panel p-5"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{feature.copy}</p>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-panel p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">Workflow</p>
              <h2 className="mt-3 text-3xl font-semibold">A clean, premium analysis flow</h2>
              <div className="mt-6 space-y-4">
                {workflow.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/8 text-sm font-semibold text-cyan-200">
                      0{index + 1}
                    </div>
                    <p className="font-medium text-white/88">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="glass-panel p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">Tech Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">AI Architecture</p>
                <div className="mt-4 space-y-3 text-sm text-white/68">
                  <Row label="Ingest" value="Utility bills · Weather · IoT · Manual inputs" />
                  <Row label="Reason" value="Weather agent · Memory agent · Gemini reasoning" />
                  <Row label="Predict" value="Demand curves · Risk score · ROI analysis" />
                  <Row label="Deliver" value="Beautiful report · dashboard · export-ready insights" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-10 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
            <p>GridMind AI · AI-Powered Smart Energy Intelligence Platform</p>
            <p>Built for hackathons, ready to look like a commercial SaaS product.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/8 bg-white/4 p-4">
      <span className="text-white/45">{label}</span>
      <span className="text-right text-white/85">{value}</span>
    </div>
  )
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-white">{title}</p>
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
      </div>
      <p className="mt-2 text-sm text-white/55">{value}</p>
    </div>
  )
}