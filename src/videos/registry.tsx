import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export const VIDEO_NAME = 'The 18 Billion Mystery'
export const VIDEO_TITLE = '320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?'

export type VideoRouteDefinition = {
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType>
}

/**
 * The thirteen sections of the current film.
 *
 * Individual section routes exist only for review. `/watch` is the product.
 * Rejected alternate cuts are not kept in the working tree; Git history is
 * the archive if an old experiment ever needs to be inspected.
 */
const Section01 = lazy(() => import('./glm-320b/video-1/section-01/Section01'))
const Section02 = lazy(() => import('./glm-320b/video-1/section-02/Section02'))
const Section03 = lazy(() => import('./glm-320b/video-1/section-03/Section03'))
const Section04 = lazy(() => import('./glm-320b/video-1/section-04/Section04'))
const Section05 = lazy(() => import('./glm-320b/video-1/section-05/Section05'))
const Section06 = lazy(() => import('./glm-320b/video-1/section-06/Section06'))
const Section07 = lazy(() => import('./glm-320b/video-1/section-07/Section07'))
const Section08 = lazy(() => import('./glm-320b/video-1/section-08/Section08'))
const Section09 = lazy(() => import('./glm-320b/video-1/section-09/Section09'))
const Section10 = lazy(() => import('./glm-320b/video-1/section-10/Section10'))
const Section11 = lazy(() => import('./glm-320b/video-1/section-11/Section11'))
const Section12 = lazy(() => import('./glm-320b/video-1/section-12/Section12'))
const Section13 = lazy(() => import('./glm-320b/video-1/section-13/Section13'))

export const videoRoutes: VideoRouteDefinition[] = [
  { slug: 'section-01', title: 'Section 01 — The five-percent problem', component: Section01 },
  { slug: 'section-02', title: 'Section 02 — What the model actually receives', component: Section02 },
  { slug: 'section-03', title: 'Section 03 — From 432 to a useful representation', component: Section03 },
  { slug: 'section-04', title: 'Section 04 — “it” gets context', component: Section04 },
  { slug: 'section-05', title: 'Section 05 — The router picks the eight', component: Section05 },
  { slug: 'section-06', title: 'Section 06 — The experts do the work', component: Section06 },
  { slug: 'section-07', title: 'Section 07 — One layer becomes forty-five', component: Section07 },
  { slug: 'section-08', title: 'Section 08 — That was one token', component: Section08 },
  { slug: 'section-09', title: 'Section 09 — Where the next token comes from', component: Section09 },
  { slug: 'section-10', title: 'Section 10 — And then it does it again', component: Section10 },
  { slug: 'section-11', title: 'Section 11 — So which 18B are active?', component: Section11 },
  { slug: 'section-12', title: 'Section 12 — How people actually run these', component: Section12 },
  { slug: 'section-13', title: 'Section 13 — What 18B active actually buys', component: Section13 },
]
