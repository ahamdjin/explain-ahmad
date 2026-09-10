import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type VideoRouteDefinition = {
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType>
}

/**
 * The thirteen sections of the current build, plus the studies and the
 * superseded eight kept for comparison.
 *
 * Individual section routes exist for **review**: no section makes sense on its
 * own, and `/watch` is the product. `npm run smoke` reads its route list out of
 * this file, so a new section is covered the moment it is registered here.
 */
const Section01 = lazy(() => import('./glm-320b/section-01/Section01'))
const Section02 = lazy(() => import('./glm-320b/section-02/Section02'))
const Section03 = lazy(() => import('./glm-320b/section-03/Section03'))
const Section04 = lazy(() => import('./glm-320b/section-04/Section04'))
const Section05 = lazy(() => import('./glm-320b/section-05/Section05'))
const Section06 = lazy(() => import('./glm-320b/section-06/Section06'))
const Section07 = lazy(() => import('./glm-320b/section-07/Section07'))
const Section08 = lazy(() => import('./glm-320b/section-08/Section08'))
const Section09 = lazy(() => import('./glm-320b/section-09/Section09'))
const Section10 = lazy(() => import('./glm-320b/section-10/Section10'))
const Section11 = lazy(() => import('./glm-320b/section-11/Section11'))
const Section12 = lazy(() => import('./glm-320b/section-12/Section12'))
const Section13 = lazy(() => import('./glm-320b/section-13/Section13'))

/** Kept routed so the two openings can still be compared side by side. */
const Glm320bVideo = lazy(() => import('./glm-320b/v9/Glm320bProductionV9'))
const GptSection01 = lazy(() => import('./glm-320b/gpt-section-01/Section01'))

/** The superseded eight-section build. `storyboard/STORY_SPINE.md` §6. */
const Old01 = lazy(() => import('./glm-320b/superseded/section-01/Section01'))
const Old02 = lazy(() => import('./glm-320b/superseded/section-02/Section02'))
const Old03 = lazy(() => import('./glm-320b/superseded/section-03/Section03'))
const Old04 = lazy(() => import('./glm-320b/superseded/section-04/Section04'))
const Old05 = lazy(() => import('./glm-320b/superseded/section-05/Section05'))
const Old06 = lazy(() => import('./glm-320b/superseded/section-06/Section06'))
const Old07 = lazy(() => import('./glm-320b/superseded/section-07/Section07'))
const Old08 = lazy(() => import('./glm-320b/superseded/section-08/Section08'))

export const videoRoutes: VideoRouteDefinition[] = [
  { slug: 'section-01', title: 'Section 01 — What "18 billion active" means', component: Section01 },
  { slug: 'section-02', title: 'Section 02 — Your words become tokens', component: Section02 },
  { slug: 'section-03', title: 'Section 03 — From an ID to a meaning', component: Section03 },
  { slug: 'section-04', title: 'Section 04 — The word looks around', component: Section04 },
  { slug: 'section-05', title: 'Section 05 — The router picks the eight', component: Section05 },
  { slug: 'section-06', title: 'Section 06 — The experts do the work', component: Section06 },
  { slug: 'section-07', title: 'Section 07 — That was one layer. There are 45.', component: Section07 },
  { slug: 'section-08', title: 'Section 08 — That was one token. Here’s the sentence.', component: Section08 },
  { slug: 'section-09', title: 'Section 09 — Where the answer comes out', component: Section09 },
  { slug: 'section-10', title: 'Section 10 — And then it does the whole thing again', component: Section10 },
  { slug: 'section-11', title: 'Section 11 — So could you store only the 18 billion?', component: Section11 },
  { slug: 'section-12', title: 'Section 12 — How people actually run these', component: Section12 },
  { slug: 'section-13', title: 'Section 13 — What that number actually bought', component: Section13 },

  { slug: 'gpt-section-01', title: 'GPT Section 1 — an alternative opening', component: GptSection01 },
  { slug: 'why-320b-uses-18b', title: 'Production v9 — superseded', component: Glm320bVideo },

  { slug: 'old/section-01', title: 'Superseded — the claim on trial', component: Old01 },
  { slug: 'old/section-02', title: 'Superseded — follow one word in', component: Old02 },
  { slug: 'old/section-03', title: 'Superseded — the word becomes numbers', component: Old03 },
  { slug: 'old/section-04', title: 'Superseded — where the numbers change', component: Old04 },
  { slug: 'old/section-05', title: 'Superseded — new numbers, new team', component: Old05 },
  { slug: 'old/section-06', title: 'Superseded — forty-two floors', component: Old06 },
  { slug: 'old/section-07', title: 'Superseded — the answer', component: Old07 },
  { slug: 'old/section-08', title: 'Superseded — the verdict', component: Old08 },
]
