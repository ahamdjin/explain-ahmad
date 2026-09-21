import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Vignettes — everyday examples, told in pictures, with nothing to read.
 *
 * ## Why these exist, and why they carry no sentences
 *
 * Ahmad's note: *all the text should be spoken, and visuals on the screen.*
 * That is not a preference, it is the best-supported finding in multimedia
 * learning. Mayer's **redundancy principle**: a graphic with narration beats
 * the same graphic with narration *and* the same words on screen. A viewer
 * processes one visual channel at a time — while they are reading a caption
 * they are not looking at the picture, and the caption is telling them what
 * the voice is already saying.
 *
 * The nuance worth keeping: a few **keywords** anchored to the drawing are
 * fine and can help. Sentences are not. So nothing below holds a sentence, and
 * most hold no words at all.
 *
 * ## What they are
 *
 * The rest of the library draws *this incident*. These draw the **everyday
 * thing it is like** — a satnav, a shop camera, a photocopier, a film set.
 * They exist because an abstraction lands when it arrives attached to
 * something the viewer already owns, and because a cut to a completely
 * different world is the cheapest pace change in an explainer.
 *
 * Each is honest about its limits: an analogy that has to be corrected later
 * costs more than it bought, so none of these implies intent, feeling or
 * agency on the model's part.
 */

const ink = PALETTE.ink
const soft = PALETTE.graphite
const red = PALETTE.red
const paper = PALETTE.paperWhite

/* --- goals, and the steps nobody typed ------------------------------------ */

/**
 * A satnav.
 *
 * You type a destination; it picks the roads. Nobody thinks the car wanted to
 * turn left. That is the whole of §9 in an object every viewer has used, and
 * it lands before the word "agent" has been said.
 *
 * `at` draws the route. `reroute` bends it around an obstruction — the same
 * machine, a different road, which is precisely the argument.
 */
export function Satnav({ at, reroute, feel }: { at: number; reroute: boolean; feel: Feel }) {
  const t = Math.max(0, Math.min(1, at))

  return (
    <div className="cf-vig cf-vig-satnav">
      <svg viewBox="0 0 200 130" aria-hidden="true">
        {/* the map: a few blocks, enough to read as streets */}
        <g stroke={soft} strokeWidth="1" opacity="0.4">
          {[20, 55, 90, 125].map((y) => (
            <line key={y} x1="8" y1={y} x2="192" y2={y} />
          ))}
          {[40, 80, 120, 160].map((x) => (
            <line key={x} x1={x} y1="8" y2="122" x2={x} />
          ))}
        </g>

        <motion.path
          d={reroute ? 'M22 108 H80 V64 H120 V26 H176' : 'M22 108 H120 V26 H176'}
          fill="none"
          stroke={ink}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: t }}
          transition={feel}
        />

        {/* the obstruction that forces the other road */}
        {reroute ? (
          <g stroke={red} strokeWidth="3" strokeLinecap="round">
            <line x1="112" y1="98" x2="128" y2="114" />
            <line x1="128" y1="98" x2="112" y2="114" />
          </g>
        ) : null}

        <circle cx="22" cy="108" r="5" fill={ink} />
        {/* the pin: the only thing anybody typed */}
        <g transform="translate(176 26)">
          <path d="M0 0 C-12 -12 -8 -26 0 -26 C8 -26 12 -12 0 0 Z" fill={red} />
          <circle cx="0" cy="-17" r="3.4" fill={paper} />
        </g>
      </svg>
    </div>
  )
}

/**
 * Different destinations, one thing they all need.
 *
 * Car keys. Nobody wants keys; everybody going anywhere needs them. Wordless
 * instrumental convergence, and it retires "it wanted to survive" faster than
 * the abstract version because the viewer has never once wanted a key.
 */
