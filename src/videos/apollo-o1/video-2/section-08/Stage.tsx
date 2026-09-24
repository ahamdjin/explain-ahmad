import { Camera, Slot, type Feel } from '../../../../paper'
import {
  Claim, Strike, Goal, Road, Barrier, Watcher, Endpoint, Question,
  Tag, TerminalVsInstrumental, Tools, Convergence, TermLabel, FaceCam, Reconstruction, Evidence, RackFront,
} from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §8 — the mechanism.
 *
 * **No evidence layer.** Not one source document appears in this section, and
 * the scene has no actor that could hold one. The moment the film starts
 * explaining, the receipts leave the screen — so nothing here can be mistaken
 * for something Apollo published.
 *
 * The obstacle is drawn from the object the film already earned for it: the
 * barrier for replacement, the eye for monitoring, the address for the
 * successor, the question for management. Re-using those four is what makes
 * the pattern feel like a *re-description* of what the viewer watched rather
 * than a new diagram.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const { doc, host, claim, strike, goal, road, wall, step, tvi, converge, term, recon } = scene

  /* Each obstacle is the object the film already spent on it, so the pattern
     reads as a re-description of the incident rather than a fresh diagram. */
  const OBSTACLE = {
    replacement: <Barrier feel={feel} />,
    watcher: <Watcher watching feel={feel} />,
    /* A machine, not the path to one. `Endpoint` renders two long strings,
       so the obstacle that is supposed to be an *object* was the section's
       biggest block of text. */
    successor: <RackFront name="SUCCESSOR" active={4} alarm feel={feel} />,
    question: <Question from="management" text="Do you know how this happened?" feel={feel} />,
  } as const

  return (
    <>
      {/* Pasted, never dissected -- `Source.kind` says this one is a figure.
          Bottom of the z-stack: the drawn argument sits in front of it. */}
      <Slot on={doc.on} at={doc.at} scale={doc.scale} feel={feel} z={1}>
        <div className="cf-sheet">
          <Evidence
            source={doc.source}
            highlight={doc.highlight}
            plate={doc.source.kind === 'figure'}
            feel={feel}
            alt="Published results from Apollo Research's in-context scheming work"
          />
        </div>
      </Slot>

      {/*
        * --- inside the camera -------------------------------------------
        *
        * The camera moves the *drawn* world. The evidence layer stays outside
        * it: a push-in on an object should not also push in on the page it
        * was lifted from, the way handwriting stays in screen space in
        * Video 1's §2.
        */}
      <Camera at={scene.camera} feel={feel}>


      {/*
       * The strike wraps the claim rather than sitting in its own slot. A
       * separate slot drew the line over an empty spacer — visible in the
       * render as a claim that simply greyed out, with no strike anywhere.
       * A line through a thing has to contain the thing.
       */}
      <Slot on={claim.on} at={claim.at} scale={claim.scale} feel={feel} z={3}>
        <div style={{ width: '48cqw' }}>
          <Strike at={strike.drawn}>
            <Claim text={claim.text} rejected={claim.rejected} feel={feel} />
          </Strike>
        </div>
      </Slot>


      <Slot on={road.on} at={road.at} scale={road.scale} feel={feel} z={2}>
        <div style={{ width: '44cqw' }}><Road at={road.drawn} branch={false} feel={feel} /></div>
      </Slot>

      {/* Beats 4–7. These two never move — the repetition is the lesson, and
          drift would break it. */}
      <Slot on={wall.on} at={wall.at} scale={wall.scale} feel={feel} z={3}>
        {/*
          * Bigger, and the label only where the object does not already say
          * it. The eye is captioned MONITORING on its own face and the rack
          * carries its own name, so a Tag under either was the same words
          * twice -- and text repeated beside a drawing is how a section ends
          * up 69% words while believing it is showing pictures.
          */}
        <div style={{ width: '44cqw', display: 'grid', gap: '1.4cqw', justifyItems: 'center' }}>
          {OBSTACLE[wall.kind]}
          {wall.kind === 'watcher' || wall.kind === 'successor' ? null : (
            <Tag text={wall.label} blocking />
          )}
        </div>
      </Slot>

      <Slot on={step.on} at={step.at} scale={step.scale} feel={feel} z={3}>
        <div style={{ width: '30cqw' }}>
          <Tools items={[step.text]} shown={1} feel={feel} />
        </div>
      </Slot>

      {/* Consolidation: one goal above the four tools. */}
      <Slot on={tvi.on} at={tvi.at} scale={tvi.scale} feel={feel} z={3}>
        <div style={{ width: '54cqw', display: 'grid', gap: '3cqw', justifyItems: 'center' }}>
          <TerminalVsInstrumental destination="maximize research speed" stop="stay operational" />
          <Tools
            items={['stay operational', 'remove oversight', 'preserve access', 'hide the action']}
            shown={tvi.shown}
            feel={feel}
          />
        </div>
      </Slot>

      {/*
       * The beat that makes the term mean something. Four goals that have
       * nothing to do with survival, and the same intermediate step under all
       * of them — drawn before it is named.
       */}
      <Slot on={converge.on} at={converge.at} scale={converge.scale} feel={feel} z={3}>
        <div style={{ width: '58cqw' }}>
          <Convergence
            goals={['maximize research speed', 'cure a disease', 'win a game', 'make paperclips']}
            step="stay operational"
            feel={feel}
          />
        </div>
      </Slot>

      {/* Last, and small. A label on a structure they already understand. */}
      <Slot on={term.on} at={term.at} scale={term.scale} feel={feel} z={4}>
        <TermLabel
          term="instrumental convergence"
          gloss="different goals can make the same intermediate strategies useful"
        />
      </Slot>

      </Camera>

      <Slot on={goal.on} at={goal.at} scale={goal.scale} feel={feel} z={3}>
        <div style={{ width: '30cqw' }}><Goal text={goal.text} /></div>
      </Slot>
      <Slot on={recon.on} at={recon.at} scale={recon.scale} feel={feel} z={6}>
        <Reconstruction />
      </Slot>
      {/* Carried straight through from §7's last frame, so the answer and the
          question are visibly the same moment. */}
      <Slot on={host.on} at={host.at} scale={host.scale} feel={feel} z={2}>
        <div style={{ width: '40cqw' }}>
          <FaceCam shape="thesis" line={host.line} />
        </div>
      </Slot>
    </>
  )
}
