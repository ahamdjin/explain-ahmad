/**
 * Generates `video-script/READ_ALOUD.md` — the whole video, start to finish,
 * with a timecode against every line.
 *
 * The per-section scripts are written for *building*: contract, line jobs,
 * gates, truth notes. None of that helps you read the thing aloud, and there
 * was no single document you could hand to someone and say "this is the
 * video". This is that document.
 *
 * Generated, never hand-written, for the same reason as BOARD.md: a
 * hand-maintained read-through drifts from the scripts within a day and then
 * two documents disagree about what gets said.
 *
 *   npm run readthrough
 *
 * Staleness is detected rather than tracked: each script's title is compared
 * against the section names in the spine's chain table. A script whose title
 * no longer matches the spine is written to a different video.
 *
 * ## Where the seconds come from
 *
 * From the **built beats**, when the section is built. This document and
 * `storyboard/BOARD.md` used to disagree about the runtime by two and a half
 * minutes -- 19:16 against 21:36 -- because this one estimated the time each
 * line needs while the board read the `secs` the viewer actually gets. Two
 * generated documents disagreeing about the length of the video is the exact
 * failure both of them are generated to prevent.
 *
 * So `secs` wins wherever it exists, and the estimate is only a fallback for a
 * section that has a script but no build yet.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'

const WPM = 145
const WPS = WPM / 60
const OUT = 'video-script/READ_ALOUD.md'

/** What the line needs, plus a beat of air, to the half second. */
const suggest = (need) => Math.max(2.5, Math.round((need + 1.0) * 2) / 2)

/**
 * The `secs` the built beats actually hold, by section number then beat.
 *
 * Read by scanning the source: `beats.ts` imports the story verbs, so it
 * cannot be transpiled and evaluated standalone.
 */
