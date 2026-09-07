import { motion } from 'motion/react'
import { HeroVector } from '../shared'
import { AttentionRoom } from './AttentionRoom'
import { MoeRoom } from './MoeRoom'

export function TransformerWorld({ beat }: { beat: number }) {
  const intro = beat <= 46
  const attention = beat >= 47 && beat <= 62
  const moe = beat >= 63

  return (
    <motion.section className="v9-world v9-transformer-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {intro ? (
        <motion.div className="v9-transformer-floor" layoutId="v9-transformer-floor" initial={{ opacity: 0, scale: 0.88, y: '8cqh' }} animate={{ opacity: 1, scale: beat === 46 ? 1.08 : 1, x: beat === 46 ? '-10cqw' : 0, y: 0 }} transition={{ type: 'spring', stiffness: 90, damping: 22 }}>
          <header><small>ONE TRANSFORMER FLOOR · TWO PROBLEMS</small><strong>Carry the same “it” representation through both.</strong></header>
          <div className="v9-transformer-room-map">
            <motion.div className="v9-map-room" data-active="true" animate={{ scale: beat === 46 ? 1.06 : 1 }}><small>PROBLEM 1</small><strong>Attention</strong><span>which earlier context matters?</span></motion.div>
            <div className="v9-map-track"><HeroVector note="embedding arrives" compact /><i /></div>
            <div className="v9-map-room"><small>PROBLEM 2</small><strong>Feed-forward / MoE</strong><span>how do we transform with selective compute?</span></div>
          </div>
          <p className="v9-floor-note"><b>The embedding has numbers, but not enough context.</b> Therefore Attention comes first. After context is gathered, the same layer still needs its feed-forward transformation.</p>
        </motion.div>
      ) : null}

      {attention ? <AttentionRoom beat={beat} /> : null}
      {moe ? <MoeRoom beat={beat} /> : null}

      {!intro ? (
        <div className="v9-floor-location" aria-label="Current room on one Transformer floor">
          <span data-active={attention ? 'true' : undefined}>ATTENTION</span><i /><span data-active={moe ? 'true' : undefined}>FEED-FORWARD / MOE</span>
        </div>
      ) : null}
    </motion.section>
  )
}
