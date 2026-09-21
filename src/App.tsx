import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PresenterMode } from './engine/PresenterMode'
import { VIDEO2_SLUG, video2Routes } from './videos/apollo-o1/video-2/registry'
import { VIDEO_PATH, VIDEO_SLUG, videoRoutes } from './videos/registry'

const HomePage = lazy(() => import('./routes/HomePage'))
const WatchPage = lazy(() => import('./routes/WatchPage'))
const CasefileCatalogue = lazy(() => import('./routes/CasefileCatalogue'))
const V2Library = lazy(() => import('./videos/apollo-o1/video-2/library/Library'))
const Video2Page = lazy(() => import('./routes/Video2Page'))

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

          {/* Video 2 component catalogue, kept separate from /paper so the two
              visual vocabularies cannot quietly blend. */}
          <Route path="casefile" element={<CasefileCatalogue />} />

          {/* Video 2, played end to end; the section routes below stay for QA. */}
          <Route path={VIDEO2_SLUG} element={<Video2Page />} />
          {video2Routes.map(({ slug, component: SectionComponent }) => (
            <Route key={slug} path={`${VIDEO2_SLUG}/${slug}`} element={<SectionComponent />} />
          ))}
          <Route path="video-2/library" element={<V2Library />} />

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
