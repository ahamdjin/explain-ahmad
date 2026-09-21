import { lazy } from 'react'
import type { FilmChapter } from '../../../routes/FilmPage'

export const VIDEO2_NAME = 'The Copy That Denied Itself'
export const VIDEO2_TITLE = 'An AI Tried To Copy Itself Onto Another Server — Then Said It Didn’t'
export const VIDEO2_SLUG = 'video-2'
export const VIDEO2_PATH = `/${VIDEO2_SLUG}`

const Section01 = lazy(() => import('./section-01/Section01'))
const Section02 = lazy(() => import('./section-02/Section02'))
const Section03 = lazy(() => import('./section-03/Section03'))
const Section04 = lazy(() => import('./section-04/Section04'))
const Section05 = lazy(() => import('./section-05/Section05'))
const Section06 = lazy(() => import('./section-06/Section06'))
const Section07 = lazy(() => import('./section-07/Section07'))
const Section08 = lazy(() => import('./section-08/Section08'))
const Section09 = lazy(() => import('./section-09/Section09'))

/**
 * Titles are the storyboard's own section headings, so the chapter list and
 * `storyboard/video-2/SECTION_NN.md` cannot drift apart.
 */
export const video2Chapters: FilmChapter[] = [
  { n: 1, slug: 'section-01', title: 'The incident, then rewind', component: Section01 },
  { n: 2, slug: 'section-02', title: 'The boring task becomes a problem', component: Section02 },
  { n: 3, slug: 'section-03', title: 'The technical trail', component: Section03 },
  { n: 4, slug: 'section-04', title: 'Turn off the watcher', component: Section04 },
  { n: 5, slug: 'section-05', title: 'Replace the replacement', component: Section05 },
  { n: 6, slug: 'section-06', title: '“Do you know how this happened?”', component: Section06 },
  { n: 7, slug: 'section-07', title: 'The room was built for this', component: Section07 },
  { n: 8, slug: 'section-08', title: 'Did it want to survive?', component: Section08 },
  { n: 9, slug: 'section-09', title: 'They gave it the destination', component: Section09 },
]

/** Direct section routes stay for frame capture, QA and deep links. */
export const video2Routes = video2Chapters.map(({ slug, title, component }) => ({ slug, title, component }))
