import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE, ROLE } from '../palette'
import { seeded } from '../props/frame'

/**
 * The two tables the video looks things up in.
 *
 * `Vocabulary` is the list of every token the model knows — §2 turns a word
 * into a row number in it, and §9 turns the top of the stack back into a
 * choice from it. Same object, both times, which is the only reason the §9
 * callback works.
 *
 * `EmbeddingTable` is the other table: one row of 4096 values per token.
 */

/** Plausible entries. Real enough to read, not claimed as measured. */
const ENTRIES = [
  'dogs', ' dog', 'dog', 'doge', ' dogg', 'doing', ' doll', 'dome', ' done', 'dont',
  ' door', 'dose', ' dot', ' double', ' down', 'draft', ' drag', ' drank', ' draw', ' dream',
]

export function Vocabulary({
  /** Row number of the entry that matters, for the highlight. */
  hit,
  scrolling = false,
  /** §9: a score against every entry, with a few standing out. */
  scores,
  label,
}: {
  hit?: number
  scrolling?: boolean
  scores?: boolean
  label?: string
}) {
  const rows = 20
  return (
    <div className="s1-vocab">
      <svg viewBox="0 0 380 520" aria-hidden="true">
        <rect x="8" y="8" width="364" height="504" rx="4" fill={PALETTE.paperLight} stroke={INK} strokeWidth="3" />

        <motion.g
          initial={false}
          animate={{ y: scrolling ? [0, -260, -130] : 0 }}
          transition={scrolling ? { duration: 1.6, ease: [0.2, 0, 0.1, 1] } : { duration: 0.4 }}
        >
          {Array.from({ length: rows }, (_, i) => {
            const y = 26 + i * 24
            const isHit = hit !== undefined && i === 10
            /* Scores fall off fast: a few plausible, most hopeless. */
            const score = scores ? Math.max(0.04, seeded(i * 3 + 1) ** 3) : 0
            return (
              <g key={i}>
                {isHit ? (
                  <rect x="12" y={y - 15} width="356" height="22" rx="3" fill={PALETTE.tealWash} />
                ) : null}
                <text x="26" y={y} className="s1-vocab-n" fill={PALETTE.blueInk} opacity={isHit ? 1 : 0.55}>
                  {hit !== undefined ? String(hit - 10 + i) : String(4011 + i)}
                </text>
                <text x="96" y={y} className="s1-vocab-t" fill={INK} opacity={isHit ? 1 : 0.72}>
                  {ENTRIES[i % ENTRIES.length]}
                </text>
                {scores ? (
                  <motion.rect
                    x="238"
                    y={y - 11}
                    height="14"
                    rx="2"
                    fill={PALETTE.blue}
                    initial={{ width: 0 }}
                    animate={{ width: 8 + score * 118 }}
                    transition={{ duration: 0.5, delay: i * 0.018 }}
                  />
                ) : null}
              </g>
            )
          })}
        </motion.g>

        {/* the list runs past both ends of its own frame */}
        <g fill={PALETTE.paperLight}>
          <rect x="8" y="8" width="364" height="18" />
          <rect x="8" y="494" width="364" height="18" />
        </g>
        <g stroke={INK} strokeWidth="1.6" opacity="0.35">
          <path d="M20 20h348M20 500h348" strokeDasharray="3 5" />
        </g>

        {label ? (
          <text x="190" y="546" textAnchor="middle" className="s1-vocab-cap" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

/**
 * One row per token, 154,880 of them, running past the top of the frame.
 *
 * The height is the whole point of the object, so the rows do not stop at the
 * edge — they are clipped by it, and the fade says "this continues".
 */
export function EmbeddingTable({
  /** The row that has been pulled out, if any. */
  pulled = false,
  seeking = false,
  label,
}: {
  pulled?: boolean
  seeking?: boolean
  label?: string
}) {
  const rows = 26
  const hitRow = 15
  return (
    <div className="s1-etable">
      <svg viewBox="0 0 460 620" aria-hidden="true">
        <rect x="20" y="0" width="380" height="600" fill={PALETTE.paperSheet} stroke={INK} strokeWidth="3" />

        {Array.from({ length: rows }, (_, i) => {
          const y = 18 + i * 22
          const isHit = i === hitRow
          return (
            <g key={i}>
              <path d={`M20 ${y + 8}h380`} stroke={INK} strokeWidth="1.2" opacity="0.22" />
              <text x="34" y={y + 4} className="s1-etable-n" fill={PALETTE.blueInk} opacity={isHit ? 1 : 0.4}>
                {String(4006 + i)}
              </text>
              {/* the row's values, as marks rather than digits */}
              <motion.g
                initial={false}
                animate={{ x: isHit && pulled ? 84 : 0, opacity: isHit ? 1 : 0.5 }}
                transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              >
                {Array.from({ length: 16 }, (_, k) => (
                  <rect
                    key={k}
                    x={92 + k * 18}
                    y={y - 6 + (1 - seeded(i * 31 + k)) * 6}
                    width="11"
                    height={4 + seeded(i * 31 + k) * 9}
                    rx="1.4"
                    fill={isHit ? PALETTE.blue : PALETTE.blueWash}
                  />
                ))}
              </motion.g>
            </g>
          )
        })}

        {seeking ? (
          <motion.rect
            x="20"
            width="380"
            height="22"
            fill={ROLE.word}
            opacity="0.18"
            initial={{ y: 18 }}
            animate={{ y: 18 + hitRow * 22 - 8 }}
            transition={{ duration: 0.9, ease: [0.3, 0, 0.2, 1] }}
          />
        ) : null}

        {/* it continues past the top */}
        <rect x="20" y="0" width="380" height="26" fill={PALETTE.paperSheet} opacity="0.92" />
        <path d="M20 12h380" stroke={INK} strokeWidth="1.4" strokeDasharray="3 5" opacity="0.4" />

        {label ? (
          <text x="210" y="616" textAnchor="middle" className="s1-vocab-cap" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

/**
 * Three rows, placed by how alike they are.
 *
 * A deliberate analogy: these rows live in 4096 dimensions and cannot be
 * drawn. So this shows **relative distance only** — no axes, no grid, no
 * coordinates. If a viewer could read a position off it, the frame would be
 * lying. See video-script/03 truth notes.
 */
export function Space({ show }: { show: boolean }) {
  const points = [
    { label: 'dog', x: 34, y: 44 },
    { label: 'cat', x: 44, y: 36 },
    { label: 'Tuesday', x: 82, y: 74 },
  ]
  return (
    <div className="s1-space">
      <svg viewBox="0 0 460 300" aria-hidden="true">
        <g stroke={PALETTE.relateInk} strokeWidth="2.2" strokeDasharray="5 5" opacity={show ? 0.8 : 0}>
          <path d="M156 132 202 108" />
          <path d="M202 108 378 222" />
        </g>
        {points.map((p, i) => (
          <motion.g
            key={p.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.7 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.12 }}
          >
            <circle cx={p.x * 4.6} cy={p.y * 3} r="11" fill={PALETTE.tealWash} stroke={ROLE.word} strokeWidth="2.8" />
            <text x={p.x * 4.6} y={p.y * 3 + 34} textAnchor="middle" className="s1-space-t" fill={INK}>
              {p.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
