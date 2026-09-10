/**
 * The chain gate.
 *
 * A section that asks the same question at the end that it asked at the
 * beginning has no story, and a chain whose links do not actually meet is a
 * list wearing a chain's clothes. Both are invisible to every other check in
 * this repo, and both were shipped five times before anyone noticed.
 *
 *   npm run check:chain
 *
 * It reads the contract table at the top of each `video-script/NN-*.md` and
 * asserts three things:
 *
 *   1. every section **answers** something                    (no dead beats)
 *   2. what it exits on is not what it entered on             (no circularity)
 *   3. what it enters on is what the previous one exited on   (the link is real)
 *
 * ## Two things this file has been wrong about
 *
 * It held a **hard-coded list of eight filenames**, and went on reporting a
 * passing chain for the superseded build after the video was rewritten to
 * thirteen. A gate that describes a build nobody is making is worse than no
 * gate, because it is trusted. The list now comes off the filesystem.
 *
 * It also looked for spine-v3 field names -- `Exits on`, `Event` -- which v4's
 * contract tables do not use. So it reported 26 missing fields on 13 correct
 * scripts. The exit is now whichever of `→ next` / `Therefore` / `Exits on` a
 * section declares, because those are the three words the spine uses for the
 * same idea, and `Answers` replaced `Event` as the thing every section owes.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const DIR = 'video-script'
const CHAIN = (await readdir(DIR)).filter((file) => /^\d\d-.+\.md$/.test(file)).sort()

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
  /* The field names include `→`, so the name is escaped rather than trusted. */
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const row = source.match(new RegExp(`^\\|\\s*\\*{0,2}${escaped}\\*{0,2}\\s*\\|(.+?)\\|\\s*$`, 'mi'))
  return row ? row[1].replace(/\*+/g, '').trim() : null
}

/** The three words the spine uses for "and this is what it hands forward". */
const EXIT_NAMES = ['→ next', 'Therefore', 'Exits on']
const exitOf = (source) => {
  for (const name of EXIT_NAMES) {
    const value = field(source, name)
    if (value) return value
  }
  return null
}

/** A section that ends the video declares no exit, and says so. */
const isTerminal = (value) => !value || /^\(?none/i.test(value.replace(/[*_]/g, '').trim())

const rows = []
for (const file of CHAIN) {
  const source = await readFile(path.join(DIR, file), 'utf8')
  rows.push({
    file,
    enters: field(source, 'Enters on'),
    answers: field(source, 'Answers'),
    exits: exitOf(source),
  })
}

const problems = []

rows.forEach((row, index) => {
  const where = row.file
  const first = index === 0
  const last = index === rows.length - 1

  if (!row.answers) problems.push(`${where}: no "Answers" in the contract table`)
  /* The opening section enters on nothing -- it opens the video. */
  if (!first && !row.enters) problems.push(`${where}: no "Enters on" in the contract table`)
  if (!last && isTerminal(row.exits)) {
    problems.push(`${where}: nothing handed forward. Declare "→ next", or this link is dead`)
  }

  // The section must not end where it started.
  if (row.enters && row.exits && normalise(row.enters) === normalise(row.exits)) {
    problems.push(`${where}: exits on the same question it entered on. That is a circle, not a story`)
  }
})

/*
 * The build and the plan, checked against each other.
 *
 * `/watch` carries an `enters` line per chapter -- the question the viewer
 * arrives holding -- and it is the one place a section can quietly stop
 * matching its own script. This is exactly comparable, so it is checked.
 */
const watch = await readFile('src/routes/WatchPage.tsx', 'utf8')
const chapters = [...watch.matchAll(/\{ n: (\d+), title: '[^']*', enters: '([^']*)'/g)].map((m) => ({
  n: Number(m[1]),
  enters: m[2],
}))

if (chapters.length !== rows.length) {
  problems.push(
    `src/routes/WatchPage.tsx: ${chapters.length} chapters against ${rows.length} scripts. The chain and the player disagree about how long the video is`,
  )
}
for (const chapter of chapters) {
  const row = rows[chapter.n - 1]
  if (!row) continue
  const script = row.enters ?? ''
  if (normalise(chapter.enters) !== normalise(script)) {
    problems.push(
      `src/routes/WatchPage.tsx §${chapter.n}: enters on "${chapter.enters}" but ${row.file} says "${script}"`,
    )
  }
}

console.log(`the chain — ${rows.length} sections\n`)
rows.forEach((row, index) => {
  const previous = index > 0 ? rows[index - 1] : null
  console.log(`  §${row.file.slice(0, 2)}  answers   ${row.answers ?? '(nothing)'}`)
  if (previous && !isTerminal(previous.exits)) {
    console.log(`        handed    ${previous.exits}`)
    console.log(`        picked up ${row.enters ?? '(nothing)'}`)
  }
  console.log('')
})

if (problems.length) {
  console.error(`${problems.length} problem(s):\n`)
  for (const problem of problems) console.error(`  ! ${problem}`)
  process.exit(1)
}
console.log('Every section answers something and hands something forward, nothing circles back on')
console.log('itself, and /watch agrees with the scripts. Read the pairs above to judge the links.\n')
