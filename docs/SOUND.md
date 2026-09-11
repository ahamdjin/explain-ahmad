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

## The cue sheet

Timecodes are from `npm run timing` and will move once the voice is recorded —
**re-derive them, do not transcribe these.** The beat ids will not move.

| at | beat | cue | why |
| --- | --- | --- | --- |
| `0:25` | §01 b6 `three-thirty-six-for-one-word` | **stamp** | The hook. The one cue in the film that may be a touch louder than the rest — it is the thesis landing in the ear. |
| `0:44` | §01 b9 `eight-cards` | **card slide ×** *(one, then the stack)* | Two events: one chip, then seven. Let the stack be one gesture, not eight hits. |
| `3:05` | §02 b5 `it-gets-cut-up` | **paper tear** | The sentence is cut up. The only tear in the film; do not reuse it. |
| `5:52` | §03 b9 `now-tuesday` | **pencil dot** | A point placed in space. Tiny. |
| `6:50` | §03 b15 `same-word-same-row` | **stamp ×3, even** | Three identical rows. Identical sound, identical spacing — the repetition *is* the argument. |
| `7:44` | §04 b6 `only-backwards` | **soft wooden knock** | A limit: it can only look backwards. |
| `8:41` | §04 b12 `nothing-like-each-other` | **paper settle** | Two things that are nothing like each other, sitting still. |
| `10:57` | §05 b10 `no-dog-expert` | **three slides, each failing** | Name-plates land and slide off. The *third* one should sound slightly wrong — a scrape, not a click. This is the correction; it must not sound successful. |
| `11:45` | §05 b13 `look-what-the-scores-came-from` | **pencil stroke** | A line drawn back to where the scores came from. A connection, not an impact. |
| `14:26` | §07 b1 `forty-five` | **wooden knock** | Forty-five. Answered flat, in one word. |
| `15:30` | §07 b8 `picks-again` | **stamp** | It picks again. Same stamp as 0:25 — deliberately, this is the same fact returning. |
| `22:09` | §10 b13 `it-never-stops-choosing` | **stamp** | It never stops re-choosing. Same stamp again, third and last time. |
| `23:08` | §11 b6 `forty-two-times` | **none — let the traffic carry it** | Forty-two times. See §10 note below: this is the one place a repeating sound does the work, and a landing cue on top of it is one thing too many. |
| `23:38` | §11 b10 `a-second-and-a-half` | **drawer closing** | The better part of two seconds. Heavy, slow, final. |
| `24:34` | §12 b1 `people-do-run-these` | **page turn** | The reversal opens. It is a seam anyway — let the seam cue do it. |
| `26:18` | §12 b11 `keep-less-and-it-crawls` | **none** | It crawls. Sound here would be mercy; the frame should be uncomfortable on its own. |
| `26:36` | §12 b13 `twelve-thousand-and-ninety-six` | **stamp, then nothing** | 12,096. The film’s largest number. Hold the silence after it for the whole beat. |
| `26:59` | §12 b15 `nobody-knows-where` | **silence — deliberately** | Nobody knows where. The strongest cue available is the one the viewer expects and does not get. This only works because the other eighteen were consistent. |
| `27:50` | §13 b4 `all-of-it-in-reach` | **drawer closing** | All of it in reach. Pairs with 23:38 — the same sound, the answer instead of the problem. |

## The seams

Twelve section joins, and a **page turn** on each. It is the chapter structure
made audible, it suits paper, and twelve in thirty minutes will not tire.

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
