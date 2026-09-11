import {
  BARKED,
  Camera,
  FOLLOWED,
  Ground,
  HOT,
  NumberRow,
  PROMPT,
  Slot,
  WEIGHTS,
} from '../../../../paper'
import { Narrator } from '../../../../paper/cast/Narrator'
import { Sentence } from '../../../../paper/cast/Sentence'
import { type Feel } from '../../../../paper/motion'
import {DOG_SEED, type SceneState} from './scene'

/**
 * The two `dog` rows are generated the honest way.
 *
 * Both start from `DOG_SEED` — genuinely the same row, which is §3's fact — and
 * each drifts a different distance and direction from it. So "started
 * identical, ended nothing alike" is true of the numbers actually on screen,
 * not just of the voice-over saying so.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={3} feel={feel}>
          <NumberRow seed={DOG_SEED} shown={10} tone="measure" label="dog" dim={scene.row.dim} />
        </Slot>

        <Slot on={scene.line.on} at={scene.line.at} scale={scene.line.scale} z={3} feel={feel}>
          <Sentence
            words={PROMPT}
            split
            rows
            focus={FOLLOWED}
            raise={scene.line.raise}
            changed={scene.line.changed}
            attention={
              scene.line.lines
                ? {
                    weights: WEIGHTS,
                    flat: scene.line.flat,
                    masked: scene.line.masked,
                    flow: scene.line.flow,
                  }
                : undefined
            }
          />
        </Slot>

        <Slot on={scene.barked.on} at={scene.barked.at} scale={scene.barked.scale} z={3} feel={feel}>
          <Sentence words={BARKED} split rows focus={1} />
        </Slot>
        <Slot on={scene.hot.on} at={scene.hot.at} scale={scene.hot.scale} z={3} feel={feel}>
          <Sentence words={HOT} split rows focus={2} />
        </Slot>

        <Slot on={scene.rowA.on} at={scene.rowA.at} scale={scene.rowA.scale} z={4} feel={feel}>
          <NumberRow seed={311} shown={8} tone="measure" basis={DOG_SEED} drift={0.72} label="“dog” in “the dog barked”" />
        </Slot>
        <Slot on={scene.rowB.on} at={scene.rowB.at} scale={scene.rowB.scale} z={4} feel={feel}>
          <NumberRow seed={9041} shown={8} tone="measure" basis={DOG_SEED} drift={0.78} label="“dog” in “a hot dog”" />
        </Slot>

        {/* The row both of them started from. Same seed, no drift. */}
        <Slot on={scene.ghost.on} at={scene.ghost.at} scale={scene.ghost.scale} z={2} feel={feel}>
          <NumberRow seed={DOG_SEED} shown={8} tone="ink" label="what “dog” starts as, every time" dim />
        </Slot>
      </Camera>

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
