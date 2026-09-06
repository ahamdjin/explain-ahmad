import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { MotionSystem } from './engine/MotionSystem'
import { SmoothScroll } from './engine/SmoothScroll'
import 'lenis/dist/lenis.css'
import './styles.css'
import './scrolly.css'
import './premium-scroll.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionSystem>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </MotionSystem>
  </StrictMode>,
)
