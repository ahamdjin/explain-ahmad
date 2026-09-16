import {
  Ground,
  PROMPT,
  Slot,
  Tower,
} from '../../../../paper'
import { Counter } from '../../../../paper/cast/Memory'
import { Narrator } from '../../../../paper/cast/Narrator'
import { Sentence } from '../../../../paper/cast/Sentence'
import { type Feel } from '../../../../paper/motion'
import {type SceneState} from './scene'

/**
 * The prompt sits at the base of the tower for the whole section.
 *
 * It is there so the nine markers have nine visible causes: a viewer who can
 * count the pieces can check the arithmetic, which is exactly why the total is
 * 2,688 and not a tidier round number.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={1} feel={feel}>
        <Tower
          floor={scene.tower.floor}
          markers={scene.tower.markers}
          wiring={scene.tower.wiring}
          alone={scene.tower.alone >= 0 ? scene.tower.alone : undefined}
          flash={scene.tower.flash}
          plaque={scene.tower.plaque || undefined}
          counters={scene.tower.counters || undefined}
        />
      </Slot>

      <Slot on={scene.line.on} at={scene.line.at} scale={scene.line.scale} z={3} feel={feel}>
        {/* The causal triangle is drawn inside the sentence's own svg, so the
            links land on the cards they connect. `masked` is what makes it a
            triangle: a position may reach backward and never forward. */}
        <Sentence
          words={PROMPT}
          split
          focus={scene.line.focus}
          rows={scene.line.rows}
          changedAll={scene.line.changed}
          attention={scene.line.causal ? { masked: true } : undefined}
        />
      </Slot>

      <Slot on={scene.count.on} at={scene.count.at} scale={scene.count.scale} z={5} feel={feel}>
        <Counter
            value={scene.count.value}
            label={scene.count.label}
            run={scene.count.run}
            blank={scene.count.blank}
            seconds={1.8}
          />
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
