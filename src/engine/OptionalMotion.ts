// Thin optional adapter for capability-specific engines.
// Import from here only inside scenes that explicitly need the feature.

export async function loadGsapObserver() {
  const [{ gsap }, { Observer }] = await Promise.all([import('gsap'), import('gsap/Observer')])
  gsap.registerPlugin(Observer)
  return { gsap, Observer }
}

export async function loadGsapSplitText() {
  const [{ gsap }, { SplitText }] = await Promise.all([import('gsap'), import('gsap/SplitText')])
  gsap.registerPlugin(SplitText)
  return { gsap, SplitText }
}

export async function loadGsapFlip() {
  const [{ gsap }, { Flip }] = await Promise.all([import('gsap'), import('gsap/Flip')])
  gsap.registerPlugin(Flip)
  return { gsap, Flip }
}

export async function loadGsapSvg() {
  const [{ gsap }, { DrawSVGPlugin }, { MorphSVGPlugin }] = await Promise.all([
    import('gsap'),
    import('gsap/DrawSVGPlugin'),
    import('gsap/MorphSVGPlugin'),
  ])
  gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin)
  return { gsap, DrawSVGPlugin, MorphSVGPlugin }
}
