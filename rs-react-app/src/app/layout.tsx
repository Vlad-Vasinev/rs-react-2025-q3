import type { Metadata } from 'next'

import '../../src/styles/general/App.scss'

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import PageWrapper from '../components/pageWrapper/pageWrapper'
import Navigation from '../components/navigation/navigation'

import ProviderWrapper from '../components/flyoutWrapper/flyoutWrapper'
 
export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <>
          <Header></Header>
          <PageWrapper>
            <ProviderWrapper>
              <Navigation></Navigation>
              <div id="root">{children}</div>
            </ProviderWrapper>
          </PageWrapper>
          <Footer></Footer>
        </>
      </body>
    </html>
  )
}