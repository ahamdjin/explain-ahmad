/**
 * Checks that every beat's declared prerequisite actually exists, earlier.
 *
 * ## The rule
 *
 * `skills/BEAT_GRANULARITY.md` rule 5:
 *
 * > **Name the prerequisite.** For each beat, write down *which earlier beat
 * > makes this one understandable.* If you can't, it's too early.
 *
 * It is the rule that catches a beat arriving before the thing it depends on
 * — the single most common way a section that reads fine on paper teaches
 * nothing on screen. It was written as a comment convention, and comments
 * cannot be checked, so it was not followed: 59 of Video 2's 107 beats named
 * no prerequisite in any form.
 *
 * ## What it checks
 *
 * A beat may declare `needs: 'some-beat-id'`, or `needs: '§04:off'` to point
 * at another section. This verifies that:
 *
 *   - the id resolves to a real beat
 *   - that beat comes **earlier** in the film, never later or itself
 *
 * A beat with no `needs` is taken to depend on the beat immediately before it,
 * which is the ordinary case and is not worth restating 107 times. So this
 * does not demand an annotation everywhere — it makes the ones that *are*
 * written verifiable, and `--report` lists the beats reaching further back
 * than their neighbour without saying so.
 *
 * What it cannot check is whether a declared prerequisite is the *right* one.
 * That stays a human judgement; this only guarantees the claim is not broken.
 *
 *   node scripts/check-prereq.mjs
 *   VIDEO=apollo-o1/video-2 node scripts/check-prereq.mjs --report
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const VIDEO = process.env.VIDEO ?? 'apollo-o1/video-2'
const REPORT = process.argv.includes('--report')

const dir = path.resolve(`src/videos/${VIDEO}`)
const sections = (await readdir(dir)).filter((d) => /^section-\d\d$/.test(d)).sort()

/** Every beat in film order, so "earlier" means earlier in the film. */
const order = []
const byKey = new Map()

for (const sec of sections) {
  const src = await readFile(path.join(dir, sec, 'beats.ts'), 'utf8')
  for (const block of src.split('\n  {\n').slice(1)) {
    const n = block.match(/^ {4}n: (\d+),/)
    const id = block.match(/\n {4}id: '([^']*)',/)
    if (!n || !id) continue
    const needs = block.match(/\n {4}needs: '([^']*)',/)
    const head = block.split('commands:')[0]
    const beat = {
      section: sec.slice(-2),
      n: Number(n[1]),
      id: id[1],
      needs: needs?.[1] ?? null,
      /* Does the prose reach backwards? Used only by --report. */
      looksBack: /§\d|beat \d|earlier|already|carried|returns|established|same .*? as/.test(head),
      index: order.length,
    }
    order.push(beat)
    byKey.set(`${beat.section}:${beat.id}`, beat)
  }
}

const problems = []

for (const beat of order) {
  if (!beat.needs) continue
  const cross = beat.needs.match(/^§(\d\d):(.+)$/)
  const key = cross ? `${cross[1]}:${cross[2]}` : `${beat.section}:${beat.needs}`
  const target = byKey.get(key)
  const where = `§${beat.section} b${String(beat.n).padStart(2, '0')} ${beat.id}`
  if (!target) {
    problems.push(`${where}\n     needs '${beat.needs}' — no beat with that id`)
    continue
  }
  if (target.index >= beat.index) {
    problems.push(
      `${where}\n     needs '${beat.needs}' — that beat comes ${
        target.index === beat.index ? 'is itself' : 'later in the film'
      }`,
    )
  }
}

if (REPORT) {
  /* Beats whose prose already reaches back but which never say to what. These
     are the candidates for a `needs`, ranked by nothing — just listed. */
  const undeclared = order.filter((b) => !b.needs && b.looksBack)
  console.log(`${order.length} beat(s). ${order.filter((b) => b.needs).length} declare a prerequisite.`)
  console.log(`${undeclared.length} refer to earlier material in prose without declaring it:\n`)
  let last = ''
  for (const b of undeclared) {
    if (b.section !== last) {
      console.log(`  §${b.section}`)
      last = b.section
    }
    console.log(`    b${String(b.n).padStart(2, '0')}  ${b.id}`)
  }
  console.log()
}

if (!problems.length) {
  const declared = order.filter((b) => b.needs).length
  console.log(`Every declared prerequisite resolves to an earlier beat. ${declared} of ${order.length} declared.`)
  process.exit(0)
}

for (const p of problems) console.log(p)
console.log(`\n${problems.length} broken prerequisite(s).`)
process.exit(1)
