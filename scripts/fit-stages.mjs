/**
 * Makes every beat's animation finish while the voice is still talking.
 *
 * ## Why
 *
 * `retime` fixed the other end of this -- a beat still on screen after it had
 * nothing left to say. This is the same fault one step earlier: a staged
 * reveal that *lands* after the narration has stopped, so the sentence ends
 * and then something moves in silence.
 *
 * Measured across Video 2, ten beats did that, for eleven seconds in total.
 * §1 beat 7 says "And o1 denied doing it" in two seconds and then animates
 * for another two and a half.
 *
 * ## The rule
 *
 *   last stage <= narration x LAND
 *
 * `LAND` is slightly under 1 so the last thing arrives a shade before the
 * voice finishes rather than exactly on the final word -- the picture should
 * complete *into* the end of the sentence, not race it.
 *
 * Offsets are scaled proportionally rather than clamped, so the rhythm a beat
 * was authored with survives: a reveal a third of the way through stays a
 * third of the way through.
 *
 * Narration is estimated at 150wpm here, faster than `retime`'s 140. That is
 * deliberate and it is the safe direction for this particular check: assuming
 * a *quicker* read gives a shorter narration, which pulls the animation
 * earlier. Being early is recoverable in the edit; being late is the thing
 * being fixed.
 *
 *   node scripts/fit-stages.mjs --dry
 *   VIDEO=apollo-o1/video-2 node scripts/fit-stages.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const VIDEO = process.env.VIDEO ?? 'apollo-o1/video-2'
const DRY = process.argv.includes('--dry')
const WPM = Number(process.env.WPM ?? 165)
/** How much of the narration has gone by when the last reveal lands. */
const LAND = 0.88
/** Below this a beat is too short to stage anything against. */
const FLOOR = 1.2

const dir = path.resolve(`src/videos/${VIDEO}`)
const sections = (await readdir(dir)).filter((d) => /^section-\d\d$/.test(d)).sort()

let fixed = 0
let saved = 0
const report = []

for (const sec of sections) {
  const file = path.join(dir, sec, 'beats.ts')
  let src = await readFile(file, 'utf8')
  const blocks = src.split('\n  {\n')

  for (let i = 1; i < blocks.length; i += 1) {
    const b = blocks[i]
    const n = b.match(/^ {4}n: (\d+),/)
    const id = b.match(/\n {4}id: '([^']*)',/)
    if (!n) continue

    const vo = b.match(/\n {4}vo: (['"])([\s\S]*?)\1,\n/)
    const words = vo ? vo[2].replace(/\*\*/g, '').split(/\s+/).filter(Boolean).length : 0
    const said = words / (WPM / 60)
    if (said < FLOOR) continue

    const offsets = [...b.matchAll(/\bat: (\d+)\b/g)].map((m) => Number(m[1]))
    if (!offsets.length) continue
    const last = Math.max(...offsets) / 1000
    const want = said * LAND
    if (last <= want + 0.05) continue

    /* Proportional, so the beat keeps the rhythm it was authored with. */
    const k = want / last
    let out = b
    for (const m of [...b.matchAll(/\bat: (\d+)\b/g)].reverse()) {
      const next = Math.max(200, Math.round((Number(m[1]) * k) / 50) * 50)
      out = out.slice(0, m.index) + `at: ${next}` + out.slice(m.index + m[0].length)
    }
    blocks[i] = out
    fixed += 1
    saved += last - want
    report.push(
      `§${sec.slice(-2)} b${String(n[1]).padStart(2)} ${id?.[1] ?? ''}` +
        `  last ${last.toFixed(1)}s -> ${want.toFixed(1)}s  (says ${said.toFixed(1)}s)`,
    )
  }

  src = blocks.join('\n  {\n')
  if (!DRY) await writeFile(file, src)
}

for (const line of report) console.log(line)
console.log(
  `\n${fixed} beat(s) had animation landing after the narration stopped` +
    ` — ${saved.toFixed(0)}s of it, now inside the read.`,
)
if (DRY) console.log('dry run — nothing written')
