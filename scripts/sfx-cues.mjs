/**
 * Generates editor-ready SFX cue timings from the current built beats.
 *
 * Sound stays out of React on purpose. The visual build is recorded silent,
 * VO timing is locked, then this script resolves stable beat ids to the
 * section-relative and absolute timecodes the editor actually needs.
 *
 *   npm run sfx:cues
 *
 * Writes:
 *   output/sfx/cues.csv
 *   output/sfx/cues.json
 *
 * Run this again after any `secs` restamp. Never hand-copy the timecodes from
 * docs/SOUND.md into an edit; beat ids are stable, provisional seconds are not.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = 'src/videos/glm-320b/video-1'
const OUT = 'output/sfx'

/**
 * Masters are peak-normalised to -12 dBFS. -8 dB here lands the ordinary cues
 * around the -20 dBFS target in docs/SOUND.md. This is an editor starting
 * point, not loudness automation: listen against the real voice before export.
 */
const HIT_DB = -8

/**
 * Offsets are relative to the start of the named beat. The stable information
 * is the beat id and sound role; the editor may nudge a landing one or two
 * frames against the final animation after VO timing is locked.
 */
const CUES = [
  // Diegetic opening. Chat.tsx reveals the prompt over ~1.0s from this stage.
  { section: 1, beat: 'you-ask-it-something', sound: 'typing.wav', offset: 0.70, gainDb: -10, kind: 'diegetic', note: 'under the real character-by-character prompt reveal' },
  { section: 1, beat: 'you-ask-it-something', sound: 'key-press.wav', offset: 1.68, gainDb: -9, kind: 'diegetic', note: 'last character / end of the typed prompt' },

  // Count-ups: ratchet under the number, then a distinct landing.
  // §1 is staged 5s into its beat because the value promise is spoken first.
  { section: 1, beat: 'three-thirty-six-for-one-word', sound: 'ratchet.wav', offset: 5.00, gainDb: HIT_DB, kind: 'count', note: '336 count-up starts when VO reaches “Across that climb…”' },
  { section: 1, beat: 'three-thirty-six-for-one-word', sound: 'stamp.wav', offset: 6.36, gainDb: -7, kind: 'landing', note: '336 lands; first of three stamps' },
  { section: 7, beat: 'three-hundred-and-thirty-six', sound: 'ratchet.wav', offset: 0.00, gainDb: HIT_DB, kind: 'count', note: '336 count-up' },
  { section: 7, beat: 'three-hundred-and-thirty-six', sound: 'click.wav', offset: 1.36, gainDb: HIT_DB, kind: 'landing', note: '336 lands after the 1.4s counter' },
  { section: 8, beat: 'two-thousand-six-eighty-eight', sound: 'ratchet.wav', offset: 0.00, gainDb: HIT_DB, kind: 'count', note: '2,688 count-up' },
  { section: 8, beat: 'two-thousand-six-eighty-eight', sound: 'snap.wav', offset: 1.36, gainDb: HIT_DB, kind: 'landing', note: '2,688 lands after the 1.4s counter' },
  { section: 11, beat: 'how-much-did-we-carry', sound: 'ratchet.wav', offset: 0.00, gainDb: HIT_DB, kind: 'count', note: '336 counter lands before arithmetic' },
  { section: 11, beat: 'how-much-did-we-carry', sound: 'click.wav', offset: 1.36, gainDb: HIT_DB, kind: 'landing', note: 'counter lands after the 1.4s counter' },
  { section: 12, beat: 'twelve-thousand-and-ninety-six', sound: 'ratchet.wav', offset: 0.00, gainDb: HIT_DB, kind: 'count', note: '12,096 count-up' },
  { section: 12, beat: 'twelve-thousand-and-ninety-six', sound: 'impact.wav', offset: 1.36, gainDb: HIT_DB, kind: 'landing', note: 'largest number in the film; silence after' },

  // Discrete landings.
  { section: 1, beat: 'eight-cards', sound: 'click.wav', offset: 0.00, gainDb: HIT_DB, kind: 'landing', note: 'hardware comparison begins' },
  { section: 1, beat: 'eight-cards', sound: 'snap.wav', offset: 0.62, gainDb: HIT_DB, kind: 'landing', note: 'eight-chip stack settles; never eight separate hits' },
  { section: 2, beat: 'it-gets-cut-up', sound: 'tear.wav', offset: 0.12, gainDb: -10, kind: 'landing', note: 'only tear in the film' },
  { section: 3, beat: 'now-tuesday', sound: 'click.wav', offset: 0.12, gainDb: HIT_DB, kind: 'landing', note: 'third point placed' },
  { section: 3, beat: 'same-word-same-row', sound: 'click.wav', offset: 0.15, gainDb: HIT_DB, kind: 'landing', note: 'identical row 1/3' },
  { section: 3, beat: 'same-word-same-row', sound: 'click.wav', offset: 0.70, gainDb: HIT_DB, kind: 'landing', note: 'identical row 2/3; intentionally same sample' },
  { section: 3, beat: 'same-word-same-row', sound: 'click.wav', offset: 1.25, gainDb: HIT_DB, kind: 'landing', note: 'identical row 3/3; intentionally same sample' },
  { section: 4, beat: 'only-backwards', sound: 'knock.wav', offset: 0.12, gainDb: HIT_DB, kind: 'landing', note: 'causal limit' },
  { section: 4, beat: 'nothing-like-each-other', sound: 'tick.wav', offset: 0.12, gainDb: -10, kind: 'landing', note: 'quiet contrast reveal' },
  { section: 5, beat: 'no-dog-expert', sound: 'click.wav', offset: 0.12, gainDb: HIT_DB, kind: 'landing', note: 'plate 1/3' },
  { section: 5, beat: 'no-dog-expert', sound: 'click.wav', offset: 0.62, gainDb: HIT_DB, kind: 'landing', note: 'plate 2/3' },
  { section: 5, beat: 'no-dog-expert', sound: 'click.wav', offset: 1.12, gainDb: -12, kind: 'landing', note: 'plate 3/3; clip short in editor so it sounds wrong' },
  { section: 5, beat: 'look-what-the-scores-came-from', sound: 'tick.wav', offset: 0.12, gainDb: HIT_DB, kind: 'landing', note: 'connection back to scores' },
  { section: 7, beat: 'forty-five', sound: 'knock.wav', offset: 0.12, gainDb: HIT_DB, kind: 'landing', note: 'flat answer: forty-five' },
  { section: 7, beat: 'picks-again', sound: 'stamp.wav', offset: 0.12, gainDb: HIT_DB, kind: 'landing', note: 'second of three stamps' },
  { section: 10, beat: 'it-never-stops-choosing', sound: 'stamp.wav', offset: 0.12, gainDb: HIT_DB, kind: 'landing', note: 'third and final stamp' },
  { section: 11, beat: 'a-second-and-a-half', sound: 'thud.wav', offset: 0.12, gainDb: -10, kind: 'landing', note: 'weight of the fetch delay' },
  { section: 13, beat: 'all-of-it-in-reach', sound: 'clack.wav', offset: 0.12, gainDb: -10, kind: 'landing', note: 'all of it within reach' },
]

