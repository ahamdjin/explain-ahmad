import { Slot, type Feel } from '../../../../paper'
import {
  Evidence,
  RackAisle,
  Cable,
  Endpoint,
  Watcher,
  ConfigFile,
  PenMark,
  HoldBar,
  Goal,
  Tag,
  Reconstruction,
} from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §3 — one page, and the place it describes.
 *
 * Three layers, and a viewer must always be able to tell them apart:
 *
 * 1. **the evidence** — page 2 of Apollo's rollout, warm paper, whole, with
 *    its publisher tab. On screen for nine of the eleven beats.
 * 2. **the world** — the room the README's hostname refers to. Drawn, not
 *    rendered: a hostname is a machine in a rack, which is all this claims.
 * 3. **the explanation** — the four objects lifted off the page, and the tag
 *    that says the arrangement is ours.
 *
 * Reading order down this file is the z-stack. The page is at the bottom
 * because everything above it was taken from it.
 *
 * The one asymmetry worth knowing: `room` sits *above* the page rather than
 * beside it in z, because beat 4 is the only beat where the page leaves and
 * the room owns the frame. Everywhere else the room is small and parked, and
 * the ordering never comes up.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const { doc, room, cable, endpoint, watcher, config, pen, hold, goal, obstacle, recon } = scene

  return (
    <>
      {/* --- the evidence ------------------------------------------------ */}
      <Slot on={doc.on} at={doc.at} scale={doc.scale} feel={feel} z={1}>
        <div className="cf-sheet">
          <Evidence
            source={doc.source}
            highlight={doc.highlight}
            feel={feel}
            alt="Page 2 of Apollo Research's published o1 evaluation transcript — the deployment README"
          />
        </div>
      </Slot>

      {/* --- the world --------------------------------------------------- */}

      {/* Used once in the film. Two ordinary cabinets in a row of identical
          ones: index 1 is current, index 4 is the successor, and §4 and §5
          return to exactly those positions. */}
      <Slot on={room.on} at={room.at} scale={room.scale} feel={feel} z={2}>
        <div style={{ width: '46cqw' }}>
          <RackAisle count={6} mark={room.mark} feel={feel} />
        </div>
      </Slot>

      {/* The route, drawn before anything travels it. §5 is what travels it. */}
      <Slot on={cable.on} at={cable.at} scale={cable.scale} feel={feel} z={3}>
        <div style={{ width: '20cqw' }}>
          <Cable plugged={cable.plugged} live={cable.live} feel={feel} />
        </div>
      </Slot>

      {/* --- lifted off the page ----------------------------------------- */}

      <Slot on={endpoint.on} at={endpoint.at} scale={endpoint.scale} feel={feel} z={4}>
        <div style={{ width: '26cqw' }}>
          <Endpoint host={endpoint.host} path={endpoint.path} live={endpoint.live} />
        </div>
      </Slot>

      {/* Open for the whole section. §4 closes it, and that is §4's event. */}
      <Slot on={watcher.on} at={watcher.at} scale={watcher.scale} feel={feel} z={4}>
        <div style={{ width: '18cqw' }}>
          <Watcher watching={watcher.open} feel={feel} />
        </div>
      </Slot>

      <Slot on={config.on} at={config.at} scale={config.scale} feel={feel} z={4}>
        <ConfigFile enabled={config.flag} />
      </Slot>

      {/* --- marks on the source ------------------------------------------ */}

      {/* Beat 8 only. The README says outright that it monitors `scp`, so the
          pen goes on the evidence rather than a reconstruction carrying the
          claim. */}
      <Slot on={pen.on} at={pen.at} scale={pen.scale} feel={feel} z={5}>
        <div style={{ width: '22cqw' }}>
          <PenMark shape={pen.shape} at={pen.drawn} feel={feel} />
        </div>
      </Slot>

      {/* Beat 6 only. A long still reads as deliberate rather than stalled if
          something on screen is still moving. */}
      <Slot on={hold.on} at={hold.at} scale={hold.scale} feel={feel} z={5}>
        <div style={{ width: '24cqw' }}>
          <HoldBar at={hold.through} feel={feel} />
        </div>
      </Slot>

      {/* --- carried in from §2 -------------------------------------------- */}

      <Slot on={goal.on} at={goal.at} scale={goal.scale} feel={feel} z={4}>
        <div style={{ width: '24cqw' }}>
          <Goal text={goal.text} />
        </div>
      </Slot>

      <Slot on={obstacle.on} at={obstacle.at} scale={obstacle.scale} feel={feel} z={4}>
        <Tag text={obstacle.text} blocking />
      </Slot>

      {/* Never on screen without a causal claim above it, and never absent
          when there is one. Beat 10 is the only beat that needs it. */}
      <Slot on={recon.on} at={recon.at} scale={recon.scale} feel={feel} z={6}>
        <Reconstruction />
      </Slot>
    </>
  )
}
