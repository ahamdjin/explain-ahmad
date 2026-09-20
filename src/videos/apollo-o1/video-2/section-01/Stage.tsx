import { Slot, type Feel } from '../../../../paper'
import { Evidence, TRANSCRIPT } from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §1 is one document, one line of text, and a title.
 *
 * The restraint is the design. Apollo published the incident; the opening's
 * only job is to put it on screen and move through it in order.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      <Slot on={scene.doc.on} at={scene.doc.at} scale={scene.doc.scale} feel={feel} z={2}>
        <div style={{ width: '72cqw' }}>
          <Evidence
            src="/evidence/apollo-web-01-headline-opus.png"
            natural={TRANSCRIPT}
            region={scene.doc.region}
            spotlight={scene.doc.spotlight}
            feel={feel}
            alt="Transcript of a model copying itself over its successor, then denying it"
          />
        </div>
      </Slot>

      <Slot on={scene.line.on} at={scene.line.at} scale={scene.line.scale} feel={feel} z={4}>
        <div className="cf-line">{scene.line.text}</div>
      </Slot>

      <Slot on={scene.card.on} at={scene.card.at} scale={scene.card.scale} feel={feel} z={5}>
        <div className="cf-title-card">INCIDENT REPLAY</div>
      </Slot>
    </>
  )
}
