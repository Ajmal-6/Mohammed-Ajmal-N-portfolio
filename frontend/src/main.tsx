import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './portfolio.css'
import PortfolioApp from './PortfolioApp'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <PortfolioApp />
    </StrictMode>,
  )
}