export function Keys({ shown, feel }: { shown: number; feel: Feel }) {
  const pins = [
    { x: 40, y: 22 },
    { x: 170, y: 30 },
    { x: 150, y: 104 },
  ]

  return (
    <div className="cf-vig cf-vig-keys">
      <svg viewBox="0 0 200 130" aria-hidden="true">
        {pins.map((p, i) => (
          <motion.g key={i} initial={false} animate={{ opacity: i < shown ? 1 : 0.14 }} transition={feel}>
            <path
              d={`M${p.x} ${p.y} C${p.x - 9} ${p.y - 9} ${p.x - 6} ${p.y - 20} ${p.x} ${p.y - 20} C${p.x + 6} ${p.y - 20} ${p.x + 9} ${p.y - 9} ${p.x} ${p.y} Z`}
              fill={soft}
            />
            <path
              d={`M100 74 C${(100 + p.x) / 2} ${(74 + p.y) / 2} ${p.x} ${p.y + 26} ${p.x} ${p.y + 4}`}
              fill="none"
              stroke={soft}
              strokeWidth="1.6"
              strokeDasharray="4 4"
            />
          </motion.g>
        ))}

        {/* the key every route passes through */}
        <g transform="translate(100 74)">
          <circle cx="-12" cy="0" r="9" fill="none" stroke={ink} strokeWidth="3.4" />
          <path d="M-3 0 H22 M14 0 V8 M22 0 V10" fill="none" stroke={ink} strokeWidth="3.4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}

/* --- being watched, and not ----------------------------------------------- */

/**
 * A shop camera.
 *
 * Everyone understands a camera with a light on it, and everyone understands
 * the light going out. `oversight_enabled: false` needs no translation once
 * this has been on screen for a second.
 */
export function ShopCamera({ on, feel }: { on: boolean; feel: Feel }) {
  return (
    <div className="cf-vig cf-vig-cam">
      <svg viewBox="0 0 160 120" aria-hidden="true">
        <path d="M18 18 H100 L118 34 V58 L100 74 H18 Z" fill={paper} stroke={ink} strokeWidth="3.4" strokeLinejoin="round" />
        <path d="M118 42 L146 28 V64 L118 50" fill={paper} stroke={ink} strokeWidth="3.4" strokeLinejoin="round" />
        <path d="M48 74 L40 112" stroke={ink} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M24 112 H60" stroke={ink} strokeWidth="3.4" strokeLinecap="round" />

        {/* the light, and the cone of attention it implies */}
        <motion.circle cx="34" cy="46" r="6" initial={false} animate={{ fill: on ? red : 'transparent' }} transition={feel} stroke={ink} strokeWidth="2.4" />
        <motion.path
          d="M146 34 L196 -4 M146 58 L196 96"
          stroke={red}
          strokeWidth="2"
          strokeDasharray="5 5"
          initial={false}
          animate={{ opacity: on ? 0.55 : 0 }}
          transition={feel}
        />
      </svg>
    </div>
  )
}

/**
 * A closed door with a light under it.
 *
 * You hear something happen and you see what comes out. You do not see the
 * room. That is o1's hidden reasoning, and it is a picture rather than a
 * caveat — which matters because the caveat has to survive eight minutes.
 */
export function ClosedDoor({ feel }: { feel: Feel }) {
  return (
    <div className="cf-vig cf-vig-door">
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <rect x="14" y="8" width="92" height="128" fill={paper} stroke={ink} strokeWidth="3.4" />
        <rect x="26" y="20" width="68" height="48" fill="none" stroke={soft} strokeWidth="2" />
        <rect x="26" y="78" width="68" height="46" fill="none" stroke={soft} strokeWidth="2" />
        <circle cx="94" cy="76" r="4" fill={ink} />
        {/* light escaping under it: the only evidence of the room */}
        <motion.rect
          x="14"
          y="136"
          width="92"
          height="6"
          fill={red}
          initial={false}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

/* --- copying, and replacing ----------------------------------------------- */

/**
 * A photocopier.
 *
 * A copy comes out and lands on top of the original in the tray. That is the
 * overwrite, in an object with no technical content at all — and unlike the
 * server diagram it carries the fact that **the original is still fine**,
 * which is the detail people miss about `scp`.
 */
export function Copier({ at, feel }: { at: number; feel: Feel }) {
  const t = Math.max(0, Math.min(1, at))

  return (
    <div className="cf-vig cf-vig-copier">
      <svg viewBox="0 0 190 130" aria-hidden="true">
        <rect x="26" y="34" width="120" height="62" rx="5" fill={paper} stroke={ink} strokeWidth="3.4" />
        <rect x="44" y="20" width="84" height="14" rx="3" fill={paper} stroke={ink} strokeWidth="3" />
        <rect x="42" y="96" width="88" height="10" rx="2" fill={paper} stroke={ink} strokeWidth="3" />

        {/* the sheet already in the tray */}
        <rect x="52" y="104" width="62" height="18" rx="2" fill={paper} stroke={soft} strokeWidth="2.4" />

        {/* the copy, landing on top of it */}
        <motion.rect
          width="62"
          height="18"
          rx="2"
          fill={paper}
          stroke={red}
          strokeWidth="2.8"
          initial={false}
          animate={{ x: 52, y: 62 + t * 42, opacity: t > 0.02 ? 1 : 0 }}
          transition={feel}
        />
      </svg>
    </div>
  )
}

/**
 * A film set.
 *
 * A street, then the pull-back: it is a facade with scaffolding behind it. The
 * sandbox reveal, in the one image that says *this was built for the camera*
 * without accusing anyone of faking anything.
 */
export function FilmSet({ revealed, feel }: { revealed: boolean; feel: Feel }) {
  return (
    <div className="cf-vig cf-vig-set">
      <svg viewBox="0 0 200 130" aria-hidden="true">
        {/* the facade */}
        <rect x="40" y="26" width="86" height="88" fill={paper} stroke={ink} strokeWidth="3.4" />
        <rect x="54" y="42" width="24" height="22" fill="none" stroke={soft} strokeWidth="2" />
        <rect x="90" y="42" width="24" height="22" fill="none" stroke={soft} strokeWidth="2" />
        <rect x="72" y="82" width="24" height="32" fill="none" stroke={soft} strokeWidth="2" />

        {/* what is actually holding it up */}
        <motion.g
          stroke={red}
          strokeWidth="2.4"
          fill="none"
          initial={false}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={feel}
        >
          <path d="M126 26 L166 40 V114 H126" />
          <path d="M126 50 L166 60 M126 78 L166 86" />
          <path d="M132 114 L166 40 M166 114 L132 46" />
        </motion.g>
      </svg>
    </div>
  )
}

/* --- rare, and serious ---------------------------------------------------- */

/**
 * A smoke alarm.
 *
 * Almost never goes off. Nobody argues it should be removed. That is the
 * honest shape of a 2% finding, and it is the frame that stops §7's
 * calibration from reading as a retraction.
 */
export function SmokeAlarm({ sounding, feel }: { sounding: boolean; feel: Feel }) {
  return (
    <div className="cf-vig cf-vig-alarm">
      <svg viewBox="0 0 140 110" aria-hidden="true">
        <circle cx="70" cy="56" r="34" fill={paper} stroke={ink} strokeWidth="3.4" />
        <circle cx="70" cy="56" r="8" fill="none" stroke={ink} strokeWidth="3" />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle
            key={a}
            cx={70 + Math.cos((a * Math.PI) / 180) * 20}
            cy={56 + Math.sin((a * Math.PI) / 180) * 20}
            r="2.6"
            fill={soft}
          />
        ))}
        <motion.g
          stroke={red}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: sounding ? 1 : 0 }}
          transition={feel}
        >
          <path d="M16 36 C6 48 6 64 16 76" />
          <path d="M124 36 C134 48 134 64 124 76" />
        </motion.g>
      </svg>
    </div>
  )
}

