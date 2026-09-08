import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { transform } from 'esbuild'

const STORY = path.resolve('src/videos/glm-320b/v9/story.ts')

const source = await readFile(STORY, 'utf8')
const { code } = await transform(source, { loader: 'ts', format: 'esm' })
const module = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)

export const { BEATS, CHAPTERS } = module
