import { motion } from 'motion/react'
import { INK, expertColor } from '../paper'

/**
 * The office: memory, as a room with desks.
 *
 * The real constraint on running a model is not storage, it's *presence* -- a
 * worker has to be at a desk to do any work. A box with slots said "container".
 * A room with desks says "everyone has to be here", which is why the whole model
 * must be resident even though most of it idles.
 *
 * One desk = one gigabyte.
 */
export function Office({
  desks = 32,
  /** How many desks are occupied. Empty desks stay drawn, so room reads. */
  seated = 0,
  /** Of those seated, how many are actually working. The rest idle. */
  working = 0,
  label = 'my office',
  capacity = '32 desks',
  strained = false,
  scale = 1,
}: {
  desks?: number
  seated?: number
  working?: number
  label?: string
  capacity?: string
  strained?: boolean
  scale?: number
}) {
  return (
    <motion.div
      className="s1-office"
      data-strained={strained ? 'true' : undefined}
      style={{ '--scale': scale } as React.CSSProperties}
    >
      <div className="s1-office-head">
        <strong>{label}</strong>
        <small>{capacity}</small>
      </div>

      <div className="s1-office-room">
        {Array.from({ length: desks }, (_, index) => {
          const occupied = index < seated
          const busy = index < working
          return (
            <span key={index} className="s1-desk" data-occupied={occupied ? 'true' : undefined}>
              {occupied ? <Worker index={index} busy={busy} /> : null}
            </span>
          )
        })}
      </div>
    </motion.div>
  )
}

/** A seated expert. Working ones are colour and awake; idle ones are grey and asleep. */
function Worker({ index, busy }: { index: number; busy: boolean }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect
        x="5"
        y="5"
        width="30"
        height="30"
        rx="9"
        fill={busy ? expertColor(index) : '#D6D2C9'}
        stroke={INK}
        strokeWidth="2.2"
      />
      {busy ? (
        <>
          <g fill={INK}>
            <circle cx="15" cy="17" r="2.1" />
            <circle cx="25" cy="17" r="2.1" />
          </g>
          <path d="M15 25c3 2.5 7 2.5 10 0" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
        </>
      ) : (
        <g stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <path d="M12 18h6" />
          <path d="M22 18h6" />
        </g>
      )}
    </svg>
  )
}

/** Where idle workers could wait instead of occupying a desk. */
export function Home({ count = 0, scale = 1 }: { count?: number; scale?: number }) {
  return (
    <motion.div className="s1-home" style={{ '--scale': scale } as React.CSSProperties}>
      <svg viewBox="0 0 200 150" filter="url(#s1-ink-soft)" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
          <path d="M100 12 186 74v64H14V74Z" fill="#EFE9DC" />
          <path d="M76 138v-40h48v40" fill="#E2DACA" />
        </g>
      </svg>
      <span className="s1-home-label">home</span>
      {count ? <span className="s1-home-count">{count} waiting</span> : null}
    </motion.div>
  )
}

/** Faint copies of the office, so a size reads as "this many offices". */
export function GhostOffices({ count, scale = 1 }: { count: number; scale?: number }) {
  return (
    <div className="s1-ghosts" style={{ '--scale': scale } as React.CSSProperties}>
      {Array.from({ length: count }, (_, index) => (
        <motion.span
          key={index}
          className="s1-ghost"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06, duration: 0.24 }}
        />
      ))}
    </div>
  )
}
