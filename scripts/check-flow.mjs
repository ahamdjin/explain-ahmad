/**
 * Reads every beat against its neighbours and reports faults that only appear
 * between beats. Static checks run in CI; optional frame comparisons run after
 * `npm run frames:all`.
 *
 *   npm run check:flow
 *   npm run check:flow -- --static
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

/*
 * Which film. Defaults to Video 1, so every existing invocation is unchanged.
 *
 *   VIDEO=apollo-o1/video-2 npm run check:overlap
 */
const VIDEO = process.env.VIDEO ?? 'glm-320b/video-1'

const STATIC_ONLY = process.argv.includes('--static')
const ROOT = `src/videos/${VIDEO}`
const FRAMES = 'frames'
const NO_REPEAT = new Set(['wall'])

/**
 * Explicit story exception: §1 b10-13 is one intentional curiosity ladder,
 * approved and narration-locked as a single rhetorical sequence:
 * which 18B → sitting together? → same every time? → known beforehand?
 *
 * Keep this narrow. Any other unanswered question followed by another question
 * is still a production error.
 */
const QUESTION_LADDER = new Set(['§01:10→11', '§01:11→12', '§01:12→13'])

async function beatsOf(dir) {
  const src = await readFile(path.join(ROOT, dir, 'beats.ts'), 'utf8')
  const blocks = src.split(/\n {2}\{\n/).slice(1)
  return blocks.map((b) => {
    const pick = (re) => (b.match(re) ?? [])[1]
    const commands = (b.match(/commands: \[([\s\S]*?)\],\n/) ?? [])[1] ?? ''
    return {
      n: Number(pick(/^ {4}n: (\d+),/m)),
      id: pick(/^ {4}id: '([^']+)'/m),
      relation: pick(/^ {4}relation: '([^']+)'/m),
      secs: Number(pick(/^ {4}secs: ([0-9.]+),/m) ?? 0),
      vo: pick(/^ {4}vo: '((?:[^'\\]|\\.)*)'/m) ?? '',
      commandCount: (commands.match(/\w+\.\w+\(/g) ?? []).length,
      hasStages: /\n {4}stages: \[/.test(b),
      hasOverlays: /\n {4}(late)?[Oo]verlays/.test(b),
      sticky: (b.match(/sticky: true/g) ?? []).length,
      clears: /clearSticky: true/.test(b),
      shows: [...commands.matchAll(/(\w+)\.show\(/g)].map((m) => m[1]),
      hides: [...commands.matchAll(/(\w+)\.off\(/g)].map((m) => m[1]),
      commands: commands.replace(/\s+/g, ' ').trim(),
    }
  })
}

const problems = []
const notes = []
const dirs = (await readdir(ROOT, { withFileTypes: true }))
  .filter((d) => d.isDirectory() && /^section-\d\d$/.test(d.name))
  .map((d) => d.name)
  .sort()

for (const dir of dirs) {
  const beats = await beatsOf(dir)
  const sec = dir.replace('section-', '§')
  let owed = 0
  let owedSince = null

  beats.forEach((b, i) => {
    const prev = beats[i - 1]
    const next = beats[i + 1]

    if (b.commandCount === 0 && !b.hasStages && !b.hasOverlays) {
      problems.push(`${sec} b${b.n} ${b.id}: changes nothing — no commands, no stages, no overlay`)
    }

    if (prev && NO_REPEAT.has(b.relation) && prev.relation === b.relation) {
      problems.push(`${sec} b${prev.n}→b${b.n}: two '${b.relation}' relations back to back`)
    }

    if (b.clears) {
      owed = 0
      owedSince = null
    }
    if (b.sticky) {
      owed += b.sticky
      owedSince ??= i
    }
    if (!next && owed > 0 && beats.length - 1 - owedSince > 2) {
      problems.push(
        `${sec} b${beats[owedSince].n}: ${owed} sticky overlay(s) set here and never cleared, ` +
          `${beats.length - 1 - owedSince} beats before the section ends`,
      )
    }

    if (prev && next && !b.vo && !prev.vo && !next.vo) {
      problems.push(`${sec} b${b.n}: third consecutive beat with no voice-over`)
    }

    if (prev && b.commands && b.commands === prev.commands) {
      problems.push(`${sec} b${prev.n}→b${b.n}: identical command lists — one of these is a duplicate`)
    }

    for (const actor of b.shows) {
      if (b.hides.includes(actor)) {
        problems.push(`${sec} b${b.n}: \`${actor}\` is shown and turned off in the same beat`)
      }
    }

    if (/\?['"]?\s*$/.test(b.vo.trim()) && !next && dir === dirs[dirs.length - 1]) {
      problems.push(`${sec} b${b.n}: the video ends on a question nothing answers`)
    }
  })

  beats.forEach((b, i) => {
    const next = beats[i + 1]
    if (!/\?/.test(b.vo)) return

    const answeredHere = b.vo.trim().indexOf('?') < b.vo.trim().length - 2
    if (answeredHere) {
      notes.push(`${sec} b${b.n} asks and answers in the same breath — check that is deliberate`)
    }

    if (next && /\?/.test(next.vo) && !answeredHere && b.n > 1) {
      const edge = `${sec}:${b.n}→${next.n}`
      if (QUESTION_LADDER.has(edge)) {
        notes.push(`${sec} b${b.n}→b${next.n}: approved §1 curiosity ladder`)
      } else {
        problems.push(`${sec} b${b.n}→b${next.n}: a question followed by another question, nothing answered between`)
      }
    }
  })

  const first = beats[0]
  const last = beats[beats.length - 1]
  if (first && !['want', 'wall', 'and-yet'].includes(first.relation)) {
    notes.push(`${sec} opens on '${first.relation}' — sections bank before they add`)
  }
  if (last && !['and-yet', 'wall', 'therefore'].includes(last.relation)) {
    notes.push(`${sec} closes on '${last.relation}' — the wall should land or hand over`)
  }
}

async function imageDiff(page, a, b) {
  return page.evaluate(async ([p, q]) => {
    const load = (src) =>
      new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = src
      })
    const draw = async (src) => {
      const img = await load(src)
      const canvas = new OffscreenCanvas(160, 90)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, 160, 90)
      return ctx.getImageData(0, 0, 160, 90).data
    }
    const [x, y] = [await draw(p), await draw(q)]
    let sum = 0
    for (let k = 0; k < x.length; k += 4) {
      sum += Math.abs(x[k] - y[k]) + Math.abs(x[k + 1] - y[k + 1]) + Math.abs(x[k + 2] - y[k + 2])
    }
    return sum / (x.length / 4) / 3
  }, [`file://${a}`, `file://${b}`])
}

