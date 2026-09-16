import { Camera, FOLLOWED, Ground, NumberRow, PROMPT, Slot, WEIGHTS } from '../../../../paper'
import { Hospital } from '../../../../paper/cast/Hospital'
import { Narrator } from '../../../../paper/cast/Narrator'
import { WordCard } from '../../../../paper/cast/Props'
import { Sentence } from '../../../../paper/cast/Sentence'
import { type Feel } from '../../../../paper/motion'
import { ROW_SEED, type SceneState } from './scene'

/**
 * The before-row and the after-row are drawn the honest way.
 *
 * `ghost` is generated from `ROW_SEED` with no drift — literally §3's row — and
 * the changed row is the sentence's own `it` row after `line.change`. So beat
 * 8's claim, *same ID and different numbers*, is true of the pixels rather than
 * only of the voice-over.
 *
 * The wall is mounted here rather than in §5 because §4 beat 13 has to show its
 * edge arriving. §5 completes the same object; it never cuts to a new one.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.wall.on} at={scene.wall.at} scale={scene.wall.scale} z={1} feel={feel}>
          <Hospital
            sign=""
            plaque=""
            staffed={false}
            lit={[]}
            was={[]}
            focus={false}
            quiet
            heavy={false}
            bunks={false}
            doorsOpen={false}
          />
        </Slot>

        {/* What `it` starts as, every time. Same seed, no drift. */}
        <Slot on={scene.ghost.on} at={scene.ghost.at} scale={scene.ghost.scale} z={2} feel={feel}>
          <NumberRow seed={ROW_SEED} shown={10} tone="ink" label="what `it` starts as" dim />
        </Slot>

        <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={3} feel={feel}>
          <NumberRow
            seed={scene.row.changed ? ROW_SEED + 1 : ROW_SEED}
            shown={10}
            tone="measure"
            basis={ROW_SEED}
            drift={scene.row.changed ? 0.55 : 0}
            label="it"
            dim={scene.row.dim}
          />
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

        <Slot on={scene.chip.on} at={scene.chip.at} scale={scene.chip.scale} z={6} feel={feel}>
          <WordCard label={scene.chip.label} id={scene.chip.id} becomes={scene.chip.becomes} />
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
