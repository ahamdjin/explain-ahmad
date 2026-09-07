import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL } from '../data'
import { HeroVector, VectorStrip } from '../shared'

function floorForBeat(beat: number) {
  if (beat === 88) return 1
  if (beat === 89) return 2
  if (beat === 90) return 3
  if (beat === 91) return 4
  return null
}

export function BuildingWorldV12({ beat }: { beat: number }) {
  const seed = beat === 85
  const tower = beat >= 86
  const bracket = beat >= 87
  const floor = floorForBeat(beat)
  const timelapse = beat === 92
  const why = beat >= 93

  return (
    <motion.section className="v12j-world v12j-building-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="v12j-world-label"><small>07 · LAYERS</small><span>the room we opened was only one floor</span></div>

      {seed ? (
        <motion.div className="v12j-seed-floor" layoutId="v12-transformer-floor" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 0.92 }}>
          <small>ONE SPARSE TRANSFORMER FLOOR</small>
          <div><span><b>Attention</b><em>gather context</em></span><i>→</i><span><b>MoE</b><em>top-{MODEL.expertsPerToken} routed + shared</em></span></div>
          <HeroVector note="same “it” representation leaves this floor" compact changed layoutId="v9-hero-vector" />
          <p>BUT the model is much taller than this one floor.</p>
        </motion.div>
      ) : null}

      {tower ? (
        <div className="v12j-building-layout">
          <motion.div className="v12j-building-tower" layoutId="v12-transformer-building" initial={{ opacity: 0, scaleY: 0.35, y: '18cqh' }} animate={{ opacity: 1, scaleY: 1, y: 0 }} transition={{ type: 'spring', stiffness: 72, damping: 21 }}>
            {Array.from({ length: MODEL.layers }, (_, index) => {
              const floorNumber = MODEL.layers - index
              const dense = floorNumber <= MODEL.denseLayers
              const active = floor === floorNumber
              const sweep = timelapse && floorNumber >= 4
              return (
                <motion.div
                  key={floorNumber}
                  className="v12j-tower-floor"
                  data-dense={dense ? 'true' : undefined}
                  data-active={active ? 'true' : undefined}
                  data-sweep={sweep ? 'true' : undefined}
                  animate={{ opacity: floor && !active ? 0.28 : why ? 0.48 : 1 }}
                >
                  <small>{[45, 4, 3, 1].includes(floorNumber) ? floorNumber : ''}</small>
                  <span>ATTN</span><i>→</i><b>{dense ? 'DENSE MLP' : 'MOE'}</b>
                  {!dense ? <em>{Array.from({ length: 8 }, (_, light) => <u key={light} style={{ '--delay': `${((light + floorNumber) % 8) * 0.04}s` } as CSSProperties} />)}</em> : null}
                </motion.div>
              )
            })}

            {floor ? <motion.div className="v12j-tower-vector" layoutId="v9-hero-vector" style={{ '--floor': floor } as CSSProperties} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><strong>it</strong><VectorStrip compact changed /><span>entering layer {floor}</span></motion.div> : null}
            {timelapse ? <motion.div className="v12j-tower-vector is-timelapse" layoutId="v9-hero-vector" initial={{ bottom: '6cqh', opacity: 1 }} animate={{ bottom: ['6cqh', '19cqh', '36cqh', '58cqh'], opacity: 1 }} transition={{ duration: 2.8, ease: 'easeInOut' }}><strong>it</strong><VectorStrip compact changed /><span>representation keeps changing</span></motion.div> : null}
          </motion.div>

          <aside className="v12j-building-notes">
            <div className="v12j-building-hero"><small>THE SCALE</small><strong>{MODEL.layers} layers</strong><span>one representation is refined again and again</span></div>

            {bracket ? <div className="v12j-layer-bracket"><div className="is-moe"><b>4–45</b><span><strong>{MODEL.moeLayers} sparse MoE layers</strong><small>Attention → router → top-{MODEL.expertsPerToken} routed + shared</small></span></div><div className="is-dense"><b>1–3</b><span><strong>{MODEL.denseLayers} dense feed-forward layers</strong><small>Attention → same dense MLP</small></span></div></div> : null}

            {floor ? <div className="v12j-floor-explain"><small>NOW · LAYER {floor}</small><b>{floor <= MODEL.denseLayers ? 'Attention runs, then the dense MLP transforms the representation.' : 'Attention runs, then this sparse layer makes a fresh routing choice.'}</b><span>The actor is still “it”; only its internal representation is changing.</span></div> : null}
            {timelapse ? <div className="v12j-floor-explain"><small>THEREFORE</small><b>5 → 6 → 7 → … → 45</b><span>On every later sparse floor, routing can be decided again from the representation that arrived there.</span></div> : null}

            {why ? <div className="v12j-why-layers"><small>WHY REPEAT?</small><h3>Each floor receives a representation already changed by the floor before it.</h3><div><span><VectorStrip compact /><b>earlier</b></span><i>→</i><span><VectorStrip compact changed /><b>refined</b></span><i>→</i><span><VectorStrip compact changed /><b>refined again</b></span></div><p>We do <b>not</b> assign one neat linguistic job to each layer. The safe intuition is progressive refinement.</p></div> : null}
          </aside>
        </div>
      ) : null}
    </motion.section>
  )
}
