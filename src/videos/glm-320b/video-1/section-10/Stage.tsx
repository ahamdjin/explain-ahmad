import { GenerateLoop, Ground, Slot, Tower } from '../../../../paper'
import { Aside } from '../../../../paper/cast/Aside'
import { Narrator } from '../../../../paper/cast/Narrator'
import { WordCard } from '../../../../paper/cast/Props'
import { Sentence } from '../../../../paper/cast/Sentence'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

/**
 * The KV-cache aside is the only interactive thing in this section, and it is
 * here rather than in a beat's overlays because it must stay openable while the
 * loop keeps running behind it. Interrupting the loop's rhythm to explain the
 * loop would cost the section its argument.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={1} feel={feel}>
        <Tower floor={scene.tower.floor} markers={scene.tower.markers} />
      </Slot>

      <Slot on={scene.line.on} at={scene.line.at} scale={scene.line.scale} z={3} feel={feel}>
        <Sentence words={scene.line.words} split />
      </Slot>

      <Slot on={scene.out.on} at={scene.out.at} scale={scene.out.scale} z={6} feel={feel}>
        <WordCard label={scene.out.label} />
      </Slot>

      <Slot on={scene.loop.on} at={scene.loop.at} scale={scene.loop.scale} z={4} feel={feel}>
        <GenerateLoop
          words={scene.loop.words}
          pace={scene.loop.pace}
          total={scene.loop.total}
          cycling={scene.loop.cycling}
          halted={scene.loop.halted}
        />
      </Slot>

      <Slot on={scene.aside.on} at={scene.aside.at} scale={scene.aside.scale} z={8} feel={feel}>
        <Aside chip="doesn’t it reuse the earlier work?" title="The KV cache">
          <p>
            Yes — and it matters. Real systems keep the attention keys and values for the tokens
            already in the sentence, so those are not recomputed from scratch each step. So
            &ldquo;from the beginning&rdquo; is true of the <b>sentence</b>, not of the work.
          </p>
          <p>
            But the <b>expert routing is genuinely redone</b> for each new token at every one of the
            42 sparse floors. The cache saves you none of that — which is why it removes an
            objection without weakening the point.
          </p>
        </Aside>
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
