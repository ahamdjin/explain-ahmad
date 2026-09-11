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
 *
 * **It checks both directions, and that is the whole point.** The earlier
 * version only asked whether every built line appears somewhere in the script.
 * That let a superseded beat sit in §11 for days -- "about twenty-six
 * megabytes" -- one beat above the measured line that replaced it, because a
 * patch had landed one position low. Two different figures for the same
 * quantity, four beats apart, in the section that is the video's answer. A
 * one-way check cannot see a line the script has and the build does not.
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

  /* The other direction: a spoken line in the script that no beat carries. */
  const body = md.split('## The script')[1]?.split('## Storyboard')[0] ?? ''
  /* Split on the blank quote line between beats, then parse each block. A
   * single regex with the /m flag ends every match at the first line break,
   * which truncates multi-line beats and reports them all as orphans. */
  const blocks = body
    .split(/\n>\s*\n/)
    .map((chunk) => chunk.match(/> \*\*(\d+)\.\*\*([\s\S]*)/))
    .filter(Boolean)
    /* stop at the first line that is not part of the quote, so a beat at the
     * end of an act does not swallow the act heading that follows it */
    .map((m) => {
      /* The first line of the capture is the tail of the `> **N.**` line
       * itself and has no `>` prefix -- filtering from index 0 drops it and
       * reports every multi-line beat as a fragment. */
      const [first, ...rest] = m[2].split('\n')
      const kept = rest.filter((l) => l.startsWith('>') || l.trim() === '')
      return [m[0], m[1], [first, ...kept].join('\n')]
    })
  const builtFlat = built.map(strip)
  const orphans = blocks
    .map(([, n, text]) => {
      /* drop the parenthesised stage direction; what is left is spoken */
      const spoken = strip(text.replace(/\*\([^)]*\)\*/g, ''))
      return { n, spoken }
    })
    .filter(({ spoken }) => spoken.length > 12 && !builtFlat.some((v) => v.includes(spoken) || spoken.includes(v)))

  report.push({ sec, scriptBeats, builtBeats: built.length, missing, orphans })
}

const drifting = report.filter((r) => r.scriptBeats !== r.builtBeats || r.missing || r.orphans.length)
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

/*
 * Orphans are the dangerous direction. A section whose beat count differs is
 * obviously mid-rewrite; a line the script says and no beat carries looks
 * finished and is not.
 */
const withOrphans = report.filter((r) => r.orphans.length)
if (withOrphans.length) {
  console.log('\nLines a script says that no beat carries.')
  console.log('During a writing pass most of these are simply the script running ahead.')
  console.log('What to look for is a line that *contradicts* a built one — a superseded')
  console.log('number sitting a beat away from the one that replaced it:\n')
  for (const r of withOrphans) {
    for (const o of r.orphans) {
      console.log(`  §${r.sec} beat ${o.n}: ${o.spoken.slice(0, 88)}${o.spoken.length > 88 ? '…' : ''}`)
    }
  }
}
if (drifting.length) {
  console.log(`\n${drifting.length} section(s) ahead of the build.`)
  console.log('/watch, BOARD.md and READ_ALOUD.md still describe the built cut for those.\n')
} else {
  console.log('\nEvery section: script and build agree.\n')
}
