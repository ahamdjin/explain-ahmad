# assets

Raw, editable art. **Nothing here is imported by the app.**

| Path | Holds |
| --- | --- |
| `source/` | editable masters — SVG exports, `.excalidrawlib` files, sketches |
| `vendor/` | pinned third-party pools plus a manifest recording URL, hash and licence. Fetched by script; never hand-edited. |

Production components live in **`src/paper/`** and are browsable at **`/paper`**.

Rules: `skills/ASSET_LIBRARY.md`. Licences: `THIRD_PARTY.md`.

## Why the split

A source file is something you edit. A component is something a section
imports. Keeping them apart means art can be reworked without touching code,
and a section never depends on a full upstream catalogue at runtime.

## Before you draw anything

Check `/paper` first. If the piece exists, use it. If it exists but needs a new
state, add the state to the existing component rather than making a second one —
one component with a `mood` prop, never five components.
