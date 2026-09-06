import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles.css'
import './scrolly.css'
import './premium-scroll.css'
import './premium-patterns.css'
import './design-system.css'
import './paper-refinement.css'
import './explanation-system.css'
import './lab-shell.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
