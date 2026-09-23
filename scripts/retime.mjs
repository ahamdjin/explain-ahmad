/**
 * Retimes beats so a hold is as long as the beat needs and no longer.
 *
 * ## Why
 *
 * `secs` was authored by feel, beat by beat, and drifted. Measured against
 * what each beat actually does -- its narration and its last staged reveal --
 * 2m19s of Video 2's 11m03s was silence *after* both had finished. A fifth of
 * the film was a still frame with nothing left to say, and §1, where viewers
 * decide whether to stay, was the worst of it.
 *
 * ## The rule
 *
 *   secs = min(authored, max(narration, last stage + 0.8s settle) + pad(relation))
 *
 * **It only ever shortens.** Run unclamped it wanted to take the film from
 * 11:03 to 12:27, because the padding is not uniform: about as many beats are
 * too *short* for their narration as are too long. Those are a different
 * fault -- a rushed read, not a dead frame -- and lengthening them silently
 * would trade the problem that was asked about for one that was not. They are
 * reported instead, and settled when the voice-over is actually recorded.
 *
 * Narration is estimated at 140wpm rather than 150: the voice-over is not
 * recorded yet, and a beat that is slightly too long can be trimmed in the
 * edit while one that is too short clips the read.
 *
 * `pad` is the breath after the point lands, and it is the one part that is a
 * judgement rather than a measurement -- a `wall` needs the silence, a `so`
 * is carrying you onward and should not dawdle.
 *
 *   node scripts/retime.mjs --dry            # report only
 *   VIDEO=apollo-o1/video-2 node scripts/retime.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const VIDEO = process.env.VIDEO ?? 'apollo-o1/video-2'
const DRY = process.argv.includes('--dry')
const WPM = 140
const SETTLE = 0.8
/** The breath after the point has landed. A wall earns one; a `so` does not. */
const PAD = { wall: 1.8, 'and-yet': 1.3, hope: 1.0, want: 0.9, therefore: 0.9, so: 0.7 }
const FLOOR = 2.5

const dir = path.resolve(`src/videos/${VIDEO}`)
const sections = (await readdir(dir)).filter((d) => /^section-\d\d$/.test(d)).sort()

let before = 0
let after = 0
const changes = []
/** Beats whose narration does not fit the hold. Reported, never changed. */
const short = []

for (const sec of sections) {
  const file = path.join(dir, sec, 'beats.ts')
  let src = await readFile(file, 'utf8')
  const blocks = src.split('\n  {\n')
  for (let i = 1; i < blocks.length; i += 1) {
    const b = blocks[i]
    const n = b.match(/^ {4}n: (\d+),/)
    const secsM = b.match(/\n {4}secs: ([\d.]+),/)
    if (!n || !secsM) continue
    const vo = b.match(/\n {4}vo: (['"])([\s\S]*?)\1,\n/)
    const rel = b.match(/\n {4}relation: '([^']+)',/)?.[1] ?? 'so'
    const words = vo ? vo[2].replace(/\*\*/g, '').split(/\s+/).filter(Boolean).length : 0
    const said = words / (WPM / 60)
    const stages = [...b.matchAll(/\bat: (\d+)\b/g)].map((m) => Number(m[1]) / 1000)
    const last = stages.length ? Math.max(...stages) : 0
    const need = Math.max(FLOOR, Math.round((Math.max(said, last + SETTLE) + (PAD[rel] ?? 0.8)) * 10) / 10)
    const had = Number(secsM[1])
    /* Trim only. A beat that is too short for its read is a separate fault. */
    const want = Math.min(had, need)
    before += had
    after += want
    if (need > had) short.push(`§${sec.slice(-2)} b${String(n[1]).padStart(2, '0')}  holds ${had}s, read needs ${need}s`)
    if (want !== had) {
      changes.push(`§${sec.slice(-2)} b${String(n[1]).padStart(2, '0')}  ${had}s -> ${want}s  (${rel}, ${words}w, last ${last}s)`)
      blocks[i] = b.replace(/\n {4}secs: [\d.]+,/, `\n    secs: ${want},`)
    }
  }
  src = blocks.join('\n  {\n')
  if (!DRY) await writeFile(file, src)
}

for (const c of changes) console.log(c)
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`
if (short.length) {
  console.log(`\n${short.length} beat(s) hold less time than the read needs at ${WPM}wpm:`)
  for (const w of short) console.log(`  ${w}`)
}
console.log(`\n${changes.length} beat(s) retimed.  ${fmt(before)} -> ${fmt(after)}  (${fmt(before - after)} removed)`)
if (DRY) console.log('dry run — nothing written')
