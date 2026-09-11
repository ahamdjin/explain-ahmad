import type { Relation } from './motion'

export type Beat = {
  id: string
  title: string
  vo: string
  secs: number
  relation: Relation
  /** The viewer's new connection; also used in the comparison storyboard. */
  learn: string
}

/** One narration/timing source for the player, storyboard and recorder. */
export const BEATS: Beat[] = [
  { id: 'the-model', title: 'A very large model', secs: 4, relation: 'want', vo: 'GLM-5.3-Flash has 320 billion parameters.', learn: 'Meet the model and its total size.' },
  { id: 'learned-numbers', title: 'What those numbers are', secs: 4, relation: 'so', vo: 'Parameters are the numbers it learned during training.', learn: 'Parameters are learned numbers, rather than individual facts.' },
  { id: 'only-eighteen', title: 'But only 18B are active', secs: 5, relation: 'and-yet', vo: 'But for one word, only about 18 billion are active.', learn: 'The active path is much smaller than the whole model.' },
  { id: 'the-share', title: 'The gap, drawn to scale', secs: 5, relation: 'so', vo: 'It owns all of this, but uses about this much. Roughly six percent.', learn: '18 divided by 320 is about 5.6 percent.' },
  { id: 'why-the-rest', title: 'So why have the rest?', secs: 4, relation: 'and-yet', vo: 'Okay. So why have the other 300 billion?', learn: 'The unused-looking capacity creates a question.' },
  { id: 'the-hospital', title: 'A hospital of expert networks', secs: 5, relation: 'therefore', vo: 'This is a Mixture-of-Experts model. Picture a hospital with many expert departments.', learn: 'The hospital is an analogy for organised expert networks.' },
  { id: 'one-department', title: 'Look at one department', secs: 6, relation: 'so', vo: 'Let us look at one department. Here, there are 288 expert networks to choose from.', learn: 'This population represents one sparse routing layer, not all parameters.' },
  { id: 'a-word-arrives', title: 'A word comes in', secs: 3, relation: 'so', vo: 'A word comes in.', learn: 'One word is the persistent actor.' },
  { id: 'the-desk-reads', title: 'First, the front desk', secs: 4, relation: 'so', vo: 'The front desk reads what the model knows about it so far.', learn: 'Selection depends on the current representation.' },
  { id: 'eight-answer', title: 'Eight answer the call', secs: 5, relation: 'so', vo: 'And selects eight of those networks to work on it.', learn: 'The desk visibly causes selection before we name the router.' },
  { id: 'the-same-eight', title: 'A small team', secs: 5, relation: 'so', vo: 'Eight out of 288. The other 280 are not selected for this step.', learn: 'The same selected actors leave their original places; no duplicate team.' },
  { id: 'shared-help', title: 'And some machinery always works', secs: 5, relation: 'so', vo: 'There is shared machinery working too. So these eight are only part of the active path.', learn: 'Eight experts in one layer do not equal the entire 18B active path.' },
  { id: 'the-weight', title: 'But the weights are still huge', secs: 6, relation: 'wall', vo: 'But then I had another question. The full model still means hundreds of gigabytes of weights.', learn: 'Full-model weight size is separate from this small selection.' },
  { id: 'the-mismatch', title: 'All of that, for a small part?', secs: 4, relation: 'and-yet', vo: 'If only a small part is working, why deal with all of that?', learn: 'Hold the small team and full-model weight burden in one picture.' },
  { id: 'keep-this', title: 'Why not keep just what we need?', secs: 4, relation: 'hope', vo: 'Why cannot we keep just the small part we need?', learn: 'The proposed working set becomes a physical group.' },
  { id: 'router-named', title: 'That desk is the router', secs: 5, relation: 'so', vo: 'And the model already has a chooser. That front desk is the router.', learn: 'Name a mechanism whose function the viewer has already seen.' },
  { id: 'already-chooses', title: 'It already makes the selection', secs: 5, relation: 'so', vo: 'Its job is to choose which experts the current representation should go to. So...', learn: 'The existing decision makes selective loading seem plausible.' },
  { id: 'the-proposal', title: 'Suppose we did this', secs: 5, relation: 'hope', vo: 'What if we left the full weights in storage, and made a smaller place to work?', learn: 'Clearly separate stored weights and proposed working memory.' },
  { id: 'load-the-eight', title: 'Load the selected experts', secs: 5, relation: 'hope', vo: 'Load the experts we need, alongside the machinery that always works.', learn: 'The same eight move into the proposed memory space.' },
  { id: 'leave-the-rest', title: 'Leave the others asleep', secs: 4, relation: 'hope', vo: 'Use those, and leave everything else asleep in storage.', learn: 'Inactive is scoped to this illustrated routing step.' },
  { id: 'smaller-machine', title: 'Could the whole idea fit?', secs: 6, relation: 'hope', vo: 'Could that let a 320-billion-parameter model run on a much smaller machine?', learn: 'This is a hypothesis, not a measured memory-fit claim.' },
  { id: 'and-if-not', title: 'And if not...', secs: 3, relation: 'and-yet', vo: 'And if not...', learn: 'The plan remains intact. Only the narrator hesitates.' },
  { id: 'the-question', title: 'What are we missing?', secs: 6, relation: 'wall', vo: 'What exactly is stopping us?', learn: 'End on the unresolved memory question without asserting impossibility.' },
  { id: 'architecture-sheet', title: 'A diagram is not the answer', secs: 4, relation: 'therefore', vo: 'Staring at the final architecture is not going to answer that.', learn: 'The complete diagram is context, not the explanation.' },
  { id: 'make-an-entrance', title: 'Follow what actually happens', secs: 4, relation: 'therefore', vo: 'So let us follow what actually happens inside.', learn: 'The narrator physically clears the sheet and reveals an entrance.' },
  { id: 'go-inside', title: 'One word. From the beginning.', secs: 5, relation: 'therefore', vo: 'One word. From the beginning.', learn: 'The original word enters the model; Section 02 starts here.' },
]
export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
