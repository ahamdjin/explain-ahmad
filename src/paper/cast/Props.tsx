import { motion } from 'motion/react'
import { INK } from '../ink'
import { expertColor } from '../palette'
import { PALETTE } from '../palette'
import { MachineBox } from '../props/Machines'

/**
 * The word entering the model.
 *
 * `id` is §2 beats 10-11: the letters fade off the card and the row number
 * stays. **The same card**, because the ID replacing the word is the point --
 * a second card arriving would say the number is a new thing, when the whole
 * beat is that the number is all that carries on.
 */
export function WordCard({
  label,
  /** The token ID this piece is swapped for, once it has been looked up. */
  id,
  /** The letters have gone; only the digits remain. */
  becomes = false,
  tone = 'word',
}: {
  label: string
  id?: string
  becomes?: boolean
  tone?: 'word' | 'measure'
}) {
  const stroke = tone === 'measure' ? PALETTE.blueInk : PALETTE.tealInk
  return (
    <div className="s1-word">
      {/* Teal is the word's colour and nothing else's, so a viewer can track
          it from section 1 to section 7 without being told to. */}
      <svg viewBox="0 0 240 96" filter="url(#s1-ink-soft)" aria-hidden="true">
        <rect
          x="4"
          y="6"
          width="232"
          height="82"
          rx="5"
          fill={PALETTE.paperLight}
          stroke={becomes ? PALETTE.blueInk : stroke}
          strokeWidth="3.2"
        />
      </svg>
      {/* Both are mounted and cross-faded in place, so the swap happens on one
          object rather than between two. */}
      <motion.span
        className="s1-word-text"
        initial={false}
        animate={{ opacity: becomes ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        &ldquo;{label}&rdquo;
      </motion.span>
      {id ? (
        <motion.span
          className="s1-word-id"
          initial={false}
          animate={{ opacity: becomes ? 1 : 0 }}
          transition={{ duration: 0.4, delay: becomes ? 0.2 : 0 }}
        >
          {id}
        </motion.span>
      ) : null}
    </div>
  )
}

/**
 * The front desk. The router, before it is called a router.
 *
 * On screen unlabelled from beat 13 so that naming it at beat 23 is a reveal
 * about something the viewer has already been watching, not a new arrival.
 */
export function FrontDesk({ named, ringed }: { named: boolean; ringed: boolean }) {
  return (
    <div className="s1-desk" data-named={named ? 'true' : undefined}>
      <svg viewBox="0 0 260 210" aria-hidden="true">
        {ringed ? (
          <motion.ellipse
            cx="130"
            cy="112"
            rx="118"
            ry="96"
            fill="none"
            stroke={INK}
            strokeWidth="3"
            strokeDasharray="10 8"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            style={{ transformOrigin: '130px 112px' }}
          />
        ) : null}

        <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          {/* the figure behind the desk */}
          <circle cx="130" cy="52" r="26" fill={PALETTE.paperWhite} />
          {/* A coloured tunic, so this figure never reads as a second narrator.
              Two identical stick people twenty percent apart is a continuity
              bug, not a cast. */}
          <path d="M116 84h28l6 30h-40z" fill={PALETTE.tealSoft} />
          <g fill={INK} stroke="none">
            <circle cx="122" cy="50" r="3.2" />
            <circle cx="139" cy="50" r="3.2" />
          </g>
          <path d="M130 78v34" />
          <path d="M130 92 100 104" />
          <path d="M130 92l30 12" />

          {/* the desk */}
          <path d="M58 128h144v56H58z" fill={PALETTE.paperShade} />
          <path d="M58 128h144" />
          <path d="M72 184v18" />
          <path d="M188 184v18" />
        </g>
      </svg>
      {named ? <span className="s1-desk-tag">ROUTER</span> : null}
    </div>
  )
}

/**
 * A generic small machine. Never a named device and never a personal one --
 * the comparison on screen is "hundreds of gigabytes" against "a much smaller
 * machine", and naming hardware would both date the video and shrink the point.
 */
export function SmallMachine({ filled }: { filled: boolean }) {
  return (
    <div className="s1-machine">
      <svg viewBox="0 0 300 220" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 20h244a10 10 0 0 1 10 10v128a10 10 0 0 1-10 10H28a10 10 0 0 1-10-10V30a10 10 0 0 1 10-10Z" fill={PALETTE.paperLight} />
          <path d="M44 38h212v104H44z" fill={filled ? PALETTE.glowTint : PALETTE.paper} />
          <path d="M96 168h108l14 30H82z" fill={PALETTE.paperShade} />
          <path d="M64 198h172" />
        </g>
        {filled ? (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${74 + i * 42} 66)`}>
                <rect width="26" height="26" rx="8" fill={expertColor(i * 2)} stroke={INK} strokeWidth="2" />
                <circle cx="9" cy="13" r="1.9" fill={INK} />
                <circle cx="18" cy="13" r="1.9" fill={INK} />
              </g>
            ))}
            {[0, 1, 2, 3].map((i) => (
              <g key={`b${i}`} transform={`translate(${74 + i * 42} 104)`}>
                <rect width="26" height="26" rx="8" fill={PALETTE.green} stroke={INK} strokeWidth="2" />
                <circle cx="9" cy="13" r="1.9" fill={INK} />
                <circle cx="18" cy="13" r="1.9" fill={INK} />
              </g>
            ))}
          </g>
        ) : null}
      </svg>
    </div>
  )
}

/**
 * Beat 30. Deliberately unreadable: the point of the beat is that staring at
 * the finished architecture teaches you nothing, so legibility would undercut it.
 */
export function ArchSheet({ pushed }: { pushed: boolean }) {
  const rows = Array.from({ length: 22 }, (_, i) => i)
  const blocks = Array.from({ length: 46 }, (_, i) => i)

  return (
    <motion.div
      className="s1-arch"
      animate={{ rotate: pushed ? -7 : -1.5 }}
      transition={{ type: 'spring', stiffness: 90, damping: 18 }}
    >
      <svg viewBox="0 0 560 700" aria-hidden="true">
        <rect x="18" y="18" width="524" height="664" rx="4" fill={PALETTE.paperLight} stroke={INK} strokeWidth="3" />
        <text x="280" y="62" textAnchor="middle" className="s1-arch-title" fill={INK}>
          Full model architecture
        </text>
        <path d="M60 78h440" stroke={INK} strokeWidth="2" />
        {blocks.map((i) => {
          const col = i % 5
          const row = Math.floor(i / 5)
          return (
            <rect
              key={i}
              x={62 + col * 74}
              y={96 + row * 56}
              width={58}
              height={34}
              rx="4"
              fill={[PALETTE.paperShade, '#E8EEF5', '#EDF3EA'][i % 3]}
              stroke={INK}
              strokeWidth="1.6"
            />
          )
        })}
        {rows.map((i) => (
          <path
            key={i}
            d={`M${62 + (i % 3) * 8} ${628 + (i % 4) * 11}h${120 + (i % 5) * 60}`}
            stroke={INK}
            strokeWidth="1.4"
            opacity="0.4"
          />
        ))}
      </svg>
    </motion.div>
  )
}


/**
 * The machines a model has to fit on, drawn as a row of cards.
 *
 * **One card is one ~80 GB accelerator.** That is the only meaning this row
 * ever carries, and it is why the counts in the video are 1 and 4:
 * `gpt-oss-120b` is ~58 GiB at MXFP4 and fits a single chip, while
 * GLM-5.3-Flash is ~306 GiB at FP8 and does not fit four.
 * `research/glm/GROUND_TRUTH.md`.
 *
 * It began local to §1, with a note saying it should move here *if* another
 * section ever wanted the same row -- and not before. §13 beat 14 wants it,
 * because S-10 closes the video by redrawing §1's opening frame and a close
 * built from different objects reads as a different picture rather than a
 * return. So this is that move, and the two sections now draw the same object
 * from the same place. `skills/ASSET_LIBRARY.md`.
 */
export function Rig({ count }: { count: number }) {
  return (
    <div className="s1-rig">
      {Array.from({ length: count }, (_, i) => (
        <MachineBox key={i} size={92} shape="mini" />
      ))}
    </div>
  )
}
