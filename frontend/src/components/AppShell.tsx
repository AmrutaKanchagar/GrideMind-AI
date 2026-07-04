import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AnimatedBackground from './AnimatedBackground'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [accentMode, setAccentMode] = useState<'electric' | 'aurora'>('electric')

  useEffect(() => {
    document.documentElement.dataset.gridmindTheme = accentMode
  }, [accentMode])

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            accentMode={accentMode}
            onAccentToggle={() => setAccentMode((mode) => (mode === 'electric' ? 'aurora' : 'electric'))}
          />
          <main className="flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}