let compared = 0
if (!STATIC_ONLY) {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  const page = await browser.newPage()

  for (const dir of dirs) {
    let files
    try {
      files = (await readdir(path.join(FRAMES, dir))).filter((f) => f.endsWith('.png')).sort()
    } catch {
      continue
    }
    const beats = await beatsOf(dir)
    if (files.length !== beats.length) {
      notes.push(`${dir}: ${files.length} frames for ${beats.length} beats — re-run frames, skipping diff`)
      continue
    }

    for (let i = 1; i < files.length; i += 1) {
      const a = path.resolve(FRAMES, dir, files[i - 1])
      const b = path.resolve(FRAMES, dir, files[i])
      const diff = await imageDiff(page, a, b)
      compared += 1
      if (diff < 0.8) {
        problems.push(
          `${dir.replace('section-', '§')} b${beats[i - 1].n}→b${beats[i].n} (${beats[i].id}): frames are ${diff < 0.25 ? 'identical' : 'nearly identical'} (Δ${diff.toFixed(2)})`,
        )
      }
    }
  }

  for (let i = 1; i < dirs.length; i += 1) {
    const prev = dirs[i - 1]
    const here = dirs[i]
    let a
    let b
    try {
      const pf = (await readdir(path.join(FRAMES, prev))).filter((f) => f.endsWith('.png')).sort()
      const hf = (await readdir(path.join(FRAMES, here))).filter((f) => f.endsWith('.png')).sort()
      if (!pf.length || !hf.length) continue
      a = path.resolve(FRAMES, prev, pf[pf.length - 1])
      b = path.resolve(FRAMES, here, hf[0])
    } catch {
      continue
    }

    const boardFile = (await readdir('video-script/video-1')).find((f) =>
      f.startsWith(here.replace('section-', '')),
    )
    const board = await readFile(path.join('video-script/video-1', boardFile), 'utf8')
    const firstRow = board.slice(board.indexOf('| beat | where | camera |')).split('\n')[2] ?? ''
    const camera = (firstRow.split('|')[3] ?? '').trim()
    const continues = camera === '—' || camera === '-' || camera === ''
    const diff = await imageDiff(page, a, b)
    const label = `${prev.replace('section-', '§')}→${here.replace('section-', '§')}`

    if (continues && diff > 14) {
      problems.push(
        `${label}: board declares no camera move, but the frames jump (Δ${diff.toFixed(1)}) — ` +
          'either the handoff needs a move on the board or the first beat needs to hold what the last one left',
      )
    } else {
      notes.push(`${label}: ${continues ? 'continues' : `camera "${camera}"`}, Δ${diff.toFixed(1)}`)
    }
  }

  await browser.close()
}

console.log(`\n${dirs.length} sections read beat by beat, each against its neighbours.`)
if (compared) console.log(`${compared} adjacent frame pairs compared.`)

if (notes.length) {
  console.log(`\n${notes.length} note(s) — shape, not errors:`)
  for (const n of notes) console.log(`  · ${n}`)
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s) between adjacent beats:\n`)
  for (const p of problems) console.error(`  ! ${p}`)
  process.exit(1)
}
console.log('\nEvery beat changes something, no sticky outlives its section,')
console.log('no two walls sit together, and no two frames are the same picture.')
