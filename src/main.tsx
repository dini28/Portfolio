import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react'
import ErrorBoundary from './components/common/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Analytics />
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

