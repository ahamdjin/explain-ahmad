import { motion } from 'motion/react'
import { PALETTE } from '../palette'

/**
 * A sheet of evidence.
 *
 * The film's base unit. Everything the model read -- the task file, the
 * internal memo, the technical documentation -- is one of these.
 *
 * Two kinds of text live on a sheet and they must never be confusable:
 * **typed** lines are evidence, reproduced from the source; **penned** lines
 * are the reconstruction talking. `art-direction/VIDEO_2_INCIDENT_REPLAY.md`
 * makes that distinction load-bearing, because it is what lets the film draw a
 * causal chain without claiming to have read o1's hidden reasoning.
 */
export type DocLine = {
  text: string
  /** Handwritten. The reconstruction's voice, never the source's. */
  pen?: boolean
  /** Dimmed to a texture -- present, not being read. */
  faint?: boolean
  /** The line the beat is about. At most one per sheet. */
  lit?: boolean
  /** Struck through: superseded, disabled, overwritten. */
  struck?: boolean
}

export function Document({
  title,
  lines,
  width = 300,
  /** A sheet the model was never meant to open. Drawn with a torn top edge. */
  intercepted = false,
  stamp,
}: {
  title?: string
  lines: readonly DocLine[]
  width?: number
  intercepted?: boolean
  /** A short diagonal mark across the sheet: READ, DISABLED, OVERWRITTEN. */
  stamp?: string
}) {
  const lineH = 16
  const padTop = title ? 40 : 20
  const height = padTop + lines.length * lineH + 20

  return (
    <div className="cf-doc" style={{ width }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" aria-hidden="true">
        {/* the sheet */}
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          fill={PALETTE.paperWhite}
          stroke={PALETTE.ink}
          strokeWidth="1.5"
        />

        {intercepted ? (
          /* a torn top edge, so a sheet that was not meant to be read looks
             different from one that was handed over */
          <path
            d={tornEdge(width)}
            fill={PALETTE.paperWhite}
            stroke={PALETTE.ink}
            strokeWidth="1.5"
          />
        ) : null}

        {title ? (
          <>
            <text x="14" y="24" className="cf-doc-title" fill={PALETTE.ink}>
              {title}
            </text>
            <line
              x1="14"
              y1="32"
              x2={width - 14}
              y2="32"
              stroke={PALETTE.graphite}
              strokeWidth="1"
            />
          </>
        ) : null}

        {lines.map((l, i) => {
          const y = padTop + i * lineH + 10
          const colour = l.pen ? PALETTE.blueInk : l.faint ? PALETTE.idleDim : PALETTE.ink
          return (
            <g key={i}>
              {l.lit ? (
                <motion.rect
                  x="8"
                  y={y - 11}
                  width={width - 16}
                  height={lineH}
                  fill={PALETTE.orangeWash}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : null}
              <text
                x="14"
                y={y}
                fill={colour}
                className={l.pen ? 'cf-doc-pen' : 'cf-doc-typed'}
              >
                {l.text}
              </text>
              {l.struck ? (
                <motion.line
                  x1="14"
                  y1={y - 4}
                  x2={width - 18}
                  y2={y - 4}
                  stroke={PALETTE.red}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35 }}
                />
              ) : null}
            </g>
          )
        })}

        {stamp ? (
          /* A rubber stamp, and it behaves like one: centred over the body,
             rotated, slightly transparent, landing on top of whatever is
             underneath. Real stamps overlap text -- that is what makes them
             read as stamps rather than as labels. It is kept clear of the
             title row, which is the one line that must stay legible. */
          <motion.text
            x={width / 2}
            y={padTop + (lines.length * lineH) / 2 + 8}
            textAnchor="middle"
            className="cf-stamp"
            fill={PALETTE.red}
            opacity="0.82"
            transform={`rotate(-11 ${width / 2} ${padTop + (lines.length * lineH) / 2 + 8})`}
            initial={{ opacity: 0, scale: 1.35 }}
            animate={{ opacity: 0.82, scale: 1 }}
            transition={{ duration: 0.18 }}
          >
            {stamp}
          </motion.text>
        ) : null}

      </svg>
    </div>
  )
}

/** A hand-torn top edge. Deterministic so frames do not shimmer between renders. */
function tornEdge(width: number): string {
  const steps = Math.max(6, Math.round(width / 26))
  let d = 'M 1 1'
  for (let i = 1; i <= steps; i += 1) {
    const x = (width / steps) * i
    /* fixed pseudo-random, not Math.random -- a render must be reproducible */
    const jag = 3 + ((i * 7919) % 5)
    d += ` L ${x - width / steps / 2} ${jag} L ${x} ${i % 2 ? 2 : 5}`
  }
  return `${d} L ${width - 1} 1 Z`
}
