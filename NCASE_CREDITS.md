# Ncase upstream credits

This project deliberately learns from and reuses selected source code from Nicky Case's explorable explanations.

## The Evolution of Trust

- Upstream: https://github.com/ncase/trust
- Author: Nicky Case and contributors
- License: CC0-1.0
- Upstream architecture inspected/reused: slideshow lifecycle, interactive controls, progressive scene composition.
- Exact upstream snapshots copied under `src/vendor/ncase-trust/` retain a provenance header.

## Parable of the Polygons

- Upstream: https://github.com/ncase/polygons
- Author: Nicky Case and contributors
- License: CC0-1.0
- Upstream architecture inspected/reused: draggable agents, local-neighbor satisfaction calculation, emergent simulation behavior.

## Project policy

For speed, we copy/adapt proven CC0 interaction logic when it fits. We do not force old global-DOM code directly into the React runtime when a thin modern adapter is safer. The goal is to preserve the interaction design and behavior while keeping new explainers reusable.
