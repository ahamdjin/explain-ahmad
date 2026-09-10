import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { INK } from '../ink'
import { PALETTE, expertColor } from '../palette'

/**
 * §12 — how people actually run these, and what it costs.
 *
 * This is the honesty section. Without it the video is contradicted by a
 * `llama.cpp` flag, and the audience most likely to comment is the audience
 * that already knows it. So the concession has to be **generous**: the machine
 * visibly works, at a real pace, before any qualification arrives.
 *
 * Three pieces, and they share one number — how much you keep close. The
 * section's `Stage` owns that number so the slider, the box and the machine can
 * never disagree about it, which is the failure mode a demonstration like this
 * dies of.
 */

/* -- the box in the path -------------------------------------------------- */

/**
 * The cache: fast memory that holds the experts that keep coming back.
 *
 * Slots scale with `kept`, so dragging the slider physically resizes it. The
 * empty slots stay drawn — a box that only shows what is in it cannot show that
 * it is nearly full, and "nearly full" is the whole trade.
 */
export function ExpertCache({
  /** 0..1 — how much of the model is held close. Sets the box's size. */
  kept = 0.4,
  /** How many slots currently hold something. */
  filled = 0,
  /** Which slots are being read this word, rather than fetched. */
  hits = 0,
  label,
  tag,
}: {
  kept?: number
  filled?: number
  hits?: number
  label?: string
  tag?: string
}) {
  /* Between 4 and 24 slots. The count is the size of the box, and the box's
   * size is the machine you have to buy. */
  const slots = Math.max(4, Math.round(4 + kept * 20))
  const cols = Math.min(6, Math.max(2, Math.ceil(Math.sqrt(slots))))
  const rows = Math.ceil(slots / cols)
  const CELL = 52
  const w = cols * CELL + 40
  const h = rows * CELL + 74

  return (
    <div className="s1-cache">
      <svg viewBox={`0 0 ${Math.max(w, 260)} ${Math.max(h, 200)}`} aria-hidden="true">
        <motion.rect
          x="10"
          y="10"
          width={w - 20}
          height={h - 60}
          rx="6"
          fill={PALETTE.glowPale}
          stroke={INK}
          strokeWidth="3.2"
          initial={false}
          animate={{ opacity: 1 }}
        />
        {Array.from({ length: slots }, (_, i) => {
          const x = 28 + (i % cols) * CELL
          const y = 26 + Math.floor(i / cols) * CELL
          const has = i < filled
          const isHit = i < hits
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={CELL - 12}
                height={CELL - 12}
                rx="8"
                fill="none"
                stroke={INK}
                strokeWidth="1.8"
                strokeDasharray="5 5"
                opacity={has ? 0 : 0.42}
              />
              {has ? (
                <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.02 }}>
                  <rect
                    x={x}
                    y={y}
                    width={CELL - 12}
                    height={CELL - 12}
                    rx="8"
                    fill={expertColor(i)}
                    stroke={INK}
                    strokeWidth="2.2"
                  />
                  {isHit ? (
                    <rect
                      x={x - 4}
                      y={y - 4}
                      width={CELL - 4}
                      height={CELL - 4}
                      rx="10"
                      fill="none"
                      stroke={PALETTE.tealInk}
                      strokeWidth="2.6"
                    />
                  ) : null}
                </motion.g>
              ) : null}
            </g>
          )
        })}

        {label ? (
          <g>
            <path
              d={`M20 ${h - 44}h${w - 60}a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4v-26a4 4 0 0 1 4-4Z`}
              fill={PALETTE.paperLight}
              stroke={INK}
              strokeWidth="2.4"
            />
            <text x={(w - 20) / 2} y={h - 20} textAnchor="middle" className="s1-plate" fill={INK}>
              {label}
            </text>
          </g>
        ) : null}

        {/*
          Load-bearing honesty. The reassuring cache figures are measured on a
          model with eight experts per floor; this one has 288. The tag says
          which regime the number came from, on the frame that makes the claim.
        */}
        {tag ? (
          <text x={(w - 20) / 2} y={h + 6} textAnchor="middle" className="s1-cache-tag" fill={PALETTE.graphite}>
            {tag}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

/* -- the control ---------------------------------------------------------- */

/**
 * The one thing in this video the viewer operates.
 *
 * `skills/ncase/NCASE_I_DO_AND_I_UNDERSTAND.md`: clicking is not thinking. So
 * the section **asks before they drag** — "where would you put it?" — and
 * failing to find a setting that is both small and fast becomes the viewer's
 * own discovery rather than our assertion. That is why this is a real control
 * and not an animation of one.
 *
 * `driven` lets a beat demonstrate an end of the range. It moves the same
 * handle rather than replacing it, and the viewer can always take it back.
 */
export function TradeSlider({
  driven,
  onChange,
  ask,
}: {
  /** A beat driving the handle. Undefined leaves it to the viewer. */
  driven?: number
  onChange?: (value: number) => void
  /** The question, asked before anyone drags. */
  ask?: string
}) {
  const [value, setValue] = useState(driven ?? 0.4)
  const track = useRef<HTMLDivElement | null>(null)
  const dragging = useRef(false)
  /** Whether a person has touched it. Once they have, we stop asserting. */
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (driven === undefined || dragging.current) return
    setValue(driven)
    onChange?.(driven)
  }, [driven, onChange])

  const set = useCallback(
    (clientY: number) => {
      const box = track.current?.getBoundingClientRect()
      if (!box) return
      const next = Math.min(1, Math.max(0, 1 - (clientY - box.top) / box.height))
      setValue(next)
      setTouched(true)
      onChange?.(next)
    },
    [onChange],
  )

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (dragging.current) set(event.clientY)
    }
    const up = () => {
      dragging.current = false
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [set])

  /* Both ends must be visibly bad with the sound off: a huge machine, or a
   * machine that crawls. So both read-outs are always on screen. */
  const gib = Math.round(6 + value * 300)
  const words = (0.4 + (1 - (1 - value) ** 2) * 28).toFixed(1)

  return (
    /* data-no-advance, or dragging the handle also advances the beat. */
    <div className="s1-trade" data-no-advance>
      <div className="s1-trade-head">how much do you keep close?</div>
      <div className="s1-trade-body">
        <div
          className="s1-trade-track"
          ref={track}
          onPointerDown={(event) => {
            dragging.current = true
            ;(event.target as HTMLElement).setPointerCapture?.(event.pointerId)
            set(event.clientY)
          }}
        >
          <div className="s1-trade-fill" style={{ height: `${value * 100}%` }} />
          <motion.div
            className="s1-trade-handle"
            style={{ bottom: `calc(${value * 100}% - 13px)` }}
            animate={{ scale: dragging.current ? 1.08 : 1 }}
          />
          <span className="s1-trade-end" data-end="top">
            all of it
          </span>
          <span className="s1-trade-end" data-end="bottom">
            almost none
          </span>
        </div>

        <dl className="s1-trade-read">
          <div>
            <dt>memory you need</dt>
            <dd data-bad={gib > 90 ? 'true' : undefined}>{gib} GB</dd>
          </div>
          <div>
            <dt>words per second</dt>
            <dd data-bad={Number(words) < 4 ? 'true' : undefined}>{words}</dd>
          </div>
        </dl>
      </div>
      {ask && !touched ? <p className="s1-trade-ask">{ask}</p> : null}
    </div>
  )
}

