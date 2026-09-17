# Workflows

`ci.yml` — **Production verify**.

Sequence:

1. checkout
2. Node 22 + npm cache
3. `npm ci`
4. `npm run check`
5. `npm run build`
6. install Chromium
7. `npm run smoke`
8. `npm run check:overlap`

Do not weaken CI to accommodate a failing frame. Fix the story/build/composition, or document a genuinely intentional overlap with a reason in `scripts/accepted-overlaps.json`.
