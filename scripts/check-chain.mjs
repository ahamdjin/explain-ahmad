/**
 * The chain gate.
 *
 * A section that asks the same question at the end that it asked at the
 * beginning has no story, and a chain whose links do not actually meet is a
 * list wearing a chain's clothes. Both are invisible to every other check in
 * this repo.
 *
 *   npm run check:chain
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const DIR = 'video-script/video-1'
const CHAIN = (await readdir(DIR)).filter((file) => /^\d\d-.+\.md$/.test(file)).sort()

/** Compare on meaning, not punctuation: quotes and dashes drift. */
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
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const row = source.match(new RegExp(`^\\|\\s*\\*{0,2}${escaped}\\*{0,2}\\s*\\|(.+?)\\|\\s*$`, 'mi'))
  return row ? row[1].replace(/\*+/g, '').trim() : null
}

const EXIT_NAMES = ['→ next', 'Therefore', 'Exits on']
const exitOf = (source) => {
  for (const name of EXIT_NAMES) {
    const value = field(source, name)
    if (value) return value
  }
  return null
}

const isTerminal = (value) => !value || /^\(?none/i.test(value.replace(/[*_]/g, '').trim())

const rows = []
for (const file of CHAIN) {
  const source = await readFile(path.join(DIR, file), 'utf8')
  rows.push({
    file,
    enters: field(source, 'Enters on'),
    exitsOn: field(source, 'Exits on'),
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
  if (!first && !row.enters) problems.push(`${where}: no "Enters on" in the contract table`)
  if (!last && isTerminal(row.exits)) {
    problems.push(`${where}: nothing handed forward. Declare "→ next", or this link is dead`)
  }

  if (row.enters && row.exits && normalise(row.enters) === normalise(row.exits)) {
    problems.push(`${where}: exits on the same question it entered on. That is a circle, not a story`)
  }

  const next = rows[index + 1]
  if (next && row.exitsOn && !isTerminal(row.exitsOn) && next.enters) {
    if (normalise(row.exitsOn) !== normalise(next.enters)) {
      problems.push(
        `${where} exits on "${row.exitsOn}"\n       but ${next.file} enters on "${next.enters}" — the seam shows`,
      )
    }
  }
})

/*
 * The build and the plan, checked against each other.
 *
 * Chapter metadata now has one owner: `src/videos/registry.tsx`. The home page
 * and player both consume that registry, so checking WatchPage would only test
 * implementation details and would break whenever the player is reorganised.
 */
const registry = await readFile('src/videos/registry.tsx', 'utf8')
const chapterBlock = registry.split('export const videoChapters')[1] ?? ''
const chapters = [...chapterBlock.matchAll(/\bn:\s*(\d+),[\s\S]*?\benters:\s*'([^']*)'/g)].map((m) => ({
  n: Number(m[1]),
  enters: m[2],
}))

if (chapters.length !== rows.length) {
  problems.push(
    `src/videos/registry.tsx: ${chapters.length} chapters against ${rows.length} scripts. The chain and the production registry disagree about how long the video is`,
  )
}
for (const chapter of chapters) {
  const row = rows[chapter.n - 1]
  if (!row) continue
  const script = row.enters ?? ''
  if (normalise(chapter.enters) !== normalise(script)) {
    problems.push(
      `src/videos/registry.tsx §${chapter.n}: enters on "${chapter.enters}" but ${row.file} says "${script}"`,
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
console.log('Every section answers something and hands something forward, every section enters')
console.log('on the sentence the one before it exits on, nothing circles back on itself, and')
console.log('the production chapter registry agrees with the scripts. Read the pairs above to judge the links.\n')
