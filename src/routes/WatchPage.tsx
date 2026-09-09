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
  component?: ComponentType<{ onFinish?: () => void; autoplay?: boolean }>
}

const Section01 = lazy(() => import('../videos/glm-320b/section-01/Section01'))

/**
 * The thirteen-section chain from `storyboard/STORY_SPINE.md` v4.
 *
 * `enters` is the question the viewer arrives holding, and it must match what
 * the previous section left them with. Sections not built yet appear as a
 * plate rather than being skipped, so the gap is visible while it is a gap.
 */
const CHAPTERS: Chapter[] = [
  { n: 1, title: 'What "18 billion active" means', enters: '', component: Section01 },
  { n: 2, title: 'Your words become tokens', enters: 'Who picks the eight, and why can’t they tell us in advance?' },
  { n: 3, title: 'From an ID to a meaning', enters: 'A row number has no meaning in it. So how does it know what anything means?' },
  { n: 4, title: 'The word looks around', enters: 'That row is the same every time. So how does the word ever mean two things?' },
  { n: 5, title: 'The router picks the eight', enters: 'The numbers depend on the sentence. Who reads them?' },
  { n: 6, title: 'The experts do the work', enters: 'Eight experts are picked. What do they actually do?' },
  { n: 7, title: 'That was one layer. There are 45.', enters: 'How many steps are there?' },
  { n: 8, title: 'That was one token. Here’s the sentence.', enters: '336 choices for one token. But a sentence isn’t one token.' },
  { n: 9, title: 'Where the answer comes out', enters: 'All of that happens. What comes out?' },
  { n: 10, title: 'And then it does the whole thing again', enters: 'All that machinery, and one word comes out?' },
  { n: 11, title: 'So could you store only the 18 billion?', enters: 'It never stops choosing. So could you store only the part it uses?' },
  { n: 12, title: 'How people actually run these', enters: 'But people run big models on small machines.' },
  { n: 13, title: 'What that number actually bought', enters: 'It’s a price, not a wall. So what did it buy?' },
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
  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search)
  const chrome = params?.get('chrome') !== '0'
  const autoplay = params?.get('play') === '1'
  /** A breath between chapters, so §7 does not cut straight into §8. */
  const [turning, setTurning] = useState(false)

  const next = useCallback(() => {
    setTurning(true)
    window.setTimeout(() => {
      setIndex((i) => Math.min(CHAPTERS.length - 1, i + 1))
      setTurning(false)
    }, 420)
  }, [])

  /* A placeholder has no section to take the keypress, and none to run a
   * timeline either, so the page does both. */
  useEffect(() => {
    if (chapter.component) return
    if (autoplay) {
      const hold = setTimeout(next, 2600)
      return () => clearTimeout(hold)
    }
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
  }, [chapter.component, next, autoplay])

  const Current = chapter.component

  return (
    <div className="w-page" data-turning={turning ? 'true' : undefined}>
      {Current ? (
        <Suspense fallback={<div className="w-blank" />}>
          <Current key={chapter.n} onFinish={next} autoplay={autoplay} />
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
