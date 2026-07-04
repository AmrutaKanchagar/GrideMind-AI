import { motion } from 'framer-motion'
import { batterySnapshot } from '../data/dashboardDemo'

type BatteryCardProps = {
  battery?: {
    recommendedBatteryKWh: number
    expectedBackupHours: number
    estimatedCost: number
    recommendation: string
  }
}

export default function BatteryCard({ battery = batterySnapshot }: BatteryCardProps = {}) {
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
          <p className="text-sm text-white/55">Battery</p>
          <h3 className="mt-1 text-lg font-semibold">Backup resilience</h3>
        </div>
        <motion.div
          className="relative h-14 w-10 rounded-xl border border-emerald-300/20 bg-emerald-300/5 p-1"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute -top-1.5 left-1/2 h-1.5 w-3 -translate-x-1/2 rounded-full bg-emerald-300/70" />
          <motion.div
            className="h-full rounded-lg bg-gradient-to-b from-emerald-400 to-cyan-400"
            initial={{ height: '25%' }}
            animate={{ height: '82%' }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.4 }}
          />
        </motion.div>
      </div>
      <div className="mt-5 space-y-3 text-sm text-white/68">
        <Item label="Capacity" value={`${battery.recommendedBatteryKWh} kWh`} />
        <Item label="Backup Hours" value={`${battery.expectedBackupHours} h`} />
        <Item label="Cost" value={`$${battery.estimatedCost.toLocaleString()}`} />
        <Item label="Recommendation" value={battery.recommendation} />
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