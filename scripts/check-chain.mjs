/**
 * Gate 1 and Gate 3, automated.
 *
 * A section that asks the same question at the end that it asked at the
 * beginning has no story, and a chain whose links do not actually meet is a
 * list wearing a chain's clothes. Both are invisible to every other check in
 * this repo, and both were shipped five times before anyone noticed.
 *
 * Reads the contract table at the top of each video-script section and asserts:
 *   - Exits on  !=  Enters on            (Gate 1 -- no circularity)
 *   - Enters on ==  previous Exits on    (Gate 5 -- the link is real)
 *   - an Event is declared               (Gate 2 -- something happens)
 *
 * Run: node scripts/check-chain.mjs
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const DIR = 'video-script'
/** The chain, in order. Add a section here when its script is written. */
const CHAIN = [
  '01-the-claim.md',
  '02-follow-one-word.md',
  '03-the-word-becomes-numbers.md',
  '04-where-the-numbers-change.md',
  '05-new-numbers-new-team.md',
  '06-forty-two-floors.md',
  '07-the-answer.md',
  '08-the-verdict.md',
]

/** Compare on meaning, not on punctuation: quotes and dashes drift. */
function normalise(value) {
  return value
    .toLowerCase()
    .replace(/[‘’“”"']/g, '')
    .replace(/[—–-]/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function field(source, name) {
  const row = source.match(new RegExp(`^\\|\\s*\\*{0,2}${name}\\*{0,2}\\s*\\|(.+?)\\|\\s*$`, 'mi'))
  return row ? row[1].replace(/\*+/g, '').trim() : null
}

const present = new Set(await readdir(DIR))
const rows = []

for (const file of CHAIN) {
  if (!present.has(file)) {
    rows.push({ file, missing: true })
    continue
  }
  const source = await readFile(path.join(DIR, file), 'utf8')
  rows.push({
    file,
    enters: field(source, 'Enters on'),
    answers: field(source, 'Answers'),
    event: field(source, 'Event'),
    exits: field(source, 'Exits on'),
  })
}

const problems = []

rows.forEach((row, index) => {
  if (row.missing) {
    problems.push(`${row.file}: no script yet`)
    return
  }
  const where = row.file

  for (const [name, value] of [['Enters on', row.enters], ['Exits on', row.exits], ['Event', row.event]]) {
    if (!value) problems.push(`${where}: no "${name}" in the contract table`)
  }

  // Gate 1 -- the section must not end where it started.
  if (row.enters && row.exits && normalise(row.enters) === normalise(row.exits)) {
    problems.push(`${where}: GATE 1 -- exits on the same question it enters on`)
  }

  // Gate 2 -- something has to happen.
  if (row.event && /^(none|nothing|n\/a)\b/i.test(row.event)) {
    problems.push(`${where}: GATE 2 -- no event declared`)
  }

  // Gate 5 -- the link must actually meet.
  const previous = rows[index - 1]
  if (previous && !previous.missing && previous.exits && row.enters) {
    const terminal = /^none\b/i.test(previous.exits)
    if (!terminal && normalise(previous.exits) !== normalise(row.enters)) {
      problems.push(
        `${where}: GATE 5 -- enters on a question ${previous.file} does not hand over\n` +
          `      ${previous.file} exits: ${previous.exits}\n` +
          `      ${where} enters: ${row.enters}`,
      )
    }
  }
})

const width = Math.max(...rows.map((row) => row.file.length))
console.log('\nquestion chain\n')
for (const row of rows) {
  if (row.missing) {
    console.log(`  ${row.file.padEnd(width)}  (no script)`)
    continue
  }
  console.log(`  ${row.file.padEnd(width)}  ${row.enters ?? '?'}`)
  console.log(`  ${' '.repeat(width)}    -> ${row.exits ?? '?'}`)
}

if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n`)
  for (const problem of problems) console.log(`  x ${problem}`)
  process.exit(1)
}

console.log(`\nOK - ${rows.length} sections, every link meets, no section is circular.\n`)
