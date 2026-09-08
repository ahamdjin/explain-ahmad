import { useEffect, useMemo, useState } from 'react'
import { LivingAsset, type LivingBehavior } from '../components/LivingAsset'
import './asset-playground.css'

type ExcalidrawLibrary = {
  id: string
  name: string
  description?: string
  source: string
  preview?: string
  itemNames?: string[]
}

const excalidrawCommit = '297a349eaff859e678f78d4dbc8e68df5fce42e5'
const repoBase = `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${excalidrawCommit}`
const manifestUrl = `${repoBase}/libraries.json`
const previewBase = `${repoBase}/libraries`

const glmPriorityNames = [
  'Stick people',
  'Stick Figures',
  'Robots',
  'Office Items',
  'System Icons',
  'Software Architecture',
  'Information Architecture',
  'Deep learning',
  'Data processing',
  'Data sources',
  'Data Flow',
  'Data Viz',
  'Charts',
  'Gadgets',
  'Computers',
  'Simple Sticky Notes',
  'Some handdrawn signs',
  'Random Figure Drawings',
  'Storytelling',
  'Data Science',
  'Logic Gates',
  'Schematic Symbols',
  'Printers',
  'Event Storming',
  'Forms',
  'Software Logos',
  'Medias',
]

const behaviorExamples: Array<{ behavior: LivingBehavior; label: string; note: string }> = [
  { behavior: 'idle', label: 'Idle life', note: 'Tiny motion while the drawing waits.' },
  { behavior: 'wiggle', label: 'Hover wiggle', note: 'The drawing reacts when you touch it.' },
  { behavior: 'pop', label: 'Selected pop', note: 'Useful when a router selects an expert.' },
  { behavior: 'follow', label: 'Cursor curiosity', note: 'A tiny amount of pointer awareness.' },
]

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function roleFor(library: ExcalidrawLibrary) {
  const text = normalize(`${library.name} ${library.description ?? ''} ${(library.itemNames ?? []).join(' ')}`)
  if (/stick|figure|people|storytelling/.test(text)) return 'characters / reactions'
  if (/robot/.test(text)) return 'router / personality'
  if (/office|computer|gadget|printer|media|form/.test(text)) return 'workplace / props'
  if (/sticky|sign|book|document|information architecture/.test(text)) return 'notes / books / labels'
  if (/deep learning|data science|data viz|chart/.test(text)) return 'AI / technical visuals'
  if (/data|software|architecture|flow|event/.test(text)) return 'process / systems'
  if (/logic|schematic/.test(text)) return 'mechanism pieces'
  return 'source pool'
}

function LibraryCard({ library }: { library: ExcalidrawLibrary }) {
  const preview = library.preview ? `${previewBase}/${library.preview}` : null
  return (
    <article className="source-card">
      <div className="source-card__preview">
        {preview ? <img src={preview} alt={`${library.name} preview`} loading="lazy" /> : <div className="source-card__missing">No preview</div>}
      </div>
      <div className="source-card__copy">
        <span>{roleFor(library)}</span>
        <h3>{library.name}</h3>
        <p>{library.description || 'Excalidraw source library.'}</p>
        {library.itemNames?.length ? <small>{library.itemNames.slice(0, 8).join(' · ')}</small> : null}
      </div>
    </article>
  )
}

function PaperActor() {
  return (
    <div className="paper-actor" aria-hidden="true">
      <span className="paper-actor__eye paper-actor__eye--left" />
      <span className="paper-actor__eye paper-actor__eye--right" />
      <span className="paper-actor__mouth" />
      <span className="paper-actor__arm paper-actor__arm--left" />
      <span className="paper-actor__arm paper-actor__arm--right" />
    </div>
  )
}

export default function AssetPlaygroundPage() {
  const [libraries, setLibraries] = useState<ExcalidrawLibrary[]>([])
  const [query, setQuery] = useState('')
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let active = true
    fetch(manifestUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`manifest ${response.status}`)
        return response.json() as Promise<ExcalidrawLibrary[]>
      })
      .then((data) => {
        if (active) setLibraries(data)
      })
      .catch(() => {
        if (active) setLoadError(true)
      })
    return () => {
      active = false
    }
  }, [])

  const curated = useMemo(() => {
    const used = new Set<string>()
    const result: ExcalidrawLibrary[] = []
    for (const wanted of glmPriorityNames) {
      const needle = normalize(wanted)
      const match = libraries.find((library) => {
        if (used.has(library.id)) return false
        const name = normalize(library.name)
        return name === needle || name.includes(needle) || needle.includes(name)
      })
      if (match) {
        used.add(match.id)
        result.push(match)
      }
    }
    return result
  }, [libraries])

  const searchResults = useMemo(() => {
    const needle = normalize(query)
    if (!needle) return libraries.slice(0, 48)
    return libraries
      .filter((library) => normalize(`${library.name} ${library.description ?? ''} ${(library.itemNames ?? []).join(' ')}`).includes(needle))
      .slice(0, 48)
  }, [libraries, query])

  return (
    <main className="asset-playground">
      <header className="asset-playground__header">
        <p className="asset-playground__eyebrow">GLM PAPER WORLD · ASSET PLAYGROUND</p>
        <h1>Excalidraw first. Much bigger source pool.</h1>
        <p>For this video, Excalidraw is the dominant source ecosystem. Open Peeps stays installed for other videos.</p>
      </header>

      <section className="asset-playground__section">
        <div className="asset-playground__section-title">
          <div><span>01</span><h2>GLM candidate source pools</h2></div>
          <p>Characters, reactions, office props, books/notes, diagrams, devices and mechanism pieces.</p>
        </div>
        {loadError ? <p className="asset-playground__status">Could not load the Excalidraw manifest.</p> : null}
        {!libraries.length && !loadError ? <p className="asset-playground__status">Loading official Excalidraw libraries…</p> : null}
        <div className="source-grid source-grid--dense">
          {curated.map((library) => <LibraryCard key={library.id} library={library} />)}
        </div>
      </section>

      <section className="asset-playground__section">
        <div className="asset-playground__section-title">
          <div><span>02</span><h2>Search the full Excalidraw library catalog</h2></div>
          <p>Not six hard-coded pools anymore. Search the official pinned catalog directly.</p>
        </div>
        <label className="asset-search">
          <span>Find assets</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: book, worker, machine, storage, diagram, computer…" />
        </label>
        <p className="asset-search__count">Showing {searchResults.length} of {libraries.length} libraries</p>
        <div className="source-grid source-grid--dense">
          {searchResults.map((library) => <LibraryCard key={library.id} library={library} />)}
        </div>
      </section>

      <section className="asset-playground__section">
        <div className="asset-playground__section-title">
          <div><span>03</span><h2>Permanent living behaviors</h2></div>
          <p>The asset changes per scene; the reaction behavior is reusable.</p>
        </div>
        <div className="behavior-grid">
          {behaviorExamples.map((example) => (
            <article className="behavior-card" key={example.behavior}>
              <LivingAsset behavior={example.behavior} className="behavior-card__actor"><PaperActor /></LivingAsset>
              <h3>{example.label}</h3>
              <p>{example.note}</p>
              <code>{`behavior="${example.behavior}"`}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="asset-playground__rule">
        <strong>Production rule</strong>
        <p>Source pool → choose useful pieces → adapt them into one paper-world language → export scene assets → add living behavior → choreograph the scene.</p>
        <small>Open Peeps is retained as a general/future-video source, not the GLM character system.</small>
      </section>
    </main>
  )
}
