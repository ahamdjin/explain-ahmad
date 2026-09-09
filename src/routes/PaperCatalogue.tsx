import { useState } from 'react'
import {
  PALETTE,
  ArchSheet,
  ChosenTeam,
  FrontDesk,
  Hospital,
  ModelSheet,
  Narrator,
  NARRATOR_POSES,
  NARRATOR_STYLES,
  PaperDefs,
  Plan,
  ShareBar,
  SmallMachine,
  Specialist,
  WordCard,
  type NarratorPose,
  type NarratorStyle,
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

const POSES = NARRATOR_POSES
const STYLES = Object.keys(NARRATOR_STYLES) as NarratorStyle[]
const CHOSEN = [41, 76, 103, 147, 168, 211, 245, 278]

function Item({ name, note, wide, tall, children }: { name: string; note?: string; wide?: boolean; tall?: boolean; children: React.ReactNode }) {
  return (
    <figure className="pc-item" data-wide={wide ? 'true' : undefined} data-tall={tall ? 'true' : undefined}>
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
  const [style, setStyle] = useState<NarratorStyle>('plain')

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

      <h2>Palette</h2>
      <p className="pc-note">
        Decided in one file: <code>src/paper/palette.ts</code>. Components never write a hex
        literal, and <code>npm run palette</code> regenerates the CSS custom properties from it — so
        retheming the whole video is a single edit.
      </p>
      <div className="pc-swatches">
        {(Object.entries(PALETTE) as [string, string][]).map(([name, value]) => (
          <div className="pc-swatch" key={name}>
            <i style={{ background: value }} />
            <b>{name}</b>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <h2>Cast</h2>
      <div className="pc-grid">
        <Item name="Narrator" note={`style="${style}" pose="${pose}" · ${NARRATOR_STYLES[style].job}`}>
          <Narrator pose={pose} style={style} scale={1.6} />
        </Item>
        <Item name="Narrator — all poses" note="pose is the emotional track; readable with sound off. Click one." wide tall>
          <div className="pc-row">
            {POSES.map((p) => (
              <button key={p} type="button" className="pc-pose" data-on={p === pose ? 'true' : undefined} onClick={() => setPose(p)}>
                <Narrator pose={p} style={style} scale={0.62} />
                <em>{p}</em>
              </button>
            ))}
          </div>
        </Item>
        <Item name="Narrator — the cast" note="style is who they are; any style holds any pose. Nobody carries a hue. Click one." wide>
          <div className="pc-row">
            {STYLES.map((name) => (
              <button key={name} type="button" className="pc-pose" data-on={name === style ? 'true' : undefined} onClick={() => setStyle(name)}>
                <Narrator pose={pose} style={name} scale={0.72} />
                <em>{name}</em>
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
          <Hospital sign="Mixture of Experts" plaque="320B total" staffed lit={[]} was={[]} focus={false} quiet={false} heavy={false} bunks={false} doorsOpen={false} />
        </Item>
        <Item name="Hospital — chosen + heavy" note="focus dims the 280; heavy adds the load line" wide>
          <Hospital sign="Mixture of Experts" plaque="320B total" staffed lit={CHOSEN} was={[]} focus quiet={false} heavy bunks={false} doorsOpen={false} />
        </Item>
        <Item name="Hospital — bunks + doors" note="asleep, and the entrance open" wide>
          <Hospital sign="Mixture of Experts" plaque="320B total" staffed lit={CHOSEN} was={[]} focus quiet={false} heavy={false} bunks doorsOpen />
        </Item>
        <Item name="ChosenTeam" note="the eight, lifted out">
          <ChosenTeam lit={CHOSEN} boxed />
        </Item>
      </div>

      <h2>Props</h2>
      <div className="pc-grid">
        <Item name="WordCard" note="a word, never a token">
          <WordCard label="dog" />
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
