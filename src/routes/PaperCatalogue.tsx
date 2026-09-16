import { useState } from 'react'
import {
  PALETTE,
  ArchSheet,
  BigNumber,
  Bird,
  Block,
  Book,
  BookStack,
  Car,
  Cat,
  Crate,
  Dog,
  Drive,
  DriveRack,
  EmbeddingTable,
  Keyboard,
  Laptop,
  Library,
  MachineBox,
  Mouse,
  RamBank,
  RamStick,
  Screen,
  Shelf,
  Space,
  Vocabulary,
  Clock,
  CostBars,
  ExpertBlend,
  ExpertCache,
  ExpertOpen,
  GenerateLoop,
  ModelCard,
  Room,
  RunningMachine,
  Sentence,
  Tower,
  TradeSlider,
  WEIGHTS,
  PROMPT,
  Van,
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

      <h2>Scale and lookup</h2>
      <p className="pc-note">
        The pieces that turn a number into a quantity you can see, and the two tables the video
        looks things up in. Built for the 13-section rebuild — see{' '}
        <code>video-script/video-1/READ_ALOUD.md</code>.
      </p>
      <div className="pc-grid">
        <Item name="BigNumber" note="the only thing in the frame" wide>
          <BigNumber value="320,000,000,000" caption="parameters" />
        </Item>
        <Item name="Block — scattered" note="the same marks, loose. Not a separate component" wide>
          <Block scatter />
        </Item>
        <Item name="Block — patch A" note="~5% lit, scattered not contiguous" wide>
          <Block lit="a" />
        </Item>
        <Item name="Block — lifted" note="the patch floats clear, leaving a hole" wide>
          <Block lit="a" lifted />
        </Item>
        <Item name="Block — the misfit" note="patch C lit, patch A ghosted. A mismatch, never a cross" wide>
          <Block lit="c" ghost="a" />
        </Item>
        <Item name="Block — coarse vs fine" note="§13: the same model, divided differently" wide>
          <div className="pc-row">
            <Block grain="coarse" lit="b" />
            <Block grain="fine" lit="b" />
          </div>
        </Item>
        <Item name="Vocabulary" note="hit, scrolling, scores — §2 and §9 share it" tall>
          <div className="pc-row">
            <Vocabulary hit={5562} label="154,880 entries" />
            <Vocabulary scores label="every token, scored" />
          </div>
        </Item>
        <Item name="EmbeddingTable" note="one row per token; it continues past the top" tall>
          <div className="pc-row">
            <EmbeddingTable seeking label="row 5562" />
            <EmbeddingTable pulled label="pulled out" />
          </div>
        </Item>
        <Item name="Space" note="relative distance only — no axes, no coordinates" wide>
          <Space show />
        </Item>
      </div>

      <h2>The machine, in motion</h2>
      <p className="pc-note">
        The mechanism pieces, §4 to §13. Two of these are worth knowing about before reaching for
        anything else. <code>AttentionArcs</code> renders as a bare <code>&lt;g&gt;</code> so the
        component that owns the token positions can draw the lines <em>inside its own svg</em> —
        two components agreeing on a coordinate system by hand is two components whose lines miss.
        And <code>TradeSlider</code> is the one real control in the video: §12's cache box, machine
        pace and machine bulk are all derived from its single value, held by that section&rsquo;s{' '}
        <code>Stage</code>.
      </p>
      <div className="pc-grid">
        <Item name="Sentence — one card" note="your prompt, before anything happens to it" wide>
          <Sentence words={PROMPT} />
        </Item>
        <Item name="Sentence — fractured" note="the same card, mid-break. Uneven on purpose" wide>
          <Sentence words={PROMPT} split jumble focus={1} />
        </Item>
        <Item name="Sentence — tokens, with rows" note="what each piece actually is inside" wide>
          <Sentence words={PROMPT} split rows focus={1} changed={1} />
        </Item>
        <Item name="Sentence — attention" note="thickness is weight. No numbers, ever" wide>
          <Sentence
            words={PROMPT}
            split
            rows
            focus={4}
            attention={{ weights: WEIGHTS, masked: true }}
          />
        </Item>
        <Item name="ExpertOpen" note="§5: the name oversells it. A row in, a different row out" wide>
          <ExpertOpen />
        </Item>
        <Item name="ExpertBlend — eight out" note="one row in, eight different rows out" wide>
          <ExpertBlend stage="out" />
        </Item>
        <Item name="ExpertBlend — weighted" note="size is the router's score. This is why §5 mattered" wide>
          <ExpertBlend stage="weighted" shared />
        </Item>
        <Item name="ExpertBlend — merged" note="one row out, beside the one that arrived" wide>
          <ExpertBlend stage="merged" ghost label="thought about, once" />
        </Item>
        <Item name="Room" note="§6 gives it edges so §7 can make it one floor" wide>
          <Room bounded />
        </Item>
        <Item name="Tower — one climber" note="45 floors, 3 dense. look · pick · work" tall>
          <Tower floor={12} markers={1} flash="pick" teams />
        </Item>
        <Item name="Tower — the whole prompt" note="§8: nine at once, wired, and named" tall>
          <Tower floor={20} markers={9} wiring counters="336" plaque="transformer" />
        </Item>
        <Item name="GenerateLoop" note="§10: the reply builds at the pace of the loop" tall>
          <GenerateLoop words={['bounced', 'off', 'the']} pace={0.6} total={5040} cycling />
        </Item>
        <Item name="ExpertCache" note="§12: the empty slots stay drawn — that is the trade" wide>
          <div className="pc-row">
            <ExpertCache kept={0.15} filled={2} label="kept close" />
            <ExpertCache kept={0.9} filled={20} hits={16} label="kept close" />
          </div>
        </Item>
        <Item name="TradeSlider" note="drag it. Both ends are bad, and that is the point" wide>
          <TradeSlider ask="where would you put it?" />
        </Item>
        <Item name="RunningMachine" note="pace and bulk. Small and slow, or fast and enormous" wide>
          <div className="pc-row">
            <RunningMachine pace={0.1} bulk={0.05} words={['bounced']} />
            <RunningMachine pace={0.95} bulk={0.9} words={['bounced', 'off']} />
          </div>
        </Item>
        <Item name="Clock" note="§11: a duration is only felt if it takes that long" wide>
          <Clock seconds={1.5} running label="~1.5 s" />
        </Item>
        <Item name="CostBars" note="§11: to scale, and the enlargement is labelled" wide>
          <CostBars show="both" ratio="about 50× more" inset />
        </Item>
        <Item name="ModelCard" note="§13: four chips, not a rack. Coarse against fine" wide>
          <div className="pc-row">
            <ModelCard name="gpt-oss-120b" total="117B" active="5.1B" experts="128" chips={1} grain="coarse" litShare note="one chip" />
            <ModelCard name="this model" total="321B" active="18B" experts="288" chips={4} grain="fine" litShare note="four" />
          </div>
        </Item>
      </div>

      <h2>Objects</h2>
      <p className="pc-note">
        Things rather than people. <code>size</code> sets the width and the height follows the
        viewBox, so on the stage you can pass a container unit — <code>size="18cqw"</code> — and it
        scales with the frame. Variety comes from <em>value</em>, never hue: every hue already means
        something, so a coloured book would read as being one of those things.
      </p>
      <div className="pc-grid">
        <Item name="Book" note='state="shut" | "open"'>
          <div className="pc-row">
            <Book size={70} />
            <Book size={110} state="open" />
          </div>
        </Item>
        <Item name="BookStack" note="count — a pile that looks like a pile">
          <BookStack size={180} count={5} />
        </Item>
        <Item name="Shelf" note="seed changes the widths, gaps and lean" wide>
          <div className="pc-row">
            <Shelf size={320} seed={1} />
            <Shelf size={320} seed={7} />
          </div>
        </Item>
        <Item name="Library" note="shelves, seed, lit — the case, with the cornice" tall>
          <div className="pc-row">
            <Library size={190} />
            <Library size={190} seed={4} lit />
          </div>
        </Item>

        <Item name="Laptop" note="lit, shut — the wedge and the notch are the cue">
          <div className="pc-row">
            <Laptop size={190} />
            <Laptop size={190} lit />
          </div>
        </Item>
        <Item name="Screen" note="the chin and the blade foot are the cue">
          <div className="pc-row">
            <Screen size={150} />
            <Screen size={150} lit />
          </div>
        </Item>
        <Item name="MachineBox" note='shape="mini" | "studio" | "tower"' wide>
          <div className="pc-row">
            <MachineBox size={150} shape="mini" lit />
            <MachineBox size={120} shape="studio" />
            <MachineBox size={100} shape="tower" />
          </div>
        </Item>
        <Item name="Keyboard + Mouse" note="key grid is generated, not drawn" wide>
          <div className="pc-row">
            <Keyboard size={280} />
            <Mouse size={54} />
          </div>
        </Item>
        <Item name="RamStick" note="chips over gold fingers; the notch stops it being a chocolate bar" wide>
          <div className="pc-row">
            <RamStick size={280} />
            <RamStick size={280} lit />
          </div>
        </Item>
        <Item name="RamBank" note="filled vs empty slots — the headroom is the point" wide>
          <RamBank size={300} count={4} filled={2} />
        </Item>
        <Item name="Drive" note='kind="ssd" | "disk" — the platter makes "slow" self-evident' wide>
          <div className="pc-row">
            <Drive size={190} kind="ssd" label="320B" />
            <Drive size={190} kind="disk" />
          </div>
        </Item>
        <Item name="DriveRack" note="what &ldquo;more than fits&rdquo; looks like">
          <DriveRack size={190} rows={5} />
        </Item>

        <Item name="Dog" note="sits — and the tail up is what stops it being a fox">
          <div className="pc-row">
            <Dog size={150} />
            <Dog size={130} sits />
          </div>
        </Item>
        <Item name="Cat + Bird" note="the curled tail is the whole cat" wide>
          <div className="pc-row">
            <Cat size={200} />
            <Bird size={130} />
          </div>
        </Item>
        <Item name="Car" note="moving adds speed lines — two or three, never more">
          <div className="pc-row">
            <Car size={260} moving />
          </div>
        </Item>
        <Item name="Van + Crate" note="load 0-3 — empty on the way out, full on the way back" wide>
          <div className="pc-row">
            <Van size={270} load={3} moving />
            <Crate size={95} />
            <Crate size={95} open />
          </div>
        </Item>
      </div>
    </div>
  )
}
