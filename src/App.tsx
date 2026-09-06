import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PresenterMode } from './engine/PresenterMode'

const LibraryHome = lazy(() => import('./routes/LibraryHome'))
const LabDemoPage = lazy(() => import('./routes/LabDemoPage'))
const AttentionPage = lazy(() => import('./routes/attention/AttentionPage'))
const MoePage = lazy(() => import('./routes/moe/MoePage'))
const HermesAgentPage = lazy(() => import('./routes/hermes-agent/HermesAgentPage'))
const StyleGalleryPage = lazy(() => import('./routes/StyleGalleryPage'))

function RouteFallback() {
  return <div style={{ width: '100vw', height: '100vh', background: '#f7f1e6' }} />
}

export default function App() {
  return (
    <PresenterMode>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route index element={<LibraryHome />} />
          <Route path="lab/:demo" element={<LabDemoPage />} />
          <Route path="attention" element={<AttentionPage />} />
          <Route path="moe" element={<MoePage />} />
          <Route path="hermes-agent" element={<HermesAgentPage />} />
          <Route path="styles" element={<StyleGalleryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </PresenterMode>
  )
}
