import { useEffect, useState } from 'react'
import { ExpertCache, Ground, RunningMachine, Slot, Tower, TradeSlider } from '../../../../paper'
import { Hospital } from '../../../../paper/cast/Hospital'
import { Counter, FetchPath, Store } from '../../../../paper/cast/Memory'
import { Narrator } from '../../../../paper/cast/Narrator'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

/**
 * The slider's value lives here, and everything the trade affects reads it.
 *
 * That is the whole design of this section. A demonstration like this dies of
 * one failure mode — the control saying one thing while the picture says
 * another — so there is exactly one number, and the box's size, the machine's
 * pace and the machine's bulk are all derived from it. The beats can drive it,
 * and the viewer can always take it back.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const [kept, setKept] = useState(scene.slider.driven ?? 0.4)

  /* A beat driving the handle also moves everything else, in one place. */
  useEffect(() => {
    if (scene.slider.driven !== undefined) setKept(scene.slider.driven)
  }, [scene.slider.driven])

  /* Diminishing returns: the first slots bought are worth far more than the
   * last, which is what makes both ends of the slider bad rather than one. */
  const pace = 1 - (1 - kept) ** 2
  const bulk = kept

  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Slot on={scene.wall.on} at={scene.wall.at} scale={scene.wall.scale} z={0} feel={feel}>
        <div style={{ opacity: 0.22, filter: 'saturate(.3)' }}>
          <Hospital
            sign=""
            plaque=""
            staffed
            lit={[]}
            was={[]}
            focus={false}
            quiet={false}
            heavy={false}
            bunks={false}
            doorsOpen={false}
          />
        </div>
      </Slot>

      <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={0} feel={feel}>
        <Tower ghost />
      </Slot>

      <Slot on={scene.store.on} at={scene.store.at} scale={scene.store.scale} z={2} feel={feel}>
        <Store label={scene.store.label} />
      </Slot>

      <Slot on={scene.path.on} at={scene.path.at} scale={scene.path.scale} z={2} feel={feel}>
        <FetchPath items={scene.path.items} jammed={scene.path.jammed} />
      </Slot>

      <Slot on={scene.cache.on} at={scene.cache.at} scale={scene.cache.scale} z={3} feel={feel}>
        <ExpertCache
          kept={kept}
          filled={scene.cache.filled}
          hits={scene.cache.hits}
          label="kept close"
          tag={scene.cache.tag}
        />
      </Slot>

      <Slot on={scene.machine.on} at={scene.machine.at} scale={scene.machine.scale} z={2} feel={feel}>
        <RunningMachine pace={pace} bulk={bulk} words={scene.machine.words} />
      </Slot>

      <Slot on={scene.hangover.on} at={scene.hangover.at} scale={scene.hangover.scale} z={4} feel={feel}>
        <div className="s12-hangover">{scene.hangover.text}</div>
      </Slot>

      <Slot on={scene.count.on} at={scene.count.at} scale={scene.count.scale} z={5} feel={feel}>
        <Counter value={scene.count.value} label={scene.count.label} run={scene.count.run} seconds={1.8} />
      </Slot>

      <Slot on={scene.slider.on} at={scene.slider.at} scale={scene.slider.scale} z={6} feel={feel}>
        <TradeSlider driven={scene.slider.driven} onChange={setKept} ask={scene.slider.ask || undefined} />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={7} feel={feel}>
        <Narrator
          pose={scene.narrator.pose}
          style={scene.narrator.style}
          flip={scene.narrator.flip}
          scale={scene.narrator.scale}
        />
      </Slot>
    </>
  )
}
