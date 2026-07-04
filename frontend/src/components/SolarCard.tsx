import { motion } from 'framer-motion'
import { solarSnapshot } from '../data/dashboardDemo'

type SolarCardProps = {
  solar?: {
    installationCost: number
    recommendedKW: number
    paybackYears: number
    lifetimeSavings: number
  }
}

export default function SolarCard({ solar = solarSnapshot }: SolarCardProps = {}) {
  const roi = Math.max(0, Math.min(100, Math.round((1 / Math.max(0.1, solar.paybackYears)) * 100)))

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -6 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/55">Solar ROI</p>
          <h3 className="mt-1 text-lg font-semibold">{solar.recommendedKW} kW rooftop plan</h3>
        </div>
        <motion.div
          animate={{ rotate: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative grid h-16 w-16 place-items-center rounded-full border border-emerald-400/20 bg-emerald-400/5"
        >
          <div className="absolute inset-1 rounded-full border border-emerald-300/20" />
          <span className="text-sm font-semibold text-emerald-200">{roi}%</span>
        </motion.div>
      </div>
      <div className="mt-5 space-y-3 text-sm text-white/68">
        <Item label="Installation Cost" value={`$${solar.installationCost.toLocaleString()}`} />
        <Item label="Recommended Capacity" value={`${solar.recommendedKW} kW`} />
        <Item label="Payback Period" value={`${solar.paybackYears} years`} />
        <Item label="Lifetime Savings" value={`$${solar.lifetimeSavings.toLocaleString()}`} />
      </div>
    </motion.section>
  )
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
      <span className="text-white/45">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  )
}