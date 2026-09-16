import { motion } from "motion/react";
import { INK } from "../ink";
import { PALETTE } from "../palette";

/**
 * What "looking around" looks like: lines from one token to the others, with
 * thickness standing for how much each one matters.
 *
 * Two rules this component exists to keep.
 *
 * **Thickness only, never numbers.** Real attention weights for this model have
 * not been measured for this sentence, so a legend or a figure on a line would
 * claim a precision we do not have. Thickness is honest — it says "more" and
 * "less" and nothing else. See video-script/04 truth notes.
 *
 * **Forward lines leave; they are not crossed out.** Causal masking is beat 6
 * of §4, and it is drawn as the later connections withdrawing. Nothing in this
 * video is crossed out — a hazard mark reads as prohibition, and this is not a
 * prohibition, it is simply what is not there yet.
 */

/**
 * The weights the video uses, for `The dog dropped the ball, and it`.
 *
 * Illustrative and shaped rather than measured: `ball` and `dropped` heavy
 * because that is what a reader would say the sentence is about, `the` almost
 * nothing. Authored, so the frame is identical every render and a screenshot
 * comparison stays meaningful.
 */
export const WEIGHTS = [
  0.06, 0.62, 0.78, 0.05, 0.94, 0.1, 0.18, 0.0, 0.0,
] as const;

/**
 * The arcs themselves, as a bare `<g>`.
 *
 * Split out from the wrapper below so `Sentence` can drop them **inside its
 * own svg**, using its own token positions. Two components agreeing on a
 * coordinate system by hand is two components that will drift out of
 * alignment, and lines that miss the cards they connect teach nothing.
 */
export function AttentionArcs({
  /** One x position per token, in this component's own units. */
  xs,
  /** Which token is doing the looking. */
  from,
  weights,
  /** Even lines, before any weighting is shown. §4 beat 4. */
  flat = false,
  /** Later tokens' lines have withdrawn. §4 beat 6. */
  masked = false,
  /** Material travelling along the lines into the looker. §4 beat 7. */
  flow = false,
  /** Every token to every token, on one floor. §8 beat 4. */
  mesh = false,
  y = 200,
}: {
  xs: number[];
  from: number;
  weights?: readonly number[];
  flat?: boolean;
  masked?: boolean;
  flow?: boolean;
  mesh?: boolean;
  y?: number;
}) {
  if (!xs.length) return null;
  const weightAt = (i: number) => (flat ? 0.42 : (weights?.[i] ?? 0.3));

  const pairs: { a: number; b: number; weight: number }[] = [];
  if (mesh) {
    /* Everything to everything behind it. The crowding is the point of §8, so
     * the pairs are not thinned to keep the frame tidy. */
    for (let b = 1; b < xs.length; b += 1) {
      for (let a = 0; a < b; a += 1) pairs.push({ a, b, weight: 0.3 });
    }
  } else {
    for (let i = 0; i < xs.length; i += 1) {
      if (i === from) continue;
      if (masked && i > from) continue;
      const weight = weightAt(i);
      if (weight < 0.03) continue;
      pairs.push({ a: i, b: from, weight });
    }
  }

  return (
    <g>
      {pairs.map(({ a, b, weight }, index) => {
        const x1 = xs[a];
        const x2 = xs[b];
        const lift = 60 + Math.abs(x2 - x1) * 0.22;
        const mid = (x1 + x2) / 2;
        const d = `M${x1} ${y}Q${mid} ${y - lift} ${x2} ${y}`;
        return (
          <g key={`${a}-${b}`}>
            <motion.path
              d={d}
              fill="none"
              stroke={PALETTE.relateInk}
              strokeWidth={mesh ? 2.2 : 2 + weight * 15}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: mesh ? 0.34 : 0.3 + weight * 0.6,
              }}
              transition={{
                duration: 0.45,
                delay: Math.min(0.5, index * 0.03),
              }}
            />
            {/*
                The pull. A mark riding the line into the looker, so beat 7 is
                material arriving rather than a line simply being present.
              */}
            {flow && !mesh ? (
              <motion.circle
                /*
                 * Positioned by attribute, moved by transform.
                 *
                 * Animating `cx`/`cy` as keyframes leaves the element with no
                 * attribute value for its first paint, and SVG rejects
                 * `cx="undefined"` -- the browser logs an error per mark on
                 * every mount. The smoke test never caught it because it only
                 * opens beat 1 of each section; the frame capture visits every
                 * beat, and found sixteen of these in §6 alone.
                 */
                cx={x1}
                cy={y}
                r={3 + weight * 7}
                fill={PALETTE.relate}
                stroke={INK}
                strokeWidth="1.4"
                animate={{ x: [0, mid - x1, x2 - x1], y: [0, -lift * 0.68, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  repeatDelay: 0.35,
                  delay: index * 0.12,
                  ease: "easeInOut",
                }}
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/** The same arcs, standalone, for a beat with no sentence under them. */
export function AttentionLines(props: Parameters<typeof AttentionArcs>[0]) {
  const width = Math.max(...props.xs, 0) + 120;
  return (
    <div className="s1-attn">
      <svg viewBox={`0 0 ${width} ${(props.y ?? 200) + 40}`} aria-hidden="true">
        <AttentionArcs {...props} />
      </svg>
    </div>
  );
}

/**
 * The one question a token asks, written where the lines meet.
 *
 * A separate small piece rather than text inside `AttentionLines`, because it
 * appears on exactly one beat and belongs in that beat's overlays everywhere
 * else. Kept here so it cannot drift away from the lines it labels.
 */
export function AttentionAsk({ text }: { text: string }) {
  return (
    <div className="s1-attn-ask">
      <span>{text}</span>
    </div>
  );
}
