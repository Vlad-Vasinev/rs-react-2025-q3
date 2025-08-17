import {useTranslations} from 'next-intl';

const Header = () => {

  const t = useTranslations('HomePage')

  return (
    <>
      <div className='header' data-testid="header">
        <h2>{t('header_1')}</h2>
        <h2>Works with PokeApi(use vpn)</h2>
      </div>
    </>
  );
};

export default Header;