"use client"

import {useTranslations} from 'next-intl';
import { Link } from '../../i18n/navigation';

import ThemeChange from '../themeChange/themeChange';
import LanguageChange from '../langChange/langChange';

export const Navigation = () => {

  const t = useTranslations('HomePage')

  return (
    <div data-testid='navigation-test' className='navigation'>
      <h2>Navigation</h2>
      <Link href={`/`}>{t('link_1')}</Link>
      <Link href={`/about`}>{t('link_2')}</Link>
      <Link href={`/404`}>{t('link_3')}</Link>
      <ThemeChange></ThemeChange>
      <LanguageChange></LanguageChange>
    </div>
  );
}