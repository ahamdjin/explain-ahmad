import { lazy, Suspense, useCallback, useEffect, useState, type ComponentType } from 'react'
import { ChapterDots } from '../paper/rail'
import './watch.css'

/**
 * The whole piece, one section after another.
 *
 * Individual section routes exist for review, but no section makes sense on
 * its own -- the chain is the product. Section 1 plants an event that section 7
 * spends its whole runtime paying off, and a viewer who never sees both has not
 * seen the video.
 *
 * All thirteen are built. The `component` field is kept optional anyway, so
 * that a section taken out for rework shows as a plate rather than silently
 * vanishing from the chain.
 */

type Chapter = {
  n: number
  title: string
  /** The question the viewer arrives holding. Must match the previous exit. */
  enters: string
  component?: ComponentType<{ onFinish?: () => void; autoplay?: boolean }>
}

const Section01 = lazy(() => import('../videos/glm-320b/video-1/section-01/Section01'))
const Section02 = lazy(() => import('../videos/glm-320b/video-1/section-02/Section02'))
const Section03 = lazy(() => import('../videos/glm-320b/video-1/section-03/Section03'))
const Section04 = lazy(() => import('../videos/glm-320b/video-1/section-04/Section04'))
const Section05 = lazy(() => import('../videos/glm-320b/video-1/section-05/Section05'))
const Section06 = lazy(() => import('../videos/glm-320b/video-1/section-06/Section06'))
const Section07 = lazy(() => import('../videos/glm-320b/video-1/section-07/Section07'))
const Section08 = lazy(() => import('../videos/glm-320b/video-1/section-08/Section08'))
const Section09 = lazy(() => import('../videos/glm-320b/video-1/section-09/Section09'))
const Section10 = lazy(() => import('../videos/glm-320b/video-1/section-10/Section10'))
const Section11 = lazy(() => import('../videos/glm-320b/video-1/section-11/Section11'))
const Section12 = lazy(() => import('../videos/glm-320b/video-1/section-12/Section12'))
const Section13 = lazy(() => import('../videos/glm-320b/video-1/section-13/Section13'))

/**
 * The thirteen-section chain from `storyboard/video-1/STORY_SPINE.md` v4.
 *
 * `enters` is the question the viewer arrives holding, and it must match what
 * the previous section left them with — `npm run check:chain` asserts exactly
 * that against the scripts' contract tables.
 */
const CHAPTERS: Chapter[] = [
  { n: 1, title: 'What "18 billion active" means', enters: '', component: Section01 },
  { n: 2, title: 'Your words become tokens', enters: 'Who picks the eight, and why can’t they tell us in advance?', component: Section02 },
  { n: 3, title: 'From an ID to a meaning', enters: 'A row number has no meaning in it. So how does it know what anything means?', component: Section03 },
  { n: 4, title: 'The word looks around', enters: 'That row is the same every single time. So how does the word ever mean two things?', component: Section04 },
  { n: 5, title: 'The router picks the eight', enters: 'So the numbers depend on the sentence. Who reads them, and what do they decide?', component: Section05 },
  { n: 6, title: 'The experts do the work', enters: 'Eight experts are picked. What do they actually do?', component: Section06 },
  { n: 7, title: 'That was one layer. There are 45.', enters: 'How many steps are there?', component: Section07 },
  { n: 8, title: 'That was one token. Here’s the sentence.', enters: '336 choices for one token. But a sentence isn’t one token.', component: Section08 },
  { n: 9, title: 'Where the answer comes out', enters: 'All of that happens. What comes out?', component: Section09 },
  { n: 10, title: 'And then it does the whole thing again', enters: 'All that machinery, and one word comes out?', component: Section10 },
  { n: 11, title: 'So could you store only the 18 billion?', enters: 'It never stops choosing. So could you store only the part it uses?', component: Section11 },
  { n: 12, title: 'How people actually run these', enters: 'So you can’t store only the active part. But people run big models on small machines.', component: Section12 },
  { n: 13, title: 'What that number actually bought', enters: 'It’s a price, not a wall. So what did “18 billion active” actually get us?', component: Section13 },
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

  /**
   * Straight to a chapter, through the same page turn.
   *
   * The turn is kept rather than skipped: without it the swap is a hard cut
   * and the new section's first beat has already started animating before the
   * old one has gone.
   */
  const goTo = useCallback(
    (wanted: number) => {
      if (wanted === index) return
      setTurning(true)
      window.setTimeout(() => {
        setIndex(Math.max(0, Math.min(CHAPTERS.length - 1, wanted)))
        setTurning(false)
      }, 420)
    },
    [index],
  )

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

      {/*
        No chapter plate. It sat in the top corner naming the section and
        counting it out of thirteen, which is production scaffolding printed
        over the film -- the dots already say where you are, and a viewer does
        not need to be told they are five thirteenths of the way through.
      */}
      {chrome ? (
        <ChapterDots
          count={CHAPTERS.length}
          index={index}
          labels={CHAPTERS.map((item) => item.title)}
          onPick={goTo}
        />
      ) : null}
    </div>
  )
}
