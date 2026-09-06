import { type ComponentType, type LazyExoticComponent } from 'react'

export type VideoRouteDefinition = {
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType>
}

/**
 * Real video pages live here only after the story/script is known.
 *
 * Example when we actually build one:
 *
 * const MoeVideo = lazy(() => import('./moe/MoeVideo'))
 * export const videoRoutes = [
 *   { slug: 'moe', title: 'Mixture of Experts', component: MoeVideo },
 * ]
 *
 * Keep this empty while we are building the library itself.
 */
export const videoRoutes: VideoRouteDefinition[] = []
