import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
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

type AssetCategory = 'all' | 'characters' | 'notes' | 'props' | 'mechanisms' | 'shortlist'

const excalidrawCommit = '297a349eaff859e678f78d4dbc8e68df5fce42e5'
const repoBase = `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${excalidrawCommit}`
const manifestUrl = `${repoBase}/libraries.json`
const previewBase = `${repoBase}/libraries`

const glmPriorityNames = [
  // Large expressive character systems.
  'Simple Characters',
  'Character Kit 1',
  'Body Builder Kit 1',
  'Head Builder Kit 1',
  'Male Heads Diverse 1',
  'Female Heads Diverse',
  'Stick people',
  'Stick Figures',
  'Storytelling',
  'Random figure drawings',
  'Robots',

  // Paper-native reaction / writing pieces.
  'Bubbles',
  'Sticky Notes',
  'Simple Sticky Notes',
  'Some handdrawn signs',

  // Everyday world-building props.
  'Office Items',
  'System Icons',
  'Gadgets',
  'Computers',
  'Printers',
  'Medias',
  'Forms',
  'Information Architecture',

  // Mechanism / AI / system pieces.
  'System Design Components',
  'System Design Icons',
  'Software Architecture',
  'Deep learning',
  'Data processing',
  'Data sources',
  'Data Flow',
  'Data Viz',
  'Charts',
  'Data Science',
  'Logic Gates',
  'Schematic Symbols',
  'Event Storming',
  'Software Logos',
]

const categoryCopy: Record<AssetCategory, { title: string; copy: string; placeholder: string }> = {
  all: {
    title: 'All Excalidraw libraries',
    copy: 'The whole pinned catalog, with our strongest GLM candidates pulled to the top.',
    placeholder: 'Try: character, stick, thinking, confused, sticky, bubble, book, machine…',
  },
  characters: {
    title: 'Characters & reactions',
    copy: 'Large character systems first: buildable bodies/heads, stick people, poses, reactions and router personality.',
    placeholder: 'Try: confused, thinking, pointing, worker, person, face…',
  },
  notes: {
    title: 'Sticky notes, bubbles & marks',
    copy: 'Paper-native writing pieces for labels, questions, speech, thought and visual emphasis.',
    placeholder: 'Try: sticky, note, bubble, sign, label, paper…',
  },
  props: {
    title: 'Books, office & props',
    copy: 'Ordinary-world objects we can use as metaphors instead of literal RAM/GPU diagrams.',
    placeholder: 'Try: desk, office, book, computer, shelf, document…',
  },
  mechanisms: {
    title: 'Systems & technical pieces',
    copy: 'Raw parts for routers, pipelines, transformations, networks, data flows and other explanatory mechanisms.',
    placeholder: 'Try: flow, system, architecture, neural, logic, data…',
  },
  shortlist: {
    title: 'Production shortlist',
    copy: 'Nothing is approved yet. This page becomes the small set we actually use after your visual pass.',
    placeholder: 'Shortlist is intentionally empty for now.',
  },
}

const behaviorExamples: Array<{ behavior: LivingBehavior; label: string; note: string }> = [
  { behavior: 'idle', label: 'Idle life', note: 'Tiny motion while the drawing waits.' },
  { behavior: 'wiggle', label: 'Hover wiggle', note: 'The drawing reacts when you touch it.' },
  { behavior: 'pop', label: 'Selected pop', note: 'Useful when a router selects an expert.' },
  { behavior: 'follow', label: 'Cursor curiosity', note: 'A tiny amount of pointer awareness.' },
]

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function searchText(library: ExcalidrawLibrary) {
  return normalize(`${library.name} ${library.description ?? ''} ${(library.itemNames ?? []).join(' ')}`)
}

function roleFor(library: ExcalidrawLibrary) {
  const text = searchText(library)
  if (/simple characters|character kit|stick|figure|people|storytelling|body builder|head builder|heads diverse/.test(text)) return 'characters / reactions'
  if (/robot/.test(text)) return 'router / personality'
  if (/bubble/.test(text)) return 'speech / reactions'
  if (/office|computer|gadget|printer|media|form/.test(text)) return 'workplace / props'
  if (/sticky|sign|book|document|information architecture/.test(text)) return 'notes / books / labels'
  if (/deep learning|data science|data viz|chart/.test(text)) return 'AI / technical visuals'
  if (/data|software|system design|architecture|flow|event/.test(text)) return 'process / systems'
  if (/logic|schematic/.test(text)) return 'mechanism pieces'
  return 'source pool'
}

