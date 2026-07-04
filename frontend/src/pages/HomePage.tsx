import { Link } from 'react-router-dom'
import { ArrowRight, Bot, ChevronDown, Cpu, Layers3, Play, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'

const highlights = [
  {
    title: 'AI Decision Engine',
    description: 'Multi-agent intelligence for energy analysis, forecasting, and optimization.',
  },
  {
    title: 'Clean Product UX',
    description: 'Glassmorphism panels, premium motion, and startup-grade visual hierarchy.',
  },
  {
    title: 'Scalable Architecture',
    description: 'Reusable layout, routing, and UI primitives ready for real product growth.',
  },
]

const workflow = [
  {
    title: 'Capture Inputs',
    description: 'Enter utility, operational, and site data in a guided flow.',
  },
  {
    title: 'Run AI Analysis',
    description: 'Backend agents evaluate weather, consumption, risk, and ROI.',
  },
  {
    title: 'Deliver Insights',
    description: 'Export-ready dashboards, recommendations, and executive summaries.',
  },
]

const stack = ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Router DOM', 'Axios', 'Lucide React', 'Recharts']

const featureTiles = [
  { label: 'Energy Intelligence', value: 'Live AI orchestration' },
  { label: 'Forecasting', value: 'Predictive demand modeling' },
  { label: 'Carbon Visibility', value: 'Emission-aware decisioning' },
  { label: 'Solar + Battery', value: 'ROI-first capital planning' },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_24%),radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_38%)]" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-10 top-20 h-4 w-4 rounded-full bg-electric/80 blur-[2px]"
        animate={{ y: [0, -24, 0], x: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-12 top-32 h-5 w-5 rounded-full bg-emerald-400/80 blur-[2px]"
        animate={{ y: [0, 28, 0], x: [0, -12, 0], opacity: [0.35, 0.9, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-10 h-3 w-3 rounded-full bg-cyan-300/80 blur-[1px]"
        animate={{ y: [0, 18, 0], x: [0, -8, 0], opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <section className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Smart Energy Intelligence Platform
          </div>

          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              <span className="gradient-text">GridMind AI</span>
              <span className="block">turns energy data into decisions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="max-w-2xl text-lg leading-8 text-white/65 sm:text-xl"
            >
              A premium startup landing page for an AI energy platform. Analyze usage, forecast demand, compare industries, and generate executive-grade recommendations with a dark glassmorphism interface.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/dashboard/analysis"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-electric via-cyan to-emerald px-6 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.22)] transition hover:scale-[1.01] hover:brightness-110"
            >
              <Zap className="h-4.5 w-4.5" />
              Start Analysis
              <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#screenshots"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/88 transition hover:bg-white/10"
            >
              <Play className="h-4.5 w-4.5" />
              Watch Demo
            </a>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70">Startup-grade UI</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70">Framer Motion</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70">Responsive</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="animated-border rounded-[30px] bg-slate-950/70 p-4 shadow-glow backdrop-blur-2xl">
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-white/50">Live AI cockpit</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">Signal intelligence dashboard</h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-200">
                  Online
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {featureTiles.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.05 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{item.label}</p>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
                    </div>
                    <p className="mt-2 text-sm text-white/55">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/50">Performance Overview</p>
                  <p className="text-sm text-emerald-300">Premium motion + glass UI</p>
                </div>
                <div className="mt-4 grid h-44 grid-cols-4 items-end gap-3">
                  {[42, 68, 54, 84].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 0.15 + index * 0.08 }}
                      className="rounded-t-2xl bg-gradient-to-t from-electric via-cyan to-emerald shadow-[0_0_30px_rgba(59,130,246,0.18)]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-4 bottom-8 rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 shadow-glow backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">AI Status</p>
            <p className="mt-1 text-sm font-medium text-white">Analyzing energy patterns</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title} title={item.title} description={item.description} />
        ))}
      </section>

      <section id="features" className="mt-20 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card title="Features" description="Core product pillars designed for a commercial AI SaaS launch.">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Realtime dashboards', icon: Bot },
              { title: 'AI recommendations', icon: ShieldCheck },
              { title: 'Cost optimization', icon: Zap },
              { title: 'Smart forecasting', icon: Cpu },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-medium text-white">{item.title}</p>
                </div>
              )
            })}
          </div>
        </Card>
        <Card title="AI Workflow" description="A simple three-step product story that sells the platform.">
          <div className="space-y-3">
            {workflow.map((item, index) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric to-emerald text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="technology" className="mt-20 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card title="Technology Stack" description="The stack powering the frontend experience.">
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                {item}
              </span>
            ))}
          </div>
        </Card>

        <Card title="How It Works" description="The product journey from input to insight.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Input your energy data or connect the source systems.',
              'The AI layer analyzes usage, risk, weather, and ROI.',
              'The platform returns clear actions, charts, and reports.',
            ].map((item, index) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Step {index + 1}</p>
                <p className="mt-3 text-sm leading-6 text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="screenshots" className="mt-20 space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Screenshots Placeholder</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Future product visuals go here</h2>
          </div>
          <ChevronDown className="hidden h-5 w-5 text-white/40 md:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card title="Hero mock" description="Reserved for dashboard screenshots, product shots, or embedded demo media.">
            <div className="grid min-h-64 place-items-center rounded-[24px] border border-dashed border-white/15 bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(16,185,129,0.08),rgba(139,92,246,0.1))] p-8 text-center">
              <div>
                <Layers3 className="mx-auto h-12 w-12 text-cyan-300/80" />
                <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/45">Screenshot area</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
                  Drop product screenshots, dashboard captures, or a motion demo here when the design is ready.
                </p>
              </div>
            </div>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Card title="Panel A" description="Placeholder for chart views or application imagery." />
            <Card title="Panel B" description="Placeholder for mobile captures or feature highlights." />
          </div>
        </div>
      </section>

      <footer className="mt-20 border-t border-white/10 pb-6 pt-8">
        <div className="flex flex-col gap-4 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>GridMind AI · AI-Powered Smart Energy Intelligence Platform</p>
          <p>Built as a premium startup landing page with a dark AI theme.</p>
        </div>
      </footer>
    </div>
  )
}