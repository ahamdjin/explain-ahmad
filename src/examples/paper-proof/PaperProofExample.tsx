import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import narrator from '../../assets/paper/narrator-curious.svg'
import confused from '../../assets/paper/expert-confused.svg'
import sleepy from '../../assets/paper/expert-sleepy.svg'
import './paper-proof.css'

const MARKS = Array.from({ length: 160 }, (_, i) => i)
const ACTIVE = 9

const reactions = [
  { asset: confused, left: 61, top: 20, rotate: -4, note: 'what about us?' },
  { asset: sleepy, left: 75, top: 39, rotate: 3, note: 'do we ever work?' },
  { asset: confused, left: 57, top: 59, rotate: 2, note: 'why are we here?' },
  { asset: sleepy, left: 82, top: 65, rotate: -3, note: 'are we extra?' },
]

export default function PaperProofExample() {
  const [step, setStep] = useState(0)
  const frame = step + 2
  const next = () => setStep((s) => Math.min(2, s + 1))
  const prev = () => setStep((s) => Math.max(0, s - 1))

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter') next()
      if (event.key === 'ArrowLeft') prev()
      if (event.key.toLowerCase() === 'r') setStep(0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const jitter = useMemo(() => MARKS.map((i) => ((i * 17) % 7) - 3), [])

  return (
    <div className="paper-proof-shell">
      <main className="paper-proof-stage" onClick={next} role="application" aria-label="Paper storyboard coding proof">
        <div className="paper-proof-kicker">CODED PROOF · STORYBOARD FRAMES 2 → 4</div>

        <motion.div
          className="paper-word-card"
          initial={{ opacity: 0, x: '-10cqw', rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 90, damping: 15 }}
        >
          “scared”
        </motion.div>

        <svg className="paper-word-arrow" viewBox="0 0 190 70" aria-hidden="true">
          <motion.path d="M4 37 C65 13 111 19 169 39" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .55 }} />
          <path d="M158 27 L174 40 L154 47" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <motion.section className="paper-parameter-world" layout>
          <motion.div className="paper-total-label" animate={{ opacity: step >= 1 ? 1 : .56, y: step >= 1 ? 0 : 4 }}>
            320B TOTAL PARAMETERS
          </motion.div>

          <div className="paper-param-grid" aria-label="Model parameters">
            {MARKS.map((mark) => {
              const active = mark >= 48 && mark < 48 + ACTIVE
              return (
                <motion.i
                  key={mark}
                  className={active ? 'is-active' : ''}
                  initial={{ opacity: 0, scale: .76 }}
                  animate={{
                    opacity: active ? 1 : step >= 1 ? .66 : .78,
                    scale: active && step >= 1 ? 1.05 : 1,
                    rotate: jitter[mark] * .25,
                  }}
                  transition={{ delay: Math.min(mark * .002, .3), duration: .2 }}
                />
              )
            })}
          </div>

          <motion.div className="paper-active-bracket" animate={{ opacity: 1, scaleX: step >= 1 ? 1 : .92 }}>
            <span>~18B ACTIVE</span>
            {step >= 1 ? <small>about 5.6%</small> : null}
          </motion.div>

          {step >= 2 ? reactions.map((reaction, index) => (
            <motion.div
              key={reaction.note}
              className="paper-reaction"
              style={{ left: `${reaction.left}%`, top: `${reaction.top}%` }}
              initial={{ opacity: 0, y: 18, rotate: reaction.rotate - 7, scale: .7 }}
              animate={{ opacity: 1, y: 0, rotate: reaction.rotate, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: index * .09 }}
            >
              <img src={reaction.asset} alt="" />
              <span>{reaction.note}</span>
            </motion.div>
          )) : null}
        </motion.section>

        <motion.div className="paper-narrator" animate={{ x: step >= 1 ? '1.5cqw' : 0, rotate: step >= 1 ? 1.5 : 0 }}>
          <img src={narrator} alt="Curious narrator" />
          <motion.p key={step} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            {step === 0 ? 'a word goes in…' : step === 1 ? 'just a small part?' : 'okay… why the other 300B?'}
          </motion.p>
        </motion.div>

        <div className="paper-proof-frame">FRAME {frame}</div>
        <div className="paper-proof-help">click / → to advance · ← back · R restart</div>
      </main>
    </div>
  )
}
