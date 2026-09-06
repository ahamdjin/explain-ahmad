import { Link } from 'react-router'
import { SceneFrame } from '../engine/SceneFrame'
import { SketchAnnotation } from '../visuals/SketchAnnotation'

const destinations = [
  { to: '/attention', title: 'Attention', meta: 'Clean technical · token relationships' },
  { to: '/moe', title: 'MoE', meta: 'Paper sketch · router → experts' },
  { to: '/hermes-agent', title: 'Hermes Agent', meta: 'Editorial · agent + tools' },
  { to: '/styles', title: 'Style Gallery', meta: 'Same engine, different art directions' },
  { to: '/lab/trust', title: 'Interaction Lab', meta: 'Trust, simulations, gesture paging, scrolly' },
  { to: '/lab/navigation', title: 'Navigation Lab', meta: 'Snap, gesture, scene replacement' },
]

export default function LibraryHome() {
  return (
    <SceneFrame art="paper" className="library-home">
      <div className="library-home-inner">
        <div>
          <p className="route-kicker">EXPLAIN AHMAD · STORYTELLING SYSTEM</p>
          <h1 className="library-title">An <SketchAnnotation type="circle" color="#55a99e">arsenal</SketchAnnotation>, not a template.</h1>
          <p className="library-subtitle">
            Every video gets its own URL, art direction and interaction language. Paper/sketch is a favorite—not a prison.
          </p>
        </div>

        <div className="library-links">
          {destinations.map((item) => (
            <Link key={item.to} className="library-link" to={item.to}>
              <strong>{item.title}</strong>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>
      </div>
    </SceneFrame>
  )
}
