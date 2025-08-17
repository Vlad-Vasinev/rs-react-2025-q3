"use client"

import { Link } from '../../../i18n/navigation';

import {useTranslations} from 'next-intl';

const About = () => {

  const tHome = useTranslations('HomePage')
  const t = useTranslations('AboutPage')

  return (
    <div className='about-page' data-testid='about-test'>
      <div className='about-page__block'>
        <h2>{t('main_info')}</h2>
        <p>
          <span>{t('name')}</span>
          <span>Vladislav</span>
        </p>
        <p>
          <span>{t('age')}</span>
          <span>23</span>
        </p>
        <p>
          <span>{t('occupation')}</span>
          <span>Frontend-developer</span>
        </p>
        <p>
          <span>{t('hobby')}</span>
          <span>True crime</span>
        </p>
      </div>
      <div className='about-page__block'>
        <h2>{t('link_to_rs')}</h2>
        <p>
          <Link target='_blank' href={`https://rs.school/courses/reactjs`}>https://rs.school/courses/reactjs</Link>
        </p>
      </div>
      <div className='about-page__block'>
        <h2>{t('navigate_to_main')}</h2>
        <p>
          <span>Link from router:</span>
          <span><Link href={`/`}>{tHome('link_1')}</Link></span>
        </p>
      </div>
  </div>
  );
};

export default About;