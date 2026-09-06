import type { ComponentType } from 'react'
import { Link, useParams } from 'react-router'
import DragGridExample from '../examples/drag-style/DragGridExample'
import SignalFlowExample from '../examples/flow-style/SignalFlowExample'
import FocusExample from '../examples/focus-style/FocusExample'
import NavigationLabExample from '../examples/navigation-style/NavigationLabExample'
import PolygonsExample from '../examples/polygons-style/PolygonsExample'
import PremiumScrollyExample from '../examples/premium-scrolly/PremiumScrollyExample'
import MaskRevealExample from '../examples/reveal-style/MaskRevealExample'
import ScrollyExample from '../examples/scrolly-style/ScrollyExample'
import SequenceExample from '../examples/sequence-style/SequenceExample'
import TrustExample from '../examples/trust-style/TrustExample'
import TypographyExample from '../examples/typography-style/TypographyExample'
import { usePresenterMode } from '../engine/PresenterMode'

const demos: Record<string, ComponentType> = {
  premium: PremiumScrollyExample,
  navigation: NavigationLabExample,
  reveal: MaskRevealExample,
  typography: TypographyExample,
  trust: TrustExample,
  polygons: PolygonsExample,
  scrolly: ScrollyExample,
  flow: SignalFlowExample,
  sequence: SequenceExample,
  drag: DragGridExample,
  focus: FocusExample,
}

const demoOrder = Object.keys(demos)

export default function LabDemoPage() {
  const { demo = 'trust' } = useParams()
  const Demo = demos[demo] ?? TrustExample
  const { presenting, toggle, toggleFullscreen } = usePresenterMode()
  const currentIndex = Math.max(0, demoOrder.indexOf(demo))
  const nextDemo = demoOrder[(currentIndex + 1) % demoOrder.length]

  return (
    <main className="demo-route-shell">
      {!presenting && (
        <details className="lab-chrome">
          <summary aria-label="Lab controls">•••</summary>
          <div className="lab-chrome-menu">
            <Link to="/">← Library</Link>
            <Link to={`/lab/${nextDemo}`}>Next demo</Link>
            <button type="button" onClick={toggle}>Present</button>
            <button type="button" onClick={toggleFullscreen}>Fullscreen</button>
            <small>P · present &nbsp; F · fullscreen</small>
          </div>
        </details>
      )}
      <Demo />
    </main>
  )
}
