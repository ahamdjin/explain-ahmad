import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type VideoRouteDefinition = {
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType>
}

const Glm320bVideo = lazy(() => import('./glm-320b/v9/Glm320bProductionV9'))
const Section01 = lazy(() => import('./glm-320b/section-01/Section01'))

/**
 * Real video pages are registered only after their story is known.
 * Each route owns its full-screen production experience and stays lazy-loaded.
 */
export const videoRoutes: VideoRouteDefinition[] = [
  {
    slug: 'why-320b-uses-18b',
    title: 'Why Does a 320B AI Only Use 18B Parameters?',
    component: Glm320bVideo,
  },
  {
    slug: 'section-01',
    title: 'Section 01 — The 320B → 18B Mystery',
    component: Section01,
  },
]
