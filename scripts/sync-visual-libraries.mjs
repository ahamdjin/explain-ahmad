import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const EXCALIDRAW_COMMIT = '297a349eaff859e678f78d4dbc8e68df5fce42e5';
const DICEBEAR_VERSION = '10.6.0';

const sources = [
  {
    id: 'excalidraw-stick-figures',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/youritjang/stick-figures.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/stick-figures.excalidrawlib',
    license: 'MIT',
    use: 'Quick emotional poses: happy, sad, shrug, child/adult silhouettes.',
  },
  {
    id: 'excalidraw-stick-people',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/dhtoran/stick-people.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/stick-people.excalidrawlib',
    license: 'MIT',
    use: 'Primary editable stick-person source; eyes, mouths and arms can be moved for reactions.',
  },
  {
    id: 'excalidraw-robots',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/kaligule/robots.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/robots.excalidrawlib',
    license: 'MIT',
    use: 'Router/dispatcher inspiration and robot mood states.',
  },
  {
    id: 'excalidraw-office-items',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/m47812/office-items.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/office-items.excalidrawlib',
    license: 'MIT',
    use: 'Desk/workplace props for expert stations, workbenches and ordinary-world metaphors.',
  },
  {
    id: 'excalidraw-system-icons',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/xxxdeveloper/system-icons.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/system-icons.excalidrawlib',
    license: 'MIT',
    use: 'Generic book/document/tool/device symbols; use when a metaphor needs a simple prop.',
  },
  {
    id: 'excalidraw-software-architecture',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/youritjang/software-architecture.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/software-architecture.excalidrawlib',
    license: 'MIT',
    use: 'Servers, databases, caches, pipelines, documents and generic system props.',
  },
  {
    id: 'excalidraw-deep-learning',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/yuelfei/deep-learning.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/deep-learning.excalidrawlib',
    license: 'MIT',
    use: 'Neural-network/deep-learning diagram primitives; use selectively, not as the visual style.',
  },
  {
    id: 'excalidraw-data-processing',
    url: `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}/libraries/erlina/data-processing.excalidrawlib`,
    output: 'visual-assets/vendor/excalidraw/data-processing.excalidrawlib',
    license: 'MIT',
    use: 'Data collection, transformation, storage, analysis and visualization metaphors.',
  },
  {
    id: 'open-peeps-definition',
    url: `https://cdn.hopjs.net/npm/@dicebear/styles@${DICEBEAR_VERSION}/dist/open-peeps.min.json`,
    output: 'visual-assets/vendor/open-peeps/open-peeps.min.json',
    license: 'CC0-1.0 artwork; DiceBear packaging MIT',
    use: 'Primary hand-drawn character system. Runtime generation is also available through @dicebear/core + @dicebear/styles.',
  },
];

async function download(source) {
  const response = await fetch(source.url, {
    headers: { 'user-agent': 'explain-ahmad-asset-sync' },
  });
  if (!response.ok) {
    throw new Error(`${source.id}: ${response.status} ${response.statusText}`);
  }

  const data = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(source.output), { recursive: true });
  await writeFile(source.output, data);

  return {
    ...source,
    bytes: data.length,
    sha256: createHash('sha256').update(data).digest('hex'),
  };
}

const results = [];
for (const source of sources) {
  process.stdout.write(`sync ${source.id}... `);
  const result = await download(source);
  results.push(result);
  console.log(`${result.bytes} bytes`);
}

const manifestPath = join('visual-assets', 'vendor', 'manifest.json');
await mkdir(dirname(manifestPath), { recursive: true });
await writeFile(
  manifestPath,
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    excalidrawCommit: EXCALIDRAW_COMMIT,
    diceBearVersion: DICEBEAR_VERSION,
    sources: results,
  }, null, 2)}\n`,
);

console.log(`\nWrote ${manifestPath}`);
