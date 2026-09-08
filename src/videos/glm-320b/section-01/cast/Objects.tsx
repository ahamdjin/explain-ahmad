import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { INK, expertColor } from '../paper'
import { Expert } from './Expert'

/**
 * The persistent actor for all of Section 01: one word on a kraft card.
 *
 * `layoutId` must be unique per card on screen. Two cards sharing an id make
 * Motion treat them as one shared element, and only one of them renders.
 */
export function WordCard({
  word = 'a word',
  scale = 1,
  layoutId = 's1-word',
  className = '',
}: {
  word?: string
  scale?: number
  layoutId?: string
  className?: string
}) {
  return (
    <motion.div
      className={`s1-word-card ${className}`.trim()}
      style={{ '--scale': scale } as React.CSSProperties}
      layoutId={layoutId}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 110, damping: 20 }}
    >
      <span>{word.startsWith('a ') ? word : `\u201c${word}\u201d`}</span>
    </motion.div>
  )
}

/**
 * The stored checkpoint. Reads as furniture holding real objects, so the
 * contrast with the RAM tray works without reading either label.
 */
export function WeightShelf({
  title,
  size,
  shelves = 4,
  perShelf = 6,
  scale = 1,
  dimmed = false,
}: {
  title: string
  size: string
  shelves?: number
  perShelf?: number
  scale?: number
  dimmed?: boolean
}) {
  return (
    <motion.div
      className="s1-shelf"
      style={{ '--scale': scale } as React.CSSProperties}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: dimmed ? 0.45 : 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 22 }}
    >
      <span className="s1-shelf-title">{title}</span>
      <div className="s1-shelf-body">
        {Array.from({ length: shelves }, (_, row) => (
          <div className="s1-shelf-row" key={row}>
            {Array.from({ length: perShelf }, (_, column) => (
              <Expert
                key={column}
                index={row * perShelf + column}
                size={34}
                mood="asleep"
                dimmed={row >= shelves - 1}
              />
            ))}
            <span className="s1-shelf-more">···</span>
          </div>
        ))}
      </div>
      <span className="s1-shelf-size">{size}</span>
    </motion.div>
  )
}

/** Active working space. Must read as physically much smaller than the shelf. */
export function RamTray({
  count = 9,
  size = '~ a few GB',
  note,
  scale = 1,
}: {
  count?: number
  size?: string
  note?: string
  scale?: number
}) {
  return (
    <motion.div
      className="s1-ram"
      style={{ '--scale': scale } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 115, damping: 19 }}
    >
      <div className="s1-ram-head">
        <strong>RAM / VRAM</strong>
        <small>(Working Memory)</small>
      </div>
      <div className="s1-ram-slots">
        {Array.from({ length: count }, (_, index) => (
          <Expert
            key={index}
            index={index}
            size={30}
            mood="happy"
            dashed={index === count - 1 && count === 9}
          />
        ))}
      </div>
      <span className="s1-ram-size">{size}</span>
      {note ? <span className="s1-ram-note">{note}</span> : null}
    </motion.div>
  )
}

/** The unexplained bottleneck. Appears once, in frame 13, and must dominate. */
export function Blocker({ scale = 1 }: { scale?: number }) {
  return (
    <motion.div
      className="s1-blocker"
      style={{ '--scale': scale } as React.CSSProperties}
      initial={{ opacity: 0, y: -18, rotate: -4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 130, damping: 14 }}
    >
      <svg viewBox="0 0 90 210" filter="url(#s1-ink-soft)" aria-hidden="true">
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
          <path d="M45 66v138" strokeLinecap="round" />
          <g clipPath="url(#s1-pole)">
            <rect x="31" y="66" width="28" height="138" fill="#E3C45B" />
            {Array.from({ length: 7 }, (_, index) => (
              <rect key={index} x="31" y={66 + index * 20} width="28" height="10" fill={INK} stroke="none" />
            ))}
          </g>
          <rect x="31" y="66" width="28" height="138" fill="none" />
          <path d="M45 8 84 60H6L45 8Z" fill="#C86658" />
          <path d="M45 26v20" stroke="#FBF8F1" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="45" cy="53" r="2.8" fill="#FBF8F1" stroke="none" />
        </g>
        <clipPath id="s1-pole">
          <rect x="31" y="66" width="28" height="138" />
        </clipPath>
      </svg>
    </motion.div>
  )
}

