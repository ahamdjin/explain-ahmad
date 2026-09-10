import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type PointerEvent as ReactPointerEvent, useEffect } from 'react'
import { SceneFrame, VideoPage } from '../../../engine/SceneFrame'
import { PaperBackdrop } from '../v9/shared'
import { OpeningWorld } from '../v9/worlds/OpeningWorld'
import { TokenEmbeddingWorld } from '../v9/worlds/TokenEmbeddingWorld'
import { TransformerWorld } from '../v9/worlds/TransformerWorld'
import { BuildingWorld } from '../v9/worlds/BuildingWorld'
import { OutputWorld } from '../v9/worlds/OutputWorld'
import { FinalWorld, MemoryWorld, PredictionOverlay, PromptWorld } from './GptCustomWorlds'
import { GPT_CHAPTERS, GPT_PREDICTION_BEATS, mapGptBeatToV9 } from './gptStory'
import { useGptBeatDirector } from './useGptBeatDirector'
import '../v9/production-v9.css'
import '../v9/production-v9-fixes.css'
import '../v9/production-v10.css'
import '../v9/opening-v1.css'
import '../v9/opening-v2-art.css'
import '../v9/opening-v2-labels.css'
import './gpt-watch.css'

function worldKey(beat: number) {
  if (beat <= 12) return 'opening'
  if (beat <= 16) return 'prompt'
  if (beat <= 32) return 'tokens'
  if (beat <= 76) return 'transformer'
  if (beat <= 88) return 'memory'
  if (beat <= 100) return 'building'
  if (beat <= 112) return 'output'
  return 'final'
}

function GptWorld({ beat }: { beat: number }) {
  const mapped = mapGptBeatToV9(beat)
  if (beat <= 12) return <OpeningWorld beat={beat} />
  if (beat <= 16) return <PromptWorld beat={beat} />
  if (beat <= 32 && mapped) return <TokenEmbeddingWorld beat={mapped} />
  if (beat <= 76 && mapped) return <TransformerWorld beat={mapped} />
  if (beat <= 88) return <MemoryWorld beat={beat} />
  if (beat <= 100 && mapped) return <BuildingWorld beat={mapped} />
  if (beat <= 112 && mapped) return <OutputWorld beat={mapped} />
  return <FinalWorld beat={beat} />
}

function GptChapterRail({ beat }: { beat: number }) {
  if (beat <= 12 || beat >= 113) return null
  const current = GPT_CHAPTERS.findIndex((chapter) => beat >= chapter.start && beat <= chapter.end)
  return (
    <motion.nav className="gpt-chapter-rail" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} aria-label="GPT explainer chapters">
      {GPT_CHAPTERS.slice(1, -1).map((chapter, index) => {
        const absolute = index + 1
        const active = absolute === current
        const passed = absolute < current
        return <div key={chapter.id} data-active={active ? 'true' : undefined} data-passed={passed ? 'true' : undefined}><small>{String(index + 1).padStart(2, '0')}</small><strong>{chapter.label}</strong></div>
      })}
    </motion.nav>
  )
}

export default function GptWatch() {
  const director = useGptBeatDirector()
  const reducedMotion = useReducedMotion()
  const beat = director.beatNumber
  const prediction = GPT_PREDICTION_BEATS[beat]

  useEffect(() => {
    const oldHtml = document.documentElement.style.overflow
    const oldBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = oldHtml
      document.body.style.overflow = oldBody
    }
  }, [])

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const target = event.target as HTMLElement
    if (target.closest('button, a, input, textarea, select, [data-no-advance]')) return
    director.next()
  }

  return (
    <VideoPage className={`v9-page gpt-watch-page ${reducedMotion ? 'reduce-motion' : ''}`}>
      <LayoutGroup id="glm-gpt-watch">
        <SceneFrame art="paper" className="v9-scene gpt-scene">
          <PaperBackdrop />
          <div className="v9-viewport">
            <motion.div className="v9-frame gpt-frame" onPointerUp={onPointerUp} role="application" aria-label="GPT storyboard watch page for the GLM 320B to 18B explainer">
              <div className="gpt-watch-badge"><strong>GPT WATCH</strong><span>alternate 120-beat cut</span></div>
              <GptChapterRail beat={beat} />

              <AnimatePresence mode="sync" initial={false}>
                <motion.div className="gpt-world-host" key={worldKey(beat)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
                  <GptWorld beat={beat} />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>{prediction ? <PredictionOverlay key={beat} {...prediction} /> : null}</AnimatePresence>

              <div className="gpt-progress" aria-hidden="true"><motion.i animate={{ scaleX: director.progress }} /></div>
              <div className="gpt-beat-counter"><b>{String(beat).padStart(3, '0')}</b><span>/ 120</span></div>
              {beat === 1 ? <motion.div className="gpt-controls-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>click · scroll · Space/→ · ← to go back</motion.div> : null}
            </motion.div>
          </div>
        </SceneFrame>
      </LayoutGroup>
    </VideoPage>
  )
}
