/**
 * The paper world — shared visual library.
 *
 * Anything used by more than one section lives here, never copied into a
 * section folder. A copied component is two components that will drift.
 * See skills/ASSET_LIBRARY.md.
 *
 * Browse every piece in every state at /paper.
 */
export { PaperDefs, INK, GRAPHITE } from './ink'
export { PALETTE, EXPERT_COLORS, expertColor, type PaletteKey } from './palette'
export { Note, Bubble, Brace, Arrow, Sparks, Tick } from './marks'
export { FEEL, HOLD, type Relation, type Feel } from './motion'
export { Overlays, type Overlay } from './overlays'
export { Slot } from './slot'
export {
  SectionRunner,
  holdFor,
  stageSpan,
  runtimeSeconds,
  beatStarts,
  beatAt,
  type Beat,
} from './director'
export { ModelSheet, ShareBar, Plan } from './cast/Boards'
export { Hospital, ChosenTeam } from './cast/Hospital'
export { Narrator, NARRATOR_POSES, NARRATOR_STYLES, type NarratorPose, type NarratorStyle } from './cast/Narrator'
export { WordCard, FrontDesk, SmallMachine, ArchSheet } from './cast/Props'
export { Specialist } from './cast/Specialist'
export { Plates } from './cast/Plates'
export { WordLoop, Ground } from './cast/WordLoop'
export { Store, FastMemory, FetchPath, CostBars, Counter, Clock } from './cast/Memory'
export { NumberRow } from './cast/NumberRow'
export { Camera, CAMERA_HOME, type CameraState } from './camera'
export { Sentence } from './cast/Sentence'
export { Tower } from './cast/Tower'
export { Aside, Choice, VerdictCard } from './cast/Aside'
export { BigNumber, Block, type PatchName } from './cast/Scale'
export { Vocabulary, EmbeddingTable, Space } from './cast/Lookup'
export { AttentionLines, AttentionArcs, AttentionAsk, WEIGHTS } from './cast/Attention'
export { ExpertBlend, ExpertOpen, Room, type BlendStage } from './cast/Blend'
export { ExpertCache, TradeSlider, RunningMachine } from './cast/Cache'
export { GenerateLoop } from './cast/Loop'
export { ModelCard } from './cast/Boards'
export { type TowerFlash } from './cast/Tower'

/**
 * The scene kit. Every section's `scene.ts` is built out of these, so the
 * cumulative merge exists once rather than thirteen times.
 */
export {
  mergePatches,
  actorVerbs,
  NARRATOR_HOME,
  INITIAL_NARRATOR,
  INITIAL_GROUND,
  GROUND_Y,
  INITIAL_CAMERA,
  type At,
  type Placed,
  type PatchOf,
  type NarratorActor,
  type GroundActor,
  type CameraActor,
} from './scene'
export { note, centred, brace, arrow, tick } from './notes'

/** The running prompt, and the numbers derived from it. */
export {
  PROMPT,
  PROMPT_IDS,
  UNEVEN,
  FOLLOWED,
  TOKENS,
  VISITS_PER_TOKEN,
  VISITS_PER_PASS,
  REPLY,
  BARKED,
  HOT,
} from './prompt'

/**
 * The object library. Things rather than people: `size` sets the width, and
 * on the fixed stage that can be a container unit, e.g. size="18cqw".
 */
export { Prop, seeded, shade, SHADES } from './props/frame'
export { Book, BookStack, Shelf, Library } from './props/Books'
export {
  Laptop,
  Screen,
  MachineBox,
  Keyboard,
  Mouse,
  RamStick,
  RamBank,
  Drive,
  DriveRack,
} from './props/Machines'
export { Dog, Cat, Bird } from './props/Creatures'
export { Car, Van, Crate } from './props/Vehicles'
