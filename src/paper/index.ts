/**
 * The paper world — shared visual library.
 *
 * Anything used by more than one section lives here, never copied into a
 * section folder. A copied component is two components that will drift.
 * See skills/ASSET_LIBRARY.md.
 *
 * Browse every piece in every state at /paper.
 */
export { PaperDefs, INK, GRAPHITE, EXPERT_COLORS, expertColor } from './ink'
export { Note, Bubble, Brace, Arrow, Sparks } from './marks'
export { FEEL, HOLD, type Relation, type Feel } from './motion'
export { ModelSheet, ShareBar, Plan } from './cast/Boards'
export { Hospital, ChosenTeam } from './cast/Hospital'
export { Narrator, type NarratorPose } from './cast/Narrator'
export { WordCard, FrontDesk, SmallMachine, ArchSheet } from './cast/Props'
export { Specialist } from './cast/Specialist'
