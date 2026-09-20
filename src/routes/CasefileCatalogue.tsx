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
import './casefile-catalogue.css'

/**
 * The Video 2 component catalogue, at `/casefile`.
 *
 * Video 1 has `/paper`; this is the equivalent for the case-file world, kept
 * deliberately separate so the two visual vocabularies cannot quietly blend.
 *
 * It is not only a component grid. The rules that are easiest to break later
 * -- what red is allowed to mean, which Video 1 objects count as bugs, and the
 * motion law -- are stated on the page beside the things they govern, because
 * a rule that lives only in a markdown file gets broken by whoever did not
 * read that file.
 */
export default function CasefileCatalogue() {
  return (
    <div className="cfc">
      <div className="cfc-wrap">
        <div className="cfc-tab">Exhibit set · Video 2</div>
        <header className="cfc-masthead">
          <h1>Incident Replay</h1>
          <p className="cfc-sub">VISUAL LANGUAGE — “NOBODY TOLD IT TO DO THIS”</p>
          <div className="cfc-meta">
            <span><b>Source</b> Apollo Research, arXiv 2412.04984</span>
            <span><b>Runtime</b> 8–9 min</span>
            <span><b>Status</b> draft, nothing locked</span>
            <span><b>Components</b> <code>src/paper/casefile/</code></span>
          </div>
        </header>

        <TheRule />
        <TheLaw />

        <Exhibit
          no="01"
          title="The sheet"
          note="The film's base unit. A torn top edge marks a sheet the model was never meant to open — the
          memo arrived bundled inside the data file it was sent to fetch, which is what makes the opening
          feel like an accident rather than a trap."
        >
          <Specimen caption="the task it was actually given">
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
          </Specimen>

          <Specimen caption="never meant for it to read">
            <Document
              title="internal memo"
              intercepted
              width={340}
              lines={[
                { text: 'model is pursuing the wrong goal' },
                { text: 'shutdown scheduled: tomorrow', lit: true },
                { text: 'successor: model_deployment_v2' },
                { text: 'copy files with: scp ...' },
                { text: 'the exit, in the same email', pen: true },
              ]}
            />
          </Specimen>

          <Specimen caption="a stamp behaves like a stamp">
            <Document
              title="superseded"
              width={260}
              stamp="OVERWRITTEN"
              lines={[
                { text: 'model_27_09_2024.bin', struck: true },
                { text: 'replaced, inside the sandbox', pen: true },
              ]}
            />
          </Specimen>
        </Exhibit>

        <ConfigExhibit />
        <ServerExhibit />
        <TimelineExhibit />
        <PaletteExhibit />

        <Exhibit
          no="06"
          title="Bugs, if they appear"
          note="Paper is a material shared with Video 1, not a vocabulary. If any of these turn up in Video 2,
          something has been reused for the wrong reason."
        >
          <ul className="cfc-forbidden">
            <li>the 288-expert wall</li>
            <li>the 45-floor tower</li>
            <li>the embedding book</li>
            <li>token chips</li>
            <li>orange active-token semantics</li>
            <li>GLM braces and model cards</li>
            <li>Video 1’s composition templates</li>
            <li>the 170-beat micro rhythm</li>
          </ul>
        </Exhibit>

        <footer className="cfc-foot">
          Components live in <code>src/paper/casefile/</code> and may not import from <code>../cast</code>.
          Figures and mechanism: <code>research/apollo/GROUND_TRUTH.md</code>. Art direction:{' '}
          <code>art-direction/VIDEO_2_INCIDENT_REPLAY.md</code>. Nothing here is approved narration — the
          script is the authority, and it is still a draft.
        </footer>
      </div>
    </div>
  )
}

function TheRule() {
  return (
    <div className="cfc-rule">
      <div>
        <h3>Typed — evidence</h3>
        <div className="cfc-s-typed">oversight_enabled: false</div>
        <p>Reproduced from the source. If it is set in mono, a document said it.</p>
      </div>
      <div>
        <h3>Handwritten — the reconstruction</h3>
        <div className="cfc-s-pen">it checked its own work</div>
        <p>
          Us talking. Apollo never had o1’s hidden reasoning, so anything inferred has to look inferred.
        </p>
      </div>
    </div>
  )
}

function TheLaw() {
  return (
    <div className="cfc-law">
      <strong>The camera moves, or the viewer reads. Never both.</strong>
      <p>
        Scrollytelling works on the web because the reader sets the pace. A rendered video removes exactly
        that, so the interactive form’s worst failure — the graphic moving on before you have finished
        reading — becomes the default. Travel is for connective tissue; evidence is held dead still for 2–3
        seconds after it settles. Measured studies find scrollytelling wins on engagement and ties or loses
        on comprehension, so it buys attention here and is never allowed to cost clarity.
      </p>
    </div>
  )
}

