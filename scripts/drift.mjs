/**
 * Reports where the scripts have run ahead of the built beats.
 *
 *   npm run drift
 *
 * During a writing pass the script is the authority and the build is expected
 * to lag -- that is the normal order, not a fault. What is *not* acceptable is
 * not knowing. `/watch`, `BOARD.md` and `READ_ALOUD.md` are all generated from
 * `beats.ts`, so while this reports drift those three describe the old cut.
 *
 * Exits 0 always. This is a report, not a gate: failing the build for doing
 * the work in the right order would just teach everyone to skip it.
 */
import { readdir, readFile } from 'node:fs/promises'

const strip = (s) =>
  s.replace(/[*`]/g, '').replace(/'/g, '’').replace(/\n\s*>\s?/g, ' ').replace(/\s+/g, ' ').trim()

const files = (await readdir('video-script/video-1')).filter((f) => /^\d\d-.+\.md$/.test(f)).sort()
const report = []

for (const file of files) {
  const sec = file.slice(0, 2)
  const md = await readFile(`video-script/video-1/${file}`, 'utf8')
  const beatsSrc = await readFile(`src/videos/glm-320b/video-1/section-${sec}/beats.ts`, 'utf8')

  const scriptBeats = [...(md.split('## The script')[1] ?? '').matchAll(/^> \*\*(\d+)\.\*\*/gm)].length
  const built = [...beatsSrc.matchAll(/vo: '((?:[^'\\]|\\.)*)'/g)].map((m) => m[1].replace(/\\'/g, "'"))
  const flat = strip(md)

  const missing = built.filter((v) => !flat.includes(strip(v))).length
  report.push({ sec, scriptBeats, builtBeats: built.length, missing })
}

const drifting = report.filter((r) => r.scriptBeats !== r.builtBeats || r.missing)
console.log('\nscript vs built beats\n')
for (const r of report) {
  const delta = r.scriptBeats - r.builtBeats
  const note =
    delta > 0 ? `script has ${delta} more beat(s)`
    : delta < 0 ? `build has ${-delta} more beat(s)`
    : r.missing ? `${r.missing} line(s) changed in the script`
    : 'in sync'
  console.log(`  §${r.sec}  script ${String(r.scriptBeats).padStart(2)}  built ${String(r.builtBeats).padStart(2)}   ${note}`)
}
if (drifting.length) {
  console.log(`\n${drifting.length} section(s) ahead of the build.`)
  console.log('/watch, BOARD.md and READ_ALOUD.md still describe the built cut for those.\n')
} else {
  console.log('\nEvery section: script and build agree.\n')
}
