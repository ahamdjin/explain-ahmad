import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { MODEL, SENTENCE } from '../data'

export function ChatWorldV12({ beat }: { beat: number }) {
  const focused = beat >= 16 && beat < 18
  const typing = beat === 17
  const sent = beat >= 18
  const processing = beat >= 19
  const portal = beat >= 20
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!typing) {
      setTyped(beat > 17 ? SENTENCE : '')
      return
    }
    setTyped('')
    let position = 0
    const timer = window.setInterval(() => {
      position += 1
      setTyped(SENTENCE.slice(0, position))
      if (position >= SENTENCE.length) window.clearInterval(timer)
    }, 38)
    return () => window.clearInterval(timer)
  }, [beat, typing])

  return (
    <motion.section className="v12j-world v12j-text-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="v12j-world-label"><small>01 · TEXT</small><span>the real journey starts with something familiar</span></div>

      <motion.div
        className="v12j-chat"
        data-portal={portal ? 'true' : undefined}
        animate={{ opacity: portal ? 0.32 : 1, scale: portal ? 0.93 : 1, y: portal ? '-5cqh' : 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 22 }}
      >
        <header>
          <div><strong>{MODEL.name}</strong><span>{MODEL.maker}</span></div>
          <small>NEW CHAT</small>
        </header>

        <main>
          <div className="v12j-chat-empty" aria-hidden={sent ? 'true' : undefined}>
            {!sent ? <><b>Start with one ordinary sentence.</b><span>Nothing technical yet.</span></> : null}
          </div>

          {sent ? (
            <motion.div className="v12j-user-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: portal ? 0.5 : 1, y: 0 }}>
              <motion.p
                layoutId="v12-sentence-actor"
                animate={{ scale: portal ? 1.08 : 1, x: portal ? '-3cqw' : 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 22 }}
              >{SENTENCE}</motion.p>
            </motion.div>
          ) : null}

          {processing ? (
            <motion.div
              className="v12j-processing-row"
              layoutId="v12-processing-portal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: portal ? 1 : 0.82, y: portal ? '3cqh' : 0, scale: portal ? 1.12 : 1 }}
              transition={{ type: 'spring', stiffness: 88, damping: 20 }}
            >
              <span className="v12j-processing-mark"><i /><i /><i /></span>
              <div><b>{MODEL.name}</b><span>processing this exact text</span></div>
            </motion.div>
          ) : null}
        </main>

        <footer className="v12j-input" data-focus={focused ? 'true' : undefined}>
          {!sent ? (
            <motion.div layoutId="v12-sentence-actor" className="v12j-input-copy">
              <span>{typed || (focused ? '' : 'Type a message…')}</span>{focused ? <i /> : null}
            </motion.div>
          ) : <span className="v12j-sent-state">Prompt sent</span>}
          <motion.button type="button" aria-label="Send prompt" animate={{ scale: beat === 18 ? [1, 0.84, 1] : 1, opacity: focused || sent ? 1 : 0.38 }}>↑</motion.button>
        </footer>
      </motion.div>

      {processing ? (
        <motion.aside className="v12j-text-question" data-portal={portal ? 'true' : undefined} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <small>BUT</small>
          <h2>What does the model turn this text into first?</h2>
          <p>We keep the same sentence and follow it inside instead of switching to a disconnected diagram.</p>
        </motion.aside>
      ) : null}

      {portal ? <motion.div className="v12j-processing-aperture" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} /> : null}
    </motion.section>
  )
}
