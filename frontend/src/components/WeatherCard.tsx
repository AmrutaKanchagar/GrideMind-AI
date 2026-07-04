import { motion } from 'framer-motion'
import { CloudSun, Droplets, Gauge, Wind } from 'lucide-react'
import { weatherSnapshot } from '../data/dashboardDemo'

type WeatherCardProps = {
  weather?: {
    city: string
    temperature: number
    humidity: number
    condition: string
  }
  impact?: {
    impact: string
    increase?: number
  }
}

export default function WeatherCard({ weather = weatherSnapshot.weather, impact = weatherSnapshot.impact }: WeatherCardProps = {}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -6 }}
      className="glass-panel overflow-hidden p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/55">Weather Agent</p>
          <h3 className="mt-1 text-lg font-semibold">Energy-Impact Forecast</h3>
        </div>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
        >
          <CloudSun className="h-7 w-7" />
        </motion.div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <Stat label="Temp" value={`${Math.round(weather.temperature)}°C`} icon={<Gauge className="h-4 w-4" />} />
        <Stat label="Humidity" value={`${Math.round(weather.humidity)}%`} icon={<Droplets className="h-4 w-4" />} />
        <Stat label="City" value={weather.city} icon={<Wind className="h-4 w-4" />} />
        <Stat label="Impact" value={impact?.impact ?? weather.condition} icon={<span className="h-4 w-4 rounded-full bg-emerald-400" />} />
      </div>
      <div className="mt-5 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 text-sm text-cyan-100/90">
        {impact?.impact ?? 'Weather analysis is available from the backend.'}
      </div>
    </motion.section>
  )
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
      <div className="flex items-center gap-2 text-white/45">
        {icon}
        <span className="text-xs uppercase tracking-[0.28em]">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  )
}