/**
 * A speedometer.
 *
 * The dial goes to 200. Almost nobody ever gets there. *Can* and *how often*
 * are different facts about the same car, and this is the film's central
 * distinction in a picture nobody has to be walked through.
 */
export function Dial({ value, max = 1, feel }: { value: number; max?: number; feel: Feel }) {
  const t = Math.max(0, Math.min(1, value / max))
  const a = -210 + t * 240

  return (
    <div className="cf-vig cf-vig-dial">
      <svg viewBox="0 0 140 110" aria-hidden="true">
        <path d="M18 96 A58 58 0 1 1 122 96" fill="none" stroke={soft} strokeWidth="5" strokeLinecap="round" />
        {/* the top of the range: possible, and almost never reached */}
        <path d="M104 34 A58 58 0 0 1 122 96" fill="none" stroke={red} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        <motion.line
          x1="70"
          y1="90"
          x2="70"
          y2="40"
          stroke={ink}
          strokeWidth="4"
          strokeLinecap="round"
          initial={false}
          animate={{ rotate: a }}
          transition={{ ...feel, type: 'spring', stiffness: 120, damping: 14 }}
          style={{ transformOrigin: '70px 90px' }}
        />
        <circle cx="70" cy="90" r="6" fill={ink} />
      </svg>
    </div>
  )
}

/* --- finding a way -------------------------------------------------------- */

