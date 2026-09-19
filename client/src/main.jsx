import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RootErrorBoundary from './components/RootErrorBoundary.jsx'
import { runPhase2ValidationSuite } from './tests/phase2AssessmentSuite.js'

if (typeof window !== 'undefined') {
  window.__runPhase2ValidationSuite = runPhase2ValidationSuite;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
)
