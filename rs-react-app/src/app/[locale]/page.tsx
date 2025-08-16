import {getTranslations} from 'next-intl/server';

const t = await getTranslations('HomePage')

export default function HomePage() {
  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  )
}