import Card from '../components/ui/Card'

type FeaturePageProps = {
  title: string
  subtitle: string
}

export default function FeaturePage({ title, subtitle }: FeaturePageProps) {
  return (
    <div className="space-y-6">
      <section className="glass-panel-strong p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">{title}</p>
        <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
        <p className="mt-3 max-w-3xl text-white/60">{subtitle}</p>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card title="Panel 1" description="Reserved for the future feature body." />
        <Card title="Panel 2" description="Keep this route ready for real product content." />
        <Card title="Panel 3" description="Layout and spacing are already established." />
      </section>
    </div>
  )
}