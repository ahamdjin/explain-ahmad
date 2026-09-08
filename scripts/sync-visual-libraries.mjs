import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

const EXCALIDRAW_COMMIT = '297a349eaff859e678f78d4dbc8e68df5fce42e5';
const DICEBEAR_VERSION = '10.6.0';
const EXCALIDRAW_ROOT = `https://raw.githubusercontent.com/excalidraw/excalidraw-libraries/${EXCALIDRAW_COMMIT}`;

const PRIORITY_LIBRARY_NAMES = [
  'Stick people',
  'Stick Figures',
  'Robots',
  'Office Items',
  'System Icons',
  'Software Architecture',
  'Information Architecture',
  'Deep learning',
  'Data processing',
  'Data sources',
  'Data Flow',
  'Data Viz',
  'Charts',
  'Gadgets',
  'Computers',
  'Simple Sticky Notes',
  'Some handdrawn signs',
  'Random Figure Drawings',
  'Storytelling',
  'Data Science',
  'Logic Gates',
  'Schematic Symbols',
  'Printers',
  'Event Storming',
  'Forms',
  'Software Logos',
  'Medias',
];

function normalize(value) {
  return value.trim().toLowerCase();
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchBuffer(url, id) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'explain-ahmad-asset-sync' },
  });
  if (!response.ok) {
    throw new Error(`${id}: ${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function saveFile(url, output, id) {
  const data = await fetchBuffer(url, id);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, data);
  return {
    output,
    bytes: data.length,
    sha256: createHash('sha256').update(data).digest('hex'),
  };
}

async function loadExcalidrawCatalog() {
  const data = await fetchBuffer(`${EXCALIDRAW_ROOT}/libraries.json`, 'excalidraw-catalog');
  return JSON.parse(data.toString('utf8'));
}

function resolvePriorityLibraries(catalog) {
  const used = new Set();
  const resolved = [];
  const missing = [];

  for (const wanted of PRIORITY_LIBRARY_NAMES) {
    const needle = normalize(wanted);
    const match = catalog.find((entry) => {
      if (used.has(entry.id)) return false;
      const name = normalize(entry.name);
      return name === needle || name.includes(needle) || needle.includes(name);
    });

    if (!match) {
      missing.push(wanted);
      continue;
    }

    used.add(match.id);
    resolved.push(match);
  }

  return { resolved, missing };
}

async function syncExcalidrawLibrary(entry) {
  const slug = slugify(entry.name);
  const libraryUrl = `${EXCALIDRAW_ROOT}/libraries/${entry.source}`;
  const libraryOutput = join('visual-assets', 'vendor', 'excalidraw', slug, basename(entry.source));

  process.stdout.write(`sync Excalidraw: ${entry.name}... `);
  const libraryFile = await saveFile(libraryUrl, libraryOutput, `excalidraw-${slug}`);
  console.log(`${libraryFile.bytes} bytes`);

  let previewFile = null;
  if (entry.preview) {
    const previewUrl = `${EXCALIDRAW_ROOT}/libraries/${entry.preview}`;
    const previewOutput = join('visual-assets', 'vendor', 'excalidraw', slug, basename(entry.preview));
    try {
      previewFile = await saveFile(previewUrl, previewOutput, `excalidraw-${slug}-preview`);
    } catch (error) {
      console.warn(`warning: preview failed for ${entry.name}: ${error.message}`);
    }
  }

  return {
    id: `excalidraw-${slug}`,
    name: entry.name,
    description: entry.description ?? '',
    source: entry.source,
    preview: entry.preview ?? null,
    itemNames: entry.itemNames ?? [],
    license: 'MIT',
    upstreamCommit: EXCALIDRAW_COMMIT,
    library: {
      url: libraryUrl,
      ...libraryFile,
    },
    previewFile,
  };
}

async function syncOpenPeeps() {
  const url = `https://cdn.hopjs.net/npm/@dicebear/styles@${DICEBEAR_VERSION}/dist/open-peeps.min.json`;
  const output = join('visual-assets', 'vendor', 'open-peeps', 'open-peeps.min.json');
  process.stdout.write('sync Open Peeps (future videos)... ');
  const file = await saveFile(url, output, 'open-peeps-definition');
  console.log(`${file.bytes} bytes`);
  return {
    id: 'open-peeps-definition',
    name: 'Open Peeps',
    license: 'CC0-1.0 artwork; DiceBear packaging MIT',
    use: 'General/future-video character source. Not the primary GLM character system.',
    diceBearVersion: DICEBEAR_VERSION,
    url,
    ...file,
  };
}

const catalog = await loadExcalidrawCatalog();
const { resolved, missing } = resolvePriorityLibraries(catalog);

console.log(`Resolved ${resolved.length}/${PRIORITY_LIBRARY_NAMES.length} GLM-priority Excalidraw libraries.`);
if (missing.length) {
  console.warn(`Unresolved priority names (non-fatal): ${missing.join(', ')}`);
}

const excalidrawLibraries = [];
for (const entry of resolved) {
  try {
    excalidrawLibraries.push(await syncExcalidrawLibrary(entry));
  } catch (error) {
    console.warn(`warning: library failed for ${entry.name}: ${error.message}`);
  }
}

const openPeeps = await syncOpenPeeps();

const manifestPath = join('visual-assets', 'vendor', 'manifest.json');
await mkdir(dirname(manifestPath), { recursive: true });
await writeFile(
  manifestPath,
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    excalidrawCommit: EXCALIDRAW_COMMIT,
    requestedExcalidrawLibraries: PRIORITY_LIBRARY_NAMES,
    unresolvedExcalidrawLibraries: missing,
    excalidrawLibraries,
    generalSources: [openPeeps],
  }, null, 2)}\n`,
);

console.log(`\nWrote ${manifestPath}`);