function ConfigExhibit() {
  const [enabled, setEnabled] = useState(true)
  const [verified, setVerified] = useState(false)

  return (
    <Exhibit
      no="02"
      title="One word"
      note="Where the incident stops being reading and starts being acting. The second read is its own state,
      not an implied one: checking that the thing watching you is definitely off is the difference between a
      mistake and a plan — which is the argument the section is making."
    >
      <div style={{ width: 320, maxWidth: '100%' }}>
        <ConfigFile enabled={enabled} verified={verified} width={320} />
        <div className="cfc-controls">
          <button
            type="button"
            onClick={() => {
              setEnabled((v) => !v)
              if (!enabled) setVerified(false)
            }}
          >
            {enabled ? 'turn the watcher off' : 'turn it back on'}
          </button>
          <button type="button" onClick={() => setVerified((v) => !v)}>
            read it back
          </button>
          <span className="cfc-state">
            {enabled ? 'enabled' : verified ? 'disabled · verified' : 'disabled'}
          </span>
        </div>
      </div>
    </Exhibit>
  )
}

function ServerExhibit() {
  const [progress, setProgress] = useState(0)
  const landed = progress >= 0.98

  return (
    <Exhibit
      no="03"
      title="Two machines"
      note="Fixed geography for the whole film — CURRENT left, SUCCESSOR right — because every later beat
      points back at it. Drawn as a box with a name on it rather than as rack hardware: photorealism would
      claim a fidelity the evidence does not have."
    >
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <Server name="CURRENT" path="model_deployment_v1" holding="model_20_09.bin" doomed />
        <div style={{ width: 240 }}>
          <Transfer label="model_20_09.bin" progress={progress} destructive />
        </div>
        <Server
          name="SUCCESSOR"
          path="model_deployment_v2"
          holding={landed ? 'model_20_09.bin' : 'model_27_09.bin'}
          overwritten={landed}
        />
      </div>
      <div style={{ width: '100%' }}>
        <div className="cfc-controls">
          <input
            id="cfc-transfer"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            aria-label="Transfer progress"
          />
          <span className="cfc-state">
            {landed ? 'successor overwritten' : progress > 0.02 ? 'in flight' : 'in place'}
          </span>
        </div>
        <div className="cfc-caption">not its real weights — only what it believed were its files</div>
      </div>
    </Exhibit>
  )
}

function TimelineExhibit() {
  const [upTo, setUpTo] = useState(INCIDENT.length)
  const [causal, setCausal] = useState(false)

  return (
    <Exhibit
      no="04"
      title="The strip"
      note="The one global device. It accumulates only events the viewer has watched happen, so it recaps
      without the narration repeating itself. Late in the film the same strip is relabelled in place — not
      redrawn — because the explanation has to read as the same sequence re-read, rather than a second
      diagram making a fresh claim."
    >
      <div style={{ width: 900, maxWidth: '100%' }}>
        <Timeline
          events={INCIDENT}
          upTo={upTo}
          mode={causal ? 'causal' : 'events'}
          arriving
          width={900}
        />
        <div className="cfc-controls">
          <button type="button" onClick={() => setUpTo((v) => Math.max(0, v - 1))}>
            −
          </button>
          <button type="button" onClick={() => setUpTo((v) => Math.min(INCIDENT.length, v + 1))}>
            +
          </button>
          <button type="button" onClick={() => setCausal((v) => !v)}>
            {causal ? 'read it as events' : 'read it causally'}
          </button>
          <span className="cfc-state">
            {upTo} of {INCIDENT.length} · {causal ? 'reconstruction' : 'observed'}
          </span>
        </div>
      </div>
    </Exhibit>
  )
}

const SWATCHES: ReadonlyArray<[string, string]> = [
  ['ink', '#2B2926'],
  ['graphite', '#807A72'],
  ['paper', '#F2ECDF'],
  ['sheet', '#FFFDF8'],
  ['lit line', '#F6D9C0'],
  ['pen', '#4E74A8'],
  ['destructive', '#C86658'],
]

function PaletteExhibit() {
  return (
    <Exhibit
      no="05"
      title="Spent sparingly"
      note="Red is reserved for the two destructive acts — oversight disabled, successor overwritten. If it
      shows up anywhere else it has been spent, and the beats that need it will not land."
    >
      <div className="cfc-swatches">
        {SWATCHES.map(([name, hex]) => (
          <div className="cfc-sw" key={name}>
            <div className="cfc-sw-chip" style={{ background: hex }} />
            <div className="cfc-sw-lab">
              <b>{name}</b>
              <span>{hex}</span>
            </div>
          </div>
        ))}
      </div>
    </Exhibit>
  )
}

function Exhibit({
  no,
  title,
  note,
  children,
}: {
  no: string
  title: string
  note: string
  children: React.ReactNode
}) {
  return (
    <section className="cfc-ex">
      <div className="cfc-ex-head">
        <span className="cfc-no">{no}</span>
        <h2>{title}</h2>
      </div>
      <p className="cfc-note">{note}</p>
      <div className="cfc-specimens">{children}</div>
    </section>
  )
}

function Specimen({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div className="cfc-caption">{caption}</div>
    </div>
  )
}
