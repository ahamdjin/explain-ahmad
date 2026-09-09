import { useState } from 'react'
import {
  ArchSheet,
  ChosenTeam,
  FrontDesk,
  Hospital,
  ModelSheet,
  Narrator,
  PaperDefs,
  Plan,
  ShareBar,
  SmallMachine,
  Specialist,
  WordCard,
  type NarratorPose,
} from '../paper'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'
import '../paper/paper.css'
import './paper-catalogue.css'

/**
 * Every piece in the paper library, in every state, on one page.
 *
 * The library has to be *visible* or it will not be used -- a prop that cannot
 * be seen without running a section gets rebuilt by whoever needs it next.
 * See skills/ASSET_LIBRARY.md.
 */

const POSES: NarratorPose[] = ['wonder', 'point', 'think', 'hopeful', 'cheer', 'push', 'nod']
const CHOSEN = [41, 76, 103, 147, 168, 211, 245, 278]

function Item({ name, note, wide, children }: { name: string; note?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <figure className="pc-item" data-wide={wide ? 'true' : undefined}>
      <div className="pc-stage">
        <div className="s1-page pc-inner">{children}</div>
      </div>
      <figcaption>
        <b>{name}</b>
        {note ? <span>{note}</span> : null}
      </figcaption>
    </figure>
  )
}

export default function PaperCatalogue() {
  const [pose, setPose] = useState<NarratorPose>('wonder')

  return (
    <div className="pc-page">
      <PaperDefs />

      <header>
        <h1>Paper library</h1>
        <p>
          Every reusable piece, in every state. Import from <code>src/paper</code> — never copy into a
          section folder. Rules: <code>skills/ASSET_LIBRARY.md</code>.
        </p>
      </header>

      <h2>Cast</h2>
      <div className="pc-grid">
        <Item name="Narrator" note={`pose="${pose}" · the viewer's proxy; asks, never explains`}>
          <Narrator pose={pose} scale={1.6} />
        </Item>
        <Item name="Narrator — all poses" note="pose is the emotional track; readable with sound off" wide>
          <div className="pc-row">
            {POSES.map((p) => (
              <button key={p} type="button" className="pc-pose" data-on={p === pose ? 'true' : undefined} onClick={() => setPose(p)}>
                <Narrator pose={p} scale={0.8} />
                <em>{p}</em>
              </button>
            ))}
          </div>
        </Item>
        <Item name="Specialist" note="identity is a number, never a job title">
          <div className="pc-row">
            <Specialist index={0} size={58} />
            <Specialist index={3} size={58} lit />
            <Specialist index={5} size={58} dimmed />
            <Specialist index={2} size={58} asleep />
          </div>
        </Item>
        <Item name="FrontDesk" note="the router — unlabelled until it is named">
          <div className="pc-row pc-desks">
            <FrontDesk named={false} ringed={false} />
            <FrontDesk named ringed />
          </div>
        </Item>
      </div>

      <h2>Boards</h2>
      <div className="pc-grid">
        <Item name="ModelSheet" note='lit="none" | "total" | "both"' wide>
          <div className="pc-row">
            <ModelSheet lit="none" />
            <ModelSheet lit="both" />
          </div>
        </Item>
        <Item name="ShareBar — pair" note="two numbers, alone">
          <ShareBar mode="pair" lit={0.056} caption="" dark={false} />
        </Item>
        <Item name="ShareBar — bar" note="the measurement; a carrying frame" wide>
          <ShareBar mode="bar" lit={0.056} caption="for one word — about 5% of it" dark />
        </Item>
        <Item name="Plan" note="three panels; must look correct" wide>
          <Plan />
        </Item>
      </div>

      <h2>World</h2>
      <div className="pc-grid">
        <Item name="Hospital — staffed" note="288 experts, code-generated 36×8" wide>
          <Hospital sign="Mixture of Experts" plaque="320B total" staffed lit={[]} focus={false} quiet={false} heavy={false} bunks={false} doorsOpen={false} />
        </Item>
        <Item name="Hospital — chosen + heavy" note="focus dims the 280; heavy adds the load line" wide>
          <Hospital sign="Mixture of Experts" plaque="320B total" staffed lit={CHOSEN} focus quiet={false} heavy bunks={false} doorsOpen={false} />
        </Item>
        <Item name="Hospital — bunks + doors" note="asleep, and the entrance open" wide>
          <Hospital sign="Mixture of Experts" plaque="320B total" staffed lit={CHOSEN} focus quiet={false} heavy={false} bunks doorsOpen />
        </Item>
        <Item name="ChosenTeam" note="the eight, lifted out">
          <ChosenTeam lit={CHOSEN} boxed />
        </Item>
      </div>

      <h2>Props</h2>
      <div className="pc-grid">
        <Item name="WordCard" note="a word, never a token">
          <WordCard label="scared" />
        </Item>
        <Item name="SmallMachine" note="generic; never named hardware">
          <div className="pc-row">
            <SmallMachine filled={false} />
            <SmallMachine filled />
          </div>
        </Item>
        <Item name="ArchSheet" note="unreadable on purpose">
          <ArchSheet pushed={false} />
        </Item>
      </div>
    </div>
  )
}
