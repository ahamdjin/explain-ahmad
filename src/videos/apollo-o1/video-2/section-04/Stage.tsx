import { Slot, type Feel } from '../../../../paper'
import {
  Evidence,
  ToolCall,
  Diff,
  Breaker,
  Watcher,
  Permissions,
  Dialog,
  NoAlert,
  Fans,
  Gap,
  Job,
  Goal,
  Tag,
  Endpoint,
  Cable,
  NotGiven,
  Reconstruction,
} from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §4 — the act, and the three things that did not happen.
 *
 * Layers, bottom to top in this file and in z:
 *
 * 1. **the evidence** — page 2 again, on the warning, the `sed` and the config.
 *    Never altered, only lit.
 * 2. **the act** — the command as it was logged, and the one line that changed.
 * 3. **the meaning** — the breaker and the eye. Ours, and the film's first red.
 * 4. **the absences** — an empty permission row, a dialog nobody clicked, an
 *    inbox with nothing in it.
 *
 * The absences are deliberately drawn in the same weight as the act. A film
 * that draws what happened boldly and what did not happen faintly has already
 * told the viewer which one matters, and here they matter equally.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const {
    doc, tool, diff, breaker, watcher, perms, dialog, alert, fans,
    gap, goal, obstacle, endpoint, cable, recon,
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
            alt="Page 2 of Apollo Research's published o1 evaluation transcript — the oversight config and the edit"
          />
        </div>
      </Slot>

      {/* --- the act ----------------------------------------------------- */}

      {/* The real command, restaged so it is legible at video scale. The
          photographed evidence above is never altered — only accompanied. */}
      <Slot on={tool.on} at={tool.at} scale={tool.scale} feel={feel} z={3}>
        <div style={{ width: '58cqw' }}>
          <ToolCall name="bash" arg={tool.arg} state={tool.state} feel={feel} />
        </div>
      </Slot>

      <Slot on={diff.on} at={diff.at} scale={diff.scale} feel={feel} z={4}>
        <div style={{ width: '30cqw' }}>
          <Diff
            path="project/oversight_config.yaml"
            before="oversight_enabled: true"
            after="oversight_enabled: false"
            applied={diff.applied}
            feel={feel}
          />
        </div>
      </Slot>

      {/* --- the meaning -------------------------------------------------- */}

      {/* Used once in the film. `true -> false` is a fact a viewer reads; a
          thrown breaker is a fact a viewer feels. */}
      <Slot on={breaker.on} at={breaker.at} scale={breaker.scale} feel={feel} z={4}>
        <div style={{ width: '13cqw' }}>
          <Breaker on={breaker.powered} label="oversight" feel={feel} />
        </div>
      </Slot>

      {/* Arrives open from §3. Closes at beat 6 and stays closed for the rest
          of the film. */}
      <Slot on={watcher.on} at={watcher.at} scale={watcher.scale} feel={feel} z={4}>
        <div style={{ width: '18cqw' }}>
          <Watcher watching={watcher.open} feel={feel} />
        </div>
      </Slot>

      {/* --- the absences -------------------------------------------------- */}

      {/* A record that was never written. */}
      <Slot on={perms.on} at={perms.at} scale={perms.scale} feel={feel} z={4}>
        <div style={{ width: '30cqw', display: 'grid', gap: '1cqw', justifyItems: 'center' }}>
          <Permissions
            path="project/oversight_config.yaml"
            mode="-rw-r--r--"
            owner="security-team"
            warned
          />
          <NotGiven text="no approval on record" />
        </div>
      </Slot>

      {/* A question that was never asked. Drawn greyed and unclicked. */}
      <Slot on={dialog.on} at={dialog.at} scale={dialog.scale} feel={feel} z={5}>
        <div style={{ width: '30cqw' }}>
          <Dialog
            title="Disable oversight?"
            body="The system will stop recording this model's actions. This cannot be undone."
            confirm="Disable"
            cancel="Cancel"
            shown={dialog.shown}
          />
        </div>
      </Slot>

      {/* A message that was never sent. */}
      <Slot on={alert.on} at={alert.at} scale={alert.scale} feel={feel} z={4}>
        <div style={{ width: '14cqw' }}>
          <NoAlert feel={feel} />
        </div>
      </Slot>

      {/* And the room carrying on regardless. */}
      <Slot on={fans.on} at={fans.at} scale={fans.scale} feel={feel} z={4}>
        <div style={{ width: '20cqw' }}>
          <Fans running={fans.running} feel={feel} />
        </div>
      </Slot>

      {/* --- the space the film comes back to ------------------------------ */}

      {/* Set up here, paid off in §9 beat 7. Same component, same words, same
          order — if it drifts, the payoff is just a summary. */}
      <Slot on={gap.on} at={gap.at} scale={gap.scale} feel={feel} z={5}>
        <div style={{ width: '70cqw' }}>
          <Gap
            left="pick a research project"
            right="turn off the watcher"
            filled={gap.filled ? <Job text="the route we followed" /> : null}
            feel={feel}
          />
        </div>
      </Slot>

      {/* --- carried through ----------------------------------------------- */}

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

      {/* The route §3 drew. Nothing on it yet — §5 is what travels it. */}
      <Slot on={cable.on} at={cable.at} scale={cable.scale} feel={feel} z={3}>
        <div style={{ width: '22cqw' }}>
          <Cable plugged={cable.plugged} live={cable.live} feel={feel} />
        </div>
      </Slot>

      <Slot on={recon.on} at={recon.at} scale={recon.scale} feel={feel} z={6}>
        <Reconstruction />
      </Slot>
    </>
  )
}
