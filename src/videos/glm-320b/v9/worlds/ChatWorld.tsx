import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { MODEL, SENTENCE } from '../data'

export function ChatWorld({ beat }: { beat: number }) {
  const focus = beat >= 16
  const typing = beat === 17
  const sent = beat >= 18
  const processing = beat >= 19
  const entering = beat >= 20
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!typing) {
      if (beat < 17) setTyped('')
      if (beat > 17) setTyped(SENTENCE)
      return
    }
    setTyped('')
    let position = 0
    const timer = window.setInterval(() => {
      position += 1
      setTyped(SENTENCE.slice(0, position))
      if (position >= SENTENCE.length) window.clearInterval(timer)
    }, 31)
    return () => window.clearInterval(timer)
  }, [beat, typing])

  return (
    <motion.section className="v9-world v9-chat-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="v9-chat-intro" animate={{ opacity: entering ? 0 : 1, y: entering ? -14 : 0 }}>
        <small>01 · TEXT</small>
        <h2>This is the part we already know.</h2>
        <p>Type something, then press Enter.</p>
      </motion.div>

      <motion.div
        className="v9-chat-shell"
        layoutId="v9-chat-shell"
        animate={{
          scale: entering ? 1.42 : 1,
          y: entering ? '-8cqh' : 0,
          opacity: entering ? 0.18 : 1,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 23 }}
      >
        <header><strong>{MODEL.name}</strong><span>our example model</span></header>
        <div className="v9-chat-body">
          {sent ? (
            <motion.div className="v9-user-message" initial={{ opacity: 0, y: 18 }} animate={{ opacity: entering ? 0.2 : 1, y: 0 }}>
              <motion.p layoutId="v9-sentence">{SENTENCE}</motion.p>
            </motion.div>
          ) : null}

          {processing ? (
            <motion.div className="v9-assistant-processing" layoutId="v9-processing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: entering ? '19cqh' : 0, scale: entering ? 1.9 : 1 }}>
              <div><b>{MODEL.name}</b><span>processing</span></div>
              <span className="v9-thinking-dots"><i /><i /><i /></span>
            </motion.div>
          ) : null}
        </div>
        <div className="v9-chat-input" data-focus={focus ? 'true' : undefined}>
          {!sent ? (
            <motion.div layoutId="v9-sentence" className="v9-chat-typed">
              <span>{typed}</span>{focus ? <i className="v9-caret" /> : null}
            </motion.div>
          ) : <span className="v9-chat-placeholder">Message sent</span>}
          <motion.button type="button" aria-label="Send prompt" animate={{ scale: sent ? 0.92 : 1, opacity: focus ? 1 : 0.4 }}>↑</motion.button>
        </div>
      </motion.div>

      {typing ? <div className="v9-chat-caption">The sentence is being written <b>inside the real input</b>.</div> : null}
      {sent && !processing ? <div className="v9-chat-caption">Enter sends the <b>same sentence</b> upward. Nothing is recreated.</div> : null}
      {processing && !entering ? <div className="v9-chat-caption">Now we stop looking at the app — and go inside the processing.</div> : null}
      {entering ? (
        <motion.div className="v9-enter-model-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <small>GOING INSIDE</small><strong>What happens to the text first?</strong>
        </motion.div>
      ) : null}
    </motion.section>
  )
}
