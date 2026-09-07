import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { MODEL, SENTENCE } from '../data'
import { NarrativeCue } from '../shared'

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
    }, 38)
    return () => window.clearInterval(timer)
  }, [beat, typing])

  return (
    <motion.section className="v9-world v9-chat-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="v9-chat-intro" animate={{ opacity: entering ? 0 : 1, y: entering ? -14 : 0 }}>
        <small>01 · TEXT</small>
        <h2>What does a 320B model actually receive?</h2>
        <p>Not an architecture diagram. Just the text you type.</p>
      </motion.div>

      <motion.div
        className="v9-chat-shell"
        layoutId="v9-chat-shell"
        animate={{
          scale: entering ? 1.42 : 1,
          y: entering ? '-8cqh' : 0,
          opacity: entering ? 0.16 : 1,
        }}
        transition={{ type: 'spring', stiffness: 82, damping: 22, mass: 0.95 }}
      >
        <header><strong>{MODEL.name}</strong><span>our example model</span></header>
        <div className="v9-chat-body">
          {sent ? (
            <motion.div className="v9-user-message" initial={{ opacity: 0, y: 18 }} animate={{ opacity: entering ? 0.16 : 1, y: 0 }}>
              <motion.p layoutId="v9-sentence">{SENTENCE}</motion.p>
            </motion.div>
          ) : null}

          {processing ? (
            <motion.div
              className="v9-assistant-processing"
              data-entering={entering ? 'true' : undefined}
              layoutId="v9-processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: entering ? '18cqh' : 0, scale: entering ? 2.05 : 1 }}
              transition={{ type: 'spring', stiffness: 78, damping: 20 }}
            >
              <div><b>{MODEL.name}</b><span>processing the prompt</span></div>
              <span className="v9-thinking-dots"><i /><i /><i /></span>
            </motion.div>
          ) : null}
        </div>
        <div className="v9-chat-input" data-focus={focus && !sent ? 'true' : undefined}>
          {!sent ? (
            <motion.div layoutId="v9-sentence" className="v9-chat-typed">
              <span>{typed}</span>{focus ? <i className="v9-caret" /> : null}
            </motion.div>
          ) : <span className="v9-chat-placeholder">Prompt sent</span>}
          <motion.button
            type="button"
            aria-label="Send prompt"
            animate={{ scale: beat === 18 ? [1, 0.88, 1] : 1, opacity: focus ? 1 : 0.4 }}
            transition={{ duration: beat === 18 ? 0.34 : 0.2 }}
          >↑</motion.button>
        </div>
      </motion.div>

      {entering ? (
        <>
          <motion.div className="v9-enter-model-label" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <small>GOING INSIDE THE PROCESSING</small><strong>What happens to the text first?</strong>
          </motion.div>
          <NarrativeCue kind="but" className="v11-chat-bridge">
            The user gives the model <b>text</b>, but the network needs machine-friendly numerical structure. What does it make first?
          </NarrativeCue>
        </>
      ) : null}
    </motion.section>
  )
}
