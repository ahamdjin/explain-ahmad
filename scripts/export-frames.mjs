/**
 * Every beat of every section, as a PNG, in a folder outside the repo.
 *
 *   npm run frames:export
 *   npm run frames:export -- --out=~/Pictures/whatever
 *
 * The in-repo `frames/` directory is gitignored working output -- it gets
 * deleted and rewritten by `npm run frames:all` whenever a section is
 * recaptured. This writes somewhere permanent and findable instead, so the
 * frames can be looked through, sent to someone, or annotated without a
 * checkout and without being wiped by the next capture.
 *
 * It also writes one `index.html` covering **all** of it -- 164 frames, in
 * order, each with its beat number, its title and the line said over it. One
 * page you can scroll top to bottom is the closest thing to watching the
 * video that a folder of stills can be.
 */
import { spawn } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile, cp, rm } from 'node:fs/promises'
import { homedir } from 'node:os'
import path from 'node:path'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

/** Findable without being told where it is. */
const DEFAULT_OUT = path.join(homedir(), 'Desktop', 'explain-ahmad-frames')
const OUT = path.resolve((args.get('out') ?? DEFAULT_OUT).replace(/^~/, homedir()))
const ROOT = 'src/videos/glm-320b/video-1'
const SKIP_CAPTURE = args.has('reuse')

/** Section number -> its title, from the script's H1. */
async function titles() {
  const found = {}
  for (const file of (await readdir('video-script/video-1')).sort()) {
    const m = /^(\d\d)-.+\.md$/.exec(file)
    if (!m || found[m[1]]) continue
    const md = await readFile(path.join('video-script/video-1', file), 'utf8')
    found[m[1]] = /^# Section \d+ — (.+)$/m.exec(md)?.[1]?.trim() ?? file
  }
  return found
}

