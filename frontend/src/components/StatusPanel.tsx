import { motion } from 'framer-motion'

type StatusTone = 'emerald' | 'cyan' | 'violet' | 'amber'

type StatusItem = {
  label: string
  value: string
  tone: StatusTone
}

type StatusPanelProps = {
  title: string
  subtitle: string
  items: StatusItem[]
}

const toneClasses: Record<StatusTone, string> = {
  emerald: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  cyan: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
  violet: 'border-violet-400/20 bg-violet-400/10 text-violet-200',
  amber: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
}

export default function StatusPanel({ title, subtitle, items }: StatusPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45 }}
      className="glass-panel overflow-hidden p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/55">AI Status Panel</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/50">{subtitle}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/45">
          Live
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
            <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${toneClasses[item.tone]}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}