function parseBeats(source, section) {
  const beats = []
  const re = /\n\s{2}\{\n\s{4}n:\s*(\d+),\n\s{4}id:\s*'([^']+)',[\s\S]*?\n\s{4}secs:\s*([0-9.]+),/g
  for (const match of source.matchAll(re)) {
    beats.push({ section, n: Number(match[1]), id: match[2], secs: Number(match[3]) })
  }
  if (!beats.length) throw new Error(`No beats parsed for section ${section}`)
  return beats
}

async function builtSections() {
  const dirs = (await readdir(ROOT, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^section-\d\d$/.test(entry.name))
    .map((entry) => entry.name)
    .sort()

  const sections = []
  let absolute = 0
  for (const dir of dirs) {
    const section = Number(dir.slice(-2))
    const source = await readFile(path.join(ROOT, dir, 'beats.ts'), 'utf8')
    const beats = parseBeats(source, section)
    let local = 0
    const byId = new Map()
    for (const beat of beats) {
      byId.set(beat.id, { ...beat, localStart: local, absoluteStart: absolute + local })
      local += beat.secs
    }
    sections.push({ section, start: absolute, duration: local, beats, byId })
    absolute += local
  }
  return sections
}

const sections = await builtSections()
const bySection = new Map(sections.map((section) => [section.section, section]))

// Section seams are structural, and always land at the first frame of §§2–13.
const seamCues = sections.slice(1).map((section) => ({
  section: section.section,
  beat: section.beats[0].id,
  sound: 'page-turn.wav',
  offset: 0,
  gainDb: -10,
  kind: 'seam',
  note: `chapter seam into §${String(section.section).padStart(2, '0')}`,
}))

const resolved = [...CUES, ...seamCues].map((cue) => {
  const section = bySection.get(cue.section)
  if (!section) throw new Error(`SFX cue points to missing section ${cue.section}`)
  const beat = section.byId.get(cue.beat)
  if (!beat) throw new Error(`SFX cue points to missing beat §${cue.section} ${cue.beat}`)
  if (cue.offset < 0 || cue.offset >= beat.secs) {
    throw new Error(`SFX cue offset is outside beat §${cue.section} ${cue.beat}: ${cue.offset}s >= ${beat.secs}s`)
  }
  const sectionTime = beat.localStart + cue.offset
  const absoluteTime = beat.absoluteStart + cue.offset
  return {
    ...cue,
    beatNumber: beat.n,
    sectionTime: Number(sectionTime.toFixed(3)),
    absoluteTime: Number(absoluteTime.toFixed(3)),
  }
}).sort((a, b) => a.absoluteTime - b.absoluteTime)

const clock = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds - mins * 60
  return `${mins}:${secs.toFixed(3).padStart(6, '0')}`
}

await mkdir(OUT, { recursive: true })
await writeFile(path.join(OUT, 'cues.json'), JSON.stringify(resolved, null, 2) + '\n', 'utf8')

const csvEscape = (value) => `"${String(value).replaceAll('"', '""')}"`
const rows = [
  ['absolute', 'section_time', 'section', 'beat', 'beat_id', 'sound', 'gain_db', 'kind', 'note'],
  ...resolved.map((cue) => [
    clock(cue.absoluteTime),
    clock(cue.sectionTime),
    String(cue.section).padStart(2, '0'),
    cue.beatNumber,
    cue.beat,
    cue.sound,
    cue.gainDb,
    cue.kind,
    cue.note,
  ]),
]
await writeFile(path.join(OUT, 'cues.csv'), rows.map((row) => row.map(csvEscape).join(',')).join('\n') + '\n', 'utf8')

console.log(`${resolved.length} SFX events → ${OUT}/cues.csv + cues.json`)
console.log('Beat ids are the anchor. Re-run after VO timing/restamp before sound editing.')
