# Diagram Grammar — Production Explainers

The viewer should never need the author beside the screen to decode a diagram.

A diagram is successful when a beginner can answer, from the visual alone:

1. **What object are we following?**
2. **Where did it come from?**
3. **What operation is happening now?**
4. **What changed?**
5. **Where does the result go next?**

## Non-negotiable rules

### 1. Never skip the middle
If the real teaching sequence is `A → B → C`, do not animate `A → C` and explain B only in narration.

Show B long enough to understand it.

Examples:
- Attention: Query → compare with Keys → scores → weights → scale Values → weighted mix → updated representation.
- MoE: representation → router → expert scores → top-k → expert transforms → weighted merge → updated representation.

### 2. Spatial ownership
A label/object belongs beside the object that created it.

Bad: a Query from `it` floating beside `rolled`.
Good: the Query remains physically anchored to `it` until it moves into the comparison operation.

### 3. Every arrow needs a semantic job
Arrows may mean:
- becomes
- moves to
- compares with
- contributes to
- is selected by
- returns to

If the meaning is unclear, label the operation or remove the arrow.

### 4. One operation is the hero
Previous machinery may remain for continuity, but it becomes quiet after its job is finished.

Examples:
- When comparing Q with K, V is quiet.
- When reading Values, K becomes quiet.
- When selected experts process, the router becomes quiet.

### 5. Results appear next to their cause first
Scores appear beside the Key they came from before being collected into a chart.
Expert scores appear on/near the experts before top-k selection is summarized.

### 6. Preserve object identity
The same conceptual object should not disappear and respawn elsewhere.

Examples:
- `it` token → ID lookup → embedding → attention representation → routed representation.
- MoE block → one floor in the transformer building.

### 7. Important teaching text has a readability floor
Tiny text may be texture only.
If a viewer needs the sentence to understand the operation, it must be readable at normal video size.

### 8. Each beat states the current operation
Complex chapters keep a short operation cue such as:

`3 · Query("it") compares with each allowed Key`

This is not narration. It is orientation.

### 9. Animation demonstrates causality
Movement should reveal:
- source
- target
- transformation
- selection
- scale
- hierarchy

Decorative motion must not compete with those signals.

### 10. The five-year-old test
Before accepting a beat, ask:

> If the narration muted for five seconds, could a child point to the thing that is changing and roughly say what happened?

If not, the diagram is under-explained.

## Attention visual grammar

Use a fixed teaching sequence:

1. current representation of `it`
2. derive Q / K / V views
3. show allowed Keys and Values under the words that own them
4. move only Q(`it`) into comparison
5. show each match result locally
6. collect match results into normalized weights
7. quiet Keys and emphasize Values
8. scale Value contribution by weight
9. combine Values in one explicit mixer
10. show the updated `it` representation
11. zoom out and clarify that the real model uses multiple heads/hybrid mechanisms

Avoid spaghetti curves when a local score or aligned table communicates the same relationship more clearly.

## MoE visual grammar

Use a fixed teaching sequence:

1. locate feed-forward block inside one layer
2. show dense baseline
3. expand one block into many available expert blocks
4. representation enters router
5. router produces scores over experts
6. top-k selection is visibly performed
7. shared expert joins separately
8. selected experts transform the representation
9. outputs are weighted and merged
10. compare routing for another token
11. reroute in a later layer
12. connect the repeated selective path to total vs active parameters

The final MoE answer should feel inevitable because the viewer saw every selection step, not because a text label states `320B → 18B`.
