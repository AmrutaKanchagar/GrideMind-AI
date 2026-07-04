import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, PanelLeftClose, Menu, Sparkles, FileText, MessageSquare, SlidersHorizontal, Settings2, SunMedium, BatteryCharging, Wind, Leaf, TrendingUp, Brain } from 'lucide-react'
import { navigationItems } from '../../constants/navigation'
import { cn } from '../../utils/cn'

const iconMap = {
  Dashboard: LayoutDashboard,
  'Energy Analysis': Sparkles,
  Forecast: SlidersHorizontal,
  Weather: Wind,
  'Solar ROI': SunMedium,
  Battery: BatteryCharging,
  Carbon: Leaf,
  'Industry Comparison': TrendingUp,
  'Smart Advisor': Brain,
  'AI Chat': MessageSquare,
  'Scenario Simulator': SlidersHorizontal,
  Reports: FileText,
  Settings: Settings2,
} as const

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-white/10 bg-slate-950/90 px-4 py-5 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex items-center justify-between px-2 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-electric via-cyan to-emerald text-lg font-bold shadow-[0_0_32px_rgba(59,130,246,0.45)]">
              ⚡
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide text-white">GridMind AI</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Dashboard Command Center</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-white/70 transition hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Navigation</p>
          <p className="mt-2 text-sm leading-6 text-white/65">Scroll through the dashboard modules, with the current page highlighted and animated on hover.</p>
        </div>

        <nav className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-2">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.label as keyof typeof iconMap] ?? Menu
            const isExactDashboard = item.path === '/dashboard'

            return (
              <motion.div
                key={item.path}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <NavLink
                  to={item.path}
                  end={isExactDashboard}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition duration-200',
                      isActive ? 'text-white' : 'text-white/65 hover:bg-white/5 hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? <motion.span layoutId="sidebar-active-pill" className="absolute inset-0 rounded-2xl border border-cyan-400/20 bg-white/10 shadow-[0_0_0_1px_rgba(56,189,248,0.12)]" /> : null}
                      <span className="relative z-10 flex items-center gap-3">
                        <Icon className={cn('h-4.5 w-4.5 transition', isActive ? 'text-cyan-300' : 'text-white/70')} />
                        <span className="font-medium">{item.label}</span>
                      </span>
                    </>
                  )}
                </NavLink>
              </motion.div>
            )
          })}
        </nav>

        <div className="mt-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/6 to-white/3 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">System Status</p>
          <div className="mt-3 flex items-center justify-between text-sm text-white/75">
            <span>Live modules</span>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">Ready</span>
          </div>
        </div>
      </aside>

      {isOpen ? <button aria-label="Close overlay" onClick={onClose} className="fixed inset-0 z-30 bg-black/55 lg:hidden" /> : null}
    </>
  )
}