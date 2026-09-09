import { Link } from 'react-router'
import { SceneFrame } from '../engine/SceneFrame'
import { SketchAnnotation } from '../visuals/SketchAnnotation'

const destinations = [
  { to: '/gpt-section-01', title: 'GPT Section 1', meta: 'Compare the new opening storyboard with the original' },
  { to: '/section-01', title: 'Original Section 1', meta: 'The original hospital opening' },
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
            The storytelling library and current explainer studies. Open either Section 1 to compare the two openings.
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
