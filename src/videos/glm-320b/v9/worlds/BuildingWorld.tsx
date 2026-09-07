import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL } from '../data'
import { ChapterHeading, NarrativeCue, PaperNote, VectorStrip } from '../shared'

function activeFloorForBeat(beat: number) {
  if (beat === 88) return 1
  if (beat === 89) return 2
  if (beat === 90) return 3
  if (beat === 91) return 4
  return null
}

export function BuildingWorld({ beat }: { beat: number }) {
  const seedFloor = beat === 85
  const building = beat >= 86
  const bracket = beat >= 87
  const activeFloor = activeFloorForBeat(beat)
  const timelapse = beat === 92
  const why = beat === 93

  return (
    <motion.section className="v9-world v9-building-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ChapterHeading eyebrow="07 · LAYERS · WHY REPEAT?" note="We just proved what one Transformer floor can do. But one floor is not the whole model.">
        If one floor already changes <mark>“it”</mark>, why repeat this <mark>{MODEL.layers} times</mark>?
      </ChapterHeading>

      {seedFloor ? (
        <motion.div className="v9-seed-floor" layoutId="v9-moe-floor" initial={{ scale: 1 }} animate={{ scale: 0.74, y: '4cqh' }} transition={{ type: 'spring', stiffness: 85, damping: 22 }}>
          <small>ONE SPARSE TRANSFORMER FLOOR</small>
          <div><span><b>Attention</b><em>gather context</em></span><i>→</i><span><b>MoE</b><em>select + transform</em></span></div>
          <p>Useful — <b>but only one step of the full computation.</b></p>
        </motion.div>
      ) : null}

      {building ? (
        <motion.div className="v9-building-stage" layoutId="v9-transformer-building" initial={{ opacity: 0, scale: 0.72, y: '14cqh' }} animate={{ opacity: 1, scale: why ? 0.9 : 1, y: why ? '-2cqh' : 0 }} transition={{ type: 'spring', stiffness: 80, damping: 22 }}>
          <div className="v9-building">
            {Array.from({ length: MODEL.layers }, (_, zero) => {
              const floor = MODEL.layers - zero
              const dense = floor <= MODEL.denseLayers
              const active = activeFloor === floor
              const sweep = timelapse && floor >= 4
              const routeSeed = (floor * 13) % 8
              return (
                <motion.div
                  className="v9-building-floor"
                  key={floor}
                  data-dense={dense ? 'true' : undefined}
                  data-active={active ? 'true' : undefined}
                  data-sweep={sweep ? 'true' : undefined}
                  animate={{ opacity: activeFloor && !active ? 0.2 : why ? 0.35 : 1 }}
                >
                  <small>{floor}</small>
                  <span className="v9-floor-attn">ATTN</span>
                  <i />
                  <span className="v9-floor-ffn">{dense ? 'DENSE MLP' : 'MOE'}</span>
                  {!dense ? <div className="v9-floor-expert-lights">{Array.from({ length: 8 }, (_, i) => <b key={i} style={{ '--delay': `${((i + routeSeed) % 8) * 0.045}s` } as CSSProperties} />)}</div> : null}
                </motion.div>
              )
            })}
          </div>

          {bracket ? (
            <motion.aside className="v9-building-bracket" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="is-moe"><i /><span><b>Layers 4–45</b><strong>Attention + sparse MoE</strong><em>representation changes → router can choose again</em></span></div>
              <div className="is-dense"><i /><span><b>Layers 1–3</b><strong>Attention + dense MLP</strong><em>same dense feed-forward block for every token</em></span></div>
            </motion.aside>
          ) : null}

          {activeFloor ? (
            <motion.div
              layoutId="v9-hero-vector"
              className="v9-building-vector"
              initial={{ opacity: 0, x: '-3cqw' }}
              animate={{ opacity: 1, x: 0, bottom: `${8 + (activeFloor - 1) * 1.52}cqh` }}
              transition={{ type: 'spring', stiffness: 105, damping: 21 }}
            >
              <strong>it</strong><VectorStrip compact changed /><span>representation entering layer {activeFloor}</span>
            </motion.div>
          ) : null}

          {timelapse ? (
            <motion.div layoutId="v9-hero-vector" className="v9-building-vector is-timelapse" initial={{ bottom: '12cqh', opacity: 1 }} animate={{ bottom: ['12cqh', '28cqh', '48cqh', '70cqh'], opacity: 1 }} transition={{ duration: 2.8, ease: 'easeInOut' }}>
              <strong>it</strong><VectorStrip compact changed /><span>same token position · representation keeps changing</span>
            </motion.div>
          ) : null}
        </motion.div>
      ) : null}

      {beat === 86 ? <div className="v9-building-caption"><b>BUT one floor was only one layer.</b><span>Pull back: the same kind of computation lives inside a 45-layer stack.</span></div> : null}
      {beat === 87 ? <div className="v9-building-caption"><b>First 3 dense. Next 42 sparse MoE.</b><span>Now the one-floor mechanism has a place inside the real architecture.</span></div> : null}
      {activeFloor ? <div className="v9-building-caption"><b>Layer {activeFloor}</b><span>{activeFloor <= 3 ? 'Attention runs, therefore the dense MLP receives an already contextual representation.' : 'Attention runs, therefore the router sees a changed representation and selects a fresh sparse path.'}</span></div> : null}
      {timelapse ? <div className="v9-building-caption"><b>5 → 6 → 7 → … → 45</b><span>Each floor inherits a representation changed by the floor before it.</span></div> : null}

      {why ? (
        <motion.div className="v9-why-layers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <small>ANSWER · WHY SO MANY LAYERS?</small>
          <h3>Each floor receives a representation already changed by the floor before it.</h3>
          <div><span><VectorStrip compact /><b>earlier</b></span><i>→</i><span><VectorStrip compact changed /><b>more refined</b></span><i>→</i><span><VectorStrip compact changed /><b>refined again</b></span></div>
          <PaperNote tone="yellow">The safe mental model is <b>progressive refinement</b>. We do not invent exact jobs like “floor 4 understands the ball” and “floor 5 understands the dog”.</PaperNote>
        </motion.div>
      ) : null}

      {why ? (
        <NarrativeCue kind="but" className="v11-building-bridge">
          After layer 45 we finally have a highly processed representation — <b>but it is still a vector, not the next word.</b> Therefore the model needs one last conversion.
        </NarrativeCue>
      ) : null}
    </motion.section>
  )
}
