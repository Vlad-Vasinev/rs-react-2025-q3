"use client"

import errorImg from '../../../assets/general/404.jpg';
import Image from 'next/image';

import { Link } from '../../../i18n/navigation';

import {useTranslations} from 'next-intl';

const ErrorPage = () => {

  const t = useTranslations('NotFoundPage')

  return (
    <div data-testid='404-test' className='error-page'>
      <Image src={errorImg} alt="404 error" width={1200} height={600}></Image>
      <Link href={`/`}>{t('404_btn')}</Link>
    </div>
  );
};

export default ErrorPage