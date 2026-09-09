import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type VideoRouteDefinition = {
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType>
}

const Glm320bVideo = lazy(() => import('./glm-320b/v9/Glm320bProductionV9'))
const GptSection01 = lazy(() => import('./glm-320b/gpt-section-01/Section01'))
const Section01 = lazy(() => import('./glm-320b/section-01/Section01'))
const Old01 = lazy(() => import('./glm-320b/superseded/section-01/Section01'))
const Section02 = lazy(() => import('./glm-320b/superseded/section-02/Section02'))
const Section03 = lazy(() => import('./glm-320b/superseded/section-03/Section03'))
const Section04 = lazy(() => import('./glm-320b/superseded/section-04/Section04'))
const Section05 = lazy(() => import('./glm-320b/superseded/section-05/Section05'))
const Section06 = lazy(() => import('./glm-320b/superseded/section-06/Section06'))
const Section07 = lazy(() => import('./glm-320b/superseded/section-07/Section07'))
const Section08 = lazy(() => import('./glm-320b/superseded/section-08/Section08'))

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
    title: 'Section 01 — What "18 billion active" means',
    component: Section01,
  },
  { slug: 'old/section-01', title: 'Superseded — the claim on trial', component: Old01 },
  {
    slug: 'section-02',
    title: 'Section 02 — Follow one word in',
    component: Section02,
  },
  { slug: 'section-03', title: 'Section 03 — The word becomes numbers', component: Section03 },
  { slug: 'section-04', title: 'Section 04 — Where the numbers change', component: Section04 },
  { slug: 'section-05', title: 'Section 05 — New numbers, new team', component: Section05 },
  { slug: 'section-06', title: 'Section 06 — Forty-two floors', component: Section06 },
  { slug: 'section-07', title: 'Section 07 — The answer', component: Section07 },
  { slug: 'section-08', title: 'Section 08 — The verdict', component: Section08 },
]
