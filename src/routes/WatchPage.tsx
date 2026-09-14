import { lazy, Suspense, useCallback, useEffect, useState, type ComponentType } from 'react'
import { ChapterDots } from '../paper/rail'
import './watch.css'

const VIDEO_TITLE = '320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?'

/**
 * The whole piece, one section after another.
 *
 * Individual section routes exist for review, but the chain is the product.
 * Section 1 creates the 1-vs-8 contradiction and Section 13 returns to that
 * exact frame after the viewer has followed `it` through the machine.
 */
type Chapter = {
  n: number
  title: string
  /** The question the viewer arrives holding. */
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

const CHAPTERS: Chapter[] = [
  { n: 1, title: 'The five-percent problem', enters: '', component: Section01 },
  { n: 2, title: 'What the model actually receives', enters: 'Because it doesn’t start with words.', component: Section02 },
  { n: 3, title: 'From 432 to a useful representation', enters: '432 is only an address. Where does anything useful come from?', component: Section03 },
  { n: 4, title: '“it” gets context', enters: 'every `it` starts with the same embedding; how does this one become sentence-specific?', component: Section04 },
  { n: 5, title: 'The router picks the eight', enters: 'we now have `it` in this sentence; which parts of the model should work on it?', component: Section05 },
  { n: 6, title: 'The experts do the work', enters: 'the router picked eight; what do they actually do?', component: Section06 },
  { n: 7, title: 'One layer becomes forty-five', enters: 'we just processed `it` through one sparse layer; how many times does this happen?', component: Section07 },
  { n: 8, title: 'That was one token', enters: 'our prompt had eight tokens; what were the other seven doing?', component: Section08 },
  { n: 9, title: 'Where the next token comes from', enters: 'the prompt is processed; how do numbers become the next token?', component: Section09 },
  { n: 10, title: 'And then it does it again', enters: 'one token came out; how does the model produce the next one?', component: Section10 },
  { n: 11, title: 'So which 18B are active?', enters: 'which 18B are active?', component: Section11 },
  { n: 12, title: 'How people actually run these', enters: 'if fetching every selected expert from slow storage is terrible, how can offloading work at all?', component: Section12 },
  { n: 13, title: 'What 18B active actually buys', enters: 'if active parameters are not a direct memory promise, what did sparsity buy us?', component: Section13 },
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
  const [turning, setTurning] = useState(false)

  useEffect(() => {
    document.title = VIDEO_TITLE
  }, [])

  const next = useCallback(() => {
    setTurning(true)
    window.setTimeout(() => {
      setIndex((i) => Math.min(CHAPTERS.length - 1, i + 1))
      setTurning(false)
    }, 420)
  }, [])

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
          <span className="w-todo-tag">visual implementation pending</span>
        </div>
      )}

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
