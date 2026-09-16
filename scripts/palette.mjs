/**
 * Writes the CSS custom properties in src/paper/paper.css from palette.ts.
 *
 * The stylesheet and the SVG components used to hold the same hex values in
 * two places, so retheming meant finding every copy. Now colour is decided in
 * one file and this keeps the CSS in step. Run: npm run palette
 */
import { readFile, writeFile } from 'node:fs/promises'

const source = await readFile('src/paper/palette.ts', 'utf8')

/** palette.ts is plain data, so it can be read without a transpiler. */
const values = Object.fromEntries(
  [...source.matchAll(/^\s{2}([a-zA-Z]+): '(#[0-9A-Fa-f]{6})',/gm)].map((m) => [m[1], m[2]]),
)

const vars = [...source.matchAll(/^\s{2}\['([a-z0-9-]+)', PALETTE\.([a-zA-Z]+)\],/gm)].map(
  ([, name, key]) => [name, values[key]],
)

if (!vars.length) throw new Error('no CSS_VARS found in palette.ts')

const block = vars.map(([name, value]) => `  --${name}: ${value};`).join('\n')

const cssPath = 'src/paper/paper.css'
const css = await readFile(cssPath, 'utf8')
const marker = /(\.s1-page \{\n)([\s\S]*?)(\n\n  --hand:)/

if (!marker.test(css)) throw new Error('could not find the palette block in paper.css')

const next = css.replace(marker, `$1${block}\n  --line: rgba(43, 41, 38, 0.2);$3`)
await writeFile(cssPath, next, 'utf8')
console.log(`paper.css — ${vars.length} custom properties written from palette.ts`)
