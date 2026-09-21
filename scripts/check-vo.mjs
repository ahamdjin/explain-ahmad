/**
 * The narration-lock gate.
 *
 * `skills/STORY_STRUCTURE.md` §5A: once narration is approved, the words are
 * the source of truth and the implementation adapts around them. Nothing else
 * in the repo can see a beat whose `vo` has been quietly shortened to fit a
 * component -- which is the exact failure that already cost Section 01 once.
 *
 * So the script's beat cuts and the built `vo` strings are compared directly.
 *
 *   node scripts/check-vo.mjs
 */
import { readdir, readFile } from 'node:fs/promises'

/*
 * Which film. Defaults to Video 1, so every existing invocation is unchanged.
 *
 *   VIDEO=apollo-o1/video-2 npm run check:overlap
 */
const VIDEO = process.env.VIDEO ?? 'glm-320b/video-1'

const norm = (s) =>
  s
    .replace(/[`*_]/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

const files = (await readdir('video-script/video-1')).filter((f) => /^\d\d-.+\.md$/.test(f)).sort()
const problems = []
let checked = 0

for (const file of files) {
  const md = await readFile(`video-script/video-1/${file}`, 'utf8')
  const body = md.split('## The script')[1]?.split(/\n## Storyboard/)[0]
  if (!body) continue
  const cuts = [...body.matchAll(/^> \*\*(\d+)\.\*\*\s*(?:\*\([^)]*\)\*)?\s*(.+)$/gm)].map((m) => ({
    n: Number(m[1]),
    text: norm(m[2]),
  }))
  if (!cuts.length) continue

  const nn = file.slice(0, 2)
  let src
  try {
    src = await readFile(`src/videos/${VIDEO}/section-${nn}/beats.ts`, 'utf8')
  } catch {
    problems.push(`§${nn}  no beats.ts`)
    continue
  }
  checked += 1
  const vos = [...src.matchAll(/^\s*vo: (['"`])([\s\S]*?)\1,$/gm)].map((m) => norm(m[2]))

  if (vos.length !== cuts.length) {
    problems.push(`§${nn}  script has ${cuts.length} beats, beats.ts has ${vos.length}`)
  }
  for (let i = 0; i < Math.min(vos.length, cuts.length); i += 1) {
    if (vos[i] !== cuts[i].text) {
      problems.push(
        `§${nn} beat ${cuts[i].n} — the built VO is not the approved words\n` +
          `      script: ${cuts[i].text.slice(0, 96)}\n` +
          `      built : ${vos[i].slice(0, 96)}`,
      )
    }
  }
}

console.log(`${checked} section(s) compared against their script.\n`)
if (problems.length) {
  console.error(`${problems.length} problem(s):\n`)
  for (const p of problems) console.error(`  ! ${p}`)
  process.exit(1)
}
console.log('Every built beat speaks exactly the words the script approved.\n')
