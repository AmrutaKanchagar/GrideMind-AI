import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6">
      <div className="glass-panel-strong w-full max-w-xl p-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-white/60">The requested route does not exist in the current architecture.</p>
        <Link to="/" className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-electric to-violet px-5 py-3 text-sm font-semibold text-white">
          Return Home
        </Link>
      </div>
    </div>
  )
}