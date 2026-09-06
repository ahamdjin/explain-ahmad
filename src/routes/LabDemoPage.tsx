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
import { PresenterControls } from '../engine/PresenterMode'

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

export default function LabDemoPage() {
  const { demo = 'trust' } = useParams()
  const Demo = demos[demo] ?? TrustExample

  return (
    <main className="demo-route-shell">
      <div className="lab-floating-nav">
        <Link to="/">← Library</Link>
        <Link to={`/lab/${demo === 'trust' ? 'premium' : 'trust'}`}>Switch demo</Link>
        <PresenterControls />
      </div>
      <Demo />
    </main>
  )
}
