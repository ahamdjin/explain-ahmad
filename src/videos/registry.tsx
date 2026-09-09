import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type VideoRouteDefinition = {
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType>
}

const Glm320bVideo = lazy(() => import('./glm-320b/v9/Glm320bProductionV9'))
const GptSection01 = lazy(() => import('./glm-320b/gpt-section-01/Section01'))
const Section01 = lazy(() => import('./glm-320b/section-01/Section01'))
const Section02 = lazy(() => import('./glm-320b/section-02/Section02'))
const Section07 = lazy(() => import('./glm-320b/section-07/Section07'))

/**
 * Real video pages are registered only after their story is known.
 * Each route owns its full-screen production experience and stays lazy-loaded.
 */
export const videoRoutes: VideoRouteDefinition[] = [
  { slug: 'gpt-section-01', title: 'GPT Section 1 — A continuous experiment', component: GptSection01 },
  {
    slug: 'why-320b-uses-18b',
    title: 'Why Does a 320B AI Only Use 18B Parameters?',
    component: Glm320bVideo,
  },
  {
    slug: 'section-01',
    title: 'Section 01 — The claim on trial',
    component: Section01,
  },
  {
    slug: 'section-02',
    title: 'Section 02 — Follow one word in',
    component: Section02,
  },
  {
    slug: 'section-07',
    title: 'Section 07 — The answer',
    component: Section07,
  },
]
