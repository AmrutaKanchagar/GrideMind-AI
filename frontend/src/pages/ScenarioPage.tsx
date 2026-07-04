import ScenarioSimulator from '../components/ScenarioSimulator'

export default function ScenarioPage() {
  return (
    <div className="space-y-6">
      <section className="glass-panel p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Scenario Simulator</p>
        <h1 className="mt-3 text-3xl font-semibold">Real-time backend scenario modeling</h1>
        <p className="mt-3 max-w-3xl text-white/60">
          Move the sliders and the backend recalculates bill impact, savings, risk, and grade instantly.
        </p>
      </section>

      <ScenarioSimulator />
    </div>
  )
}