/** Beat metadata, read out of the source. beats.ts cannot be run standalone. */
async function beatsOf(dir) {
  const source = await readFile(path.join(ROOT, dir, 'beats.ts'), 'utf8')
  const out = []
  for (const block of source.split(/\n {2}\{\n/).slice(1)) {
    const n = block.match(/^ {4}n: (\d+),/)
    if (!n) continue
    const pick = (key) => {
      const hit = block.match(new RegExp(`\\n {4}${key}: (['"\`])([\\s\\S]*?)\\1,\\n`))
      return hit ? hit[2] : ''
    }
    out.push({
      n: Number(n[1]),
      id: pick('id'),
      title: pick('title'),
      relation: pick('relation'),
      vo: pick('vo').replace(/\\u2014/g, '—').replace(/\s+/g, ' ').trim(),
      secs: Number((block.match(/\n {4}secs: ([0-9.]+),/) ?? [0, 0])[1]),
    })
  }
  return out
}

const sections = (await readdir(ROOT, { withFileTypes: true }))
  .filter((e) => e.isDirectory() && /^section-\d\d$/.test(e.name))
  .map((e) => e.name)
  .sort()

const NAMES = await titles()

/* Capture into the repo's working directory first, then copy across. That
 * keeps one capture path -- capture-frames.mjs stays the only thing that knows
 * how to drive a browser, and this script stays the only thing that knows
 * where the frames end up. */
if (!SKIP_CAPTURE) {
  for (const dir of sections) {
    await new Promise((resolve, reject) => {
      const child = spawn('node', ['scripts/capture-frames.mjs', `--section=${dir}`], {
        stdio: ['ignore', 'inherit', 'inherit'],
      })
      child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${dir} exited ${code}`))))
    })
  }
}

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const all = []
let total = 0

for (const dir of sections) {
  const key = dir.slice(-2)
  const beats = await beatsOf(dir)
  const files = (await readdir(path.join('frames', dir)).catch(() => [])).filter((f) => f.endsWith('.png'))
  if (!files.length) {
    console.log(`  --  ${dir} has no frames; run without --reuse`)
    continue
  }
  await mkdir(path.join(OUT, dir), { recursive: true })
  for (const file of files) {
    await cp(path.join('frames', dir, file), path.join(OUT, dir, file))
  }
  for (const beat of beats) {
    const file = files.find((f) => f.startsWith(`frame-${String(beat.n).padStart(2, '0')}-`))
    if (!file) continue
    all.push({ ...beat, section: key, title2: NAMES[key] ?? dir, src: `${dir}/${file}` })
    total += beat.secs
  }
  console.log(`  ok  ${dir}  ${files.length} frames`)
}

const escape = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

let at = 0
const rows = []
let lastSection = null
for (const frame of all) {
  if (frame.section !== lastSection) {
    rows.push(
      `<h2 id="s${frame.section}"><b>${frame.section}</b> ${escape(frame.title2)}</h2>`,
    )
    lastSection = frame.section
  }
  rows.push(`<figure>
  <img src="${frame.src}" alt="Section ${frame.section} beat ${frame.n}" loading="lazy" />
  <figcaption>
    <b>${frame.section} &middot; ${frame.n}</b>
    <span class="t">${escape(frame.title)}</span>
    <span class="vo">${escape(frame.vo) || '&mdash;'}</span>
    <span class="m">${clock(at)} &middot; ${frame.secs}s &middot; ${escape(frame.relation)}</span>
  </figcaption>
</figure>`)
  at += frame.secs
}

const nav = [...new Set(all.map((f) => f.section))]
  .map((k) => `<a href="#s${k}">${k}</a>`)
  .join('')

await writeFile(
  path.join(OUT, 'index.html'),
  `<!doctype html>
<meta charset="utf-8" />
<title>Explain Ahmad — every beat</title>
<style>
  :root { color-scheme: light; }
  body { margin:0; padding:0 32px 64px; background:#E8E2D6; color:#2B2926;
         font:14px/1.5 ui-sans-serif,system-ui,-apple-system,sans-serif; }
  header { position:sticky; top:0; z-index:5; margin:0 -32px 28px; padding:18px 32px;
           background:rgba(232,226,214,.94); backdrop-filter:blur(6px);
           border-bottom:1px solid rgba(43,41,38,.16); }
  h1 { font-size:19px; margin:0 0 4px; }
  p.sub { margin:0; font-size:13px; color:#5F5A53; }
  nav { margin-top:10px; display:flex; gap:4px; flex-wrap:wrap; }
  nav a { padding:3px 9px; border-radius:4px; background:#FBF8F1; color:#5F5A53;
          text-decoration:none; font:600 12px/1 ui-monospace,monospace; }
  nav a:hover { background:#2B2926; color:#FBF8F1; }
  h2 { grid-column:1/-1; margin:34px 0 2px; font-size:16px; font-weight:600;
       display:flex; align-items:baseline; gap:10px; }
  h2 b { font:600 12px/1 ui-monospace,monospace; color:#C87B45; }
  .grid { display:grid; gap:26px; grid-template-columns:repeat(auto-fill,minmax(520px,1fr)); }
  figure { margin:0; background:#FBF8F1; border:1px solid rgba(43,41,38,.16);
           border-radius:5px; overflow:hidden; }
  img { display:block; width:100%; height:auto; border-bottom:1px solid rgba(43,41,38,.1); }
  figcaption { display:grid; gap:5px; padding:12px 14px; }
  figcaption b { font:600 12px/1 ui-monospace,monospace; letter-spacing:.05em; color:#C87B45; }
  .t { font-weight:600; }
  .vo { color:#3d3a35; }
  .m { font:11px/1 ui-monospace,monospace; color:#8A8378; }
</style>
<header>
  <h1>Explain Ahmad &mdash; every beat</h1>
  <p class="sub">${all.length} frames &middot; ${sections.length} sections &middot; ${clock(total)} &middot; 1920&times;1080. Each caption is the beat, then the line said over it. Timecodes are planned, not measured.</p>
  <nav>${nav}</nav>
</header>
<div class="grid">
${rows.join('\n')}
</div>
`,
  'utf8',
)

console.log(`\n${all.length} frames → ${OUT}`)
console.log(`open ${path.join(OUT, 'index.html')}`)
