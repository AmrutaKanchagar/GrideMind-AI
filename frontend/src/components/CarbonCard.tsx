import { motion } from 'framer-motion'
import { carbonSnapshot } from '../data/dashboardDemo'

type CarbonCardProps = {
  carbon?: {
    monthlyCO2: number
    treesNeeded: number
    greenScore: number
    status: string
  }
}

export default function CarbonCard({ carbon = carbonSnapshot }: CarbonCardProps = {}) {
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
          <p className="text-sm text-white/55">Carbon Agent</p>
          <h3 className="mt-1 text-lg font-semibold">Emission reduction</h3>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300"
        >
          🌍
        </motion.div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
        <Stat label="CO₂" value={`${Math.round(carbon.monthlyCO2)} kg`} />
        <Stat label="Trees" value={`${carbon.treesNeeded}`} />
        <Stat label="Reduction" value={`${carbon.greenScore}%`} />
      </div>
      <div className="mt-5 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4 text-sm text-emerald-100/90">
        {carbon.status}
      </div>
    </motion.section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}