/** A little machine hoping to be big enough. Sad, grey, small. */
export function SmallMachine({ scale = 1 }: { scale?: number }) {
  return (
    <motion.div
      className="s1-machine"
      style={{ '--scale': scale } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <svg viewBox="0 0 110 120" filter="url(#s1-ink-soft)" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="90" height="82" rx="14" fill="#DDE3E2" />
          <rect x="24" y="24" width="62" height="44" rx="8" fill="#EFF2F1" />
          <g fill={INK} stroke="none">
            <circle cx="44" cy="44" r="4.4" />
            <circle cx="66" cy="44" r="4.4" />
          </g>
          <path d="M46 60c4-4 14-4 18 0" strokeWidth="2.6" />
          <path d="M30 92v14" />
          <path d="M80 92v14" />
        </g>
      </svg>
    </motion.div>
  )
}

/** The doorway into Section 02. */
export function Archway({ children }: { children?: ReactNode }) {
  return (
    <motion.div
      className="s1-arch"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 105, damping: 21 }}
    >
      <svg viewBox="0 0 260 300" filter="url(#s1-ink-soft)" aria-hidden="true">
        <defs>
          <linearGradient id="s1-arch-glow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#F6DCA9" />
            <stop offset="1" stopColor="#FDF6E4" />
          </linearGradient>
        </defs>
        <path
          d="M40 296V150a90 90 0 0 1 180 0v146Z"
          fill="url(#s1-arch-glow)"
          stroke={INK}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path
          d="M40 296V150a90 90 0 0 1 180 0v146"
          fill="none"
          stroke={INK}
          strokeWidth="3.4"
        />
        <g fill="none" stroke={INK} strokeWidth="2.6" opacity="0.5">
          <path d="M70 296v-24h120v24" />
          <path d="M84 272v-20h92v20" />
        </g>
      </svg>
      {children}
    </motion.div>
  )
}

/** Frame 1's model card — the section 14 information-screen exception. */
export function ModelInfoCard({ highlight }: { highlight: boolean }) {
  const rows: Array<[string, string, 'total' | 'active' | undefined]> = [
    ['Architecture', 'Mixture of Experts (MoE)', undefined],
    ['Total Parameters', '320 Billion', 'total'],
    ['Active Parameters', '18 Billion', 'active'],
    ['Experts', '288 routed + 1 shared', undefined],
    ['Layers', '45', undefined],
    ['Purpose', 'Fast, capable, efficient', undefined],
  ]

  return (
    <motion.div
      className="s1-info-card"
      initial={{ opacity: 0, y: 16, rotate: -1.4 }}
      animate={{ opacity: 1, y: 0, rotate: -0.6 }}
      transition={{ type: 'spring', stiffness: 100, damping: 21 }}
    >
      <i className="s1-info-tape" aria-hidden="true" />
      <h2>GLM-5.3-Flash</h2>
      <dl>
        {rows.map(([term, value, emphasis]) => (
          <div key={term} data-emphasis={emphasis}>
            <dt>{term}:</dt>
            <dd>
              {emphasis && highlight ? <mark data-kind={emphasis}>{value}</mark> : value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}

const CROWD_COLS = 8
const CROWD_ROWS = 5

/**
 * A crowd of experts that reads as a population, not a grid of cards.
 *
 * Laid out on a jittered grid rather than a modulo scatter: modulo positions
 * collide and clump, which leaves visible holes and stacked characters.
 */
export function ExpertCrowd({ count = 34, dimmed = false }: { count?: number; dimmed?: boolean }) {
  return (
    <div className="s1-crowd" data-dimmed={dimmed ? 'true' : undefined}>
      {Array.from({ length: Math.min(count, CROWD_COLS * CROWD_ROWS) }, (_, index) => {
        const col = index % CROWD_COLS
        const row = Math.floor(index / CROWD_COLS)
        const jitterX = (((index * 37) % 11) - 5) * 0.9
        const jitterY = (((index * 53) % 9) - 4) * 1.1

        return (
          <motion.span
            key={index}
            className="s1-crowd-slot"
            style={
              {
                '--x': `${(col / (CROWD_COLS - 1)) * 100 + jitterX}%`,
                '--y': `${(row / (CROWD_ROWS - 1)) * 100 + jitterY}%`,
                '--tilt': `${((index % 5) - 2) * 1.8}deg`,
                '--fill': expertColor(index),
              } as React.CSSProperties
            }
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.012, type: 'spring', stiffness: 150, damping: 17 }}
          >
            <Expert index={index} size={38} mood={index % 4 === 0 ? 'happy' : 'idle'} />
          </motion.span>
        )
      })}
    </div>
  )
}
