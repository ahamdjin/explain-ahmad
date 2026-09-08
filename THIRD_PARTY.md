# Third-party modules

This project intentionally uses open-source modules as opt-in capabilities.

- Rough.js — MIT — hand-drawn SVG/canvas geometry — https://roughjs.com/
- Rough Notation — MIT — animated hand-drawn annotations — https://roughnotation.com/
- perfect-freehand — MIT — pressure-sensitive freehand stroke geometry — https://github.com/steveruizok/perfect-freehand
- Lucide — ISC — generic SVG icon system — https://lucide.dev/
- React Flow / XYFlow — MIT — node/edge graph and workflow rendering — https://reactflow.dev/
- React Router — MIT — route-per-video navigation — https://reactrouter.com/
- cmdk — MIT — unstyled accessible command menu used only by the internal lab — https://www.npmjs.com/package/cmdk
- XState — MIT — opt-in state machines / guards for complex scene continuity — https://stately.ai/docs/xstate
- @xstate/react — MIT — React hooks for opt-in XState scene directors — https://stately.ai/docs/xstate-react
- Motion — MIT — animation, shared layout actors and scroll-linked motion — https://motion.dev/
- Lenis — MIT — optional smooth scrolling — https://lenis.darkroom.engineering/
- GSAP — used only by explicitly opted-in components in this project.
- react-kino — MIT — optional scrollytelling helpers.
- DiceBear Core / Styles — MIT — local deterministic SVG generation. The Open Peeps style is artwork by Pablo Stanley released under CC0 1.0 — https://www.dicebear.com/styles/open-peeps/ and https://www.openpeeps.com/

## Curated Excalidraw source libraries

The asset sync script pins selected files from `excalidraw/excalidraw-libraries`. The public Excalidraw Libraries directory states that its listed libraries are MIT licensed.

- Stick Figures — Youri Tjang — quick emotional poses.
- Stick people — David Hurt — editable faces/arms/postures; useful for narrator reaction states.
- Robots — Kaligule — robot mood/dispatcher source material.
- Software Architecture — Youri Tjang — generic systems, storage, documents, pipelines and device props.
- Deep learning — yuelfei — neural/deep-learning diagram primitives.
- Data processing — Erlina — storage/transformation/analysis metaphors.

Source registry: https://libraries.excalidraw.com/
Pinned copies are fetched by `npm run assets:sync` into `visual-assets/vendor/` and recorded in `visual-assets/vendor/manifest.json` with source URLs and SHA-256 hashes.

Nicky Case CC0 source provenance remains documented separately in `NCASE_CREDITS.md`.
