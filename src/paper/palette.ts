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
]
