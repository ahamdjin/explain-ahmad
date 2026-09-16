# SFX — the thirteen

Thirteen sounds, nine roles, **all Creative Commons 0** — commercial use, no
attribution required. Chosen from **85 candidates** by measured fit, with
download count as the tie-break.

Audition: `/sfx/index.html` on the dev server. Cue sheet: `docs/SOUND.md`.
Credits: `THIRD_PARTY.md`. Raw provenance: `freesound.jsonl`.
All 85 candidates are kept in `pool/` — swapping a role is a copy, not a refetch.

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

## How they were chosen

Every candidate was measured for **duration, transient count and attack time**,
then the single-impact roles were automatically trimmed to their first transient
and measured again. Selection took the highest-downloaded file that fit the
role's shape.

Two picks were then overridden **by name**, because measurement cannot hear:
the top-scoring "drawer" was a *Wooden Creak*, and the top-scoring "typewriter"
was a *ding* — a bell, not typing. Both would have passed every numeric test.

## What this does not verify

Shape, not character. A stamp that sounds like a stapler measures identically.
`/sfx/index.html` is there so a person can check.

## Processing

Leading silence trimmed · single-impact sounds cut to their first transient ·
high-passed at **250 Hz** · peak-normalised to **−12 dBFS** · 16-bit 44.1 kHz.
The −12 dBFS files are **edit masters, not final mix level**. In the cut they
are attenuated roughly another 8 dB to target **−20 dBFS** against voice at
−14 dBFS. `scripts/sfx-fetch.mjs` is the processing authority.
