import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PresenterMode } from './engine/PresenterMode'
import { videoRoutes } from './videos/registry'

const LibraryHome = lazy(() => import('./routes/LibraryHome'))
const LabDemoPage = lazy(() => import('./routes/LabDemoPage'))
const StyleGalleryPage = lazy(() => import('./routes/StyleGalleryPage'))
const PaperCatalogue = lazy(() => import('./routes/PaperCatalogue'))
const WatchPage = lazy(() => import('./routes/WatchPage'))

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
          <Route path="styles" element={<StyleGalleryPage />} />
          <Route path="paper" element={<PaperCatalogue />} />
          <Route path="watch" element={<WatchPage />} />

          {videoRoutes.map(({ slug, component: VideoComponent }) => (
            <Route key={slug} path={slug} element={<VideoComponent />} />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </PresenterMode>
  )
}
