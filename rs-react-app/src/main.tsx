
import { createRoot } from 'react-dom/client'
import App from './App'

import ErrorBoundary from './ts/components/errorBoundary/errorBoundary'

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
)
