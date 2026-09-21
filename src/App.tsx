import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { PresenterMode } from './engine/PresenterMode'
import { VIDEO_PATH, VIDEO_SLUG, videoRoutes } from './videos/registry'

const HomePage = lazy(() => import('./routes/HomePage'))
const WatchPage = lazy(() => import('./routes/WatchPage'))
const CasefileCatalogue = lazy(() => import('./routes/CasefileCatalogue'))
const V2Section01 = lazy(() => import('./videos/apollo-o1/video-2/section-01/Section01'))
const V2Section02 = lazy(() => import('./videos/apollo-o1/video-2/section-02/Section02'))
const V2Section03 = lazy(() => import('./videos/apollo-o1/video-2/section-03/Section03'))
const V2Section04 = lazy(() => import('./videos/apollo-o1/video-2/section-04/Section04'))
const V2Section05 = lazy(() => import('./videos/apollo-o1/video-2/section-05/Section05'))
const V2Section06 = lazy(() => import('./videos/apollo-o1/video-2/section-06/Section06'))
const V2Section07 = lazy(() => import('./videos/apollo-o1/video-2/section-07/Section07'))
const V2Section08 = lazy(() => import('./videos/apollo-o1/video-2/section-08/Section08'))
const V2Section09 = lazy(() => import('./videos/apollo-o1/video-2/section-09/Section09'))
const V2Library = lazy(() => import('./videos/apollo-o1/video-2/library/Library'))

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

          {/* Video 2, in build. Section routes only — there is no assembled
              film yet, and there will not be one until the acts exist. */}
          <Route path="video-2/section-01" element={<V2Section01 />} />
          <Route path="video-2/section-02" element={<V2Section02 />} />
          <Route path="video-2/section-03" element={<V2Section03 />} />
          <Route path="video-2/section-04" element={<V2Section04 />} />
          <Route path="video-2/section-05" element={<V2Section05 />} />
          <Route path="video-2/section-06" element={<V2Section06 />} />
          <Route path="video-2/section-07" element={<V2Section07 />} />
          <Route path="video-2/section-08" element={<V2Section08 />} />
          <Route path="video-2/section-09" element={<V2Section09 />} />
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
