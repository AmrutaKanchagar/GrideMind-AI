import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid opacity-90" />
      <motion.div
        className="absolute left-[-10%] top-[-12%] h-[26rem] w-[26rem] rounded-full bg-electric/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-8%] top-[14%] h-[22rem] w-[22rem] rounded-full bg-violet/20 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-12%] left-[20%] h-[20rem] w-[20rem] rounded-full bg-cyan/15 blur-[120px]"
        animate={{ x: [0, 26, 0], y: [0, -18, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_32%)]" />
    </div>
  )
}