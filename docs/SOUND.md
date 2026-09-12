# Sound

There is **no SFX system in the build, and there should not be one.** Sound is
decided against a real voice track in an editor, not authored blind into beats.
This file is the cue sheet and the rules; the files live wherever your library
lives.

## The one decision

**Sound marks a change of state, never a motion.** 189 beats over 30 minutes is
a cue every 9.5 seconds — a tic, and the ear stops hearing it by minute four.
Nineteen cues is one every 1.6 minutes, which is a motif.

The build already knows which beats are landings. `relation: 'wall'` means the
argument stops here. **Put nothing on a `so` beat** — no exceptions, and
especially not where something visibly moves, because that is exactly where the
instinct to score is strongest and most wrong.

## Craft rules

| | |
| --- | --- |
| **Length** | Under 250 ms. Anything with a tail competes with the voice. |
| **Pitch** | None. No whooshes, risers or pads — pitched material implies a key, and a spoken voice is not in one. Paper, wood, rubber, mechanism. |
| **Level** | Peak **−20 dBFS** against voice at −14. If you notice yourself raising it, it is already too loud. |
| **Frequency** | High-pass everything at **250 Hz**. The voice owns its fundamentals down there; a cue that lives in the same band forces you to duck, and ducking on an explainer always sounds like ducking. |
| **Ducking** | None. If you need it, the cue is wrong — fix level or EQ instead. |
| **Placement** | On the **visual** landing, one or two frames *before* the object settles. The eye leads the ear; land it late and it reads as a separate event rather than as the cause. |
| **Layering** | One cue per landing. Never two. |
| **Repeats** | Vary pitch ±2% or alternate takes when the same cue returns, or the ear tags it as a loop. |

## The palette — thirteen sounds, nine roles

Files, measurements and provenance: `assets/sfx/MANIFEST.md`.
**Audition before cutting** — six of seventeen fetches came back as something
other than what was asked for.

| role | file | s | uses |
| --- | --- | --- | --- |
| **the fact landing** | `stamp` | 0.23 | **3 only.** A character, not an effect. Spending it a fourth time spends it entirely. |
| a small placement | `click` | 0.18 | the common landing |
| a smaller one | `tick` | 0.24 | second in a series, or a connection |
| a decision, cut off | `snap` | 0.28 | something settling for good |
| a hard stop | `knock` | 0.20 | a limit being met |
| something closing | `clack` | 0.42 | a drawer, an answer |
| weight | `thud` | 0.79 | cost, slowness |
| the biggest number | `impact` | 1.10 | **1 use.** 12,096. |
| counting | `ratchet` | 0.98 | under a count-up. **5 in the film, no others.** |
| a chapter ending | `page-turn` | 0.98 | the 12 seams |
| destruction | `tear` | 2.00 | **1 use.** §2 b5. |
| diegetic | `typing` / `key-press` | 1.05 / 0.33 | **§1 beat 1 only** — the question being typed. Not a cue: the sound of the world, which is why the hook works. |

## The count-ups — `ratchet` ×5

A number assembling on screen is the one *process* that earns a sustained
sound, because the assembling is the event. There are five, and no other beat
gets one.

| at | beat | cue |
| --- | --- | --- |
| `0:25` | §01 b6 `three-thirty-six-for-one-word` | (see the landing table) |
| `16:08` | §07 b12 `three-hundred-and-thirty-six` | `ratchet`, ending on `click` |
| `18:03` | §08 b10 `two-thousand-six-eighty-eight` | `ratchet`, ending on `snap` |
| `23:16` | §11 b7 `how-much-did-we-carry` | `ratchet`, ending on `click` |
| `26:36` | §12 b13 `twelve-thousand-and-ninety-six` | (see the landing table) |

## The landings — nineteen

Timecodes are from `npm run timing` and **will move** when the voice is
recorded. Re-derive them; the beat ids will not move.

