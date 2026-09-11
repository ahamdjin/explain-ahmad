/**
 * The spatial-continuity gate. `skills/SPATIAL_CONTINUITY.md`.
 *
 * A beat with nothing happening on it is a caption with a duration, and a beat
 * that changes place without a camera move is a teleport that costs the viewer
 * the map they were building. Neither is visible when you read a script — both
 * are obvious when you read a board. So the board is checked.
 *
 *   npm run check:board
 *
 * Four rules:
 *   1. every beat in the script has a storyboard row
 *   2. every row says what happens
 *   3. a change of `where` has a camera move
 *   4. an unchanged `where` has no camera move
 */
import { readdir, readFile } from 'node:fs/promises'

const NONE = new Set(['', '—', '-', '–', 'none', 'hold', 'still'])
const isNone = (v) => NONE.has(v.trim().toLowerCase())

function beatNumbers(markdown) {
  const body = markdown.split('## The script')[1]?.split(/\n## Storyboard/)[0] ?? ''
  return [...body.matchAll(/^> \*\*(\d+)\.\*\*/gm)].map((m) => Number(m[1]))
}

function boardRows(markdown) {
  const block = markdown.split('## Storyboard')[1]?.split(/\n### |\n## /)[0] ?? ''
  const rows = []
  for (const line of block.split('\n')) {
    if (!line.trim().startsWith('|')) continue
    const cells = line.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.length < 5) continue
    if (!/^\d+$/.test(cells[0])) continue
    rows.push({ n: Number(cells[0]), where: cells[1], camera: cells[2], happens: cells[3], onScreen: cells[4], example: cells[5] ?? '' })
  }
  return rows
}

const files = (await readdir('video-script/video-1')).filter((f) => /^\d\d-.+\.md$/.test(f)).sort()
const problems = []
const journey = []
let checked = 0
let boarded = 0

for (const file of files) {
  const md = await readFile(`video-script/video-1/${file}`, 'utf8')
  const beats = beatNumbers(md)
  if (!beats.length) continue
  checked += 1
  const rows = boardRows(md)

  if (!rows.length) {
    problems.push(`${file}  no storyboard yet — ${beats.length} beats unboarded`)
    continue
  }
  boarded += 1

  const byBeat = new Map(rows.map((r) => [r.n, r]))
  for (const n of beats) {
    if (!byBeat.has(n)) problems.push(`${file}  beat ${n} has no storyboard row`)
  }
  for (const r of rows) {
    if (!beats.includes(r.n)) problems.push(`${file}  storyboard row ${r.n} has no such beat`)
    if (isNone(r.happens)) problems.push(`${file}  beat ${r.n} — nothing happens. A beat with no event is a caption`)
    if (isNone(r.where)) problems.push(`${file}  beat ${r.n} — no place. The viewer has to know where they are`)
  }

  /* Rules 3 and 4: place changes only by camera, and only when it changes. */
  const ordered = [...rows].sort((a, b) => a.n - b.n)
  for (let i = 1; i < ordered.length; i += 1) {
    const prev = ordered[i - 1]
    const cur = ordered[i]
    const moved = prev.where !== cur.where
    const hasCamera = !isNone(cur.camera)
    if (moved && !hasCamera) {
      problems.push(`${file}  beat ${cur.n} — "${prev.where}" → "${cur.where}" with no camera move. That is a teleport`)
    }
    if (!moved && hasCamera) {
      problems.push(`${file}  beat ${cur.n} — camera moves but the place is the same ("${cur.where}"). A camera that drifts for atmosphere destroys one that moves for a reason`)
    }
  }

  journey.push({ file, first: ordered[0], last: ordered[ordered.length - 1] })
}

/*
 * Rule 5: the same two rules, across a section boundary.
 *
 * A per-section check cannot see this, and it is where a teleport is most
 * likely -- a new script starts and quietly assumes a new place. The video is
 * one continuous space or it is a slideshow.
 */
for (let i = 1; i < journey.length; i += 1) {
  const prev = journey[i - 1].last
  const cur = journey[i].first
  const moved = prev.where !== cur.where
  const hasCamera = !isNone(cur.camera)
  if (moved && !hasCamera) {
    problems.push(`${journey[i].file}  beat ${cur.n} — the previous section left us at "${prev.where}" and this one opens at "${cur.where}" with no camera move. A section break is not permission to teleport`)
  }
  if (!moved && hasCamera) {
    problems.push(`${journey[i].file}  beat ${cur.n} — camera moves but the previous section already left us at "${cur.where}"`)
  }
}

console.log(`${boarded} of ${checked} sections boarded.\n`)
if (problems.length) {
  console.error(`${problems.length} problem(s):\n`)
  for (const p of problems) console.error(`  ! ${p}`)
  process.exit(1)
}
console.log('Every beat has a place and an event, and every change of place is a camera move.\n')
console.log('The journey:')
let seen = null
for (const { file, first, last } of journey) {
  void last
  if (first.where !== seen) {
    const cam = first.camera.replace(/\*/g, '')
    console.log(`  §${file.slice(0, 2)}  ${(isNone(cam) ? '(continues)' : cam).padEnd(12)} → ${first.where}`)
    seen = first.where
  }
}
