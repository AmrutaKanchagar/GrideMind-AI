import Card from '../components/ui/Card'

const blocks = [
  {
    title: 'Sidebar navigation',
    description: 'Persistent navigation for dashboard sections and future modules.',
  },
  {
    title: 'Top navbar',
    description: 'Search, notifications, status, and user identity sit in the shell.',
  },
  {
    title: 'Responsive content grid',
    description: 'Dashboard content can be composed from reusable cards and panels.',
  },
  {
    title: 'Animation layer',
    description: 'Framer Motion adds polished entry and hover motion without clutter.',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="glass-panel-strong p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Dashboard Shell</p>
        <h1 className="mt-3 text-3xl font-semibold">Architecture-first dashboard foundation</h1>
        <p className="mt-3 max-w-3xl text-white/60">
          The dashboard area is intentionally lightweight for now. It establishes layout slots, route nesting, and reusable presentation primitives for the future product.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {blocks.map((item) => (
          <Card key={item.title} title={item.title} description={item.description} />
        ))}
      </section>
    </div>
  )
}