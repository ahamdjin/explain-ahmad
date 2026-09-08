# Visual asset foundation

This folder is the source pool for the paper-world explainer. It is not a mandate to mix every library in one scene.

## GLM visual hierarchy

For the GLM-5.3-Flash video, **Excalidraw is the primary source ecosystem**.

We want enough raw material to build whole authored scenes, not just a few icons. The curated pool therefore covers:

1. **Characters and reactions**
   - Stick people
   - Stick Figures
   - Random Figure Drawings
   - Storytelling
   - Robots

2. **Workplace / ordinary-world props**
   - Office Items
   - Computers
   - Gadgets
   - Printers
   - Forms

3. **Books, notes, documents and signs**
   - System Icons
   - Simple Sticky Notes
   - Some handdrawn signs
   - Information Architecture

4. **AI / technical diagrams**
   - Deep learning
   - Data Science
   - Data Viz
   - Charts

5. **Process, storage and system metaphors**
   - Data processing
   - Data sources
   - Data Flow
   - Software Architecture
   - Software Logos
   - Event Storming

6. **Mechanism pieces**
   - Logic Gates
   - Schematic Symbols
   - flow/decision primitives from the architecture libraries

The `/assets` playground also searches the full pinned Excalidraw catalog, so we are not limited to this list when a storyboard scene needs a better prop.

## Open Peeps

Open Peeps remains installed and synced because it is a strong reusable character source for **other/future videos**.

It is **not the primary GLM character system**. For this video, small Excalidraw-style characters and scene-specific authored assets fit the paper/mechanism language better.

## Source sync

Run:

```bash
npm run assets:sync
```

The sync script:

- fetches the pinned official Excalidraw `libraries.json` catalog
- resolves the GLM-priority libraries by name
- downloads their `.excalidrawlib` files and previews into `visual-assets/vendor/excalidraw/`
- records source paths, hashes, sizes and the pinned upstream commit in `visual-assets/vendor/manifest.json`
- warns instead of killing the whole sync when a non-critical candidate library cannot be resolved
- keeps Open Peeps as a separate general/future-video source

The pinned source files are deliberately separated from production assets. A production scene should export/copy only the pieces it actually uses so we can recolor, simplify, split layers and animate them without depending on the full upstream catalog at runtime.

## Production rule

**Source pool → choose useful pieces → adapt them into one paper-world language → export scene assets → add living behavior → choreograph the scene.**

Borrowing a library item does not mean dropping it unchanged into the final video. The final scene still needs authored composition, consistent line weight, palette, scale and hierarchy.

Repeated geometry such as parameter grids, connector paths and selection boxes can stay code-generated when that genuinely improves the explanation. Personality-heavy objects such as characters, desks, shelves, router mechanisms, reaction poses, books and signs should usually be authored/vector assets.

## Permanent behavior layer

Visual assets are separate from reusable behavior. The current reusable wrapper supports:

- idle settle / breathing wobble
- hover wiggle
- selected pop
- subtle cursor-follow reaction

We can add blink, look-at-focus, confused tilt, press/squash, path highlight and hand-drawn reveal only when a real storyboard scene needs them. The behavior system should stay small; the scene artwork does the visual heavy lifting.
