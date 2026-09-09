import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'

/*
 * Only the shell stylesheet is global.
 *
 * Nine stylesheets used to be imported here, which put 58 kB of CSS in front
 * of every route -- the finished video included, and it uses almost none of
 * it. Each one now belongs to the route or component that actually needs it,
 * so Vite ships it in that route's chunk.
 *
 * reset.css is the exception, and stays here: the document reset and the root
 * custom properties are needed by every route. It loads *after* styles.css,
 * which is where it sat when it was part of design-system.css -- both files
 * reset `body`, so the order decides which wins.
 */
import './styles.css'
import './reset.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
