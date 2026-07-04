import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Globe, ShieldCheck, Smartphone } from 'lucide-react'
import { useGridMindData } from '../context/GridMindDataContext'

export default function SettingsPage() {
  const { analysisStatus, analysisError, ensureDemoReport, pdfStatus, pdfPath } = useGridMindData()

  useEffect(() => {
    void ensureDemoReport()
  }, [ensureDemoReport])

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Settings</p>
        <h1 className="mt-3 text-3xl font-semibold">Platform preferences and environment status</h1>
      </motion.section>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="Dark Mode" subtitle="Premium night-first interface with ambient accents." icon={<MoonIcon />} value="Enabled" />
        <Card title="API Status" subtitle="Backend, weather, memory, and reasoning endpoints." icon={<ShieldCheck className="h-5 w-5" />} value={analysisStatus === 'error' ? 'Degraded' : 'Connected'} />
        <Card title="Version" subtitle="Current frontend release and build metadata." icon={<Smartphone className="h-5 w-5" />} value="v1.0.0" />
        <Card title="About" subtitle="Commercial-grade hackathon frontend for GridMind AI." icon={<Globe className="h-5 w-5" />} value={pdfPath ? 'PDF ready' : 'GridMind AI'} />
      </div>

      {analysisError ? <div className="glass-panel border-rose-400/20 bg-rose-400/10 p-5 text-rose-100">{analysisError}</div> : null}
      <div className="glass-panel p-5">
        <h2 className="text-lg font-semibold text-white">Backend endpoints</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <EndpointRow label="Energy analysis" value="POST http://localhost:3000/api/energy/analyze" />
          <EndpointRow label="Chat" value="POST http://localhost:3000/api/chat" />
          <EndpointRow label="Scenario" value="POST http://localhost:3000/api/scenario" />
          <EndpointRow label="PDF" value="POST http://localhost:3000/api/pdf" />
          <EndpointRow label="PDF status" value={pdfStatus} />
          <EndpointRow label="PDF path" value={pdfPath ?? 'Not generated yet'} />
        </div>
      </div>
    </div>
  )
}

function Card({ title, subtitle, icon, value }: { title: string; subtitle: string; icon: ReactNode; value: string }) {
  return (
    <motion.section whileHover={{ y: -4 }} className="glass-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-white/55">{subtitle}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-cyan-300">{icon}</div>
      </div>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
        {value}
      </div>
    </motion.section>
  )
}

function MoonIcon() {
  return <span className="text-lg">☾</span>
}

function EndpointRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-white/80">{value}</p>
    </div>
  )
}