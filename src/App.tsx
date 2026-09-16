import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PresenterMode } from './engine/PresenterMode'
import { VIDEO_PATH, VIDEO_SLUG, videoRoutes } from './videos/registry'

const HomePage = lazy(() => import('./routes/HomePage'))
const WatchPage = lazy(() => import('./routes/WatchPage'))

function RouteFallback() {
  return <div style={{ width: '100vw', height: '100vh', background: '#f7f1e6' }} />
}

export default function App() {
  return (
    <PresenterMode>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={VIDEO_SLUG} element={<WatchPage />} />

          {/* Old public entry points remain harmless bookmarks, not separate products. */}
          <Route path="watch" element={<Navigate to={VIDEO_PATH} replace />} />
          <Route path="video-1" element={<Navigate to={VIDEO_PATH} replace />} />

          {/* Direct section routes stay for frame capture, render tooling and QA. */}
          {videoRoutes.map(({ slug, component: VideoComponent }) => (
            <Route key={slug} path={slug} element={<VideoComponent />} />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </PresenterMode>
  )
}
