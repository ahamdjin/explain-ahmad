import { Link } from 'react-router'
import { SceneFrame } from '../engine/SceneFrame'
import { SketchAnnotation } from '../visuals/SketchAnnotation'
import '../design-system.css'
import '../explanation-system.css'

const current = [
  { to: '/watch', title: 'The 18 Billion Mystery', meta: '320B parameters, only 18B active — why does it need 8 GPUs?' },
  { to: '/paper', title: 'Paper library', meta: 'Every reusable piece and object in every state' },
]

const sections = [
  { to: '/section-01', title: '01 — The five-percent problem', meta: 'similar active share, radically different hardware' },
  { to: '/section-02', title: '02 — What the model actually receives', meta: '`it` becomes token ID 432' },
  { to: '/section-03', title: '03 — From 432 to a useful representation', meta: '432 pulls out a fixed 4,096-number starting row' },
  { to: '/section-04', title: '04 — “it” gets context', meta: 'same ID, sentence-specific hidden representation' },
  { to: '/section-05', title: '05 — The router picks the eight', meta: '288 scored, top-8 routed, one shared expert' },
  { to: '/section-06', title: '06 — The experts do the work', meta: 'eight transformations recombine into one row' },
  { to: '/section-07', title: '07 — One layer becomes forty-five', meta: '42 routing decisions × 8 = 336 expert visits' },
  { to: '/section-08', title: '08 — That was one token', meta: 'the whole prompt moves through the stack during prefill' },
  { to: '/section-09', title: '09 — Where the next token comes from', meta: 'the final row becomes a vocabulary distribution' },
  { to: '/section-10', title: '10 — And then it does it again', meta: 'decode reuses prior state and routes the new position' },
  { to: '/section-11', title: '11 — So which 18B are active?', meta: 'there is no one permanent 18B routed block' },
  { to: '/section-12', title: '12 — How people actually run these', meta: 'cache/offload trades fast memory for bandwidth and speed' },
  { to: '/section-13', title: '13 — What 18B active actually buys', meta: 'per-token participation is not a minimum-memory promise' },
]

const studies = [
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
          <p className="route-kicker">THE CURRENT FILM</p>
          <h1 className="library-title">
            The <SketchAnnotation type="underline" color="#55a99e">18 Billion</SketchAnnotation> Mystery
          </h1>
          <p className="library-subtitle">
            320B parameters, only 18B active. Follow one real token — <strong>it</strong> — through the machine and find out why that does not mean an 18B model.
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
            <p className="route-kicker">VISUAL STUDIES</p>
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
