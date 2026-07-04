import { motion } from 'framer-motion'
import type { SummaryMetric } from '../types/dashboard'
import { formatNumber } from '../utils/format'

const accentMap = {
  electric: 'from-electric/90 to-cyan-400/60',
  emerald: 'from-emerald-400/90 to-cyan-300/50',
  violet: 'from-violet-400/90 to-fuchsia-400/50',
  cyan: 'from-cyan-400/90 to-electric/50',
} as const

type MetricCardProps = {
  metric: SummaryMetric
  index: number
}

export default function MetricCard({ metric, index }: MetricCardProps) {
  const valueDisplay = typeof metric.value === 'number' ? formatNumber(metric.value) : metric.value

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="glass-panel group relative overflow-hidden p-5"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentMap[metric.accent]} opacity-90`} />
      <p className="text-sm text-white/55">{metric.label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold tracking-tight text-white">
            {valueDisplay}
            <span className="text-base text-white/55">{metric.suffix ?? ''}</span>
          </p>
          <p className="mt-2 text-sm text-emerald-300">{metric.delta} vs last month</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-white/65 transition group-hover:bg-white/10 group-hover:text-white">
          <span className="h-3 w-3 rounded-full bg-gradient-to-tr from-white/90 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
        </div>
      </div>
    </motion.div>
  )
}