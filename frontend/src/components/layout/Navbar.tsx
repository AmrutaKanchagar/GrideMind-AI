import { Bell, Menu, Search, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { navigationItems } from '../../constants/navigation'
import { todayLabel } from '../../utils/format'

type NavbarProps = {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation()

  const activeItem =
    navigationItems.find((item) => location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))) ?? navigationItems[0]

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenuClick}
          className="rounded-2xl border border-white/10 p-3 text-white/80 transition hover:bg-white/10 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="hidden min-w-[280px] items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 md:flex lg:min-w-[360px]">
            <Search className="h-4 w-4 text-white/40" />
            <span>Search dashboard, modules, reports, and analysis...</span>
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.32em] text-white/40">Current Page</p>
              <p className="mt-1 text-sm font-medium text-white/90">{activeItem.label}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.32em] text-white/40">Current Date</p>
              <p className="mt-1 text-sm text-white/85">{todayLabel()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.04 }} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80">
            <Sparkles className="h-5 w-5" />
          </motion.div>
          <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80 transition hover:bg-white/10" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          </button>
          <NavLink to="/" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-emerald text-sm font-semibold text-slate-950">
              GM
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">GridMind Team</p>
              <p className="text-xs text-white/45">Dashboard Mode</p>
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  )
}