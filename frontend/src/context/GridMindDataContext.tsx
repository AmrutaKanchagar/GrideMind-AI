/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { EnergyAnalysisInput, EnergyAnalysisResponse, EnergyReport } from '../types/api'
import { requestEnergyAnalysis, requestPdf, requestScenario } from '../services/gridmindApi'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export const DEFAULT_ANALYSIS_INPUT: EnergyAnalysisInput = {
  monthlyUnits: 18500,
  billAmount: 12800,
  peakUsageTime: 'evening',
  appliances: ['HVAC', 'compressors', 'pumps'],
  locationType: 'factory',
  city: 'Bengaluru',
}

type GridMindDataContextValue = {
  analysisInput: EnergyAnalysisInput
  analysisReport: EnergyReport | null
  analysisStatus: RequestStatus
  analysisError: string | null
  scenarioResult: Record<string, unknown> | null
  scenarioStatus: RequestStatus
  scenarioError: string | null
  pdfPath: string | null
  pdfStatus: RequestStatus
  pdfError: string | null
  ensureDemoReport: () => Promise<EnergyReport | null>
  runAnalysis: (input: EnergyAnalysisInput) => Promise<EnergyReport | null>
  runScenario: (current: Record<string, unknown>, changes: Record<string, unknown>) => Promise<Record<string, unknown> | null>
  generatePdf: (report?: unknown) => Promise<string | null>
}

const GridMindDataContext = createContext<GridMindDataContextValue | undefined>(undefined)

export function GridMindDataProvider({ children }: { children: ReactNode }) {
  const [analysisInput, setAnalysisInput] = useState<EnergyAnalysisInput>(DEFAULT_ANALYSIS_INPUT)
  const [analysisReport, setAnalysisReport] = useState<EnergyReport | null>(null)
  const [analysisStatus, setAnalysisStatus] = useState<RequestStatus>('idle')
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  const [scenarioResult, setScenarioResult] = useState<Record<string, unknown> | null>(null)
  const [scenarioStatus, setScenarioStatus] = useState<RequestStatus>('idle')
  const [scenarioError, setScenarioError] = useState<string | null>(null)

  const [pdfPath, setPdfPath] = useState<string | null>(null)
  const [pdfStatus, setPdfStatus] = useState<RequestStatus>('idle')
  const [pdfError, setPdfError] = useState<string | null>(null)

  const demoRequestInFlight = useRef<Promise<EnergyReport | null> | null>(null)

  const runAnalysis = useCallback(async (input: EnergyAnalysisInput) => {
    setAnalysisStatus('loading')
    setAnalysisError(null)
    setAnalysisInput(input)

    try {
      const response = await requestEnergyAnalysis(input)

      if (!response.success) {
        throw new Error(response.error)
      }

      setAnalysisReport(response.report)
      setAnalysisStatus('success')

      return response.report
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to analyze energy data.'

      setAnalysisReport(null)
      setAnalysisStatus('error')
      setAnalysisError(message)

      return null
    }
  }, [])

  const ensureDemoReport = useCallback(async () => {
    if (analysisReport || analysisStatus === 'loading') {
      return analysisReport
    }

    if (!demoRequestInFlight.current) {
      demoRequestInFlight.current = runAnalysis(DEFAULT_ANALYSIS_INPUT).finally(() => {
        demoRequestInFlight.current = null
      })
    }

    return demoRequestInFlight.current
  }, [analysisReport, analysisStatus, runAnalysis])

  const runScenario = useCallback(async (current: Record<string, unknown>, changes: Record<string, unknown>) => {
    setScenarioStatus('loading')
    setScenarioError(null)

    try {
      const response = await requestScenario(current, changes)

      if (!response.success) {
        throw new Error(response.error)
      }

      setScenarioResult(response.scenario)
      setScenarioStatus('success')

      return response.scenario
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to run scenario simulation.'

      setScenarioResult(null)
      setScenarioStatus('error')
      setScenarioError(message)

      return null
    }
  }, [])

  const generatePdf = useCallback(async (report: unknown = analysisReport) => {
    if (!report) {
      setPdfError('No report available to export yet.')
      setPdfStatus('error')
      return null
    }

    setPdfStatus('loading')
    setPdfError(null)

    try {
      const response = await requestPdf(report)

      if (!response.success) {
        throw new Error(response.error)
      }

      setPdfPath(response.pdf)
      setPdfStatus('success')

      return response.pdf
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate PDF report.'

      setPdfPath(null)
      setPdfStatus('error')
      setPdfError(message)

      return null
    }
  }, [analysisReport])

  const value = useMemo<GridMindDataContextValue>(
    () => ({
      analysisInput,
      analysisReport,
      analysisStatus,
      analysisError,
      scenarioResult,
      scenarioStatus,
      scenarioError,
      pdfPath,
      pdfStatus,
      pdfError,
      ensureDemoReport,
      runAnalysis,
      runScenario,
      generatePdf,
    }),
    [
      analysisInput,
      analysisReport,
      analysisStatus,
      analysisError,
      scenarioResult,
      scenarioStatus,
      scenarioError,
      pdfPath,
      pdfStatus,
      pdfError,
      ensureDemoReport,
      runAnalysis,
      runScenario,
      generatePdf,
    ],
  )

  return <GridMindDataContext.Provider value={value}>{children}</GridMindDataContext.Provider>
}

export function useGridMindData() {
  const context = useContext(GridMindDataContext)

  if (!context) {
    throw new Error('useGridMindData must be used within GridMindDataProvider')
  }

  return context
}

export async function unwrapAnalysisResponse(response: EnergyAnalysisResponse) {
  if (!response.success) {
    throw new Error(response.error)
  }

  return response.report
}

export type { RequestStatus }
