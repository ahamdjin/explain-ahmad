import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { INK, expertColor } from '../ink'
import { PALETTE } from '../palette'

/**
 * Storage: where the experts are when nobody needs them.
 *
 * Deliberately continuous with the on-call bunks in section 1 -- this is the
 * same idea, seen from the storage side, and drawing it as an unrelated disk
 * icon would break the world for the sake of a familiar symbol.
 */
export function Store({ label, count = 48 }: { label: string; count?: number }) {
  const cols = 12
  const rows = Math.ceil(count / cols)

  return (
    <div className="s1-store">
      <svg viewBox="0 0 480 380" aria-hidden="true">
        <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 54h432v300H24z" fill={PALETTE.paperFold} strokeWidth="3.2" />
          <path d="M12 58 240 26l228 32" fill="#E7DFCF" strokeWidth="3" />
          {Array.from({ length: rows }, (_, r) => (
            <path key={r} d={`M40 ${86 + r * 66}h400`} strokeWidth="2" opacity="0.4" />
          ))}
        </g>

        {Array.from({ length: count }, (_, i) => {
          const x = 48 + (i % cols) * 33
          const y = 66 + Math.floor(i / cols) * 66
          return (
            <g key={i}>
              <g stroke={INK} strokeWidth="1.8" strokeLinecap="round">
                <path d={`M${x + 6} ${y + 20}v8`} />
                <path d={`M${x + 17} ${y + 20}v8`} />
              </g>
              <rect x={x} y={y} width="23" height="21" rx="6.5" fill={PALETTE.idleAsleep} stroke={INK} strokeWidth="2" />
              <g stroke={INK} strokeWidth="1.7" strokeLinecap="round" opacity="0.6">
                <path d={`M${x + 4} ${y + 10}h5`} />
                <path d={`M${x + 14} ${y + 10}h5`} />
              </g>
            </g>
          )
        })}

        <g>
          <path d="M120 358h240a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H120a4 4 0 0 1-4-4v-30a4 4 0 0 1 4-4Z" fill={PALETTE.paperLight} stroke={INK} strokeWidth="2.6" />
          <text x="240" y="381" textAnchor="middle" className="s1-plate" fill={INK}>
            {label}
          </text>
        </g>
      </svg>
    </div>
  )
}

/**
 * Fast memory: small, and the only place work can actually happen.
 *
 * Eight slots, because eight is what the plan promised would be enough.
 */
export function FastMemory({ count, label, strained }: { count: number; label: string; strained: boolean }) {
  return (
    <motion.div
      className="s1-fastmem"
      data-strained={strained ? 'true' : undefined}
      animate={{ x: strained ? [0, -3, 3, -2, 0] : 0 }}
      transition={{ duration: 0.4, repeat: strained ? Infinity : 0, repeatDelay: 1.1 }}
    >
      <svg viewBox="0 0 320 280" aria-hidden="true">
        {/*
          A plain open-front box. The earlier version had a trapezoid stand
          under it, which turned the whole prop into a laptop screen -- so the
          frame read as "the experts go into a computer" rather than "into a
          container with exactly eight places in it".
        */}
        <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 34h280v206H20z" fill={PALETTE.glowPale} strokeWidth="3.4" />
          <path d="M20 34 44 14h280l-24 20" fill={PALETTE.paperFold} strokeWidth="2.6" />
          <path d="M300 34l24-20v206l-24 20" fill={PALETTE.paperShade} strokeWidth="2.6" />
        </g>

        {Array.from({ length: 8 }, (_, i) => {
          const x = 40 + (i % 4) * 62
          const y = 62 + Math.floor(i / 4) * 78
          const filled = i < count
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="46"
                height="56"
                rx="8"
                fill="none"
                stroke={INK}
                strokeWidth="2"
                strokeDasharray="5 5"
                opacity={filled ? 0 : 0.45}
              />
              {filled ? (
                <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <g stroke={INK} strokeWidth="2.1" strokeLinecap="round">
                    <path d={`M${x + 15} ${y + 38}v11`} />
                    <path d={`M${x + 31} ${y + 38}v11`} />
                  </g>
                  <rect x={x + 6} y={y + 8} width="34" height="31" rx="9" fill={expertColor(i * 3)} stroke={INK} strokeWidth="2.2" />
                  <circle cx={x + 16} cy={y + 22} r="2.4" fill={INK} />
                  <circle cx={x + 30} cy={y + 22} r="2.4" fill={INK} />
                </motion.g>
              ) : null}
            </g>
          )
        })}

        <g>
          <path d="M60 254h200a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H60a4 4 0 0 1-4-4v-22a4 4 0 0 1 4-4Z" fill={PALETTE.paperLight} stroke={INK} strokeWidth="2.4" />
          <text x="160" y="272" textAnchor="middle" className="s1-plate" fill={INK}>
            {label}
          </text>
        </g>
      </svg>
    </motion.div>
  )
}

