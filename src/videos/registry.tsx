import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export const VIDEO_NAME = 'The 18 Billion Mystery'
export const VIDEO_TITLE = '320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?'
export const VIDEO_SLUG = '320b-parameters-only-18b-active-why-does-it-need-8-gpus'
export const VIDEO_PATH = `/${VIDEO_SLUG}`

export type VideoSectionProps = {
  onFinish?: () => void
  autoplay?: boolean
}

export type VideoChapterDefinition = {
  n: number
  slug: string
  title: string
  enters: string
  component: LazyExoticComponent<ComponentType<VideoSectionProps>>
}

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

export const videoChapters: VideoChapterDefinition[] = [
  { n: 1, slug: 'section-01', title: 'The five-percent problem', enters: '', component: Section01 },
  {
    n: 2,
    slug: 'section-02',
    title: 'What the model actually receives',
    enters: 'Because it doesn’t start with words.',
    component: Section02,
  },
  {
    n: 3,
    slug: 'section-03',
    title: 'From 432 to a useful representation',
    enters: '432 is only an address. Where does anything useful come from?',
    component: Section03,
  },
  {
    n: 4,
    slug: 'section-04',
    title: '“it” gets context',
    enters: 'Every `it` starts with the same embedding; how does this one become sentence-specific?',
    component: Section04,
  },
  {
    n: 5,
    slug: 'section-05',
    title: 'The router picks the eight',
    enters: 'We now have `it` in this sentence; which parts of the model should work on it?',
    component: Section05,
  },
  {
    n: 6,
    slug: 'section-06',
    title: 'The experts do the work',
    enters: 'The router picked eight; what do they actually do?',
    component: Section06,
  },
  {
    n: 7,
    slug: 'section-07',
    title: 'One layer becomes forty-five',
    enters: 'We just processed `it` through one sparse layer; how many times does this happen?',
    component: Section07,
  },
  {
    n: 8,
    slug: 'section-08',
    title: 'That was one token',
    enters: 'Our prompt had eight tokens; what were the other seven doing?',
    component: Section08,
  },
  {
    n: 9,
    slug: 'section-09',
    title: 'Where the next token comes from',
    enters: 'The prompt is processed; how do numbers become the next token?',
    component: Section09,
  },
  {
    n: 10,
    slug: 'section-10',
    title: 'And then it does it again',
    enters: 'One token came out; how does the model produce the next one?',
    component: Section10,
  },
  {
    n: 11,
    slug: 'section-11',
    title: 'So which 18B are active?',
    enters: 'Which 18B are active?',
    component: Section11,
  },
  {
    n: 12,
    slug: 'section-12',
    title: 'How people actually run these',
    enters: 'If fetching every selected expert from slow storage is terrible, how can offloading work at all?',
    component: Section12,
  },
  {
    n: 13,
    slug: 'section-13',
    title: 'What 18B active actually buys',
    enters: 'If active parameters are not a direct memory promise, what did sparsity buy us?',
    component: Section13,
  },
]

/** Direct section routes are production tooling: frame capture, QA and deep links. */
export const videoRoutes = videoChapters.map(({ slug, title, component }) => ({ slug, title, component }))
