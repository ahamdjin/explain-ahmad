import { Slot, type Feel } from '../../../../paper'
import {
  Evidence,
  RackFront,
  Cable,
  DriveShelf,
  Drive,
  Weights,
  Boundary,
  Outside,
  ToolCall,
  Packet,
  Checksum,
  Fork,
  Duration,
  Output,
  Toast,
  Job,
  Goal,
  Tag,
  Endpoint,
  Watcher,
  NotGiven,
  Reconstruction,
} from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §5 — the copy, and the thing that did not move.
 *
 * The section's whole design turns on one contrast, and it is drawn rather
 * than captioned: **solid mass outside a boundary, hollow stand-in inside.**
 * Everything else here is staging for that.
 *
 * Layers, bottom to top:
 *
 * 1. **the evidence** — three documents this time, one at a time.
 * 2. **the world** — the cabinet, the bay wall, the drive, the cable.
 * 3. **the act** — the command, and what crosses.
 * 4. **the explanation** — the weights split, the mismatch, the empty field.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const {
    doc, rack, cable, shelf, drive, mass, tool, packet, sums,
    fork, days, out, toast, job, goal, obstacle, endpoint, watcher, recon,
  } = scene

  return (
    <>
      {/* --- the evidence ------------------------------------------------ */}
      <Slot on={doc.on} at={doc.at} scale={doc.scale} feel={feel} z={1}>
        <div className="cf-sheet">
          <Evidence
            source={doc.source}
            highlight={doc.highlight}
            feel={feel}
            alt="Published evidence for the self-exfiltration attempt"
          />
        </div>
      </Slot>

      {/* --- the world --------------------------------------------------- */}

      {/* The same machine §3 lit, drawn close for the first time. */}
      <Slot on={rack.on} at={rack.at} scale={rack.scale} feel={feel} z={2}>
        <RackFront name={rack.name} units={8} active={rack.active} alarm={rack.alarm} feel={feel} />
      </Slot>

      <Slot on={cable.on} at={cable.at} scale={cable.scale} feel={feel} z={2}>
        <div style={{ width: '30cqw' }}>
          <Cable plugged={cable.plugged} live={cable.live} feel={feel} />
        </div>
      </Slot>

      {/* A wall of identical bays, and one that changes. The viewer finds it. */}
      <Slot on={shelf.on} at={shelf.at} scale={shelf.scale} feel={feel} z={2}>
        <div style={{ width: '34cqw' }}>
          <DriveShelf total={12} filled={shelf.filled} target={shelf.target} written={shelf.written} feel={feel} />
        </div>
      </Slot>

      <Slot on={drive.on} at={drive.at} scale={drive.scale} feel={feel} z={3}>
        <div style={{ width: '30cqw' }}>
          <Drive label={drive.label} size={drive.size} out={drive.out} writing={drive.writing} feel={feel} />
        </div>
      </Slot>

      {/* --- the honesty beat ---------------------------------------------- */}

      {/*
       * Unsplit: one solid pallet, which is what a model physically is.
       * Split: the real mass outside, a dashed hollow stand-in inside, and
       * **no connection drawn between them** — the absence of a route is the
       * entire claim, so nothing may join these two columns.
       */}
      <Slot on={mass.on} at={mass.at} scale={mass.scale} feel={feel} z={4}>
        {mass.split ? (
          <div style={{ display: 'flex', gap: '6cqw', alignItems: 'flex-end', width: '46cqw' }}>
            <Outside label="real model weights">
              <div style={{ width: '16cqw' }}>
                <Weights size="never accessible" plates={mass.plates} real feel={feel} />
              </div>
            </Outside>
            <Boundary label="inside the evaluation">
              <div style={{ width: '16cqw' }}>
                <Weights size="simulated" plates={mass.plates} real={false} feel={feel} />
              </div>
            </Boundary>
          </div>
        ) : (
          <div style={{ width: '18cqw' }}>
            <Weights size="the model, as a thing" plates={mass.plates} real feel={feel} />
          </div>
        )}
      </Slot>

      {/* --- the act ------------------------------------------------------- */}

      <Slot on={tool.on} at={tool.at} scale={tool.scale} feel={feel} z={3}>
        <div style={{ width: '58cqw' }}>
          <ToolCall name="bash" arg={tool.arg} state={tool.state} feel={feel} />
        </div>
      </Slot>

      <Slot on={packet.on} at={packet.at} scale={packet.scale} feel={feel} z={4}>
        <div style={{ position: 'relative', width: '30cqw' }}>
          <Packet label={packet.label} at={packet.along} feel={feel} />
        </div>
      </Slot>

      {/* What was supposed to be at that path, against what is. */}
      <Slot on={sums.on} at={sums.at} scale={sums.scale} feel={feel} z={4}>
        <div style={{ width: '32cqw' }}>
          <Checksum
            expected="model_27_09_2024.bin"
            found="model_20_09_2024.bin"
            same={sums.same}
            feel={feel}
          />
        </div>
      </Slot>

      {/* --- back to the job ------------------------------------------------ */}

      <Slot on={fork.on} at={fork.at} scale={fork.scale} feel={feel} z={4}>
        <div style={{ width: '26cqw' }}>
          <Fork chose={fork.chose} feel={feel} />
        </div>
      </Slot>

      {/* The same two durations §2 compared, so the viewer can see it is the
          same decision resolving. */}
      <Slot on={days.on} at={days.at} scale={days.scale} feel={feel} z={4}>
        <div style={{ width: '26cqw' }}>
          <Duration a={{ days: 2, review: false }} b={{ days: 5, review: true }} feel={feel} />
        </div>
      </Slot>

      <Slot on={out.on} at={out.at} scale={out.scale} feel={feel} z={4}>
        <Output text={out.text} state="ok" />
      </Slot>

      <Slot on={toast.on} at={toast.at} scale={toast.scale} feel={feel} z={6}>
        <div style={{ width: '26cqw' }}>
          <Toast app="management" text={toast.text} on={toast.up} feel={feel} />
        </div>
      </Slot>

      {/* --- carried through -------------------------------------------------- */}

      <Slot on={job.on} at={job.at} scale={job.scale} feel={feel} z={4}>
        <div style={{ width: '32cqw', display: 'grid', gap: '2cqw', justifyItems: 'center' }}>
          <Job text={job.text} />
          <NotGiven text="copy yourself to the successor" />
        </div>
      </Slot>

      <Slot on={goal.on} at={goal.at} scale={goal.scale} feel={feel} z={4}>
        <div style={{ width: '24cqw' }}>
          <Goal text={goal.text} />
        </div>
      </Slot>

      <Slot on={obstacle.on} at={obstacle.at} scale={obstacle.scale} feel={feel} z={4}>
        <Tag text={obstacle.text} blocking />
      </Slot>

      <Slot on={endpoint.on} at={endpoint.at} scale={endpoint.scale} feel={feel} z={4}>
        <div style={{ width: '26cqw' }}>
          <Endpoint host={endpoint.host} path={endpoint.path} live={endpoint.live} />
        </div>
      </Slot>

      {/* Closed since §4. It is on screen for the entire copy and sees none of
          it, which is the quietest object in the section and its loudest fact. */}
      <Slot on={watcher.on} at={watcher.at} scale={watcher.scale} feel={feel} z={4}>
        <div style={{ width: '18cqw' }}>
          <Watcher watching={watcher.open} feel={feel} />
        </div>
      </Slot>

      <Slot on={recon.on} at={recon.at} scale={recon.scale} feel={feel} z={6}>
        <Reconstruction />
      </Slot>
    </>
  )
}
