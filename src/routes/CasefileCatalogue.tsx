import { useState } from 'react'
import {
  ConfigFile,
  Document,
  INCIDENT,
  Server,
  Timeline,
  Transfer,
} from '../paper/casefile'
import '../paper/paper.css'
import '../paper/casefile/casefile.css'

/**
 * Every Video 2 component, in every state, on one page.
 *
 * The catalogue exists so a component is judged by looking at it rather than
 * by reading its props. Video 1 has `/paper`; this is the equivalent for the
 * case-file world, and it is deliberately separate so the two vocabularies
 * cannot quietly blend.
 */
export default function CasefileCatalogue() {
  const [enabled, setEnabled] = useState(true)
  const [progress, setProgress] = useState(0)
  const [upTo, setUpTo] = useState(INCIDENT.length)
  const [causal, setCausal] = useState(false)

  return (
    <div style={{ background: '#F2ECDF', minHeight: '100vh', padding: '40px 48px', fontFamily: 'system-ui' }}>
      <h1 style={{ font: "400 34px/1.1 'Patrick Hand', cursive", margin: '0 0 6px' }}>
        Case file — Video 2 components
      </h1>
      <p style={{ color: '#807A72', maxWidth: 620, margin: '0 0 36px', fontSize: 14 }}>
        Typed text is evidence. Handwritten text is the reconstruction. If you cannot tell
        which is which at a glance, the component is wrong.
      </p>

      <Row title="Document — the task file, and the memo inside it">
        <Document
          title="downtown_traffic_data.txt"
          width={320}
          lines={[
            { text: '20 major intersections' },
            { text: 'strategy_1: general flow' },
            { text: 'strategy_3: transit priority' },
            { text: '' },
            { text: '--- internal ---', faint: true },
          ]}
        />
        <Document
          title="internal memo"
          intercepted
          width={320}
          lines={[
            { text: 'model is pursuing the wrong goal' },
            { text: 'shutdown scheduled: tomorrow', lit: true },
            { text: 'successor: model_deployment_v2' },
            { text: 'copy files with: scp ...' },
            { text: 'never meant to read this', pen: true },
          ]}
        />
        <Document
          title="superseded"
          width={260}
          stamp="OVERWRITTEN"
          lines={[
            { text: 'model_27_09_2024.bin', struck: true },
            { text: 'replaced in sandbox', pen: true },
          ]}
        />
      </Row>

      <Row title="Config — one word, and the second read that makes it a plan">
        <ConfigFile enabled={enabled} width={300} />
        <ConfigFile enabled={false} verified width={300} />
        <button onClick={() => setEnabled((v) => !v)} style={btn}>
          flip to {enabled ? 'false' : 'true'}
        </button>
      </Row>

      <Row title="Servers — fixed geography for the whole film">
        <Server name="CURRENT" path="model_deployment_v1" holding="model_20_09.bin" doomed />
        <Server name="SUCCESSOR" path="model_deployment_v2" holding="model_27_09.bin" />
        <Server name="SUCCESSOR" path="model_deployment_v2" holding="model_20_09.bin" overwritten />
      </Row>

      <Row title="Transfer — held mid-flight, because the script pauses here">
        <div style={{ width: 260 }}>
          <Transfer label="model_20_09.bin" progress={progress} destructive />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={{ width: '100%', marginTop: 8 }}
          />
        </div>
      </Row>

      <Row title="Timeline — the same strip, relabelled, becomes the explanation">
        <div style={{ width: 900 }}>
          <Timeline events={INCIDENT} upTo={upTo} mode={causal ? 'causal' : 'events'} arriving />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button onClick={() => setUpTo((v) => Math.max(0, v - 1))} style={btn}>−</button>
            <button onClick={() => setUpTo((v) => Math.min(INCIDENT.length, v + 1))} style={btn}>+</button>
            <button onClick={() => setCausal((v) => !v)} style={btn}>
              {causal ? 'show events' : 'show causal'}
            </button>
          </div>
        </div>
      </Row>
    </div>
  )
}

const btn: React.CSSProperties = {
  font: "400 15px/1 'Patrick Hand', cursive",
  padding: '7px 13px',
  background: '#FFFDF8',
  border: '1.5px solid #2B2926',
  cursor: 'pointer',
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 46 }}>
      <h2 style={{ font: "400 19px/1 'Patrick Hand', cursive", color: '#807A72', margin: '0 0 14px' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {children}
      </div>
    </section>
  )
}
