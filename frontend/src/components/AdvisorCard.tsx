import { motion } from 'framer-motion'
import { advisorRecommendations } from '../data/dashboardDemo'

const priorityStyles = {
  High: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
  Medium: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
  Low: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
} as const

type RecommendationItem =
  | string
  | {
      category?: string
      recommendation: string
      priority?: keyof typeof priorityStyles
    }

type AdvisorCardProps = {
  recommendations?: RecommendationItem[]
}

export default function AdvisorCard({ recommendations = advisorRecommendations }: AdvisorCardProps = {}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -4 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/55">Smart Advisor</p>
          <h3 className="mt-1 text-lg font-semibold">Priority actions</h3>
        </div>
        <div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-violet-200">
          AI ranked
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {recommendations.map((item, index) => {
          const recommendation = typeof item === 'string' ? { recommendation: item, priority: 'Low' as const } : item
          const title = typeof item === 'string' ? item : recommendation.recommendation
          const priority = (recommendation.priority ?? 'Low') as keyof typeof priorityStyles

          return (
            <motion.article
              key={`${title}-${index}`}
              whileHover={{ scale: 1.01, y: -3 }}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-white/8 bg-white/4 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-medium text-white">{typeof item === 'string' ? 'Recommendation' : recommendation.category ?? 'Recommendation'}</h4>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityStyles[priority]}`}>
                  {recommendation.priority ?? 'Low'}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/60">{title}</p>
            </motion.article>
          )
        })}
      </div>
    </motion.section>
  )
}