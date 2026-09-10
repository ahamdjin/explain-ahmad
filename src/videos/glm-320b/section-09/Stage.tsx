import {
  Camera,
  Ground,
  NumberRow,
  PROMPT,
  Slot,
  Tower,
} from '../../../paper'
import { Vocabulary } from '../../../paper/cast/Lookup'
import { Narrator } from '../../../paper/cast/Narrator'
import { WordCard } from '../../../paper/cast/Props'
import { Sentence } from '../../../paper/cast/Sentence'
import { type Feel } from '../../../paper/motion'
import {CANDIDATES, type SceneState} from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={1} feel={feel}>
          <Tower floor={scene.tower.floor} markers={scene.tower.markers} />
        </Slot>

        {/* Nine finished rows, one per token. `focus` is the last position. */}
        <Slot on={scene.rows.on} at={scene.rows.at} scale={scene.rows.scale} z={3} feel={feel}>
          <Sentence words={PROMPT} split rows focus={scene.rows.focus} />
        </Slot>

        <Slot on={scene.last.on} at={scene.last.at} scale={scene.last.scale} z={4} feel={feel}>
          <NumberRow seed={2411} shown={8} tone="word" label={scene.last.label} />
        </Slot>

        <Slot on={scene.vocab.on} at={scene.vocab.at} scale={scene.vocab.scale} z={2} feel={feel}>
          <Vocabulary
            scores={scene.vocab.scores}
            candidates={scene.vocab.candidates ? CANDIDATES : undefined}
            picked={scene.vocab.picked}
            label="every token it knows"
          />
        </Slot>

        <Slot on={scene.out.on} at={scene.out.at} scale={scene.out.scale} z={6} feel={feel}>
          <WordCard label={scene.out.label} />
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
