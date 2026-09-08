import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { useParams } from 'react-router'
import { LabCommandMenu } from '../lab/LabCommandMenu'

type DemoComponent = LazyExoticComponent<ComponentType>

const demos: Record<string, DemoComponent> = {
  continuity: lazy(() => import('../examples/continuity-style')),
  premium: lazy(() => import('../examples/premium-scrolly/PremiumScrollyExample')),
  navigation: lazy(() => import('../examples/navigation-style/NavigationLabExample')),
  reveal: lazy(() => import('../examples/reveal-style/MaskRevealExample')),
  typography: lazy(() => import('../examples/typography-style/TypographyExample')),
  trust: lazy(() => import('../examples/trust-style/TrustExample')),
  polygons: lazy(() => import('../examples/polygons-style/PolygonsExample')),
  scrolly: lazy(() => import('../examples/scrolly-style/ScrollyExample')),
  flow: lazy(() => import('../examples/flow-style/SignalFlowExample')),
  sequence: lazy(() => import('../examples/sequence-style/SequenceExample')),
  drag: lazy(() => import('../examples/drag-style/DragGridExample')),
  focus: lazy(() => import('../examples/focus-style/FocusExample')),
  'paper-proof': lazy(() => import('../examples/paper-proof/PaperProofExample')),
}

const fallbackDemo = demos.trust

function DemoLoadingStage() {
  return <div className="lab-demo-loading" role="status" aria-label="Loading demo" />
}

export default function LabDemoPage() {
  const { demo = 'trust' } = useParams()
  const Demo = demos[demo] ?? fallbackDemo

  return (
    <main className="demo-route-shell">
      <LabCommandMenu currentDemo={demo} />
      <Suspense fallback={<DemoLoadingStage />}>
        <Demo />
      </Suspense>
    </main>
  )
}
