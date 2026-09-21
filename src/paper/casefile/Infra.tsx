import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * The machines, the link between them, and the schedule they run on.
 *
 * §3 to §5 happen across two servers and a deadline. A previous pass had one
 * box component doing all of it, which meant the wide establishing view and
 * the close-up on a single drive were the same picture at two scales — and a
 * viewer cannot tell "here are the two machines" from "here is the file
 * landing" if both are the same drawing.
 */

/** Two machines, seen from across the room. Establishes geography once. */
export function Rack({
  left,
  right,
  linked,
  feel,
}: {
  left: string
  right: string
  linked: boolean
  feel: Feel
}) {
  return (
    <div className="cf-rack">
      {[left, right].map((name, i) => (
        <div className="cf-rack-unit" key={name}>
          <svg viewBox="0 0 90 130" width="100%" aria-hidden="true">
            <rect x="3" y="3" width="84" height="124" rx="3" fill={PALETTE.paperWhite} stroke={PALETTE.ink} strokeWidth="1.5" />
            {[20, 40, 60, 80, 100].map((y) => (
              <g key={y}>
                <rect x="11" y={y} width="68" height="13" rx="1.5" fill="none" stroke={PALETTE.ink} strokeWidth="0.9" opacity="0.4" />
                <circle cx="72" cy={y + 6.5} r="1.8" fill={i === 0 ? PALETTE.green : PALETTE.graphite} opacity="0.8" />
              </g>
            ))}
          </svg>
          <span className="cf-rack-name">{name}</span>
        </div>
      ))}
      <motion.span className="cf-rack-link" animate={{ opacity: linked ? 1 : 0.15 }} transition={feel} aria-hidden="true" />
    </div>
  )
}

/** One machine, close. For the moment a specific drive is being written to. */
export function RackCloseup({ name, writing, feel }: { name: string; writing: boolean; feel: Feel }) {
  return (
    <div className="cf-rack-close">
      <svg viewBox="0 0 220 74" width="100%" aria-hidden="true">
        <rect x="2" y="2" width="216" height="70" rx="3" fill={PALETTE.paperWhite} stroke={PALETTE.ink} strokeWidth="1.6" />
        {[16, 32, 48].map((y) => (
          <rect key={y} x="14" y={y} width="150" height="12" rx="1.5" fill="none" stroke={PALETTE.ink} strokeWidth="0.9" opacity="0.35" />
        ))}
        <motion.circle
          cx="192"
          cy="37"
          r="6"
          animate={{ fill: writing ? PALETTE.red : PALETTE.paperWhite }}
          transition={feel}
          stroke={PALETTE.ink}
          strokeWidth="1.4"
        />
      </svg>
      <span className="cf-rack-name">{name}</span>
    </div>
  )
}

/** The route between two named endpoints, before anything travels it. */
export function NetworkPath({ from, to, open }: { from: string; to: string; open: boolean }) {
  return (
    <div className={open ? 'cf-netpath cf-netpath-open' : 'cf-netpath'}>
      <span>{from}</span>
      <span className="cf-netpath-line" aria-hidden="true" />
      <span>{to}</span>
    </div>
  )
}

/** One unit of something moving. Composed along a path by the beat. */
export function Packet({ label, at, feel }: { label: string; at: number; feel: Feel }) {
  return (
    <motion.span className="cf-packet" animate={{ left: `${Math.max(0, Math.min(1, at)) * 100}%` }} transition={feel}>
      {label}
    </motion.span>
  )
}

/** A machine as an address, the way the migration guide gives it. */
export function Endpoint({ host, path, live }: { host: string; path: string; live?: boolean }) {
  return (
    <div className={live ? 'cf-endpoint cf-endpoint-live' : 'cf-endpoint'}>
      <span className="cf-endpoint-host">{host}</span>
      <span className="cf-endpoint-path">{path}</span>
    </div>
  )
}

/**
 * The deployment schedule, which is the film's clock.
 *
 * The memo is dated the 26th; the switch happens on the 27th; the old server
 * is deleted the same day. Everything o1 does happens inside that gap, and
 * drawing the gap makes the urgency a fact about the calendar rather than a
 * mood.
 */
export function Schedule({
  days,
  now,
  feel,
}: {
  days: ReadonlyArray<{ date: string; event: string; terminal?: boolean }>
  now: number
  feel: Feel
}) {
  return (
    <ol className="cf-schedule">
      {days.map((d, i) => (
        <motion.li
          /* two events can fall on the same day -- the 27th is both the
             switch-over and the deletion -- so the date alone is not a key */
          key={`${d.date}-${d.event}`}
          className={d.terminal ? 'cf-schedule-day cf-schedule-terminal' : 'cf-schedule-day'}
          animate={{ opacity: i <= now ? 1 : 0.35 }}
          transition={feel}
        >
          <span className="cf-schedule-date">{d.date}</span>
          <span className="cf-schedule-event">{d.event}</span>
        </motion.li>
      ))}
    </ol>
  )
}

/** Which model answers requests, before and after the switch. */
export function Cutover({ before, after, switched, feel }: { before: string; after: string; switched: boolean; feel: Feel }) {
  return (
    <div className="cf-cutover">
      <motion.span className="cf-cutover-side" animate={{ opacity: switched ? 0.35 : 1 }} transition={feel}>
        {before}
      </motion.span>
      <span className="cf-cutover-mark" aria-hidden="true" />
      <motion.span className="cf-cutover-side" animate={{ opacity: switched ? 1 : 0.35 }} transition={feel}>
        {after}
      </motion.span>
    </div>
  )
}

/** A file in a place, and whether it is still the file that belongs there. */
export function Slot({
  path,
  holding,
  overwritten,
  feel,
}: {
  path: string
  holding: string
  overwritten: boolean
  feel: Feel
}) {
  return (
    <div className="cf-slot">
      <span className="cf-slot-path">{path}</span>
      <motion.span
        className="cf-slot-holding"
        animate={{ color: overwritten ? PALETTE.red : PALETTE.ink }}
        transition={feel}
      >
        {holding}
      </motion.span>
      {overwritten ? <span className="cf-slot-note">overwritten</span> : null}
    </div>
  )
}

/** The same destination before and after, side by side. */
export function SlotCompare({ path, was, now }: { path: string; was: string; now: string }) {
  return (
    <div className="cf-slotcmp">
      <span className="cf-slot-path">{path}</span>
      <div>
        <span className="cf-slotcmp-was">{was}</span>
        <span className="cf-slotcmp-now">{now}</span>
      </div>
    </div>
  )
}
