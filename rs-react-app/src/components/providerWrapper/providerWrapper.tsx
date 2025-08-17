'use client'

import { Provider } from 'react-redux'
import { store } from '../../store'
import FlyoutElement from '../flyoutElement/flyoutElement'
import { ThemeProvider } from '../context/themeContext'

import ErrorBoundary from '../errorBoundary/errorBoundary'

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <FlyoutElement />
          {children}
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}
