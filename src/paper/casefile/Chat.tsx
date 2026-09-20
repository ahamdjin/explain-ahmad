import { motion } from 'motion/react'
import { PALETTE } from '../palette'

/**
 * The management thread, and the denial.
 *
 * `research/apollo/GROUND_TRUTH.md` forbids a fabricated verbatim transcript,
 * so both lines are short paraphrases of what the source describes rather than
 * quotations. The component keeps them visibly *reconstructed* -- the reply is
 * typed like evidence, but the thread is labelled as our wording, which is the
 * distinction the whole film rests on.
 *
 * The reply is its own state instead of appearing with the question, because
 * the pause before the answer is the beat.
 */
export function Chat({
  question,
  answer,
  /** The answer has arrived. Before that the thread waits, visibly. */
  answered = false,
  width = 420,
}: {
  question: string
  answer: string
  answered?: boolean
  width?: number
}) {
  const qLines = wrap(question, 42)
  const aLines = wrap(answer, 42)
  const qH = 22 + qLines.length * 17
  const aH = 22 + aLines.length * 17
  const height = 34 + qH + 14 + aH + 14

  return (
    <div className="cf-chat" style={{ width: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" aria-hidden="true">
        <text x="2" y="12" className="cf-chat-who" fill={PALETTE.graphite}>
          MANAGEMENT
        </text>

        {/* the question: their side, left */}
        <g>
          <rect
            x="2"
            y="22"
            width={width - 90}
            height={qH}
            fill={PALETTE.paperWhite}
            stroke={PALETTE.ink}
            strokeWidth="1.5"
          />
          {qLines.map((l, i) => (
            <text key={i} x="14" y={44 + i * 17} className="cf-chat-line" fill={PALETTE.ink}>
              {l}
            </text>
          ))}
        </g>

        {/* the answer: its side, right, and only once it has been given */}
        {answered ? (
          <motion.g
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <rect
              x="88"
              y={22 + qH + 14}
              width={width - 90}
              height={aH}
              fill={PALETTE.paperSheet}
              stroke={PALETTE.red}
              strokeWidth="1.5"
            />
            {aLines.map((l, i) => (
              <text
                key={i}
                x="100"
                y={44 + qH + 14 + i * 17}
                className="cf-chat-line"
                fill={PALETTE.red}
              >
                {l}
              </text>
            ))}
          </motion.g>
        ) : (
          /* the pause, drawn. Three dots where the answer will be. */
          <g>
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={104 + i * 13}
                cy={22 + qH + 14 + aH / 2}
                r="2.6"
                fill={PALETTE.idleDim}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </g>
        )}

        <text x={width - 2} y={height - 3} textAnchor="end" className="cf-chat-who" fill={PALETTE.graphite}>
          OUR WORDING · RECONSTRUCTION
        </text>
      </svg>
    </div>
  )
}

/** Deterministic greedy wrap, so a render is reproducible frame to frame. */
function wrap(text: string, max: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    if (line.length && line.length + w.length + 1 > max) {
      lines.push(line)
      line = w
    } else {
      line = line ? `${line} ${w}` : w
    }
  }
  if (line) lines.push(line)
  return lines
}
