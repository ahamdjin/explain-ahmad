# Visual asset foundation

This folder is the source pool for the paper-world explainer. It is not a mandate to mix every library in one scene.

## Locked hierarchy

1. **Open Peeps** — primary hand-drawn character source.
   - Best for narrator/helper characters and expressive human poses.
   - Generate locally through `@dicebear/core` + `@dicebear/styles` using the Open Peeps style.
   - Artwork license: CC0 1.0.

2. **Excalidraw Stick people** — primary tiny stick/reaction character source.
   - Best for small confused/thinking/talking figures and editable arm/eye/mouth poses.
   - Useful when Open Peeps feels too large or detailed for a diagram.

3. **Excalidraw Stick Figures** — backup pose source.
   - Happy, sad, shrug and other immediate emotional silhouettes.

4. **Excalidraw Robots** — router/dispatcher source material.
   - Use as a starting point; adapt into the GLM paper-world visual language rather than dropping the raw library item unchanged.

5. **Excalidraw Software Architecture / Data Processing / Deep Learning** — prop and mechanism source pools.
   - Books, documents, storage, servers, pipelines, processing, neural diagrams.
   - Prefer metaphorical props over literal RAM/GPU icons when a physical explanation reads better.

## Source sync

Run:

```bash
npm run assets:sync
```

This downloads pinned source libraries into `visual-assets/vendor/` and writes a manifest with source URL, license, file size and SHA-256.

The pinned source files are deliberately separated from production assets. Production scenes should export/copy only the items they actually use into their scene folder so we can recolor, simplify and animate them without depending on the full upstream library at runtime.

## Production rule

**Borrow the drawing; author the scene.**

Use existing libraries for raw visual material. Then adapt the selected pieces to the same paper palette, stroke weight and scale before they enter a storyboard scene.

Repeated geometry such as parameter grids, connector paths and selection boxes stays code-generated. Personality-heavy objects such as characters, desks, shelves, router mechanisms and reaction poses should come from authored/vector assets.

## Permanent behavior layer

The visual assets are separate from reusable behavior. Characters and props should be able to opt into small behaviors such as:

- idle settle / breathing wobble
- blink
- look toward cursor or focal object
- confused tilt
- selected bounce
- hover reaction
- press/squash
- path highlight
- hand-drawn arrow/bracket reveal

These behaviors should be reusable wrappers driven by Motion/Rough.js; scene code chooses when they are active.
