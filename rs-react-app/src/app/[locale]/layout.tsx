import React from 'react'

import type { Metadata } from 'next'

import '../../styles/general/App.scss'

import Navigation from '../../components/navigation/navigation'
import ContentBlock from '../../components/contentBlock/contentBlock'

import ProviderWrapper from '../../components/providerWrapper/providerWrapper'

import {hasLocale} from 'next-intl';
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

  const hasChildren = React.Children.count(children) > 0

  return (
    <div lang={locale}>
      <ProviderWrapper>
        <Navigation></Navigation>
        {children}
        {/* { hasChildren ? children : <ContentBlock></ContentBlock>} */}
      </ProviderWrapper>
    </div>
  )
}