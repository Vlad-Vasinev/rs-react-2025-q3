"use client"
// import Link from 'next/link';

import { useParams } from 'next/navigation';
import {useTranslations} from 'next-intl';
import { Link } from '../../i18n/navigation';

import ThemeChange from '../themeChange/themeChange';

export const Navigation = () => {

  const params = useParams()
  const locale = params.locale || 'en'

  const t = useTranslations('HomePage')

  return (
    <div data-testid='navigation-test' className='navigation'>
      <h2>Navigation</h2>
      <Link href={`/`}>{t('link_1')}</Link>
      <Link href={`/about`}>{t('link_2')}</Link>
      <Link href={`/404`}>{t('link_3')}</Link>
      <ThemeChange></ThemeChange>
    </div>
  );
};

// export default Navigation;

// const Navigation = () => {

//   const params = useParams()
//   const locale = params.locale || 'en'

//   return (
//     <div data-testid='navigation-test' className='navigation'>
//       <h2>Navigation</h2>
//       <Link href={`/${locale}`}>Go to main</Link>
//       <Link href={`/${locale}/about`}>Go to about</Link>
//       <Link href={`/${locale}/404`}>Go to 404</Link>
//       <ThemeChange></ThemeChange>
//     </div>
//   );
// };

// export default Navigation;