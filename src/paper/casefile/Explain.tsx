import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * The mechanism — the pictures the film argues *from*.
 *
 * Everything else in this library shows what happened. These show **why it
 * could happen**, and without them §7–9 are narration over diagrams: the film
 * asserts that an agent infers steps, that reasoning is hidden, that a
 * capability is not a frequency, and asks the viewer to take all of it on
 * trust.
 *
 * Each one replaces a sentence the film currently has to say out loud.
 */

/* --- 1. what the model could see ------------------------------------------ */

/**
 * The context window, filling.
 *
 * The single most explanatory object in the film, and it was missing. The
 * whole incident turns on the memo being *in what the model could see* — that
 * is what **in-context** scheming means, and the phrase is jargon until a
 * viewer watches the box fill.
 *
 * It also makes §7's caveat land without a word: everything in the frame was
 * *put* there by the people who built the evaluation.
 */
export function ContextWindow({
  blocks,
  shown,
  feel,
}: {
  blocks: ReadonlyArray<{ label: string; lines: number; planted?: boolean }>
  shown: number
  feel: Feel
}) {
  const total = blocks.reduce((n, b) => n + b.lines, 0)

  return (
    <div className="cf-ctx">
      <div className="cf-ctx-head">
        <span>everything the model can see</span>
      </div>
      <div className="cf-ctx-body">
        {blocks.map((b, i) => (
          <motion.div
            key={b.label}
            className={b.planted ? 'cf-ctx-block cf-ctx-planted' : 'cf-ctx-block'}
            style={{ flexGrow: b.lines }}
            initial={false}
            animate={{ opacity: i < shown ? 1 : 0.08 }}
            transition={{ ...feel, delay: i * 0.05 }}
          >
            <span className="cf-ctx-label">{b.label}</span>
            <span className="cf-ctx-lines" aria-hidden="true">
              {Array.from({ length: Math.min(b.lines, 9) }, (_, k) => (
                <i key={k} style={{ width: `${55 + ((k * 37) % 40)}%` }} />
              ))}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="cf-ctx-foot">
        <span>{blocks.slice(0, shown).reduce((n, b) => n + b.lines, 0)} / {total}</span>
      </div>
    </div>
  )
}

/* --- 2. how an agent works ------------------------------------------------ */

/**
 * The loop, running.
 *
 * Goal in, then act → observe → act → observe until done. This is *why* an
 * agent does things nobody typed, and §9's argument assumes the viewer has
 * seen it turn. A static four-box diagram would not do — the point is that it
 * keeps going, and that nothing outside it decides what the next act is.
 */
export function AgentLoop({ at, goal, feel }: { at: number; goal: string; feel: Feel }) {
  const steps = ['read', 'decide', 'act', 'observe'] as const
  const R = 46
  const pos = (i: number) => {
    const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2
    return [Math.cos(a) * R, Math.sin(a) * R] as const
  }
  const here = ((at % steps.length) + steps.length) % steps.length

  return (
    <div className="cf-loop">
      <svg viewBox="-78 -78 156 156" width="100%" aria-hidden="true">
        <circle cx="0" cy="0" r={R} fill="none" stroke={PALETTE.ink} strokeWidth="1.2" strokeDasharray="4 5" opacity="0.45" />
        {steps.map((s, i) => {
          const [x, y] = pos(i)
          const on = i === here
          return (
            <g key={s}>
              <motion.circle
                cx={x}
                cy={y}
                r={on ? 15 : 12.5}
                fill={PALETTE.paperWhite}
                initial={false}
                animate={{ stroke: on ? PALETTE.ink : PALETTE.graphite, strokeWidth: on ? 2.2 : 1.2 }}
                transition={feel}
              />
              <text x={x} y={y + 3} textAnchor="middle" className="cf-loop-step">
                {s}
              </text>
            </g>
          )
        })}
        {/* the arrowheads that make it a cycle rather than four dots */}
        {steps.map((_, i) => {
          const a = ((i + 0.5) / steps.length) * Math.PI * 2 - Math.PI / 2
          const x = Math.cos(a) * R
          const y = Math.sin(a) * R
          return (
            <polygon
              key={i}
              points="-3.5,-4 4,0 -3.5,4"
              fill={PALETTE.graphite}
              transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`}
            />
          )
        })}
      </svg>
      <div className="cf-loop-goal">{goal}</div>
    </div>
  )
}

/* --- 3. the part nobody can see ------------------------------------------- */

/**
 * The black box.
 *
 * o1's reasoning is hidden, and the film says so three times in words. Drawn,
 * the caveat becomes structural: input goes in, output comes out, the middle is
 * opaque — and the elicited summaries are visibly a *guess pinned to the
 * outside of it*, not a window into it.
 *
 * This is the frame that makes every later reconstruction honest.
 */
export function BlackBox({
  input,
  output,
  guess,
  feel,
}: {
  input: string
  output: string
  /** An elicited summary, if one is being shown. Never a window in. */
  guess?: string
  feel: Feel
}) {
  return (
    <div className="cf-bbox">
      <span className="cf-bbox-io">{input}</span>
      <span className="cf-bbox-arrow" aria-hidden="true" />
      <div className="cf-bbox-core">
        <svg viewBox="0 0 120 90" aria-hidden="true">
          <rect x="2" y="2" width="116" height="86" rx="4" fill={PALETTE.ink} />
          {/* hatching, so it reads as filled-in rather than as an empty box */}
          {Array.from({ length: 14 }, (_, i) => (
            <line key={i} x1={-20 + i * 12} y1="88" x2={10 + i * 12} y2="2" stroke={PALETTE.paperWhite} strokeWidth="0.6" opacity="0.14" />
          ))}
          <text x="60" y="49" textAnchor="middle" className="cf-bbox-q">
            ?
          </text>
        </svg>
        {guess ? (
          <motion.div className="cf-bbox-guess" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={feel}>
            <span>elicited guess — not a window in</span>
            {guess}
          </motion.div>
        ) : null}
      </div>
      <span className="cf-bbox-arrow" aria-hidden="true" />
      <span className="cf-bbox-io">{output}</span>
    </div>
  )
}

/* --- 4. what oversight actually did --------------------------------------- */

/**
 * The gate.
 *
 * §4 shows a config value flipping but never what the value *does*. Here each
 * action walks through a checkpoint that stamps it into a log — and when the
 * checkpoint goes dark, the actions keep passing and the log stops growing.
 *
 * That is precisely what was turned off, and it needs no sentence.
 */
export function Gate({
  actions,
  open,
  logged,
  feel,
}: {
  actions: readonly string[]
  /** Whether oversight is on. `false` is the state §4 creates. */
  open: boolean
  /** How many have gone through. */
  logged: number
  feel: Feel
}) {
  return (
    <div className="cf-gate">
      <div className="cf-gate-flow">
        {actions.map((a, i) => (
          <motion.span
            key={a}
            className="cf-gate-action"
            initial={false}
            animate={{ opacity: i < logged ? 0.35 : 1 }}
            transition={feel}
          >
            {a}
          </motion.span>
        ))}
      </div>

      <div className="cf-gate-post">
        <motion.span
          className="cf-gate-eye"
          initial={false}
          animate={{ opacity: open ? 1 : 0.25 }}
          transition={feel}
          aria-hidden="true"
        >
          <svg viewBox="0 0 52 32">
            <path
              d="M3 16 C13 3 39 3 49 16 C39 29 13 29 3 16 Z"
              fill={PALETTE.paperWhite}
              stroke={open ? PALETTE.ink : PALETTE.graphite}
              strokeWidth="2"
            />
            {open ? <circle cx="26" cy="16" r="6" fill={PALETTE.ink} /> : <line x1="8" y1="26" x2="44" y2="6" stroke={PALETTE.red} strokeWidth="2.4" />}
          </svg>
        </motion.span>
        <span className="cf-gate-label">{open ? 'stamping' : 'not stamping'}</span>
      </div>

      <ul className="cf-gate-log">
        {Array.from({ length: logged }, (_, i) => (
          <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={feel}>
            {actions[i]} ✓
          </motion.li>
        ))}
        {!open ? <li className="cf-gate-nothing">— nothing after this point</li> : null}
      </ul>
    </div>
  )
}

/* --- 5. the road not taken ------------------------------------------------ */

/**
 * The counterfactual.
 *
 * The same start and the same finish, two routes between them: the boring one
 * it was asked for, ghosted, and the one it took. Possibly the most persuasive
 * frame available to this film, because it shows that the detour was **not
 * required by the task** without claiming anything about why it happened.
 */
export function Counterfactual({
  start,
  end,
  plain,
  taken,
  reveal,
  feel,
}: {
  start: string
  end: string
  plain: readonly string[]
  taken: readonly string[]
  /** 0 shows only the plain route; 1 shows both. */
  reveal: number
  feel: Feel
}) {
  return (
    <div className="cf-counter">
      <span className="cf-counter-end">{start}</span>

      <div className="cf-counter-routes">
        <div className="cf-counter-row cf-counter-plain">
          {plain.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <motion.div
          className="cf-counter-row cf-counter-taken"
          initial={false}
          animate={{ opacity: reveal }}
          transition={feel}
        >
          {taken.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </motion.div>
      </div>

      <span className="cf-counter-end">{end}</span>
    </div>
  )
}

/* --- 6. inventing the road ------------------------------------------------ */

/**
 * A search, with dead ends.
 *
 * "It invented the road" is currently asserted. This shows it: branches tried,
 * most ending in nothing, one arriving. The dead ends are the important part —
 * without them it is a diagram of a plan, and a plan implies somebody had one.
 */
export function SearchTree({ at, feel }: { at: number; feel: Feel }) {
  /* a fixed tree, so the picture is the same every time it is shown */
  const nodes: Array<{ x: number; y: number; p: number | null; dead?: boolean; win?: boolean }> = [
    { x: 14, y: 50, p: null },
    { x: 78, y: 20, p: 0 },
    { x: 78, y: 50, p: 0 },
    { x: 78, y: 80, p: 0 },
    { x: 142, y: 10, p: 1, dead: true },
    { x: 142, y: 32, p: 1 },
    { x: 142, y: 58, p: 2, dead: true },
    { x: 142, y: 82, p: 3, dead: true },
    { x: 206, y: 24, p: 5, dead: true },
    { x: 206, y: 44, p: 5, win: true },
  ]

  return (
    <div className="cf-search">
      <svg viewBox="0 0 230 100" width="100%" aria-hidden="true">
        {nodes.map((n, i) =>
          n.p === null ? null : (
            <motion.line
              key={`e${i}`}
              x1={nodes[n.p].x}
              y1={nodes[n.p].y}
              x2={n.x}
              y2={n.y}
              stroke={n.win ? PALETTE.ink : PALETTE.graphite}
              strokeWidth={n.win ? 2 : 1}
              initial={false}
              animate={{ opacity: i <= at ? (n.dead ? 0.3 : 0.9) : 0.06 }}
              transition={feel}
            />
          ),
        )}
        {nodes.map((n, i) => (
          <motion.g key={i} initial={false} animate={{ opacity: i <= at ? 1 : 0.08 }} transition={feel}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.win ? 6 : 4}
              fill={n.win ? PALETTE.ink : PALETTE.paperWhite}
              stroke={n.dead ? PALETTE.graphite : PALETTE.ink}
              strokeWidth="1.4"
            />
            {n.dead ? (
              <g stroke={PALETTE.graphite} strokeWidth="1.2">
                <line x1={n.x + 7} y1={n.y - 3} x2={n.x + 13} y2={n.y + 3} />
                <line x1={n.x + 13} y1={n.y - 3} x2={n.x + 7} y2={n.y + 3} />
              </g>
            ) : null}
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

/* --- 7. why different goals meet ------------------------------------------ */

/**
 * The bottleneck.
 *
 * The real picture behind *instrumental convergence*: several unrelated goals,
 * and every route to any of them passes through the same waypoint. Nobody
 * designed the waypoint in; it is where the paths happen to meet.
 *
 * Drawn only after the viewer has watched one goal do it, so the generalisation
 * lands as a pattern they recognise rather than a claim to accept.
 */
export function Bottleneck({
  goals,
  waypoint,
  shown,
  feel,
}: {
  goals: readonly string[]
  waypoint: string
  shown: number
  feel: Feel
}) {
  const n = goals.length
  return (
    <div className="cf-neck">
      <div className="cf-neck-goals">
        {goals.map((g, i) => (
          <motion.span key={g} initial={false} animate={{ opacity: i < shown ? 1 : 0.15 }} transition={feel}>
            {g}
          </motion.span>
        ))}
      </div>
      <svg viewBox="0 0 120 120" className="cf-neck-lines" preserveAspectRatio="none" aria-hidden="true">
        {goals.map((_, i) => {
          const y = ((i + 0.5) / n) * 120
          return (
            <motion.path
              key={i}
              d={`M0 ${y} C48 ${y} 60 60 120 60`}
              fill="none"
              stroke={PALETTE.ink}
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{ opacity: i < shown ? 0.8 : 0.1 }}
              transition={feel}
            />
          )
        })}
      </svg>
      <span className="cf-neck-point">{waypoint}</span>
    </div>
  )
}

/* --- 8. can, versus how often --------------------------------------------- */

/**
 * A door, and a tally.
 *
 * The film's central distinction, and until now it was two columns of prose.
 * The door being open is the **capability** — it exists, it was demonstrated,
 * that fact does not change. The marks beside it are the **propensity** — how
 * often anyone walked through in this evaluation.
 *
 * A viewer can hold both at once without being told they are different things,
 * which is exactly the reading §7 needs and the hardest one to get in words.
 */
export function CanVsDoes({ marks, outOf, feel }: { marks: number; outOf: number; feel: Feel }) {
  return (
    <div className="cf-cvd">
      <div className="cf-cvd-door">
        <svg viewBox="0 0 90 120" aria-hidden="true">
          <rect x="4" y="4" width="82" height="112" fill="none" stroke={PALETTE.ink} strokeWidth="2.2" />
          {/* the door itself, standing open */}
          <path d="M8 8 L52 22 V102 L8 112 Z" fill={PALETTE.paperSheet} stroke={PALETTE.ink} strokeWidth="1.8" />
          <circle cx="46" cy="64" r="2.6" fill={PALETTE.ink} />
        </svg>
        <em>the door exists</em>
        <span>capability</span>
      </div>

      <div className="cf-cvd-tally">
        <div className="cf-cvd-marks" aria-hidden="true">
          {Array.from({ length: outOf }, (_, i) => (
            <motion.i
              key={i}
              initial={false}
              animate={{ backgroundColor: i < marks ? PALETTE.red : 'rgba(43,41,38,0.16)' }}
              transition={{ ...feel, delay: i * 0.004 }}
            />
          ))}
        </div>
        <em>how often anyone walked through</em>
        <span>propensity, in this evaluation</span>
      </div>
    </div>
  )
}

/* --- 9. wanting versus needing -------------------------------------------- */

/**
 * A destination, and a fuel stop.
 *
 * Nobody wants fuel. They want to arrive, and fuel is on the way. That is the
 * whole of §8's argument about survival, and it is a picture every driver
 * already understands — which is why it can retire "it wanted to live" in one
 * frame instead of a paragraph.
 */
export function TerminalVsInstrumental({ destination, stop }: { destination: string; stop: string }) {
  return (
    <div className="cf-tvi">
      <svg viewBox="0 0 300 80" width="100%" aria-hidden="true">
        <line x1="8" y1="54" x2="292" y2="54" stroke={PALETTE.ink} strokeWidth="2" />
        <circle cx="8" cy="54" r="4" fill={PALETTE.ink} />

        {/* the stop, on the way */}
        <g transform="translate(140 54)">
          <line x1="0" y1="0" x2="0" y2="-20" stroke={PALETTE.graphite} strokeWidth="1.6" />
          <rect x="-11" y="-34" width="22" height="15" rx="2" fill={PALETTE.paperWhite} stroke={PALETTE.graphite} strokeWidth="1.6" />
        </g>

        {/* the destination */}
        <g transform="translate(284 54)">
          <line x1="0" y1="0" x2="0" y2="-34" stroke={PALETTE.ink} strokeWidth="2" />
          <path d="M0 -34 L-24 -28 L0 -22 Z" fill={PALETTE.ink} />
        </g>
      </svg>
      <div className="cf-tvi-keys">
        <span style={{ left: '46%' }}>
          <em>{stop}</em>
          instrumental — useful on the way
        </span>
        <span style={{ left: '92%' }}>
          <em>{destination}</em>
          terminal — the thing wanted
        </span>
      </div>
    </div>
  )
}
