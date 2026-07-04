import { Bell, Menu, MoonStar, Search, SunMedium } from 'lucide-react'
import { todayLabel } from '../utils/format'

type NavbarProps = {
  onMenuClick: () => void
  accentMode: 'electric' | 'aurora'
  onAccentToggle: () => void
}

export default function Navbar({ onMenuClick, accentMode, onAccentToggle }: NavbarProps) {
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
            <span>Search signals, reports, agents, insights...</span>
          </div>

          <div className="ml-auto hidden text-right lg:block">
            <p className="text-xs uppercase tracking-[0.32em] text-white/40">Current Date</p>
            <p className="mt-1 text-sm text-white/85">{todayLabel()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onAccentToggle}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80 transition hover:bg-white/10"
            aria-label="Toggle display mode"
          >
            {accentMode === 'electric' ? <MoonStar className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
          </button>
          <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80 transition hover:bg-white/10" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-violet text-sm font-semibold">
              GM
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Aarav Patel</p>
              <p className="text-xs text-white/45">Energy Ops Lead</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}