import { motion } from 'motion/react'
import { type CSSProperties, type ReactNode } from 'react'
import { SketchAnnotation } from '../../../visuals/SketchAnnotation'
import { CHAPTERS, type Beat, type ChapterId } from './story'
import { EMBEDDING_PREVIEW } from './data'

export function PaperBackdrop() {
  return (
    <div className="v9-paper-bg" aria-hidden="true">
      <i className="v9-paper-ring v9-paper-ring-a" />
      <i className="v9-paper-ring v9-paper-ring-b" />
      <i className="v9-paper-fold" />
    </div>
  )
}

export function ChapterRail({ beatNumber, chapter }: { beatNumber: number; chapter: ChapterId }) {
  if (beatNumber < 15 || beatNumber >= 100) return null
  const chapters = CHAPTERS.filter((item) => item.id !== 'MODEL')
  const current = chapters.findIndex((item) => item.id === chapter)

  return (
    <motion.nav className="v9-chapter-rail" aria-label="Journey through the model" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
      {chapters.map((item, index) => {
        const active = item.id === chapter
        const passed = index < current
        return (
          <motion.div layoutId={`v9-chapter-${item.id}`} className="v9-chapter" key={item.id} data-active={active ? 'true' : undefined} data-passed={passed ? 'true' : undefined} transition={{ type: 'spring', stiffness: 100, damping: 24 }}>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <strong>{active ? <SketchAnnotation type="highlight" color="#f3cd64" strokeWidth={2} padding={4}>{item.label}</SketchAnnotation> : item.label}</strong>
            <span>{item.hint}</span>
          </motion.div>
        )
      })}
    </motion.nav>
  )
}

export function ChapterHeading({ eyebrow, children, note }: { eyebrow: string; children: ReactNode; note?: ReactNode }) {
  return (
    <header className="v9-heading">
      <small>{eyebrow}</small>
      <h2>{children}</h2>
      {note ? <p>{note}</p> : null}
    </header>
  )
}

export function PaperNote({ title, children, tone = 'pencil', className = '' }: { title?: string; children: ReactNode; tone?: 'pencil' | 'yellow' | 'orange' | 'teal'; className?: string }) {
  return (
    <motion.aside className={`v9-paper-note ${className}`.trim()} data-tone={tone} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {title ? <strong>{title}</strong> : null}
      <span>{children}</span>
    </motion.aside>
  )
}

export function VectorStrip({ numbers = false, changed = false, compact = false }: { numbers?: boolean; changed?: boolean; compact?: boolean }) {
  return (
    <div className={`v9-vector ${compact ? 'is-compact' : ''}`} data-changed={changed ? 'true' : undefined}>
      {EMBEDDING_PREVIEW.map((value, index) => {
        const strength = Math.min(1, Math.abs(value) + (changed ? ((index * 17) % 5) / 18 : 0))
        return (
          <i key={index} style={{ '--s': strength } as CSSProperties}>
            {numbers ? <span>{value.toFixed(2)}</span> : null}
          </i>
        )
      })}
      <b>…</b>
    </div>
  )
}

export function HeroVector({ label = 'it', note = 'current representation', changed = false, compact = false, layoutId = 'v9-hero-vector' }: { label?: string; note?: string; changed?: boolean; compact?: boolean; layoutId?: string }) {
  return (
    <motion.div layoutId={layoutId} className={`v9-hero-vector ${compact ? 'is-compact' : ''}`} transition={{ type: 'spring', stiffness: 120, damping: 24 }}>
      <small>{note}</small>
      <strong>{label}</strong>
      <VectorStrip changed={changed} compact={compact} />
    </motion.div>
  )
}

export function ArrowVerb({ verb, vertical = false }: { verb: string; vertical?: boolean }) {
  return (
    <div className={`v9-arrow-verb ${vertical ? 'is-vertical' : ''}`} aria-label={verb}>
      <span>{verb}</span><i />
    </div>
  )
}

export function DebugBeat({ beat }: { beat: Beat }) {
  const debug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1'
  if (!debug) return null
  return (
    <div className="v9-debug">
      <b>{beat.n}/100 · {beat.id}</b>
      <span>LEARN: {beat.learn}</span>
      <span>MOTION: {beat.cue}</span>
    </div>
  )
}
