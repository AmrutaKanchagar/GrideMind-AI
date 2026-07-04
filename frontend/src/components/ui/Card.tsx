import { motion } from 'framer-motion'
import type { CardProps } from '../../types/navigation'
import { cn } from '../../utils/cn'

export default function Card({ title, description, children, className }: CardProps) {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className={cn('glass-panel-strong p-6', className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description ? <p className="mt-2 text-sm leading-6 text-white/60">{description}</p> : null}
        </div>
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </motion.section>
  )
}