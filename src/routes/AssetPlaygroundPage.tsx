import { Avatar, Style } from '@dicebear/core'
import openPeepsDefinition from '@dicebear/styles/open-peeps.json'
import { LivingAsset, type LivingBehavior } from '../components/LivingAsset'
import './asset-playground.css'

const openPeeps = new Style(openPeepsDefinition)

function peepDataUri(seed: string) {
  const svg = new Avatar(openPeeps, { seed }).toString()
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const characterSeeds = [
  'narrator-one',
  'narrator-two',
  'expert-curious',
  'expert-calm',
  'expert-thinking',
  'expert-confused',
  'expert-active',
  'expert-sleepy',
  'router-one',
  'router-two',
  'helper-one',
  'helper-two',
]

const behaviorExamples: Array<{ behavior: LivingBehavior; label: string; note: string; seed: string }> = [
  { behavior: 'idle', label: 'Idle life', note: 'Tiny breathing/wobble while waiting.', seed: 'idle-life' },
  { behavior: 'wiggle', label: 'Hover wiggle', note: 'Feels touched instead of merely highlighted.', seed: 'hover-wiggle' },
  { behavior: 'pop', label: 'Selected pop', note: 'Useful for routed experts and chosen objects.', seed: 'selected-pop' },
  { behavior: 'follow', label: 'Cursor curiosity', note: 'The asset subtly follows the pointer.', seed: 'cursor-curiosity' },
]

const excalidrawCommit = '297a349eaff859e678f78d4dbc8e68df5fce42e5'
const rawBase = `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${excalidrawCommit}/libraries`

const sourcePools = [
  {
    name: 'Stick People',
    note: 'Best tiny reactive diagram people. Arms, eyes and mouth are editable.',
    preview: `${rawBase}/dhtoran/stick-people.jpg`,
    role: 'micro characters',
  },
  {
    name: 'Stick Figures',
    note: 'Fast emotional poses: shrug, happy, sad, child/adult figures.',
    preview: `${rawBase}/youritjang/stick-figures.jpg`,
    role: 'reaction poses',
  },
  {
    name: 'Robots',
    note: 'Useful source material for a router/dispatcher with personality.',
    preview: `${rawBase}/kaligule/robots.png`,
    role: 'router character',
  },
  {
    name: 'Office Items',
    note: 'Desks, workplace objects and ordinary-world props for metaphors.',
    preview: `${rawBase}/m47812/office-items.jpg`,
    role: 'workplace props',
  },
  {
    name: 'Data Processing',
    note: 'Transformation/storage/analysis metaphors without literal hardware diagrams.',
    preview: `${rawBase}/erlina/data-processing.jpg`,
    role: 'process props',
  },
  {
    name: 'Deep Learning',
    note: 'Neural-network primitives for technical moments only.',
    preview: `${rawBase}/yuelfei/deep-learning.jpg`,
    role: 'technical diagrams',
  },
]

export default function AssetPlaygroundPage() {
  return (
    <main className="asset-playground">
      <header className="asset-playground__header">
        <p className="asset-playground__eyebrow">PAPER WORLD · ASSET PLAYGROUND</p>
        <h1>Pick the world before we build the scene.</h1>
        <p>
          This page is for taste decisions only: which characters, props and reactions actually belong in the GLM video.
        </p>
      </header>

      <section className="asset-playground__section">
        <div className="asset-playground__section-title">
          <div>
            <span>01</span>
            <h2>Open Peeps character candidates</h2>
          </div>
          <p>Generated locally from the CC0 Open Peeps definition. Hover them.</p>
        </div>
        <div className="peep-grid">
          {characterSeeds.map((seed, index) => (
            <LivingAsset key={seed} behavior={index % 4 === 0 ? 'follow' : index % 3 === 0 ? 'wiggle' : 'pop'}>
              <article className="peep-card">
                <img src={peepDataUri(seed)} alt="" />
                <small>{seed}</small>
              </article>
            </LivingAsset>
          ))}
        </div>
      </section>

      <section className="asset-playground__section">
        <div className="asset-playground__section-title">
          <div>
            <span>02</span>
            <h2>Permanent living behaviors</h2>
          </div>
          <p>These are reusable. A scene chooses a behavior; it does not rebuild the animation.</p>
        </div>
        <div className="behavior-grid">
          {behaviorExamples.map((example) => (
            <article className="behavior-card" key={example.behavior}>
              <LivingAsset behavior={example.behavior} className="behavior-card__actor">
                <img src={peepDataUri(example.seed)} alt="" />
              </LivingAsset>
              <h3>{example.label}</h3>
              <p>{example.note}</p>
              <code>{`behavior="${example.behavior}"`}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="asset-playground__section">
        <div className="asset-playground__section-title">
          <div>
            <span>03</span>
            <h2>Excalidraw source pools</h2>
          </div>
          <p>These are raw source libraries, not the final scene. We curate only the pieces we actually use.</p>
        </div>
        <div className="source-grid">
          {sourcePools.map((pool) => (
            <article className="source-card" key={pool.name}>
              <div className="source-card__preview">
                <img src={pool.preview} alt={`${pool.name} preview`} loading="lazy" />
              </div>
              <div className="source-card__copy">
                <span>{pool.role}</span>
                <h3>{pool.name}</h3>
                <p>{pool.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="asset-playground__rule">
        <strong>Production rule</strong>
        <p>Source library → choose asset → adapt color/line weight → export production SVG/PNG → wrap with a living behavior → choreograph in the scene.</p>
      </section>
    </main>
  )
}
