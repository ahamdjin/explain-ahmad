# Continuity System

## Core hierarchy

```text
Video
  └─ Section / World
      └─ Beat
          └─ Actor
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
4. vocabulary/library structure appears
5. IDs move toward embedding

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
- the viewer opens it
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
A Motion layout actor with a stable `layoutId`. Use it when an object needs to retain visual identity across layout/state changes.

### `ActorPresence`
For actors that enter/leave while preserving authored entrance and exit behavior.

### `SceneDeck` + `SharedElement`
Section/world transition layer. Uses the View Transition API where supported and degrades to immediate state replacement where it is not.

Use shared elements for portal objects that must survive the section change.

## Rules

1. **New sentence does not imply new section.**
2. **Keep the world stable while the same mental model is being elaborated.**
3. **Persist actors whenever the viewer should understand them as the same thing.**
4. **Move the object instead of replacing the diagram whenever continuity teaches causality.**
5. **Only create a new section when the conceptual coordinate system changes.**
6. **Use a portal object when the next world is naturally 'inside', 'through', or 'downstream of' an existing object.**
7. **Minimal text.** Labels and tiny narration support the visual; they do not become the scene.
8. **Controls remain local.** A Continue/Open/Choose action belongs near the object or decision it affects.
9. **Transitions must be reversible when the story allows it.** Going backward should restore orientation rather than hard-resetting the world.
10. **Reduced motion must preserve the logic.** The explanation still works even if shared motion becomes an immediate state change.

## Reference lab

`/lab/continuity`

The reference demonstrates:

```text
Prompt
  ↓ same actors
Tokens
  ↓ same actors
Token IDs + vocabulary/library
  ↓ book enters same world
Embedding book
  ↓ shared-object portal
Embedding section / open book
```

This is a structural reference, not a finished real video page.
