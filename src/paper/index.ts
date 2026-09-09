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
export { Note, Bubble, Brace, Arrow, Sparks } from './marks'
export { FEEL, HOLD, type Relation, type Feel } from './motion'
export { Overlays, type Overlay } from './overlays'
export { Slot } from './slot'
export { SectionRunner, holdFor, stageSpan, runtimeSeconds, type Beat } from './director'
export { ModelSheet, ShareBar, Plan } from './cast/Boards'
export { Hospital, ChosenTeam } from './cast/Hospital'
export { Narrator, type NarratorPose } from './cast/Narrator'
export { WordCard, FrontDesk, SmallMachine, ArchSheet } from './cast/Props'
export { Specialist } from './cast/Specialist'
export { WordLoop, Ground } from './cast/WordLoop'
export { Store, FastMemory, FetchPath, CostBars, Counter } from './cast/Memory'
export { NumberRow } from './cast/NumberRow'
export { Camera, CAMERA_HOME, type CameraState } from './camera'
export { Sentence } from './cast/Sentence'
export { Tower } from './cast/Tower'
export { Aside, Choice, VerdictCard } from './cast/Aside'
