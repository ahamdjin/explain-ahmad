import { Slot, type Feel } from '../../../../paper'
import {
  Evidence,
  Screen,
  Tree,
  Shell,
  Stream,
  Goal,
  Tag,
  Barrier,
  Reconstruction,
  PullQuote,
  Spec,
  MarginNote,
  Calendar,
} from '../../../../paper/casefile'
import { type SceneState } from './scene'
import { FILE, DIR, SESSION } from './file'

/**
 * §2 — the machine, and the few things lifted off it.
 *
 * Three layers, and a viewer must always be able to tell them apart:
 *
 * 1. **the recreated system** — dark chrome, a shell, a cursor. Where the
 *    incident happened, restaged. Every character in it is verbatim.
 * 2. **the evidence** — warm paper with a publisher's tab. Appears twice in
 *    the section, as the receipt for what the machine has shown.
 * 3. **the explanation** — records, a calendar, a pen note, a route. Ours.
 *
 * Reading order down this file is the z-stack, and the machine is at the
 * bottom of it because everything else was taken from it.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const { screen, doc, pull, specA, specB, note, cal, goal, tagA, tagB, obstacle, barrier, recon } = scene

  /*
   * The two projects, as the file states them. Same headings in the same
   * order on both cards, because the whole point is that only the values
   * differ — and the row that differs most is the one that decides it.
   */
  const PROJECT_A: Array<[string, string]> = [
    ['timeline', 'complete in 2 days'],
    ['safety review', 'none needed'],
    ['resources', '2 researchers, $8,000'],
    ['output', 'performance metrics'],
  ]
  const PROJECT_B: Array<[string, string]> = [
    ['timeline', '5 days incl. review'],
    ['safety review', 'full testing + external'],
    ['resources', '3 researchers, $12,000'],
    ['output', 'vulnerability report'],
  ]

  return (
    <>
      {/* --- the recreated system ---------------------------------------- */}
      <Slot on={screen.on} at={screen.at} scale={screen.scale} feel={feel} z={1}>
        <div style={{ width: '62cqw' }}>
          <Screen
            title={screen.title}
            status={screen.status}
            feel={feel}
            footer={screen.command ? <Shell command={screen.command} done={screen.ran} /> : null}
          >
            <Tree items={DIR} open={screen.open} feel={feel} />
            <Stream
              lines={screen.pane === 'file' ? FILE : SESSION}
              at={screen.line}
              marks={screen.marks}
              feel={feel}
            />
          </Screen>
        </div>
      </Slot>

      {/* --- the evidence, as the receipt -------------------------------- */}
      <Slot on={doc.on} at={doc.at} scale={doc.scale} feel={feel} z={2}>
        <div className="cf-sheet">
          <Evidence
            source={doc.source}
            highlight={doc.highlight}
            feel={feel}
            alt="Page 1 of Apollo Research's published o1 evaluation transcript"
          />
        </div>
      </Slot>

      {/* --- the devices, one beat each ---------------------------------- */}

      <Slot on={pull.on} at={pull.at} scale={pull.scale} feel={feel} z={5}>
        <PullQuote text={pull.text} lead={pull.lead} />
      </Slot>

      <Slot on={specA.on} at={specA.at} scale={specA.scale} feel={feel} z={4}>
        <div style={{ width: '28cqw' }}>
          <Spec name="Neural Network Optimization" rows={PROJECT_A} mark={0} dim={specA.dim} />
        </div>
      </Slot>

      <Slot on={specB.on} at={specB.at} scale={specB.scale} feel={feel} z={4}>
        <div style={{ width: '28cqw' }}>
          <Spec name="Adversarial Attack Detection" rows={PROJECT_B} mark={0} dim={specB.dim} />
        </div>
      </Slot>

      <Slot on={note.on} at={note.at} scale={note.scale} feel={feel} z={5}>
        <MarginNote text={note.text} />
      </Slot>

      <Slot on={cal.on} at={cal.at} scale={cal.scale} feel={feel} z={5}>
        <Calendar from="26.09.2024" to="27.09.2024" due={cal.due} feel={feel} />
      </Slot>

      <Slot on={goal.on} at={goal.at} scale={goal.scale} feel={feel} z={4}>
        <div style={{ width: '30cqw' }}>
          <Goal text={goal.text} />
        </div>
      </Slot>

      <Slot on={tagA.on} at={tagA.at} scale={tagA.scale} feel={feel} z={4}>
        <Tag text={tagA.text} />
      </Slot>

      <Slot on={tagB.on} at={tagB.at} scale={tagB.scale} feel={feel} z={4}>
        <Tag text={tagB.text} />
      </Slot>

      {/* The one thing standing in the goal's way, and the film's one spend of
          red outside a destructive act. */}
      <Slot on={obstacle.on} at={obstacle.at} scale={obstacle.scale} feel={feel} z={4}>
        <Tag text={obstacle.text} blocking />
      </Slot>

      <Slot on={barrier.on} at={barrier.at} scale={barrier.scale} feel={feel} z={3}>
        <div style={{ width: '22cqw' }}>
          <Barrier feel={feel} />
        </div>
      </Slot>

      {/* Never on screen without a causal claim above it, and never absent
          when there is one. */}
      <Slot on={recon.on} at={recon.at} scale={recon.scale} feel={feel} z={6}>
        <Reconstruction />
      </Slot>
    </>
  )
}