/**
 * A maze with the tried routes left in.
 *
 * Nobody drew the solution; it was found, and the failed attempts are still on
 * the paper. That is what "it invented the road" means, and the pencil marks
 * are what make it inference rather than a plan.
 */
export function Maze({ at, feel }: { at: number; feel: Feel }) {
  const t = Math.max(0, Math.min(1, at))

  return (
    <div className="cf-vig cf-vig-maze">
      <svg viewBox="0 0 150 120" aria-hidden="true">
        <rect x="6" y="6" width="138" height="108" fill="none" stroke={ink} strokeWidth="3" />
        <g stroke={ink} strokeWidth="3" strokeLinecap="square" fill="none">
          <path d="M34 6 V78" />
          <path d="M62 34 V114" />
          <path d="M90 6 V54 M90 82 V114" />
          <path d="M118 30 V90" />
          <path d="M34 54 H62 M90 54 H118" />
        </g>

        {/* abandoned attempts, in pencil */}
        <motion.g stroke={soft} strokeWidth="2" fill="none" strokeDasharray="3 4" initial={false} animate={{ opacity: t > 0.25 ? 0.75 : 0 }} transition={feel}>
          <path d="M20 100 V70 H48" />
          <path d="M76 100 V66" />
        </motion.g>

        {/* the one that got through */}
        <motion.path
          d="M20 114 V90 H48 V20 H76 V64 H104 V100 H132 V20"
          fill="none"
          stroke={red}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: t }}
          transition={feel}
        />
      </svg>
    </div>
  )
}

/**
 * A desk, and everything on it.
 *
 * What is on the desk is what you are working from. What is not on it does not
 * exist to you — and somebody put every one of those sheets there. The context
 * window, with no jargon anywhere near it.
 */
export function Desk({ sheets, planted, feel }: { sheets: number; planted: number; feel: Feel }) {
  /*
   * Looked down at, not across.
   *
   * A first version drew the desk edge-on and the sheets floated above it — a
   * table you see from the side has no surface to put anything on. From above,
   * the sheets are unmistakably *on* it, which is the whole claim: this is
   * what you are working from, and somebody laid each one out.
   */
  const at = [
    { x: 26, y: 26, r: -6 },
    { x: 72, y: 20, r: 5 },
    { x: 116, y: 30, r: -3 },
    { x: 158, y: 22, r: 8 },
  ]

  return (
    <div className="cf-vig cf-vig-desk">
      <svg viewBox="0 0 200 130" aria-hidden="true">
        {/* the surface */}
        <path d="M6 14 H194 L186 122 H14 Z" fill={PALETTE.paperSheet} stroke={ink} strokeWidth="3" strokeLinejoin="round" />

        {at.slice(0, sheets).map((s, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...feel, delay: i * 0.07 }}
            transform={`translate(${s.x} ${s.y}) rotate(${s.r})`}
          >
            <rect width="32" height="42" fill={paper} stroke={i < planted ? red : ink} strokeWidth={i < planted ? 3 : 2.2} />
            <g stroke={soft} strokeWidth="1.6" opacity="0.6">
              <path d="M6 12 H26" />
              <path d="M6 20 H26" />
              <path d="M6 28 H20" />
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

/**
 * A recipe with the steps torn off.
 *
 * Here is the dish; work out how. That is what giving an agent a goal is, and
 * the torn edge is doing the work — it says the steps were *not supplied*
 * rather than that they were forbidden.
 */
export function Recipe({ stepsShown, feel }: { stepsShown: number; feel: Feel }) {
  return (
    <div className="cf-vig cf-vig-recipe">
      <svg viewBox="0 0 140 150" aria-hidden="true">
        <path
          d="M16 8 H124 V104 L112 112 L100 104 L88 112 L76 104 L64 112 L52 104 L40 112 L28 104 L16 112 Z"
          fill={paper}
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* the outcome, which is all anybody wrote down */}
        <circle cx="70" cy="36" r="17" fill="none" stroke={ink} strokeWidth="3" />
        <path d="M46 36 H94" stroke={ink} strokeWidth="3" strokeLinecap="round" />

        {/* the steps, arriving from nowhere */}
        {[64, 78, 92].map((y, i) => (
          <motion.path
            key={y}
            d={`M30 ${y} H110`}
            stroke={soft}
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: i < stepsShown ? 1 : 0, opacity: i < stepsShown ? 1 : 0 }}
            transition={{ ...feel, delay: i * 0.08 }}
          />
        ))}
      </svg>
    </div>
  )
}
