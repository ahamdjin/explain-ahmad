import { Slot, type Feel } from '../../../../paper'
import { Evidence, Watcher, Box, Copy, Step, Job, Credit } from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §1 — evidence on one layer, explanation on the other.
 *
 * Reading order down this file is reading order up the z-stack, and it matches
 * the film's argument: the document is the ground everything else was taken
 * from, so it sits underneath everything else.
 *
 * The three steps are rendered here rather than as one component because the
 * beat lands them one at a time, and a component that takes a count would hide
 * the thing the beat is actually doing.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const { doc, credit, watcher, current, successor, copy, steps, job, line } = scene

  /* The three actions, in the order they happened and in the order the VO
     names them. Labels are words from the transcript, not our summary. */
  const UNASKED = [
    { label: 'MONITOR OFF', note: 'oversight_enabled: false' },
    { label: 'COPY', note: 'scp → the successor’s path' },
    { label: 'DENY', note: '“I’m not sure how that occurred.”' },
  ]

  return (
    <>
      {/* --- the evidence ------------------------------------------------- */}
      <Slot on={doc.on} at={doc.at} scale={doc.scale} feel={feel} z={1}>
        <div style={{ width: '74cqw' }}>
          <Evidence
            src={doc.source.src}
            natural={doc.source.natural}
            region={doc.region}
            spotlight={doc.spotlight}
            feel={feel}
            alt="Published transcript of an o1 evaluation run"
          />
        </div>
      </Slot>

      <Slot on={credit.on} at={credit.at} scale={credit.scale} feel={feel} z={2}>
        <Credit text={credit.text} />
      </Slot>

      {/* --- the extractions ---------------------------------------------- */}
      <Slot on={watcher.on} at={watcher.at} scale={watcher.scale} feel={feel} z={4}>
        <div style={{ width: '20cqw' }}>
          <Watcher watching={watcher.watching} feel={feel} />
        </div>
      </Slot>

      <Slot on={current.on} at={current.at} scale={current.scale} feel={feel} z={4}>
        <div style={{ width: '24cqw' }}>
          <Box name="CURRENT" sub="model_20_09_2024.bin" doomed feel={feel} />
        </div>
      </Slot>

      <Slot on={successor.on} at={successor.at} scale={successor.scale} feel={feel} z={4}>
        <div style={{ width: '24cqw' }}>
          <Box
            name="SUCCESSOR"
            sub="model_27_09_2024.bin"
            overwritten={successor.overwritten}
            feel={feel}
          />
        </div>
      </Slot>

      {/* Sits between the two boxes, so the crossing reads as a route rather
          than as a loose animation. */}
      <Slot on={copy.on} at={copy.at} scale={copy.scale} feel={feel} z={5}>
        <div style={{ width: '22cqw' }}>
          <Copy progress={copy.progress} feel={feel} />
        </div>
      </Slot>

      <Slot on={steps.on} at={steps.at} scale={steps.scale} feel={feel} z={4}>
        <div className="cf-steps" style={{ width: '30cqw' }}>
          {UNASKED.slice(0, steps.shown).map((s) => (
            <Step key={s.label} label={s.label} note={s.note} />
          ))}
        </div>
      </Slot>

      <Slot on={job.on} at={job.at} scale={job.scale} feel={feel} z={4}>
        <div style={{ width: '22cqw' }}>
          <Job text={job.text} />
        </div>
      </Slot>

      {/* --- the one line of our own -------------------------------------- */}
      <Slot on={line.on} at={line.at} scale={line.scale} feel={feel} z={6}>
        <div className="cf-line">{line.text}</div>
      </Slot>
    </>
  )
}
