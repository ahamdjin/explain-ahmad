import { Camera, Ground, NumberRow, PROMPT, Slot } from '../../../../paper'
import { EmbeddingTable } from '../../../../paper/cast/Lookup'
import { Narrator } from '../../../../paper/cast/Narrator'
import { WordCard } from '../../../../paper/cast/Props'
import { Sentence } from '../../../../paper/cast/Sentence'
import { type Feel } from '../../../../paper/motion'
import { BALL_SENTENCE, DOG_SENTENCE, ROW_SEED, type SceneState } from './scene'

/**
 * Two rows, and they are the section.
 *
 * Both are generated from `ROW_SEED`, so beat 12's claim — *different
 * sentence, different referent, same starting embedding* — is true of what is
 * actually drawn rather than merely asserted over it. Do not give `rowB` its
 * own seed to make the frame look livelier; that would make the image lie.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.table.on} at={scene.table.at} scale={scene.table.scale} z={1} feel={feel}>
          <EmbeddingTable pulled={scene.table.pulled} seeking={scene.table.seeking} label="one page per token" />
        </Slot>

        <Slot on={scene.rowA.on} at={scene.rowA.at} scale={scene.rowA.scale} z={3} feel={feel}>
          <NumberRow
            seed={ROW_SEED}
            shown={10}
            extend={scene.rowA.extend}
            tone="measure"
            basis={scene.rowA.band ? ROW_SEED : undefined}
            drift={0}
            showMatches={scene.rowA.band}
            label={scene.rowA.label}
            measure={scene.rowA.measure}
          />
        </Slot>

        {/* The same row, pulled again. Same seed, so genuinely identical. */}
        <Slot on={scene.rowB.on} at={scene.rowB.at} scale={scene.rowB.scale} z={3} feel={feel}>
          <NumberRow seed={ROW_SEED} shown={10} tone="measure" label={scene.rowB.label} />
        </Slot>

        <Slot on={scene.sentA.on} at={scene.sentA.at} scale={scene.sentA.scale} z={4} feel={feel}>
          <Sentence words={BALL_SENTENCE} focus={scene.sentA.focus} />
        </Slot>

        <Slot on={scene.sentB.on} at={scene.sentB.at} scale={scene.sentB.scale} z={4} feel={feel}>
          <Sentence words={DOG_SENTENCE} focus={scene.sentB.focus} />
        </Slot>

        <Slot on={scene.hero.on} at={scene.hero.at} scale={scene.hero.scale} z={4} feel={feel}>
          <Sentence words={PROMPT} focus={scene.hero.focus} />
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
