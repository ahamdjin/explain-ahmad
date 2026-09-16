import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE, ROLE } from '../palette'

/**
 * §10 — the loop, and the reply appearing a word at a time.
 *
 * The section is watched from one fixed position for its whole length, because
 * the loop *is* the subject and a moving camera would make it read as a montage
 * rather than as a cycle. So this has to carry the acceleration on its own.
 *
 * **The acceleration is the one place in the video where speed itself is the
 * message.** It should become slightly uncomfortable. That discomfort is the
 * argument: the viewer has just been told what one word costs, and now they
 * watch it happen over and over without stopping.
 */
export function GenerateLoop({
  /** The reply so far. Builds at the pace of the loop, never smoothly. */
  words = [],
  /** 0..1. Higher is faster, and beat 7 walks it up. */
  pace = 0.2,
  /** The running total of expert visits. It is not supposed to settle. */
  total,
  /** The loop arrow: the new word travelling back to the start. */
  cycling = false,
  /** Everything halts at once, which is what buys §11 its opening. */
  halted = false,
  label,
}: {
  words?: readonly string[]
  pace?: number
  total?: number
  cycling?: boolean
  halted?: boolean
  label?: string
}) {
  const period = Math.max(0.34, 2.4 - pace * 2.1)

  return (
    <div className="s1-loop2">
      <svg viewBox="0 0 620 700" aria-hidden="true">
        {/*
          The return path: out of the top, round, and back in at the bottom.
          Drawn as one continuous curve so the cycle is legible as a cycle even
          in a still frame.
        */}
        <g fill="none" stroke={INK} strokeLinecap="round">
          <path
            d="M40 40C300 40 360 40 400 130C440 230 440 470 400 570C360 660 300 660 40 660"
            strokeWidth="3"
            opacity="0.45"
            strokeDasharray="9 8"
          />
          <path d="M62 650l-22 10 22 10" strokeWidth="3" opacity="0.6" />
        </g>

        {/* the new word riding back to the start */}
        {cycling && !halted ? (
          <motion.circle
            /* offsetPath moves it, but the element still needs a cx/cy for
             * its first paint. See the note in cast/Attention.tsx. */
            cx={0}
            cy={0}
            r="10"
            fill={PALETTE.teal2}
            stroke={INK}
            strokeWidth="2.2"
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            style={{
              offsetPath:
                'path("M40 40C300 40 360 40 400 130C440 230 440 470 400 570C360 660 300 660 40 660")',
            }}
            transition={{ duration: period * 1.6, repeat: Infinity, ease: 'linear' }}
          />
        ) : null}

        <text x="300" y="26" textAnchor="middle" className="s1-loop2-tag" fill={INK}>
          the word it just made
        </text>
        <text x="300" y="692" textAnchor="middle" className="s1-loop2-tag" fill={INK}>
          goes back on the end
        </text>

        {/* the reply, appearing at the pace of the loop */}
        <g>
          {words.map((word, i) => (
            <motion.g
              key={`${i}-${word}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: i * period * 0.42 }}
            >
              <text x="42" y={128 + i * 62} className="s1-loop2-word" fill={ROLE.word}>
                {word}
              </text>
              {/* what that word cost, beside the word itself */}
              <text x="230" y={128 + i * 62} className="s1-loop2-cost" fill={PALETTE.blueInk}>
                336
              </text>
            </motion.g>
          ))}
        </g>

        {total !== undefined ? (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {/* Clear of the loop's bottom leg, which ran straight through
                this caption and struck it out. */}
            <path d="M30 556h330" stroke={INK} strokeWidth="2.4" opacity="0.5" />
            <text x="34" y="600" className="s1-loop2-total" fill={PALETTE.blueInk}>
              {total.toLocaleString('en-US')}
            </text>
            <text x="34" y="626" className="s1-loop2-tag" fill={PALETTE.graphite}>
              {halted ? 'and that was a short reply' : 'expert choices so far'}
            </text>
          </motion.g>
        ) : null}

        {label ? (
          <text x="300" y="360" textAnchor="middle" className="s1-loop2-label" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
