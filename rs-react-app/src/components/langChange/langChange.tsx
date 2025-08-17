'use client';

import { useRouter, usePathname } from 'next/navigation';

const LanguageChange = () => {
  const router = useRouter();
  const pathname = usePathname();

  const locales = ['en', 'de'];

  const currentLocale = pathname.split('/')[1];

  const toggleLocale = () => {
    const newLocale = locales.find((loc) => loc !== currentLocale) || 'en';

    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    router.push(newPathname);
  };

  return (
    <button className='langBtn' onClick={toggleLocale}>
      Change to {locales.find((loc) => loc !== currentLocale)?.toUpperCase()}
    </button>
  );
};

export default LanguageChange;