/**
 * The road between storage and fast memory.
 *
 * `jammed` is the whole point of section 7: the same path, the same eight
 * experts, but the traffic never clears -- because a new set is needed before
 * the last one has arrived.
 */
export function FetchPath({ items, jammed }: { items: number; jammed: boolean }) {
  const n = Math.min(items, 12)

  return (
    <div className="s1-fetch" data-jammed={jammed ? 'true' : undefined}>
      <svg viewBox="0 0 560 150" aria-hidden="true">
        {/* One track. A second dashed line above it read as a second road. */}
        <g fill="none" stroke={INK} strokeLinecap="round">
          <path d="M8 96h544" strokeWidth="3" />
          <path d="M520 84l16 12-16 12" strokeWidth="3" />
        </g>

        {Array.from({ length: n }, (_, i) => {
          /* Jammed: bunched at the entrance, nose to tail. Clear: evenly spaced. */
          const x = jammed ? 24 + i * 26 : 24 + i * 44
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
            >
              <rect x={x} y={62} width="23" height="21" rx="6.5" fill={expertColor(i * 2)} stroke={INK} strokeWidth="2" />
              <circle cx={x + 7} cy={72} r="1.9" fill={INK} />
              <circle cx={x + 16} cy={72} r="1.9" fill={INK} />
            </motion.g>
          )
        })}

        {jammed ? (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.35 }}>
            {/* A queue bracket, so the bunching reads as a backlog and not as
                a tidier arrangement of the same traffic. */}
            <g fill="none" stroke={PALETTE.red} strokeWidth="3" strokeLinecap="round">
              <path d="M20 44v-12h318v12" />
            </g>
            <text x="179" y="24" textAnchor="middle" className="s1-fetch-tag" fill={PALETTE.red}>
              backing up
            </text>
          </motion.g>
        ) : null}
      </svg>
    </div>
  )
}

/**
 * The verdict, as a picture.
 *
 * Section 7 is won by racing two bars and letting the viewer read the result,
 * not by asserting a bottleneck. The work bar is *supposed* to be almost
 * invisible -- that is the finding, so it is drawn to scale and labelled rather
 * than inflated to be legible.
 */
