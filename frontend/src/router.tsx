import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import DashboardHomePage from './pages/DashboardHomePage'
import AnalysisPage from './pages/AnalysisPage'
import AnalysisThinkingPage from './pages/AnalysisThinkingPage'
import ChatPage from './pages/ChatPage'
import ReportPage from './pages/ReportPage'
import ScenarioPage from './pages/ScenarioPage'
import SectionPage from './pages/SectionPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: 'analysis', element: <AnalysisPage /> },
      { path: 'analysis/thinking', element: <AnalysisThinkingPage /> },
      { path: 'forecast', element: <SectionPage section="forecast" title="Forecast" subtitle="Predict future demand, usage patterns, and operational risk from the live analysis context." /> },
      { path: 'weather', element: <SectionPage section="weather" title="Weather" subtitle="Track the weather inputs that shape energy consumption, demand spikes, and grid pressure." /> },
      { path: 'solar', element: <SectionPage section="solar" title="Solar ROI" subtitle="Review solar capacity, payback period, and long-term savings for the selected site." /> },
      { path: 'battery', element: <SectionPage section="battery" title="Battery" subtitle="Inspect storage sizing, backup duration, and estimated capital cost recommendations." /> },
      { path: 'carbon', element: <SectionPage section="carbon" title="Carbon" subtitle="Measure emissions, green score, and decarbonization impact at a glance." /> },
      { path: 'comparison', element: <SectionPage section="comparison" title="Industry Comparison" subtitle="Benchmark the site against comparable industry performance levels." /> },
      { path: 'advisor', element: <SectionPage section="advisor" title="Smart Advisor" subtitle="Surface the highest-priority AI recommendations from the current analysis report." /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'scenario', element: <ScenarioPage /> },
      { path: 'reports', element: <ReportPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])