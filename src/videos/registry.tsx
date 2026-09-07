import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type VideoRouteDefinition = {
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType>
}

const Glm320bVideo = lazy(() => import('./glm-320b/Glm320bVideoV5'))

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
]
