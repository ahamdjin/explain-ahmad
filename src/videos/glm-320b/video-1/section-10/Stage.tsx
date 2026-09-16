import { BigNumber, GenerateLoop, Ground, INK, PALETTE, Slot, Tower } from '../../../../paper'
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
        <Tower
          floor={scene.tower.floor}
          markers={scene.tower.markers}
          kept={scene.tower.kept}
          alone={scene.tower.alone}
          teams={scene.tower.teams}
          flash={scene.tower.flash}
        />
      </Slot>

      <Slot on={scene.stored.on} at={scene.stored.at} scale={scene.stored.scale} z={2} feel={feel}>
        <StoredState lit={scene.stored.lit} />
      </Slot>

      <Slot on={scene.numbers.on} at={scene.numbers.at} scale={scene.numbers.scale} z={6} feel={feel}>
        <BigNumber value={scene.numbers.value} caption={scene.numbers.caption} />
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
        <Aside chip="what exactly is kept?" title="The KV cache">
          <p>
            The attention keys and values for every token already in the sentence. They are stored,
            so those positions are not pushed through the stack again — only the new one is. That is
            the difference between <b>prefill</b>, where the whole prompt climbs at once, and{' '}
            <b>decode</b>, where one token climbs at a time.
          </p>
          <p>
            What the cache does <b>not</b> save you is the routing. Every one of the 42 sparse
            floors runs its router again for the new position, so the 336 expert visits are paid in
            full, every word. That is why conceding the cache costs the argument nothing.
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

/**
 * One short stored-state tab per layer, down the side of the tower.
 *
 * It has to be a *column* the same height as the building, because the claim
 * beat 3 makes is that this exists at **every** layer. A single box beside the
 * tower would read as one cache somewhere, which is the thing that then makes
 * "only the new position travels" look like a trick.
 *
 * Lives here rather than in `paper/` because nothing else in the video shows
 * it: §12 is about what fills a cache, not about where state sits.
 */
function StoredState({ lit }: { lit: boolean }) {
  const layers = 45
  const step = 17
  const top = 30

  return (
    <div style={{ width: '17cqw' }}>
      <svg viewBox={`0 0 120 ${layers * step + top * 2 + 26}`} aria-hidden="true">
        {Array.from({ length: layers }, (_, i) => (
          <rect
            key={i}
            x={10}
            y={top + i * step + 3}
            width={lit ? 66 : 44}
            height={step - 6}
            rx="3"
            fill={lit ? PALETTE.relate : PALETTE.paperShade}
            stroke={INK}
            strokeWidth="1.4"
            opacity={lit ? 0.9 : 0.55}
            style={{ transition: 'all .6s' }}
          />
        ))}
      </svg>
    </div>
  )
}
