
import { createRoot } from 'react-dom/client'
import App from './App'
import About from './components/about/about'
import ErrorPage from './components/404/404'
import { BrowserRouter, Routes, Route } from 'react-router'

import ErrorBoundary from './components/errorBoundary/errorBoundary'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
)
