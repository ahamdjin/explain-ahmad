import { useState } from 'react'
import DragGridExample from './examples/drag-style/DragGridExample'
import SignalFlowExample from './examples/flow-style/SignalFlowExample'
import FocusExample from './examples/focus-style/FocusExample'
import PolygonsExample from './examples/polygons-style/PolygonsExample'
import PremiumScrollyExample from './examples/premium-scrolly/PremiumScrollyExample'
import ScrollyExample from './examples/scrolly-style/ScrollyExample'
import SequenceExample from './examples/sequence-style/SequenceExample'
import TrustExample from './examples/trust-style/TrustExample'
import { PresenterControls, PresenterMode } from './engine/PresenterMode'

type Demo = 'premium' | 'trust' | 'polygons' | 'scrolly' | 'flow' | 'sequence' | 'drag' | 'focus'

const demos: Array<{ id: Demo; label: string; hint: string }> = [
  { id: 'premium', label: 'Premium scrolly', hint: 'Continuous motion + depth' },
  { id: 'trust', label: 'Trust style', hint: 'Click / Space to reveal' },
  { id: 'polygons', label: 'Polygon style', hint: 'Manipulate the system' },
  { id: 'scrolly', label: 'Basic scrolly', hint: 'Step-based reference' },
  { id: 'flow', label: 'Signal flow', hint: 'Watch information travel' },
  { id: 'sequence', label: 'Sequence', hint: 'Narration beat by beat' },
  { id: 'drag', label: 'Drag grid', hint: 'Drag → drop → react' },
  { id: 'focus', label: 'Camera', hint: 'Zoom and direct attention' },
]

function ExplainerApp() {
  const [demo, setDemo] = useState<Demo>('premium')

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">EXPLAINER ENGINE · V1</p>
          <h1>Explain Ahmad</h1>
        </div>
        <div className="header-actions">
          <p className="header-note">Premium motion foundation + reusable interactive storytelling primitives.</p>
          <PresenterControls />
        </div>
      </header>

      <nav className="demo-tabs" aria-label="Explainer demos">
        {demos.map((item) => (
          <button
            key={item.id}
            className={demo === item.id ? 'demo-tab is-active' : 'demo-tab'}
            onClick={() => setDemo(item.id)}
          >
            <strong>{item.label}</strong>
            <span>{item.hint}</span>
          </button>
        ))}
      </nav>

      {demo === 'premium' && <PremiumScrollyExample />}
      {demo === 'trust' && <TrustExample />}
      {demo === 'polygons' && <PolygonsExample />}
      {demo === 'scrolly' && <ScrollyExample />}
      {demo === 'flow' && <SignalFlowExample />}
      {demo === 'sequence' && <SequenceExample />}
      {demo === 'drag' && <DragGridExample />}
      {demo === 'focus' && <FocusExample />}
    </main>
  )
}

export default function App() {
  return (
    <PresenterMode>
      <ExplainerApp />
    </PresenterMode>
  )
}
