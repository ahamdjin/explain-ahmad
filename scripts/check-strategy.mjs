/**
 * Every beat must cite a named strategy, and every cited strategy must exist
 * in `skills/STRATEGY_LEDGER.md` with a teacher and an evidence tier.
 *
 * Ahmad's rule, which is why this gate exists:
 *
 *   "Tell me from which teacher you read that this will work? The strategy
 *    name that is used in the video. or in the section or in the beat."
 *
 * A technique with no named teacher is a preference. This gate cannot tell a
 * good strategy from a bad one -- what it can do is stop an unsourced one from
 * passing as research, and report how much of the video rests on tier C, which
 * is the tier meaning "I inferred this and have no source".
 *
 *   npm run check:strategy
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const LEDGER = 'skills/STRATEGY_LEDGER.md'
const SCRIPTS = 'video-script/video-1'

/* ---- the ledger is the authority for which IDs exist ---- */
const ledger = await readFile(LEDGER, 'utf8')
const strategies = new Map()
for (const m of ledger.matchAll(/^### (S-\d+) · ([^·\n]+?) · \*\*tier ([ABC])/gm)) {
  strategies.set(m[1], { name: m[2].trim(), tier: m[3] })
}
if (!strategies.size) {
  console.error(`No strategies parsed out of ${LEDGER}. Has its heading format changed?`)
  process.exit(1)
}

/* ---- every script's storyboard table ---- */
const files = (await readdir(SCRIPTS)).filter((f) => /^\d\d-/.test(f)).sort()
const problems = []
const covered = []
const uncovered = []
const usage = new Map()

for (const file of files) {
  const text = await readFile(path.join(SCRIPTS, file), 'utf8')
  const header = text.match(/^\|([^\n]*\bStrategy\b[^\n]*)\|\s*$/im)
  if (!header) {
    uncovered.push(file)
    continue
  }
  /* which column is it? */
  const cols = header[1].split('|').map((c) => c.trim().toLowerCase())
  const at = cols.findIndex((c) => c === 'strategy')

  /* Only the storyboard block. Several scripts carry a second table further
   * down -- a beat-purpose table -- whose rows also start with a number, and
   * reading those was reporting beats as uncited that do not exist. */
  const block = text.split('## Storyboard')[1]?.split(/\n#{2,3} /)[0] ?? ''
  const rows = [...block.matchAll(/^\|\s*(\d+)\s*\|(.+)\|\s*$/gm)]
  if (!rows.length) {
    problems.push(`${file} — has a Strategy column but no numbered beat rows`)
    continue
  }
  let cited = 0
  for (const row of rows) {
    const cells = row[2].split('|').map((c) => c.trim())
    const cell = cells[at - 1] ?? ''
    const ids = [...cell.matchAll(/S-\d+/g)].map((m) => m[0])
    if (!ids.length) {
      problems.push(`${file} — beat ${row[1]} cites no strategy`)
      continue
    }
    for (const id of ids) {
      if (!strategies.has(id)) {
        problems.push(`${file} — beat ${row[1]} cites ${id}, which is not in the ledger`)
        continue
      }
      usage.set(id, (usage.get(id) ?? 0) + 1)
      cited++
    }
  }
  covered.push(`${file} — ${cited} beats cited`)
}

/* ---- report ---- */
console.log(`\n${strategies.size} strategies in the ledger:`)
const byTier = { A: [], B: [], C: [] }
for (const [id, s] of strategies) byTier[s.tier].push(`${id} ${s.name}`)
for (const tier of ['A', 'B', 'C']) {
  const label = { A: 'primary source, read directly', B: 'trade source, no study seen', C: 'inferred, no source' }[tier]
  console.log(`  tier ${tier} (${label}): ${byTier[tier].length}`)
  for (const s of byTier[tier]) console.log(`      ${s}`)
}

if (covered.length) {
  console.log('\nScripts citing strategies per beat:')
  for (const c of covered) console.log(`  ok  ${c}`)
}
if (uncovered.length) {
  console.log('\nScripts with no Strategy column yet:')
  for (const u of uncovered) console.log(`  --  ${u}`)
}

if (usage.size) {
  console.log('\nStrategy usage across cited beats:')
  const sorted = [...usage].sort((a, b) => b[1] - a[1])
  let cTier = 0
  let total = 0
  for (const [id, n] of sorted) {
    const s = strategies.get(id)
    console.log(`  ${id}  tier ${s.tier}  ${String(n).padStart(3)} beats   ${s.name}`)
    total += n
    if (s.tier === 'C') cTier += n
  }
  const pct = Math.round((cTier / total) * 100)
  console.log(`\n  ${cTier} of ${total} cited beats (${pct}%) rest on a tier-C strategy — inferred, no source.`)
  if (pct > 25) console.log('  That is high. A quarter of the teaching resting on my own guesses needs a real source or a cut.')
}

/* Unused tier-A strategies are a missed opportunity, not a failure. */
const unusedA = [...strategies].filter(([id, s]) => s.tier === 'A' && !usage.has(id))
if (unusedA.length && covered.length) {
  console.log('\nTier-A strategies nothing uses yet:')
  for (const [id, s] of unusedA) console.log(`      ${id} ${s.name}`)
}

if (problems.length) {
  console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:`)
  for (const p of problems) console.log(`  !  ${p}`)
  process.exit(1)
}

console.log(`\nEvery beat with a Strategy column cites a strategy that exists and has a teacher.`)
if (uncovered.length) {
  console.log(`${uncovered.length} of ${files.length} scripts still need one.\n`)
}
