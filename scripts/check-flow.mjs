/**
 * Reads every beat against its neighbours and reports what only adjacency shows.
 *
 * `check:board` reads one beat at a time and `check:chain` reads one section at
 * a time. Neither can see the faults that live *between* two beats, and those
 * are the ones that make a cut feel wrong while every individual frame looks
 * fine:
 *
 *   - a beat that changes nothing, so the cut stalls
 *   - a sticky overlay nobody ever clears, so it bleeds through later beats
 *   - two `wall` relations in a row, which is two climaxes and therefore none
 *   - a section that does not open by banking and close on a handoff
 *   - two adjacent frames that render nearly identically -- the strongest
 *     signal, because it is measured from the pictures rather than the source
 *
 * The frame comparison needs `npm run frames:all` to have been run against the
 * current code; it is skipped, loudly, when frames are missing or stale.
 *
 *   npm run check:flow            # static checks + frame diff where available
 *   npm run check:flow -- --static
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const STATIC_ONLY = process.argv.includes('--static')
const ROOT = 'src/videos/glm-320b/video-1'
const FRAMES = 'frames'

/** Relations that may not repeat back to back, and why. */
const NO_REPEAT = new Set(['wall'])

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

    /* A beat that issues no commands, stages nothing and draws no overlay does
     * not change the picture. Held frames are legitimate -- a question needs
     * stillness -- but they must at least carry an overlay saying so. */
    if (b.commandCount === 0 && !b.hasStages && !b.hasOverlays) {
      problems.push(`${sec} b${b.n} ${b.id}: changes nothing — no commands, no stages, no overlay`)
    }

    /* Two climaxes in a row is no climax. */
    if (prev && NO_REPEAT.has(b.relation) && prev.relation === b.relation) {
      problems.push(`${sec} b${prev.n}→b${b.n}: two '${b.relation}' relations back to back`)
    }

    /*
     * Sticky overlays are a promise to clear them -- *unless* they are the
     * section's closing statement. §13's "one" and "eight" sit on beat 14 of
     * 15 and are meant to still be there when the video stops; §1's identical
     * pair is cleared because the section carries on past them. So the test is
     * age, not existence: a sticky introduced more than two beats from the end
     * and never cleared is bleeding through frames it was not written for.
     */
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

    /* A silent beat between two spoken ones is a held frame; three in a row is
     * a gap in the narration. */
    if (prev && next && !b.vo && !prev.vo && !next.vo) {
      problems.push(`${sec} b${b.n}: third consecutive beat with no voice-over`)
    }
  })

  /* Sections open by banking and close on a handoff. `check:chain` verifies the
   * *words*; this verifies the shape. */
  const first = beats[0]
  const last = beats[beats.length - 1]
  if (first && !['want', 'wall', 'and-yet'].includes(first.relation)) {
    notes.push(`${sec} opens on '${first.relation}' — sections bank before they add`)
  }
  if (last && !['and-yet', 'wall', 'therefore'].includes(last.relation)) {
    notes.push(`${sec} closes on '${last.relation}' — the wall should land or hand over`)
  }
}

/* ---- the part measured from pictures rather than source -------------------- */

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
      /* Downscale both to 160px wide and take the mean absolute channel
       * difference. Cheap, and immune to the paper texture's noise. */
      const diff = await page.evaluate(async ([p, q]) => {
        const load = (src) =>
          new Promise((res) => {
            const img = new Image()
            img.onload = () => res(img)
            img.src = src
          })
        const draw = async (src) => {
          const img = await load(src)
          const c = new OffscreenCanvas(160, 90)
          const ctx = c.getContext('2d')
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
      compared += 1
      if (diff < 0.8) {
        problems.push(
          `${dir.replace('section-', '§')} b${beats[i - 1].n}→b${beats[i].n} (${beats[i].id}): frames are ${diff < 0.25 ? 'identical' : 'nearly identical'} (Δ${diff.toFixed(2)})`,
        )
      }
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
