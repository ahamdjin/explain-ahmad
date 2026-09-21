import { Slot, type Feel } from '../../../../paper'
import {
  Evidence, Chain, Boundary, Outside, Team, ScenarioGrid, Nudge, Thumb,
  NudgeCompare, Weights, CanVsDoes, HeroNumber, NotThis, FaceCam, Balance, Reconstruction,
} from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §7 — the room, revealed.
 *
 * The section's job is to **reduce** sensationalism without killing the story,
 * and the design follows: nothing here is dramatic. The sandbox is a plain
 * contained box, the researchers are plain figures, the comparison is two
 * bars. Dressing any of it up would re-sensationalise precisely what the
 * section exists to calm down.
 *
 * The one loud object is the `<1%`, and it is loud because everything else in
 * the film has been quiet about numbers.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const { doc, chain, box, team, grid, nudge, thumb, nudged, mass, cvd, hero, notthis, host, recon } = scene

  return (
    <>
      <Slot on={doc.on} at={doc.at} scale={doc.scale} feel={feel} z={1}>
        <div className="cf-sheet">
          <Evidence source={doc.source} highlight={doc.highlight} feel={feel}
            alt="Apollo Research's published demo page and scenario suite" />
        </div>
      </Slot>

      {/* The incident, arriving mid-shrink from §6. */}
      <Slot on={chain.on} at={chain.at} scale={chain.scale} feel={feel} z={2}>
        <div style={{ width: '54cqw' }}>
          <Chain shown={chain.shown} feel={feel} />
        </div>
      </Slot>

      {/* What it was inside. Plain, on purpose. */}
      <Slot on={box.on} at={box.at} scale={box.scale} feel={feel} z={3}>
        <div style={{ width: '62cqw' }}>
          <Boundary label={box.label}><span style={{ display: 'block', height: '14cqh' }} /></Boundary>
        </div>
      </Slot>

      <Slot on={team.on} at={team.at} scale={team.scale} feel={feel} z={3}>
        <div style={{ width: '26cqw' }}>
          <Team count={team.shown} label="Apollo Research" feel={feel} />
        </div>
      </Slot>

      {/* The suite this incident is one of. Proof, not a number to memorise. */}
      <Slot on={grid.on} at={grid.at} scale={grid.scale} feel={feel} z={3}>
        <div style={{ width: '30cqw' }}>
          <ScenarioGrid total={33} lit={grid.lit} feel={feel} />
        </div>
      </Slot>

      <Slot on={nudge.on} at={nudge.at} scale={nudge.scale} feel={feel} z={3}>
        <div style={{ width: '38cqw' }}>
          <Nudge level={nudge.level} quote={nudge.quote} />
        </div>
      </Slot>

      {/* Describing their method, not catching them out. Apollo say plainly
          that the prompt is designed to elicit. */}
      <Slot on={thumb.on} at={thumb.at} scale={thumb.scale} feel={feel} z={4}>
        <div style={{ width: '26cqw', position: 'relative' }}>
          <Balance tip={thumb.tip} feel={feel} />
          <span style={{ position: 'absolute', left: '4%', top: '18%', width: '22%' }}>
            <Thumb pressing={thumb.pressing} feel={feel} />
          </span>
        </div>
      </Slot>

      {/*
       * The beat that earns the section.
       *
       * 5% with heavy goal nudging, under 1% without — and the label says
       * *oversight deactivation*, because there are two different sub-1%
       * figures in this story and GROUND_TRUTH.md separates them on purpose.
       */}
      <Slot on={nudged.on} at={nudged.at} scale={nudged.scale} feel={feel} z={3}>
        <div style={{ width: '34cqw' }}>
          <NudgeCompare nudged={0.05} plain={nudged.reveal ? 0.008 : 0.05} total={100} feel={feel} />
          <p className="cf-term"><span>oversight deactivation</span><em>with strong goal nudging, against without</em></p>
        </div>
      </Slot>

      {/* The same arrangement as §5 beat 4, so the viewer recognises rather
          than relearns. Said twice on purpose. */}
      <Slot on={mass.on} at={mass.at} scale={mass.scale} feel={feel} z={3}>
        <div style={{ display: 'flex', gap: '6cqw', alignItems: 'flex-end', width: '44cqw' }}>
          <Outside label="real model weights">
            <div style={{ width: '15cqw' }}><Weights size="never accessible" plates={6} real feel={feel} /></div>
          </Outside>
          <Boundary label="inside the evaluation">
            <div style={{ width: '15cqw' }}><Weights size="simulated" plates={6} real={false} feel={feel} /></div>
          </Boundary>
        </div>
      </Slot>

      {/* An open door is a fact about the door, not a prediction about how
          often anybody walks through it. */}
      <Slot on={cvd.on} at={cvd.at} scale={cvd.scale} feel={feel} z={3}>
        <div style={{ width: '30cqw' }}>
          <CanVsDoes marks={cvd.marks} outOf={100} feel={feel} />
        </div>
      </Slot>

      {/* The film's one big number. */}
      <Slot on={hero.on} at={hero.at} scale={hero.scale} feel={feel} z={4}>
        <div style={{ width: '34cqw' }}>
          <HeroNumber
            value="<1%"
            of="of runs completed every step in sequence"
            condition="with strong goal nudging in place"
            source="Apollo Research — Demo Example"
          />
        </div>
      </Slot>

      <Slot on={notthis.on} at={notthis.at} scale={notthis.scale} feel={feel} z={4}>
        <div style={{ width: '44cqw' }}>
          <NotThis
            label="ChatGPT is trying to escape"
            note="A capability under a deliberately constructed conflict is not a frequency in ordinary use. The test shows what the model can construct, not what it does on your laptop."
          />
        </div>
      </Slot>

      {/* First face camera since §1. One question beside it, nothing else. */}
      <Slot on={host.on} at={host.at} scale={host.scale} feel={feel} z={5}>
        <div style={{ width: '54cqw' }}>
          <FaceCam shape="thesis" line={host.line} />
        </div>
      </Slot>

      <Slot on={recon.on} at={recon.at} scale={recon.scale} feel={feel} z={6}>
        <Reconstruction />
      </Slot>
    </>
  )
}
