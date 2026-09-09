import { lazy, Suspense, useCallback, useEffect, useState, type ComponentType } from 'react'
import './watch.css'

/**
 * The whole piece, one section after another.
 *
 * Individual section routes exist for review, but no section makes sense on
 * its own -- the chain is the product. Section 1 plants an event that section 7
 * spends its whole runtime paying off, and a viewer who never sees both has not
 * seen the video.
 *
 * Sections that are not built yet appear as a plate rather than being skipped
 * silently, so the gap in the chain is visible while it is still a gap.
 */

type Chapter = {
  n: number
  title: string
  /** The question the viewer arrives holding. Must match the previous exit. */
  enters: string
  component?: ComponentType<{ onFinish?: () => void }>
}

const Section01 = lazy(() => import('../videos/glm-320b/section-01/Section01'))
const Section02 = lazy(() => import('../videos/glm-320b/section-02/Section02'))
const Section03 = lazy(() => import('../videos/glm-320b/section-03/Section03'))
const Section04 = lazy(() => import('../videos/glm-320b/section-04/Section04'))
const Section05 = lazy(() => import('../videos/glm-320b/section-05/Section05'))
const Section06 = lazy(() => import('../videos/glm-320b/section-06/Section06'))
const Section07 = lazy(() => import('../videos/glm-320b/section-07/Section07'))
const Section08 = lazy(() => import('../videos/glm-320b/section-08/Section08'))

const CHAPTERS: Chapter[] = [
  { n: 1, title: 'The claim on trial', enters: '', component: Section01 },
  {
    n: 2,
    title: 'Follow one word in',
    enters: 'If the choice keeps changing, how could you ever hold only the ones you need?',
    component: Section02,
  },
  {
    n: 3,
    title: 'The word becomes numbers',
    enters: 'What is the router actually reading?',
    component: Section03,
  },
  {
    n: 4,
    title: 'Where the numbers change',
    enters: 'Those numbers are the same every time. So how did the team ever change?',
    component: Section04,
  },
  {
    n: 5,
    title: 'New numbers, new team',
    enters: 'With different numbers, would the router pick a different eight?',
    component: Section05,
  },
  {
    n: 6,
    title: 'Forty-two floors',
    enters: 'So this happens once per word — right?',
    component: Section06,
  },
  {
    n: 7,
    title: 'The answer',
    enters: 'Could you fetch 336 different sets, per word, fast enough?',
    component: Section07,
  },
  {
    n: 8,
    title: 'The verdict',
    enters: 'What did "18 billion active" ever buy?',
    component: Section08,
  },
]

function startAt() {
  if (typeof window === 'undefined') return 0
  const wanted = Number(new URLSearchParams(window.location.search).get('section'))
  if (!Number.isFinite(wanted) || wanted < 1) return 0
  return Math.min(CHAPTERS.length, Math.trunc(wanted)) - 1
}

export default function WatchPage() {
  const [index, setIndex] = useState(startAt)
  const chapter = CHAPTERS[index]
  const chrome = typeof window === 'undefined' || new URLSearchParams(window.location.search).get('chrome') !== '0'

  const next = useCallback(() => setIndex((i) => Math.min(CHAPTERS.length - 1, i + 1)), [])

  /* On a placeholder there is no section to take the keypress, so the page does. */
  useEffect(() => {
    if (chapter.component) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        next()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setIndex((i) => Math.max(0, i - 1))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [chapter.component, next])

  const Current = chapter.component

  return (
    <div className="w-page">
      {Current ? (
        <Suspense fallback={<div className="w-blank" />}>
          <Current key={chapter.n} onFinish={next} />
        </Suspense>
      ) : (
        <div className="w-todo" onClick={next} role="presentation">
          <p className="w-todo-n">Section {chapter.n}</p>
          <h2>{chapter.title}</h2>
          <p className="w-todo-q">{chapter.enters}</p>
          <span className="w-todo-tag">not built yet — script is written</span>
        </div>
      )}

      {chrome ? (
        <div className="w-chapter" data-no-advance>
          <b>
            {chapter.n} / {CHAPTERS.length}
          </b>
          <span>{chapter.title}</span>
        </div>
      ) : null}
    </div>
  )
}
