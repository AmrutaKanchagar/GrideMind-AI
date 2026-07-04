import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import { useSidebar } from '../hooks/useSidebar'

export default function MainLayout() {
  const sidebar = useSidebar(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid opacity-90" />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar isOpen={sidebar.isOpen} onClose={sidebar.close} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={sidebar.toggle} />
          <main className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mx-auto flex w-full max-w-[1600px] flex-col gap-6"
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}