import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  BatteryCharging,
  BrainCircuit,
  CloudSun,
  FileText,
  LayoutDashboard,
  Leaf,
  MessageSquareMore,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  SunMedium,
  TrendingUp,
  X,
} from 'lucide-react'
import { sidebarItems } from '../data/mockData'

const icons: Record<string, ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  CloudSun,
  SunMedium,
  BatteryCharging,
  Leaf,
  BarChart3,
  BrainCircuit,
  MessageSquareMore,
  SlidersHorizontal,
  FileText,
  Settings2,
}

type SidebarProps = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-slate-950/90 px-4 py-5 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-2 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-electric via-cyan to-violet text-lg font-bold shadow-[0_0_32px_rgba(59,130,246,0.45)]">
              ⚡
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">GridMind AI</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Energy Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-white/70 transition hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/80">System Status</p>
          <div className="mt-3 space-y-2 text-sm text-white/78">
            <div className="flex items-center justify-between">
              <span>AI Agents</span>
              <span className="text-emerald-300">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Prediction Engine</span>
              <span className="text-emerald-300">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Stream</span>
              <span className="text-cyan-300">Synced</span>
            </div>
          </div>
        </div>

        <nav className="scrollbar-thin flex h-[calc(100vh-240px)] flex-col gap-1 overflow-y-auto pr-2">
          {sidebarItems.map((item) => {
            const Icon = icons[item.icon] ?? LayoutDashboard
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white shadow-[0_0_0_1px_rgba(59,130,246,0.25)]'
                      : 'text-white/65 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4 text-white/75 transition group-hover:text-cyan-300" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>
      {open ? <button aria-label="Close overlay" onClick={onClose} className="fixed inset-0 z-30 bg-black/55 lg:hidden" /> : null}
    </>
  )
}