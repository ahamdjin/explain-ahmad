/**
 * Rewrites the `(beats N–M, M:SS–M:SS)` stamps in a script's act headings from
 * the built beats, and reports the script's real runtime.
 *
 *   node scripts/restamp.mjs 01
 *
 * This exists because §1 v10's headings claimed the promise landed at 0:26
 * while the code put it at 0:40, and a reviewer caught it rather than a gate.
 * Hand-written timestamps drift the moment a beat is retimed, and a script
 * that misreports its own pacing is worse than one with no stamps: the whole
 * point of S-03 is a deadline, and it cannot be checked against a guess.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { readdir } from 'node:fs/promises'

const sec = String(process.argv[2] ?? '01').padStart(2, '0')
const beatsPath = `src/videos/glm-320b/video-1/section-${sec}/beats.ts`
const src = await readFile(beatsPath, 'utf8')
const secs = [...src.matchAll(/secs: ([\d.]+),/g)].map((m) => Number(m[1]))
if (!secs.length) {
  console.error(`No beats found in ${beatsPath}`)
  process.exit(1)
}

/** Cumulative start time of each beat, 1-indexed. */
const starts = []
let t = 0
for (const d of secs) {
  starts.push(t)
  t += d
}
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`

const file = (await readdir('video-script/video-1')).find((f) => f.startsWith(`${sec}-`))
const path = `video-script/video-1/${file}`
let md = await readFile(path, 'utf8')

let changed = 0
md = md.replace(/\(beats? (\d+)(?:[–-](\d+))?, \d+:\d\d[–-]\d+:\d\d\)/g, (whole, a, b) => {
  const from = Number(a)
  const to = Number(b ?? a)
  if (!starts[from - 1] && from !== 1) return whole
  const open = clock(starts[from - 1])
  const close = clock(starts[to - 1] + secs[to - 1])
  const label = b ? `beats ${a}–${b}` : `beat ${a}`
  changed += 1
  return `(${label}, ${open}–${close})`
})

await writeFile(path, md, 'utf8')
console.log(`${path} — ${changed} stamp(s) rewritten from the code`)
console.log(`  §${sec}: ${secs.length} beats, runtime ${clock(t)}`)
for (const [i, s] of starts.entries()) {
  if (i < 8) console.log(`    beat ${String(i + 1).padStart(2)} starts ${clock(s)}`)
}
