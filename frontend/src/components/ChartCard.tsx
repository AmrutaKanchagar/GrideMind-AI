import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ChartCardProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export default function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="glass-panel overflow-hidden p-5"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/50">{subtitle}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/45">
          Live
        </div>
      </div>
      <div className="h-[290px]">{children}</div>
    </motion.section>
  )
}