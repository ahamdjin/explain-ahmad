# Continuity System

## Core hierarchy

```text
Video
  └─ Section / World
      └─ Beat
          └─ Actor
              └─ Portal (when an actor bridges into the next world)
```

### Section / World
A full-screen `100vw × 100vh` conceptual world. A new section is justified when the viewer's mental coordinate system changes, not merely because the narration moved to the next sentence.

Examples:
- tokenization world
- embedding world
- transformer-layer world
- router/expert world

### Beat
A narrated change inside the same conceptual world.

Examples inside one tokenization section:
1. prompt exists
2. prompt splits into tokens
3. each token receives an ID
4. vocabulary/index structure appears
5. IDs look up embeddings

Those are beats, not separate pages.

### Actor
A persistent conceptual object with identity across beats.

A token should remain the same actor while it:
- moves
- resizes
- gains an ID
- changes emphasis
- enters a container
- becomes part of another arrangement

Do not visually destroy/recreate an actor just because layout changes.

### Portal
An actor that becomes the bridge into the next conceptual world.

Example:
- a closed embedding book appears in the tokenization section
- the viewer opens the book itself
- the same book survives the transition
- it expands into the next full-screen embedding section

The transition itself explains that the next section is inside / downstream of the object.

## Implementation layers

### `SceneDirector`
Opt-in XState-backed logical beat director for complex scenes.

Responsibilities:
- deterministic beat index
- next / previous / goto
- transition guards
- lock / unlock for interactions that must not be interrupted
- reset
- direction awareness

Simple scenes may still use `Sequence` / `StepController`. XState is not mandatory.

### `ContinuityStage`
Motion `LayoutGroup` boundary for a conceptual section.

### `ContinuityActor`
A Motion layout actor with a stable `layoutId`.

The primitive supports subtle curved layout trajectories when spatial continuity benefits from them and removes large layout motion for users who prefer reduced motion.

### `ActorPresence`
For actors that genuinely enter/leave while preserving authored entrance and exit behavior.

### `SceneDeck` + `SharedElement`
Section/world transition layer.

`SceneDeck` uses Motion's `animateView()` integration for View Transitions when motion is appropriate. The deck:
- exposes transition/busy state
- ignores repeated section-transition requests while one is active
- uses shared-element geometry for portal objects
- uses spring-driven view motion
- falls back to immediate replacement for reduced motion / unsupported cases

`SharedElement` marks the conceptual object; the transition engine owns temporary browser view-transition naming rather than permanently leaking that concern into scene code.

### `useActionGate`
Small opt-in guard for authored beat timing. Prevents repeated clicks, held keys or rapid mixed input from skipping across several visual beats before the current beat has settled.

It is not a substitute for state-machine guards. It is the interaction-level timing guard.

## Reference visual primitives

### `IndexBoard`
An open physical catalog/index surface for vocabularies, lookup tables, registries and datasets. It avoids turning every lookup explanation into a dashboard card.

### `BookVisual`
Reusable closed/open book object. A book can be a meaningful surface and, when appropriate, an object-as-control portal into a new conceptual world.

## Rules

1. **New sentence does not imply new section.**
2. **Keep the world stable while the same mental model is being elaborated.**
3. **Persist actors whenever the viewer should understand them as the same thing.**
4. **Move the object instead of replacing the diagram whenever continuity teaches causality.**
5. **Only create a new section when the conceptual coordinate system changes.**
6. **Use a portal object when the next world is naturally inside, through, or downstream of an existing object.**
7. **Minimal text.** Labels and tiny narration support the visual; they do not become the scene.
8. **Controls remain local.** A Continue/Open/Choose action belongs near the object or decision it affects.
9. **Prefer object-as-control** when the object itself makes the action obvious.
10. **Transitions must be reversible when the story allows it.** Going backward should restore orientation rather than hard-resetting the world.
11. **Repeated input must not skip authored beats.** Handle click, keyboard repeat and section-transition interruption deliberately.
12. **Reduced motion must preserve the logic.** The explanation still works even if shared motion becomes an immediate state change.

## Reference lab

`/lab/continuity`

The benchmark demonstrates:

```text
plain prompt
  ↓ same actors
separate token objects
  ↓ same actors
selected rows inside token index + IDs
  ↓ same world rearranges
index lookup → embedding book
  ↓ book itself is the control / shared portal
open embedding book world
```

The visual benchmark intentionally tests:
- plain content becoming UI only when the concept earns a boundary
- local controls rather than bottom navigation
- meaningful physical surfaces
- actor continuity
- curved layout paths
- object-as-control
- guarded repeated input
- shared portal transition
- reversal back to the previous stable beat
- reduced-motion behavior

See `docs/REFINEMENT_STANDARD.md` for the broader quality gate.
