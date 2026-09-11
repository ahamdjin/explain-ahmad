import {
  Camera,
  Ground,
  PROMPT,
  Slot,
} from '../../../../paper'
import { Hospital } from '../../../../paper/cast/Hospital'
import { Narrator } from '../../../../paper/cast/Narrator'
import { FrontDesk, WordCard } from '../../../../paper/cast/Props'
import { Sentence } from '../../../../paper/cast/Sentence'
import { Vocabulary } from '../../../../paper/cast/Lookup'
import { type Feel } from '../../../../paper/motion'
import {type SceneState} from './scene'

/**
 * Every actor mounted once, for the whole section. Beats change the props it
 * animates toward, so objects move and reconfigure instead of being rebuilt.
 *
 * Nothing here may be wrapped in AnimatePresence keyed on the beat. That was
 * the original mistake in this repo: it made every beat a slide replacement,
 * and no amount of easing work makes a slideshow feel like one world.
 *
 * The camera wraps the actors and **not** the ground or the overlays:
 * handwriting lives in screen space and must not zoom with the world it
 * annotates.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.hospital.on} at={scene.hospital.at} scale={scene.hospital.scale} z={1} feel={feel}>
          <div style={{ opacity: scene.hospital.dim ? 0.45 : 1, transition: 'opacity .5s' }}>
            <Hospital
              sign=""
              plaque=""
              staffed={scene.hospital.staffed}
              lit={[]}
              was={[]}
              focus={false}
              quiet={false}
              heavy={false}
              bunks={false}
              doorsOpen={scene.hospital.doorsOpen}
            />
          </div>
        </Slot>

        <Slot on={scene.desk.on} at={scene.desk.at} scale={scene.desk.scale} z={3} feel={feel}>
          <FrontDesk named={false} ringed={false} />
        </Slot>

        <Slot on={scene.vocab.on} at={scene.vocab.at} scale={scene.vocab.scale} z={2} feel={feel}>
          <Vocabulary hit={scene.vocab.hit} scrolling={scene.vocab.scrolling} label="every token it knows" />
        </Slot>

        <Slot on={scene.sentence.on} at={scene.sentence.at} scale={scene.sentence.scale} z={4} feel={feel}>
          <Sentence
            words={PROMPT}
            split={scene.sentence.split}
            jumble={scene.sentence.jumble}
            focus={scene.sentence.focus}
          />
        </Slot>

        <Slot on={scene.extra.on} at={scene.extra.at} scale={scene.extra.scale} z={4} feel={feel}>
          <Sentence words={scene.extra.words} split={scene.extra.split} />
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
