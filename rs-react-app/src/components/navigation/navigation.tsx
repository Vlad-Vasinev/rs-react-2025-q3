import Link from 'next/link';

import ThemeChange from '../themeChange/themeChange';

const Navigation = () => {
  return (
    <div data-testid='navigation-test' className='navigation'>
      <h2>Navigation</h2>
      <Link href="/">Go to main</Link>
      <Link href="/about">Go to about</Link>
      <Link href="/404">Go to 404</Link>
      <ThemeChange></ThemeChange>
    </div>
  );
};

export default Navigation;