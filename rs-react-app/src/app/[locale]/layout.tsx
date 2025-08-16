import type { Metadata } from 'next'

import '../../styles/general/App.scss'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import Navigation from '../../components/navigation/navigation'
import ContentBlock from '../../components/contentBlock/contentBlock'

import ProviderWrapper from '../../components/providerWrapper/providerWrapper'

import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import { routing } from '../../i18n/routing'
 
export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
}
 
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{locale: string}>
}) {

  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Header></Header>
        <PageWrapper>
          <ProviderWrapper>
            <Navigation></Navigation>
            <ContentBlock></ContentBlock>
            {children}
          </ProviderWrapper>
        </PageWrapper>
        <Footer></Footer>
      </body>
    </html>
  )
}