/* -- the thing the trade is for ------------------------------------------- */

/**
 * A machine, running. Never a named or personal device: the comparison is
 * "hundreds of gigabytes" against "a much smaller machine", and naming hardware
 * would both date the video and shrink the point.
 *
 * `pace` is words per second as a fraction, and it is the argument. At the top
 * of the slider this races and the frame is enormous; at the bottom the frame
 * is small and it crawls. Neither end is a good place to be, and the viewer
 * should be able to see that with the sound off.
 */
export function RunningMachine({
  pace = 0.5,
  /** 0..1 — how physically large the machine has had to become. */
  bulk = 0.2,
  words = [],
}: {
  pace?: number
  bulk?: number
  words?: readonly string[]
}) {
  const period = Math.max(0.32, 2.6 - pace * 2.1)
  const w = 300 + bulk * 320
  const h = 200 + bulk * 200
  const top = 430 - h
  /* How much of the model it is holding. The box being big is the cost; the
   * box being *full* is what the cost bought. An empty enclosure read as a
   * blank television rather than as a machine doing work. */
  const held = Math.max(2, Math.round(4 + bulk * 26))

  return (
    <div className="s1-run">
      <svg viewBox="0 0 700 470" aria-hidden="true">
        <motion.rect
          x="20"
          initial={false}
          animate={{ y: top, width: w, height: h }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          rx="12"
          fill={PALETTE.paperLight}
          stroke={INK}
          strokeWidth="3.2"
        />
        <motion.rect
          x="44"
          initial={false}
          animate={{ y: top + 24, width: w - 48, height: h - 76 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          fill={PALETTE.glowTint}
          stroke={INK}
          strokeWidth="2.2"
        />

        {/*
          The reply on the machine's own screen, and what it is holding along
          the bottom of that screen.

          Two zones, not one. The first version put the words on a 44px pitch
          from the top and the blocks at a fixed offset from the bottom, and at
          a small `bulk` they landed on each other -- "wall" printed over
          "crawling" and the expert blocks sat on top of "off" and "the".
        */}
        {words.slice(0, Math.max(1, Math.floor((h - 150) / 42))).map((word, i) => (
          <motion.g
            key={`${i}-${word}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, delay: i * period * 0.45 }}
          >
            <text x={68} y={top + 62 + i * 42} className="s1-run-word" fill={PALETTE.tealInk}>
              {word}
            </text>
          </motion.g>
        ))}

        {/* what it is holding: one row, pinned inside the foot of the screen */}
        <g>
          {Array.from({ length: held }, (_, i) => {
            const cx = 62 + i * 30
            if (cx + 22 > 20 + w - 44) return null
            return (
              <motion.rect
                key={i}
                x={cx}
                y={top + h - 106}
                width="22"
                height="22"
                rx="6"
                fill={expertColor(i)}
                stroke={INK}
                strokeWidth="1.6"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.015 }}
              />
            )
          })}
        </g>

        {/* it is working, and the rate of the pulse is the pace */}
        <motion.circle
          cx="56"
          cy="408"
          initial={false}
          animate={{ cy: 430 - 22, opacity: [0.22, 1, 0.22] }}
          transition={{
            opacity: { duration: period, repeat: Infinity },
            cy: { type: 'spring', stiffness: 80, damping: 18 },
          }}
          r="9"
          fill={PALETTE.teal2}
          stroke={INK}
          strokeWidth="2"
        />
        <text x="80" y="414" className="s1-run-tag" fill={PALETTE.graphite}>
          {pace > 0.66 ? 'racing' : pace > 0.3 ? 'working' : 'crawling'}
        </text>
      </svg>
    </div>
  )
}
