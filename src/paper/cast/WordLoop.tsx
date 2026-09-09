import { motion } from 'motion/react'
import { INK } from '../ink'

/**
 * The machine doing its job: a word goes in, the next word comes out.
 *
 * This is the opening image, and it exists so the section starts on the thing
 * *working* rather than on a specification table. The body stays deliberately
 * closed and featureless -- it is the same object that later opens into the
 * expert world, so it must not give anything away here.
 */
export function WordLoop({ showOut, inWord, outWord }: { showOut: boolean; inWord: string; outWord: string }) {
  return (
    <div className="s1-loop">
      <svg viewBox="0 0 980 210" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 56h206a4 4 0 0 1 4 4v90a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V60a4 4 0 0 1 4-4Z" fill="#FBF8F1" />
          <path d="M330 20h300a12 12 0 0 1 12 12v146a12 12 0 0 1-12 12H330a12 12 0 0 1-12-12V32a12 12 0 0 1 12-12Z" fill="#F7F2E7" />
        </g>

        <text x="109" y="117" textAnchor="middle" className="s1-loop-word" fill={INK}>
          &ldquo;{inWord}&rdquo;
        </text>

        <motion.g
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <path d="M232 105h68" />
          <path d="M290 96l12 9-12 9" />
        </motion.g>

        <motion.g animate={{ opacity: showOut ? 1 : 0 }} transition={{ duration: 0.32 }}>
          <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M660 105h68" />
            <path d="M718 96l12 9-12 9" />
            <path d="M762 56h206a4 4 0 0 1 4 4v90a4 4 0 0 1-4 4H762a4 4 0 0 1-4-4V60a4 4 0 0 1 4-4Z" fill="#FBF8F1" />
          </g>
          <text x="865" y="117" textAnchor="middle" className="s1-loop-word" fill={INK}>
            &ldquo;{outWord}&rdquo;
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

/**
 * A horizon.
 *
 * Without one, an object centred on an empty field reads as a slide rather
 * than as a thing standing somewhere, and the narrator appears to float beside
 * it. One faint line is enough to turn the frame into a place.
 */
export function Ground() {
  return <div className="s1-ground" aria-hidden="true" />
}