function inCategory(library: ExcalidrawLibrary, category: AssetCategory) {
  if (category === 'all') return true
  if (category === 'shortlist') return false
  const text = searchText(library)
  if (category === 'characters') return /character|person|people|stick|figure|body builder|head builder|heads|storytelling|robot|pose|face/.test(text)
  if (category === 'notes') return /sticky|note|bubble|speech|thought|sign|label|paper|annotation/.test(text)
  if (category === 'props') return /office|desk|book|document|computer|gadget|printer|media|shelf|furniture|form|device/.test(text)
  return /system|architecture|flow|data|deep learning|neural|logic|schematic|event|network|pipeline|diagram|chart/.test(text)
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
        {library.itemNames?.length ? <small>{library.itemNames.slice(0, 10).join(' · ')}</small> : null}
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
  const { category: rawCategory = 'all' } = useParams()
  const category = (Object.hasOwn(categoryCopy, rawCategory) ? rawCategory : 'all') as AssetCategory
  const [libraries, setLibraries] = useState<ExcalidrawLibrary[]>([])
  const [query, setQuery] = useState('')
  const [loadError, setLoadError] = useState(false)
  const page = categoryCopy[category]

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
        if (used.has(library.id) || !inCategory(library, category)) return false
        const name = normalize(library.name)
        return name === needle || name.includes(needle) || needle.includes(name)
      })
      if (match) {
        used.add(match.id)
        result.push(match)
      }
    }
    return result
  }, [libraries, category])

  const searchResults = useMemo(() => {
    if (category === 'shortlist') return []
    const needle = normalize(query)
    return libraries
      .filter((library) => inCategory(library, category))
      .filter((library) => !needle || searchText(library).includes(needle))
      .slice(0, 120)
  }, [libraries, query, category])

  return (
    <main className="asset-playground">
      <header className="asset-playground__header asset-catalog__header">
        <Link className="asset-back" to="/assets">← Asset home</Link>
        <p className="asset-playground__eyebrow">GLM PAPER WORLD · ASSET CATALOG</p>
        <h1>{page.title}</h1>
        <p>{page.copy}</p>
      </header>

      {category === 'shortlist' ? (
        <section className="asset-playground__section asset-shortlist-empty">
          <strong>No approved assets yet.</strong>
          <p>Browse the other sections first. Once you call out the winners, we will pin only those here and use them in production.</p>
          <Link to="/assets/characters">Start with characters →</Link>
        </section>
      ) : (
        <>
          <section className="asset-playground__section">
            <div className="asset-playground__section-title">
              <div><span>01</span><h2>Strongest candidates</h2></div>
              <p>These are the libraries most likely to fit the GLM paper world before any custom adaptation.</p>
            </div>
            {loadError ? <p className="asset-playground__status">Could not load the Excalidraw manifest.</p> : null}
            {!libraries.length && !loadError ? <p className="asset-playground__status">Loading official Excalidraw libraries…</p> : null}
            <div className="source-grid source-grid--dense">
              {curated.map((library) => <LibraryCard key={library.id} library={library} />)}
            </div>
          </section>

          <section className="asset-playground__section">
            <div className="asset-playground__section-title">
              <div><span>02</span><h2>Search this catalog</h2></div>
              <p>Search up to 120 matching libraries at once. The official pinned catalog remains the source of truth.</p>
            </div>
            <label className="asset-search">
              <span>Find assets</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={page.placeholder} />
            </label>
            <p className="asset-search__count">Showing {searchResults.length} matching libraries</p>
            <div className="source-grid source-grid--dense">
              {searchResults.map((library) => <LibraryCard key={library.id} library={library} />)}
            </div>
          </section>
        </>
      )}

      <section className="asset-playground__section">
        <div className="asset-playground__section-title">
          <div><span>03</span><h2>Permanent living behaviors</h2></div>
          <p>The drawing changes per scene; the reaction behavior is reusable.</p>
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
        <small>Open Peeps remains available for other videos, but it is not the primary GLM character system.</small>
      </section>
    </main>
  )
}
