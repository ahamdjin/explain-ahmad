/**
 * The palette. One file, and the only place a colour is decided.
 *
 * Everything in `src/paper` reads from here, and the CSS custom properties in
 * `paper.css` are generated from this object by `npm run palette` -- so the
 * stylesheet and the SVG components cannot drift apart, and retheming the
 * whole video is a single edit.
 *
 * Rules:
 *  - never write a hex literal in a component
 *  - ink is the only near-black; everything else is a wash or an accent
 *  - accents come in three weights: `wash` (fill), base (object), `ink` (line)
 */
export const PALETTE = {
  /* line and text */
  ink: '#2B2926',
  graphite: '#807A72',
  /** Load, weight, pressure. Never used for text. */
  stone: '#8A7F6E',

  /* the paper itself, lightest to warmest */
  paperWhite: '#FFFDF8',
  paperLight: '#FBF8F1',
  paperSheet: '#F7F2E7',
  paper: '#F2ECDF',
  paperFold: '#F1EADC',
  paperShade: '#EDE5D8',

  /* things present but not participating */
  idle: '#E7E0D2',
  idleDeep: '#E4DCCC',
  idleAsleep: '#D6CCB8',
  idleDim: '#CDC1A9',

  /* accents */
  orangeWash: '#F6D9C0',
  orange: '#E79A63',
  orangeInk: '#C87B45',

  blueWash: '#CFDCEE',
  blue: '#5E83B8',
  blueInk: '#4E74A8',

  red: '#C86658',

  /* the word we follow */
  tealWash: '#D6E7E1',
  teal2: '#6FA394',
  tealInk: '#43786A',

  /* connections: attention, "because of that" */
  relateWash: '#E6DCF2',
  relate: '#A98BC9',
  relateInk: '#7C5DA6',

  /* the expert family -- one hue each, all the same weight */
  green: '#8FBF9F',
  teal: '#74A297',
  tealSoft: '#9FC4BA',
  yellow: '#E3C45B',
  pink: '#E39BA8',
  purple: '#B49AD1',
  lilac: '#7FA8D4',
  tan: '#C9A87C',

  /* warm light: something is on, or a door is open */
  glow: '#F0C98A',
  glowSoft: '#FDF0D8',
  glowPale: '#FDF7EA',
  glowTint: '#FDF3E4',
} as const

export type PaletteKey = keyof typeof PALETTE

/**
 * One thing, one colour.
 *
 * The colour of a thing is part of what identifies it, so a viewer can track
 * it across eight sections without being told. That only works if each hue
 * means exactly one thing -- the moment a hue picks up a second job it stops
 * identifying anything, and the whole piece reads as tinted.
 *
 * This has been got wrong twice. First orange was doing eight jobs. Then teal
 * inherited five of them. Both times the symptom was the same: the app looked
 * like one colour.
 *
 * Two deliberate absences:
 *
 * - **Chosen has no hue.** Selection is already carried by *having colour at
 *   all* -- a chosen expert keeps its family colour and gains an ink ring,
 *   against neighbours that are flat beige. Contrast does it better than a
 *   sixth accent would, and it leaves teal free for the word.
 * - **Handwriting is ink by default.** A note takes a role's colour only when
 *   it names that role's thing. Colour in a frame should come from the objects,
 *   not from the labels; coloured labels everywhere is what made it noisy.
 */
export const ROLE = {
  /** Structure, buildings, and every note that is not naming a coded thing. */
  ink: PALETTE.ink,
  /** The word we follow, from §1 to §7. Its card, its label, where it is. */
  word: PALETTE.tealInk,
  /** Its numbers, and anything counted: rows, counters, totals, durations. */
  measure: PALETTE.blueInk,
  /** Connections between things -- attention, "because of that". */
  relate: PALETTE.relateInk,
  /** A cost, or a contradiction. Never a blocked path. */
  cost: PALETTE.red,
  /** ONLY where the efficiency claim itself is pointed at. Three uses. */
  claim: PALETTE.orangeInk,
} as const

export type Role = keyof typeof ROLE

/**
 * The expert population reads as one family, so every member is the same
 * weight of colour and differs only in hue. Identity is a number, never a hue
 * with a meaning attached.
 */
export const EXPERT_COLORS = [
  PALETTE.orange,
  PALETTE.lilac,
  PALETTE.green,
  PALETTE.purple,
  PALETTE.yellow,
  PALETTE.pink,
  PALETTE.teal,
  PALETTE.tan,
] as const

export function expertColor(index: number) {
  return EXPERT_COLORS[index % EXPERT_COLORS.length]
}

/** Written into paper.css by scripts/palette.mjs. */
export const CSS_VARS: [string, string][] = [
  ['paper', PALETTE.paper],
  ['paper-light', PALETTE.paperLight],
  ['paper-2', PALETTE.paperShade],
  ['ink', PALETTE.ink],
  ['graphite', PALETTE.graphite],
  ['stone', PALETTE.stone],
  ['orange', PALETTE.orange],
  ['orange-ink', PALETTE.orangeInk],
  ['blue', PALETTE.blue],
  ['blue-ink', PALETTE.blueInk],
  ['teal', PALETTE.teal],
  ['yellow', PALETTE.yellow],
  ['red', PALETTE.red],
  ['teal-2', PALETTE.teal2],
  ['teal-ink', PALETTE.tealInk],
  ['relate', PALETTE.relate],
  ['relate-ink', PALETTE.relateInk],
]
