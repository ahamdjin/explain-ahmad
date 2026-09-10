import { Link } from 'react-router'
import { SceneFrame } from '../engine/SceneFrame'
import { SketchAnnotation } from '../visuals/SketchAnnotation'

const destinations = [
  { to: '/why-320b-uses-18b', title: 'Current GLM watch', meta: 'Current V9 production route' },
  { to: '/gpt-watch', title: 'GPT Watch', meta: 'Alternate 120-beat cut with the memory/loading payoff' },
  { to: '/styles', title: 'Art directions', meta: 'Paper, clean, editorial, technical' },
  { to: '/lab/trust', title: 'Click stories', meta: 'Ncase-style reveal and choice patterns' },
  { to: '/lab/navigation', title: 'Navigation', meta: 'Snap, exact gesture paging, scene replacement' },
  { to: '/lab/flow', title: 'Diagrams', meta: 'Signal flow, nodes, edges, visual systems' },
  { to: '/lab/drag', title: 'Interaction', meta: 'Drag, manipulate, compare, simulate' },
  { to: '/lab/reveal', title: 'Reveals', meta: 'Masks, focus, progressive disclosure' },
]

export default function LibraryHome() {
  return (
    <SceneFrame art="paper" className="library-home">
      <div className="library-home-inner">
        <div>
          <p className="route-kicker">INTERNAL STORYTELLING LIBRARY</p>
          <h1 className="library-title">
            Build the <SketchAnnotation type="underline" color="#55a99e">explanation</SketchAnnotation>, not the website.
          </h1>
          <p className="library-subtitle">
            The library now links to both the current GLM production cut and the isolated GPT alternate cut for direct comparison.
          </p>
          <p className="library-lab-hint">Inside any lab: <kbd>L</kbd> or <kbd>⌘K</kbd> opens controls.</p>
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
