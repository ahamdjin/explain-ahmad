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
  { to: '/watch', title: 'Watch the whole thing', meta: '13 sections, in order, the way it is meant to be seen' },
  { to: '/paper', title: 'Paper library', meta: 'Every reusable piece and object in every state' },
]

/**
 * The thirteen-section chain. `storyboard/video-1/STORY_SPINE.md` v4.
 *
 * The `meta` line is what the section *adds*, not what it is about — that is
 * the load-bearing column of the spine's chain table, and having it here means
 * the index can be read as an argument rather than as a table of contents.
 */
const sections = [
  { to: '/section-01', title: '01 — What "18 billion active" means', meta: 'a different 18 billion every word' },
  { to: '/section-02', title: '02 — Your words become tokens', meta: 'a row number is a name, not a meaning' },
  { to: '/section-03', title: '03 — From an ID to a meaning', meta: 'the row is fixed per token' },
  { to: '/section-04', title: '04 — The word looks around', meta: 'the numbers depend on the whole sentence' },
  { to: '/section-05', title: '05 — The router picks the eight', meta: 'the choice depends on those numbers' },
  { to: '/section-06', title: '06 — The experts do the work', meta: 'the token leaves changed' },
  { to: '/section-07', title: '07 — That was one layer. There are 45.', meta: '336 choices, not one' },
  { to: '/section-08', title: '08 — That was one token', meta: 'every token pays its own 336' },
  { to: '/section-09', title: '09 — Where the answer comes out', meta: 'all that, and one word' },
  { to: '/section-10', title: '10 — And then it does it again', meta: 'it never stops re-choosing' },
  { to: '/section-11', title: '11 — Could you store only the 18?', meta: 'the fetching costs more than the work' },
  { to: '/section-12', title: '12 — How people actually run these', meta: 'the honest limit — and the slider' },
  { to: '/section-13', title: '13 — What that number bought', meta: 'compute, not memory' },
]

const studies = [
  { to: '/styles', title: 'Art directions', meta: 'Paper, clean, editorial, technical' },
  { to: '/lab/trust', title: 'Click stories', meta: 'Ncase-style reveal and choice patterns' },
  { to: '/lab/navigation', title: 'Navigation', meta: 'Snap, exact gesture paging, scene replacement' },
  { to: '/lab/flow', title: 'Diagrams', meta: 'Signal flow, nodes, edges, visual systems' },
  { to: '/lab/drag', title: 'Interaction', meta: 'Drag, manipulate, compare, simulate' },
  { to: '/lab/reveal', title: 'Reveals', meta: 'Masks, focus, progressive disclosure' },
  { to: '/video-2', title: 'Video 2 — the GPT cut', meta: '120 beats, drawn in the superseded v9 engine' },
  { to: '/gpt-section-01', title: 'GPT Section 1', meta: 'An alternative opening, kept for comparison' },
  { to: '/why-320b-uses-18b', title: 'Production v9', meta: 'Superseded' },
  { to: '/old/section-01', title: 'The superseded eight', meta: 'The claim-on-trial cut, kept to compare against' },
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
            Sparse routing buys compute, not memory — taught in thirteen sections. Individual
            sections open for review only; no section makes sense on its own.
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
