import { Link } from 'react-router'
import './asset-playground.css'

const sections = [
  {
    to: '/assets/characters',
    eyebrow: 'CAST',
    title: 'Characters & reactions',
    copy: 'Simple Characters, body/head builder kits, stick people, heads, storytelling figures and expression-heavy sources.',
  },
  {
    to: '/assets/notes',
    eyebrow: 'PAPER',
    title: 'Sticky notes, bubbles & marks',
    copy: 'Sticky notes, speech/thought bubbles, hand-drawn signs, labels and paper-native annotation pieces.',
  },
  {
    to: '/assets/props',
    eyebrow: 'WORLD',
    title: 'Books, office & props',
    copy: 'Desks, computers, gadgets, documents, workplace objects and ordinary-world metaphor pieces.',
  },
  {
    to: '/assets/mechanisms',
    eyebrow: 'MECHANISM',
    title: 'Systems & technical pieces',
    copy: 'System design, data flow, deep learning, architecture, logic and schematic pieces for explanatory mechanisms.',
  },
  {
    to: '/assets/all',
    eyebrow: 'EVERYTHING',
    title: 'Browse all libraries',
    copy: 'Search the full pinned Excalidraw library catalog and compare every available source pool.',
  },
  {
    to: '/assets/shortlist',
    eyebrow: 'NEXT',
    title: 'Shortlist',
    copy: 'The destination for the assets we approve for production. Empty until we start choosing.',
  },
]

export default function AssetHomePage() {
  return (
    <main className="asset-playground asset-hub">
      <header className="asset-playground__header asset-hub__header">
        <p className="asset-playground__eyebrow">GLM PAPER WORLD · ASSET LIBRARY</p>
        <h1>Pick the pieces. Then build the world.</h1>
        <p>
          Excalidraw is the main ecosystem for this video. Browse by job, compare whole libraries, then shortlist only the pieces worth carrying into Section 01.
        </p>
      </header>

      <section className="asset-hub__grid" aria-label="Asset library sections">
        {sections.map((section, index) => (
          <Link className="asset-hub__card" to={section.to} key={section.to}>
            <div className="asset-hub__card-number">0{index + 1}</div>
            <div>
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
            </div>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </section>

      <div className="asset-playground__rule asset-hub__rule">
        <strong>How we use this</strong>
        <p>Library → pick strong asset → adapt stroke/palette → make scene-specific layers → add living behavior → choreograph.</p>
        <small>We are collecting source material, not forcing every library into one visual style.</small>
      </div>
    </main>
  )
}
