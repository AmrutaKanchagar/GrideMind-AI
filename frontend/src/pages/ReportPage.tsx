import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Mail } from 'lucide-react'
import { useGridMindData } from '../context/GridMindDataContext'
import { getReportSummary } from '../utils/report'

export default function ReportPage() {
  const { analysisReport, analysisStatus, analysisError, pdfPath, pdfStatus, pdfError, ensureDemoReport, generatePdf } = useGridMindData()

  useEffect(() => {
    void ensureDemoReport()
  }, [ensureDemoReport])

  const summary = getReportSummary(analysisReport)

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Reports</p>
        <h1 className="mt-3 text-3xl font-semibold">Generated report and PDF export</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => void generatePdf(analysisReport)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-electric to-violet px-5 py-3 text-sm font-semibold text-white"
          >
            <Download className="h-4 w-4" />
            Generate PDF
          </button>
          <button
            onClick={() => void generatePdf(analysisReport)}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85"
          >
            <Mail className="h-4 w-4" />
            Generate for Email
          </button>
        </div>
      </motion.section>

      {analysisStatus === 'loading' && !analysisReport ? (
        <div className="glass-panel p-5 text-white/60">Loading the current report from the backend.</div>
      ) : null}

      {analysisStatus === 'error' && !analysisReport ? (
        <div className="glass-panel border-rose-400/20 bg-rose-400/10 p-5 text-rose-100">{analysisError ?? 'Could not load the report.'}</div>
      ) : null}

      {analysisReport ? (
        <section className="grid gap-4 xl:grid-cols-2">
          <motion.article className="glass-panel p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-cyan-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">{summary.title}</h3>
                <p className="mt-1 text-sm text-white/50">Risk {summary.riskScore}/100 · {summary.riskLevel}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/65">{summary.summary}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <KeyValue label="PDF Status" value={pdfStatus} />
              <KeyValue label="PDF Path" value={pdfPath ?? 'Not generated yet'} />
            </div>
            {pdfError ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">{pdfError}</div> : null}
          </motion.article>

          <motion.article className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white">Report Highlights</h3>
            <div className="mt-4 space-y-3">
              <KeyValue label="Energy Grade" value={summary.energyGrade} />
              <KeyValue label="Forecast" value={summary.forecastSummary} />
              <KeyValue label="Savings" value={summary.savingsEstimate} />
              <KeyValue label="Confidence" value={`${summary.confidence}%`} />
            </div>
          </motion.article>
        </section>
      ) : null}
    </div>
  )
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  )
}