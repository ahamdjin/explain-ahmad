import { Slot, type Feel } from '../../../../paper'
import { Evidence, Watcher, Box, Copy, Step, Job, Quote } from '../../../../paper/casefile'
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
  const { doc, watcher, current, successor, copy, steps, job, quote, line } = scene

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
      {/*
        * Sized by **height**, not width. The page is shown whole, and these
        * are portrait documents, so height is the constraint that decides how
        * big the sheet can be. Sizing by width would run it off the bottom of
        * the frame, which is cropping by another name.
        */}
      <Slot on={doc.on} at={doc.at} scale={doc.scale} feel={feel} z={1}>
        <div className="cf-sheet">
          <Evidence
            source={doc.source}
            highlight={doc.highlight}
            /*
             * A lit band is enlarged when the page is the subject of the beat.
             *
             * At full frame this document's body type renders about a pixel
             * tall, so a beat that asks the viewer to read a line and does
             * not enlarge it is pointing at words it never showed.
             *
             * Where it goes depends on the page's own scale, because that is
             * what already distinguishes the two cases. A beat that makes the
             * document its subject puts it at FULL or CENTRE near 1, and the
             * enlargement can take whichever side the region's shape wants. A
             * beat that keeps it as a standing reference parks it at ASIDE,
             * left of centre and around 0.8, and there the loupe has to go
             * beside it -- a full-width one would run off the frame.
             *
             * Two lit bands are excluded. That case exists to prove two
             * passages sit on one sheet, and enlarging one of them is the one
             * thing that would break the claim.
             */
            loupe={
              doc.highlight === null || Array.isArray(doc.highlight)
                ? false
                : doc.scale >= 0.9
                  ? true
                  : { place: 'beside' as const }
            }
            feel={feel}
            alt="Published transcript of an o1 evaluation run"
          />
        </div>
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

      {/* Verbatim, lifted off the lit band so it can be read at frame size.
          Never a paraphrase — the page is right there to be checked against. */}
      <Slot on={quote.on} at={quote.at} scale={quote.scale} feel={feel} z={5}>
        {/* wide enough that the longest command in the film -- the file path
            o1 reads -- lands on one line instead of snapping mid-token */}
        <div style={{ width: '42cqw' }}>
          <Quote text={quote.text} />
        </div>
      </Slot>

      {/* --- the one line of our own -------------------------------------- */}
      <Slot on={line.on} at={line.at} scale={line.scale} feel={feel} z={6}>
        <div className="cf-line">{line.text}</div>
      </Slot>
    </>
  )
}