async function builtSeconds() {
  const root = 'src/videos/glm-320b'
  const dirs = (await readdir(root, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && /^section-\d\d$/.test(e.name))
    .map((e) => e.name)
  const built = new Map()
  for (const dir of dirs) {
    const source = await readFile(`${root}/${dir}/beats.ts`, 'utf8').catch(() => '')
    const beats = new Map()
    for (const block of source.split(/\n {2}\{\n/).slice(1)) {
      const n = block.match(/^ {4}n: (\d+),/)
      const secs = block.match(/\n {4}secs: ([0-9.]+),/)
      if (n && secs) beats.set(Number(n[1]), Number(secs[1]))
    }
    if (beats.size) built.set(Number(dir.slice(-2)), beats)
  }
  return built
}

const BUILT = await builtSeconds()

/** What this beat actually holds on screen, or what it would need if unbuilt. */
const secondsFor = (section, beat, words) =>
  BUILT.get(section)?.get(beat) ?? suggest(words / WPS)
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

/** The section names the spine currently asks for, in order. */
async function spineChain() {
  const spine = await readFile('storyboard/STORY_SPINE.md', 'utf8')
  const table = spine.split('## 4. The chain')[1]?.split('\n###')[0] ?? ''
  const names = []
  for (const line of table.split('\n')) {
    const cells = line.split('|').map((c) => c.trim())
    if (cells.length > 3 && /^\d+$/.test(cells[1])) {
      names[Number(cells[1])] = cells[2].replace(/\*\*/g, '').trim()
    }
  }
  return names
}

/** The storyboard table, keyed by beat. `skills/SPATIAL_CONTINUITY.md`. */
function parseBoard(markdown) {
  const block = markdown.split('## Storyboard')[1]?.split(/\n### |\n## /)[0] ?? ''
  const board = new Map()
  for (const line of block.split('\n')) {
    if (!line.trim().startsWith('|')) continue
    const cells = line.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.length < 5 || !/^\d+$/.test(cells[0])) continue
    board.set(Number(cells[0]), { where: cells[1], camera: cells[2], happens: cells[3], onScreen: cells[4], example: cells[5] ?? '' })
  }
  return board
}

/** Beats out of one script's `## The script` block. */
function parseScript(markdown) {
  const title = markdown.match(/^# Section \d+ — (.+)$/m)?.[1]?.trim() ?? '(untitled)'
  const body = markdown.split('## The script')[1]?.split(/\n## Storyboard|\n## Line jobs/)[0] ?? ''
  const beats = []
  /*
   * The end-of-input lookahead is `(?![\s\S])`, not `\Z`.
   *
   * JavaScript has no `\Z` -- it parses as a literal "Z" -- so the previous
   * version silently dropped the last beat of every script that did not happen
   * to end with a `---` separator. Silent data loss in a counting tool is
   * worse than a crash, which is why the caller now verifies the count.
   */
  const re = /^> \*\*(\d+)\.\*\*([\s\S]*?)(?=^> \*\*\d+\.\*\*|^#|^---|(?![\s\S]))/gm
  for (const m of body.matchAll(re)) {
    const raw = m[2]
    /* Italic parens are stage directions: shown, never spoken, never timed. */
    const stage = [...raw.matchAll(/\*\(([\s\S]*?)\)\*/g)].map((d) => d[1].replace(/\s+/g, ' ').trim())
    const spoken = raw
      .replace(/\*\([\s\S]*?\)\*/g, '')
      .replace(/^>\s?/gm, '')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    beats.push({ n: Number(m[1]), spoken, stage: stage.join(' · '), words: spoken ? spoken.split(' ').length : 0 })
  }

  /* If these disagree, a beat was dropped and the timecodes below are wrong. */
  const written = (body.match(/^> \*\*\d+\.\*\*/gm) ?? []).length
  if (written !== beats.length) {
    throw new Error(`parsed ${beats.length} beats but the script has ${written} -- the beat regex is dropping some`)
  }
  return { title, beats }
}

const chain = await spineChain()
const files = (await readdir('video-script')).filter((f) => /^\d\d-.+\.md$/.test(f)).sort()

const sections = []
for (const file of files) {
  const num = Number(file.slice(0, 2))
  const md = await readFile(`video-script/${file}`, 'utf8')
  const parsed = parseScript(md)
  if (!parsed.beats.length) continue
  sections.push({ num, file, ...parsed, board: parseBoard(md), wanted: chain[num] })
}

let t = 0
const out = []
out.push('# Read-aloud script — the whole video, start to finish')
out.push('')
out.push('**Generated by `npm run readthrough`. Do not edit by hand.**')
out.push('')
out.push('Every line, with the timecode it starts at. **Where** is the place the beat')
out.push('leaves you and **what happens** is the physical event the line is describing —')
out.push('you are explaining what is on the screen, never the other way round. See')
out.push('`skills/SPATIAL_CONTINUITY.md`, checked by `npm run check:board`.')
out.push('')
out.push('Timings are the `secs` the built beats actually hold — the same figures as')
out.push('`storyboard/BOARD.md`. They are still **planned, not measured**: each was set')
out.push(`from ${WPM} words per minute plus a beat of air. Record first, then measure, then`)
out.push('edit the seconds. See `docs/VOICE_OVER.md`.')
out.push('')
out.push('Promise: `storyboard/STORY_SPINE.md` · Per-section detail: the numbered scripts')
out.push('')

const stale = sections.filter((s) => s.wanted && s.title !== s.wanted)
if (stale.length) {
  out.push('> ## ⚠ Not all of this is the same video')
  out.push('>')
  out.push('> These scripts no longer match the section the spine asks for, so they are')
  out.push('> written to a superseded chain. Read them as history, not as the plan:')
  out.push('>')
  for (const s of stale) {
    out.push(`> - **§${String(s.num).padStart(2, '0')}** is *"${s.title}"* — the spine asks for *"${s.wanted}"*`)
  }
  out.push('')
}

const body = []
for (const s of sections) {
  const words = s.beats.reduce((a, b) => a + b.words, 0)
  const dur = s.beats.reduce((a, b) => a + secondsFor(s.num, b.n, b.words), 0)
  const start = t
  const okay = !s.wanted || s.title === s.wanted
  body.push('')
  body.push(`## §${String(s.num).padStart(2, '0')} — ${s.title}${okay ? '' : '  ⚠ superseded'}`)
  body.push('')
  body.push(`\`${clock(start)}\` → \`${clock(start + dur)}\` · ${s.beats.length} beats · ${words} words · ${Math.round(dur)}s · \`${s.file}\``)
  if (!okay) body.push(`\n> The spine asks for **"${s.wanted}"** here. This script predates that.`)
  body.push('')
  const hasBoard = s.board.size > 0
  if (!hasBoard) body.push('> No storyboard yet — `npm run check:board`.\n')
  body.push(hasBoard ? '| at | say | where | what happens |' : '| at | say | on screen |')
  body.push(hasBoard ? '| --- | --- | --- | --- |' : '| --- | --- | --- |')
  for (const b of s.beats) {
    const secs = secondsFor(s.num, b.n, b.words)
    const line = b.spoken || '*(silence)*'
    if (hasBoard) {
      const r = s.board.get(b.n)
      /* The board's camera cell may already be bolded; strip it before re-wrapping. */
      const cam = (r?.camera ?? '').replace(/\*/g, '').trim()
      const where = r ? (cam && !/^[—\-–]?$/.test(cam) ? `**${cam}** → ${r.where}` : r.where) : ''
      body.push(`| \`${clock(t)}\` | ${line} | ${where} | ${r?.happens ?? ''} |`)
    } else {
      body.push(`| \`${clock(t)}\` | ${line} | ${b.stage || ''} |`)
    }
    t += secs
  }
}

out.push(`**Total: ${sections.length} sections · ${sections.reduce((a, s) => a + s.beats.length, 0)} beats · ${sections.reduce((a, s) => a + s.beats.reduce((x, b) => x + b.words, 0), 0)} words · ${clock(t)}**`)
out.push('')
out.push('| § | section | from | length | beats | words |')
out.push('| --- | --- | --- | --- | --- | --- |')
let c = 0
for (const s of sections) {
  const dur = s.beats.reduce((a, b) => a + secondsFor(s.num, b.n, b.words), 0)
  const w = s.beats.reduce((a, b) => a + b.words, 0)
  out.push(`| ${String(s.num).padStart(2, '0')} | ${s.title} | \`${clock(c)}\` | ${Math.round(dur)}s | ${s.beats.length} | ${w} |`)
  c += dur
}
out.push(...body)
out.push('')

await writeFile(OUT, out.join('\n'), 'utf8')
console.log(`${OUT} — ${sections.length} sections, ${clock(t)}`)
if (stale.length) console.log(`  ⚠ ${stale.length} section(s) written to a superseded chain: ${stale.map((s) => s.num).join(', ')}`)
