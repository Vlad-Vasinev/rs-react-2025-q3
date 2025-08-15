'use client'

import { Provider } from 'react-redux'
import { store } from '../../store'
import FlyoutElement from '../flyoutElement/flyoutElement'

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <FlyoutElement />
      {children}
    </Provider>
  )
}