| at | beat | cue | why |
| --- | --- | --- | --- |
| `0:25` | §01 b6 `three-thirty-six-for-one-word` | `ratchet` → `stamp` | The hook. Ratchet under the count-up, stamp when it lands. The one cue allowed a dB over the rest. |
| `0:44` | §01 b9 `eight-cards` | `click`, then `snap` | One chip, then the stack. Two gestures, never eight hits. |
| `3:05` | §02 b5 `it-gets-cut-up` | `tear` | The only tear in the film. |
| `5:52` | §03 b9 `now-tuesday` | `click` | A third point placed in space. |
| `6:50` | §03 b15 `same-word-same-row` | `click` ×3, evenly spaced | Three identical rows. Same sample, same spacing — the repetition is the argument, so do not vary them. |
| `7:44` | §04 b6 `only-backwards` | `knock` | A limit: it can only look backwards. |
| `8:41` | §04 b12 `nothing-like-each-other` | `tick`, quiet | Two things nothing like each other, sitting still. |
| `10:57` | §05 b10 `no-dog-expert` | `click` ×3, the third clipped | Plates land and slide off. The third must sound **wrong**. The correction cannot sound successful. |
| `11:45` | §05 b13 `look-what-the-scores-came-from` | `tick` | A line drawn back to the scores. A connection, not an impact. |
| `14:26` | §07 b1 `forty-five` | `knock` | Forty-five. Answered flat, in one word. |
| `15:30` | §07 b8 `picks-again` | `stamp` | It picks again. **Same sample as 0:25** — the same fact returning. |
| `22:09` | §10 b13 `it-never-stops-choosing` | `stamp` | It never stops re-choosing. Third and final stamp. |
| `23:08` | §11 b6 `forty-two-times` | — none — | §10's repeating tick is still carrying this. A landing on top is one thing too many. |
| `23:38` | §11 b10 `a-second-and-a-half` | `thud` | The better part of two seconds. Weight, not sharpness. |
| `24:34` | §12 b1 `people-do-run-these` | `page-turn` (seam) | The reversal opens on a seam. Let the seam do it. |
| `26:18` | §12 b11 `keep-less-and-it-crawls` | — none — | It crawls. Sound here would be mercy. |
| `26:36` | §12 b13 `twelve-thousand-and-ninety-six` | `ratchet` → `impact` | The largest number in the film. `impact`, not a fourth stamp — the stamp is spent. Hold silence after it for the whole beat. |
| `26:59` | §12 b15 `nobody-knows-where` | — silence — | Nobody knows where. The strongest cue is the one expected and withheld. Only works because the other eighteen were consistent. |
| `27:50` | §13 b4 `all-of-it-in-reach` | `clack` | All of it in reach. Something closing — pairs with 23:38, the answer where that was the problem. |

## The seams — `page-turn` ×12

| at | into |
| --- | --- |
| `2:40` | §02 — Your words become tokens |
| `4:41` | §03 — From an ID to a meaning |
| `7:02` | §04 — The word looks around |
| `9:31` | §05 — The router picks the eight |
| `12:34` | §06 — The experts do the work |
| `14:26` | §07 — That was one layer. There are 45. |
| `16:33` | §08 — That was one token. Here's the sentence. |
| `18:41` | §09 — Where the answer comes out |
| `20:20` | §10 — And then it does the whole thing again |
| `22:23` | §11 — So could you store only the 18 billion? |
| `24:34` | §12 — How people actually run these |
| `27:21` | §13 — What that number actually bought |

## Three deliberate exceptions

**§10, the treadmill.** Beats 3–11 are *and again, and again, one word at a
time*. This is the one place a **repeating** sound is the argument rather than a
tic — the same short cue per climb, unvaried, allowed to become slightly
annoying. Monotony is the point. It is also why §11 b6 takes no landing cue:
the repetition is still carrying it.

**§12 b15, `nobody-knows-where`.** Silence. The strongest cue available is the
one the viewer expects and does not get, and it only exists because the other
eighteen were consistent.

**The stamp is a character.** It appears three times — 0:25, 15:30, 22:09 — and
nowhere else. Same sample each time. It is the sound of the film's one fact
landing, and spending it anywhere else spends it entirely.

## Order of work

1. Cut §1 and §2 with voice and **no sound at all**. Watch it.
2. Add only the cues in those sections. If it is better, roll out. If it reads
   as decoration, you have lost an afternoon rather than a week.
3. Sound goes on last, after `secs` have been re-timed to the real voice.
   Placing cues against provisional timings means placing them twice.
