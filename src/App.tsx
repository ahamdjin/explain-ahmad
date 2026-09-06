import { useState } from 'react'
import TrustExample from './examples/trust-style/TrustExample'
import PolygonsExample from './examples/polygons-style/PolygonsExample'
import ScrollyExample from './examples/scrolly-style/ScrollyExample'

type Demo = 'trust' | 'polygons' | 'scrolly'

const demos: Array<{ id: Demo; label: string; hint: string }> = [
  { id: 'trust', label: 'Trust style', hint: 'Click / Space to reveal' },
  { id: 'polygons', label: 'Polygon style', hint: 'Manipulate the system' },
  { id: 'scrolly', label: 'Scrollytelling', hint: 'Scroll to build the idea' },
]

export default function App() {
  const [demo, setDemo] = useState<Demo>('trust')

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">EXPLAINER ENGINE · V1</p>
          <h1>Explain Ahmad</h1>
        </div>
        <p className="header-note">Three storytelling modes. One reusable stage.</p>
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

      {demo === 'trust' && <TrustExample />}
      {demo === 'polygons' && <PolygonsExample />}
      {demo === 'scrolly' && <ScrollyExample />}
    </main>
  )
}
