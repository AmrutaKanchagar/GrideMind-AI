import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030712',
        surface: 'rgba(15, 23, 42, 0.72)',
        panel: 'rgba(17, 24, 39, 0.78)',
        electric: '#3b82f6',
        emerald: '#10b981',
        violet: '#8b5cf6',
        cyan: '#06b6d4',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59, 130, 246, 0.22), 0 24px 80px rgba(2, 8, 23, 0.75)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top left, rgba(59,130,246,0.22), transparent 28%), radial-gradient(circle at top right, rgba(139,92,246,0.2), transparent 24%), radial-gradient(circle at center, rgba(6,182,212,0.18), transparent 34%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.75' },
          '50%': { opacity: '1' },
        },
        borderShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        borderShift: 'borderShift 7s ease infinite',
      },
    },
  },
  plugins: [],
} satisfies Config