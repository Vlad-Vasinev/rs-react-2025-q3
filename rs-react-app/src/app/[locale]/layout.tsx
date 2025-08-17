import React from 'react'

import type { Metadata } from 'next'

import '../../styles/general/App.scss'

import { Navigation } from '../../components/navigation/navigation'
import ProviderWrapper from '../../components/providerWrapper/providerWrapper'

import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import { routing } from '../../i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
 
export const metadata: Metadata = {
  title: 'React-Next.js App',
  description: 'React-2025-Q3 Task #6, "Next.js. Server Side Rendering"',
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
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ProviderWrapper>
        <Navigation></Navigation>
        {children}
      </ProviderWrapper>
    </NextIntlClientProvider>
  )
}