export function CostBars({
  show,
  ratio,
  /**
   * A magnified view of the small bar, with **the magnification labelled**.
   *
   * The two bars really are to scale: 1000 units against 20 is 1:50, which is
   * the measured penalty. But a 20-unit bar is barely a mark, so §11 beat 12
   * needs it enlarged to be readable -- and an enlargement that does not say
   * how much it enlarged by is a dishonest chart. A dishonest bar chart on
   * this frame would undo the whole video, so the multiplier is on screen.
   */
  inset,
}: {
  show: 'fetch' | 'both'
  ratio: string
  inset?: boolean
}) {
  const FULL = 1000
  /** The work bar, drawn to scale against the fetch bar. */
  const WORK = 20

  return (
    <div className="s1-bars">
      <svg viewBox="0 0 1180 310" aria-hidden="true">
        <text x="8" y="34" className="s1-bar-name" fill={INK}>
          carrying them in
        </text>
        <motion.rect
          x="8"
          y="48"
          width={FULL}
          height="58"
          rx="4"
          fill={PALETTE.red}
          stroke={INK}
          strokeWidth="3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: '8px 48px' }}
          transition={{ type: 'spring', stiffness: 60, damping: 18 }}
        />
        <text x={FULL + 26} y="88" className="s1-bar-fig" fill={PALETTE.red}>
          ~1.5 s
        </text>

        <motion.g animate={{ opacity: show === 'both' ? 1 : 0 }} transition={{ duration: 0.35 }}>
          <text x="8" y="172" className="s1-bar-name" fill={INK}>
            the actual work
          </text>
          <rect x="8" y="186" width={FULL} height="58" rx="4" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="6 7" opacity="0.35" />
          <rect x="8" y="186" width={WORK} height="58" rx="3" fill={PALETTE.blue} stroke={INK} strokeWidth="3" />
          <text x="54" y="226" className="s1-bar-fig" fill={INK}>
            milliseconds
          </text>
          <text x={FULL + 26} y="226" className="s1-bar-ratio" fill={PALETTE.red}>
            {ratio}
          </text>

          {/* the same bar, enlarged, with the enlargement stated */}
          {inset ? (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.5 }}>
              <path
                d={`M8 250 L300 268 M${8 + WORK} 250 L${300 + WORK * 12} 268`}
                stroke={INK}
                strokeWidth="1.6"
                strokeDasharray="4 4"
                opacity="0.5"
                fill="none"
              />
              <rect x="300" y="268" width={WORK * 12} height="18" rx="2" fill={PALETTE.blue} stroke={INK} strokeWidth="2" />
              <text x={300 + WORK * 12 + 16} y="284" className="s1-bar-inset" fill={INK}>
                the same bar, 12× bigger — so you can see it at all
              </text>
            </motion.g>
          ) : null}
        </motion.g>
      </svg>
    </div>
  )
}

/**
 * A number the viewer watches being built is a number they trust.
 *
 * `run` is why this counts rather than appears. 336 is asserted by every other
 * video about this subject; here it is assembled on screen, floor by floor,
 * next to the marker doing the climbing. The same is true of 12,096 in §12.
 */
export function Counter({
  value,
  label,
  run = false,
  seconds = 1.4,
}: {
  value: number
  label: string
  /** Count up to `value` instead of arriving at it. */
  run?: boolean
  seconds?: number
}) {
  const [shown, setShown] = useState(run ? 0 : value)

  useEffect(() => {
    if (!run) {
      setShown(value)
      return
    }
    const started = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - started) / (seconds * 1000))
      /* Ease out, so it decelerates onto the figure and holds there. */
      setShown(Math.round(value * (1 - (1 - t) ** 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [run, value, seconds])

  return (
    <div className="s1-counter">
      <strong>{shown.toLocaleString('en-US')}</strong>
      <span>{label}</span>
    </div>
  )
}

/**
 * A clock, running.
 *
 * §11 beat 10 has to make "roughly a second and a half" felt rather than
 * stated, and the only way a duration is felt is if it takes that long. The
 * hand really does sweep for `seconds`.
 */
export function Clock({ seconds, running, label }: { seconds: number; running: boolean; label: string }) {
  return (
    <div className="s1-clock">
      <svg viewBox="0 0 260 300" aria-hidden="true">
        <circle cx="130" cy="130" r="106" fill={PALETTE.paperLight} stroke={INK} strokeWidth="4" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <path
              key={i}
              d={`M${130 + Math.sin(angle) * 88} ${130 - Math.cos(angle) * 88}L${130 + Math.sin(angle) * 96} ${130 - Math.cos(angle) * 96}`}
              stroke={INK}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )
        })}
        <motion.path
          d="M130 130V44"
          stroke={PALETTE.red}
          strokeWidth="5"
          strokeLinecap="round"
          style={{ transformOrigin: '130px 130px' }}
          initial={false}
          animate={{ rotate: running ? 360 : 0 }}
          transition={running ? { duration: seconds, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
        />
        <circle cx="130" cy="130" r="7" fill={INK} />
        <text x="130" y="268" textAnchor="middle" className="s1-clock-fig" fill={PALETTE.red}>
          {label}
        </text>
      </svg>
    </div>
  )
}
