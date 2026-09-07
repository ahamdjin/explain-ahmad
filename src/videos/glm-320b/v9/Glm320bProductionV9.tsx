import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type PointerEvent as ReactPointerEvent, useEffect } from 'react'
import { SceneFrame, VideoPage } from '../../../engine/SceneFrame'
import { BuildingWorld } from './worlds/BuildingWorld'
import { ChatWorld } from './worlds/ChatWorld'
import { ModelWorld } from './worlds/ModelWorld'
import { OutputWorld } from './worlds/OutputWorld'
import { TokenEmbeddingWorld } from './worlds/TokenEmbeddingWorld'
import { TransformerWorld } from './worlds/TransformerWorld'
import { ChapterRail, DebugBeat, PaperBackdrop } from './shared'
import { useBeatDirector } from './useBeatDirector'
import './production-v9.css'

function World({ world, beat }: { world: string; beat: number }) {
  if (world === 'model') return <ModelWorld beat={beat} />
  if (world === 'chat') return <ChatWorld beat={beat} />
  if (world === 'token') return <TokenEmbeddingWorld beat={beat} />
  if (world === 'transformer') return <TransformerWorld beat={beat} />
  if (world === 'building') return <BuildingWorld beat={beat} />
  return <OutputWorld beat={beat} />
}

export default function Glm320bProductionV9() {
  const director = useBeatDirector()
  const reducedMotion = useReducedMotion()
  const beatNumber = director.index + 1

  useEffect(() => {
    const oldOverflow = document.documentElement.style.overflow
    const oldBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = oldOverflow
      document.body.style.overflow = oldBodyOverflow
    }
  }, [])

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const target = event.target as HTMLElement
    if (target.closest('button, a, input, textarea, select, [data-no-advance]')) return
    director.next()
  }

  return (
    <VideoPage className={`v9-page ${reducedMotion ? 'reduce-motion' : ''}`}>
      <LayoutGroup id="glm-production-v9">
        <SceneFrame art="paper" className="v9-scene">
          <PaperBackdrop />
          <div className="v9-viewport">
            <motion.div
              className="v9-frame"
              onPointerUp={onPointerUp}
              role="application"
              aria-label="Why a 320B AI can use about 18B active parameters — interactive visual explanation"
            >
              <ChapterRail beatNumber={beatNumber} chapter={director.beat.chapter} />
              <AnimatePresence mode="sync" initial={false}>
                <motion.div className="v9-world-host" key={director.beat.world} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
                  <World world={director.beat.world} beat={beatNumber} />
                </motion.div>
              </AnimatePresence>

              <div className="v9-progress" aria-hidden="true"><motion.i animate={{ scaleX: director.progress }} /></div>
              {beatNumber === 1 ? <motion.div className="v9-controls-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>click · scroll · Space/→ to move · ← to go back</motion.div> : null}
              <DebugBeat beat={director.beat} />
            </motion.div>
          </div>
        </SceneFrame>
      </LayoutGroup>
    </VideoPage>
  )
}
