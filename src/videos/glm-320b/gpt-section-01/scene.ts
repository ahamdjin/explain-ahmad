/** Coordinates share one 1600 × 900 stage. Every expert has one permanent key. */
export const CHOSEN = [41, 76, 103, 147, 168, 211, 245, 278] as const
export const EXPERTS = Array.from({ length: 288 }, (_, id) => id)
export type Point = { x: number; y: number; scale: number }
export const selectedIndex = (id: number) => (CHOSEN as readonly number[]).indexOf(id)
export function hospitalAt(beat: number): Point {
  return beat >= 18 && beat <= 24
    ? { x: 115, y: 280, scale: 0.65 }
    : { x: 570, y: 210, scale: 0.96 }
}
export function expertAt(id: number, beat: number): Point {
  const k = selectedIndex(id)
  if (k >= 0 && beat >= 19 && beat <= 24) {
    return { x: 1100 + (k % 4) * 62, y: 390 + Math.floor(k / 4) * 77, scale: 1.65 }
  }
  if (k >= 0 && beat >= 11 && beat <= 18) {
    return beat === 18
      ? { x: 760 + (k % 4) * 47, y: 400 + Math.floor(k / 4) * 65, scale: 1.4 }
      : { x: 195 + (k % 4) * 70, y: 335 + Math.floor(k / 4) * 90, scale: 2 }
  }
  const h = hospitalAt(beat)
  return { x: h.x + (65 + (id % 24) * 33) * h.scale, y: h.y + (145 + Math.floor(id / 24) * 21) * h.scale, scale: h.scale * 0.7 }
}
export function wordAt(beat: number): Point {
  if (beat >= 26) return { x: 1002, y: 610, scale: 0.15 }
  if (beat >= 25) return { x: 680, y: 670, scale: 1 }
  if (beat >= 18) return { x: 817, y: 180, scale: 0.8 }
  if (beat >= 11) return { x: 600, y: 749, scale: 0.85 }
  if (beat >= 9) return { x: 430, y: 625, scale: 0.85 }
  return { x: 170, y: 560, scale: 1 }
}
