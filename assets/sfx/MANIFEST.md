# SFX — what these are, and what was rejected

Sourced through the `media-use` skill (`resolve --type sfx`), provider
`heygen.audio.sounds`. Raw fetches and the full ledger are in `.media/`;
these are the processed, project-ready versions.

**Nothing here has been listened to by the agent that fetched it.** Duration,
peak and frequency distribution are measured; *character* is taken from the
provider's own description, which was wrong or approximate in four cases out of
nine. **Audition all five before cutting.**

## Processing applied to every file

Leading silence trimmed · high-passed (250 Hz, 200 for the knock, 300 for the
tear) · peak-normalised to **−12 dBFS** · 16-bit 44.1 kHz WAV.

The high-pass is the rule that matters: the voice owns its fundamentals below
250 Hz, and a cue living there forces ducking, which always sounds like
ducking. Peak −12 leaves the editor headroom; the target in the cut is −20.

## Kept

| file | from | s | job | note |
| --- | --- | --- | --- | --- |
| `stamp.wav` | `sfx_002` | 0.3 | the film's one fact landing — 3 uses only | A very brief, soft, and muted percussive tap with no lingering resonance. |
| `page-turn.wav` | `sfx_003` | 1 | the 12 section seams | A quick, crisp rustle of a single paper page being turned. |
| `click.wav` | `sfx_007` | 0.2 | small landings | A very brief, sharp click. |
| `knock.wav` | `sfx_006` | 0.7 | heavy, final landings | source was **three** knocks; trimmed to the first |
| `tear.wav` | `sfx_009` | 1.8 | §2 b5 only — the sentence being cut up | had +14 dB below 250 Hz before the high-pass — the worst in the set |

## Rejected, and why

This is the useful half of the record.

| id | asked for | what came back | verdict |
| --- | --- | --- | --- |
| `sfx_001` | rubber stamp | *"thick paper being crumpled"* | wrong sound, and redundant with the page turn |
| `sfx_004` | paper settling on a desk | byte-identical to `sfx_003` | **duplicate** |
| `sfx_008` | card sliding on wood | byte-identical to `sfx_003` | **duplicate** |
| `sfx_005` | wooden drawer closing | *"clinking rattle, many small hard pieces"* | not a drawer |

Three separate intents — page turn, paper settle, card slide — returned **one**
file. The resolver matches loosely on text, so asking it for three kinds of
paper gets you the same paper three times. Check hashes, not filenames.

## Licence — unresolved, and it blocks upload

The ledger records provider and track id but **no licence field**. These came
from `heygen.audio.sounds` over an authenticated account, which is not the same
thing as a commercial-use grant.

**Confirm the licence covers monetised YouTube before publishing,** and record
it in `THIRD_PARTY.md` next to the modules. If it does not, the cue sheet still
stands — it is a design, not these five files — and freesound.org CC0 will fill
it in an afternoon.
