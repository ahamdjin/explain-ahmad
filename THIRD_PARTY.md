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

Nicky Case CC0 source provenance remains documented separately in `NCASE_CREDITS.md`.

## Sound effects — all CC0, cleared for commercial use

`assets/sfx/*.wav`, sourced from [Freesound](https://freesound.org) via
`npm run sfx` and filtered to `license:"Creative Commons 0"`. **CC0 permits
commercial use with no attribution required** — the credits below are given for
transparency, not obligation. Full provenance: `assets/sfx/freesound.jsonl`.

| file | source | author | licence |
| --- | --- | --- | --- |
| `stamp.wav` | [Stamp](https://freesound.org/s/362624/) | kermite607 | CC0 |
| `click.wav` | [Switch-088](https://freesound.org/s/842478/) | Moulaythami | CC0 |
| `tick.wav` | [dial turn.wav](https://freesound.org/s/120844/) | freemaster2 | CC0 |
| `snap.wav` | [[Perc] Short Click/Snap Perc](https://freesound.org/s/399934/) | waveplaySFX | CC0 |
| `knock.wav` | [Knocking on Wood Door (1)](https://freesound.org/s/629987/) | Flem0527 | CC0 |
| `clack.wav` | [Book_Page_Close_01](https://freesound.org/s/699316/) | Valenspire | CC0 |
| `thud.wav` | [thud.wav](https://freesound.org/s/215162/) | OtisJames | CC0 |
| `impact.wav` | [Knock_wood](https://freesound.org/s/584941/) | Weak_Hero | CC0 |
| `ratchet.wav` | [Single_Ratchet-01.wav](https://freesound.org/s/495237/) | CallFlan | CC0 |
| `page-turn.wav` | [turnPage.mp3](https://freesound.org/s/457767/) | partheeban | CC0 |
| `tear.wav` | [TearingPaper09](https://freesound.org/s/489966/) | falcospizaetus | CC0 |
| `typing.wav` | [Very_Fast_Typing_Short](https://freesound.org/s/813214/) | Capt.Jack | CC0 |
| `key-press.wav` | [Typewriter snippet 02](https://freesound.org/s/360602/) | cabled_mess | CC0 |

Processing: leading silence trimmed, single-impact sounds cut to their first
transient, high-passed at 220 Hz, peak-normalised to −12 dBFS.

This replaces an earlier set retrieved from HeyGen's audio library, which stated
no licence and **could not have been published**. Freesound's CC0 filter removed
that blocker entirely.
