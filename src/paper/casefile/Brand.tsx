import { useEffect, useState } from 'react'
import { PALETTE } from '../palette'

/**
 * A real organisation's mark, used to say whose thing this is.
 *
 * ## Why this exists
 *
 * o1 is the protagonist of this film and had no visual identity in it at all.
 * It appeared in alt text and in labels, never as a thing on screen: the two
 * machines are CURRENT and SUCCESSOR, which are *where* it ran, not what it
 * is. So every beat about what the model did had to name it in words.
 *
 * ## Why it loads a file rather than drawing the mark
 *
 * These are trademarks with exact geometry. The OpenAI mark is a six-fold
 * rotationally symmetric knot; an approximation drawn from memory is visibly
 * wrong, and a wrong logo is worse than none -- it reads as careless about
 * the one thing the film is otherwise careful about, which is getting the
 * facts of somebody else's work right.
 *
 * So the real mark is a **vendored asset**. Drop the official SVG at
 * `public/brand/<name>.svg` and it is used. Until then this renders a plain
 * typographic fallback, which is honest and deliberate-looking rather than an
 * approximation of somebody's logo.
 *
 * ## Using someone's logo at all
 *
 * Nominative use: identifying the actual subject of a piece of reporting.
 * The film is about a published OpenAI model evaluated by Apollo Research and
 * says so. Record provenance in `THIRD_PARTY.md` alongside the logo file.
 */
/**
 * Three marks, and they are not interchangeable.
 *
 * - `chatgpt` is **the model in the story**. The narration calls it ChatGPT
 *   from its first line -- "ChatGPT's o1 model found out it was about to be
 *   replaced" -- and the claim the whole film puts on trial is "ChatGPT only
 *   does what you tell it to do". Labelling that protagonist with the
 *   corporate mark instead makes the picture disagree with the voice.
 * - `openai` is **the publisher**: whose system card the numbers and the
 *   denial are quoted from. That is a company crediting its own report, and
 *   it is a different claim from "this is the thing that did it".
 * - `apollo` is who ran the evaluation.
 */
export type BrandName = 'chatgpt' | 'openai' | 'apollo'

const WORDMARK: Record<BrandName, string> = {
  chatgpt: 'ChatGPT',
  openai: 'OpenAI',
  apollo: 'Apollo Research',
}

export function Brand({
  name,
  /** Width in cqw. */
  size = 6,
  /** The organisation's name beside the mark. Off when the frame already says it. */
  label = false,
  tone = 'ink',
}: {
  name: BrandName
  size?: number
  label?: boolean
  tone?: 'ink' | 'paper'
}) {
  const [hasFile, setHasFile] = useState(false)
  const src = `/brand/${name}.svg`

  /*
   * Decoded, not merely fetched.
   *
   * A HEAD request is not enough: a dev server with an SPA fallback answers
   * 200 with an HTML page for a missing `.svg`, so the check passed, an
   * `<img>` was rendered, the browser failed to decode it and the mark was
   * simply invisible -- the worst of the three outcomes, because nothing
   * reported it.
   *
   * Loading it as an image is the real test: it succeeds only if the file
   * exists *and* is a usable image. A missing file is the expected state
   * until the asset is vendored, so failure is silent and falls through to
   * the wordmark.
   */
  useEffect(() => {
    let alive = true
    const probe = new Image()
    probe.onload = () => alive && setHasFile(true)
    probe.onerror = () => alive && setHasFile(false)
    probe.src = src
    return () => {
      alive = false
    }
  }, [src])

  const colour = tone === 'paper' ? PALETTE.paperWhite : PALETTE.ink

  return (
    <span className="cf-brand" style={{ width: `${size}cqw`, color: colour }}>
      {hasFile ? (
        <img className="cf-brand-mark" src={src} alt={`${WORDMARK[name]} logo`} draggable={false} />
      ) : (
        /*
         * The fallback is the name, set in the film's own type. Not a guess at
         * the logo: a wordmark is a real way to credit an organisation, and it
         * cannot be wrong the way a mis-drawn mark can.
         */
        <span className="cf-brand-word" aria-label={WORDMARK[name]}>
          {WORDMARK[name]}
        </span>
      )}
      {label && hasFile ? <span className="cf-brand-label">{WORDMARK[name]}</span> : null}
    </span>
  )
}
