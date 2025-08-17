"use client"
import Link from 'next/link';

import { useParams } from 'next/navigation';

import ThemeChange from '../themeChange/themeChange';

const Navigation = () => {

  const params = useParams()
  const locale = params.locale || 'en'

  return (
    <div data-testid='navigation-test' className='navigation'>
      <h2>Navigation</h2>
      <Link href={`/${locale}`}>Go to main</Link>
      <Link href={`/${locale}/about`}>Go to about</Link>
      <Link href={`/${locale}/404`}>Go to 404</Link>
      <ThemeChange></ThemeChange>
    </div>
  );
};

export default Navigation;