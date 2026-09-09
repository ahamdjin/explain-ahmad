import { Link } from 'react-router'
import { SceneFrame } from '../engine/SceneFrame'
import { SketchAnnotation } from '../visuals/SketchAnnotation'
import '../design-system.css'
import '../explanation-system.css'

/**
 * The finished thing comes first.
 *
 * This page used to open with two competing Section 1 studies and no link to
 * the video at all, which is the wrong order: no section makes sense alone,
 * and /watch is the product.
 */
const current = [
  { to: '/watch', title: 'Watch the whole thing', meta: '8 sections, 96 beats, 8:04 — in order, the way it is meant to be seen' },
  { to: '/paper', title: 'Paper library', meta: 'Every reusable piece and object in every state' },
]

const sections = [
  { to: '/section-01', title: '01 — The claim on trial', meta: 'word two picks a different eight' },
  { to: '/section-02', title: '02 — Follow one word in', meta: 'the router never looks at the word' },
  { to: '/section-03', title: '03 — The word becomes numbers', meta: 'and the numbers never change' },
  { to: '/section-04', title: '04 — Where the numbers change', meta: 'context arrives' },
  { to: '/section-05', title: '05 — New numbers, new team', meta: 'same word, different eight' },
  { to: '/section-06', title: '06 — Forty-two floors', meta: '336 expert visits, counted on screen' },
  { to: '/section-07', title: '07 — The answer', meta: 'the plan from §1 jams' },
  { to: '/section-08', title: '08 — The verdict', meta: 'compute, not memory' },
]

const studies = [
  { to: '/styles', title: 'Art directions', meta: 'Paper, clean, editorial, technical' },
  { to: '/lab/trust', title: 'Click stories', meta: 'Ncase-style reveal and choice patterns' },
  { to: '/lab/navigation', title: 'Navigation', meta: 'Snap, exact gesture paging, scene replacement' },
  { to: '/lab/flow', title: 'Diagrams', meta: 'Signal flow, nodes, edges, visual systems' },
  { to: '/lab/drag', title: 'Interaction', meta: 'Drag, manipulate, compare, simulate' },
  { to: '/lab/reveal', title: 'Reveals', meta: 'Masks, focus, progressive disclosure' },
  { to: '/gpt-section-01', title: 'GPT Section 1', meta: 'An alternative opening, kept for comparison' },
  { to: '/why-320b-uses-18b', title: 'Production v9', meta: 'Superseded by the eight sections' },
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
            Sparse routing buys compute, not memory — in eight sections. Individual sections open for
            review only; no section makes sense on its own.
          </p>
          <p className="library-lab-hint">
            In a section: click or <kbd>&rarr;</kbd> to advance, <kbd>&larr;</kbd> back. Inside any
            lab: <kbd>L</kbd> or <kbd>&#8984;K</kbd> opens controls.
          </p>
        </div>

        <div className="library-rail">
        <div className="library-links">
          {current.map((item) => (
            <Link key={item.to} className="library-link" to={item.to}>
              <strong>{item.title}</strong>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>

        <div>
          <p className="route-kicker">THE CHAIN</p>
          <div className="library-links library-links-tight">
            {sections.map((item) => (
              <Link key={item.to} className="library-link" to={item.to}>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="route-kicker">STUDIES AND EARLIER ATTEMPTS</p>
          <div className="library-links library-links-tight">
            {studies.map((item) => (
              <Link key={item.to} className="library-link" to={item.to}>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </Link>
            ))}
          </div>
        </div>
        </div>
      </div>
    </SceneFrame>
  )
}
