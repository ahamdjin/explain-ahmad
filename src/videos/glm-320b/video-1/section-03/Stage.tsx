import { Camera, Ground, NumberRow, Slot } from '../../../../paper'
import { EmbeddingTable, Space } from '../../../../paper/cast/Lookup'
import { Narrator } from '../../../../paper/cast/Narrator'
import { WordCard } from '../../../../paper/cast/Props'
import { type Feel } from '../../../../paper/motion'
import { DOG_SEED, type SceneState } from './scene'

/**
 * Three rows, and they are the section.
 *
 * `dog` is the basis; `cat` drifts a little from it; `Tuesday` does not drift,
 * it is simply a different row. That is how the comparison is drawn honestly:
 * the frame shows the **pattern** of agreement and never a similarity figure,
 * because nothing has been measured from this model's own table.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.table.on} at={scene.table.at} scale={scene.table.scale} z={1} feel={feel}>
          <EmbeddingTable pulled={scene.table.pulled} seeking={scene.table.seeking} label="one row per token" />
        </Slot>

        <Slot on={scene.dog.on} at={scene.dog.at} scale={scene.dog.scale} z={3} feel={feel}>
          <NumberRow
            seed={DOG_SEED}
            shown={10}
            extend={scene.dog.extend}
            tone="measure"
            basis={DOG_SEED}
            drift={0}
            showMatches={scene.dog.matches}
            label={scene.dog.label}
          />
        </Slot>

        <Slot on={scene.cat.on} at={scene.cat.at} scale={scene.cat.scale} z={3} feel={feel}>
          <NumberRow
            seed={91}
            shown={10}
            tone="measure"
            basis={DOG_SEED}
            drift={0.12}
            showMatches={scene.cat.matches}
            label={scene.cat.label}
          />
        </Slot>

        <Slot on={scene.tues.on} at={scene.tues.at} scale={scene.tues.scale} z={3} feel={feel}>
          <NumberRow
            seed={5507}
            shown={10}
            tone="measure"
            basis={DOG_SEED}
            drift={1}
            showMatches={scene.tues.matches}
            label={scene.tues.label}
          />
        </Slot>

        {/* The same row, pulled again. Same seed, so genuinely identical. */}
        <Slot on={scene.again1.on} at={scene.again1.at} scale={scene.again1.scale} z={3} feel={feel}>
          <NumberRow seed={DOG_SEED} shown={10} tone="measure" label="dog" />
        </Slot>
        <Slot on={scene.again2.on} at={scene.again2.at} scale={scene.again2.scale} z={3} feel={feel}>
          <NumberRow seed={DOG_SEED} shown={10} tone="measure" label="dog" />
        </Slot>

        <Slot on={scene.space.on} at={scene.space.at} scale={scene.space.scale} z={3} feel={feel}>
          <Space show={scene.space.show} measures={scene.space.measures} />
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
