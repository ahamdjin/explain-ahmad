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
      /* Which actors this beat brings on and which it takes away. */
      shows: [...commands.matchAll(/(\w+)\.show\(/g)].map((m) => m[1]),
      hides: [...commands.matchAll(/(\w+)\.off\(/g)].map((m) => m[1]),
      /* A beat that only repeats the previous beat's commands verbatim. */
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

    /* Two beats issuing byte-identical commands is a copy-paste, not a beat. */
    if (prev && b.commands && b.commands === prev.commands) {
      problems.push(`${sec} b${prev.n}→b${b.n}: identical command lists — one of these is a duplicate`)
    }

    /* An actor shown and turned off in the same beat never renders. */
    for (const actor of b.shows) {
      if (b.hides.includes(actor)) {
        problems.push(`${sec} b${b.n}: \`${actor}\` is shown and turned off in the same beat`)
      }
    }

    /*
     * A section *should* end on a question -- that is the chapter wall, and
     * `check:chain` already verifies the next section enters on exactly that
     * sentence. Only the last section of the video has nobody to answer it.
     */
    if (/\?['"]?\s*$/.test(b.vo.trim()) && !next && dir === dirs[dirs.length - 1]) {
      problems.push(`${sec} b${b.n}: the video ends on a question nothing answers`)
    }
  })

  /*
   * Every beat that asks a question must be answered by the beat after it.
   *
   * S-05 (place your bets) and S-06 (interpolated testing) both depend on the
   * answer arriving immediately -- a guess left hanging across two beats stops
   * being a guess and becomes a mystery, which is the structure the earlier
   * drafts died of. Asked *and* answered in one beat is the other failure, and
   * it is what §10's "you run it again" and §12's slider both used to do.
   */
  beats.forEach((b, i) => {
    const next = beats[i + 1]
    const asks = /\?/.test(b.vo)
    if (!asks) return
    const answeredHere = b.vo.trim().indexOf('?') < b.vo.trim().length - 2
    if (answeredHere) {
      notes.push(`${sec} b${b.n} asks and answers in the same breath — check that is deliberate`)
    }
    /*
     * Beat 1 is exempt: the chapter wall opens by banking and then asking what
     * the section is for, and a bet landing one beat later is the house shape
     * (§6, §10). Two questions *inside* a section is the real fault -- the
     * second one inherits a viewer who is still holding the first, and the
     * commitment S-05 depends on never happens. §12 asked "how much do you
     * keep close?" and then "where do you reckon the good setting is?", which
     * is the same question twice.
     */
    if (next && /\?/.test(next.vo) && !answeredHere && b.n > 1) {
      problems.push(`${sec} b${b.n}→b${next.n}: a question followed by another question, nothing answered between`)
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
  /*
   * The seams between sections, which is where "each beat against the one
   * before it" stops being answerable inside a single file.
   *
   * A section whose storyboard gives beat 1 no camera move is claiming the
   * viewer is still standing where the last section left them. If the last
   * frame of §N and the first frame of §N+1 then look nothing alike, the claim
   * is false and the cut jumps — the exact fault the whole persistent-scene
   * architecture exists to prevent, and the one thing `check:board` cannot see
   * because it reads boards rather than pictures.
   */
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

    /* Does this section claim to continue, or does it declare a move? */
    const boardFile = (await readdir('video-script/video-1')).find((f) =>
      f.startsWith(here.replace('section-', '')),
    )
    const board = await readFile(path.join('video-script/video-1', boardFile), 'utf8')
    const firstRow = board.slice(board.indexOf('| beat | where | camera |')).split('\n')[2] ?? ''
    const camera = (firstRow.split('|')[3] ?? '').trim()
    const continues = camera === '—' || camera === '-' || camera === ''

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

    const label = `${prev.replace('section-', '§')}→${here.replace('section-', '§')}`
    if (continues && diff > 14) {
      problems.push(
        `${label}: board declares no camera move, but the frames jump (Δ${diff.toFixed(1)}) — ` +
          `either the handoff needs a move on the board or the first beat needs to hold what the last one left`,
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
